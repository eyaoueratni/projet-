const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('../models/user.js')

const bookingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "MeetingRoom", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    confirmed: { type: Boolean, default: false }, 
    nameMeet: { type: String, required: true },
},
    { timestamps: true }

)
const booking = (module.exports = mongoose.model(' Booking', bookingSchema));