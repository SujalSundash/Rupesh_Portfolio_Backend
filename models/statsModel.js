const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },

    end: {
      type: Number,
      required: true,
    },

    suffix: {
      type: String,
      default: "+",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stats", statsSchema);