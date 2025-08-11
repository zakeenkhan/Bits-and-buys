import React, { useEffect, useState } from "react";
import "./offers.css";
import axios from "../../api/axiosInstance";

const BuyOneGetOne = () => {
  const [items, setItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    axios
      .get("/summer-offers/bogo")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching BOGO items:", err));
  }, []);

  const handleClaimDeal = async () => {
    if (items.length === 0) {
      alert("❌ No items available in this deal.");
      return;
    }

    const freeItemId = 37;

    const total = items.reduce((sum, item) => {
      const price = item.item_id === freeItemId ? 0 : parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    const orderPayload = {
      user_name: "BOGO Buyer",
      user_address: "BOGO Deal Street",
      user_payment_method: "COD",
      total,
      items: items.map((item) => ({
        product_id: item.item_id,
        quantity: 1,
        price: item.item_id === freeItemId ? 0 : parseFloat(item.price),
      })),
    };

    try {
      const res = await axios.post("/orders", orderPayload);
      alert(`✅ BOGO order placed! Order ID: ${res.data.orderId}`);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Failed to place BOGO order.");
    }
  };

  return (
    <section className="bogo-section">
      <div className="bogo-header">
        <h2>🛍️ Buy One, Get One FREE!</h2>
        <p>Double the value, same price — limited-time only on selected products.</p>
      </div>

      <div className="bogo-products">
        {items.map((item) => {
          const isFree = item.item_id === 37;
          return (
            <div className={`bogo-card ${isFree ? "free-card" : ""}`} key={item.item_id}>
              <img src={item.image} alt={item.name} />
              <div className={`bogo-label ${isFree ? "free" : ""}`}>
                {isFree ? "Free" : "Buy"}
              </div>
              <h3>{item.name}</h3>
              <p>
                {isFree ? (
                  <>
                    <s>${item.old_price}</s> <strong>FREE</strong>
                  </>
                ) : (
                  `$${item.price}`
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bogo-footer">
        <button
          onClick={handleClaimDeal}
          className="bogo-btn"
          disabled={orderPlaced}
          style={{
            backgroundColor: orderPlaced ? "#999" : "#007bff",
            cursor: orderPlaced ? "not-allowed" : "pointer",
          }}
        >
          {orderPlaced ? "BOGO Claimed ✅" : "Claim This Deal"}
        </button>
      </div>
    </section>
  );
};

export default BuyOneGetOne;
