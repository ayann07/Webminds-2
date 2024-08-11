const Account = require("../models/account-model");
const User = require("../models/user-model");
const Transaction = require("../models/transaction-model");
const Stripe = require('stripe')
const generateUniqueId = require('generate-unique-id');

const makeTransaction = async (req, res) => {
    const user = req.user;
    const { from_account, to_account, amount } = req.body;

     try {
        const from = await Account.findOne({ account_no: from_account });
        const to = await Account.findOne({ account_no: to_account });

        if (!from) {
            return res.status(404).json({ message: "Account does not exist1" });
        } else if (!to) {
            return res.status(404).json({ message: "Account does not exist2" });
        } else if (from.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
		else
		{
        const referenceID=generateUniqueId({
			length:8,
			useLetters:true,
			useNumbers:true
		})
		console.log(referenceID)
        const pendingTransaction = await Transaction.create({
            from_name: from.username,
            from_account: from,
            to_name: to.username,
            to_account: to,
            amount: Number(amount),
            paymentStatus: 'failed',
			referenceID:referenceID
        });
        // Create Stripe checkout session
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}`,
            cancel_url: `${process.env.CLIENT_SITE_URL}`,
            customer_email: user.email,
            client_reference_id:referenceID ,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    unit_amount: amount * 100,
					product_data: {
                        name: 'Transaction Payment'
                    },
                },

                quantity: 1
            }]
        });
		console.log(session)

        return res.status(200).json({ url: session.url });
	}

    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error: " + err });
    }
};



const getUserTransactions = async (req, res, next) => {
	const user = req.user;
	try {
		const newUser = await User.findById(user._id).sort({
			createdAt: 1
		});
		const transactions = newUser.transactions;
		var trnxs = [];
		await Promise.all(
			transactions.map(async (tnx) => {
				var t = await Transaction.findById(tnx._id);
				if (t.from_name.toLowerCase() === user.username.toLowerCase()) {
					t = {
						...t._doc,
						status: "sent"
					};
				} else {
					t = {
						...t._doc,
						status: "received"
					};
				}
				await trnxs.push(t);
			})
		);
		return res.status(200).json(trnxs);
	} catch (err) {
		return res.status(500).json({
			msg: "Internal Server Error :" + err
		});
	}
};

module.exports = {
	makeTransaction,
	getUserTransactions
};