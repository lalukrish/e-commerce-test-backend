const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: {
    type: String,
    //required: true,
  },
  pincode: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    //  required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
