import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { useScrollProgress } from "../hooks/useScrollProgress";

export default function ScrollExperience({ onDemoClick }) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);

  // Determine current active scene based on progress
  const activeScene = (() => {
    if (progress < 0.15) return 1;
    if (progress < 0.35) return 2;
    if (progress < 0.55) return 3;
    if (progress < 0.70) return 4;
    if (progress < 0.88) return 5;
    return 6;
  })();

  // Determine check-in step for Scene 5
  const checkInStepText = (() => {
    if (progress < 0.74) return { title: "Find Your Booking", desc: "Guests enter their surname or booking reference." };
    if (progress < 0.79) return { title: "Verify Your Identity", desc: "Built-in optical scanner reads passport or ID in seconds." };
    if (progress < 0.84) return { title: "Complete Payment", desc: "EMV Chip, Contactless NFC, or Apple Pay processing." };
    return { title: "Get Your Room Key", desc: "Encoded RFID room card dispenses automatically." };
  })();

  const handleSeeHowItWorks = (e) => {
    e.preventDefault();
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    onDemoClick();
  };

  return (
    <div id="story" ref={containerRef} className="story-container">
      <div className="story-sticky-viewport">
        {/* Three.js Canvas */}
        <Canvas
          camera={{ position: [0, 3.5, 8.5], fov: 45 }}
          className="story-canvas"
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#EEEEEE"]} />
          <Scene progress={progress} />
        </Canvas>

        {/* Text Overlay Cards */}
        <div className="story-overlay">
          {activeScene === 1 && (
            <div className="story-card">
              <span className="story-card-tag">Scene 1 — Arrival</span>
              <h3>Hotel check-in, without the wait.</h3>
              <p>
                EZinn lets guests check in, verify their identity, complete payment, and receive their room key through a self-service kiosk.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#how-it-works" className="btn btn-primary" onClick={handleSeeHowItWorks} style={{ padding: '10px 18px', fontSize: '0.85rem' }}>See How It Works</a>
                <a href="#request-demo" className="btn btn-ghost" onClick={handleDemoClick} style={{ padding: '10px 18px', fontSize: '0.85rem' }}>Request a Demo</a>
              </div>
            </div>
          )}

          {activeScene === 2 && (
            <div className="story-card">
              <span className="story-card-tag">Scene 2 — The Problem</span>
              <h3>Arrived and no one is at the front desk?</h3>
              <p>
                Peak arrival times or late-night check-ins often result in waiting lines, staffing pressure, or an empty reception desk.
              </p>
            </div>
          )}

          {activeScene === 3 && (
            <div className="story-card">
              <span className="story-card-tag">Scene 3 — Discovery</span>
              <h3>Meet EZinn.</h3>
              <p>
                Self-service hotel check-in, available 24/7 exactly when your guests need it most.
              </p>
            </div>
          )}

          {activeScene === 4 && (
            <div className="story-card">
              <span className="story-card-tag">Scene 4 — Approach</span>
              <h3>Welcome to EZinn</h3>
              <p>
                As the guest walks up to the kiosk, the intuitive touchscreen activates instantly to begin check-in.
              </p>
            </div>
          )}

          {activeScene === 5 && (
            <div className="story-card">
              <span className="story-card-tag">Scene 5 — Check-In Process</span>
              <h3>{checkInStepText.title}</h3>
              <p>{checkInStepText.desc}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <span className={`btn ${progress < 0.74 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>1. Booking</span>
                <span className={`btn ${progress >= 0.74 && progress < 0.79 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>2. ID</span>
                <span className={`btn ${progress >= 0.79 && progress < 0.84 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>3. Pay</span>
                <span className={`btn ${progress >= 0.84 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>4. Key</span>
              </div>
            </div>
          )}

          {activeScene === 6 && (
            <div className="story-card">
              <span className="story-card-tag">Scene 6 — Completion</span>
              <h3>Checked in. Without the wait.</h3>
              <p>
                The room keycard is issued in under 60 seconds. The guest heads straight to their room refreshed and satisfied.
              </p>
            </div>
          )}
        </div>

        {/* Scroll Progress Bar */}
        <div className="story-progress-indicator">
          <span>Scene {activeScene} of 6</span>
          <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
            {[1, 2, 3, 4, 5, 6].map((stepNum) => (
              <div
                key={stepNum}
                className={`story-dot ${activeScene === stepNum ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
