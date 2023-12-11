const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter your email"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password_1: {
    type: String,
    required: [true, "Please Enter your password"],
    select:false
  },
  password_2: {
    type: String,
    required: [true, "Please Enter your password"],
    select:false
  },
  password_3: {
    type: String,
    required: [true, "Please Enter your password"],
    select:false
  },
  password_4: {
    type: String,
    required: [true, "Please Enter your password"],
    select:false
  },
  password_5: {
    type: String,
    required: [true, "Please Enter your password"],
    select:false
  },
  mobile: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});




module.exports = mongoose.model("DummyUser", userSchema);
