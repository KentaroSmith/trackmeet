const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName: { type: String, required: true },
    description: { type: String, required: false },
    features: { type: Array, required: true },
    building: { type: String, required: true },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location"
    },
    occupancy: Number,
    timeOpen: String,
    timeClosed: String
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;