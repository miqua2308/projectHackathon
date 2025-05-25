const JobModel = require('../models/JobModel');
const UserModel = require('../models/userModel');


async function transformJob(job) {
  return {
    ...job.toObject(),
    created_at: job.created_at ? job.created_at.toLocaleString() : null,
    updated_at: job.updated_at ? job.updated_at.toLocaleString() : null,
    deadline: job.deadline ? job.deadline.toLocaleString() : null,
  };
}

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    // Transform the jobs to convert Date objects to readable strings
    const transformedJobs = await Promise.all(jobs.map(transformJob));
    res.status(200).json(transformedJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobModel.findOne({ job_id: req.params.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const transformedJob = await transformJob(job);
    res.status(200).json(transformedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobsByClient = async (req, res) => {
  try {
    const jobs = await JobModel.find({ client_id: req.params.clientId });
    const transformedJobs = await Promise.all(jobs.map(job => transformJob(job)));
    res.status(200).json(transformedJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try{
    const job = await JobModel.findOne(req.params.id)
    if(!job){
      return res.status(404).json({message: 'Job not found'})
    }
    job.title = req.body.title || job.title
    job.description = req.body.description || job.description
    job.responsibilities = req.body.responsibilities || job.responsibilities
    job.requirements = req.body.requirements || job.requirements
    job.required_skills = req.body.required_skills || job.required_skills
    job.budget = req.body.budget || job.budget
    job.job_type = req.body.job_type || job.job_type
    job.experience_level = req.body.experience_level || job.experience_level
    job.duration = req.body.duration || job.duration
    job.image = req.body.image || job.image
    job.updated_at = new Date()
    await job.save()
    res.status(200).json(job)
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message })
  }
}

exports.deleteAllData = async (req, res) => {
  try {
    // Warning: This deletes ALL jobs and ALL users!
    await JobModel.deleteMany({});
    await UserModel.deleteMany({});

    res.status(200).json({ message: "All jobs and users have been deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findOneAndDelete({ job_id: req.params.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Utility to add months based on duration string
function calculateDeadline(createdAt, duration) {
  const date = new Date(createdAt);
  switch (duration) {
    case 'Less than 1 month':
      date.setDate(date.getDate() + 25); break;
    case '1-3 months':
      date.setMonth(date.getMonth() + 2); break;
    case '3-6 months':
      date.setMonth(date.getMonth() + 4); break;
    case 'More than 6 months':
      date.setMonth(date.getMonth() + 7); break;
    default:
      date.setMonth(date.getMonth() + 1);
  }
  return date;
} 

exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      responsibilities,
      requirements,
      required_skills,
      budget,
      job_type,
      experience_level,
      duration,
      image,
      client_id
    } = req.body;

    // Count existing jobs to generate the next job_id
    const count = await JobModel.countDocuments();
    const jobId = `job${count + 1}`;

    const createdAt = new Date();
    const deadline = calculateDeadline(createdAt, duration);

    const job = new JobModel({
      job_id: jobId,
      title,
      description,
      responsibilities,
      requirements,
      required_skills,
      budget,
      job_type,
      experience_level,
      duration,
      image,
      client_id,
      created_at: createdAt,
      deadline: deadline,
    });

    const newJob = await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: newJob
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
