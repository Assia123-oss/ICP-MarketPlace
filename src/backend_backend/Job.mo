import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Types "./Types";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

module {
  public type Error = {
    #JobNotFound;
    #InvalidInput;
    #Unauthorized;
    #OperationFailed;
  };

  public type Result<T> = Result.Result<T, Error>;

  public class JobManager() {
    private var jobs = HashMap.HashMap<Text, Types.JobListing>(0, Text.equal, Text.hash);

    // Helper: find job by ID
    public func findJobById(id: Text) : ?Types.JobListing {
      jobs.get(id)
    };

    // Helper: remove job by ID
    private func removeJobById(id: Text) : () {
      ignore jobs.remove(id)
    };

    // Add job validation
    public func createJob(
      id: Text,
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
    ) : Result<Types.JobListing> {
      if (Text.size(title) < 5) {
        return #err(#InvalidInput);
      };

      let newJob : Types.JobListing = {
        id = id;
        title = title;
        company = company;
        employerId = employerId;
        description = description;
        requirements = List.fromArray<Text>(requirements);
        jobType = jobType;
        location = location;
        salary = salary;
        skills = List.fromArray<Text>(skills);
        status = #Open;
        createdAt = Time.now();
        updatedAt = Time.now();
        deadline = deadline;
        applications = List.nil();
      };
      jobs.put(id, newJob);
      #ok(newJob)
    };

    // Add job closing function
    public func closeJob(id: Text) : Result<()> {
      switch (jobs.get(id)) {
        case null { #err(#JobNotFound) };
        case (?job) {
          let updated = { job with status = #Closed };
          jobs.put(id, updated);
          #ok(())
        };
      };
    };

    // Get a job by ID
    public func getJob(id: Text) : Result<Types.JobListing> {
      switch (findJobById(id)) {
        case null { #err(#JobNotFound) };
        case (?job) { #ok(job) };
      };
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
    ) : Result<Types.JobListing> {
      switch (findJobById(id)) {
        case null {
          #err(#JobNotFound)
        };
        case (?job) {
          let updatedJob : Types.JobListing = {
            id = id;
            title = title;
            company = company;
            employerId = job.employerId;
            description = description;
            requirements = List.fromArray<Text>(requirements);
            jobType = jobType;
            location = location;
            salary = salary;
            skills = List.fromArray<Text>(skills);
            status = status;
            createdAt = job.createdAt;
            updatedAt = Time.now();
            deadline = deadline;
            applications = job.applications;
          };
          jobs.put(id, updatedJob);
          #ok(updatedJob)
        };
      };
    };

    // Delete a job
    public func deleteJob(id: Text) : Result<()> {
      switch (findJobById(id)) {
        case null {
          #err(#JobNotFound)
        };
        case (?_) {
          removeJobById(id);
          #ok(())
        };
      };
    };

    // Change job status
    public func changeJobStatus(id: Text, status: Types.JobStatus) : Result<Types.JobListing> {
      switch (findJobById(id)) {
        case null {
          #err(#JobNotFound)
        };
        case (?job) {
          let updatedJob : Types.JobListing = {
            id = job.id;
            title = job.title;
            company = job.company;
            employerId = job.employerId;
            description = job.description;
            requirements = job.requirements;
            jobType = job.jobType;
            location = job.location;
            salary = job.salary;
            skills = job.skills;
            status = status;
            createdAt = job.createdAt;
            updatedAt = Time.now();
            deadline = job.deadline;
            applications = job.applications;
          };
          jobs.put(id, updatedJob);
          #ok(updatedJob)
        };
      };
    };

    // Get all jobs
    public func getAllJobs() : [Types.JobListing] {
      Iter.toArray(jobs.vals())
    };

    // Get jobs by employer
    public func getJobsByEmployer(employerId: Text) : [Types.JobListing] {
      let filteredJobs = Iter.filter<Types.JobListing>(
        jobs.vals(),
        func(job) { job.employerId == employerId }
      );
      Iter.toArray(filteredJobs)
    };

    // Get jobs by status
    public func getJobsByStatus(status: Types.JobStatus) : [Types.JobListing] {
      let filteredJobs = Iter.filter<Types.JobListing>(
        jobs.vals(),
        func(job) { job.status == status }
      );
      Iter.toArray(filteredJobs)
    };

    // Get jobs by type
    public func getJobsByType(jobType: Types.JobType) : [Types.JobListing] {
      let filteredJobs = Iter.filter<Types.JobListing>(
        jobs.vals(),
        func(job) { job.jobType == jobType }
      );
      Iter.toArray(filteredJobs)
    };

    // Search jobs by title or description
    public func searchJobs(searchQuery: Text) : [Types.JobListing] {
      let queryLower = Text.toLowercase(searchQuery);
      let filteredJobs = Iter.filter<Types.JobListing>(
        jobs.vals(),
        func(job) {
          let titleLower = Text.toLowercase(job.title);
          let descLower = Text.toLowercase(job.description);
          Text.contains(titleLower, #text queryLower) or Text.contains(descLower, #text queryLower)
        }
      );
      Iter.toArray(filteredJobs)
    };

    // Filter jobs by skills
    public func filterJobsBySkills(requiredSkills: [Text]) : [Types.JobListing] {
      let filteredJobs = Iter.filter<Types.JobListing>(
        jobs.vals(),
        func(job) {
          let jobSkills = List.toArray(job.skills);
          for (requiredSkill in requiredSkills.vals()) {
            for (jobSkill in jobSkills.vals()) {
              if (Text.toLowercase(requiredSkill) == Text.toLowercase(jobSkill)) {
                return true;
              };
            };
          };
          false
        }
      );
      Iter.toArray(filteredJobs)
    };

    // Get recent jobs (jobs created within the last n nanoseconds)
    public func getRecentJobs(timeWindow: Time.Time) : [Types.JobListing] {
      let now = Time.now();
      let cutoffTime = now - timeWindow;
      let filteredJobs = Iter.filter<Types.JobListing>(
        jobs.vals(),
        func(job) { job.createdAt >= cutoffTime }
      );
      Iter.toArray(filteredJobs)
    };
  };
}