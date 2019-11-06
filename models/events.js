const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    userName: { type: String, required: true },
    roomName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;