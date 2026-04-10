const Stats = require("../models/statsModel");

// create stat
exports.createStat = async (req, res) => {
  try {
    const stat = await Stats.create(req.body);
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update stat
exports.updateStat = async (req, res) => {
  try {
    const stat = await Stats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete stat
exports.deleteStat = async (req, res) => {
  try {
    await Stats.findByIdAndDelete(req.params.id);
    res.json({ message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};