import React, { useState,useEffect } from "react";
import { useCart } from "../../context/CartContext"; // ✅ Corrected path
import "./MaleFemaleKidsStyle.css";
import axios from "../../api/axiosInstance";

// const products = [
//   {
//     id: 11,
//     name: "Blush Satin Dress",
//     price: "$95",
//     image: "https://images.unsplash.com/photo-1541438633571-9578b70ae5bf?w=600&auto=format&fit=crop&q=60",
//     description: "Elegant blush satin dress perfect for evening occasions.",
//     rating: 4.7,
//   },
//   {
//     id: 12,
//     name: "Soft Pink Hoodie",
//     price: "$55",
//     image: "https://images.unsplash.com/photo-1645938375388-dcb5c9bd87c2?w=600&auto=format&fit=crop&q=60",
//     description: "Casual pink hoodie with ultra-soft fleece lining.",
//     rating: 4.6,
//   },
//   {
//     id: 13,
//     name: "Floral Skater Skirt",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1673758905792-f3fa0e3860f9?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
//   {
//     id: 14,
//     name: "Rose Gold Handbag",
//     price: "$120",
//     image: "https://plus.unsplash.com/premium_photo-1727427850092-5874f7c7b075?w=600&auto=format&fit=crop&q=60",
//     description: "Compact rose gold handbag with a modern silhouette.",
//     rating: 4.9,
//   },
//   {
//     id: 15,
//     name: "shirt blushy",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1661661842985-d58b8e6c801b?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
//   {
//     id: 16,
//     name: "Floral Skater Skirt",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1737471896317-2994eb4661c4?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
//   {
//     id: 17,
//     name: "Floral Skater Skirt",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1671718111976-48b74d57c181?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
//   {
//     id: 18,
//     name: "Floral Skater Skirt",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1671826911675-0c1b4f03a556?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
//   {
//     id: 19,
//     name: "Floral Skater Skirt",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1697749540156-007b0de00a3e?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
//   {
//     id: 20,
//     name: "Floral Skater Skirt",
//     price: "$40",
//     image: "https://plus.unsplash.com/premium_photo-1661337420975-ebfa5c82cb00?w=600&auto=format&fit=crop&q=60",
//     description: "Bright floral skater skirt for spring and summer vibes.",
//     rating: 4.8,
//   },
// ];

const Female = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        const FemaleItems = res.data.filter((item) => item.category === "Female");
        console.log(FemaleItems);
        setProducts(FemaleItems);
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
    alert(`You're subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="female-page">
      <div className="intro">
        <h1>Women's Boutique</h1>
        <p>
          Celebrate your style with elegance and charm. Our hand-picked collection for women blends comfort, beauty,
          and confidence—crafted to elevate every moment of your day.
        </p>
      </div>

      <div className="advertisement" style={{ background: "linear-gradient(135deg, #ffb6c1, #ff69b4)" }}>
        <h2>💖 New Season Drop: Feminine Styles Await 💖</h2>
        <p>Use <strong>LOVE10</strong> to get 10% off your first order.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">Price ${product.price}</p>
              <p className="rating">Rating: {product.rating} ⭐</p>
              <button onClick={() => toggleCart(product)}>
                {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="philosophy">
        <h2>Feminine Style, Empowered Spirit</h2>
        <p>
          At <strong>Bits & Buy</strong>, our women’s line is more than just fashion. It’s a statement of grace and
          individuality. From timeless dresses to casual staples, each piece is crafted with love, detail, and
          purpose—so you can shine confidently wherever life takes you.
        </p>
      </section>

      <div className="subscribe">
        <h3>Get Style Updates in Your Inbox</h3>
        <p>Be the first to know about new arrivals, fashion tips, and exclusive deals.</p>
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="e.g. Zeynab123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Female;
