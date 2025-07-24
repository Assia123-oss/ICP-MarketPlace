import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Types "./Types";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

module {
  public type Error = {
    #UserNotFound;
    #UserAlreadyExists;
    #InvalidInput;
    #Unauthorized;
    #OperationFailed;
  };

  public type Result<T> = Result.Result<T, Error>;

  public class UserManager() {
    private var users = HashMap.HashMap<Text, Types.User>(0, Text.equal, Text.hash);

    // Enhanced user registration with validation
    public func registerUser(
      id: Text, 
      name: Text, 
      email: Text, 
      role: Types.Role, 
      portfolio: ?Text,
      bio: ?Text,
      location: ?Text,
      profilePicture: ?Text
    ) : Result<Types.User> {
      // Validate email format
      if (not Text.contains(email, #text "@")) {
        return #err(#InvalidInput);
      };

      // Check if user exists
      switch (users.get(id)) {
        case (?_) { #err(#UserAlreadyExists) };
        case null {
          let newUser : Types.User = {
            id = id;
            name = name;
            email = email;
            role = role;
            portfolio = portfolio;
            skills = List.nil<Types.Skill>();
            experiences = List.nil<Types.Experience>();
            education = List.nil<Types.Education>();
            bio = bio;
            location = location;
            profilePicture = profilePicture;
            createdAt = Time.now();
            updatedAt = Time.now();
            verified = false; // Add verification status
          };
          users.put(id, newUser);
          #ok(newUser)
        };
      };
    };

    // Add email verification function
    public func verifyUser(id: Text) : Result<()> {
      switch (users.get(id)) {
        case null { #err(#UserNotFound) };
        case (?user) {
          let updated = { 
            user with 
            verified = true;
            updatedAt = Time.now();
          };
          users.put(id, updated);
          #ok(())
        };
      };
    };

    // Get a user by ID
    public func getUser(id: Text) : Result<Types.User> {
      switch (users.get(id)) {
        case null { #err(#UserNotFound) };
        case (?user) { #ok(user) };
      };
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
    ) : Result<Types.User> {
      switch (users.get(id)) {
        case null {
          #err(#UserNotFound)
        };
        case (?user) {
          let updatedUser : Types.User = {
            id = id;
            name = name;
            email = email;
            role = user.role;
            portfolio = portfolio;
            skills = user.skills;
            experiences = user.experiences;
            education = user.education;
            bio = bio;
            location = location;
            profilePicture = profilePicture;
            createdAt = user.createdAt;
            updatedAt = Time.now();
            verified = user.verified; // Keep verified status
          };
          users.put(id, updatedUser);
          #ok(updatedUser)
        };
      };
    };

    // Delete a user
    public func deleteUser(id: Text) : Result<()> {
      switch (users.get(id)) {
        case null {
          #err(#UserNotFound)
        };
        case (?_) {
          ignore users.remove(id);
          #ok(())
        };
      };
    };

    // Add a skill to user
    public func addSkill(userId: Text, name: Text, level: Text) : Result<Types.User> {
      switch (users.get(userId)) {
        case null {
          #err(#UserNotFound)
        };
        case (?user) {
          let newSkill : Types.Skill = {
            name = name;
            level = level;
          };
          
          let updatedUser : Types.User = {
            id = user.id;
            name = user.name;
            email = user.email;
            role = user.role;
            portfolio = user.portfolio;
            skills = List.push(newSkill, user.skills);
            experiences = user.experiences;
            education = user.education;
            bio = user.bio;
            location = user.location;
            profilePicture = user.profilePicture;
            createdAt = user.createdAt;
            updatedAt = Time.now();
            verified = user.verified; // Keep verified status
          };
          
          users.put(userId, updatedUser);
          #ok(updatedUser)
        };
      };
    };

    // Add experience to user
    public func addExperience(
      userId: Text, 
      title: Text, 
      company: Text, 
      startDate: Time.Time, 
      endDate: ?Time.Time, 
      description: Text
    ) : Result<Types.User> {
      switch (users.get(userId)) {
        case null {
          #err(#UserNotFound)
        };
        case (?user) {
          let newExperience : Types.Experience = {
            title = title;
            company = company;
            startDate = startDate;
            endDate = endDate;
            description = description;
          };
          
          let updatedUser : Types.User = {
            id = user.id;
            name = user.name;
            email = user.email;
            role = user.role;
            portfolio = user.portfolio;
            skills = user.skills;
            experiences = List.push(newExperience, user.experiences);
            education = user.education;
            bio = user.bio;
            location = user.location;
            profilePicture = user.profilePicture;
            createdAt = user.createdAt;
            updatedAt = Time.now();
            verified = user.verified; // Keep verified status
          };
          
          users.put(userId, updatedUser);
          #ok(updatedUser)
        };
      };
    };

    // Add education to user
    public func addEducation(
      userId: Text, 
      institution: Text, 
      degree: Text, 
      field: Text, 
      startDate: Time.Time, 
      endDate: ?Time.Time
    ) : Result<Types.User> {
      switch (users.get(userId)) {
        case null {
          #err(#UserNotFound)
        };
        case (?user) {
          let newEducation : Types.Education = {
            institution = institution;
            degree = degree;
            field = field;
            startDate = startDate;
            endDate = endDate;
          };
          
          let updatedUser : Types.User = {
            id = user.id;
            name = user.name;
            email = user.email;
            role = user.role;
            portfolio = user.portfolio;
            skills = user.skills;
            experiences = user.experiences;
            education = List.push(newEducation, user.education);
            bio = user.bio;
            location = user.location;
            profilePicture = user.profilePicture;
            createdAt = user.createdAt;
            updatedAt = Time.now();
            verified = user.verified; // Keep verified status
          };
          
          users.put(userId, updatedUser);
          #ok(updatedUser)
        };
      };
    };

    // Get all users
    public func getAllUsers() : [Types.User] {
      Iter.toArray(users.vals())
    };

    // Get users by role
    public func getUsersByRole(role: Types.Role) : [Types.User] {
      let filteredUsers = Iter.filter<Types.User>(
        users.vals(),
        func(user: Types.User) : Bool {
          user.role == role
        }
      );
      Iter.toArray(filteredUsers)
    };
  };
}