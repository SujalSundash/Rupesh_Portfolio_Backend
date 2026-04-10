const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    profileImage: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    skills: [
      {
        type: String
      }
    ],

    experience: {
      type: Number,
      default: 0
    },

    portfolioVideos: [
      {
        title: String,
        videoUrl: String,
        thumbnail: String,
        description: String
      }
    ],
    otp: String,
    otpExpiry: Date,

    socialLinks: {
      youtube: String,
      instagram: String,
      linkedin: String,
      facebook: String
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },

  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);