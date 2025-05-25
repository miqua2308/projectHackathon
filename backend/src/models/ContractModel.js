const mongoose = require("mongoose");
const PaymentModel = require('../models/PaymentModel');

if (mongoose.models.Contract) {
  delete mongoose.connection.models["Contract"];
}

const ContractSchema = new mongoose.Schema({
  job_id: {
    type: String,
    ref: 'Job',
    required: true
  },
  client_id: {
    type: String,
    ref: 'User',
    required: true
  },
  freelancer_id: {
    type: String,
    ref: 'User',
    required: true
  },
  contract_id: {
    type: String,
    required: true
  },
  payment_id: {
    type: String,
    ref: 'Payment'
  },
  escrow_address: {
    type: String,
    default: null // The Solana escrow account address
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'disputed'],
    default: 'pending'
  },

  milestones: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    amount: {
      type: Number,
      required: true
    },
    due_date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  accepted_at: {
    type: Date,
    default: Date.now
  },
  completed_at: {
    type: Date,
    default: Date.now
  },
});

ContractSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

ContractSchema.methods.getRemainingAmount = async function() {
    const Payment = PaymentModel;
    
    const paidPayments = await Payment.find({
      job_id: this.job_id,
      status: 'paid'
    });
    
    const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
    return this.amount - totalPaid;
};

module.exports = mongoose.model("Contract", ContractSchema);
