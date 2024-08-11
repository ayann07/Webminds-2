const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be atleast 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minLength: [3, "Email must be atleast 3 characters long"],
        validate: [validator.isEmail, "Email is invalid"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minLength: [10, "Phone no must be 10 characters long"],
        maxLength: [10, "Phone no must be 10 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be atleast 6 characters long"]
    },
    banks: [{
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account',
            require: true
        },
    }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        require: true
    }]
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
    } catch (err) {
        next(err);
    }
})

userSchema.methods.generate_token = async function () {
    try {
        return jwt.sign({
                userId: this._id.toString(),
                email: this.email,
                phone: this.phone
            },
            process.env.JWT_KEY, {
                expiresIn: "5d"
            }
        )
    } catch (err) {
        console.log(err);
    }
}

userSchema.methods.comparePass = async function (password) {
    return bcrypt.compare(password, this.password);
}
const User = new mongoose.model('User', userSchema);

module.exports = User;