const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName: { type: String, required: true },
    description: { type: String, required: false },
    features: [{ 
        type : Schema.Types.ObjectId, 
        ref: 'Feature' 
    }],
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location"
    },
    capacity: { type: Number, required: true }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;