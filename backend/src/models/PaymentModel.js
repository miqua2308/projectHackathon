const mongoose = require("mongoose");

// Delete existing model if it exists
if (mongoose.models.Payment) {
  delete mongoose.connection.models["Payment"];
}

const PaymentSchema = new mongoose.Schema({
  job_id: {
    type: String,
    ref: 'Job',
    required: true
  },
  client_wallet: {
    type: String,
    required: true
  },
  freelancer_wallet: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  token: {
    type: String,
    enum: ['SOL', 'USDC', 'Other'],
    default: 'SOL'
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'disputed', 'refunded'],
    default: 'pending'
  },
  transaction_hash: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

PaymentSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model("Payment", PaymentSchema);
