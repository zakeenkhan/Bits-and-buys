// routes/offerRoutes.js
import express from 'express';

export default (pool) => {
  const router = express.Router();

  // GET /api/summer-offers
  router.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM products WHERE on_sale = true ORDER BY discount_percentage DESC'
      );
      res.json(rows);
    } catch (err) {
      console.error('Error fetching offers:', err);
      res.status(500).json({ error: 'Failed to fetch offers' });
    }
  });

  return router;
};
