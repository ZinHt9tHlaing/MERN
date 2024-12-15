const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    minLength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  payment_session_key: {
    type: String,
  },
  resetToken: String,
  tokenExpiration: Date,
});

module.exports = model("User", userSchema);
