import api from './api';
import type { AxiosResponse } from 'axios';

// Define job-related interfaces based on the backend model
export interface JobFormData {
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  skills: string[]; // This matches 'required_skills' in the backend
  budget: number;
  jobType: string; // This matches 'job_type' in the backend
  experienceLevel: string; // This matches 'experience_level' in the backend
  duration: string;
  image?: string;
  clientId?: string; // This matches 'client_id' in the backend
}

export interface Job extends JobFormData {
  _id: string;
  job_id: string;
  client_id: string;
  created_at: string;
  updated_at: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  rating: number;
  contract_id?: string;
}

// Transform frontend data to match backend expected format
const transformJobData = (data: JobFormData): any => {
  const deadline = new Date();
  deadline.setMonth(deadline.getMonth() + 3); // Default deadline 3 months from now

  return {
    title: data.title,
    description: data.description,
    responsibilities: data.responsibilities,
    requirements: data.requirements,
    required_skills: data.skills,
    budget: data.budget,
    job_type: data.jobType,
    experience_level: data.experienceLevel,
    duration: data.duration,
    image: data.image,
    client_id: data.clientId,
    job_id: `JOB-${Date.now()}`, // Generate a unique job ID
    deadline: deadline.toISOString(),
  };
};


// Job service with API methods
const jobService = {
  // Browse jobs (fetch from backend)
  browsejob: async (): Promise<Job[]> => {
    const response: AxiosResponse<Job[]> = await api.get('/jobs');
    return response.data;
  },

  // Get all jobs
  getAllJobs: async (): Promise<Job[]> => {
    const response: AxiosResponse<Job[]> = await api.get('/jobs');
    return response.data;
  },

  // Get job by ID
  getJobById: async (id: string): Promise<Job> => {
    const response: AxiosResponse<Job> = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Get jobs by client ID
  getJobsByClient: async (clientId: string): Promise<Job[]> => {
    const response: AxiosResponse<Job[]> = await api.get(`/jobs/client/${clientId}`);
    return response.data;
  },

  // Create new job
  createJob: async (jobData: JobFormData): Promise<Job> => {
    const transformedData = transformJobData(jobData);
    const response: AxiosResponse<{success: boolean, message: string, data: Job}> = 
      await api.post('/jobs/post', transformedData);
    return response.data.data;
  },

  // Update job
  updateJob: async (id: string, jobData: Partial<JobFormData>): Promise<Job> => {
    const response: AxiosResponse<Job> = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/jobs/delete/${id}`);
  }
};

export default jobService;
