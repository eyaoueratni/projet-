const booking = require('../models/booking.js')
const room = require('../models/room.js')
const user = require('../models/user.js')

const authenticate = require('../middlewares/authenticate.js');
const getMeetingRooms = async (req, res) => {
    room.find({})
      .then((rooms) => {
        console.log(rooms);
        res.render("rooms", { rooms: rooms });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving meeting rooms.");
      });
  };
// Get all reservations for a specific user
const getReservationsForUser = async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        console.log("User ID not found in request");
        return res.status(400).json({ message: "User ID is required" });
      }
      console.log("Fetching reservations for user:", userId);
      const reservations = await booking.find({ user: userId }).populate(
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

  module.exports={
    getReservationsForUser,
    getAllMeetingRooms,
  }
