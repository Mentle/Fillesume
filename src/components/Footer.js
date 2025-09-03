import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">FILLESUMÉ</h3>
            <p className="footer-text">
              Pioneering sustainable fashion through innovative biomaterials and circular design.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/biotextil">BioTextil</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">LEGAL</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/data-policy">Data Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">CONNECT</h4>
            <p className="footer-text">
              Follow our journey towards sustainable fashion
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a>
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">FB</a>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">LI</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p> 2024 FILLESUMÉ. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
