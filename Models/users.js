const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
