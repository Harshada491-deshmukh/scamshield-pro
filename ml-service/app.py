from flask import Flask, request, jsonify
from flask_cors import CORS
from model import analyze_text, analyze_url

# Create Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from React and Node.js

print("🤖 ScamShield AI Service Loading...")


# ── MAIN PREDICTION ROUTE ────────────────────────────
# Node.js calls this to get scam prediction
@app.route("/predict", methods=["POST"])
def predict():
    # Get data sent from Node.js
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    message = data.get("message", "")
    msg_type = data.get("type", "text")

    if not message:
        return jsonify({"error": "Message is empty"}), 400

    # Choose which analyzer to use based on type
    if msg_type == "url":
        # Use URL-specific analyzer
        prediction, confidence, reasons = analyze_url(message)
    else:
        # Use text analyzer for text, qr, voice
        prediction, confidence, reasons = analyze_text(message)

    # Send result back to Node.js
    return jsonify({
        "prediction": prediction,
        "confidence": confidence,
        "reasons": reasons,
        "type": msg_type
    })


# ── HEALTH CHECK ROUTE ───────────────────────────────
# Check if AI service is running
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "message": "✅ ScamShield AI Service is Active"
    })


# ── TEST ROUTE ───────────────────────────────────────
# Test the AI directly from browser
@app.route("/test", methods=["GET"])
def test():
    test_message = "Your account will be blocked. Verify now: http://bank-secure.xyz"
    prediction, confidence, reasons = analyze_text(test_message)
    return jsonify({
        "test_message": test_message,
        "prediction": prediction,
        "confidence": confidence,
        "reasons": reasons
    })


# ── START SERVER ─────────────────────────────────────
if __name__ == "__main__":
    print("✅ AI Service running on http://localhost:8000")
    print("✅ Test it at http://localhost:8000/test")
    app.run(host="0.0.0.0", port=8000, debug=False)
