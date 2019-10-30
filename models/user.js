const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  phone: Number,
  type: { 
    type: String, 
    required: true, 
    default: "User" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

