import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#" className="brand-logo">
          <img
            src="/logo.png"
            alt="EZinn Self-Service Kiosk Logo"
            style={{ height: "55px", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </a>

        <ul className="nav-links">
          <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
          <li><a href="#product" className="nav-link">Hardware</a></li>
          <li><a href="#benefits" className="nav-link">For Hotels</a></li>
          <li><a href="#guest-experience" className="nav-link">Guest Experience</a></li>
          <li><a href="#faq" className="nav-link">FAQ</a></li>
        </ul>

        <div className="nav-actions">
          <a href="#request-demo" className="btn btn-primary">Request a Demo</a>
        </div>
      </div>
    </nav>
  );
}
