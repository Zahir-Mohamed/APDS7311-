const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new payment transaction
router.post('/', authMiddleware, async (req, res) => {
  const { amount, currency, provider, payeeAccountInfo } = req.body;

  try {
    const transaction = new Transaction({ amount, currency, provider, payeeAccountInfo });
    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing transaction' });
  }
});

module.exports = router;