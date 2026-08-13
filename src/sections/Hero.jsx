
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="section-tag">Self-Service Hospitality Kiosk</span>
          <h1 className="hero-title">
            Hotel check-in, <span>without the wait.</span>
          </h1>
          <p className="hero-description">
            EZinn lets guests verify their identity, complete payment, and receive their room key through an intuitive self-service kiosk — eliminating reception queues and front-desk friction.
          </p>
          <div className="hero-actions">
            <a href="#story" className="btn btn-primary">See How It Works</a>
            <a href="#request-demo" className="btn btn-ghost">Request a Demo</a>
          </div>
        </div>

        <div className="hero-kiosk-card">
          <div className="kiosk-mock-container">
            <div className="kiosk-mock-screen">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src="/logo.png"
                  alt="EZinn Kiosk Logo"
                  style={{ height: "30px", width: "auto", filter: "brightness(0) invert(1)" }}
                />
                <h4 style={{ marginTop: "6px" }}>Welcome to Grand Palms</h4>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                Tap to Start Check-In
              </div>
            </div>
            
            <div className="kiosk-mock-components">
              <div className="mock-slot">
                <span>Passport / ID Scanner</span>
                <span style={{ color: '#06858F', fontWeight: 700 }}>● Ready</span>
              </div>
              <div className="mock-slot active">
                <span>EMV & NFC Payment</span>
                <span style={{ color: '#E8A05B', fontWeight: 700 }}>● Contactless</span>
              </div>
              <div className="mock-slot">
                <span>Smart Room Key Dispenser</span>
                <span>RFID / Keycard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
