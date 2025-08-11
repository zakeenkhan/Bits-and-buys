// src/pages/ClearanceSale.jsx
import React, { useEffect, useState } from "react";
import "./offers.css";
import axios from "../../api/axiosInstance";

const ClearanceSale = () => {
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/summer-offers/clearance-items");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load clearance items:", err.message);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const countdownTo = new Date("2025-07-10T23:59:59");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = countdownTo - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({});
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShopClearance = async () => {
    if (items.length === 0) {
      setMessage("❌ No clearance items available to order.");
      return;
    }

    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    const orderPayload = {
      user_name: "Clearance Buyer",
      user_address: "123 Discount Lane",
      user_payment_method: "COD",
      total,
      items: items.map((item) => ({
        product_id: item.item_id,
        quantity: 1,
        price: parseFloat(item.price),
      })),
    };

    try {
      const res = await axios.post("/orders", orderPayload);
      setMessage(`✅ Order placed! Order ID: ${res.data.orderId}`);
    } catch (err) {
      console.error("Order failed:", err);
      setMessage("❌ Failed to place the clearance order.");
    }

    setTimeout(() => setMessage(""), 4000);
  };

  const handleItemClick = (item) => {
    if (item.stock > 0) {
      alert(`🛒 "${item.name}" is ready to ship!`);
    }
  };

  return (
    <section className="clearance-items">
      <div className="clearance-header" style={{ textAlign: "center" }}>
        <h2>🚨 Final Clearance Sale</h2>
        {timeLeft.days !== undefined ? (
          <p>
            Ends in: <strong>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</strong>
          </p>
        ) : (
          <p>Sale has ended</p>
        )}
      </div>

      {message && (
        <p
          className="cart-msg"
          style={{
            textAlign: "center",
            color: message.includes("❌") ? "red" : "green",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}
        >
          {message}
        </p>
      )}

      <div className="clearance-grid">
        {items.map((item) => (
          <div className="clearance-card" key={item.item_id}>
            <div className="stock-badge">Only {item.stock} left!</div>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="old-price">${item.old_price}</p>
            <p className="new-price">${item.price}</p>
            <button
              className="clearance-buy-btn"
              disabled={item.stock === 0}
              onClick={() => handleItemClick(item)}
            >
              {item.stock === 0 ? "Out of Stock" : "Ready to Ship"}
            </button>
          </div>
        ))}
      </div>

      <div className="clearance-footer" style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="clearance-btn" onClick={handleShopClearance}>
          Shop Clearance
        </button>
      </div>
    </section>
  );
};

export default ClearanceSale;
