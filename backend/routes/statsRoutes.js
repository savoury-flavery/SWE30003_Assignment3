const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const statsFile = path.join(__dirname, '../data/stats.json');

// GET sales statistics
router.get('/', (req, res) => {
  fs.readFile(statsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading stats file' });
    res.json(JSON.parse(data));
  });
});

module.exports = router;
