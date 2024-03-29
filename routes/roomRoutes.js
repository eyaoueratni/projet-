const express = require('express');
const authenticate = require('../middlewares/authenticate.js');
const { createRoomController, allRoomsController } = require('../controller/roomController');
const { bookroomController, bookAvailabilityController } = require('../controller/bookingcontroller.js')
const router = express.Router();
//create room to post it
router.post('/createrooms', authenticate, createRoomController);
//lister roomss
router.get('/get-all-rooms', allRoomsController);

//create booking
router.post('/book', authenticate, bookroomController);
//check the availability of room in such time & date 
router.post('/availability', authenticate, bookAvailabilityController)
//room by id
//router.get('/get-roombyid', getroomController)
module.exports = router;