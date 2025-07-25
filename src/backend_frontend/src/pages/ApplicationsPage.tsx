import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const applications = [
  {
    id: 1,
    company: "TechFlow Inc.",
    position: "Senior React Developer",
    status: "Under Review",
    appliedDate: "2024-01-15",
    statusColor: "bg-info"
  },
  {
    id: 2,
    company: "InnovateNow",
    position: "Frontend Lead",
    status: "Interview Scheduled",
    appliedDate: "2024-01-12",
    statusColor: "bg-warning"
  },
  {
    id: 3,
    company: "WebSolutions",
    position: "UI Developer",
    status: "Offer Received",
    appliedDate: "2024-01-08",
    statusColor: "bg-success"
  }
];

const ApplicationsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map(app => (
          <div key={app.id} className="border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-semibold text-lg text-foreground">{app.position}</h2>
                <p className="text-muted-foreground font-medium">{app.company}</p>
                <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
              </div>
              <Badge variant="secondary">{app.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage; 