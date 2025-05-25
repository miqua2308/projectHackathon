const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all freelancers
router.get("/", userController.getAllUsers);
// Get a single user
router.get('/:id', userController.getUserById) 

router.get("/role/:role", userController.getUsersByRole);

module.exports = router;

