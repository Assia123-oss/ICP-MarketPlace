import Text "mo:base/Text";
import List "mo:base/List";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Types "./Types";
import Result "mo:base/Result";

module {
  // Adjust weights for match factors (no education weight)
  private let SKILL_WEIGHT = 0.7;
  private let EXPERIENCE_WEIGHT = 0.3;

  public type Error = {
    #UserNotFound;
    #JobNotFound;
    #NoMatchesFound;
    #OperationFailed;
  };

  public type Result<T> = Result.Result<T, Error>;

  // Match score type
  public type MatchScore = {
    jobId: Text;
    userId: Text;
    score: Float;
    matchedSkills: [Text];
  };

  public class MatchingEngine() {
    // Enhanced matching algorithm
    public func calculateMatchScore(
      user: Types.User,
      job: Types.JobListing
    ) : MatchScore {
      let skillScore = calculateSkillMatch(user, job) * SKILL_WEIGHT;
      let expScore = calculateExperienceMatch(user, job) * EXPERIENCE_WEIGHT;
      
      let totalScore = skillScore + expScore;
      
      {
        jobId = job.id;
        userId = user.id;
        score = totalScore;
        matchedSkills = getMatchedSkills(user, job);
      }
    };

    // Add helper functions
    private func calculateSkillMatch(user: Types.User, job: Types.JobListing) : Float {
      // Extract user skills
      let userSkills = List.toArray(user.skills);
      let userSkillNames = Array.map<Types.Skill, Text>(
        userSkills,
        func(skill: Types.Skill) : Text {
          Text.toLowercase(skill.name)
        }
      );

      // Extract job skills
      let jobSkills = List.toArray(job.skills);
      let jobSkillNames = Array.map<Text, Text>(
        jobSkills,
        func(skill: Text) : Text {
          Text.toLowercase(skill)
        }
      );

      // Find matching skills
      var matchedSkills : [Text] = [];
      for (userSkill in userSkillNames.vals()) {
        for (jobSkill in jobSkillNames.vals()) {
          if ( userSkill == jobSkill) {
            matchedSkills := Array.append<Text>(matchedSkills, [jobSkill]);
          };
        };
      };

      // Calculate score based on percentage of matched skills
      let matchedSkillCount = matchedSkills.size();
      let jobSkillCount = jobSkills.size();

      let score : Float = if (jobSkillCount == 0) {
        0.0
      } else {
        Float.fromInt(matchedSkillCount) / Float.fromInt(jobSkillCount)
      };
      return score;
    };

    private func calculateExperienceMatch(user: Types.User, job: Types.JobListing) : Float {
      // Calculate based on years of relevant experience
      let experiences = List.toArray(user.experiences);
      var experienceBonus : Float = 0.0;

      for (exp in experiences.vals()) {
        // Check if experience title or company matches job title or company
        let titleMatch = Text.contains(
          Text.toLowercase(exp.title), 
          #text(Text.toLowercase(job.title))
        );

        let companyMatch = Text.contains(
          Text.toLowercase(exp.company), 
          #text(Text.toLowercase(job.company))
        );

        if (titleMatch or companyMatch) {
          experienceBonus += 0.1; // Add 10% bonus for relevant experience
        };
      };

      // Cap the experience bonus at 0.3 (30%)
      if (experienceBonus > 0.3) {
        experienceBonus := 0.3;
      };
      return experienceBonus;
    };

    private func getMatchedSkills(user: Types.User, job: Types.JobListing) : [Text] {
      let userSkills = List.toArray(user.skills);
      let userSkillNames = Array.map<Types.Skill, Text>(
        userSkills,
        func(skill: Types.Skill) : Text {
          Text.toLowercase(skill.name)
        }
      );

      let jobSkills = List.toArray(job.skills);
      let jobSkillNames = Array.map<Text, Text>(
        jobSkills,
        func(skill: Text) : Text {
          Text.toLowercase(skill)
        }
      );

      var matchedSkills : [Text] = [];
      for (userSkill in userSkillNames.vals()) {
        for (jobSkill in jobSkillNames.vals()) {
          if (userSkill == jobSkill) {
            matchedSkills := Array.append<Text>(matchedSkills, [jobSkill]);
          };
        };
      };
      return matchedSkills;
    };

    // Find matching jobs for a user
    public func findMatchingJobs(
      user: Types.User,
      jobs: [Types.JobListing],
      minScore: Float
    ) : [MatchScore] {
      // Calculate match scores for all jobs
      let scores = Array.map<Types.JobListing, MatchScore>(
        jobs,
        func(job: Types.JobListing) : MatchScore {
          calculateMatchScore(user, job)
        }
      );

      // Filter jobs by minimum score
      Array.filter<MatchScore>(
        scores,
        func(match: MatchScore) : Bool {
          match.score >= minScore
        }
      )
    };

    // Find matching candidates for a job
    public func findMatchingCandidates(
      job: Types.JobListing,
      users: [Types.User],
      minScore: Float
    ) : [MatchScore] {
      // Filter users to only include job seekers
      let jobSeekers = Array.filter<Types.User>(
        users,
        func(user: Types.User) : Bool {
          user.role == #JobSeeker
        }
      );

      // Calculate match scores for all job seekers
      let scores = Array.map<Types.User, MatchScore>(
        jobSeekers,
        func(user: Types.User) : MatchScore {
          calculateMatchScore(user, job)
        }
      );

      // Filter candidates by minimum score
      Array.filter<MatchScore>(
        scores,
        func(match: MatchScore) : Bool {
          match.score >= minScore
        }
      )
    };

    // Sort matches by score (descending)
    public func sortMatchesByScore(matches: [MatchScore]) : [MatchScore] {
      Array.sort<MatchScore>(
        matches,
        func(a: MatchScore, b: MatchScore) : {#less; #equal; #greater} {
          if (a.score > b.score) {
            #less
          } else if (a.score < b.score) {
            #greater
          } else {
            #equal
          }
        }
      )
    };

    // Get top N matches
    public func getTopMatches(matches: [MatchScore], n: Nat) : [MatchScore] {
      let sortedMatches = sortMatchesByScore(matches);
      let count = Nat.min(n, sortedMatches.size());

      Array.tabulate<MatchScore>(
        count,
        func(i: Nat) : MatchScore {
          sortedMatches[i]
        }
      )
    };

    // Advanced matching that considers experience
    public func advancedMatching(
      user: Types.User,
      job: Types.JobListing
    ) : MatchScore {
      // Start with basic skill matching
      let basicMatch = calculateMatchScore(user, job);

      // Additional factors to consider:
      // 1. Experience in the same field/company
      let experiences = List.toArray(user.experiences);
      var experienceBonus : Float = 0.0;

      for (exp in experiences.vals()) {
        // Check if experience title or company matches job title or company
        let titleMatch = Text.contains(
          Text.toLowercase(exp.title), 
          #text(Text.toLowercase(job.title))
        );

        let companyMatch = Text.contains(
          Text.toLowercase(exp.company), 
          #text(Text.toLowercase(job.company))
        );

        if (titleMatch or companyMatch) {
          experienceBonus += 0.1; // Add 10% bonus for relevant experience
        };
      };

      // Cap the experience bonus at 0.3 (30%)
      if (experienceBonus > 0.3) {
        experienceBonus := 0.3;
      };

      // Calculate final score with bonuses
      let finalScore = Float.min(1.0, basicMatch.score + experienceBonus);

      {
        jobId = basicMatch.jobId;
        userId = basicMatch.userId;
        score = finalScore;
        matchedSkills = basicMatch.matchedSkills;
      }
    };

    // Find matching jobs with advanced matching
    public func findMatchingJobsAdvanced(
      user: Types.User,
      jobs: [Types.JobListing],
      minScore: Float
    ) : [MatchScore] {
      // Calculate match scores for all jobs using advanced matching
      let scores = Array.map<Types.JobListing, MatchScore>(
        jobs,
        func(job: Types.JobListing) : MatchScore {
          advancedMatching(user, job)
        }
      );

      // Filter jobs by minimum score
      Array.filter<MatchScore>(
        scores,
        func(match: MatchScore) : Bool {
          match.score >= minScore
        }
      )
    };
  };
}