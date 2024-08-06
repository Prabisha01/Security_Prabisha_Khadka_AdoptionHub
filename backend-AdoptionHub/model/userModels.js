const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    userImageUrl: {
      type: String,
      default: null,
      required: false,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lastFailedAttempt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
