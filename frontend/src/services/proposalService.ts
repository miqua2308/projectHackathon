import api from './api';
import type { AxiosResponse } from 'axios';

export interface ProposalFormData {
  jobId: string;          // The _id of the job being applied for
  freelancerId: string;   // The publicKey of the applicant
  proposalText: string;
  estimatedTime: string;
  availability: string;
}

export interface Proposal extends Omit<ProposalFormData, 'jobId'> {
  _id: string;
  jobId: {
    _id: string;
    title?: string;
    description?: string;
    budget?: number;
  };
  clientId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const proposalService = {
  /**
   * Create a new proposal
   */
  createProposal: async (proposalData: ProposalFormData): Promise<Proposal> => {
    try {
      const response: AxiosResponse<ApiResponse<Proposal>> = await api.post('/proposals', proposalData);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create proposal';
      throw new Error(errorMessage);
    }
  },

  /**
   * Get all proposals for a specific job
   */
  getProposalsByJob: async (jobId: string): Promise<Proposal[]> => {
    try {
      const response: AxiosResponse<ApiResponse<Proposal[]>> = await api.get(`/proposals/job/${jobId}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch job proposals';
      throw new Error(errorMessage);
    }
  },

  /**
   * Get all proposals submitted by a freelancer
   */
  getProposalsByFreelancer: async (freelancerId: string): Promise<Proposal[]> => {
    try {
      const response: AxiosResponse<ApiResponse<Proposal[]>> = await api.get(`/proposals/freelancer/${freelancerId}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch freelancer proposals';
      throw new Error(errorMessage);
    }
  },

  /**
   * Get a single proposal by ID
   */
  getProposalById: async (proposalId: string): Promise<Proposal> => {
    try {
      const response: AxiosResponse<ApiResponse<Proposal>> = await api.get(`/proposals/${proposalId}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch proposal';
      throw new Error(errorMessage);
    }
  },

  /**
   * Update proposal status (accept/reject/withdraw)
   */
  updateProposalStatus: async (proposalId: string, status: 'accepted' | 'rejected' | 'withdrawn', clientId?: string): Promise<Proposal> => {
    try {
      const response: AxiosResponse<ApiResponse<Proposal>> = await api.put(
        `/proposals/${proposalId}/status`,
        { status, ...(clientId && { clientId }) }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update proposal status';
      throw new Error(errorMessage);
    }
  },

  /**
   * Check if a freelancer has already applied to a job
   */
  hasApplied: async (jobId: string, freelancerId: string): Promise<boolean> => {
    try {
      const proposals = await proposalService.getProposalsByFreelancer(freelancerId);
      return proposals.some(proposal => proposal.jobId._id === jobId);
    } catch (error) {
      console.error('Error checking if user has applied:', error);
      return false;
    }
  },

  /**
   * Get all proposals
   */
  getAllProposals: async (): Promise<Proposal[]> => {
    try {
      const response: AxiosResponse<ApiResponse<Proposal[]>> = await api.get('/proposals');
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch proposals';
      throw new Error(errorMessage);
    }
  }
};

export default proposalService;
