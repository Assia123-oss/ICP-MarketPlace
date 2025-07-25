import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const PreferencesPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    desiredRole: '',
    location: '',
    salary: '',
    skills: '',
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
      toast.success('Preferences updated!');
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <Button variant="outline" className="mb-4" onClick={() => navigate('/dashboard')}>
        &larr; Go Back
      </Button>
      <h1 className="text-2xl font-bold mb-6 text-center">Job Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow">
        <Input
          placeholder="Desired Role (e.g. Frontend Developer)"
          value={form.desiredRole}
          onChange={e => handleChange('desiredRole', e.target.value)}
        />
        <Input
          placeholder="Preferred Location(s)"
          value={form.location}
          onChange={e => handleChange('location', e.target.value)}
        />
        <Input
          placeholder="Target Salary (e.g. $120K - $150K)"
          value={form.salary}
          onChange={e => handleChange('salary', e.target.value)}
        />
        <Input
          placeholder="Key Skills (comma separated)"
          value={form.skills}
          onChange={e => handleChange('skills', e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </div>
  );
};

export default PreferencesPage; 