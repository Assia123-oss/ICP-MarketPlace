import { Actor, HttpAgent } from "@dfinity/agent";
//import { idlFactory } from "../../../declarations/backend_backend/backend_backend.did.js";
import { canisterId, createActor } from "../../../declarations/backend_backend";

// Create a new agent and actor for the backend canister
const agent = new HttpAgent();
if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
  // Fetch the root key for certificate validation during development
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

// Create the actor with the canister ID from the environment variables
export const backendActor = createActor(canisterId);

// User Management API
export const userApi = {
  // Register a new user
  registerUser: async (name, email, role, portfolio, bio, location, profilePicture) => {
    try {
      return await backendActor.registerUser(name, email, role, portfolio, bio, location, profilePicture);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Get a user by ID
  getUser: async (id) => {
    try {
      return await backendActor.getUser(id);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // Update a user
  updateUser: async (id, name, email, portfolio, bio, location, profilePicture) => {
    try {
      return await backendActor.updateUser(id, name, email, portfolio, bio, location, profilePicture);
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      return await backendActor.getAllUsers();
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  // Get users by role
  getUsersByRole: async (role) => {
    try {
      return await backendActor.getUsersByRole(role);
    } catch (error) {
      console.error(`Error fetching users by role ${role}:`, error);
      throw error;
    }
  }
};

// Job Management API
export const jobApi = {
  // Create a new job
  createJob: async (title, company, employerId, description, requirements, jobType, location, salary, skills, deadline) => {
    try {
      return await backendActor.createJob(title, company, employerId, description, requirements, jobType, location, salary, skills, deadline);
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  // Get a job by ID
  getJob: async (id) => {
    try {
      return await backendActor.getJob(id);
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      throw error;
    }
  },

  // Get all jobs
  getAllJobs: async () => {
    try {
      return await backendActor.getAllJobs();
    } catch (error) {
      console.error("Error fetching all jobs:", error);
      throw error;
    }
  },

  // Get jobs by employer
  getJobsByEmployer: async (employerId) => {
    try {
      return await backendActor.getJobsByEmployer(employerId);
    } catch (error) {
      console.error(`Error fetching jobs by employer ${employerId}:`, error);
      throw error;
    }
  },

  // Search jobs
  searchJobs: async (query) => {
    try {
      return await backendActor.searchJobs(query);
    } catch (error) {
      console.error(`Error searching jobs with query "${query}":`, error);
      throw error;
    }
  }
};

// Application Management API
export const applicationApi = {
  // Create a new application
  createApplication: async (jobId, userId, coverLetter) => {
    try {
      return await backendActor.createApplication(jobId, userId, coverLetter);
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  },

  // Get an application by ID
  getApplication: async (id) => {
    try {
      return await backendActor.getApplication(id);
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      throw error;
    }
  },

  // Get applications by job
  getApplicationsByJob: async (jobId) => {
    try {
      return await backendActor.getApplicationsByJob(jobId);
    } catch (error) {
      console.error(`Error fetching applications for job ${jobId}:`, error);
      throw error;
    }
  },

  // Get applications by user
  getApplicationsByUser: async (userId) => {
    try {
      return await backendActor.getApplicationsByUser(userId);
    } catch (error) {
      console.error(`Error fetching applications for user ${userId}:`, error);
      throw error;
    }
  },

  // Update application status
  updateApplicationStatus: async (id, status) => {
    try {
      return await backendActor.updateApplicationStatus(id, status);
    } catch (error) {
      console.error(`Error updating status for application ${id}:`, error);
      throw error;
    }
  },

  // Check if user has applied for a job
  hasUserApplied: async (userId, jobId) => {
    try {
      return await backendActor.hasUserApplied(userId, jobId);
    } catch (error) {
      console.error(`Error checking if user ${userId} has applied for job ${jobId}:`, error);
      throw error;
    }
  }
};

// Matching API
export const matchingApi = {
  // Find matching jobs for a user
  findMatchingJobs: async (userId, minScore) => {
    try {
      return await backendActor.findMatchingJobs(userId, minScore);
    } catch (error) {
      console.error(`Error finding matching jobs for user ${userId}:`, error);
      throw error;
    }
  },

  // Find matching candidates for a job
  findMatchingCandidates: async (jobId, minScore) => {
    try {
      return await backendActor.findMatchingCandidates(jobId, minScore);
    } catch (error) {
      console.error(`Error finding matching candidates for job ${jobId}:`, error);
      throw error;
    }
  },

  // Find matching jobs with advanced matching
  findMatchingJobsAdvanced: async (userId, minScore) => {
    try {
      return await backendActor.findMatchingJobsAdvanced(userId, minScore);
    } catch (error) {
      console.error(`Error finding advanced matching jobs for user ${userId}:`, error);
      throw error;
    }
  }
};

// Rating API
export const ratingApi = {
  // Create a new rating
  createRating: async (fromUserId, toUserId, score, comment) => {
    try {
      return await backendActor.createRating(fromUserId, toUserId, score, comment);
    } catch (error) {
      console.error("Error creating rating:", error);
      throw error;
    }
  },

  // Get ratings by user
  getRatingsByUser: async (userId) => {
    try {
      return await backendActor.getRatingsByUser(userId);
    } catch (error) {
      console.error(`Error fetching ratings for user ${userId}:`, error);
      throw error;
    }
  },

  // Calculate average rating
  calculateAverageRating: async (userId) => {
    try {
      return await backendActor.calculateAverageRating(userId);
    } catch (error) {
      console.error(`Error calculating average rating for user ${userId}:`, error);
      throw error;
    }
  },

  // Get rating distribution for a user
  getRatingDistribution: async (userId) => {
    try {
      return await backendActor.getRatingDistribution(userId);
    } catch (error) {
      console.error(`Error fetching rating distribution for user ${userId}:`, error);
      throw error;
    }
  },

  // Check if a user has already rated another user
  hasUserRated: async (fromUserId, toUserId) => {
    try {
      return await backendActor.hasUserRated(fromUserId, toUserId);
    } catch (error) {
      console.error(`Error checking if user ${fromUserId} has rated user ${toUserId}:`, error);
      throw error;
    }
  }
};

// Contract API
export const contractApi = {
  // Create a new contract
  createContract: async (jobId, employerId, employeeId, terms, paymentAmount, startDate) => {
    try {
      return await backendActor.createContract(jobId, employerId, employeeId, terms, paymentAmount, startDate);
    } catch (error) {
      console.error("Error creating contract:", error);
      throw error;
    }
  },

  // Get a contract by ID
  getContract: async (id) => {
    try {
      return await backendActor.getContract(id);
    } catch (error) {
      console.error(`Error fetching contract ${id}:`, error);
      throw error;
    }
  },

  // Update contract status
  updateContractStatus: async (id, status) => {
    try {
      return await backendActor.updateContractStatus(id, status);
    } catch (error) {
      console.error(`Error updating status for contract ${id}:`, error);
      throw error;
    }
  },

  // Get contracts by employer
  getContractsByEmployer: async (employerId) => {
    try {
      return await backendActor.getContractsByEmployer(employerId);
    } catch (error) {
      console.error(`Error fetching contracts for employer ${employerId}:`, error);
      throw error;
    }
  },

  // Get contracts by employee
  getContractsByEmployee: async (employeeId) => {
    try {
      return await backendActor.getContractsByEmployee(employeeId);
    } catch (error) {
      console.error(`Error fetching contracts for employee ${employeeId}:`, error);
      throw error;
    }
  },

  // Create a new dispute
  createDispute: async (contractId, raisedByUserId, description) => {
    try {
      return await backendActor.createDispute(contractId, raisedByUserId, description);
    } catch (error) {
      console.error("Error creating dispute:", error);
      throw error;
    }
  },

  // Get a dispute by ID
  getDispute: async (id) => {
    try {
      return await backendActor.getDispute(id);
    } catch (error) {
      console.error(`Error fetching dispute ${id}:`, error);
      throw error;
    }
  },

  // Update dispute status
  updateDisputeStatus: async (id, status, resolution) => {
    try {
      return await backendActor.updateDisputeStatus(id, status, resolution);
    } catch (error) {
      console.error(`Error updating status for dispute ${id}:`, error);
      throw error;
    }
  },

  // Get disputes by contract
  getDisputesByContract: async (contractId) => {
    try {
      return await backendActor.getDisputesByContract(contractId);
    } catch (error) {
      console.error(`Error fetching disputes for contract ${contractId}:`, error);
      throw error;
    }
  },

  // Get disputes by user
  getDisputesByUser: async (userId) => {
    try {
      return await backendActor.getDisputesByUser(userId);
    } catch (error) {
      console.error(`Error fetching disputes for user ${userId}:`, error);
      throw error;
    }
  }
};
