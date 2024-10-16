const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;
  
  // Input validation using regex patterns (whitelisting)
  const regexName = /^[a-zA-Z\s]+$/;
  const regexIdNumber = /^\d{6}-\d{4}$/; // Example format
  const regexAccountNumber = /^\d{10}$/; // Example format
  
  if (!regexName.test(fullName) || !regexIdNumber.test(idNumber) || !regexAccountNumber.test(accountNumber)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const newUser = new User({ fullName, idNumber, accountNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { accountNumber, password } = req.body;

  try {
    const user = await User.findOne({ accountNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;