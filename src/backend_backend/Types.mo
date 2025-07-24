import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";

module {
  // User related types
  public type Role = {
    #JobSeeker;
    #Employer;
  };

  public type Skill = {
    name: Text;
    level: Text; // e.g., "Beginner", "Intermediate", "Expert"
  };

  public type Experience = {
    title: Text;
    company: Text;
    startDate: Time.Time;
    endDate: ?Time.Time; // Optional for current positions
    description: Text;
  };

  public type Education = {
    institution: Text;
    degree: Text;
    field: Text;
    startDate: Time.Time;
    endDate: ?Time.Time;
  };

  public type User = {
    id: Text;
    name: Text;
    email: Text;
    role: Role;
    portfolio: ?Text; // Optional field
    skills: List.List<Skill>;
    experiences: List.List<Experience>;
    education: List.List<Education>;
    bio: ?Text;
    location: ?Text;
    profilePicture: ?Text; // URL or asset ID
    createdAt: Time.Time;
    updatedAt: Time.Time;
  };

  // Job related types
  public type JobType = {
    #FullTime;
    #PartTime;
    #Contract;
    #Freelance;
    #Internship;
  };

  public type JobStatus = {
    #Open;
    #Closed;
    #Filled;
  };

  public type JobListing = {
    id: Text;
    title: Text;
    company: Text;
    employerId: Text;
    description: Text;
    requirements: List.List<Text>;
    jobType: JobType;
    location: ?Text; // Optional for remote jobs
    salary: ?Text; // Optional
    skills: List.List<Text>;
    status: JobStatus;
    createdAt: Time.Time;
    updatedAt: Time.Time;
    deadline: ?Time.Time;
  };

  // Application related types
  public type ApplicationStatus = {
    #Submitted;
    #Reviewing;
    #Shortlisted;
    #Rejected;
    #Accepted;
  };

  public type JobApplication = {
    id: Text;
    jobId: Text;
    userId: Text;
    coverLetter: ?Text;
    status: ApplicationStatus;
    createdAt: Time.Time;
    updatedAt: Time.Time;
  };

  // Rating related types
  public type Rating = {
    id: Text;
    fromUserId: Text;
    toUserId: Text;
    score: Nat; // 1-5
    comment: ?Text;
    createdAt: Time.Time;
  };

  // Contract related types
  public type ContractStatus = {
    #Draft;
    #Pending;
    #Active;
    #Completed;
    #Cancelled;
    #Disputed;
  };

  public type Contract = {
    id: Text;
    jobId: Text;
    employerId: Text;
    employeeId: Text;
    terms: Text;
    paymentAmount: Nat;
    startDate: Time.Time;
    endDate: ?Time.Time;
    status: ContractStatus;
    createdAt: Time.Time;
    updatedAt: Time.Time;
  };

  // Dispute related types
  public type DisputeStatus = {
    #Open;
    #UnderReview;
    #Resolved;
    #Closed;
  };

  public type Dispute = {
    id: Text;
    contractId: Text;
    raisedByUserId: Text;
    description: Text;
    status: DisputeStatus;
    resolution: ?Text;
    createdAt: Time.Time;
    updatedAt: Time.Time;
  };
}