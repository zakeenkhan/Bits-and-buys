// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const bundleIds = [
  "bundle-shirt",
  "bundle-shorts",
  "bundle-shoes-1",
  "bundle-shoes-2",
  "bundle-shoes-3"
];
const BUNDLE_DISCOUNT_PERCENT = 15;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const isBundleInCart = () =>
    bundleIds.every((id) => cartItems.some((item) => item.id === id));

  const calculateTotal = () => {
    let subtotal = 0;

    cartItems.forEach((item) => {
      const rawPrice = typeof item.price === "string"
        ? item.price.replace(/[^0-9.]/g, "")
        : item.price;

      const price = parseFloat(rawPrice);
      const quantity = Number(item.quantity) || 1;

      if (!isNaN(price) && !isNaN(quantity)) {
        subtotal += price * quantity;
      }
    });

    const discount = isBundleInCart() ? (subtotal * BUNDLE_DISCOUNT_PERCENT) / 100 : 0;
    const total = subtotal - discount;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const { subtotal, discount, total } = calculateTotal();
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate("/checkout"); // ✅ Always proceed to checkout
  };

  return (
    <div className="cart-page">
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="cart-price">
                    Price: ${Number(item.price).toFixed(2)}
                  </p>
                  {item.quantity > 1 && <p>Qty: {item.quantity}</p>}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total Items: <strong>{totalItems}</strong></p>
            <p>Subtotal: <strong>${subtotal}</strong></p>
            {parseFloat(discount) > 0 && (
              <p className="discount">
                Bundle Discount ({BUNDLE_DISCOUNT_PERCENT}%): <strong>-${discount}</strong>
              </p>
            )}
            <p className="total">Total: <strong>${total}</strong></p>

            <div className="cart-buttons">
              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button className="cancel-btn" onClick={clearCart}>
                Cancel Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
