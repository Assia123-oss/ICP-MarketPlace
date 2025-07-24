import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Types "./Types";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";

module {
  public type Error = {
    #RatingNotFound;
    #UserNotFound;
    #InvalidRating;
    #AlreadyRated;
    #SelfRatingNotAllowed;
    #Unauthorized;
    #OperationFailed;
  };

  public class RatingManager() {
    // Stable storage for ratings
    private var ratings = HashMap.HashMap<Text, Types.Rating>(0, Text.equal, Text.hash);

    // Helper: find rating by ID
    public func findRatingById(id: Text) : ?Types.Rating {
      ratings.get(id)
    };

    // Helper: remove rating by ID
    private func removeRatingById(id: Text) : () {
      ignore ratings.remove(id)
    };

    // Create a new rating
    public func createRating(
      id: Text,
      fromUserId: Text,
      toUserId: Text,
      score: Nat,
      comment: ?Text
    ) : Result.Result<Types.Rating, Error> {
      // Validate rating score (1-5)
      if (score < 1 or score > 5) {
        return #err(#InvalidRating);
      };
      
      // Prevent self-rating
      if (fromUserId == toUserId) {
        return #err(#SelfRatingNotAllowed);
      };
      
      // Check if user has already rated this user
      let existingRating = ratings.get(fromUserId # "-" # toUserId);
      
      switch (existingRating) {
        case (?_) {
          #err(#AlreadyRated)
        };
        case null {
          let now = Time.now();
          let newRating : Types.Rating = {
            id = id;
            fromUserId = fromUserId;
            toUserId = toUserId;
            score = score;
            comment = comment;
            createdAt = now;
          };
          ratings.put(id, newRating);
          #ok(newRating)
        };
      }
    };

    // Get a rating by ID
    public func getRating(id: Text) : Result.Result<Types.Rating, Error> {
      switch (findRatingById(id)) {
        case null { #err(#RatingNotFound) };
        case (?rating) { #ok(rating) };
      };
    };

    // Update a rating
    public func updateRating(
      id: Text,
      score: Nat,
      comment: ?Text
    ) : Result.Result<Types.Rating, Error> {
      // Validate rating score (1-5)
      if (score < 1 or score > 5) {
        return #err(#InvalidRating);
      };
      
      switch (findRatingById(id)) {
        case null {
          #err(#RatingNotFound)
        };
        case (?rating) {
          let updatedRating : Types.Rating = {
            id = id;
            fromUserId = rating.fromUserId;
            toUserId = rating.toUserId;
            score = score;
            comment = comment;
            createdAt = rating.createdAt;
          };
          ratings.put(id, updatedRating);
          #ok(updatedRating)
        };
      };
    };

    // Delete a rating
    public func deleteRating(id: Text) : Result.Result<(), Error> {
      switch (findRatingById(id)) {
        case null {
          #err(#RatingNotFound)
        };
        case (?_) {
          removeRatingById(id);
          #ok(())
        };
      };
    };

    // Get all ratings
    public func getAllRatings() : [Types.Rating] {
      Iter.toArray(ratings.vals())
    };

    // Get ratings given by a user
    public func getRatingsByFromUser(userId: Text) : [Types.Rating] {
      let filteredRatings = Iter.filter<Types.Rating>(
        ratings.vals(),
        func(rating: Types.Rating) : Bool {
          rating.fromUserId == userId
        }
      );
      Iter.toArray(filteredRatings)
    };

    // Get ratings received by a user
    public func getRatingsByToUser(userId: Text) : [Types.Rating] {
      let filteredRatings = Iter.filter<Types.Rating>(
        ratings.vals(),
        func(rating: Types.Rating) : Bool {
          rating.toUserId == userId
        }
      );
      Iter.toArray(filteredRatings)
    };

    // Calculate average rating for a user
    public func calculateAverageRating(userId: Text) : ?Float {
      let userRatings = getRatingsByToUser(userId);
      
      if (userRatings.size() == 0) {
        return null;
      };
      
      var sum : Nat = 0;
      for (rating in userRatings.vals()) {
        sum += rating.score;
      };
      
      let average : Float = Float.fromInt(sum) / Float.fromInt(userRatings.size());
      ?average
    };

    // Get rating distribution for a user (count of 1-5 star ratings)
    public func getRatingDistribution(userId: Text) : [Nat] {
      let userRatings = getRatingsByToUser(userId);
      var distribution : [var Nat] = [var 0, 0, 0, 0, 0]; // Index 0 = 1 star, Index 4 = 5 star
      
      for (rating in userRatings.vals()) {
        let index = rating.score - 1; // Convert 1-5 to 0-4
        distribution[index] := distribution[index] + 1;
      };
      
      Array.freeze<Nat>(distribution)
    };

    // Check if a user has already rated another user
    public func hasUserRated(fromUserId: Text, toUserId: Text) : Bool {
      let existingRating = ratings.get(fromUserId # "-" # toUserId);
      
      switch (existingRating) {
        case (?_) { true };
        case null { false };
      }
    };

    // Get recent ratings (ratings created within the last n nanoseconds)
    public func getRecentRatings(timeWindow: Time.Time) : [Types.Rating] {
      let now = Time.now();
      let cutoffTime = now - timeWindow;
      
      let filteredRatings = Iter.filter<Types.Rating>(
        ratings.vals(),
        func(rating: Types.Rating) : Bool {
          rating.createdAt >= cutoffTime
        }
      );
      Iter.toArray(filteredRatings)
    };
  };
}