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
          #ok(())
        };
      };
    };

    // Helper: find contract by ID
    public func findContractById(id: Text) : ?Types.Contract {
      contracts.get(id)
    };

    // Helper: remove contract by ID
    private func removeContractById(id: Text) : () {
      ignore contracts.remove(id)
    };

    // Helper: find dispute by ID
    public func findDisputeById(id: Text) : ?Types.Dispute {
      disputes.get(id)
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
          contracts.put(id, newContract);
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
          contracts.put(id, updatedContract);
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
          switch (contract.status, status) {
            case (#Draft, #Pending) {};
            case (#Pending, #Active) {};
            case (#Active, #Completed) {};
            case (#Active, #Cancelled) {};
            case (#Active, #Disputed) {};
            case (#Disputed, #Completed) {};
            case (#Disputed, #Cancelled) {};
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
          contracts.put(id, updatedContract);
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
          
          removeContractById(id);
          #ok(())
        };
      };
    };

    // Get all contracts
    public func getAllContracts() : [Types.Contract] {
      Iter.toArray(contracts.vals())
    };

    // Get contracts by employer
    public func getContractsByEmployer(employerId: Text) : [Types.Contract] {
      let filteredContracts = Iter.filter<Types.Contract>(
        contracts.vals(),
        func(contract) { contract.employerId == employerId }
      );
      Iter.toArray(filteredContracts)
    };

    // Get contracts by employee
    public func getContractsByEmployee(employeeId: Text) : [Types.Contract] {
      let filteredContracts = Iter.filter<Types.Contract>(
        contracts.vals(),
        func(contract) { contract.employeeId == employeeId }
      );
      Iter.toArray(filteredContracts)
    };

    // Get contracts by job
    public func getContractsByJob(jobId: Text) : [Types.Contract] {
      let filteredContracts = Iter.filter<Types.Contract>(
        contracts.vals(),
        func(contract) { contract.jobId == jobId }
      );
      Iter.toArray(filteredContracts)
    };

    // Get contracts by status
    public func getContractsByStatus(status: Types.ContractStatus) : [Types.Contract] {
      let filteredContracts = Iter.filter<Types.Contract>(
        contracts.vals(),
        func(contract) { contract.status == status }
      );
      Iter.toArray(filteredContracts)
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
          if (contract.employerId != raisedByUserId and contract.employeeId != raisedByUserId) {
            return #err(#Unauthorized);
          };
          
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
          disputes.put(id, newDispute);
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
          switch (dispute.status, status) {
            case (#Open, #UnderReview) {};
            case (#UnderReview, #Resolved) {};
            case (#Resolved, #Closed) {};
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
          disputes.put(id, updatedDispute);
          #ok(updatedDispute)
        };
      };
    };

    // Get all disputes
    public func getAllDisputes() : [Types.Dispute] {
      Iter.toArray(disputes.vals())
    };

    // Get disputes by contract
    public func getDisputesByContract(contractId: Text) : [Types.Dispute] {
      let filteredDisputes = Iter.filter<Types.Dispute>(
        disputes.vals(),
        func(dispute) { dispute.contractId == contractId }
      );
      Iter.toArray(filteredDisputes)
    };

    // Get disputes by user
    public func getDisputesByUser(userId: Text) : [Types.Dispute] {
      let filteredDisputes = Iter.filter<Types.Dispute>(
        disputes.vals(),
        func(dispute) { dispute.raisedByUserId == userId }
      );
      Iter.toArray(filteredDisputes)
    };

    // Get disputes by status
    public func getDisputesByStatus(status: Types.DisputeStatus) : [Types.Dispute] {
      let filteredDisputes = Iter.filter<Types.Dispute>(
        disputes.vals(),
        func(dispute) { dispute.status == status }
      );
      Iter.toArray(filteredDisputes)
    };
  };
}