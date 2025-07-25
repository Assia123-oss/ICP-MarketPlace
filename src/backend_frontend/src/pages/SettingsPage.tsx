import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
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
      toast.success('Settings updated!');
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <Button variant="outline" className="mb-4" onClick={() => navigate('/dashboard')}>
        &larr; Go Back
      </Button>
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow">
        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
        />
        <Input
          placeholder="New Password"
          type="password"
          value={form.password}
          onChange={e => handleChange('password', e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage; 