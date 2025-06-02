

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load products' });
  }
});

module.exports = router;
