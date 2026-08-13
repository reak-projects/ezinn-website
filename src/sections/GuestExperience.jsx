
export default function GuestExperience() {
  const features = [
    { title: "No Queue Anxiety", desc: "Walk straight from the entrance to an active EZinn terminal." },
    { title: "Multi-Language UI", desc: "Guests select their preferred language with a single tap." },
    { title: "Instant Key Delivery", desc: "RFID keycard dispensed directly into the guest's hands." },
    { title: "Privacy & Security", desc: "Encrypted ID verification and PCI-compliant payment protection." }
  ];

  return (
    <section id="guest-experience" className="section-padding container">
      <div className="experience-grid">
        <div>
          <span className="section-tag">Guest Experience</span>
          <h2 className="section-title">Arrival made effortless for every traveler.</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            Whether arriving after a long flight or checking in during peak hours, EZinn provides guests with total control over their check-in process.
          </p>

          <div className="feature-list">
            {features.map((item, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">✓</div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{item.title}</h4>
                  <p style={{ fontSize: "0.95rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: "#283338",
          color: "#FCFCFB",
          borderRadius: "20px",
          padding: "48px 40px",
          border: "1px solid rgba(40,51,56,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          <span style={{ color: "#E8A05B", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
            Guest Journey Guarantee
          </span>
          <h3 style={{ color: "#FCFCFB", fontSize: "2rem", margin: "16px 0" }}>
            Sub-60-second check-in time
          </h3>
          <p style={{ color: "rgba(252,252,251,0.8)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "28px" }}>
            By combining registration lookup, identity reading, and card dispensing into one sleek hardware unit, guests complete their arrival in under a minute.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", padding: "16px 20px", borderRadius: "10px", flex: 1, minWidth: "120px" }}>
              <div style={{ color: "#06858F", fontWeight: 800, fontSize: "1.5rem" }}>&lt; 60s</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Average Check-In</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", padding: "16px 20px", borderRadius: "10px", flex: 1, minWidth: "120px" }}>
              <div style={{ color: "#E8A05B", fontWeight: 800, fontSize: "1.5rem" }}>100%</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Self-Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
