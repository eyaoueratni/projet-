const express = require('express');

const { getMeetingRooms, showMeetingRoom ,meetingRoomCalendar,reserveMeetingRoom,getReservationsForUser,getReservationsForMeetingRoom} = require('../controller/userController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();


//GET Meeting Rooms
router.get("/rooms",getMeetingRooms);
// One MeetingRoom Details
router.get("/room/:id", showMeetingRoom);

// Calendar
router.get("/calendar/:roomId", meetingRoomCalendar);
// Route to reserve a meeting room
router.post(
    "/reserve",
    authenticate,
    reserveMeetingRoom
  );
// Route to get reservations for a specific meeting room including meeting room details
router.get(
    "/reserve/:roomId",
    getReservationsForMeetingRoom
  );
module.exports = router;