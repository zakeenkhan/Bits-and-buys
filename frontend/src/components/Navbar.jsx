// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productHover, setProductHover] = useState(false);
  const [offersHover, setOffersHover] = useState(false);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        className="navbar-logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🛒 <Link to="/" className="store-name">Bits & Buy</Link>
      </motion.div>

      {/* Center Title */}
      <div className="navbar-center">
        <motion.span
          className="ecommerce-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          E-commerce
        </motion.span>
      </div>

      {/* Mobile Toggle */}
      <motion.div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ rotate: 90 }}
      >
        <span className="dots">⋯</span>
      </motion.div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link to="/" onClick={() => setMenuOpen(false)} className="nav-link">Home</Link>
        </motion.li>

        {/* Products Dropdown */}
        <li
          className="products-dropdown"
          onMouseEnter={() => setProductHover(true)}
          onMouseLeave={() => setProductHover(false)}
        >
          <span className="nav-link">Products</span>
          <AnimatePresence>
            {productHover && (
              <motion.ul
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <li><Link to="/products/male" onClick={() => setMenuOpen(false)}>Male</Link></li>
                <li><Link to="/products/female" onClick={() => setMenuOpen(false)}>Female</Link></li>
                <li><Link to="/products/kids" onClick={() => setMenuOpen(false)}>Kids</Link></li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Offers Dropdown */}
        <li
          className="offers-deals-dropdown"
          onMouseEnter={() => setOffersHover(true)}
          onMouseLeave={() => setOffersHover(false)}
        >
          <span className="nav-link">Offers</span>
          <AnimatePresence>
            {offersHover && (
              <motion.ul
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <li><Link to="/offers/summerdeal" onClick={() => setMenuOpen(false)}>Summer Deals</Link></li>
                <li><Link to="/offers/bundleoffers" onClick={() => setMenuOpen(false)}>Bundle Offers</Link></li>
                <li><Link to="/offers/clearances" onClick={() => setMenuOpen(false)}>Clearance</Link></li>
                <li><Link to="/offers/buyonegetfree" onClick={() => setMenuOpen(false)}>Buy 1 Get 1</Link></li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Cart */}
        <motion.li
          className="cart-item"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="nav-link">Cart</Link>
        </motion.li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;
