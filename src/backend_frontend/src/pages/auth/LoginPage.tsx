import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { login } from "@/lib/auth";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login logic
    setTimeout(() => {
      setIsLoading(false);
      const success = Math.random() > 0.5;
      if (success) {
        toast.success('Signed in successfully!');
      } else {
        toast.error('Sign in failed. Please check your credentials.');
      }
    }, 1000);
  };

  const handleInternetIdentityLogin = () => {
    // Handle Internet Identity login logic here
    toast.info('Internet Identity login (ICP blockchain) coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Sign in to Elevate</h1>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={login}
        >
          <Fingerprint className="w-4 h-4 mr-2" />
          Continue with Internet Identity
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};