const express = require('express');
const authenticate = require('../middlewares/authenticate.js');
const { createRoomController, allRoomsController } = require('../controller/roomController');
const router = express.Router();
//create room to post it
router.post('/createrooms', authenticate, createRoomController);
//lister roomss
router.get('/get-all-rooms', allRoomsController);
module.exports = router;