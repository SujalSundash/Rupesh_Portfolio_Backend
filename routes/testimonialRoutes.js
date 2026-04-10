const express = require("express");
const router = express.Router();

const testimonialController = require("../controllers/testimonialController");
const authorize = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public routes
router.get("/", testimonialController.getTestimonials);
router.get("/:id", testimonialController.getTestimonialById);

// Protected routes
router.post("/", authorize, roleMiddleware("admin"), testimonialController.createTestimonial);
router.put("/:id", authorize, roleMiddleware("admin"), testimonialController.updateTestimonial);
router.delete("/:id", authorize, roleMiddleware("admin"), testimonialController.deleteTestimonial);

module.exports = router;