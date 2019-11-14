const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    userName: { type: String, required: true },
    roomName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    title: { type: String, required: true }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;