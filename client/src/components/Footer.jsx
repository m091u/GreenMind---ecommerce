import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
          <h2>GreenMind</h2>
          <p>We help you find your dream !!product!!</p>
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
        <div className="contact">
            <p>Contact</p>
            <p>Add Address</p>
            <p>Add map</p>
        </div>
        <div>
            <p>Company</p>
            <ul>
                <li>Career</li>
                <li>Our Story</li>
            </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;