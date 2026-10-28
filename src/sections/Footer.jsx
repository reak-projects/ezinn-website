
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="EZinn Home">
              <div className="footer-logo-badge">
                <img
                  src="/logo.png"
                  alt="EZinn Self-Service Kiosk Logo"
                  className="footer-logo-img"
                />
              </div>
            </a>
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
