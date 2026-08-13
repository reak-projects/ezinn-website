
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <img
              src="/logo.png"
              alt="EZinn Logo"
              style={{ height: "38px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
          </div>

          <ul className="footer-links">
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#benefits">For Hotels</a></li>
            <li><a href="#guest-experience">Guest Experience</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#request-demo">Request Demo</a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EZinn Hospitality Technology. All rights reserved. Self-service hotel check-in kiosk solutions.</p>
        </div>
      </div>
    </footer>
  );
}
