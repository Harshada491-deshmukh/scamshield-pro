import { Link, useLocation } from "react-router-dom";

function Navbar() {
  // This tells us which page we are currently on
  const location = useLocation();

  return (
    <nav style={{
      background: "#1A56DB",
      padding: "16px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 28 }}>🛡️</span>
        <span style={{
          fontWeight: 800,
          fontSize: 22,
          color: "white",
          letterSpacing: 0.5
        }}>
          ScamShield Pro
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: 8 }}>

        {/* Scan Link */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "8px 20px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            color: "white",
            background: location.pathname === "/" 
              ? "rgba(255,255,255,0.25)" 
              : "transparent",
            border: "2px solid rgba(255,255,255,0.3)",
            cursor: "pointer"
          }}>
            🔍 Scan
          </div>
        </Link>

        {/* History Link */}
        <Link to="/history" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "8px 20px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            color: "white",
            background: location.pathname === "/history"
              ? "rgba(255,255,255,0.25)"
              : "transparent",
            border: "2px solid rgba(255,255,255,0.3)",
            cursor: "pointer"
          }}>
            📋 History
          </div>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
