// models/Testimonial.js
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to a user (optional if testimonial is anonymous)
      required: false
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    img: {
      type: String, // URL or local path to client's image
      default: ""
    },

    heading: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    rating: {
      type: Number, // Optional: 1-5 star rating
      min: 1,
      max: 5
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);