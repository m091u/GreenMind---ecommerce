import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-item">
          <h2>GREENMIND</h2>
          <p>We help you find your dream plant! &#127807;</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://github.com/m091u/Project3-FullStack"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} GREENMIND. All Rights Reserved.
          </div>
        </div>
        <div className="footer-item">
          <h3>
            Company
          </h3>
          <ul>
            <li>Our Story</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="contact footer-item">
          <h3>
            Contact
          </h3>
          <ul>
            <li>Email: hello@greenmind.com</li>
            <li>Phone: <span style={{ whiteSpace: "nowrap" }}>+49 150 XXX XXX</span></li>
            <li>Subscribe to Newsletter</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
