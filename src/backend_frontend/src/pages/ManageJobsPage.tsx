import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAIMatches } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const initialJobs = [
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
];

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(initialJobs);
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', location: '', salary: '', status: '' });

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

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

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
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Manage All Jobs</h1>
        <Button variant="outline" onClick={() => navigate('/dashboard/employer')}>
          Back to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.slice().reverse().map((job) => (
          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
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
                    <h2 className="font-semibold text-lg text-foreground hover:text-primary cursor-pointer" onClick={() => handleJobClick(job.id)}>{job.title}</h2>
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
      </div>
    </div>
  );
};

export default ManageJobsPage; 