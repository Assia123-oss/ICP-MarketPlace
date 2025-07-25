import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Linkedin, Github, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Elevate</span>
            </div>
            <p className="text-neutral-light mb-6 max-w-md">
              The decentralized job marketplace that puts control back in your hands. 
              Connect directly with opportunities using blockchain technology and AI-powered matching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-light hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-neutral-light hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-neutral-light hover:text-primary transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/ai-matching" className="text-neutral-light hover:text-primary transition-colors">
                  AI Matching
                </Link>
              </li>
              <li>
                <Link to="/career-resources" className="text-neutral-light hover:text-primary transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-neutral-light hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/find-talent" className="text-neutral-light hover:text-primary transition-colors">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-neutral-light hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="text-neutral-light hover:text-primary transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-light/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-light text-sm">
              © 2024 Elevate. Built on Internet Computer Protocol.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-neutral-light hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-light hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/help" className="text-neutral-light hover:text-primary text-sm transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};