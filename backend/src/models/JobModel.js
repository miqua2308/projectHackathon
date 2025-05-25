const mongoose = require("mongoose");

// Delete existing model if it exists
if (mongoose.models.Job) {
  delete mongoose.connection.models["Job"];
}

const JobSchema = new mongoose.Schema({
  client_id: {
    type: String,
    ref: 'User',
    required: true
  },
  // freelancer_id: {
  //   type: String,
  //   ref: 'User',
  //   default: null
  // },
  job_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: {
    type: String,
    required: true
  },  
  requirements: {
    type: String,
    default: "",
  },
  required_skills: {
    type: Array,
    default: [],
  },
  budget: {
    type: Number,
    required: true
  },
  job_type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Hourly', 'Project-based'],
    default: 'Full-time',
    required: true
  },
  experience_level: {
    type: String,
    enum: ['Entry level', 'Intermediate', 'Expert'],
    default: 'Entry level',
    required: true
  },
  duration: {
    type: String,
    enum: ['Less than 1 month', '1-3 months', '3-6 months', 'More than 6 months'],
    default: 'Less than 1 month',
    required: true
  },
  image: {
    type: String,
    default: null,
  },
  rating:{
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed', 'cancelled'],
    default: 'open'
  },
  contract_id: {
    type: String,
    ref: 'Contract'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: true
  }
});

JobSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Add transform to convert Date fields to ISO string when toJSON is called
JobSchema.set('toJSON', {
  transform: function(doc, ret) {
    if (ret.created_at) {
      ret.created_at = ret.created_at.toISOString();
    }
    if (ret.deadline) {
      ret.deadline = ret.deadline.toISOString();
    }
    return ret;
  }
});

module.exports = mongoose.model("Job", JobSchema);
