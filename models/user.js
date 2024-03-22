const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email is required '],
        unique: true,
        validate: validate.isEmail

    },
    password: {
        type: String,
        required: [true, 'password is required'],
        nimlength: [8, "password length should be greater than 8 character"],
        select: true,


    },
},
    { timestamps: true });
//middleware
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});
//compare password 
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}
//json webtoken
userSchema.methods.createJwt = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_secret);
};
const User = (module.exports = mongoose.model('User', userSchema))