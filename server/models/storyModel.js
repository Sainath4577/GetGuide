const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: { type: String, default: "" },
  desc: { type: String },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: String,
    default:
      new Date().toISOString().slice(0, 19) +
      "." +
      new Date().getTime().toString().slice(-3) +
      "Z",
  },
});

module.exports = mongoose.model("Story", storySchema);
