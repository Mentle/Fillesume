import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src={`${process.env.PUBLIC_URL}/images/logo_fillesume.png`} 
            alt="Fillé Sumé" 
            className="navbar-logo-image"
          />
        </Link>
        
        <div className="navbar-right">
          <div className="navbar-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="navbar-item">
              <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                ABOUT
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/biotextil" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                BIOTEXTIL
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/shop" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                SHOP
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                CONTACT
              </Link>
            </li>
          </ul>
          
          {/* Cart Icon */}
          {getTotalItems() > 0 && (
            <Link to="/cart" className="cart-icon" onClick={() => setIsMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="cart-count">{getTotalItems()}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
