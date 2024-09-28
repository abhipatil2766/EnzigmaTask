const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  User.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err });

      const newUser = { email, password: hash };
      User.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User registered successfully' });
      });
    });
  });
});

// Login a user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
