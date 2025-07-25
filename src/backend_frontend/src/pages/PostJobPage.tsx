import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useNavigate, useLocation } from 'react-router-dom';

const PostJobPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: '',
    skills: '',
    description: '',
    deadline: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Job posted successfully!');
      // Add job to EmployerDashboard's job list via navigation state
      const newJob = {
        id: Date.now(),
        title: form.title,
        location: form.location,
        salary: form.salary,
        posted: 'Just now',
        applications: 0,
        views: 0,
        status: 'Active',
        aiMatches: [],
      };
      navigate('/dashboard/employer', { state: { newJob } });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Post a New Job</h1>
        <Input
          placeholder="Job Title"
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
          required
        />
        <Input
          placeholder="Company Name"
          value={form.company}
          onChange={e => handleChange('company', e.target.value)}
          required
        />
        <Input
          placeholder="Location"
          value={form.location}
          onChange={e => handleChange('location', e.target.value)}
        />
        <Input
          placeholder="Salary"
          value={form.salary}
          onChange={e => handleChange('salary', e.target.value)}
        />
        <Input
          placeholder="Job Type (e.g. Full-time)"
          value={form.jobType}
          onChange={e => handleChange('jobType', e.target.value)}
        />
        <Input
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={e => handleChange('skills', e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Job Description"
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
        />
        <Input
          type="date"
          placeholder="Application Deadline"
          value={form.deadline}
          onChange={e => handleChange('deadline', e.target.value)}
        />
        <div className="flex gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Posting...' : 'Post Job'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard/employer')}>
            Cancel
          </Button>
        </div>
        <Button type="button" variant="ghost" onClick={() => navigate('/manage-jobs')}>
          Manage All Jobs
        </Button>
      </form>
    </div>
  );
};

export default PostJobPage; 