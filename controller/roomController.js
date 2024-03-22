const Room = require('../models/room.js');

//const authenticate = require('../middlewares/authenticate.js');

const createRoomController = async (req, res) => {
    try {
        const { name, floor, capacity, assets } = req.body;
        const room = new Room({ name, floor, capacity, assets, author: req.userId });
        await room.save();
        res.status(201).send('room created ');
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const allRoomsController = async (req, res) => {
    try {
        const rooms = await Room.find()
        res.send(rooms)
    } catch (error) {
        res.status(500).send('server error')
    }
}
module.exports = {
    createRoomController,
    allRoomsController
};