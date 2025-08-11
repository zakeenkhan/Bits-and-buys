import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/PageStyles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Bits & Buy</h2>
          <p>Your one-stop shop for quality gadgets & accessories.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: zakeenkhann@gmail.com</p>
          <p>Phone: +923439644996</p>
          <p>Shop: G11-MARKAZ SILVER PLAZA MARKET ISLAMABAD PAKISTAN </p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bits & Buy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
