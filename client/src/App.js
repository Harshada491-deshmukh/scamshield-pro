function App() {
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
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 18 }}>
          Paste any message, URL, or SMS to check if it's a scam
        </p>

        {/* Input Box */}
        <textarea
          rows={6}
          placeholder="Paste suspicious message here..."
          style={{ width: "100%", padding: 16, fontSize: 15, borderRadius: 12,
            border: "2px solid #334155", background: "#1e293b", color: "white",
            resize: "vertical", boxSizing: "border-box", marginTop: 24 }}
        />

        {/* Button */}
        <button style={{ width: "100%", marginTop: 16, padding: "14px",
          background: "#1A56DB", color: "white", border: "none",
          borderRadius: 12, fontSize: 18, fontWeight: 700, cursor: "pointer" }}>
          🔍 Check for Scam
        </button>

        {/* Result will show here later */}
        <div style={{ marginTop: 32, padding: 24, borderRadius: 14,
          background: "#1e293b", textAlign: "center", color: "#94a3b8" }}>
          Result will appear here after you click the button...
        </div>
      </div>
    </div>
  );
}

export default App;