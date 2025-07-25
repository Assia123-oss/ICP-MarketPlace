import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const savedJobs = [
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    salary: "$110K - $160K",
    type: "Full-time",
    posted: "1 week ago",
    skills: ["Kubernetes", "AWS", "Terraform", "Jenkins", "Python"],
    description: "Manage and optimize our cloud infrastructure and deployment processes...",
    rating: 4.6,
    employees: "200-500",
    matchScore: 89
  }
];

const SavedJobsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Saved Jobs</h1>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedJobs.map(job => (
          <div key={job.id} className="border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-semibold text-lg text-foreground">{job.title}</h2>
                <p className="text-muted-foreground font-medium">{job.company}</p>
                <p className="text-xs text-muted-foreground">{job.location}</p>
              </div>
              <Badge variant="secondary">{job.matchScore}% Match</Badge>
            </div>
            <div className="mb-2">
              <span className="text-sm">Salary: {job.salary}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {job.skills.map((skill, idx) => (
                <Badge key={idx} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobsPage; 