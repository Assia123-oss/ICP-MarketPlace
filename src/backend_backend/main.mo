//import Debug "mo:base/Debug";
//import List "mo:base/List";
import Text "mo:base/Text";
//import Option "mo:base/Option";
import Time "mo:base/Time";
//import Array "mo:base/Array";
import Nat "mo:base/Nat";
//import Nat64 "mo:base/Nat64";
import Int "mo:base/Int";
import Float "mo:base/Float";
import Result "mo:base/Result";
//import Error "mo:base/Error";
//import HashMap "mo:base/HashMap";
//import Iter "mo:base/Iter";

// Import our modules
import Types "./Types";
import User "./User";
import Job "./Job";
import Application "./Application";
import Matching "./Matching";
import Rating "./Rating";
import Contract "./Contract";

actor JobMarketplace {
  // Initialize module managers
  private let userManager = User.UserManager();
  private let jobManager = Job.JobManager();
  private let applicationManager = Application.ApplicationManager();
  private let contractManager = Contract.ContractManager();
  private let matchingEngine = Matching.MatchingEngine();
  private let ratingManager = Rating.RatingManager();

  // Enhanced UUID generator
  private func generateUUID(prefix : Text) : Text {
    let now = Int.toText(Time.now());
    let random = Nat.toText(Int.abs(Time.now()) % 1000000);
    prefix # "-" # now # "-" # random
  };

  // Simple greeting function
  public query func greet() : async Text {
    return "hello junie";
  };

  // ===== User Management =====

  // Register a new user
  public func registerUser(
    name: Text, 
    email: Text, 
    role: Types.Role, 
    portfolio: ?Text,
    bio: ?Text,
    location: ?Text,
    profilePicture: ?Text
  ) : async Result.Result<Types.User, Text> {
    let userId = generateUUID("user");

    switch (userManager.registerUser(
        userId, name, email, role, portfolio, bio, location, profilePicture
      )) {
        case (#ok(user)) { #ok(user) };
        case (#err(error)) {
          switch (error) {
            case (#UserAlreadyExists) { #err("User already exists") };
            case (#InvalidInput) { #err("Invalid input") };
            case _ { #err("Registration failed") };
          }
        }
      }

  };

  // Get a user by ID
  public query func getUser(id: Text) : async ?Types.User {
    switch (userManager.getUser(id)) {
      case (#ok(user)) { ?user };
      case (#err(_)) { null };
    }
  };

  // Update a user
  public func updateUser(
    id: Text, 
    name: Text, 
    email: Text, 
    portfolio: ?Text,
    bio: ?Text,
    location: ?Text,
    profilePicture: ?Text
  ) : async Result.Result<(), Text> {

      switch (userManager.updateUser(
        id, name, email, portfolio, bio, location, profilePicture
      )) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#UserNotFound) { #err("User not found") };
            case (#InvalidInput) { #err("Invalid input") };
            case _ { #err("Update failed") };
          }
        }
      }

  };

  // Add a skill to user
  public func addSkill(userId: Text, name: Text, level: Text) : async Result.Result<(), Text> {

      switch (userManager.addSkill(userId, name, level)) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#UserNotFound) { #err("User not found") };
            case _ { #err("Failed to add skill") };
          }
        }
      }

  };

  // Add experience to user
  public func addExperience(
    userId: Text, 
    title: Text, 
    company: Text, 
    startDate: Time.Time, 
    endDate: ?Time.Time, 
    description: Text
  ) : async Result.Result<(), Text> {

      switch (userManager.addExperience(
        userId, title, company, startDate, endDate, description
      )) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#UserNotFound) { #err("User not found") };
            case _ { #err("Failed to add experience") };
          }
        }
      }

  };

  // Add education to user
  public func addEducation(
    userId: Text, 
    institution: Text, 
    degree: Text, 
    field: Text, 
    startDate: Time.Time, 
    endDate: ?Time.Time
  ) : async Result.Result<(), Text> {

      switch (userManager.addEducation(
        userId, institution, degree, field, startDate, endDate
      )) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#UserNotFound) { #err("User not found") };
            case _ { #err("Failed to add education") };
          }
        }
      }

  };

  // Get all users
  public query func getAllUsers() : async [Types.User] {
    userManager.getAllUsers()
  };

  // Get users by role
  public query func getUsersByRole(role: Types.Role) : async [Types.User] {
    userManager.getUsersByRole(role)
  };

  // ===== Job Management =====

  // Create a new job listing
  public func createJob(
    title: Text,
    company: Text,
    employerId: Text,
    description: Text,
    requirements: [Text],
    jobType: Types.JobType,
    location: ?Text,
    salary: ?Text,
    skills: [Text],
    deadline: ?Time.Time
  ) : async Result.Result<Types.JobListing, Text> {
    let jobId = generateUUID("job");

    switch (jobManager.createJob(
        jobId, title, company, employerId, description, requirements, 
        jobType, location, salary, skills, deadline
      )) {
        case (#ok(job)) { #ok(job) };
        case (#err(error)) {
          switch (error) {
            case (#JobAlreadyExists) { #err("Job already exists") };
            case (#InvalidInput) { #err("Invalid input") };
            case _ { #err("Job creation failed") };
          }
        }
      }

  };

  // Get a job by ID
  public query func getJob(id: Text) : async ?Types.JobListing {
    switch (jobManager.getJob(id)) {
      case (#ok(job)) { ?job };
      case (#err(_)) { null };
    }
  };

  // Update a job listing
  public func updateJob(
    id: Text,
    title: Text,
    company: Text,
    description: Text,
    requirements: [Text],
    jobType: Types.JobType,
    location: ?Text,
    salary: ?Text,
    skills: [Text],
    status: Types.JobStatus,
    deadline: ?Time.Time
  ) : async Result.Result<(), Text> {

      switch (jobManager.updateJob(
        id, title, company, description, requirements, 
        jobType, location, salary, skills, status, deadline
      )) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#JobNotFound) { #err("Job not found") };
            case (#InvalidInput) { #err("Invalid input") };
            case _ { #err("Update failed") };
          }
        }
      }

  };

  // Change job status
  public func changeJobStatus(id: Text, status: Types.JobStatus) : async Result.Result<(), Text> {

      switch (jobManager.changeJobStatus(id, status)) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#JobNotFound) { #err("Job not found") };
            case _ { #err("Status update failed") };
          }
        }
      }

  };

  // Get all jobs
  public query func getAllJobs() : async [Types.JobListing] {
    jobManager.getAllJobs()
  };

  // Get jobs by employer
  public query func getJobsByEmployer(employerId: Text) : async [Types.JobListing] {
    jobManager.getJobsByEmployer(employerId)
  };

  // Get jobs by status
  public query func getJobsByStatus(status: Types.JobStatus) : async [Types.JobListing] {
    jobManager.getJobsByStatus(status)
  };

  // Get jobs by type
  public query func getJobsByType(jobType: Types.JobType) : async [Types.JobListing] {
    jobManager.getJobsByType(jobType)
  };

  // Search jobs by title or description
  public query func searchJobs(searchText: Text) : async [Types.JobListing] {
    jobManager.searchJobs(searchText)
  };

  // Filter jobs by skills
  public query func filterJobsBySkills(requiredSkills: [Text]) : async [Types.JobListing] {
    jobManager.filterJobsBySkills(requiredSkills)
  };

  // ===== Application Management =====

  // Create a new job application
  public func createApplication(
    jobId: Text,
    userId: Text,
    coverLetter: ?Text
  ) : async Result.Result<Types.JobApplication, Text> {
    let applicationId = generateUUID("application");

    switch (applicationManager.createApplication(
        applicationId, jobId, userId, coverLetter
      )) {
        case (#ok(application)) { #ok(application) };
        case (#err(error)) {
          switch (error) {
            case (#ApplicationAlreadyExists) { #err("Already applied for this job") };
            case (#JobNotFound) { #err("Job not found") };
            case (#UserNotFound) { #err("User not found") };
            case _ { #err("Application submission failed") };
          }
        }
      }

  };

  // Get an application by ID
  public query func getApplication(id: Text) : async ?Types.JobApplication {
    switch (applicationManager.getApplication(id)) {
      case (#ok(application)) { ?application };
      case (#err(_)) { null };
    }
  };

  // Update application status
  public func updateApplicationStatus(
    id: Text,
    status: Types.ApplicationStatus
  ) : async Result.Result<(), Text> {

      switch (applicationManager.updateApplicationStatus(id, status)) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#ApplicationNotFound) { #err("Application not found") };
            case _ { #err("Status update failed") };
          }
        }
      }

  };

  // Get applications by job ID
  public query func getApplicationsByJob(jobId: Text) : async [Types.JobApplication] {
    applicationManager.getApplicationsByJob(jobId)
  };

  // Get applications by user ID
  public query func getApplicationsByUser(userId: Text) : async [Types.JobApplication] {
    applicationManager.getApplicationsByUser(userId)
  };

  // Check if user has applied for a job
  public query func hasUserApplied(userId: Text, jobId: Text) : async Bool {
    applicationManager.hasUserApplied(userId, jobId)
  };

  // ===== Matching Engine =====

  // Find matching jobs for a user
  public func findMatchingJobs(userId: Text, minScore: Float) : async Result.Result<[Matching.MatchScore], Text> {

      switch (userManager.getUser(userId)) {
        case (#ok(user)) {
          let jobs = jobManager.getAllJobs();
          let matches = matchingEngine.findMatchingJobs(user, jobs, minScore);
          #ok(matches)
        };
        case (#err(_)) { #err("User not found") };
      }

  };

  // Find matching candidates for a job
  public func findMatchingCandidates(jobId: Text, minScore: Float) : async Result.Result<[Matching.MatchScore], Text> {

      switch (jobManager.getJob(jobId)) {
        case (#ok(job)) {
          let users = userManager.getAllUsers();
          let matches = matchingEngine.findMatchingCandidates(job, users, minScore);
          #ok(matches)
        };
        case (#err(_)) { #err("Job not found") };
      }

  };

  // Find matching jobs with advanced matching
  public func findMatchingJobsAdvanced(userId: Text, minScore: Float) : async Result.Result<[Matching.MatchScore], Text> {

      switch (userManager.getUser(userId)) {
        case (#ok(user)) {
          let jobs = jobManager.getAllJobs();
          let matches = matchingEngine.findMatchingJobsAdvanced(user, jobs, minScore);
          #ok(matches)
        };
        case (#err(_)) { #err("User not found") };
      }

  };

  // ===== Rating System =====

  // Create a new rating
  public func createRating(
    fromUserId: Text,
    toUserId: Text,
    score: Nat,
    comment: ?Text
  ) : async Result.Result<Types.Rating, Text> {
    let ratingId = generateUUID("rating");

    switch (ratingManager.createRating(
        ratingId, fromUserId, toUserId, score, comment
      )) {
        case (#ok(rating)) { #ok(rating) };
        case (#err(error)) {
          switch (error) {
            case (#InvalidRating) { #err("Invalid rating score (1-5)") };
            case (#SelfRatingNotAllowed) { #err("Cannot rate yourself") };
            case (#AlreadyRated) { #err("Already rated this user") };
            case _ { #err("Rating submission failed") };
          }
        }
      }

  };

  // Get ratings received by a user
  public query func getRatingsByUser(userId: Text) : async [Types.Rating] {
    ratingManager.getRatingsByToUser(userId)
  };

  // Calculate average rating for a user
  public query func calculateAverageRating(userId: Text) : async ?Float {
    ratingManager.calculateAverageRating(userId)
  };

  // Get rating distribution for a user
  public query func getRatingDistribution(userId: Text) : async [Nat] {
    ratingManager.getRatingDistribution(userId)
  };

  // Check if a user has already rated another user
  public query func hasUserRated(fromUserId: Text, toUserId: Text) : async Bool {
    ratingManager.hasUserRated(fromUserId, toUserId)
  };

  // ===== Contract Management =====

  // Create a new contract
  public func createContract(
    jobId: Text,
    employerId: Text,
    employeeId: Text,
    terms: Text,
    paymentAmount: Nat,
    startDate: Time.Time
  ) : async Result.Result<Types.Contract, Text> {
    let contractId = generateUUID("contract");

    switch (contractManager.createContract(
        contractId, jobId, employerId, employeeId, terms, paymentAmount, startDate
      )) {
        case (#ok(contract)) { #ok(contract) };
        case (#err(error)) {
          switch (error) {
            case (#InvalidInput) { #err("Invalid input") };
            case _ { #err("Contract creation failed") };
          }
        }
      }

  };

  // Get a contract by ID
  public query func getContract(id: Text) : async ?Types.Contract {
    switch (contractManager.getContract(id)) {
      case (#ok(contract)) { ?contract };
      case (#err(_)) { null };
    }
  };

  // Update contract status
  public func updateContractStatus(
    id: Text,
    status: Types.ContractStatus
  ) : async Result.Result<(), Text> {

      switch (contractManager.updateContractStatus(id, status)) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#ContractNotFound) { #err("Contract not found") };
            case (#InvalidStatus) { #err("Invalid status transition") };
            case _ { #err("Status update failed") };
          }
        }
      }

  };

  // Get contracts by employer
  public query func getContractsByEmployer(employerId: Text) : async [Types.Contract] {
    contractManager.getContractsByEmployer(employerId)
  };

  // Get contracts by employee
  public query func getContractsByEmployee(employeeId: Text) : async [Types.Contract] {
    contractManager.getContractsByEmployee(employeeId)
  };

  // Create a new dispute
  public func createDispute(
    contractId: Text,
    raisedByUserId: Text,
    description: Text
  ) : async Result.Result<Types.Dispute, Text> {
    let disputeId = generateUUID("dispute");

    switch (contractManager.createDispute(
        disputeId, contractId, raisedByUserId, description
      )) {
        case (#ok(dispute)) { #ok(dispute) };
        case (#err(error)) {
          switch (error) {
            case (#ContractNotFound) { #err("Contract not found") };
            case (#Unauthorized) { #err("Not authorized") };
            case _ { #err("Dispute creation failed") };
          }
        }
      }

  };

  // Get a dispute by ID
  public query func getDispute(id: Text) : async ?Types.Dispute {
    switch (contractManager.getDispute(id)) {
      case (#ok(dispute)) { ?dispute };
      case (#err(_)) { null };
    }
  };

  // Update dispute status
  public func updateDisputeStatus(
    id: Text,
    status: Types.DisputeStatus,
    resolution: ?Text
  ) : async Result.Result<(), Text> {

      switch (contractManager.updateDisputeStatus(id, status, resolution)) {
        case (#ok(_)) { #ok() };
        case (#err(error)) {
          switch (error) {
            case (#DisputeNotFound) { #err("Dispute not found") };
            case (#InvalidStatus) { #err("Invalid status transition") };
            case _ { #err("Status update failed") };
          }
        }
      }

  };

  // Get disputes by contract
  public query func getDisputesByContract(contractId: Text) : async [Types.Dispute] {
    contractManager.getDisputesByContract(contractId)
  };

  // Get disputes by user
  public query func getDisputesByUser(userId: Text) : async [Types.Dispute] {
    contractManager.getDisputesByUser(userId)
  };
}
