import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      background: "linear-gradient(135deg, #1e3a5f, #1A56DB)",
      padding: "14px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>

      {/* Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10
      }}>
        <span style={{ fontSize: 26 }}>🛡️</span>
        <div>
          <div style={{
            fontWeight: 800,
            fontSize: 18,
            color: "white",
            lineHeight: 1.2
          }}>
            ScamShield Pro
          </div>
          <div style={{
            fontSize: 10,
            color: "#93c5fd",
            letterSpacing: 1
          }}>
            AI POWERED PROTECTION
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { path: "/",        label: "🔍 Scan",    },
          { path: "/history", label: "📋 History", }
        ].map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              padding: "8px 20px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              color: "white",
              background: location.pathname === link.path
                ? "rgba(255,255,255,0.2)"
                : "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s",
              cursor: "pointer"
            }}>
              {link.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Status Badge */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(34,197,94,0.15)",
        border: "1px solid rgba(34,197,94,0.3)",
        padding: "6px 14px",
        borderRadius: 99
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 8px #22c55e"
        }} />
        <span style={{
          color: "#86efac",
          fontSize: 12,
          fontWeight: 600
        }}>
          AI Active
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
