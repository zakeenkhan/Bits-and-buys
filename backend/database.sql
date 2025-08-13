-- Create database (run this in your PostgreSQL client first if the database doesn't exist)
-- CREATE DATABASE "bits-and-buy";

-- Connect to the database
\c "bits-and-buy"

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO products (name, price, image, description, category) VALUES
('Sample Product 1', 19.99, 'sample1.jpg', 'This is a sample product', 'Electronics'),
('Sample Product 2', 29.99, 'sample2.jpg', 'Another sample product', 'Clothing')
ON CONFLICT (id) DO NOTHING;
