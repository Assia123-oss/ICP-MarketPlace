import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechFlow Inc.",
    location: "Remote",
    salary: "$120K - $160K",
    description: "Join our engineering team to build scalable fintech solutions. You'll work on our core payment processing platform and mentor junior developers.",
    skills: ["React", "TypeScript", "Node.js"]
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartupCo",
    location: "San Francisco, CA",
    salary: "$100K - $140K",
    description: "Work on modern web applications and collaborate with a fast-paced team.",
    skills: ["Vue.js", "JavaScript", "CSS"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Digital Agency",
    location: "New York, NY",
    salary: "$110K - $150K",
    description: "Develop full stack solutions for a variety of clients in different industries.",
    skills: ["React", "Python", "AWS"]
  }
];

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === Number(id));

  if (!job) return <div className="max-w-2xl mx-auto py-12 px-4">Job not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        &larr; Go Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.company}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{job.location}</span>
            <span>{job.salary}</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p>{job.description}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <Badge key={idx} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          <Button className="w-full">Apply Now</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailPage; 