# Backend Integration Examples

This directory contains example components that demonstrate how to integrate with the backend canister and AI services.

## API Layer

The application provides two main API modules:

1. **Backend API** (`/src/lib/backend.ts`): Provides functions to interact with the backend canister.
2. **AI API** (`/src/lib/api.ts`): Provides functions to interact with the AI service and combined functions that use both the AI service and backend canister.

## Example Components

### JobList

`JobList.tsx` demonstrates how to fetch and display jobs from the backend canister using the `jobApi` from the backend API layer.

```tsx
import { jobApi } from '../../lib/backend';

// In your component:
const fetchJobs = async () => {
  try {
    const jobs = await jobApi.getAllJobs();
    // Process and display jobs
  } catch (error) {
    // Handle error
  }
};
```

### JobMatches

`JobMatches.tsx` demonstrates how to fetch job matches from both the AI service and the backend canister using the combined API functions.

```tsx
import { getAllMatches } from '../../lib/api';

// In your component:
const fetchMatches = async (userId, userProfile) => {
  try {
    const matches = await getAllMatches(userId, userProfile);
    // Process and display matches
  } catch (error) {
    // Handle error
  }
};
```

## Available API Functions

### Backend API

The backend API is organized into several modules:

#### User API

- `userApi.registerUser(name, email, role, portfolio, bio, location, profilePicture)`
- `userApi.getUser(id)`
- `userApi.updateUser(id, name, email, portfolio, bio, location, profilePicture)`
- `userApi.getAllUsers()`
- `userApi.getUsersByRole(role)`

#### Job API

- `jobApi.createJob(title, company, employerId, description, requirements, jobType, location, salary, skills, deadline)`
- `jobApi.getJob(id)`
- `jobApi.getAllJobs()`
- `jobApi.getJobsByEmployer(employerId)`
- `jobApi.searchJobs(query)`

#### Application API

- `applicationApi.createApplication(jobId, userId, coverLetter)`
- `applicationApi.getApplication(id)`
- `applicationApi.getApplicationsByJob(jobId)`
- `applicationApi.getApplicationsByUser(userId)`

#### Matching API

- `matchingApi.findMatchingJobs(userId, minScore)`
- `matchingApi.findMatchingCandidates(jobId, minScore)`

#### Rating API

- `ratingApi.createRating(fromUserId, toUserId, score, comment)`
- `ratingApi.getRatingsByUser(userId)`
- `ratingApi.calculateAverageRating(userId)`

#### Contract API

- `contractApi.createContract(jobId, employerId, employeeId, terms, paymentAmount, startDate)`
- `contractApi.getContract(id)`
- `contractApi.getContractsByEmployer(employerId)`
- `contractApi.getContractsByEmployee(employeeId)`

### AI API

- `getAIMatches(userProfile)`: Gets job matches from the AI service
- `getBackendMatches(userId, minScore)`: Gets job matches from the backend canister
- `getAllMatches(userId, userProfile)`: Gets job matches from both sources and combines them

## Error Handling

All API functions include proper error handling. You should always wrap API calls in try-catch blocks:

```tsx
try {
  const result = await jobApi.getAllJobs();
  // Process result
} catch (error) {
  console.error('API error:', error);
  // Handle error (show error message, retry, etc.)
}
```

## Type Definitions

The API functions return data structures that match the backend canister's types. You can define TypeScript interfaces for these types based on the backend's type definitions in `Types.mo`.

For example:

```tsx
type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  location?: string;
  salary?: string;
  status: { Open: null } | { Closed: null } | { Filled: null };
  createdAt: bigint;
};
```

## Building and Deploying

After making changes to the frontend code, you need to build and deploy it:

```bash
# Build the frontend
npm run build

# Deploy the frontend canister
dfx deploy backend_frontend
```

This will compile the frontend code and deploy it to the Internet Computer.