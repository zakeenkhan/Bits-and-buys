import React, { useState } from "react";
import axios from "../../api/axiosInstance"; // Ensure correct path
import "./offers.css";

const bundleItems = [
  {
    id: 31,
    name: "Stylish Linen Shirt",
    price: "$25.00",
    image: "https://plus.unsplash.com/premium_photo-1684164601688-776f09b53353?w=600",
  },
  {
    id: 32,
    name: "Casual Summer Shorts",
    price: "$20.00",
    image: "https://plus.unsplash.com/premium_photo-1675186049563-000f7ac02c44?w=600",
  },
  {
    id: 33,
    name: "Sport Man shoes",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1456444029056-7dfaeeb83a19?w=600",
  },
  {
    id: 34,
    name: "Paints for Summer",
    price: "$35.00",
    image: "https://plus.unsplash.com/premium_photo-1697612943610-fc079bab10cf?w=600",
  },
  {
    id: 35,
    name: "Digital shirts",
    price: "$25.00",
    image: "https://images.unsplash.com/photo-1456444029056-7dfaeeb83a19?w=600",
  },
];

const BundleOffer = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    const total = bundleItems.reduce((sum, item) => {
      const cleanPrice = parseFloat(item.price.replace("$", "").trim());
      return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
    }, 0);

    const orderPayload = {
      user_name: "Bundle Buyer", // replace with user input if needed
      user_address: "123 Summer Street",
      user_payment_method: "card",
      total,
      items: bundleItems.map((item) => ({
        product_id: item.id,
        quantity: 1,
        price: parseFloat(item.price.replace("$", "").trim()),
      })),
    };

    try {
      const res = await axios.post("/orders", orderPayload);
      alert(`✅ Bundle order placed! Order ID: ${res.data.orderId}`);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Failed to place bundle order.");
    }
  };

  return (
    <section style={{ padding: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <div style={{ flex: "1 1 300px", maxWidth: "500px" }}>
          <h2>🎁 Exclusive Summer Bundle</h2>
          <p style={{ margin: "1rem 0", color: "#444" }}>
            Save more with our handpicked bundle! Perfect for summer vibes — cool, comfy, and discounted.
          </p>

          <ul style={{ listStyle: "none", paddingLeft: 0, marginBottom: "1.5rem" }}>
            {bundleItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "0.5rem", fontWeight: "500" }}>
                ✔ {item.name}
              </li>
            ))}
          </ul>

          <button
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: orderPlaced ? "#999" : "#28a745",
              color: "#fff",
              border: "none",
              fontSize: "1rem",
              borderRadius: "6px",
              cursor: orderPlaced ? "not-allowed" : "pointer",
              transition: "background 0.3s ease",
            }}
            onClick={handlePlaceOrder}
            disabled={orderPlaced}
          >
            {orderPlaced ? "Order Placed ✅" : "Place Bundle Order"}
          </button>
        </div>

        <div style={{ flex: "1 1 300px", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {bundleItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.07)",
                width: "160px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h4 style={{ margin: "0.6rem 0 0.2rem" }}>{item.name}</h4>
              <p style={{ color: "#777" }}>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundleOffer;
