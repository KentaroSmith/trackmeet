const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: Number,
    timeOpen: Date,
    timeClose: Date
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;

