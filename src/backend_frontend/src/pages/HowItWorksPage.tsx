import React from 'react';
import heroImg from '@/assets/hero-image.jpg'; // Use your own illustration or image

const HowItWorksPage = () => (
  <div className="relative max-w-3xl mx-auto py-12 px-4">
    {/* Decorative background shape */}
    <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl z-0" />
    {/* Hero Illustration */}
    <div className="flex justify-center mb-8 relative z-10">
      <img src={heroImg} alt="How Elevate Works" className="w-48 h-48 object-contain rounded-2xl shadow-lg animate-fade-in" />
    </div>
    <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">How Elevate Works</h1>
    <section className="mb-8 animate-fade-in delay-100">
      <h2 className="text-xl font-semibold mb-2">Decentralized Job Marketplace</h2>
      <p>
        Elevate connects job seekers and employers directly using blockchain technology and AI-powered matching. Users can sign up as a Job Seeker or Employer, create a profile, and interact with the platform securely and transparently.
      </p>
    </section>
    <section className="mb-8 animate-fade-in delay-200">
      <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Sign up as a Job Seeker or Employer using email/password or Internet Identity (ICP blockchain).</li>
        <li>Complete your profile with relevant details (skills, experience, company info, etc.).</li>
        <li>Job Seekers can browse and apply for jobs; Employers can post jobs and manage applications.</li>
        <li>Benefit from AI-powered job matching, transparent ratings, and secure smart contracts.</li>
      </ol>
    </section>
    <section className="mb-8 animate-fade-in delay-300">
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Decentralized authentication and identity with Internet Identity</li>
        <li>Role-based onboarding for Job Seekers and Employers</li>
        <li>AI-powered job and candidate matching</li>
        <li>Transparent, blockchain-verified ratings and reviews</li>
        <li>Smart contract-based agreements for secure hiring</li>
        <li>Real-time analytics and skill demand trends</li>
        <li>Privacy-first, user-owned data</li>
      </ul>
    </section>
    <section className="animate-fade-in delay-400">
      <h2 className="text-xl font-semibold mb-2">Why Elevate?</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Own your data and credentials</li>
        <li>Transparent, fair, and bias-free matching</li>
        <li>Lower fees and direct communication</li>
        <li>Portable reputation across Web3 platforms</li>
      </ul>
    </section>
  </div>
);

export default HowItWorksPage; 