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
    #ApplicationNotFound; 
    #ApplicationAlreadyExists;
    #JobNotFound;
    #UserNotFound;
    #InvalidInput;
    #Unauthorized;
    #OperationFailed;
  };

  public type AppResult<T> = Result.Result<T, Error>;
  
  public class ApplicationManager() {
    private var applications = HashMap.HashMap<Text, Types.JobApplication>(0, Text.equal, Text.hash);

    // Helper: find application by ID
    public func findApplicationById(id: Text) : ?Types.JobApplication {
      applications.get(id)
    };

    // Add application validation
    public func createApplication(
      applicationId: Text,
      jobId: Text,
      userId: Text,
      coverLetter: ?Text
    ) : AppResult<Types.JobApplication> {
      let userApplications = getApplicationsByUser(userId);
      if (Array.find<Types.JobApplication>(userApplications, func(app) { app.jobId == jobId }) != null) {
        return #err(#ApplicationAlreadyExists);
      };

      let newApplication : Types.JobApplication = {
        id = applicationId;
        jobId = jobId;
        userId = userId;
        coverLetter = coverLetter;
        status = #Submitted;
        createdAt = Time.now();
        updatedAt = Time.now();
      };
      
      applications.put(applicationId, newApplication);
      #ok(newApplication)
    };

    // Get an application by ID
    public func getApplication(id: Text) : AppResult<Types.JobApplication> {
      switch (findApplicationById(id)) {
        case null { #err(#ApplicationNotFound) };
        case (?application) { #ok(application) };
      };
    };

    // Update application status
    public func updateApplicationStatus(
      id: Text,
      status: Types.ApplicationStatus
    ) : AppResult<Types.JobApplication> {
      switch (findApplicationById(id)) {
        case null {
          #err(#ApplicationNotFound)
        };
        case (?application) {
          let updatedApplication : Types.JobApplication = {
            id = application.id;
            jobId = application.jobId;
            userId = application.userId;
            coverLetter = application.coverLetter;
            status = status;
            createdAt = application.createdAt;
            updatedAt = Time.now();
          };
          applications.put(id, updatedApplication);
          #ok(updatedApplication)
        };
      };
    };

    // Update application cover letter
    public func updateCoverLetter(
      id: Text,
      coverLetter: ?Text
    ) : AppResult<Types.JobApplication> {
      switch (findApplicationById(id)) {
        case null {
          #err(#ApplicationNotFound)
        };
        case (?application) {
          let updatedApplication : Types.JobApplication = {
            id = application.id;
            jobId = application.jobId;
            userId = application.userId;
            coverLetter = coverLetter;
            status = application.status;
            createdAt = application.createdAt;
            updatedAt = Time.now();
          };
          applications.put(id, updatedApplication);
          #ok(updatedApplication)
        };
      };
    };

    // Delete an application
    public func deleteApplication(id: Text) : AppResult<()> {
      switch (findApplicationById(id)) {
        case null {
          #err(#ApplicationNotFound)
        };
        case (?_) {
          ignore applications.remove(id);
          #ok(())
        };
      };
    };

    // Get all applications
    public func getAllApplications() : [Types.JobApplication] {
      Iter.toArray(applications.vals())
    };

    // Get applications by job ID
    public func getApplicationsByJob(jobId: Text) : [Types.JobApplication] {
      let filtered = Iter.filter<Types.JobApplication>(
        applications.vals(),
        func(app) { app.jobId == jobId }
      );
      Iter.toArray(filtered)
    };

    // Get applications by user ID
    public func getApplicationsByUser(userId: Text) : [Types.JobApplication] {
      let filtered = Iter.filter<Types.JobApplication>(
        applications.vals(),
        func(app) { app.userId == userId }
      );
      Iter.toArray(filtered)
    };

    // Get applications by status
    public func getApplicationsByStatus(status: Types.ApplicationStatus) : [Types.JobApplication] {
      let filtered = Iter.filter<Types.JobApplication>(
        applications.vals(),
        func(app) { app.status == status }
      );
      Iter.toArray(filtered)
    };

    // Check if user has applied for a job
    public func hasUserApplied(userId: Text, jobId: Text) : Bool {
      let existingApplication = Array.find<Types.JobApplication>(
        getApplicationsByUser(userId), 
        func(app: Types.JobApplication) : Bool {
          app.jobId == jobId
        }
      );
      
      switch (existingApplication) {
        case (?_) { true };
        case null { false };
      }
    };

    // Get recent applications (applications created within the last n nanoseconds)
    public func getRecentApplications(timeWindow: Time.Time) : [Types.JobApplication] {
      let now = Time.now();
      let cutoffTime = now - timeWindow;
      let filtered = Iter.filter<Types.JobApplication>(
        applications.vals(),
        func(app) { app.createdAt >= cutoffTime }
      );
      Iter.toArray(filtered)
    };
  };
}