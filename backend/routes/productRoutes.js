const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

// GET all products
router.get('/', (req, res) => {
  fs.readFile(productsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading products file' });
    res.json(JSON.parse(data));
  });
});

module.exports = router;
