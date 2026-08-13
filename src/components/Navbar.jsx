import { useState, useEffect } from "react";

export default function Navbar({ onDemoClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onDemoClick();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img
            src="/logo.png"
            alt="EZinn Self-Service Kiosk Logo"
            style={{ height: "55px", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <li><a href="#how-it-works" className="nav-link" onClick={(e) => handleNavClick(e, "how-it-works")}>How It Works</a></li>
          <li><a href="#product" className="nav-link" onClick={(e) => handleNavClick(e, "product")}>Hardware</a></li>
          <li><a href="#benefits" className="nav-link" onClick={(e) => handleNavClick(e, "benefits")}>For Hotels</a></li>
          <li><a href="#guest-experience" className="nav-link" onClick={(e) => handleNavClick(e, "guest-experience")}>Guest Experience</a></li>
          <li><a href="#faq" className="nav-link" onClick={(e) => handleNavClick(e, "faq")}>FAQ</a></li>
        </ul>

        <div className="nav-actions">
          <a href="#request-demo" className="btn btn-primary" onClick={handleDemoClick}>Request a Demo</a>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
