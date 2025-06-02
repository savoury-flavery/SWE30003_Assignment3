const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

// Serve static product images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Load products
app.get('/api/products', (req, res) => {
  fs.readFile('./data/products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read products' });
    res.json(JSON.parse(data));
  });
});

// Login check
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  fs.readFile('./data/accounts.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read accounts' });
    const accounts = JSON.parse(data);
    const user = accounts.find(a => a.email === email && a.password === password);
    if (user) {
      res.json({ success: true, isAdmin: user.isAdmin, email: user.email });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
