const express = require("express");
const router = express.Router();
const contractController = require("../controllers/ContractController");

// Get all contracts
router.get("/", contractController.getAllContracts);
// Get contract by id
router.get("/:id", contractController.getContractById);
// Get user contracts
router.get("/user/:id", contractController.getUserContracts);
// Delete contract
router.delete("/:id", contractController.deleteContract);
// Update contract
router.put("/:id", contractController.updateContract);

module.exports = router;
