const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featureSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: { type: String }
});

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;

