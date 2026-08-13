
export default function Benefits() {
  const benefits = [
    {
      icon: "⚡",
      title: "24/7 Self-Service",
      description: "Operate round-the-clock check-ins for late arrivals and early check-ins without keeping full reception staff overnight."
    },
    {
      icon: "👥",
      title: "Reduce Front-Desk Work",
      description: "Free front-desk staff from repetitive administrative tasks so they can focus on high-value guest hospitality."
    },
    {
      icon: "🚀",
      title: "Faster Guest Arrivals",
      description: "Eliminate lobby queues during peak check-in hours with sub-60-second processing per guest."
    },
    {
      icon: "✨",
      title: "Consistent Check-In Experience",
      description: "Deliver accurate registration, terms acknowledgment, and key issuance every single time."
    }
  ];

  return (
    <section id="benefits" className="benefits-section section-padding">
      <div className="container">
        <span className="section-tag" style={{ color: "#E8A05B" }}>Built For Hotel Operators</span>
        <h2 className="section-title">Give your guests a faster arrival experience.</h2>
        <p className="section-subtitle">
          Designed specifically to help boutique hotels, resorts, and hotel chains streamline arrival logistics.
        </p>

        <div className="benefits-grid">
          {benefits.map((benefit, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
