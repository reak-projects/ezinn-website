import { useState } from "react";

export default function Product() {
  const [activeTab, setActiveTab] = useState("stand");
  const [activeHotspot, setActiveHotspot] = useState("screen");

  const componentsData = {
    screen: {
      number: "1",
      title: "15.6 Inch Full HD Touchscreen",
      desc: "Industrial-grade portrait active matrix display with anti-glare coating, high depth resolution, and multi-touch capabilities for seamless guest interaction even in bright lobby environments.",
      tag: "Interactive Display",
      specs: ["1920 × 1080 Resolution", "Anti-Glare & Fingerprint Resistant", "Integrated HD Camera & Proximity Sensor"]
    },
    scanner: {
      number: "2",
      title: "Passport & National ID Reader",
      desc: "High-precision optical OCR scanner with LED guidance landing lights. Reads ICAO-compliant international travel documents, passports, driver's licenses, and QR booking codes in under 2 seconds.",
      tag: "Identity Verification",
      specs: ["ICAO Doc 9303 Compliant", "UV, IR & Visible Light Inspection", "Instant Encrypted OCR Extraction"]
    },
    payment: {
      number: "3",
      title: "PCI-PTS EMV & NFC Payment Terminal",
      desc: "Bank-grade certified payment hardware supporting Chip & PIN, contactless NFC, Apple Pay, Google Wallet, and automated pre-authorizations directly integrated into your hotel PMS.",
      tag: "Secure Transactions",
      specs: ["PCI-PTS 5.x Certified", "Contactless EMV & Mobile Wallets", "End-to-End P2PE Encryption"]
    },
    keycard: {
      number: "4",
      title: "Automatic RFID Keycard Dispenser",
      desc: "High-capacity smart card encoder and dispenser with dual-hopper storage and automatic card capture function. Encodes and dispenses room keys into the guest's hands in under 3 seconds.",
      tag: "Key Issuance",
      specs: ["High-Capacity Dual Hopper (200+ cards)", "MIFARE & RFID Standards", "Motorized Card Encoder & Ejector"]
    }
  };

  return (
    <section id="product" className="section-padding container">
      <span className="section-tag">Hardware Architecture</span>
      <h2 className="section-title">Designed for Durability &amp; Style</h2>
      <p className="section-subtitle">
        Enterprise-grade hospitality hardware engineered for zero-downtime lobby operations and effortless maintenance.
      </p>

      {/* Form Factor Model Selector */}
      <div className="product-model-selector">
        <button
          className={`btn ${activeTab === "stand" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("stand")}
        >
          EZinn Stand Model (Flagship)
        </button>
        <button
          className={`btn ${activeTab === "compact" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setActiveTab("compact")}
        >
          EZinn Compact (Countertop)
        </button>
      </div>

      <div className="product-hardware-shell">
        {/* Hardware Visual Stage */}
        <div className="product-visual-panel">
          {activeTab === "stand" ? (
            <div className="product-kiosk-stage">
              <div className="product-image-container">
                <img
                  src="/ezinn-machine.jpg"
                  alt="EZinn Standing Kiosk Product Hardware"
                  className="product-kiosk-img"
                />

                {/* Hotspot 1: 15.6" Touchscreen */}
                <button
                  type="button"
                  className={`hotspot-btn ${activeHotspot === "screen" ? "active" : ""}`}
                  style={{ top: "25%", left: "50%" }}
                  onClick={() => setActiveHotspot("screen")}
                  aria-label="15.6 Inch Touchscreen"
                >
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-number">1</span>
                </button>

                {/* Hotspot 2: Passport / ID Scanner */}
                <button
                  type="button"
                  className={`hotspot-btn ${activeHotspot === "scanner" ? "active" : ""}`}
                  style={{ top: "42%", left: "47%" }}
                  onClick={() => setActiveHotspot("scanner")}
                  aria-label="Passport & ID Scanner"
                >
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-number">2</span>
                </button>

                {/* Hotspot 3: Payment Terminal */}
                <button
                  type="button"
                  className={`hotspot-btn ${activeHotspot === "payment" ? "active" : ""}`}
                  style={{ top: "42%", left: "57%" }}
                  onClick={() => setActiveHotspot("payment")}
                  aria-label="EMV & Contactless Payment"
                >
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-number">3</span>
                </button>

                {/* Hotspot 4: Room Key Dispenser */}
                <button
                  type="button"
                  className={`hotspot-btn ${activeHotspot === "keycard" ? "active" : ""}`}
                  style={{ top: "53%", left: "54%" }}
                  onClick={() => setActiveHotspot("keycard")}
                  aria-label="RFID Keycard Dispenser"
                >
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-number">4</span>
                </button>
              </div>

              <p className="hotspot-instruction">
                Click numbered hotspots on the kiosk to inspect hardware components
              </p>
            </div>
          ) : (
            <div className="compact-kiosk-stage">
              <div className="compact-kiosk-card">
                <div className="compact-badge">Countertop Edition</div>
                <div className="compact-icon-wrap">
                  <div className="compact-graphic">
                    <div className="compact-graphic-screen">
                      <img src="/logo.png" alt="EZinn" style={{ height: "18px", width: "auto" }} />
                    </div>
                    <div className="compact-graphic-base"></div>
                  </div>
                </div>
                <h4>Compact Reception Footprint</h4>
                <p>
                  Engineered for boutique hotels and space-conscious reception desks. Mounts directly to front desk counters or tabletops with identical processing power and verification security.
                </p>
                <div className="compact-spec-pill">Requires only 24″ × 18″ Counter Space</div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Component Description */}
        <div className="product-info-panel">
          <div className="product-info-header">
            <span className="product-tag">{componentsData[activeHotspot].tag}</span>
            <span className="product-hotspot-num">Module #{componentsData[activeHotspot].number}</span>
          </div>

          <h3 className="product-component-title">
            {componentsData[activeHotspot].title}
          </h3>

          <p className="product-component-desc">
            {componentsData[activeHotspot].desc}
          </p>

          <div className="product-spec-list">
            <h5 className="product-spec-heading">Engineering Highlights</h5>
            <ul>
              {componentsData[activeHotspot].specs.map((spec, i) => (
                <li key={i}>
                  <span className="spec-check">✓</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="product-selector-tabs">
            {Object.keys(componentsData).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveHotspot(key)}
                className={`product-spec-tab ${activeHotspot === key ? "active" : ""}`}
              >
                <span className="tab-num">{componentsData[key].number}</span>
                <span className="tab-name">{key === "keycard" ? "Keycard" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
