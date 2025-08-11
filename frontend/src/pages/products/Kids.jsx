import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext"; // ✅ Correct path
import "./MaleFemaleKidsStyle.css";
import axios from "../../api/axiosInstance";

// const products = [
//   {
//     id: 21,
//     name: "Dino Explorer Tee",
//     price: "$25",
//     image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&auto=format&fit=crop&q=60",
//     description: "Soft cotton t-shirt with fun dinosaur print.",
//     rating: 4.6,
//   },
//   {
//     id: 22,
//     name: "Rainbow Hoodie",
//     price: "$35",
//     image: "https://images.unsplash.com/photo-1610056332741-32702f9ed398?w=600&auto=format&fit=crop&q=60",
//     description: "Cozy fleece hoodie with rainbow patchwork.",
//     rating: 4.8,
//   },
//   {
//     id: 23,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://images.unsplash.com/photo-1588869842105-8e164dec23d9?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
//   {
//     id: 24,
//     name: "Space Pajama Set",
//     price: "$30",
//     image: "https://images.unsplash.com/photo-1706394491522-26d76bed1c3f?w=600&auto=format&fit=crop&q=60",
//     description: "Glow-in-the-dark space PJ set for cozy dreams.",
//     rating: 4.9,
//   },
//   {
//     id: 25,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://images.unsplash.com/photo-1607454317633-a30150d568a2?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
//   {
//     id: 26,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://plus.unsplash.com/premium_photo-1698305283092-575dcb4d3ec2?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
//   {
//     id: 27,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://images.unsplash.com/photo-1719004127526-47185a73c9a9?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
//   {
//     id: 28,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://images.unsplash.com/photo-1604303768345-038b79a8c47a?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
//   {
//     id: 29,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://images.unsplash.com/photo-1554342321-0776d282ceac?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
//   {
//     id: 30,
//     name: "Little Hero Cape Set",
//     price: "$45",
//     image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=60",
//     description: "Imagination-ready cape + mask for adventurous play.",
//     rating: 5.0,
//   },
// ];

const Kids = () => {
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
    alert(`Welcome to the Bits & Buy Kids Club! Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <div className="kids-page">
      <div className="intro">
        <h1>Bits & Buy – Kids' Collection</h1>
        <p>
          Let the little ones shine bright! Our kids' fashion is playful, comfy, and full of color—perfect for exploring,
          imagining, and growing in style.
        </p>
      </div>

      <div className="advertisement" style={{ background: "linear-gradient(135deg, #a0e7e5, #b4f8c8)" }}>
        <h2>🎉 New Arrivals for Your Little Stars 🎉</h2>
        <p>Use code <strong>KIDSFUN</strong> for 15% OFF this week only!</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">Prrice ${product.price}</p>
              <p className="rating">Rating: {product.rating} ⭐</p>
              <button onClick={() => toggleCart(product)}>
                {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="philosophy">
        <h2>Fun Meets Function</h2>
        <p>
          Kids need fashion that works as hard as they play. That’s why <strong>Bits & Buy</strong> focuses on comfort,
          durability, and delightful design. Our collection inspires confidence and creativity—perfect for both
          playgrounds and family photos.
        </p>
      </section>

      <div className="subscribe">
        <h3>Get Playful Updates</h3>
        <p>Subscribe for playful picks, parenting tips, and exclusive kid-friendly discounts!</p>
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="e.g. parent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Kids;
