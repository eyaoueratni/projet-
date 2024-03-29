const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('../models/user.js')

const bookingSchema = new Schema({
    _bookingId: Schema.Types.ObjectId,
    userId: { type: Schema.ObjectId, ref: 'User' },
    roomId: { type: Schema.ObjectId, ref: 'Room' },
    bookingdate: { type: String, required: true },
    starthour: { type: String, required: true },
    finishhour: { type: String, required: true },
    nameMeet: { type: String, required: true },
},
    { timestamps: true }

)
const booking = (module.exports = mongoose.model(' Booking', bookingSchema));