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
import HashMap "mo:base/HashMap";

module {
  public type Error = {
    #ContractNotFound;
    #DisputeNotFound;
    #UserNotFound;
    #JobNotFound;
    #InvalidInput;
    #Unauthorized;
    #InvalidStatus;
    #InsufficientFunds;
    #OperationFailed;
  };

  public type Result<T> = Result.Result<T, Error>;
  
  public class ContractManager() {
    private var contracts = HashMap.HashMap<Text, Types.Contract>(0, Text.equal, Text.hash);
    private var disputes = HashMap.HashMap<Text, Types.Dispute>(0, Text.equal, Text.hash);

    // Add payment processing
    public func processPayment(
      contractId: Text,
      amount: Nat
    ) : Result<()> {
      switch (contracts.get(contractId)) {
        case null { #err(#ContractNotFound) };
        case (?contract) {
          if (contract.status != #Active) {
            return #err(#InvalidStatus);
          };
          if (amount > contract.paymentAmount) {
            return #err(#InsufficientFunds);
          };
          // Here you would integrate with actual payment processing
          #ok(())
        };
      };
    };

    // Helper: find contract by ID
    public func findContractById(id: Text) : ?Types.Contract {
      contracts.get(id)
    };

    // Helper: remove contract by ID
    private func removeContractById(id: Text) : HashMap.HashMap<Text, Types.Contract> {
      HashMap.delete(contracts, id)
    };

    // Helper: find dispute by ID
    public func findDisputeById(id: Text) : ?Types.Dispute {
      disputes.get(id)
    };

    // Helper: remove dispute by ID
    private func removeDisputeById(id: Text) : HashMap.HashMap<Text, Types.Dispute> {
      HashMap.delete(disputes, id)
    };

    // Create a new contract
    public func createContract(
      id: Text,
      jobId: Text,
      employerId: Text,
      employeeId: Text,
      terms: Text,
      paymentAmount: Nat,
      startDate: Time.Time
    ) : Result<Types.Contract> {
      switch (findContractById(id)) {
        case (?_) {
          #err(#InvalidInput)
        };
        case null {
          let now = Time.now();
          let newContract : Types.Contract = {
            id = id;
            jobId = jobId;
            employerId = employerId;
            employeeId = employeeId;
            terms = terms;
            paymentAmount = paymentAmount;
            startDate = startDate;
            endDate = null;
            status = #Draft;
            createdAt = now;
            updatedAt = now;
          };
          contracts := HashMap.put(contracts, id, newContract);
          #ok(newContract)
        };
      };
    };

    // Get a contract by ID
    public func getContract(id: Text) : Result<Types.Contract> {
      switch (findContractById(id)) {
        case null { #err(#ContractNotFound) };
        case (?contract) { #ok(contract) };
      };
    };

    // Update contract terms
    public func updateContractTerms(
      id: Text,
      terms: Text,
      paymentAmount: Nat
    ) : Result<Types.Contract> {
      switch (findContractById(id)) {
        case null {
          #err(#ContractNotFound)
        };
        case (?contract) {
          // Can only update if contract is in Draft or Pending status
          if (contract.status != #Draft and contract.status != #Pending) {
            return #err(#InvalidStatus);
          };
          
          let updatedContract : Types.Contract = {
            id = contract.id;
            jobId = contract.jobId;
            employerId = contract.employerId;
            employeeId = contract.employeeId;
            terms = terms;
            paymentAmount = paymentAmount;
            startDate = contract.startDate;
            endDate = contract.endDate;
            status = contract.status;
            createdAt = contract.createdAt;
            updatedAt = Time.now();
          };
          contracts := HashMap.put(contracts, id, updatedContract);
          #ok(updatedContract)
        };
      };
    };

    // Update contract status
    public func updateContractStatus(
      id: Text,
      status: Types.ContractStatus
    ) : Result<Types.Contract> {
      switch (findContractById(id)) {
        case null {
          #err(#ContractNotFound)
        };
        case (?contract) {
          // Validate status transitions
          switch (contract.status, status) {
            // Valid transitions
            case (#Draft, #Pending) {};
            case (#Pending, #Active) {};
            case (#Active, #Completed) {};
            case (#Active, #Cancelled) {};
            case (#Active, #Disputed) {};
            case (#Disputed, #Completed) {};
            case (#Disputed, #Cancelled) {};
            // Invalid transitions
            case _ {
              return #err(#InvalidStatus);
            };
          };
          
          let now = Time.now();
          let endDate = if (status == #Completed or status == #Cancelled) {
            ?now
          } else {
            contract.endDate
          };
          
          let updatedContract : Types.Contract = {
            id = contract.id;
            jobId = contract.jobId;
            employerId = contract.employerId;
            employeeId = contract.employeeId;
            terms = contract.terms;
            paymentAmount = contract.paymentAmount;
            startDate = contract.startDate;
            endDate = endDate;
            status = status;
            createdAt = contract.createdAt;
            updatedAt = now;
          };
          contracts := HashMap.put(contracts, id, updatedContract);
          #ok(updatedContract)
        };
      };
    };

    // Delete a contract (only if in Draft status)
    public func deleteContract(id: Text) : Result<()> {
      switch (findContractById(id)) {
        case null {
          #err(#ContractNotFound)
        };
        case (?contract) {
          if (contract.status != #Draft) {
            return #err(#InvalidStatus);
          };
          
          contracts := removeContractById(id);
          #ok(())
        };
      };
    };

    // Get all contracts
    public func getAllContracts() : [Types.Contract] {
      HashMap.toArray(contracts)
    };

    // Get contracts by employer
    public func getContractsByEmployer(employerId: Text) : [Types.Contract] {
      let filteredContracts = HashMap.filter<Types.Contract>(
        contracts, 
        func(contract: Types.Contract) : Bool {
          contract.employerId == employerId
        }
      );
      HashMap.toArray(filteredContracts)
    };

    // Get contracts by employee
    public func getContractsByEmployee(employeeId: Text) : [Types.Contract] {
      let filteredContracts = HashMap.filter<Types.Contract>(
        contracts, 
        func(contract: Types.Contract) : Bool {
          contract.employeeId == employeeId
        }
      );
      HashMap.toArray(filteredContracts)
    };

    // Get contracts by job
    public func getContractsByJob(jobId: Text) : [Types.Contract] {
      let filteredContracts = HashMap.filter<Types.Contract>(
        contracts, 
        func(contract: Types.Contract) : Bool {
          contract.jobId == jobId
        }
      );
      HashMap.toArray(filteredContracts)
    };

    // Get contracts by status
    public func getContractsByStatus(status: Types.ContractStatus) : [Types.Contract] {
      let filteredContracts = HashMap.filter<Types.Contract>(
        contracts, 
        func(contract: Types.Contract) : Bool {
          contract.status == status
        }
      );
      HashMap.toArray(filteredContracts)
    };

    // Create a new dispute
    public func createDispute(
      id: Text,
      contractId: Text,
      raisedByUserId: Text,
      description: Text
    ) : Result<Types.Dispute> {
      switch (findContractById(contractId)) {
        case null {
          #err(#ContractNotFound)
        };
        case (?contract) {
          // Validate that the user is part of the contract
          if (contract.employerId != raisedByUserId and contract.employeeId != raisedByUserId) {
            return #err(#Unauthorized);
          };
          
          // Update contract status to Disputed
          let _ = updateContractStatus(contractId, #Disputed);
          
          let now = Time.now();
          let newDispute : Types.Dispute = {
            id = id;
            contractId = contractId;
            raisedByUserId = raisedByUserId;
            description = description;
            status = #Open;
            resolution = null;
            createdAt = now;
            updatedAt = now;
          };
          disputes := HashMap.put(disputes, id, newDispute);
          #ok(newDispute)
        };
      };
    };

    // Get a dispute by ID
    public func getDispute(id: Text) : Result<Types.Dispute> {
      switch (findDisputeById(id)) {
        case null { #err(#DisputeNotFound) };
        case (?dispute) { #ok(dispute) };
      };
    };

    // Update dispute status
    public func updateDisputeStatus(
      id: Text,
      status: Types.DisputeStatus,
      resolution: ?Text
    ) : Result<Types.Dispute> {
      switch (findDisputeById(id)) {
        case null {
          #err(#DisputeNotFound)
        };
        case (?dispute) {
          // Validate status transitions
          switch (dispute.status, status) {
            // Valid transitions
            case (#Open, #UnderReview) {};
            case (#UnderReview, #Resolved) {};
            case (#Resolved, #Closed) {};
            // Invalid transitions
            case _ {
              return #err(#InvalidStatus);
            };
          };
          
          let updatedDispute : Types.Dispute = {
            id = dispute.id;
            contractId = dispute.contractId;
            raisedByUserId = dispute.raisedByUserId;
            description = dispute.description;
            status = status;
            resolution = if (status == #Resolved) { resolution } else { dispute.resolution };
            createdAt = dispute.createdAt;
            updatedAt = Time.now();
          };
          disputes := HashMap.put(disputes, id, updatedDispute);
          #ok(updatedDispute)
        };
      };
    };

    // Get all disputes
    public func getAllDisputes() : [Types.Dispute] {
      HashMap.toArray(disputes)
    };

    // Get disputes by contract
    public func getDisputesByContract(contractId: Text) : [Types.Dispute] {
      let filteredDisputes = HashMap.filter<Types.Dispute>(
        disputes, 
        func(dispute: Types.Dispute) : Bool {
          dispute.contractId == contractId
        }
      );
      HashMap.toArray(filteredDisputes)
    };

    // Get disputes by user
    public func getDisputesByUser(userId: Text) : [Types.Dispute] {
      let filteredDisputes = HashMap.filter<Types.Dispute>(
        disputes, 
        func(dispute: Types.Dispute) : Bool {
          dispute.raisedByUserId == userId
        }
      );
      HashMap.toArray(filteredDisputes)
    };

    // Get disputes by status
    public func getDisputesByStatus(status: Types.DisputeStatus) : [Types.Dispute] {
      let filteredDisputes = HashMap.filter<Types.Dispute>(
        disputes, 
        func(dispute: Types.Dispute) : Bool {
          dispute.status == status
        }
      );
      HashMap.toArray(filteredDisputes)
    };
  };
}