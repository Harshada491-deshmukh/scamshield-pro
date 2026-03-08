const express = require("express");
const router = express.Router();
const Scan = require("../models/Scan");

// This runs when React wants to see past scans
// URL: GET http://localhost:5000/api/history
router.get("/", async (req, res) => {
  try {
    // Get last 50 scans from MongoDB, newest first
    const scans = await Scan.find()
      .sort({ date: -1 })
      .limit(50);

    res.json(scans);

  } catch (error) {
    console.log("Error fetching history:", error);
    res.status(500).json({ error: "Could not fetch history" });
  }
});

module.exports = router;