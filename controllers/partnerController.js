const Partner = require('../models/PartnersModel');

// Get all partners (sorted by 'order')
exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort('order');
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new partner (for admin use)
exports.addPartner = async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};