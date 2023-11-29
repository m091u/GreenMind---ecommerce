import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
          <h2>GreenMind</h2>
          <p>We help you find your dream product!</p>
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
        <div>
          <p>Company</p>
          <ul>
            <li>Our Story</li>
            <li>Career</li>
          </ul>
        </div>
        <div className="contact">
          <p>Contact</p>
          <p>Add email address</p>
          <p>Add Address</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8104.397654642775!2d13.402019595607495!3d52.52507872953311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sde!4v1701248117607!5m2!1sen!2sde"
            className="map-frame"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            title="GreenMind Location"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
