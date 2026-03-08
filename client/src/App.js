import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("text");

  // This runs when user clicks "Check for Scam" button
  const handleScan = async () => {
    if (!message.trim()) {
      alert("Please enter a message first!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Send message to Node.js server
      const response = await axios.post("http://localhost:5000/api/scan", {
        message: message,
        type: tab
      });

      // Save result to show on screen
      setResult(response.data);

    } catch (error) {
      alert("Error! Make sure server is running on port 5000");
    }

    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#0f172a",
      minHeight: "100vh", color: "white" }}>

      {/* Navbar */}
      <nav style={{ background: "#1A56DB", padding: "16px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: 22 }}>🛡️ ScamShield Pro</span>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>🔍 Scan</a>
          <a href="/history" style={{ color: "white", textDecoration: "none" }}>📋 History</a>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 36, textAlign: "center", color: "#38bdf8" }}>
          🛡️ AI Scam Detector
        </h1>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 16, marginBottom: 32 }}>
          Paste any suspicious message, URL or SMS below
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { key: "text", label: "📝 Text" },
            { key: "url", label: "🔗 URL" },
            { key: "qr", label: "📷 QR Code" },
            { key: "voice", label: "🎙️ Voice" }
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                fontWeight: 600, fontSize: 13,
                background: tab === t.key ? "#1A56DB" : "#1e293b",
                color: tab === t.key ? "white" : "#94a3b8",
                border: `2px solid ${tab === t.key ? "#1A56DB" : "#334155"}`
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <textarea
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={
            tab === "text" ? "Paste suspicious SMS, email or WhatsApp message..." :
            tab === "url" ? "Paste suspicious URL or link..." :
            tab === "qr" ? "Paste decoded QR code text or URL..." :
            "Paste transcribed voice message text..."
          }
          style={{
            width: "100%", padding: 16, fontSize: 15, borderRadius: 12,
            border: "2px solid #334155", background: "#1e293b",
            color: "white", resize: "vertical", boxSizing: "border-box"
          }}
        />

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={loading}
          style={{
            width: "100%", marginTop: 16, padding: "14px",
            background: loading ? "#334155" : "#1A56DB",
            color: "white", border: "none", borderRadius: 12,
            fontSize: 18, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "⏳ Analyzing message..." : "🔍 Check for Scam"}
        </button>

        {/* Result Box */}
        {result && (
          <div style={{
            marginTop: 32, padding: 24, borderRadius: 14,
            background: result.prediction === "Scam" ? "#450a0a" :
                        result.prediction === "Suspicious" ? "#422006" : "#052e16",
            border: `2px solid ${
              result.prediction === "Scam" ? "#ef4444" :
              result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e"}`
          }}>
            {/* Prediction Label */}
            <h2 style={{
              margin: "0 0 16px", fontSize: 24,
              color: result.prediction === "Scam" ? "#ef4444" :
                     result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e"
            }}>
              {result.prediction === "Scam" ? "⚠️ SCAM DETECTED" :
               result.prediction === "Suspicious" ? "🟡 SUSPICIOUS MESSAGE" :
               "✅ MESSAGE LOOKS SAFE"}
            </h2>

            {/* Confidence Bar */}
            <p style={{ margin: "0 0 8px", color: "#94a3b8" }}>
              Confidence: <strong style={{ color: "white" }}>{result.confidence}%</strong>
            </p>
            <div style={{ background: "#1e293b", borderRadius: 99, height: 12, marginBottom: 20 }}>
              <div style={{
                width: `${result.confidence}%`, height: 12, borderRadius: 99,
                background: result.prediction === "Scam" ? "#ef4444" :
                            result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e",
                transition: "width 0.5s ease"
              }} />
            </div>

            {/* Reasons */}
            <p style={{ margin: "0 0 8px", color: "#94a3b8" }}>
              <strong style={{ color: "white" }}>Reasons:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {result.reasons?.map((reason, i) => (
                <li key={i} style={{ color: "#e2e8f0", marginBottom: 4 }}>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;