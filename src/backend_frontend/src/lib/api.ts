
import { matchingApi } from './backend';

// AI REST API endpoint
const AI_API_URL = 'http://127.0.0.1:8000'; // Update as needed

// Get AI matches from external AI service
export async function getAIMatches(userProfile: any) {
  const response = await fetch(`${AI_API_URL}/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userProfile),
  });
  if (!response.ok) throw new Error('AI match failed');
  return response.json();
}

// Get matches from the backend canister
export async function getBackendMatches(userId: string, minScore: number = 0.5) {
  try {
    const matches = await matchingApi.findMatchingJobs(userId, minScore);
    return matches;
  } catch (error) {
    console.error('Error getting backend matches:', error);
    throw error;
  }
}

// Combined function that gets matches from both sources
export async function getAllMatches(userId: string, userProfile: any) {
  try {
    // Get matches from both sources in parallel
    const [aiMatches, backendMatches] = await Promise.all([
      getAIMatches(userProfile).catch(err => {
        console.warn('AI matching service unavailable, using only backend matches');
        return [];
      }),
      getBackendMatches(userId).catch(err => {
        console.warn('Backend matching unavailable, using only AI matches');
        return [];
      })
    ]);

    // Combine and deduplicate matches (this is a simplified example)
    // In a real implementation, you would need to normalize the data structures
    // and implement a more sophisticated deduplication strategy
    const combinedMatches = [...aiMatches, ...backendMatches];

    return combinedMatches;
  } catch (error) {
    console.error('Error getting combined matches:', error);
    throw error;
  }
}
