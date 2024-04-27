const express = require('express');

const {  createMeetingRoom ,MeetingRoomhomepage,getAllMeetingRooms,addMeetingRoom,getMeetingRoomById} = require('../controller/roomController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();
// Middleware to check if user is admin
const isAdmin = require("../middlewares/authenticate").isAdmin;
// Routes for meeting rooms
router.get(
  "/meetingRooms",
  authenticate,
  
  MeetingRoomhomepage
);
router.post(
    "/add/meetingRoom",
    authenticate,
  
    createMeetingRoom
  );
  router.get(
    "/add/meetingRoom",
    authenticate,
  
   addMeetingRoom
  );
  router.get(
    "/view/meetingRoom",
    authenticate,
    
    getAllMeetingRooms
  );
  router.get(
    "/view/meetingRoom/:id",
    authenticate,
    
    getMeetingRoomById
  );


module.exports = router;