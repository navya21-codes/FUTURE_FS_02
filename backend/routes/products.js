const express = require('express');
const router = express.Router();

// Sample products data - Node.js code, no React!
const products = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 699.99, category: "Electronics" },
  { id: 3, name: "Headphones", price: 149.99, category: "Electronics" },
  { id: 4, name: "T-Shirt", price: 29.99, category: "Clothing" },
  { id: 5, name: "Coffee Mug", price: 12.99, category: "Home" }
];

// GET all products - Node.js route handler
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;