const express = require("express");
const router = express.Router();
const axios = require("axios");
const Scan = require("../models/Scan");

// This runs when React sends a message to check
// URL: POST http://localhost:5000/api/scan
router.post("/", async (req, res) => {
  // Get message and type from React
  const { message, type } = req.body;

  // Check if message is empty
  if (!message) {
    return res.status(400).json({ error: "Please provide a message" });
  }

  try {
    // Send message to Python AI service
    const aiResponse = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      { message, type }
    );

    // Get prediction results from Python
    const { prediction, confidence, reasons } = aiResponse.data;

    // Save result to MongoDB database
    await Scan.create({
      message,
      type,
      prediction,
      confidence,
      reasons
    });

    // Send result back to React website
    res.json({
      success: true,
      prediction,
      confidence,
      reasons
    });

  } catch (error) {
    // If Python AI is not running, use basic keyword detection
    console.log("AI service not available, using basic detection");

    const scamWords = [
      "urgent", "verify", "blocked", "suspended",
      "click here", "winner", "prize", "free",
      "immediately", "otp", "password", "account will be"
    ];

    const foundWords = scamWords.filter(word =>
      message.toLowerCase().includes(word)
    );

    const isScam = foundWords.length >= 2;
    const isSuspicious = foundWords.length === 1;

    const prediction = isScam ? "Scam" : isSuspicious ? "Suspicious" : "Safe";
    const confidence = isScam ? 85 : isSuspicious ? 60 : 95;
    const reasons = foundWords.length > 0
      ? [`Suspicious words found: ${foundWords.join(", ")}`]
      : ["No suspicious patterns detected"];

    // Save to MongoDB even if AI is not running
    await Scan.create({ message, type, prediction, confidence, reasons });

    res.json({ success: true, prediction, confidence, reasons });
  }
});

module.exports = router;