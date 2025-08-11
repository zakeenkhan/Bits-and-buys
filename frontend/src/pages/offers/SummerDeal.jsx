import React from "react";
import "./offers.css";
import { Link } from "react-router-dom";

const SummerDeal = () => {
  return (
    <div className="summer-deal-page">
      {/* Banner Section */}
      <div
        className="summer-banner"
        style={{
      backgroundImage:
  "url('https://images.unsplash.com/photo-1610275504335-f2b494fbe239?w=1920&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8')",
height: "100vh",
width: "100%",
backgroundSize: "cover",
backgroundPosition: "center",
display: "flex",
alignItems: "center",
justifyContent: "center",
position: "relative",
        }}
      >
        <div className="summer-overlay">
          <h1>🔥 Summer Deals are Here!</h1>
          <p>
            Get up to <strong>50% OFF</strong> on selected items. Limited time offer!
          </p>
         
        </div>
      </div>

      {/* Deal Info */}
      <div className="deal-info">
        <h2>Why You'll Love It</h2>
        <p>
          Whether you're updating your wardrobe, refreshing your kids' styles, or looking for that
          perfect lightweight jacket, we’ve got something for everyone. These exclusive summer
          deals won’t last long — shop now before your favorites are gone!
        </p>
        <p className="deal-note">This Summer Offer Augest 31st, 2025.</p>
      </div>

      {/* Image Sections */}
      <div className="summer-categories">
        <div className="category-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1661319046477-19bcf024b600?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"
            alt="Women's Summer Collection"
          />
          <h3>Women's Summer Collection</h3>
          <p>Chic dresses, casual tops, and trendy sandals.</p>
<Link to="/offers/women" className="deal-btn small">Explore</Link>
        </div>

        <div className="category-card">
          <img
            src="https://images.unsplash.com/photo-1640610728491-2e3bcfa75645?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ5fHx8ZW58MHx8fHx8"
            alt="Kids Summer Collection"
          />
          <h3>Kids'Summer Collection</h3>
          <p>Colorful tees, fun prints & comfy wear for playtime.</p>
          <Link to="/offers/kids" className="deal-btn small">Browse</Link>
        </div>

        <div className="category-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1726862821473-1d2992749711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU4fHx8ZW58MHx8fHx8"
            alt="Men's Summer Collection"
          />
          <h3>Men's Summer Collection</h3>
          <p>Cool shirts, light jackets, and summer-ready shoes.</p>
          <Link to="/offers/men" className="deal-btn small">Shop Now</Link>
        </div>  
      </div>
    </div>
  );
};

export default SummerDeal;
