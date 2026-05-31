import React from "react";
import "./Footersection.css";

function Footersection() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-box">
          <h2 className="footer-logo">Power House</h2>
          <p className="footer-text">
            Discover the latest fashion trends for Men, Women and Kids.
            Quality products, affordable prices, and a premium shopping
            experience.
          </p>

          <div className="social-icons">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Offers</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-box">
          <h3>Customer Service</h3>
          <ul>
            <li>Help Center</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>Shipping Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-box">
          <h3>Contact Us</h3>
          <p>📍 Chennai, Tamil Nadu</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@powerhouse.com</p>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2026 Power House. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footersection;