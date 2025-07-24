# ICP Job Marketplace Backend

A decentralized marketplace for connecting job seekers and employers using the Internet Computer Protocol (ICP).

## Overview

This project implements the backend for a decentralized job marketplace platform. It leverages the Internet Computer Protocol to provide a secure, transparent, and efficient way for job seekers and employers to connect.

## Features

- **User Profiles**: Verified profiles for job seekers and employers with skills, experience, and portfolio showcases.
- **Job Listings**: Employers can post job opportunities, and job seekers can browse and filter listings.
- **AI Matching**: Analyzes user profiles and job listings to suggest optimal matches.
- **Smart Contracts**: Automates agreements and payment processing with dispute resolution mechanisms.
- **Community Ratings**: Users can rate each other after transactions for transparency.

## Architecture

The backend is implemented using a modular approach with separation of concerns:

- **Types.mo**: Defines all shared types used across the application.
- **User.mo**: Handles user management functionality.
- **Job.mo**: Manages job listings.
- **Application.mo**: Handles job applications.
- **Matching.mo**: Implements the AI matching algorithm.
- **Rating.mo**: Manages the community rating system.
- **Contract.mo**: Handles smart contracts and dispute resolution.
- **Main.mo**: The main actor that integrates all modules and exposes the public API.

## API Documentation

### User Management

#### Register a new user
```motoko
registerUser(
  name: Text, 
  email: Text, 
  role: Types.Role, 
  portfolio: ?Text,
  bio: ?Text,
  location: ?Text,
  profilePicture: ?Text
) : async Text
```

#### Get a user by ID
```motoko
getUser(id: Text) : async ?Types.User
```

#### Update a user
```motoko
updateUser(
  id: Text, 
  name: Text, 
  email: Text, 
  portfolio: ?Text,
  bio: ?Text,
  location: ?Text,
  profilePicture: ?Text
) : async Text
```

#### Add a skill to user
```motoko
addSkill(userId: Text, name: Text, level: Text) : async Text
```

#### Add experience to user
```motoko
addExperience(
  userId: Text, 
  title: Text, 
  company: Text, 
  startDate: Time.Time, 
  endDate: ?Time.Time, 
  description: Text
) : async Text
```

#### Add education to user
```motoko
addEducation(
  userId: Text, 
  institution: Text, 
  degree: Text, 
  field: Text, 
  startDate: Time.Time, 
  endDate: ?Time.Time
) : async Text
```

#### Get all users
```motoko
getAllUsers() : async [Types.User]
```

#### Get users by role
```motoko
getUsersByRole(role: Types.Role) : async [Types.User]
```

### Job Management

#### Create a new job listing
```motoko
createJob(
  title: Text,
  company: Text,
  employerId: Text,
  description: Text,
  requirements: [Text],
  jobType: Types.JobType,
  location: ?Text,
  salary: ?Text,
  skills: [Text],
  deadline: ?Time.Time
) : async Text
```

#### Get a job by ID
```motoko
getJob(id: Text) : async ?Types.JobListing
```

#### Update a job listing
```motoko
updateJob(
  id: Text,
  title: Text,
  company: Text,
  description: Text,
  requirements: [Text],
  jobType: Types.JobType,
  location: ?Text,
  salary: ?Text,
  skills: [Text],
  status: Types.JobStatus,
  deadline: ?Time.Time
) : async Text
```

#### Change job status
```motoko
changeJobStatus(id: Text, status: Types.JobStatus) : async Text
```

#### Get all jobs
```motoko
getAllJobs() : async [Types.JobListing]
```

#### Get jobs by employer
```motoko
getJobsByEmployer(employerId: Text) : async [Types.JobListing]
```

#### Get jobs by status
```motoko
getJobsByStatus(status: Types.JobStatus) : async [Types.JobListing]
```

#### Get jobs by type
```motoko
getJobsByType(jobType: Types.JobType) : async [Types.JobListing]
```

#### Search jobs by title or description
```motoko
searchJobs(query: Text) : async [Types.JobListing]
```

#### Filter jobs by skills
```motoko
filterJobsBySkills(requiredSkills: [Text]) : async [Types.JobListing]
```

### Application Management

#### Create a new job application
```motoko
createApplication(
  jobId: Text,
  userId: Text,
  coverLetter: ?Text
) : async Text
```

#### Get an application by ID
```motoko
getApplication(id: Text) : async ?Types.JobApplication
```

#### Update application status
```motoko
updateApplicationStatus(
  id: Text,
  status: Types.ApplicationStatus
) : async Text
```

#### Get applications by job ID
```motoko
getApplicationsByJob(jobId: Text) : async [Types.JobApplication]
```

#### Get applications by user ID
```motoko
getApplicationsByUser(userId: Text) : async [Types.JobApplication]
```

#### Check if user has applied for a job
```motoko
hasUserApplied(userId: Text, jobId: Text) : async Bool
```

### Matching Engine

#### Find matching jobs for a user
```motoko
findMatchingJobs(userId: Text, minScore: Float) : async [Matching.MatchScore]
```

#### Find matching candidates for a job
```motoko
findMatchingCandidates(jobId: Text, minScore: Float) : async [Matching.MatchScore]
```

#### Find matching jobs with advanced matching
```motoko
findMatchingJobsAdvanced(userId: Text, minScore: Float) : async [Matching.MatchScore]
```

### Rating System

#### Create a new rating
```motoko
createRating(
  fromUserId: Text,
  toUserId: Text,
  score: Nat,
  comment: ?Text
) : async Text
```

#### Get ratings received by a user
```motoko
getRatingsByUser(userId: Text) : async [Types.Rating]
```

#### Calculate average rating for a user
```motoko
calculateAverageRating(userId: Text) : async ?Float
```

#### Get rating distribution for a user
```motoko
getRatingDistribution(userId: Text) : async [Nat]
```

#### Check if a user has already rated another user
```motoko
hasUserRated(fromUserId: Text, toUserId: Text) : async Bool
```

### Contract Management

#### Create a new contract
```motoko
createContract(
  jobId: Text,
  employerId: Text,
  employeeId: Text,
  terms: Text,
  paymentAmount: Nat,
  startDate: Time.Time
) : async Text
```

#### Get a contract by ID
```motoko
getContract(id: Text) : async ?Types.Contract
```

#### Update contract status
```motoko
updateContractStatus(
  id: Text,
  status: Types.ContractStatus
) : async Text
```

#### Get contracts by employer
```motoko
getContractsByEmployer(employerId: Text) : async [Types.Contract]
```

#### Get contracts by employee
```motoko
getContractsByEmployee(employeeId: Text) : async [Types.Contract]
```

### Dispute Resolution

#### Create a new dispute
```motoko
createDispute(
  contractId: Text,
  raisedByUserId: Text,
  description: Text
) : async Text
```

#### Get a dispute by ID
```motoko
getDispute(id: Text) : async ?Types.Dispute
```

#### Update dispute status
```motoko
updateDisputeStatus(
  id: Text,
  status: Types.DisputeStatus,
  resolution: ?Text
) : async Text
```

#### Get disputes by contract
```motoko
getDisputesByContract(contractId: Text) : async [Types.Dispute]
```

#### Get disputes by user
```motoko
getDisputesByUser(userId: Text) : async [Types.Dispute]
```

## Integration with Frontend

To integrate this backend with a React.js frontend:

1. Install the required dependencies:
   ```bash
   npm install @dfinity/agent @dfinity/candid
   ```

2. Create a service factory for the canister:
   ```javascript
   import { Actor, HttpAgent } from '@dfinity/agent';
   import { idlFactory } from './declarations/backend_backend/backend_backend.did.js';

   const agent = new HttpAgent();
   const backend = Actor.createActor(idlFactory, {
     agent,
     canisterId: process.env.CANISTER_ID_BACKEND_BACKEND,
   });
   ```

3. Call the backend functions:
   ```javascript
   // Example: Register a new user
   const registerUser = async () => {
     try {
       const result = await backend.registerUser(
         "John Doe",
         "john@example.com",
         { JobSeeker: null },
         ["https://portfolio.example.com"],
         ["Software Developer"],
         ["New York"],
         ["https://profile-pic.example.com"]
       );
       console.log(result);
     } catch (error) {
       console.error(error);
     }
   };
   ```

## Development

### Prerequisites

- [DFINITY SDK](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html)
- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/icp-job-marketplace.git
   cd icp-job-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development environment:
   ```bash
   dfx start --background
   ```

4. Deploy the canisters:
   ```bash
   dfx deploy
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.