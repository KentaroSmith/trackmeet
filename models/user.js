const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: Number,
  type: { 
    type: String, 
    required: true, 
    default: "User" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

