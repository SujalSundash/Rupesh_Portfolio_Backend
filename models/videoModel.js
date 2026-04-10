const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    src: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);