import pool from '../config/db.js';

export const createOrder = async (req, res) => {
  const { user_name, user_address, user_payment_method, items } = req.body;

  if (
    !user_name ||
    !user_address ||
    !user_payment_method ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid order data",
    });
  }

  try {
    // ✅ Step 1: Calculate total safely
    let total = 0;
    for (const item of items) {
      const quantity = Number(item.quantity);
      const price = Number(
        typeof item.price === "string"
          ? item.price.replace(/[^0-9.]/g, "")
          : item.price
      );

      if (isNaN(quantity) || isNaN(price) || quantity < 1 || price < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid price or quantity in item",
          item,
        });
      }

      total += price * quantity;
    }

    // ✅ Step 2: Insert into orders table
    const result = await pool.query(
      `INSERT INTO orders (user_name, user_address, user_payment_method, total)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [user_name, user_address, user_payment_method, total]
    );

    const orderId = result.rows[0]?.id;

    if (!orderId) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order record",
      });
    }

    // ✅ Step 3: Insert all order items
    const itemInsertPromises = items.map((item) => {
      const product_id = Number(item.product_id);
      const quantity = Number(item.quantity);
      const price = Number(
        typeof item.price === "string"
          ? item.price.replace(/[^0-9.]/g, "")
          : item.price
      );

      if (isNaN(product_id) || isNaN(quantity) || isNaN(price)) {
        console.log("Invalid item values:", { product_id, quantity, price });
        throw new Error("Invalid product_id, quantity, or price in items");
      }

      return pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, product_id, quantity, price]
      );
    });

    await Promise.all(itemInsertPromises);

    // ✅ Step 4: Return success response
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId,
      total,
    });
  } catch (err) {
    console.error("❌ Error placing order:", err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while placing the order.",
      error: err.message,
    });
  }
};
