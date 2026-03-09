import { useState } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("text");

  const handleScan = async () => {
    if (!message.trim()) {
      alert("Please enter a message first!");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/scan",
        { message, type: tab }
      );
      setResult(response.data);
    } catch (error) {
      alert("Error! Make sure server is running on port 5000");
    }
    setLoading(false);
  };

  // Clear everything for new scan
  const handleClear = () => {
    setMessage("");
    setResult(null);
  };

  return (
    <div style={{
      maxWidth: 720,
      margin: "50px auto",
      padding: "0 20px"
    }}>

      {/* Page Title */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{
          fontSize: 38,
          color: "#38bdf8",
          margin: "0 0 10px"
        }}>
          🛡️ AI Scam Detector
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 16, margin: 0 }}>
          Paste any suspicious message, URL or SMS to instantly check
        </p>
      </div>

      {/* Input Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { key: "text",  label: "📝 Text"    },
          { key: "url",   label: "🔗 URL"     },
          { key: "qr",    label: "📷 QR Code" },
          { key: "voice", label: "🎙️ Voice"  }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setResult(null); }}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              border: `2px solid ${tab === t.key ? "#1A56DB" : "#334155"}`,
              background: tab === t.key ? "#1A56DB" : "#1e293b",
              color: tab === t.key ? "white" : "#94a3b8",
              transition: "all 0.2s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Text Input */}
      <textarea
        rows={6}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={
          tab === "text"  ? "Paste suspicious SMS, email or WhatsApp message..." :
          tab === "url"   ? "Paste suspicious URL or link here..." :
          tab === "qr"    ? "Paste decoded QR code text or URL..." :
                            "Paste transcribed voice message text here..."
        }
        style={{
          width: "100%",
          padding: 16,
          fontSize: 15,
          borderRadius: 12,
          border: "2px solid #334155",
          background: "#1e293b",
          color: "white",
          resize: "vertical",
          boxSizing: "border-box",
          outline: "none",
          fontFamily: "Arial"
        }}
      />

      {/* Buttons Row */}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={loading}
          style={{
            flex: 1,
            padding: "14px",
            background: loading ? "#334155" : "#1A56DB",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          {loading ? "⏳ Analyzing..." : "🔍 Check for Scam"}
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          style={{
            padding: "14px 22px",
            background: "#1e293b",
            color: "#94a3b8",
            border: "2px solid #334155",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Result Box */}
      {result && (
        <div style={{
          marginTop: 28,
          padding: 24,
          borderRadius: 14,
          background:
            result.prediction === "Scam"       ? "#450a0a" :
            result.prediction === "Suspicious" ? "#422006" : "#052e16",
          border: `2px solid ${
            result.prediction === "Scam"       ? "#ef4444" :
            result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e"
          }`,
          animation: "fadeIn 0.4s ease"
        }}>

          {/* Prediction Badge */}
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 99,
            marginBottom: 14,
            fontWeight: 800,
            fontSize: 20,
            background:
              result.prediction === "Scam"       ? "#ef4444" :
              result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e",
            color: "white"
          }}>
            {result.prediction === "Scam"       ? "⚠️ SCAM DETECTED"      :
             result.prediction === "Suspicious" ? "🟡 SUSPICIOUS MESSAGE" :
                                                  "✅ MESSAGE IS SAFE"}
          </div>

          {/* Confidence Score */}
          <p style={{ margin: "0 0 6px", color: "#94a3b8", fontSize: 14 }}>
            AI Confidence Score
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20
          }}>
            <div style={{
              flex: 1,
              background: "#1e293b",
              borderRadius: 99,
              height: 14
            }}>
              <div style={{
                width: `${result.confidence}%`,
                height: 14,
                borderRadius: 99,
                background:
                  result.prediction === "Scam"       ? "#ef4444" :
                  result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e",
                transition: "width 0.6s ease"
              }} />
            </div>
            <span style={{
              color: "white",
              fontWeight: 700,
              fontSize: 18,
              minWidth: 50
            }}>
              {result.confidence}%
            </span>
          </div>

          {/* Reasons */}
          <p style={{
            margin: "0 0 10px",
            color: "#94a3b8",
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1
          }}>
            Why AI flagged this:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {result.reasons?.map((reason, i) => (
              <li key={i} style={{
                color: "#e2e8f0",
                marginBottom: 6,
                fontSize: 15,
                lineHeight: 1.5
              }}>
                {reason}
              </li>
            ))}
          </ul>

          {/* Scan Again Button */}
          <button
            onClick={handleClear}
            style={{
              marginTop: 20,
              padding: "10px 24px",
              background: "transparent",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14
            }}
          >
            🔄 Scan Another Message
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
