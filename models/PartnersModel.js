const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Partner name is required'],
    trim: true
  },
  logoUrl: {
    type: String,
    required: [true, 'Logo URL is required']
  },
  websiteUrl: {
    type: String,
    default: '#'
  },
  order: {
    type: Number,
    default: 0 // Useful for sorting the grid manually
  }
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);