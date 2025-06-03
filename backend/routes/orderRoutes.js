const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ordersFile = path.join(__dirname, '../data/orders.json');

// GET all orders
router.get('/', (req, res) => {
  fs.readFile(ordersFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading orders file' });
    res.json(JSON.parse(data));
  });
});

// POST a new order
router.post('/', (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading orders file' });

    const orders = JSON.parse(data);
    orders.push(newOrder);

    fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), err => {
      if (err) return res.status(500).json({ message: 'Error saving order' });
      res.status(201).json({ message: 'Order placed successfully' });
    });
  });
});

module.exports = router;
