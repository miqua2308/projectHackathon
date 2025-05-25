const ProposalModel = require('../models/proposalModel');
const JobModel = require('../models/JobModel');

// Create a new proposal
const createProposal = async (req, res) => {
  try {
    const {
      jobId,
      freelancerId,
      proposalText,
      estimatedTime,
      availability
    } = req.body;

    // Validate required fields
    if (!jobId || !freelancerId || !proposalText || !estimatedTime || !availability) {
      return res.status(400).json({ message: 'Missing required fields for proposal.' });
    }

    // Find the job to get the clientId
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    const clientId = job.client_id;

    const newProposal = new ProposalModel({
      jobId,
      freelancerId,
      clientId,
      proposalText,
      estimatedTime,
      availability,
    });

    const savedProposal = await newProposal.save();

    res.status(201).json({
      success: true,
      message: 'Proposal submitted successfully.',
      data: savedProposal
    });

  } catch (error) {
    console.error('Error creating proposal:', error);
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error: ' + error.message });
    }
    res.status(500).json({ message: 'Failed to submit proposal.', error: error.message });
  }
};

const getAllProposals = async (req, res) => {
  try {
    const proposals = await ProposalModel.find()
      .populate('jobId', 'title description budget status')
      .populate('freelancerId', 'username')
      .sort({ createdAt: -1 });

    // Format the response to include relevant information
    const formattedProposals = proposals.map(proposal => ({
      id: proposal._id,
      jobTitle: proposal.jobId?.title,
      jobDescription: proposal.jobId?.description,
      budget: proposal.jobId?.budget,
      status: proposal.status,
      freelancer: proposal.freelancerId?.username,
      estimatedTime: proposal.estimatedTime,
      availability: proposal.availability,
      submittedAt: proposal.submittedAt
    }));

    res.status(200).json({
      success: true,
      data: formattedProposals
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch proposals', 
      error: error.message 
    });
  }
};
// Get all proposals for a specific job
const getProposalsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const proposals = await ProposalModel.find({ jobId })
      .populate('jobId', 'title description budget')
      .populate('freelancerId', 'name'); // Assuming you have a User model

    res.status(200).json({
      success: true,
      data: proposals
    });
  } catch (error) {
    console.error('Error fetching job proposals:', error);
    res.status(500).json({ message: 'Failed to fetch proposals', error: error.message });
  }
};

// Get all proposals submitted by a freelancer
const getProposalsByFreelancer = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const proposals = await ProposalModel.find({ freelancerId })
      .populate('jobId', 'title budget')
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      data: proposals
    });
  } catch (error) {
    console.error('Error fetching freelancer proposals:', error);
    res.status(500).json({ message: 'Failed to fetch proposals', error: error.message });
  }
};

// Update proposal status (accept/reject/withdraw)
const updateProposalStatus = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { status, clientId } = req.body;

    // Validate status
    if (!['accepted', 'rejected', 'withdrawn'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const proposal = await ProposalModel.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    // Verify client is the job owner if accepting/rejecting
    if (['accepted', 'rejected'].includes(status) && proposal.clientId !== clientId) {
      return res.status(403).json({ message: 'Not authorized to update this proposal' });
    }

    // Update status
    proposal.status = status;
    proposal.updatedAt = new Date();
    await proposal.save();

    res.status(200).json({
      success: true,
      message: `Proposal ${status} successfully`,
      data: proposal
    });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({ message: 'Failed to update proposal status', error: error.message });
  }
};

// Get proposal by ID
const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await ProposalModel.findById(id)
      .populate('jobId', 'title description budget')
      .populate('freelancerId', 'name email'); // Assuming you have a User model

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.status(200).json({
      success: true,
      data: proposal
    });
  } catch (error) {
    console.error('Error fetching proposal:', error);
    res.status(500).json({ message: 'Failed to fetch proposal', error: error.message });
  }
};

const deleteAllProposals = async (req, res) => {
  try {
    await ProposalModel.deleteMany({});
    res.status(200).json({ message: 'All proposals have been deleted.' });
  } catch (error) {
    console.error('Error deleting proposals:', error);
    res.status(500).json({ message: 'Failed to delete proposals', error: error.message });
  }
}
// Export all controller functions
module.exports = {
  createProposal,
  getAllProposals,
  getProposalsByJob,
  getProposalsByFreelancer,
  updateProposalStatus,
  getProposalById,
  deleteAllProposals,
};
