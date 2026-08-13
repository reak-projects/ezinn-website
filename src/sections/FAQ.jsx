import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is EZinn?",
      a: "EZinn is a self-service hotel check-in kiosk that enables guests to locate their booking, verify identity, complete payments, and receive room keys automatically without front-desk queueing."
    },
    {
      q: "How does the guest receive their room key?",
      a: "The kiosk features a built-in RFID keycard dispenser that encodes physical room keycards upon successful identity verification and payment authorization."
    },
    {
      q: "Can EZinn operate 24/7 during off-peak hours?",
      a: "Yes. EZinn provides round-the-clock check-in capabilities, making it ideal for late-night arrivals, early check-ins, or unstaffed reception periods."
    },
    {
      q: "What identity documents does the kiosk support?",
      a: "EZinn includes an optical ID/passport scanner capable of reading standard passport Machine Readable Zones (MRZ) and photo IDs."
    },
    {
      q: "What happens if a guest needs assistance?",
      a: "Guests can trigger an on-screen help request or use the support widget to connect directly with front-desk staff or remote support."
    }
  ];

  return (
    <section id="faq" className="section-padding container">
      <span className="section-tag" style={{ textAlign: "center", display: "block" }}>Got Questions?</span>
      <h2 className="section-title" style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
      <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto 48px" }}>
        Everything you need to know about implementing EZinn self-service kiosks at your hotel.
      </p>

      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.q}</span>
              <span style={{ fontSize: "1.2rem", transition: "transform 0.2s ease", transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)" }}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
