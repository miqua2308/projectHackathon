const mongoose = require("mongoose");

// Delete existing model if it exists to prevent overwrite errors during development
if (mongoose.models.Proposal) {
  delete mongoose.connection.models["Proposal"];
}

const ProposalSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming Job _id is an ObjectId
    ref: 'Job',
    required: true
  },
  freelancerId: { // Public key of the freelancer submitting the proposal
    type: String,
    required: true
  },
  clientId: { // Public key of the client who posted the job
    type: String,
    required: true
  },
  proposalText: { // The main proposal content from the form
    type: String,
    required: true
  },
  estimatedTime: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ProposalSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Proposal", ProposalSchema);
