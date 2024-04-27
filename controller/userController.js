const Reservation = require("../models/booking.js");
const MeetingRoom = require("../models/room.js");

const User = require("../models/user.js");




// Get all reservations for a specific user
const getReservationsForUser = async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        console.log("User ID not found in request");
        return res.status(400).json({ message: "User ID is required" });
      }
      console.log("Fetching reservations for user:", userId);
      const reservations = await Reservation.find({ user: userId }).populate(
        "room"
      );
      console.log("Found reservations:", reservations);
      // Rendering the EJS page with reservations data
      res.render("reservations", { reservations: reservations });
    } catch (error) {
      console.error("Error in getReservationsForUser:", error);
      res.status(500).json({ message: "Internal server error", error: error });
    }
  };
  
//get all meeting rooms
const getMeetingRooms = async (req, res) => {
  MeetingRoom.find({})
    .then((rooms) => {
      console.log(rooms);
      res.render("rooms", { rooms: rooms });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving meeting rooms.");
    });
};
//show MeetingRoom Details
const showMeetingRoom = async (req, res) => {
  try {
    const room = await MeetingRoom.findById(req.params.id);
    if (!room) {
      res.status(404).send("Room not found");
      return;
    }
    res.render("roomDetails", { room: room });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving room details.");
  }
};
//Render MeetingRoom Calendar
const meetingRoomCalendar = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const reservations = await Reservation.find({ room: roomId }).populate(
      "room"
    );
    res.render("calendar", { reservations: reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Controller for fetching all meeting rooms
const getAllMeetingRooms = async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find();
    res.status(200).json(meetingRooms);
  } catch (error) {
    console.error("Error fetching meeting rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller for getting a meeting room by ID
const getMeetingRoomById = async (req, res) => {
  try {
    const meetingRoomId = req.params.id;
    const meetingRoom = await Room.findById(meetingRoomId);
    if (!meetingRoom) {
      return res.status(404).json({ message: "Meeting room not found" });
    }
  

    res.render("admin/meetingRooms/view", {
      meetingRoom,
    });
  } catch (error) {
    console.error("Error getting meeting room by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller for reserving a meeting room
const reserveMeetingRoom = async (req, res) => {
  try {
    const { roomId, startTime, endTime } = req.body;
    const userId = req.userId; // Assuming the user ID is set to req.userId by your auth middleware

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }// Check if the room is available
    const isAvailable = await Reservation.findOne({
      room: roomId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (isAvailable) {
      return res
        .status(400)
        .json({ message: "Room is not available for the selected time slot." });
    }

    // Create the reservation
    const reservation = new Reservation({
      user: userId,
      room: roomId,
      startTime,
      endTime,
    });

    await reservation.save();

    //res.status(201).json(reservation);
    res.redirect(`/confirmReservation/${reservation._id}`);
  } catch (error) {
    console.error("Error reserving the room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get reservations for a specific meeting room including meeting room details
const getReservationsForMeetingRoom = async (req, res) => {
  try {
    const room = await MeetingRoom.findById(req.params.roomId);
    if (!room) {
      res.status(404).send("Room not found");
      return;
    }
    res.render("reserve", { room: room });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading reservation form.");
  }
};

  module.exports={
    getReservationsForUser,
    getMeetingRooms,
    showMeetingRoom,
    meetingRoomCalendar,
    reserveMeetingRoom,
    getReservationsForMeetingRoom
  }