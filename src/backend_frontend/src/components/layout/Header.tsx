import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Briefcase, User, Search, Bell } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: 'jobseeker' | 'employer';
}

export const Header = ({ isAuthenticated = false, userRole }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const signOut = () => {
    // Placeholder: Add real sign out logic here
    window.location.href = '/';
  };

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Elevate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/jobs"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/jobs') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {userRole === 'employer' ? 'My Jobs' : 'Find Jobs'}
                </Link>
                <Link
                  to="/profile"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Profile
                </Link>
                <Link
                  to="/community"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/community') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Community
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/how-it-works"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  How it Works
                </Link>
                <Link
                  to="/jobs"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  About
                </Link>
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-4 h-4" />
                </Button>
                <Button variant="destructive" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero" size="lg">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/jobs"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    {userRole === 'employer' ? 'My Jobs' : 'Find Jobs'}
                  </Link>
                  <Link
                    to="/profile"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/community"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    Community
                  </Link>
                  <Button variant="destructive" className="mt-4" onClick={signOut}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Link
                    to="/how-it-works"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    How it Works
                  </Link>
                  <Link
                    to="/jobs"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    to="/about"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={toggleMobileMenu}
                  >
                    About
                  </Link>
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-col space-y-2">
                      <Link to="/login" onClick={toggleMobileMenu}>
                        <Button variant="ghost" className="w-full justify-start">
                          Log In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={toggleMobileMenu}>
                        <Button variant="hero" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};