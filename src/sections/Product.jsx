import { useState } from "react";

export default function Product() {
  const [activeTab, setActiveTab] = useState("stand");
  const [activeHotspot, setActiveHotspot] = useState("screen");

  const componentsData = {
    screen: {
      title: "15.6 Inch Full HD Touchscreen",
      desc: "Industrial-grade active matrix display with anti-glare coating, high depth resolution, and multi-touch capabilities for seamless guest interaction.",
      tag: "Interactive Display"
    },
    scanner: {
      title: "Passport & National ID Reader",
      desc: "Optical OCR scanner with LED landing lights. Reads ICAO-compliant travel documents, passports, and driver's licenses globally in under 2 seconds.",
      tag: "Identity Verification"
    },
    payment: {
      title: "PCI-PTS EMV & NFC Payment Terminal",
      desc: "Full PCI compliance supporting Chip & PIN, contactless NFC, Apple Pay, Google Wallet, and automated pre-authorizations.",
      tag: "Secure Transactions"
    },
    keycard: {
      title: "Automatic RFID Keycard Dispenser",
      desc: "High-capacity smart card encoder and dispenser with dual-hopper storage and automatic card capture function.",
      tag: "Key Issuance"
    }
  };

  return (
    <section id="product" className="section-padding container">
      <span className="section-tag" style={{ color: "var(--ez-teal-secondary)" }}>Hardware Architecture</span>
      <h2 className="section-title">Designed for Durability &amp; Style</h2>
      <p className="section-subtitle">
        High-grade components engineered for zero-downtime hotel lobby operations and effortless maintenance.
      </p>

      {/* Form Factor Model Selector */}
      <div className="product-model-selector" style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
        <button
          className={`btn ${activeTab === "stand" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("stand")}
        >
          EZinn Stand Model
        </button>
        <button
          className={`btn ${activeTab === "compact" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("compact")}
        >
          EZinn Compact (Countertop)
        </button>
      </div>

      <div className="product-hardware-shell" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "center",
        background: "var(--ez-shadow-dark)",
        color: "var(--ez-white)",
        borderRadius: "var(--ez-radius-lg)",
        padding: "48px",
        boxShadow: "var(--ez-shadow-lg)"
      }}>
        {/* Hardware Visual Preview */}
        <div className="product-visual-panel" style={{
          position: "relative",
          background: "linear-gradient(180deg, #283338 0%, #1c2428 100%)",
          borderRadius: "16px",
          padding: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.08)"
        }}>
          <div style={{
            width: activeTab === "stand" ? "220px" : "260px",
            height: activeTab === "stand" ? "360px" : "240px",
            background: "#111827",
            borderRadius: "12px",
            border: "2px solid var(--ez-primary)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 0 25px rgba(6, 133, 143, 0.3)"
          }}>
            {/* Screen Hotspot */}
            <div
              onClick={() => setActiveHotspot("screen")}
              style={{
                width: "100%",
                height: "120px",
                background: activeHotspot === "screen" ? "var(--ez-primary)" : "var(--ez-teal-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: activeHotspot === "screen" ? "2px solid var(--ez-accent)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFF" }}>
                15.6 Inch Touchscreen
              </span>
            </div>

            {/* Passport Reader Hotspot */}
            <div
              onClick={() => setActiveHotspot("scanner")}
              style={{
                width: "90%",
                height: "32px",
                background: activeHotspot === "scanner" ? "var(--ez-accent)" : "#283338",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.1)",
                color: activeHotspot === "scanner" ? "var(--ez-dark)" : "#ADC7CA",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              Passport / ID Reader
            </div>

            {/* Payment Terminal Hotspot */}
            <div
              onClick={() => setActiveHotspot("payment")}
              style={{
                width: "85%",
                height: "36px",
                background: activeHotspot === "payment" ? "var(--ez-accent)" : "#1F2937",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.1)",
                color: activeHotspot === "payment" ? "var(--ez-dark)" : "#ADC7CA",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              EMV Payment &amp; NFC
            </div>

            {/* Key Dispenser Hotspot */}
            <div
              onClick={() => setActiveHotspot("keycard")}
              style={{
                width: "70%",
                height: "28px",
                background: activeHotspot === "keycard" ? "var(--ez-accent)" : "#111827",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.1)",
                color: activeHotspot === "keycard" ? "var(--ez-dark)" : "#ADC7CA",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              RFID Key Dispenser
            </div>
          </div>
          <p style={{ marginTop: "16px", fontSize: "0.8rem", color: "var(--ez-teal-light)", opacity: 0.8 }}>
            Click components on the diagram to inspect details
          </p>
        </div>

        {/* Selected Component Description */}
        <div className="product-info-panel">
          <span style={{
            background: "rgba(6, 133, 143, 0.2)",
            color: "var(--ez-teal-light)",
            padding: "4px 12px",
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase"
          }}>
            {componentsData[activeHotspot].tag}
          </span>
          <h3 style={{ color: "var(--ez-white)", fontSize: "2rem", margin: "16px 0 12px" }}>
            {componentsData[activeHotspot].title}
          </h3>
          <p style={{ color: "rgba(252,252,251,0.8)", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "28px" }}>
            {componentsData[activeHotspot].desc}
          </p>

          <div className="product-component-grid" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {Object.keys(componentsData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveHotspot(key)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: activeHotspot === key ? "1px solid var(--ez-accent)" : "1px solid rgba(255,255,255,0.1)",
                  background: activeHotspot === key ? "var(--ez-accent)" : "transparent",
                  color: activeHotspot === key ? "var(--ez-dark)" : "var(--ez-white)",
                  fontSize: "0.825rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
