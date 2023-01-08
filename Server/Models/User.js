const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // dob: {
    //   type: Date,
    //   required: true,
    // },
    // gender: {
    //   type: String,
    //   required: true,
    // },
    // phoneno: {
    //   type: String,
    //   required: true,
    // },
    avatar: {
      publicId: String,
      url: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
