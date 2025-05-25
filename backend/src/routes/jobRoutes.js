const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");

// Get all jobs
router.get("/", jobController.getAllJobs);
// Route to delete all data (jobs + users) — call only intentionally
router.delete('/delete-all', jobController.deleteAllData);
//get job by id
router.get("/:id", jobController.getJobById);
//delete job by id
router.delete("/delete/:id", jobController.deleteJob);
//get all jobs by client id
router.get("/client/:clientId", jobController.getJobsByClient);
// Post job
router.post("/post", jobController.postJob);
// Update job
router.put("/:id", jobController.updateJob);
module.exports = router;
