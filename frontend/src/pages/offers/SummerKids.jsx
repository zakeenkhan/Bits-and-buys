import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";
import "./offers.css";

const SummerKids = () => {
  const [offer, setOffer] = useState([]);
  const { addToCart } = useCart();

  const handleConfirmOrder = (item) => {
    alert(`Order confirmed for: ${item.name || item.title}`);
  };

  useEffect(() => {
    api.get("/summer-offers/kids")
      .then(res => setOffer(res.data))
      .catch(err => console.error("Error loading offer", err));
  }, []);

  return (
    <div className="offer-page">
      {offer.length > 0 ? (
        offer.map((item, i) => (
          <div className="offer-card" key={i}>
            <h1>{item.title}</h1>
            <img src={item.image} alt={item.title} className="offer-image" />
            <p>{item.description}</p>
            <p><strong>Discount:</strong> {item.discount_percentage}% OFF</p>
            <p><strong>Valid Until:</strong> {new Date(item.valid_until).toLocaleDateString()}</p>
            <button className="btn add-btn" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
            <button className="btn order-btn" onClick={() => handleConfirmOrder(item)}>
              Confirm Order
            </button>
          </div>
        ))
      ) : (
        <p>Loading offer...</p>
      )}
    </div>
  );
};

export default SummerKids;
