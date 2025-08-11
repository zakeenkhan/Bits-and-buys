import React from "react";
import { Link } from "react-router-dom";
import "./ShopNow.css"; // You'll create this CSS file separately

const ShopNow = () => {
  return (
    <div className="shop-now-header">
  <div className="shop-now-image">
  </div>
 <div
  className="shop-now-text"
  style={{
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh", 
    padding: "2rem",
  }}
>
  <h1>🛒 Style Meets Simplicity</h1>
  <p>
    "Shopping is not just about buying things. It's about expressing yourself,
    discovering joy, and finding something that speaks to you."
  </p>
</div>

      {/* Product Highlights */}
      <div className="product-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="product-grid">

          {/* Women */}
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1649820942124-28b5d111a5d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc1fHx8ZW58MHx8fHx8"
              alt="Women's Fashion"
            />
            <h3>Women's Collection</h3>
            <p>Stylish dresses, handbags & heels for every occasion.</p>
            <Link to="/products/female" className="small-btn">Explore</Link>
          </div>

          {/* Men */}
          <div className="product-card">
            <img
              src="https://plus.unsplash.com/premium_photo-1664202526504-d53a1c77f7a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc4fHx8ZW58MHx8fHx8"
              alt="Men's Fashion"
            />
            <h3>Men's Essentials</h3>
            <p>Everyday shirts, sleek jackets & smart footwear.</p>
            <Link to="/products/male" className="small-btn">Shop Now</Link>
          </div>

          {/* Kids */}
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1608739871923-7da6d372f3c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwMXx8fGVufDB8fHx8fA%3D%3D"
              alt="Kids Fashion"
            />
            <h3>Kids' Favorites</h3>
            <p>Fun prints, bright colors & comfy wear for every play.</p>
            <Link to="/products/kids" className="small-btn">Browse</Link>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="shop-footer-cta">
        <h2>Ready to Elevate Your Style?</h2>
        <p>Take advantage of exclusive offers and limited-time discounts.</p>
        <Link to="/offers/summerdeal" className="shop-btn">View Offers</Link>
      </div>
    </div>
  );
};

export default ShopNow;
