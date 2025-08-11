import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("bitsnBuy_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 🔁 Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("bitsnBuy_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add or increase item quantity
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // ❌ Remove product completely
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 🔁 Update quantity manually
  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // 🧹 Empty cart
  const clearCart = () => setCartItems([]);

  // 💰 Calculate total price
  const getTotalAmount = () =>
    cartItems.reduce((total, item) => {
      const rawPrice = item?.price ?? "0";
      const price = parseFloat(
        typeof rawPrice === "string" ? rawPrice.replace("$", "") : String(rawPrice)
      );                                                                              

      return total + price * item.quantity;
    }, 0);

  // 🔄 Toggle add/remove
  const toggleCartItem = (product) => {
    const exists = cartItems.some((item) => item.id === product.id);
    exists ? removeFromCart(product.id) : addToCart(product);
  };

  // 📦 Get total item count
  const getCartCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalAmount,
        toggleCartItem,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
