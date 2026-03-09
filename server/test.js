// Simple tests to verify backend works
console.log("🧪 Running Backend Tests...");
console.log("================================");

// Test 1 — Check Express loads
try {
  const express = require("express");
  console.log("✅ Test 1 Passed: Express loaded");
} catch (e) {
  console.log("❌ Test 1 Failed:", e.message);
}

// Test 2 — Check Mongoose loads
try {
  const mongoose = require("mongoose");
  console.log("✅ Test 2 Passed: Mongoose loaded");
} catch (e) {
  console.log("❌ Test 2 Failed:", e.message);
}

// Test 3 — Check Scan model loads
try {
  const Scan = require("./models/Scan");
  console.log("✅ Test 3 Passed: Scan model loaded");
} catch (e) {
  console.log("❌ Test 3 Failed:", e.message);
}

// Test 4 — Check routes exist
try {
  const fs = require("fs");
  const scanExists = fs.existsSync("./routes/scan.js");
  const historyExists = fs.existsSync("./routes/history.js");
  if (scanExists && historyExists) {
    console.log("✅ Test 4 Passed: All route files exist");
  } else {
    console.log("❌ Test 4 Failed: Route files missing");
  }
} catch (e) {
  console.log("❌ Test 4 Failed:", e.message);
}

// Test 5 — Check environment config
try {
  const fs = require("fs");
  const envExists = fs.existsSync("./.env");
  if (envExists) {
    console.log("✅ Test 5 Passed: .env file exists");
  } else {
    console.log("⚠️  Test 5 Warning: .env file missing");
  }
} catch (e) {
  console.log("❌ Test 5 Failed:", e.message);
}

console.log("================================");
console.log("✅ Backend tests complete!");