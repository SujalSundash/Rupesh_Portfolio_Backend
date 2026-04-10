const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadVideo,
  getVideos,
  deleteVideo,
} = require("../controllers/videoController");

router.get("/", getVideos);

router.post("/upload", upload.single("video"), uploadVideo);

router.delete("/:id", deleteVideo);

module.exports = router;    