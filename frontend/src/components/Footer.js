import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Get Your Quality Skills Certificate Through Sky States</h3>
            <p>Start your high-paying tech career with industry-recognized certificates</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              <i className="fas fa-envelope"></i>{' '}
              <a href="mailto:info@skystates.us">info@skystates.us</a>
            </p>
            <p>
              <i className="fas fa-phone"></i>{' '}
              <a href="tel:(888) 810-2434">(888) 810-2434</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Sky States. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
