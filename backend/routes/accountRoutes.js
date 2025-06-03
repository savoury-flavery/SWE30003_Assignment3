const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to your JSON data file
const accountsFile = path.join(__dirname, '../data/accounts.json');

// GET all accounts
router.get('/', (req, res) => {
  fs.readFile(accountsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading accounts file' });
    const accounts = JSON.parse(data);
    res.json(accounts);
  });
});

// GET a single account by email (example)
router.get('/:email', (req, res) => {
  fs.readFile(accountsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading accounts file' });
    const accounts = JSON.parse(data);
    const account = accounts.find(acc => acc.email === req.params.email);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json(account);
  });
});

// POST to add a new account
router.post('/', (req, res) => {
  const { email, password } = req.body;
  fs.readFile(accountsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading accounts file' });
    const accounts = JSON.parse(data);

    if (accounts.find(acc => acc.email === email)) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const newAccount = { email, password, role: 'customer' };
    accounts.push(newAccount);

    fs.writeFile(accountsFile, JSON.stringify(accounts, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error saving account' });
      res.status(201).json({ message: 'Account created' });
    });
  });
});

module.exports = router;
