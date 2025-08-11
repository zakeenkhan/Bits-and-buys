import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext"; // Corrected path
import "./MaleFemaleKidsStyle.css";
import axios from "../../api/axiosInstance";

const Male = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        const maleItems = res.data.filter((item) => item.category === "Men");
        console.log(maleItems);
        setProducts(maleItems);
      })
      .catch((err) => console.error("Error fetching male products", err));
  }, []);

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const toggleCart = (product) => {
    isInCart(product.id) ? removeFromCart(product.id) : addToCart(product);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Thank you for subscribing with us!");
    setEmail("");
  };

  return (
    <div className="male-page">
      <div className="intro">
        <h1>Men's Fashion Hub</h1>
        <p>
          Discover premium fashion picks designed for the modern man. From stylish jackets to everyday essentials,
          we bring elegance and comfort to your wardrobe.
        </p>
      </div>

      <div className="advertisement">
        <h2>🔥 Special Offer: 20% OFF on First Order! 🔥</h2>
        <p>Use code <strong>MEN20</strong> at checkout. Limited time only!</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">price ${product.price}</p>
              <button onClick={() => toggleCart(product)}>
                {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="philosophy">
        <h2>Why Choose Our Fashion?</h2>
        <p>
          At <strong>Bits & Buy</strong>, we believe fashion isn't just about clothing—it's about confidence,
          identity, and creativity. Our men's collection is hand-picked from top-tier manufacturers to provide
          exceptional quality, comfort, and durability.
        </p>
      </section>

      <div className="subscribe">
        <h3>Stay Updated with New Arrivals</h3>
        <p>Subscribe now and get exclusive offers, style tips, and more directly in your inbox.</p>
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="e.g. Zakeenkhann@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Male;