const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Create the server app
const app = express();

// ── MIDDLEWARE ──────────────────────────────────────
// These 2 lines allow React to talk to this server
app.use(cors());
app.use(express.json());

// ── CONNECT TO MONGODB ──────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 
                  "mongodb://localhost:27017/scamshield";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));

// ── ROUTES ──────────────────────────────────────────
// These connect URLs to your route files
app.use("/api/scan", require("./routes/scan"));
app.use("/api/history", require("./routes/history"));

// ── TEST ROUTE ──────────────────────────────────────
// Open this in browser to check server is running
app.get("/", (req, res) => {
  res.json({ message: "✅ ScamShield Pro Server is Running!" });
});

// ── START SERVER ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});