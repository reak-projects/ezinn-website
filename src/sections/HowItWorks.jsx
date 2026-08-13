
export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Find Booking",
      description: "Guests enter their surname or scan a QR code from their mobile confirmation."
    },
    {
      number: "02",
      title: "Verify Identity",
      description: "Integrated optical reader scans passport, driver's license, or national ID."
    },
    {
      number: "03",
      title: "Complete Payment",
      description: "Secure EMV Chip & PIN, contactless NFC, Apple Pay, or room charge authorization."
    },
    {
      number: "04",
      title: "Get Room Key",
      description: "Automated dispenser encodes and issues a physical RFID keycard instantly."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding container">
      <span className="section-tag">Check-In Journey</span>
      <h2 className="section-title">How EZinn Works</h2>
      <p className="section-subtitle">
        A seamless 4-step self-service process designed for speed, security, and guest satisfaction.
      </p>

      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-number">{step.number}</div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
