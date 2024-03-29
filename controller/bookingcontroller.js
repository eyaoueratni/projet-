const bookingSchema = require('../models/booking.js')
const room = require('../models/room.js')
const user = require('../models/user.js')
const moment = require('moment')

const authenticate = require('../middlewares/authenticate.js');
const bookroomController = async (req, res) => {
    try {
        //convertir la date et heure en iso
        req.body.date = moment(req.body.bookingdate, "DD-MM-YYYY").toISOString();
        req.body.starthour = moment(req.body.starthour, "HH:mm").toISOString();
        req.body.finishhour = moment(req.body.finishhour, "HH:mm").toISOString();
        //creer la nouvelle reservation 
        const newbooking = new bookingSchema(req.body);
        await newbooking.save();
        //chercher l'user qui a fait le booking
        const bookeduser = await user.findOne({ _id: req.body.userId });

        res.status(200).send({
            success: true,
            message: "Appointment Book succesfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Booking Appointment",
        });
    }
};

// 
const bookAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.bookingdate, "DD-MM-YY").toISOString();
        const fromTime = moment(req.body.starthour, "HH:mm").toISOString();
        const toTime = moment(req.body.finishhour, "HH:mm").toISOString();
        const roomId = req.body.roomId;
        //chercher les reservation de ce room en cette date et cette horaire
        const bookings = await bookingSchema.find({
            roomId,
            bookingdate: date,
            starthour: { $gte: fromTime },
            finishhour: { $lte: toTime },
        });
        //if there is booking in this horaire en lui indique non disponibleno  
        if (bookings.length > 0) {
            return res.status(200).send({
                message: "bookings not Availibale at this time",
                success: true,
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "booking available",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Booking",
        });
    }
};

module.exports = {
    bookroomController,
    bookAvailabilityController
}