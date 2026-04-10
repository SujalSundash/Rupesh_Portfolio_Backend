const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
{
  senderName: {
    type: String,
    required: true
  },

  senderEmail: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",   // reference to Role collection
    required: true
  },

  isRead: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);