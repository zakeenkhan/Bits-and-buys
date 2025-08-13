const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // GET /api/orders
  router.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // POST /api/orders
  router.post('/', async (req, res) => {
    try {
      const { user_id, items, total, status = 'pending' } = req.body;
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Insert order
        const orderResult = await client.query(
          'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',
          [user_id, total, status]
        );
        
        const order = orderResult.rows[0];
        
        // Insert order items
        for (const item of items) {
          await client.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
            [order.id, item.product_id, item.quantity, item.price]
          );
        }
        
        await client.query('COMMIT');
        res.status(201).json(order);
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  return router;
};
