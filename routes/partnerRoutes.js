const express = require('express');
const router = express.Router();
const { getPartners, addPartner } = require('../controllers/partnerController');

// Public route to get logos for the frontend grid
router.get('/', getPartners);

// Protected route (ideally add auth middleware here) to add logos
router.post('/add', addPartner);

module.exports = router;