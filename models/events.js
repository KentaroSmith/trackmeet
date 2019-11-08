const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userName: { type: String, required: true },
    roomName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;