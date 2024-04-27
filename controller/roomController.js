const Room = require('../models/room.js');
/**
 * GET /
 * Homepage Meeting Room
 */
const MeetingRoomhomepage = async (req, res) => {
  const messages = await req.flash("info");

 
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const meetingrooms = await Room.aggregate([
      { $sort: { name: 1 } }, // Sorting alphabetically by name
    ])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

    const count = await Room.countDocuments({});

    res.render("admin/meetingRooms/index", {
  
      meetingrooms,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

const addMeetingRoom = async (req, res) => {
    res.render("admin/meetingRooms/add");
  };
  
// Controller for creating a meeting room
const createMeetingRoom = async (req, res) => {
    try {
      const {  name, floor, capacity, assets, timings, availability } = req.body;
      const newMeetingRoom = new Room({
        name,
        floor,
        capacity,
        assets,
        availability,
      });
      const savedMeetingRoom = await newMeetingRoom.save();
      //await req.flash("info", "New Meeting Room has been added.");
      res.redirect("/meetingRooms");
    } catch (error) {
      console.error("Error creating meeting room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // Controller for fetching all meeting rooms
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


  module.exports={
    addMeetingRoom,
    createMeetingRoom,
    MeetingRoomhomepage,
    getAllMeetingRooms,
    getMeetingRoomById,
    
  }