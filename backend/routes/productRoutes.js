import express from 'express';

export default (pool) => {
  const router = express.Router();

  // GET /api/products
  router.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM products');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // GET /api/products/:id
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { name, price, description } = req.body;
      const { rows } = await pool.query('INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *', [name, price, description]);
      res.json(rows[0]);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      const { rows } = await pool.query('UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *', [name, price, description, id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(rows[0]);
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM products WHERE id = $1', [id]);
      res.status(204).json({ message: 'Product deleted' });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  return router;
};
