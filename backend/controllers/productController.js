import pool from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image, description, category } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO products (name, price, image, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, image, description, category]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description, category } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE products SET name=$1, price=$2, image=$3, description=$4, category=$5 WHERE id=$6 RETURNING *',
      [name, price, image, description, category, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
