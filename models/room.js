const mongoose = require('mongoose');
const bookingSchema = require('../models/booking')
const Schema = mongoose.Schema;
const roomSchema = new Schema({
    name: { type: String, index: true, required: true },
    floor: { type: String, required: true },
    capacity: Number,
    assets: {
        type:String,
        required:true
    },
   availibility:{
    type:Boolean,
    required:true,
    default:false
   }
})
const Room = (module.exports = mongoose.model('Room', roomSchema));