import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const dummyCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior React Developer',
    location: 'San Francisco, CA',
    matchScore: 94,
    experience: '5+ years',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    status: 'New',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Full Stack Engineer',
    location: 'Remote',
    matchScore: 89,
    experience: '4+ years',
    skills: ['React', 'Python', 'Docker', 'PostgreSQL'],
    status: 'Shortlisted',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Product Designer',
    location: 'Austin, TX',
    matchScore: 92,
    experience: '6+ years',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    status: 'Rejected',
  },
];

const statusOptions = ['New', 'Shortlisted', 'Rejected', 'Accepted'];

const JobCandidatesPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(dummyCandidates);

  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c));
    toast.success(`Candidate marked as ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Candidates for Job #{jobId}</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map(candidate => (
          <div key={candidate.id} className="border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-semibold text-lg text-foreground">{candidate.name}</h2>
                <p className="text-muted-foreground font-medium">{candidate.title}</p>
                <p className="text-xs text-muted-foreground">{candidate.location}</p>
              </div>
              <Badge variant="secondary">{candidate.status}</Badge>
            </div>
            <div className="mb-2">
              <span className="text-sm">Experience: {candidate.experience}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {candidate.skills.map((skill, idx) => (
                <Badge key={idx} variant="outline">{skill}</Badge>
              ))}
            </div>
            <div className="mb-2">
              <span className="text-sm">Match Score: {candidate.matchScore}%</span>
            </div>
            <div className="flex gap-2 mt-2">
              {statusOptions.map(option => (
                <Button
                  key={option}
                  size="sm"
                  variant={candidate.status === option ? 'default' : 'outline'}
                  onClick={() => handleStatusChange(candidate.id, option)}
                  disabled={candidate.status === option}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCandidatesPage; 