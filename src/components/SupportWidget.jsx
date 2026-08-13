import { useState } from "react";

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const supportOptions = [
    { id: "booking", label: "Booking Problem / Not Found" },
    { id: "id_verify", label: "ID & Passport Verification Help" },
    { id: "payment", label: "Payment & Billing Question" },
    { id: "room_key", label: "Room Key Dispensing Issue" },
    { id: "contact_staff", label: "Contact Front Desk Support" }
  ];

  const handleSelectOption = (opt) => {
    setSelectedIssue(opt.label);
  };

  return (
    <>
      <button
        className="support-widget-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Need Help Support"
      >
        <span>💬</span>
        <span>Need Help?</span>
      </button>

      {isOpen && (
        <div className="support-panel">
          <div className="support-header">
            <div>
              <h4>EZinn Guest Assistance</h4>
              <p style={{ fontSize: "0.8rem", color: "#5C6B73" }}>Select your issue below</p>
            </div>
            <button className="close-btn" onClick={() => { setIsOpen(false); setSelectedIssue(null); }}>
              ✕
            </button>
          </div>

          {!selectedIssue ? (
            <div className="support-options">
              {supportOptions.map((opt) => (
                <button
                  key={opt.id}
                  className="support-opt-btn"
                  onClick={() => handleSelectOption(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ padding: "12px 0" }}>
              <div style={{ background: "#EEEEEE", padding: "12px", borderRadius: "8px", fontSize: "0.875rem", marginBottom: "16px" }}>
                <strong>Issue Selected:</strong> {selectedIssue}
              </div>
              <p style={{ fontSize: "0.875rem", color: "#5C6B73", marginBottom: "16px" }}>
                Support backend readiness: This portal will connect directly to hotel PMS support or AI guest assistant.
              </p>
              <button
                className="btn btn-ghost"
                style={{ width: "100%", fontSize: "0.85rem" }}
                onClick={() => setSelectedIssue(null)}
              >
                ← Choose Another Option
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
