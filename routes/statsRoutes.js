const express = require("express");
const router = express.Router();

const {
  createStat,
  getStats,
  updateStat,
  deleteStat,
} = require("../controllers/statsController");

router.post("/", createStat);
router.get("/", getStats);
router.put("/:id", updateStat);
router.delete("/:id", deleteStat);

module.exports = router;