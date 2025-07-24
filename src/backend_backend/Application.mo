import Text "mo:base/Text";
import Time "mo:base/Time";
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

  public type Result<T> = Result.Result<T, Error>;
  
  public class ApplicationManager() {
    private var applications = HashMap.HashMap<Text, Types.JobApplication>(
      0,         // Initial capacity
      Text.equal, // Key equality function
      Text.hash   // Key hash function
    );

    // Helper: find application by ID
    public func findApplicationById(id: Text) : ?Types.JobApplication {
      applications.get(id)
    };

    // Create a new job application
    public func createApplication(
      applicationId: Text,
      jobId: Text,
      userId: Text,
      coverLetter: ?Text
    ) : Result<Types.JobApplication> {
      // Check if user already applied using find
      let apps = Iter.toArray(applications.vals());
      let found = Array.find<Types.JobApplication>(apps, func(app) {
        app.userId == userId and app.jobId == jobId
      });
      
      if (found != null) {
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
    public func getApplication(id: Text) : Result<Types.JobApplication> {
      switch (applications.get(id)) {
        case null { #err(#ApplicationNotFound) };
        case (?app) { #ok(app) };
      };
    };

    // Update application status
    public func updateApplicationStatus(
      id: Text,
      status: Types.ApplicationStatus
    ) : Result<Types.JobApplication> {
      switch (applications.get(id)) {
        case null { #err(#ApplicationNotFound) };
        case (?app) {
          let updated = {
            app with
            status = status;
            updatedAt = Time.now();
          };
          applications.put(id, updated);
          #ok(updated)
        };
      };
    };

    // Update application cover letter
    public func updateCoverLetter(
      id: Text,
      coverLetter: ?Text
    ) : Result<Types.JobApplication> {
      switch (applications.get(id)) {
        case null { #err(#ApplicationNotFound) };
        case (?app) {
          let updated = {
            app with
            coverLetter = coverLetter;
            updatedAt = Time.now();
          };
          applications.put(id, updated);
          #ok(updated)
        };
      };
    };

    // Delete an application
    public func deleteApplication(id: Text) : Result<()> {
      switch (applications.remove(id)) {
        case null { #err(#ApplicationNotFound) };
        case (?_) { #ok(()) };
      };
    };

    // Get all applications
    public func getAllApplications() : [Types.JobApplication] {
      Iter.toArray(applications.vals())
    };

    // Get applications by job ID
    public func getApplicationsByJob(jobId: Text) : [Types.JobApplication] {
      Array.filter<Types.JobApplication>(
        Iter.toArray(applications.vals()),
        func(app) { app.jobId == jobId }
      )
    };

    // Get applications by user ID
    public func getApplicationsByUser(userId: Text) : [Types.JobApplication] {
      Array.filter<Types.JobApplication>(
        Iter.toArray(applications.vals()),
        func(app) { app.userId == userId }
      )
    };

    // Get applications by status
    public func getApplicationsByStatus(status: Types.ApplicationStatus) : [Types.JobApplication] {
      Array.filter<Types.JobApplication>(
        Iter.toArray(applications.vals()),
        func(app) { app.status == status }
      )
    };

    // Check if user has applied for a job (using Array.find)
    public func hasUserApplied(userId: Text, jobId: Text) : Bool {
      Option.isSome(
        Array.find<Types.JobApplication>(
          Iter.toArray(applications.vals()),
          func(app) { app.userId == userId and app.jobId == jobId }
        )
      )
    };

    // Get recent applications
    public func getRecentApplications(timeWindow: Time.Time) : [Types.JobApplication] {
      let now = Time.now();
      Array.filter<Types.JobApplication>(
        Iter.toArray(applications.vals()),
        func(app) { app.createdAt >= (now - timeWindow) }
      )
    };
  };
}