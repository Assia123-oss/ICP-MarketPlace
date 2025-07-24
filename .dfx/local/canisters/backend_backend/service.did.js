export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const List_2 = IDL.Rec();
  const List_3 = IDL.Rec();
  const Time = IDL.Int;
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const JobStatus = IDL.Variant({
    'Open' : IDL.Null,
    'Closed' : IDL.Null,
    'Filled' : IDL.Null,
  });
  const ApplicationStatus = IDL.Variant({
    'Rejected' : IDL.Null,
    'Shortlisted' : IDL.Null,
    'Accepted' : IDL.Null,
    'Reviewing' : IDL.Null,
    'Submitted' : IDL.Null,
  });
  const JobApplication = IDL.Record({
    'id' : IDL.Text,
    'status' : ApplicationStatus,
    'userId' : IDL.Text,
    'createdAt' : Time,
    'jobId' : IDL.Text,
    'coverLetter' : IDL.Opt(IDL.Text),
    'updatedAt' : Time,
  });
  const Result_7 = IDL.Variant({ 'ok' : JobApplication, 'err' : IDL.Text });
  const ContractStatus = IDL.Variant({
    'Disputed' : IDL.Null,
    'Active' : IDL.Null,
    'Draft' : IDL.Null,
    'Cancelled' : IDL.Null,
    'Completed' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Contract = IDL.Record({
    'id' : IDL.Text,
    'status' : ContractStatus,
    'terms' : IDL.Text,
    'endDate' : IDL.Opt(Time),
    'createdAt' : Time,
    'jobId' : IDL.Text,
    'updatedAt' : Time,
    'employeeId' : IDL.Text,
    'employerId' : IDL.Text,
    'paymentAmount' : IDL.Nat,
    'startDate' : Time,
  });
  const Result_6 = IDL.Variant({ 'ok' : Contract, 'err' : IDL.Text });
  const DisputeStatus = IDL.Variant({
    'UnderReview' : IDL.Null,
    'Open' : IDL.Null,
    'Closed' : IDL.Null,
    'Resolved' : IDL.Null,
  });
  const Dispute = IDL.Record({
    'id' : IDL.Text,
    'status' : DisputeStatus,
    'raisedByUserId' : IDL.Text,
    'createdAt' : Time,
    'description' : IDL.Text,
    'resolution' : IDL.Opt(IDL.Text),
    'updatedAt' : Time,
    'contractId' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok' : Dispute, 'err' : IDL.Text });
  const JobType = IDL.Variant({
    'Internship' : IDL.Null,
    'Contract' : IDL.Null,
    'PartTime' : IDL.Null,
    'FullTime' : IDL.Null,
    'Freelance' : IDL.Null,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
  const JobListing = IDL.Record({
    'id' : IDL.Text,
    'status' : JobStatus,
    'title' : IDL.Text,
    'salary' : IDL.Opt(IDL.Text),
    'jobType' : JobType,
    'createdAt' : Time,
    'description' : IDL.Text,
    'deadline' : IDL.Opt(Time),
    'updatedAt' : Time,
    'company' : IDL.Text,
    'employerId' : IDL.Text,
    'requirements' : List,
    'applications' : List,
    'skills' : List,
    'location' : IDL.Opt(IDL.Text),
  });
  const Result_4 = IDL.Variant({ 'ok' : JobListing, 'err' : IDL.Text });
  const Rating = IDL.Record({
    'id' : IDL.Text,
    'createdAt' : Time,
    'toUserId' : IDL.Text,
    'score' : IDL.Nat,
    'comment' : IDL.Opt(IDL.Text),
    'fromUserId' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : Rating, 'err' : IDL.Text });
  const MatchScore = IDL.Record({
    'userId' : IDL.Text,
    'jobId' : IDL.Text,
    'score' : IDL.Float64,
    'matchedSkills' : IDL.Vec(IDL.Text),
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(MatchScore),
    'err' : IDL.Text,
  });
  const Role = IDL.Variant({ 'JobSeeker' : IDL.Null, 'Employer' : IDL.Null });
  const Education = IDL.Record({
    'field' : IDL.Text,
    'endDate' : IDL.Opt(Time),
    'institution' : IDL.Text,
    'degree' : IDL.Text,
    'startDate' : Time,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(Education, List_1)));
  const Experience = IDL.Record({
    'title' : IDL.Text,
    'endDate' : IDL.Opt(Time),
    'description' : IDL.Text,
    'company' : IDL.Text,
    'startDate' : Time,
  });
  List_2.fill(IDL.Opt(IDL.Tuple(Experience, List_2)));
  const Skill = IDL.Record({ 'name' : IDL.Text, 'level' : IDL.Text });
  List_3.fill(IDL.Opt(IDL.Tuple(Skill, List_3)));
  const User = IDL.Record({
    'id' : IDL.Text,
    'bio' : IDL.Opt(IDL.Text),
    'portfolio' : IDL.Opt(IDL.Text),
    'verified' : IDL.Bool,
    'name' : IDL.Text,
    'createdAt' : Time,
    'role' : Role,
    'education' : List_1,
    'email' : IDL.Text,
    'updatedAt' : Time,
    'experiences' : List_2,
    'profilePicture' : IDL.Opt(IDL.Text),
    'skills' : List_3,
    'location' : IDL.Opt(IDL.Text),
  });
  const Result_1 = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  return IDL.Service({
    'addEducation' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, Time, IDL.Opt(Time)],
        [Result],
        [],
      ),
    'addExperience' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, Time, IDL.Opt(Time), IDL.Text],
        [Result],
        [],
      ),
    'addSkill' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
    'calculateAverageRating' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Float64)],
        ['query'],
      ),
    'changeJobStatus' : IDL.Func([IDL.Text, JobStatus], [Result], []),
    'createApplication' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [Result_7],
        [],
      ),
    'createContract' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat, Time],
        [Result_6],
        [],
      ),
    'createDispute' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_5], []),
    'createJob' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(IDL.Text),
          JobType,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Vec(IDL.Text),
          IDL.Opt(Time),
        ],
        [Result_4],
        [],
      ),
    'createRating' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Text)],
        [Result_3],
        [],
      ),
    'filterJobsBySkills' : IDL.Func(
        [IDL.Vec(IDL.Text)],
        [IDL.Vec(JobListing)],
        ['query'],
      ),
    'findMatchingCandidates' : IDL.Func(
        [IDL.Text, IDL.Float64],
        [Result_2],
        [],
      ),
    'findMatchingJobs' : IDL.Func([IDL.Text, IDL.Float64], [Result_2], []),
    'findMatchingJobsAdvanced' : IDL.Func(
        [IDL.Text, IDL.Float64],
        [Result_2],
        [],
      ),
    'getAllJobs' : IDL.Func([], [IDL.Vec(JobListing)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getApplication' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(JobApplication)],
        ['query'],
      ),
    'getApplicationsByJob' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(JobApplication)],
        ['query'],
      ),
    'getApplicationsByUser' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(JobApplication)],
        ['query'],
      ),
    'getContract' : IDL.Func([IDL.Text], [IDL.Opt(Contract)], ['query']),
    'getContractsByEmployee' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Contract)],
        ['query'],
      ),
    'getContractsByEmployer' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Contract)],
        ['query'],
      ),
    'getDispute' : IDL.Func([IDL.Text], [IDL.Opt(Dispute)], ['query']),
    'getDisputesByContract' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Dispute)],
        ['query'],
      ),
    'getDisputesByUser' : IDL.Func([IDL.Text], [IDL.Vec(Dispute)], ['query']),
    'getJob' : IDL.Func([IDL.Text], [IDL.Opt(JobListing)], ['query']),
    'getJobsByEmployer' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(JobListing)],
        ['query'],
      ),
    'getJobsByStatus' : IDL.Func([JobStatus], [IDL.Vec(JobListing)], ['query']),
    'getJobsByType' : IDL.Func([JobType], [IDL.Vec(JobListing)], ['query']),
    'getRatingDistribution' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Nat)],
        ['query'],
      ),
    'getRatingsByUser' : IDL.Func([IDL.Text], [IDL.Vec(Rating)], ['query']),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'getUsersByRole' : IDL.Func([Role], [IDL.Vec(User)], ['query']),
    'greet' : IDL.Func([], [IDL.Text], ['query']),
    'hasUserApplied' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
    'hasUserRated' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
    'registerUser' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          Role,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [Result_1],
        [],
      ),
    'searchJobs' : IDL.Func([IDL.Text], [IDL.Vec(JobListing)], ['query']),
    'updateApplicationStatus' : IDL.Func(
        [IDL.Text, ApplicationStatus],
        [Result],
        [],
      ),
    'updateContractStatus' : IDL.Func([IDL.Text, ContractStatus], [Result], []),
    'updateDisputeStatus' : IDL.Func(
        [IDL.Text, DisputeStatus, IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'updateJob' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(IDL.Text),
          JobType,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Vec(IDL.Text),
          JobStatus,
          IDL.Opt(Time),
        ],
        [Result],
        [],
      ),
    'updateUser' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
