import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [scans, setScans]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  // Load scan history when page opens
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/history"
      );
      setScans(response.data);
    } catch (error) {
      alert("Could not load history. Make sure server is running!");
    }
    setLoading(false);
  };

  // Filter scans by prediction type
  const filteredScans = filter === "All"
    ? scans
    : scans.filter(s => s.prediction === filter);

  // Get color based on prediction
  const getColor = (prediction) => {
    if (prediction === "Scam")       return "#ef4444";
    if (prediction === "Suspicious") return "#f59e0b";
    return "#22c55e";
  };

  // Get background based on prediction
  const getBg = (prediction) => {
    if (prediction === "Scam")       return "#450a0a";
    if (prediction === "Suspicious") return "#422006";
    return "#052e16";
  };

  // Get emoji based on prediction
  const getEmoji = (prediction) => {
    if (prediction === "Scam")       return "⚠️";
    if (prediction === "Suspicious") return "🟡";
    return "✅";
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: "50px auto",
      padding: "0 20px"
    }}>

      {/* Page Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28
      }}>
        <div>
          <h1 style={{
            fontSize: 32,
            color: "#38bdf8",
            margin: "0 0 6px"
          }}>
            📋 Scan History
          </h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: 15 }}>
            Total scans: {scans.length}
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchHistory}
          style={{
            padding: "10px 20px",
            background: "#1e293b",
            color: "#38bdf8",
            border: "2px solid #334155",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        marginBottom: 24
      }}>
        {[
          {
            label: "Total Scams",
            count: scans.filter(s => s.prediction === "Scam").length,
            color: "#ef4444",
            bg: "#450a0a",
            emoji: "⚠️"
          },
          {
            label: "Suspicious",
            count: scans.filter(s => s.prediction === "Suspicious").length,
            color: "#f59e0b",
            bg: "#422006",
            emoji: "🟡"
          },
          {
            label: "Safe",
            count: scans.filter(s => s.prediction === "Safe").length,
            color: "#22c55e",
            bg: "#052e16",
            emoji: "✅"
          }
        ].map((stat, i) => (
          <div key={i} style={{
            background: stat.bg,
            border: `2px solid ${stat.color}`,
            borderRadius: 12,
            padding: "16px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.emoji}</div>
            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: stat.color
            }}>
              {stat.count}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["All", "Scam", "Suspicious", "Safe"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 18px",
              borderRadius: 8,
              border: `2px solid ${filter === f ? "#1A56DB" : "#334155"}`,
              background: filter === f ? "#1A56DB" : "#1e293b",
              color: filter === f ? "white" : "#94a3b8",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          textAlign: "center",
          padding: 60,
          color: "#94a3b8",
          fontSize: 18
        }}>
          ⏳ Loading history...
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredScans.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: 60,
          color: "#94a3b8",
          background: "#1e293b",
          borderRadius: 14,
          border: "2px dashed #334155"
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <p style={{ fontSize: 18, margin: 0 }}>
            {filter === "All"
              ? "No scans yet! Go scan something."
              : `No ${filter} messages found.`}
          </p>
        </div>
      )}

      {/* Scan Cards */}
      {!loading && filteredScans.map((scan, i) => (
        <div key={i} style={{
          background: getBg(scan.prediction),
          border: `2px solid ${getColor(scan.prediction)}`,
          borderRadius: 12,
          padding: "18px 20px",
          marginBottom: 12,
          transition: "transform 0.1s"
        }}>

          {/* Card Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}>

            {/* Prediction Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span style={{
                background: getColor(scan.prediction),
                color: "white",
                padding: "3px 12px",
                borderRadius: 99,
                fontWeight: 700,
                fontSize: 13
              }}>
                {getEmoji(scan.prediction)} {scan.prediction}
              </span>
              <span style={{
                color: "#94a3b8",
                fontSize: 13,
                background: "#1e293b",
                padding: "3px 10px",
                borderRadius: 99
              }}>
                {scan.type || "text"}
              </span>
            </div>

            {/* Date & Confidence */}
            <div style={{ textAlign: "right" }}>
              <div style={{
                color: getColor(scan.prediction),
                fontWeight: 700,
                fontSize: 15
              }}>
                {scan.confidence}%
              </div>
              <div style={{ color: "#64748b", fontSize: 12 }}>
                {formatDate(scan.date)}
              </div>
            </div>
          </div>

          {/* Message Preview */}
          <p style={{
            margin: "0 0 8px",
            color: "#cbd5e1",
            fontSize: 14,
            lineHeight: 1.5,
            background: "rgba(0,0,0,0.2)",
            padding: "8px 12px",
            borderRadius: 8
          }}>
            {scan.message.length > 120
              ? scan.message.substring(0, 120) + "..."
              : scan.message}
          </p>

          {/* Reasons */}
          {scan.reasons && scan.reasons.length > 0 && (
            <p style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: 13
            }}>
              💡 {scan.reasons[0]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default History;