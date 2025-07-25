import React, { useEffect, useState } from 'react';
import { jobApi } from '../../lib/backend';

// Define the Job type based on the backend's JobListing type
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

/**
 * Example component that demonstrates how to use the backend API
 * to fetch and display jobs from the backend canister.
 */
export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch jobs when the component mounts
    async function fetchJobs() {
      try {
        setLoading(true);
        const result = await jobApi.getAllJobs();
        setJobs(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (jobs.length === 0) {
    return <div>No jobs found. Be the first to post a job!</div>;
  }

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      <div className="jobs-container">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <h4>{job.company}</h4>
            {job.location && <p>Location: {job.location}</p>}
            {job.salary && <p>Salary: {job.salary}</p>}
            <p>{job.description.substring(0, 150)}...</p>
            <div className="job-footer">
              <span className="job-status">
                Status: {Object.keys(job.status)[0]}
              </span>
              <button onClick={() => alert(`View details for job ${job.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}