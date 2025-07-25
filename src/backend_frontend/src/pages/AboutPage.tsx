import React from 'react';
import aboutImg from '@/assets/hero-image.jpg'; // Use your own illustration or image

const AboutPage = () => (
  <div className="relative max-w-3xl mx-auto py-12 px-4">
    {/* Decorative background shape */}
    <div className="absolute -top-16 left-0 w-64 h-64 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl z-0" />
    {/* Team/Mission Illustration */}
    <div className="flex justify-center mb-8 relative z-10">
      <img src={aboutImg} alt="About Elevate" className="w-48 h-48 object-contain rounded-2xl shadow-lg animate-fade-in" />
    </div>
    <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">About Elevate</h1>
    <section className="mb-8 animate-fade-in delay-100">
      <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
      <p>
        Elevate aims to revolutionize the job marketplace by empowering users with decentralized identity, transparent ratings, and AI-driven matching. We believe in a fair, open, and user-owned platform that connects talent and opportunity without intermediaries.
      </p>
    </section>
    <section className="mb-8 animate-fade-in delay-200">
      <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>React.js with functional components and hooks</li>
        <li>Redux Toolkit & React Context for state management</li>
        <li>Tailwind CSS with custom themes</li>
        <li>Custom UI components with Headless UI</li>
        <li>React Router v6 for navigation</li>
        <li>@dfinity/agent for ICP blockchain integration</li>
        <li>Internet Identity for authentication</li>
        <li>Jest & React Testing Library for testing</li>
        <li>Vite for fast builds and development</li>
      </ul>
    </section>
    <section className="animate-fade-in delay-300">
      <h2 className="text-xl font-semibold mb-2">What Makes Us Different?</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Decentralized, user-owned identity and credentials</li>
        <li>Blockchain-verified, transparent reviews and ratings</li>
        <li>Smart contract-powered hiring and agreements</li>
        <li>Explainable AI for fair and bias-free job matching</li>
        <li>Community governance and open-source algorithms</li>
        <li>Portable reputation and lower platform fees</li>
      </ul>
    </section>
  </div>
);

export default AboutPage; 