import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  Brain, 
  Shield, 
  TrendingUp, 
  Star,
  ChevronRight,
  MapPin,
  Clock,
  DollarSign,
  Zap
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional network" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-foreground"> 
                {" "}Hiring is Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Connect directly with talent using AI-powered matching, blockchain verification, 
              and transparent processes. No intermediaries, just results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register?role=jobseeker">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Find Your Dream Job
                </Button>
              </Link>
              <Link to="/register?role=employer">
                <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Hire Top Talent
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-white/80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-white/80">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-white/80">Match Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Elevate?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the modern workforce with cutting-edge technology and user-centric design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our advanced algorithms analyze skills, experience, and preferences to find perfect matches.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Blockchain Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All credentials and reviews are blockchain-verified for maximum trust and transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Real-Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get insights into market trends, salary data, and skill demand to make informed decisions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Direct Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect directly with hiring managers and candidates without platform interference.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-warning" />
                </div>
                <CardTitle>Smart Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automated agreements and payments ensure fair and transparent hiring processes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-info" />
                </div>
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Platform governance and improvements driven by our active community of users.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Opportunities</h2>
              <p className="text-muted-foreground">Discover your next career move</p>
            </div>
            <Link to="/jobs">
              <Button variant="outline">
                View All Jobs
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Senior Full Stack Developer",
                company: "TechFlow Inc.",
                location: "Remote",
                salary: "$120K - $180K",
                type: "Full-time",
                skills: ["React", "Node.js", "TypeScript", "AWS"],
                rating: 4.8
              },
              {
                title: "Product Manager",
                company: "InnovateLabs",
                location: "San Francisco, CA",
                salary: "$140K - $200K", 
                type: "Full-time",
                skills: ["Strategy", "Analytics", "Leadership", "Agile"],
                rating: 4.9
              },
              {
                title: "UX/UI Designer",
                company: "DesignStudio",
                location: "New York, NY",
                salary: "$90K - $130K",
                type: "Contract",
                skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
                rating: 4.7
              }
            ].map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-foreground mt-1">
                        {job.company}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      {job.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {job.type}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals who have found their perfect match on Elevate.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="xl">
              Get Started Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};