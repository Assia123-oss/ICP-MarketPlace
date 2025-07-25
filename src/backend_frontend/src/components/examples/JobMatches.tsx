import React, { useEffect, useState } from 'react';
import { getAllMatches } from '../../lib/api';

// Define the Match type (simplified for this example)
type Match = {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  source: 'AI' | 'Backend' | 'Both';
};

/**
 * Example component that demonstrates how to use the combined API
 * to fetch job matches from both the AI service and the backend canister.
 */
export default function JobMatches({ userId }: { userId: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock user profile for AI matching
  const userProfile = {
    id: userId,
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
    experience: [
      {
        title: 'Frontend Developer',
        company: 'Tech Co',
        years: 2
      }
    ],
    preferences: {
      remote: true,
      minSalary: 80000
    }
  };

  useEffect(() => {
    // Fetch matches when the component mounts
    async function fetchMatches() {
      try {
        setLoading(true);
        const result = await getAllMatches(userId, userProfile);
        
        // Process and normalize the results
        // This is a simplified example - in a real app, you'd need more sophisticated processing
        const processedMatches: Match[] = result.map((match: any) => ({
          id: match.id || match.jobId,
          title: match.title || match.jobTitle,
          company: match.company || match.companyName,
          matchScore: match.score || match.matchScore || 0,
          source: match.source || 'Both'
        }));
        
        setMatches(processedMatches);
        setError(null);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to fetch job matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [userId, userProfile]);

  if (loading) {
    return <div>Finding your perfect job matches...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (matches.length === 0) {
    return <div>No matches found. Try updating your profile with more skills!</div>;
  }

  return (
    <div className="job-matches">
      <h2>Your Job Matches</h2>
      <div className="matches-container">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <h3>{match.title}</h3>
              <span className="match-score">{Math.round(match.matchScore * 100)}% Match</span>
            </div>
            <h4>{match.company}</h4>
            <div className="match-footer">
              <span className="match-source">Source: {match.source}</span>
              <button onClick={() => alert(`View details for job ${match.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}