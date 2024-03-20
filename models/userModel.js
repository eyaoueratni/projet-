const mongoose = require('mongoose');
const validate = require('validator');
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


    },
},
    { timestamps: true });
const User = (module.exports = mongoose.model('User', userSchema))