const mongoose = require("mongoose");
const commentsSchema = mongoose.Schema(
  {
    commentedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comments", commentsSchema);
