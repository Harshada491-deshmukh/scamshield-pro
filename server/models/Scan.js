const mongoose = require("mongoose");

// This tells MongoDB exactly what a scan record looks like
// Every time someone scans a message, it gets saved in this format
const ScanSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true      // message is compulsory
  },
  type: {
    type: String,
    default: "text"     // text, url, qr, or voice
  },
  prediction: {
    type: String        // "Scam", "Safe", or "Suspicious"
  },
  confidence: {
    type: Number        // example: 94 means 94% sure it's a scam
  },
  reasons: [String],    // list of reasons why it's a scam
  date: {
    type: Date,
    default: Date.now   // automatically saves current date & time
  }
});

// Export so other files can use it
module.exports = mongoose.model("Scan", ScanSchema);