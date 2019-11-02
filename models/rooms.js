const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName: { type: String, required: true },
    amenities: { type: Array, required: true },
    building: { type: String, required: true },
    occupancy: Number,
    timeOpen: String,
    timeClosed: String
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;