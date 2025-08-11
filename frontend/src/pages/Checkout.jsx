import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "../api/axiosInstance"; // Make sure this points to your backend setup
import "./CheckoutStyle.css";

const Checkout = () => {
  const { cartItems, getTotalAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "card",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      alert("Please fill out all required fields.");
      return;
    }

    // ✅ Create valid order payload
    const orderPayload = {
      user_name: formData.name,
      user_address: formData.address,
      user_payment_method: formData.paymentMethod,
      total: parseFloat(getTotalAmount()),
      items: cartItems.map((item) => {
        const rawPrice = typeof item.price === "string"
          ? item.price.replace(/[^0-9.]/g, "")
          : item.price;

        const price = parseFloat(rawPrice);
        const validPrice = isNaN(price) ? 0 : price;

        return {
          product_id: item.id || item.item_id || item.product_id, // Flexible key check
          quantity: item.quantity || 1,
          price: validPrice,
        };
      }),
    };

    console.log("🛒 cartItems:", cartItems);
    console.log("📦 orderPayload:", orderPayload);

    // Validate items before sending
    const invalidItem = orderPayload.items.find(
      (item) =>
        !item.product_id || typeof item.product_id !== "number" ||
        typeof item.quantity !== "number" ||
        typeof item.price !== "number" || item.price <= 0
    );

    if (invalidItem) {
      alert("❌ Order failed: Invalid product_id, quantity, or price.");
      return;
    }

    try {
      const res = await axios.post("/orders", orderPayload);
      alert(`✅ Order placed successfully! Order ID: ${res.data.orderId}`);
      clearCart();
    } catch (error) {
      console.error("❌ Order placement failed:", error);
      alert("❌ Order failed. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return <div className="checkout-empty">Your cart is empty. Add items to continue checkout.</div>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-section">
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-section">
          <label>Payment Method:</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="card">Credit / Debit Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id || item.item_id || item.product_id}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
          <p>Total: <strong>{getTotalAmount()}</strong></p>
        </div>

        <button type="submit" className="checkout-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
