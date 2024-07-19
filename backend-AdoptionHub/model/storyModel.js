const mongoose = require("mongoose");
const storySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    storyImageUrl: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("story", storySchema);
module.exports = Story;
