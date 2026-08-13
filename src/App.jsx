import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene from "./components/Scene";
import Hero from "./sections/Hero";
import CheckInFlow from "./sections/CheckInFlow";
import Benefits from "./sections/Benefits";
import Support from "./sections/Support";
import "./index.css";

const STEPS = [
  "Entrance",
  "Guest Enters",
  "Empty Reception",
  "Kiosk Reveal",
  "Approach",
  "Check-In",
  "Room & Exit",
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? scrollTop / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

export default function App() {
  const progress = useScrollProgress();

  // map progress to step
  const stepIndex = (() => {
    const p = progress * 100;
    if (p < 15) return 0;
    if (p < 30) return 1;
    if (p < 45) return 2;
    if (p < 60) return 3;
    if (p < 75) return 4;
    if (p < 90) return 5;
    return 6;
  })();

  return (
    <div className="app-root">
      <Canvas
        camera={{ position: [0, 1.2, 6], fov: 50 }}
        style={{ position: "fixed", inset: 0 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <ScrollControls pages={6} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>

      <div className="overlay">
        <header className="topbar">
          <div className="brand">EZinn</div>
          <nav>
            <button className="cta" onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>See How It Works</button>
            <button className="cta primary" onClick={() => alert("Request a demo — please contact hello@ezinn.example")}>Request a Demo</button>
          </nav>
        </header>

        <div className="content">
          <Hero progress={progress} />
          <CheckInFlow id="how" progress={progress} />
          <Benefits progress={progress} />
          <Support progress={progress} />
        </div>

        <div className="ui">
          <div className="step">{STEPS[stepIndex]}</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }} />
          </div>
          <button className="help">Need Help?</button>
        </div>
      </div>
    </div>
  );
}