const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  payeeAccountInfo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);