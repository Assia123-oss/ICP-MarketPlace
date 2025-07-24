import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApplicationStatus = { 'Rejected' : null } |
  { 'Shortlisted' : null } |
  { 'Accepted' : null } |
  { 'Reviewing' : null } |
  { 'Submitted' : null };
export interface Contract {
  'id' : string,
  'status' : ContractStatus,
  'terms' : string,
  'endDate' : [] | [Time],
  'createdAt' : Time,
  'jobId' : string,
  'updatedAt' : Time,
  'employeeId' : string,
  'employerId' : string,
  'paymentAmount' : bigint,
  'startDate' : Time,
}
export type ContractStatus = { 'Disputed' : null } |
  { 'Active' : null } |
  { 'Draft' : null } |
  { 'Cancelled' : null } |
  { 'Completed' : null } |
  { 'Pending' : null };
export interface Dispute {
  'id' : string,
  'status' : DisputeStatus,
  'raisedByUserId' : string,
  'createdAt' : Time,
  'description' : string,
  'resolution' : [] | [string],
  'updatedAt' : Time,
  'contractId' : string,
}
export type DisputeStatus = { 'UnderReview' : null } |
  { 'Open' : null } |
  { 'Closed' : null } |
  { 'Resolved' : null };
export interface Education {
  'field' : string,
  'endDate' : [] | [Time],
  'institution' : string,
  'degree' : string,
  'startDate' : Time,
}
export interface Experience {
  'title' : string,
  'endDate' : [] | [Time],
  'description' : string,
  'company' : string,
  'startDate' : Time,
}
export interface JobApplication {
  'id' : string,
  'status' : ApplicationStatus,
  'userId' : string,
  'createdAt' : Time,
  'jobId' : string,
  'coverLetter' : [] | [string],
  'updatedAt' : Time,
}
export interface JobListing {
  'id' : string,
  'status' : JobStatus,
  'title' : string,
  'salary' : [] | [string],
  'jobType' : JobType,
  'createdAt' : Time,
  'description' : string,
  'deadline' : [] | [Time],
  'updatedAt' : Time,
  'company' : string,
  'employerId' : string,
  'requirements' : List,
  'applications' : List,
  'skills' : List,
  'location' : [] | [string],
}
export type JobStatus = { 'Open' : null } |
  { 'Closed' : null } |
  { 'Filled' : null };
export type JobType = { 'Internship' : null } |
  { 'Contract' : null } |
  { 'PartTime' : null } |
  { 'FullTime' : null } |
  { 'Freelance' : null };
export type List = [] | [[string, List]];
export type List_1 = [] | [[Education, List_1]];
export type List_2 = [] | [[Experience, List_2]];
export type List_3 = [] | [[Skill, List_3]];
export interface MatchScore {
  'userId' : string,
  'jobId' : string,
  'score' : number,
  'matchedSkills' : Array<string>,
}
export interface Rating {
  'id' : string,
  'createdAt' : Time,
  'toUserId' : string,
  'score' : bigint,
  'comment' : [] | [string],
  'fromUserId' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : User } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<MatchScore> } |
  { 'err' : string };
export type Result_3 = { 'ok' : Rating } |
  { 'err' : string };
export type Result_4 = { 'ok' : JobListing } |
  { 'err' : string };
export type Result_5 = { 'ok' : Dispute } |
  { 'err' : string };
export type Result_6 = { 'ok' : Contract } |
  { 'err' : string };
export type Result_7 = { 'ok' : JobApplication } |
  { 'err' : string };
export type Role = { 'JobSeeker' : null } |
  { 'Employer' : null };
export interface Skill { 'name' : string, 'level' : string }
export type Time = bigint;
export interface User {
  'id' : string,
  'bio' : [] | [string],
  'portfolio' : [] | [string],
  'verified' : boolean,
  'name' : string,
  'createdAt' : Time,
  'role' : Role,
  'education' : List_1,
  'email' : string,
  'updatedAt' : Time,
  'experiences' : List_2,
  'profilePicture' : [] | [string],
  'skills' : List_3,
  'location' : [] | [string],
}
export interface _SERVICE {
  'addEducation' : ActorMethod<
    [string, string, string, string, Time, [] | [Time]],
    Result
  >,
  'addExperience' : ActorMethod<
    [string, string, string, Time, [] | [Time], string],
    Result
  >,
  'addSkill' : ActorMethod<[string, string, string], Result>,
  'calculateAverageRating' : ActorMethod<[string], [] | [number]>,
  'changeJobStatus' : ActorMethod<[string, JobStatus], Result>,
  'createApplication' : ActorMethod<[string, string, [] | [string]], Result_7>,
  'createContract' : ActorMethod<
    [string, string, string, string, bigint, Time],
    Result_6
  >,
  'createDispute' : ActorMethod<[string, string, string], Result_5>,
  'createJob' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      Array<string>,
      JobType,
      [] | [string],
      [] | [string],
      Array<string>,
      [] | [Time],
    ],
    Result_4
  >,
  'createRating' : ActorMethod<
    [string, string, bigint, [] | [string]],
    Result_3
  >,
  'filterJobsBySkills' : ActorMethod<[Array<string>], Array<JobListing>>,
  'findMatchingCandidates' : ActorMethod<[string, number], Result_2>,
  'findMatchingJobs' : ActorMethod<[string, number], Result_2>,
  'findMatchingJobsAdvanced' : ActorMethod<[string, number], Result_2>,
  'getAllJobs' : ActorMethod<[], Array<JobListing>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getApplication' : ActorMethod<[string], [] | [JobApplication]>,
  'getApplicationsByJob' : ActorMethod<[string], Array<JobApplication>>,
  'getApplicationsByUser' : ActorMethod<[string], Array<JobApplication>>,
  'getContract' : ActorMethod<[string], [] | [Contract]>,
  'getContractsByEmployee' : ActorMethod<[string], Array<Contract>>,
  'getContractsByEmployer' : ActorMethod<[string], Array<Contract>>,
  'getDispute' : ActorMethod<[string], [] | [Dispute]>,
  'getDisputesByContract' : ActorMethod<[string], Array<Dispute>>,
  'getDisputesByUser' : ActorMethod<[string], Array<Dispute>>,
  'getJob' : ActorMethod<[string], [] | [JobListing]>,
  'getJobsByEmployer' : ActorMethod<[string], Array<JobListing>>,
  'getJobsByStatus' : ActorMethod<[JobStatus], Array<JobListing>>,
  'getJobsByType' : ActorMethod<[JobType], Array<JobListing>>,
  'getRatingDistribution' : ActorMethod<[string], Array<bigint>>,
  'getRatingsByUser' : ActorMethod<[string], Array<Rating>>,
  'getUser' : ActorMethod<[string], [] | [User]>,
  'getUsersByRole' : ActorMethod<[Role], Array<User>>,
  'greet' : ActorMethod<[], string>,
  'hasUserApplied' : ActorMethod<[string, string], boolean>,
  'hasUserRated' : ActorMethod<[string, string], boolean>,
  'registerUser' : ActorMethod<
    [
      string,
      string,
      Role,
      [] | [string],
      [] | [string],
      [] | [string],
      [] | [string],
    ],
    Result_1
  >,
  'searchJobs' : ActorMethod<[string], Array<JobListing>>,
  'updateApplicationStatus' : ActorMethod<[string, ApplicationStatus], Result>,
  'updateContractStatus' : ActorMethod<[string, ContractStatus], Result>,
  'updateDisputeStatus' : ActorMethod<
    [string, DisputeStatus, [] | [string]],
    Result
  >,
  'updateJob' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      Array<string>,
      JobType,
      [] | [string],
      [] | [string],
      Array<string>,
      JobStatus,
      [] | [Time],
    ],
    Result
  >,
  'updateUser' : ActorMethod<
    [
      string,
      string,
      string,
      [] | [string],
      [] | [string],
      [] | [string],
      [] | [string],
    ],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
