
import pool from '../config/db.js';

// GET: All clearance items
export const getClearanceItems = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clearance ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching clearance items:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST: Add item to cart and reduce stock
export const addToCart = async (req, res) => {
  const { item_id, name, price, image } = req.body;

  try {
    const stockCheck = await pool.query(
      "SELECT stock FROM clearance_items WHERE item_id = $1",
      [item_id]
    );

    if (stockCheck.rows.length === 0)
      return res.status(404).json({ error: "Item not found" });

    if (stockCheck.rows[0].stock <= 0)
      return res.status(400).json({ error: "Out of stock" });

    const cartCheck = await pool.query(
      "SELECT * FROM cart_items WHERE item_id = $1",
      [item_id]
    );

    if (cartCheck.rows.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE item_id = $1",
        [item_id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (item_id, name, price, image) VALUES ($1, $2, $3, $4)",
        [item_id, name, price, image]
      );
    }

    await pool.query(
      "UPDATE clearance_items SET stock = stock - 1 WHERE item_id = $1",
      [item_id]
    );

    res.json({ message: "Item added to cart and stock reduced." });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// GET: Cart items
export const getCartItems = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cart_items ORDER BY added_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST: Checkout and clear cart
export const checkout = async (req, res) => {
  try {
    await pool.query("DELETE FROM cart_items");
    res.json({ message: "Checkout complete. Cart cleared." });
  } catch (error) {
    console.error("Error during checkout:", error.message);
    res.status(500).json({ error: "Checkout failed" });
  }
};
