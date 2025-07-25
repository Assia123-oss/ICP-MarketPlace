import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Briefcase, 
  Users, 
  Clock, 
  Star, 
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  ChevronRight,
  MapPin,
  DollarSign,
  Filter,
  User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAIMatches } from '@/lib/api';
import { toast } from '@/components/ui/sonner';

export const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const handleSignOut = () => {
    window.location.href = '/';
  };

  // Jobs state (simulate backend)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      location: "Remote",
      salary: "$120K - $160K",
      posted: "5 days ago",
      applications: 23,
      views: 156,
      status: "Active",
      aiMatches: [],
    },
    {
      id: 2,
      title: "Product Manager",
      location: "San Francisco, CA",
      salary: "$130K - $180K",
      posted: "2 days ago",
      applications: 12,
      views: 89,
      status: "Active",
      aiMatches: [],
    },
    {
      id: 3,
      title: "UX Designer",
      location: "New York, NY",
      salary: "$90K - $130K",
      posted: "1 week ago",
      applications: 34,
      views: 203,
      status: "Reviewing",
      aiMatches: [],
    },
  ]);

  // Fetch AI matches for each job (simulate)
  useEffect(() => {
    jobs.forEach(async (job, idx) => {
      if (!job.aiMatches || job.aiMatches.length === 0) {
        try {
          const matches = await getAIMatches({ jobTitle: job.title, skills: [job.title.split(' ')[0]] });
          setJobs(prev => {
            const updated = [...prev];
            updated[idx] = { ...job, aiMatches: matches };
            return updated;
          });
        } catch (e) {
          // ignore for now
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  // Handle navigation to post job
  const handlePostJob = () => {
    navigate('/post-job', { state: { from: 'employer-dashboard' } });
  };

  // Handle navigation to manage jobs
  const handleManageJobs = () => {
    navigate('/manage-jobs');
  };

  // Handle click on a job
  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const candidates = [
    {
      name: "Sarah Johnson",
      title: "Senior React Developer",
      location: "San Francisco, CA",
      matchScore: 94,
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      status: "New Application",
      appliedFor: "Senior React Developer"
    },
    {
      name: "Michael Chen",
      title: "Full Stack Engineer",
      location: "Remote",
      matchScore: 89,
      experience: "4+ years",
      skills: ["React", "Python", "Docker", "PostgreSQL"],
      status: "Interview Scheduled",
      appliedFor: "Senior React Developer"
    },
    {
      name: "Emily Rodriguez",
      title: "Product Designer",
      location: "Austin, TX",
      matchScore: 92,
      experience: "6+ years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      status: "Under Review",
      appliedFor: "UX Designer"
    }
  ];

  const interviews = [
    {
      candidate: "Sarah Johnson",
      position: "Senior React Developer",
      time: "Today, 2:00 PM",
      type: "Technical Interview",
      status: "Confirmed"
    },
    {
      candidate: "Alex Kim",
      position: "Product Manager",
      time: "Tomorrow, 10:00 AM",
      type: "Cultural Fit",
      status: "Pending"
    },
    {
      candidate: "David Brown",
      position: "UX Designer",
      time: "Friday, 3:00 PM",
      type: "Portfolio Review",
      status: "Confirmed"
    }
  ];

  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', location: '', salary: '', status: '' });

  const handleEdit = (job) => {
    setEditingJob(job.id);
    setEditForm({ title: job.title, location: job.location, salary: job.salary, status: job.status });
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = (jobId) => {
    setJobs(jobs => jobs.map(job => job.id === jobId ? { ...job, ...editForm } : job));
    setEditingJob(null);
    toast.success('Job updated!');
  };

  const handleEditCancel = () => {
    setEditingJob(null);
  };

  const handleDelete = (jobId) => {
    setJobs(jobs => jobs.filter(job => job.id !== jobId));
    toast.success('Job deleted!');
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
                onClick={() => { setProfileMenuOpen(false); navigate('/settings'); }}
              >
                Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-muted text-destructive"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
        <div className="mt-2 font-semibold text-foreground">TechFlow Inc.</div>
        <div className="text-xs text-muted-foreground mb-4">Employer</div>
      </div>
      {/* Main Dashboard Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hiring Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and track candidates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="hero" onClick={handlePostJob}>Post Job</Button>
            <Button variant="outline" onClick={handleManageJobs}>Manage All</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-success">+2 this week</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-info">23 new today</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-xs text-success">+5% from last month</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Time to Hire</p>
                  <p className="text-2xl font-bold">18d</p>
                  <p className="text-xs text-warning">Industry avg: 24d</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Job Postings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Active Job Postings
                    </CardTitle>
                    <CardDescription>
                      Monitor performance of your current job listings
                    </CardDescription>
                  </div>
                  <Link to="/jobs/manage">
                    <Button variant="outline">
                      Manage All
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobs.slice().reverse().map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-card" onClick={() => handleJobClick(job.id)}>
                    {editingJob === job.id ? (
                      <div className="space-y-2">
                        <input className="w-full p-2 border rounded" value={editForm.title} onChange={e => handleEditChange('title', e.target.value)} />
                        <input className="w-full p-2 border rounded" value={editForm.location} onChange={e => handleEditChange('location', e.target.value)} />
                        <input className="w-full p-2 border rounded" value={editForm.salary} onChange={e => handleEditChange('salary', e.target.value)} />
                        <select className="w-full p-2 border rounded" value={editForm.status} onChange={e => handleEditChange('status', e.target.value)}>
                          <option value="Active">Active</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditSave(job.id)}>Save</Button>
                          <Button size="sm" variant="outline" onClick={handleEditCancel}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h2 className="font-semibold text-lg text-foreground hover:text-primary cursor-pointer">{job.title}</h2>
                            <p className="text-muted-foreground font-medium">{job.location}</p>
                          </div>
                          <Badge variant="secondary">{job.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm text-muted-foreground">{job.salary}</span>
                          <span className="text-sm text-muted-foreground">{job.posted}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm">Applications: {job.applications}</span>
                          <span className="text-sm">Views: {job.views}</span>
                        </div>
                        <div className="mt-2">
                          {job.aiMatches && job.aiMatches.length > 0 ? (
                            <Badge variant="success">AI Matches: {job.aiMatches.length}</Badge>
                          ) : (
                            <Badge variant="outline">No AI Matches</Badge>
                          )}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(job)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(job.id)}>Delete</Button>
                          <Button size="sm" onClick={() => navigate(`/job/${job.id}/candidates`)}>View Candidates</Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Candidates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning" />
                  Top Candidates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidates.slice(0, 3).map((candidate, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{candidate.name}</h4>
                        <p className="text-xs text-muted-foreground">{candidate.title}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {candidate.matchScore}% Match
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-2">
                      Applied for: {candidate.appliedFor}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-1">
                      <Button size="sm" className="text-xs h-7">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
                <Link to="/candidates">
                  <Button variant="outline" className="w-full">
                    View All Candidates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-info" />
                  Upcoming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {interviews.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{interview.candidate}</p>
                      <p className="text-xs text-muted-foreground">{interview.position}</p>
                      <p className="text-xs text-muted-foreground">{interview.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{interview.time}</p>
                      <Badge 
                        variant={interview.status === 'Confirmed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {interview.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link to="/interviews">
                  <Button variant="outline" className="w-full">
                    Manage Interviews
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/post-job">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Browse Talent Pool
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};