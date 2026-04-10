const Video = require("../models/videoModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Upload video
exports.uploadVideo = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "portfolio_videos",
    });

    const video = new Video({
      name,
      src: result.secure_url,
      public_id: result.public_id,
    });

    await video.save();

    fs.unlinkSync(req.file.path);

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
};

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.public_id, {
      resource_type: "video",
    });

    await Video.findByIdAndDelete(req.params.id);

    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};