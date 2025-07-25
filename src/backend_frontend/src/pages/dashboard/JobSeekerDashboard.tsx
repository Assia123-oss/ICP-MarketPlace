import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Star, 
  FileText,
  Calendar,
  Target,
  Award,
  ChevronRight,
  MapPin,
  DollarSign,
  Users,
  User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAIMatches } from '@/lib/api';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyJob, setApplyJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({ coverLetter: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignOut = () => {
    window.location.href = '/';
  };
  const matchedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechFlow Inc.",
      location: "Remote",
      salary: "$120K - $160K",
      matchScore: 92,
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "StartupCo",
      location: "San Francisco, CA",
      salary: "$100K - $140K",
      matchScore: 87,
      posted: "1 day ago",
      skills: ["Vue.js", "JavaScript", "CSS"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Digital Agency",
      location: "New York, NY",
      salary: "$110K - $150K",
      matchScore: 84,
      posted: "3 days ago",
      skills: ["React", "Python", "AWS"]
    }
  ];

  // AI integration
  const [aiMatches, setAIMatches] = useState<any[]>([]);
  const [aiLoading, setAILoading] = useState(false);

  const handleAIMatch = async () => {
    setAILoading(true);
    try {
      // Replace with actual user profile data as needed
      const userProfile = { skills: ['React', 'Python'], experience: 3 };
      const matches = await getAIMatches(userProfile);
      setAIMatches(matches);
      toast.success('AI matches fetched!');
    } catch (err) {
      toast.error('Failed to fetch AI matches');
    } finally {
      setAILoading(false);
    }
  };

  // Dummy applications and saved jobs
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

  // Navigation handlers
  const goToJobListings = () => navigate('/jobs');
  const goToApplications = () => navigate('/applications');
  const goToSavedJobs = () => navigate('/saved-jobs');
  const goToPreferences = () => navigate('/preferences');
  const goToSettings = () => navigate('/settings');

  const handleApplyNow = (job) => {
    setApplyJob(job);
    setShowApplyModal(true);
  };

  const handleApplicationChange = (field, value) => {
    setApplicationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApplyModal(false);
      setApplicationForm({ coverLetter: '' });
      toast.success('Application submitted!');
    }, 1200);
  };

  const handleGetDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex">
      {/* Profile Sidebar */}
      <div className="w-48 mr-8 flex flex-col items-center">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer border-4 border-primary/30"
            onClick={() => setProfileMenuOpen((v) => !v)}
          >
            <User className="w-8 h-8 text-white" />
          </div>
          {profileMenuOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-card border rounded-lg shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-muted"
                onClick={() => { setProfileMenuOpen(false); goToSettings(); }}
              >
                Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-muted"
                onClick={() => { setProfileMenuOpen(false); goToPreferences(); }}
              >
                Preferences
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-muted text-destructive"
                onClick={() => { window.location.href = '/'; }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
        <div className="mt-2 font-semibold text-foreground">Alex Johnson</div>
        <div className="text-xs text-muted-foreground mb-4">Job Seeker</div>
        <Button variant="outline" className="w-full mb-2" onClick={goToApplications}>View Applications</Button>
        <Button variant="outline" className="w-full mb-2" onClick={goToSavedJobs}>Saved Jobs</Button>
        <Button variant="outline" className="w-full mb-2" onClick={goToJobListings}>Browse Jobs</Button>
        <Button variant="outline" className="w-full mb-2" onClick={goToPreferences}>Preferences</Button>
        <Button variant="outline" className="w-full mb-2" onClick={goToSettings}>Settings</Button>
      </div>
      {/* Main Dashboard Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Here's what's happening with your job search</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/settings')}>Settings</Button>
            <Button variant="hero" size="lg" onClick={() => navigate('/preferences')}>
              <Target className="w-4 h-4 mr-2" />
              Update Job Preferences
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">142</p>
                  <p className="text-xs text-success">+12% from last week</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-info">3 active</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Job Matches</p>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-warning">5 new today</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-success">Above average</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI-Matched Jobs */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-warning" />
                      AI-Matched Jobs
                    </CardTitle>
                    <CardDescription>
                      Jobs perfectly tailored to your skills and preferences
                    </CardDescription>
                  </div>
                  <Link to="/jobs">
                    <Button variant="outline">
                      View All
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {matchedJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground hover:text-primary cursor-pointer">
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground font-medium">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {job.matchScore}% Match
                        </Badge>
                        <p className="text-xs text-muted-foreground">{job.posted}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <Button size="sm" onClick={() => handleApplyNow(job)}>
                        Apply Now
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleGetDetails(job.id)}>
                        Get Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Overall Progress</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>✅ Basic Information</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✅ Work Experience</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✅ Skills</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>⏳ Portfolio</span>
                      <Link to="/profile" className="text-primary hover:underline">
                        Add
                      </Link>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>⏳ Certifications</span>
                      <Link to="/profile" className="text-primary hover:underline">
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-info" />
                  Application Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((app, index) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{app.company}</p>
                      <p className="text-xs text-muted-foreground">{app.position}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className={`${app.statusColor} text-white`}>
                        {app.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{app.appliedDate}</p>
                    </div>
                  </div>
                ))}
                <Link to="/applications">
                  <Button variant="outline" className="w-full">
                    View All Applications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-warning" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Interview - TechFlow Inc.</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-info rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Skills Assessment</p>
                    <p className="text-xs text-muted-foreground">Friday, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Virtual Job Fair</p>
                    <p className="text-xs text-muted-foreground">Next Monday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="my-6">
          <button onClick={handleAIMatch} className="btn btn-primary px-4 py-2 rounded bg-blue-600 text-white" disabled={aiLoading}>
            {aiLoading ? 'Fetching AI Matches...' : 'Get AI Job Matches'}
          </button>
          {aiMatches.length > 0 && (
            <ul className="mt-4 space-y-2">
              {aiMatches.map((match, idx) => (
                <li key={idx} className="p-2 border rounded">
                  <span className="font-semibold">{match.title}</span> (Score: {match.score})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="my-6 flex gap-4">
          <Button variant="outline" onClick={goToApplications}>View All Applications</Button>
          <Button variant="outline" onClick={goToSavedJobs}>Saved Jobs</Button>
          <Button variant="outline" onClick={goToJobListings}>Browse Jobs</Button>
        </div>
        {/* Application Modal */}
        <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for {applyJob?.title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              <Input
                as="textarea"
                placeholder="Cover Letter"
                value={applicationForm.coverLetter}
                onChange={e => handleApplicationChange('coverLetter', e.target.value)}
                required
              />
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};