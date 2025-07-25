import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { login, setSignupRole } from "@/lib/auth";

export const RegisterPage = () => {
  const [role, setRole] = useState<'jobseeker' | 'employer' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    title: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration logic
    setTimeout(() => {
      setIsLoading(false);
      const success = Math.random() > 0.5;
      if (success) {
        toast.success('Account created successfully!');
      } else {
        toast.error('Sign up failed. Please try again.');
      }
    }, 1000);
  };

  const handleInternetIdentitySignup = () => {
    // Handle Internet Identity signup logic here
    toast.info('Internet Identity sign up (ICP blockchain) coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Create your Elevate account</h1>
        <div className="flex justify-center gap-4 mb-4">
          <Button
            type="button"
            variant={role === 'jobseeker' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setRole('jobseeker')}
          >
            Sign up as a Job Seeker
          </Button>
          <Button
            type="button"
            variant={role === 'employer' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setRole('employer')}
          >
            Sign up as an Employer
          </Button>
        </div>
        {role && (
          <div className="text-center text-sm text-muted-foreground mb-2">
            Selected: {role === 'jobseeker' ? 'Job Seeker' : 'Employer'}
          </div>
        )}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => {
            setSignupRole(role); // role should be 'jobseeker' or 'employer'
            login();
          }}
        >
          <Fingerprint className="w-4 h-4 mr-2" />
          Sign up with Internet Identity
        </Button>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-border" />
          <span className="mx-3 text-muted-foreground text-xs uppercase">or</span>
          <div className="flex-grow h-px bg-border" />
        </div>
        <div>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={e => handleInputChange('password', e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={e => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        {role === 'jobseeker' && (
          <>
            <div>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
          </>
        )}
        {role === 'employer' && (
          <>
            <div>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={e => handleInputChange('company', e.target.value)}
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                placeholder="Job Title"
                required
              />
            </div>
          </>
        )}
        <Button type="submit" className="w-full" disabled={isLoading || !role}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};