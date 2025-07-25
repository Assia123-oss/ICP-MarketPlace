import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  SlidersHorizontal,
  Building
} from 'lucide-react';

export const JobListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechFlow Inc.",
      location: "Remote",
      salary: "$120K - $180K",
      type: "Full-time",
      posted: "2 days ago",
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
      description: "We're looking for a senior full stack developer to join our growing team...",
      rating: 4.8,
      employees: "100-500",
      matchScore: 92
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "San Francisco, CA",
      salary: "$140K - $200K",
      type: "Full-time",
      posted: "1 day ago",
      skills: ["Strategy", "Analytics", "Leadership", "Agile", "Product Design"],
      description: "Lead product strategy and drive innovation in our fast-paced startup environment...",
      rating: 4.9,
      employees: "50-100",
      matchScore: 87
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "New York, NY",
      salary: "$90K - $130K",
      type: "Contract",
      posted: "3 days ago",
      skills: ["Figma", "Prototyping", "User Research", "Design Systems", "Interaction Design"],
      description: "Create beautiful and intuitive user experiences for our client projects...",
      rating: 4.7,
      employees: "10-50",
      matchScore: 84
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      salary: "$110K - $160K",
      type: "Full-time",
      posted: "1 week ago",
      skills: ["Kubernetes", "AWS", "Terraform", "Jenkins", "Python"],
      description: "Manage and optimize our cloud infrastructure and deployment processes...",
      rating: 4.6,
      employees: "200-500",
      matchScore: 89
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Analytics Corp",
      location: "Remote",
      salary: "$130K - $190K",
      type: "Full-time",
      posted: "4 days ago",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
      description: "Apply advanced analytics and machine learning to solve complex business problems...",
      rating: 4.8,
      employees: "100-200",
      matchScore: 91
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebCraft Agency",
      location: "Los Angeles, CA",
      salary: "$85K - $120K",
      type: "Full-time",
      posted: "5 days ago",
      skills: ["Vue.js", "JavaScript", "CSS", "Sass", "Webpack"],
      description: "Build responsive and interactive web applications for our diverse client base...",
      rating: 4.5,
      employees: "20-50",
      matchScore: 86
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground">Discover jobs that match your skills and aspirations</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="hero">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                        <SelectItem value="new-york">New York, NY</SelectItem>
                        <SelectItem value="austin">Austin, TX</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any salary" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50k-75k">$50K - $75K</SelectItem>
                        <SelectItem value="75k-100k">$75K - $100K</SelectItem>
                        <SelectItem value="100k-150k">$100K - $150K</SelectItem>
                        <SelectItem value="150k+">$150K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Company Size</Label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox id={size} />
                        <Label htmlFor={size} className="text-sm">{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-muted-foreground">
              Showing <span className="font-medium">{jobs.length}</span> jobs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="text-sm">Sort by:</Label>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date Posted</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <CardDescription className="text-base font-medium text-foreground">
                        {job.company}
                      </CardDescription>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-sm text-muted-foreground">{job.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.matchScore && (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {job.matchScore}% Match
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                    >
                      {savedJobs.includes(job.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-primary" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Job Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {job.type} • {job.posted}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Building className="w-4 h-4 mr-2" />
                      {job.employees} employees
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 4 && (
                      <Badge variant="outline">
                        +{job.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};