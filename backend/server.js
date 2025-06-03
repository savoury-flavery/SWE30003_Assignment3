const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve product images
app.use('/data', express.static(path.join(__dirname, 'data')));     // Serve JSON files like products.json

// File paths
const dataDir = path.join(__dirname, 'data');
const accountsFile = path.join(dataDir, 'accounts.json');

// Route modules
const accountRoutes = require('./routes/accountRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Route usage
app.use('/data/accounts', accountRoutes);
app.use('/data/products', productRoutes);
app.use('/data/orders', orderRoutes);
app.use('/data/stats', statsRoutes);

// Registration endpoint
app.post('/data/register', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(accountsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading accounts file' });

    const accounts = JSON.parse(data);

    if (accounts.find(acc => acc.email === email)) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const newAccount = { email, password, role: 'customer' };
    accounts.push(newAccount);

    fs.writeFile(accountsFile, JSON.stringify(accounts, null, 2), err => {
      if (err) return res.status(500).json({ message: 'Error saving account' });
      res.status(201).json({ message: 'Account registered successfully' });
    });
  });
});

// Login endpoint
app.post('/data/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(accountsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });

    const accounts = JSON.parse(data);
    const account = accounts.find(acc => acc.email === email && acc.password === password);

    if (!account) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      email: account.email,
      role: account.role,
      isAdmin: account.role === 'admin'
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
