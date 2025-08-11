import React from 'react';
import { useCart } from '../context/CartContext'; // ✅ Make sure this path is correct
import './ProductCard.css';

function ProductCard({ product }) {
  const { cartItems, toggleCartItem } = useCart();

  // Check if product is already in cart
  const cartItem = cartItems.find(item => item.id === product.id);
  const inCart = !!cartItem;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <p className="price">${product.price}</p>

      {/* Show quantity if in cart */}
      {inCart && <p className="in-cart-qty">In Cart: {cartItem.quantity}</p>}

      <button
        className={`cart-btn ${inCart ? 'remove' : 'add'}`}
        onClick={() => toggleCartItem(product)}
      >
        {inCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
