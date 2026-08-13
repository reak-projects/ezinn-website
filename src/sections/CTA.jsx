
export default function CTA() {
  return (
    <section id="request-demo" className="cta-section">
      <div className="container">
        <span className="section-tag" style={{ color: "#E8A05B" }}>Get Started</span>
        <h2>Ready to transform your hotel lobby?</h2>
        <p>
          Schedule a guided demo with our hospitality team and explore EZinn self-service check-in kiosks for your property.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <a href="mailto:demo@ezinn.com" className="btn btn-accent" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
            Request a Guided Demo
          </a>
        </div>
      </div>
    </section>
  );
}
