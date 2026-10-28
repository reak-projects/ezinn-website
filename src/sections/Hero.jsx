export default function Hero({ onDemoClick }) {
  const handleSeeHowItWorks = (e) => {
    e.preventDefault();
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <a href="#how-it-works" className="btn btn-primary" onClick={handleSeeHowItWorks}>See How It Works</a>
            <a href="#request-demo" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); onDemoClick(); }}>Request a Demo</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="EZinn real self-service kiosk with feature highlights">
          <div className="floating-badge badge-one">
            <span className="badge-dot dot-primary"></span>
            Under 60s Check-In
          </div>
          <div className="floating-badge badge-two">
            <span className="badge-dot dot-accent"></span>
            EMV &amp; Contactless Pay
          </div>
          <div className="floating-badge badge-three">
            <span className="badge-dot dot-primary"></span>
            Instant Keycard Dispenser
          </div>
          <div className="floating-badge badge-four">
            <span className="badge-dot dot-primary"></span>
            Passport &amp; ID Scanner
          </div>

          <div className="hero-kiosk-card">
            <div className="hero-kiosk-glow"></div>
            <div className="hero-kiosk-image-wrapper">
              <img
                src="/ezinn-machine.jpg"
                alt="EZinn Self-Service Hotel Check-In Kiosk"
                className="hero-kiosk-image"
                loading="eager"
              />
            </div>
            <div className="hero-kiosk-status-pill">
              <span className="status-indicator-dot"></span>
              <span>24/7 Automated Front Desk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
