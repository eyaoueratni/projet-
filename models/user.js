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
    role: { type: String, enum: ["user", "admin"], required: true }, // 'user' or 'admin' as roles
},
    { timestamps: true });

const User = (module.exports = mongoose.model('User', userSchema))