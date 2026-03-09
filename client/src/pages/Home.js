import { useState } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage]   = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [tab, setTab]           = useState("text");
  const [scanCount, setScanCount] = useState(0);

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
      setScanCount(prev => prev + 1);
    } catch (error) {
      alert("Error! Make sure all 3 servers are running.");
    }
    setLoading(false);
  };

  const handleClear = () => {
    setMessage("");
    setResult(null);
  };

  const tabs = [
    { key: "text",  label: "📝 Text",     placeholder: "Paste suspicious SMS, email or WhatsApp message..." },
    { key: "url",   label: "🔗 URL",      placeholder: "Paste suspicious URL or link here..." },
    { key: "qr",    label: "📷 QR Code",  placeholder: "Paste decoded QR code text or URL..." },
    { key: "voice", label: "🎙️ Voice",   placeholder: "Paste transcribed voice message text here..." }
  ];

  const currentTab = tabs.find(t => t.key === tab);

  return (
    <div style={{
      maxWidth: 750,
      margin: "0 auto",
      padding: "40px 20px"
    }}>

      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        marginBottom: 40,
        padding: "30px",
        background: "linear-gradient(135deg, #1e3a5f 0%, #1A56DB 100%)",
        borderRadius: 20,
        border: "1px solid #2563eb"
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🛡️</div>
        <h1 style={{
          fontSize: 36,
          color: "white",
          margin: "0 0 10px",
          fontWeight: 800
        }}>
          AI Scam Detector
        </h1>
        <p style={{
          color: "#93c5fd",
          fontSize: 16,
          margin: "0 0 20px"
        }}>
          Powered by BERT • Multilingual • Real-time Detection
        </p>

        {/* Stats Bar */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          marginTop: 16
        }}>
          {[
            { label: "Scans Today",    value: scanCount,  color: "#38bdf8" },
            { label: "AI Models",      value: "5",        color: "#34d399" },
            { label: "Accuracy",       value: "94%",      color: "#f59e0b" },
            { label: "Languages",      value: "3",        color: "#a78bfa" }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 24,
                fontWeight: 800,
                color: stat.color
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 12,
                color: "#93c5fd"
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 14,
        background: "#1e293b",
        padding: 6,
        borderRadius: 12
      }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setResult(null); }}
            style={{
              flex: 1,
              padding: "10px 8px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              background: tab === t.key
                ? "#1A56DB"
                : "transparent",
              color: tab === t.key ? "white" : "#64748b",
              transition: "all 0.2s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div style={{
        background: "#1e293b",
        borderRadius: 16,
        padding: 20,
        border: "2px solid #334155",
        marginBottom: 14
      }}>
        <textarea
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={currentTab.placeholder}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: 15,
            resize: "vertical",
            fontFamily: "Arial",
            lineHeight: 1.6,
            boxSizing: "border-box"
          }}
        />

        {/* Character Count */}
        <div style={{
          textAlign: "right",
          color: "#475569",
          fontSize: 12,
          marginTop: 8
        }}>
          {message.length} characters
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <button
          onClick={handleScan}
          disabled={loading}
          style={{
            flex: 1,
            padding: "15px",
            background: loading
              ? "#334155"
              : "linear-gradient(135deg, #1A56DB, #2563eb)",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 15px rgba(26,86,219,0.4)",
            transition: "all 0.2s"
          }}
        >
          {loading ? "⏳ Analyzing with AI..." : "🔍 Check for Scam"}
        </button>

        <button
          onClick={handleClear}
          style={{
            padding: "15px 22px",
            background: "#1e293b",
            color: "#64748b",
            border: "2px solid #334155",
            borderRadius: 12,
            fontSize: 15,
            cursor: "pointer"
          }}
        >
          🗑️
        </button>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div style={{
          textAlign: "center",
          padding: 30,
          background: "#1e293b",
          borderRadius: 16,
          marginBottom: 20
        }}>
          <div style={{
            fontSize: 40,
            marginBottom: 12,
            animation: "spin 1s linear infinite"
          }}>
            🤖
          </div>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            AI is analyzing your message...
          </p>
          <p style={{ color: "#475569", fontSize: 13, margin: "4px 0 0" }}>
            Checking keywords • URLs • Patterns • Language
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          border: `2px solid ${
            result.prediction === "Scam"       ? "#ef4444" :
            result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e"
          }`,
          boxShadow: `0 0 30px ${
            result.prediction === "Scam"       ? "rgba(239,68,68,0.2)" :
            result.prediction === "Suspicious" ? "rgba(245,158,11,0.2)" :
                                                 "rgba(34,197,94,0.2)"
          }`
        }}>

          {/* Result Header */}
          <div style={{
            padding: "20px 24px",
            background:
              result.prediction === "Scam"       ? "#7f1d1d" :
              result.prediction === "Suspicious" ? "#78350f" : "#14532d",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{
              fontSize: 22,
              fontWeight: 800,
              color: "white"
            }}>
              {result.prediction === "Scam"       ? "⚠️ SCAM DETECTED"      :
               result.prediction === "Suspicious" ? "🟡 SUSPICIOUS MESSAGE" :
                                                    "✅ MESSAGE IS SAFE"}
            </div>
            <div style={{
              background: "rgba(0,0,0,0.3)",
              padding: "6px 16px",
              borderRadius: 99,
              color: "white",
              fontWeight: 700,
              fontSize: 18
            }}>
              {result.confidence}%
            </div>
          </div>

          {/* Result Body */}
          <div style={{
            padding: "20px 24px",
            background:
              result.prediction === "Scam"       ? "#450a0a" :
              result.prediction === "Suspicious" ? "#422006" : "#052e16"
          }}>

            {/* Confidence Bar */}
            <p style={{
              margin: "0 0 8px",
              color: "#94a3b8",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              Confidence Level
            </p>
            <div style={{
              background: "#1e293b",
              borderRadius: 99,
              height: 16,
              marginBottom: 24,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${result.confidence}%`,
                height: 16,
                borderRadius: 99,
                background:
                  result.prediction === "Scam"       ? "#ef4444" :
                  result.prediction === "Suspicious" ? "#f59e0b" : "#22c55e",
                transition: "width 0.8s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8
              }}>
                <span style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: 700
                }}>
                  {result.confidence}%
                </span>
              </div>
            </div>

            {/* Reasons */}
            <p style={{
              margin: "0 0 12px",
              color: "#94a3b8",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              🔍 Why AI flagged this:
            </p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}>
              {result.reasons?.map((reason, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  background: "rgba(0,0,0,0.2)",
                  padding: "10px 14px",
                  borderRadius: 10
                }}>
                  <span style={{ fontSize: 16 }}>
                    {result.prediction === "Scam"       ? "🚨" :
                     result.prediction === "Suspicious" ? "⚠️" : "✅"}
                  </span>
                  <span style={{
                    color: "#e2e8f0",
                    fontSize: 14,
                    lineHeight: 1.5
                  }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {/* Safety Tips */}
            {result.prediction === "Scam" && (
              <div style={{
                marginTop: 20,
                padding: "14px 16px",
                background: "rgba(239,68,68,0.1)",
                borderRadius: 10,
                border: "1px solid rgba(239,68,68,0.3)"
              }}>
                <p style={{
                  color: "#fca5a5",
                  margin: "0 0 8px",
                  fontWeight: 700,
                  fontSize: 14
                }}>
                  🛡️ Safety Tips:
                </p>
                <ul style={{
                  margin: 0,
                  paddingLeft: 18,
                  color: "#fca5a5",
                  fontSize: 13
                }}>
                  <li>Do NOT click any links in this message</li>
                  <li>Do NOT share OTP, password or bank details</li>
                  <li>Report this message to cybercrime.gov.in</li>
                  <li>Block the sender immediately</li>
                </ul>
              </div>
            )}

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
                fontSize: 14,
                width: "100%"
              }}
            >
              🔄 Scan Another Message
            </button>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      {!result && !loading && (
        <div style={{
          marginTop: 32,
          padding: 24,
          background: "#1e293b",
          borderRadius: 16,
          border: "1px solid #334155"
        }}>
          <h3 style={{
            color: "#38bdf8",
            margin: "0 0 16px",
            fontSize: 16
          }}>
            ⚡ How ScamShield AI Works
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12
          }}>
            {[
              { icon: "🔤", title: "Keyword Analysis",   desc: "Detects 50+ scam trigger words" },
              { icon: "🔗", title: "URL Scanning",       desc: "Checks for phishing domains" },
              { icon: "⚡", title: "Pattern Detection",  desc: "Identifies urgency tactics" },
              { icon: "🌐", title: "Multilingual",       desc: "Hindi, Marathi & English" }
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                padding: "10px 12px",
                background: "#0f172a",
                borderRadius: 10
              }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: 13,
                    marginBottom: 2
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    color: "#64748b",
                    fontSize: 12
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;