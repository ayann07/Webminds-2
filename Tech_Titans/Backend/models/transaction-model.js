const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
	{   from_name: {type: String, required: true},
		from_account: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "account",
			require: true,
			minLength:[12,"Account no must be 12 characters long"],
        	maxLength:[12,"Account no must be 12 characters long"]
		},
        to_name: {type: String, required: true},
		to_account: { type: mongoose.Schema.Types.ObjectId, ref: "account", require: true ,minLength:[12,"Account no must be 12 characters long"],
        maxLength:[12,"Account no must be 12 characters long"]},
		amount: {
			type: Number,
			required: [true, "Amount is required"],
			validate: {
				validator: function(value) {
					return value >= 0;
				},
				message: 'Amount must be greater than 0'
			}
		},
		date:{
			type:Date,
			default:Date.now()
		},
		paymentStatus:{
			type:String,
			default:'failed'
		},
		referenceID:{
			type:String,
			required:true
		}
	},
	{
		timestamps: true,
	}
);

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
