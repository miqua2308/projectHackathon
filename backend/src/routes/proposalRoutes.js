const express = require("express");
const router = express.Router();
const proposalController = require("../controllers/ProposalController");
// const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes if needed
// router.use(authMiddleware);

// Create a new proposal
router.post("/", proposalController.createProposal);
router.get("/", proposalController.getAllProposals);
router.delete("/delete-all", proposalController.deleteAllProposals);
// Get all proposals for a specific job
router.get("/job/:jobId", proposalController.getProposalsByJob);

// Get all proposals by freelancer
router.get("/freelancer/:freelancerId", proposalController.getProposalsByFreelancer);

// Get proposal by ID
router.get("/:id", proposalController.getProposalById);

// Update proposal status (accept/reject/withdraw)
router.put("/:proposalId/status", proposalController.updateProposalStatus);

module.exports = router;
