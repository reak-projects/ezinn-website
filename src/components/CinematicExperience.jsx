import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Simulator from "./simulator/Simulator";
import "./CinematicExperience.css";

function SimulatorContainer({ onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className="simulator-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="EZinn interactive simulator"
    >
      <button
        ref={closeButtonRef}
        className="simulator-return"
        type="button"
        onClick={onClose}
      >
        Return to website
      </button>
      <div className="simulator-mount">
        <Simulator onExit={onClose} />
      </div>
    </div>
  );
}

export default function CinematicExperience() {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const skipButtonRef = useRef(null);
  const screenButtonRef = useRef(null);
  const zoomTweenRef = useRef(null);
  const simulatorEntryRef = useRef(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  useEffect(() => () => zoomTweenRef.current?.kill(), []);

  const closeSimulator = () => {
    zoomTweenRef.current?.kill();
    zoomTweenRef.current = null;
    if (simulatorEntryRef.current === "zoom" && frameRef.current) {
      gsap.set(frameRef.current, { clearProps: "all" });
    }
    const entryMethod = simulatorEntryRef.current;
    simulatorEntryRef.current = null;
    setIsSimulatorOpen(false);
    if (entryMethod === "skip") {
      skipButtonRef.current?.focus();
    } else {
      screenButtonRef.current?.focus();
    }
  };

  const handleSkipVideo = () => {
    if (isSimulatorOpen || zoomTweenRef.current) return;

    videoRef.current?.pause();
    simulatorEntryRef.current = "skip";
    setIsSimulatorOpen(true);
  };

  const handleExperienceClick = () => {
    const frame = frameRef.current;
    const screenButton = screenButtonRef.current;

    if (!hasEnded || !frame || !screenButton || zoomTweenRef.current) return;

    const frameBounds = frame.getBoundingClientRect();
    const screenBounds = screenButton.getBoundingClientRect();
    simulatorEntryRef.current = "zoom";
    const scale = Math.max(
      window.innerWidth / screenBounds.width,
      window.innerHeight / screenBounds.height
    ) * 1.05;
    const screenCenterX = screenBounds.left - frameBounds.left + screenBounds.width / 2;
    const screenCenterY = screenBounds.top - frameBounds.top + screenBounds.height / 2;

    gsap.set(frame, {
      position: "fixed",
      inset: "auto",
      top: frameBounds.top,
      left: frameBounds.left,
      width: frameBounds.width,
      height: frameBounds.height,
      margin: 0,
      zIndex: 1100,
      transformOrigin: "0 0",
      willChange: "transform",
    });

    zoomTweenRef.current = gsap.to(frame, {
      x: window.innerWidth / 2 - screenCenterX * scale,
      y: window.innerHeight / 2 - screenCenterY * scale,
      scale,
      duration: 1.35,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(frame, { autoAlpha: 0 });
        zoomTweenRef.current = null;
        setIsSimulatorOpen(true);
      },
    });
  };

  return (
    <>
      <section
        id="story"
        className="cinematic-experience"
        aria-label="EZinn cinematic guest experience"
      >
        <div className="cinematic-stage">
          <div className="cinematic-frame" ref={frameRef}>
            <video
              ref={videoRef}
              className="cinematic-video"
              src="/gemini_generated_video_e42a8756.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setHasEnded(true)}
            />
            <button
              ref={skipButtonRef}
              className="cinematic-skip"
              type="button"
              onClick={handleSkipVideo}
            >
              SKIP VIDEO <span aria-hidden="true">→</span> START DEMO
            </button>
            <button
              ref={screenButtonRef}
              className={`cinematic-cta${hasEnded ? " is-visible" : ""}`}
              type="button"
              disabled={!hasEnded}
              onClick={handleExperienceClick}
              aria-label="Click here for real experience"
            >
              CLICK HERE FOR REAL EXPERIENCE
            </button>
          </div>
        </div>
      </section>
      {isSimulatorOpen && <SimulatorContainer onClose={closeSimulator} />}
    </>
  );
}
