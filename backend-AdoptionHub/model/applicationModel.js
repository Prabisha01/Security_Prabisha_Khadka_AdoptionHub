const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    petype: {
      type: String,
      required: false,
    },
    petAge: {
      type: String,
      required: false,
    },
    petGender: {
      type: String,
      required: false,
    },
    condition: {
      type: String,
      required: false,
    },
    purpose: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
    petImageUrlOne: {
      type: String,
      required: false,
    },
    petImageUrlTwo: {
      type: String,
      required: false,
    },
    petImageUrlThree: {
      type: String,
      required: false,
    },
    petImageUrlFour: {
      type: String,
      required: false,
    },

    petImageUrlFive: {
      type: String,
      required: false,
    },

    petFileUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const Application = mongoose.model("application", applicationSchema);

module.exports = Application;
