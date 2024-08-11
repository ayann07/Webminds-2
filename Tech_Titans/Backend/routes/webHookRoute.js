const express=require('express')
const Stripe=require('stripe')
const TransactionModel=require('../models/transaction-model')
const AccountModel=require('../models/account-model')
const UserModel=require('../models/user-model')
const router=express.Router()
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/',express.raw({
    type:'application/json'
}),async(req,res)=>{
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const transactionRefID=session.client_reference_id;
            const transaction=await TransactionModel.findOne({referenceID:transactionRefID})
            if (transaction && transaction.paymentStatus === 'failed') {
                const from = await AccountModel.findOne({ username: transaction.from_name });
                const to = await AccountModel.findOne({ username: transaction.to_name });

                if(from && to)
                {    
                from.balance -= transaction.amount;
                to.balance += transaction.amount;
                await from.save();
                await to.save();

                // Update transaction status
                transaction.paymentStatus = 'success';
                await transaction.save();
                console.log(transaction)
                let user = await UserModel.findOne({ username: transaction.from_name }); 
                    user.transactions.push(transaction._id);
                    await user.save();
                    let receiver = await UserModel.findOne({ username: transaction.to_name });
                    receiver.transactions.push(transaction._id);
                    await receiver.save();
            }
        }
            break

            case 'checkout.session.async_payment_failed':
                // Handle payment failure
                const failedSession = event.data.object;
                const failedTransactionId = failedSession.client_reference_id;
                const failedTransaction = await TransactionModel.findById(failedTransactionId);
                if (failedTransaction) {
                    failedTransaction.paymentStatus = 'failed';
                    await failedTransaction.save();
                }
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
    }
})

module.exports=router