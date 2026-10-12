/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/applications.defs.ts" enhancement="_blank"/>

/** Derived pipeline indicators of an application row. */
export interface ApplicationRowDetails {
  details: {
    readonly isActive: boolean;
    readonly daysInPipeline: number;
  };
}

export interface CandidateIdentificationName {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface CandidateNameDetails {
  identification: CandidateIdentificationName;
}

/** Candidate shown by name. */
export interface CandidateNameRef {
  id: string;
  details: CandidateNameDetails;
}

export interface JobPositionTitleRef {
  id: string;
  title: string;
}

/** One application in the pipeline list, with candidate name and position title. */
export interface ApplicationRow {
  id: string;
  version: number;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  candidateId: string;
  jobPositionId: string;
  details: ApplicationRowDetails;
  candidate: CandidateNameRef;
  jobPosition: JobPositionTitleRef;
}

export interface ApplicationRejection {
  details: {
    rejection: {
      reason: string;
      rejectedAt: string;
      stageAtRejection: 'screening' | 'interview' | 'offer';
    };
  };
}

/** Stage timestamps, rejection and derived indicators of the application. */
export interface ApplicationDetailDetails {
  details: {
    interviewStartedAt?: string;
    offerExtendedAt?: string;
    hiredAt?: string;
    readonly isActive: boolean;
    readonly daysInPipeline: number;
  };
  rejection?: ApplicationRejection;
}

export interface CandidatePipeline {
  details: {
    hiringPipeline: {
      source: 'referral' | 'jobBoard' | 'linkedIn' | 'careerSite' | 'agency' | 'event' | 'other';
    };
  };
}

export interface CandidateDetailDetails {
  identification: CandidateIdentificationName;
  hiringPipeline: CandidatePipeline;
}

export interface CandidateDetailRef {
  id: string;
  details: CandidateDetailDetails;
}

export interface CandidateEmailChannel {
  details: {
    contactChannel: {
      value: string;
    };
  };
}

export interface CandidateEmailDetails {
  contactChannel: CandidateEmailChannel;
}

/** The candidate’s e-mail contact channel. */
export interface CandidateEmailRef {
  id: string;
  details: CandidateEmailDetails;
}

export interface HiringManagerIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface HiringManagerDetails {
  identification: HiringManagerIdentification;
}

/** Hiring manager of the position, by name only (fieldsOnly grant). */
export interface HiringManagerRef {
  details: HiringManagerDetails;
}

export interface JobPositionDetailRef {
  id: string;
  title: string;
  department: string;
  hiringManagerId: string;
}

/** The selected application with candidate, e-mail, position, hiring manager and stage timeline fields. */
export interface ApplicationDetail {
  id: string;
  version: number;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  candidateId: string;
  jobPositionId: string;
  details: ApplicationDetailDetails;
  candidate: CandidateDetailRef;
  candidateEmail?: CandidateEmailRef;
  jobPosition: JobPositionDetailRef;
  hiringManager: HiringManagerRef;
}

/** A candidate offered in the new application form. */
export interface CandidateOption {
  id: string;
  details: CandidateNameDetails;
  candidateEmail?: CandidateEmailRef;
}

export interface PositionOptionDetails {
  details: {
    readonly remainingOpenings: number;
  };
}

/** An open job position offered in the new application form. */
export interface PositionOption {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  details: PositionOptionDetails;
}

export interface ApplicationsContracts {
  /**
   * Purpose: Loads the recruiter’s pipeline queue: applications of the organization, optionally narrowed to one stage (screening first) or to an application number, one page at a time.
   * Input: status: optional stage filter; search: optional part of the application number; page and pageSize: the page requested.
   * Processing: Locates applications by column (status) and by text (applicationNumber), ordered by appliedAt descending. Hydrates candidate names and position titles in batch (listByForeignKey / read.mdmRecord). Computes isActive per applicationActiveWhileInPipeline (screening, interview or offer) and daysInPipeline per daysInPipelineCalculated (appliedAt until today, or until hiredAt / rejectedAt); both are computed, never stored.
   * Output: A paged list of ApplicationRow { items, page, pageSize, hasMore } ready for the list, with stage, applied date, active flag, days in pipeline, candidate name and position title.
   */
  'hiringPipeline.applications.qryApplications': {
    kind: 'qry';
    input: { status?: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'; search?: string; page: number; pageSize: number };
    output: { applications: { items: ApplicationRow[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['daysInPipelineCalculated', 'applicationActiveWhileInPipeline'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Opens the application the recruiter selected, with everything the detail, the actions and the stage timeline show, in one call.
   * Input: applicationId: id of the application picked in the list.
   * Processing: Reads the application by id, the candidate master record (name, source), the candidate’s e-mail contact channel, the job position (title, department) and the name of its hiring manager. Computes isActive (applicationActiveWhileInPipeline) and daysInPipeline (daysInPipelineCalculated). Timeline dates come from appliedAt, interviewStartedAt, offerExtendedAt, hiredAt and the rejection block.
   * Output: ApplicationDetail with version for the commands, candidate, e-mail, position, hiring manager name and stage timestamps.
   */
  'hiringPipeline.applications.qryApplicationDetail': {
    kind: 'qry';
    input: { applicationId: string };
    output: { application: ApplicationDetail };
    rules: ['daysInPipelineCalculated', 'applicationActiveWhileInPipeline'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Finds the candidate to record an application for, as the recruiter types a name.
   * Input: search: part of the candidate’s name.
   * Processing: Locates active candidates by name within the hiringPipeline.Candidate role (inactive candidates are not offered), limited to a short list, and adds the e-mail of each so homonyms can be told apart.
   * Output: Up to a screenful of candidates with name and e-mail to pick in the form.
   */
  'hiringPipeline.applications.qrySearchCandidates': {
    kind: 'qry';
    input: { search: string };
    output: { candidates: CandidateOption[] };
    rules: [];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Offers the open job positions the candidate can apply to, searchable by title or department.
   * Input: search: optional text matching title or department.
   * Processing: Lists positions with status open only (applicationOnlyToOpenPosition), matching the text, ordered by openedAt. Computes remainingOpenings as headcount minus hired applications, never below zero (remainingOpeningsCalculated); not stored.
   * Output: Open positions with title, department, status and remaining openings to pick in the form.
   */
  'hiringPipeline.applications.qrySearchOpenPositions': {
    kind: 'qry';
    input: { search?: string };
    output: { positions: PositionOption[] };
    rules: ['applicationOnlyToOpenPosition', 'remainingOpeningsCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Records a new application of a candidate to an open position.
   * Input: candidateId: the candidate picked; jobPositionId: the open position picked; rejectionReason: optional rejection reason field of the application, always left empty by the form because a new application starts in screening.
   * Processing: Only a recruiter may record (recruiterMovesScreeningAndInterview). Refuses if the position is not open (applicationOnlyToOpenPosition) or if the candidate already has an active application (screening, interview or offer) to the same position (oneActiveApplicationPerCandidateAndPosition). Issues applicationNumber from the sequence hiringPipeline.Application (applicationNumberFromSequence), sets status screening (applicationStartsInScreening) and appliedAt today; refuses a non-empty rejectionReason since no rejection exists at creation. isActive and daysInPipeline are computed for the response, not stored.
   * Output: The new application as a list row (inserted into the queue) and as a detail, so the page redraws without another call.
   */
  'hiringPipeline.applications.cmdCreateApplication': {
    kind: 'cmd';
    writes: 'Application.create';
    input: { candidateId: string; jobPositionId: string; details: { rejection: { reason?: string } } };
    output: { row: ApplicationRow; application: ApplicationDetail };
    rules: ['recruiterMovesScreeningAndInterview', 'applicationOnlyToOpenPosition', 'oneActiveApplicationPerCandidateAndPosition', 'applicationNumberFromSequence', 'applicationStartsInScreening', 'applicationActiveWhileInPipeline', 'daysInPipelineCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Moves a screened application to interview, handing it to the position’s hiring manager.
   * Input: applicationId: the selected application; version: its version for optimistic concurrency.
   * Processing: Only a recruiter may do it and only from screening (recruiterMovesScreeningAndInterview); refuses on a stale version. Runs transition advanceToInterview, recording interviewStartedAt. The application then appears in the hiring manager’s pipeline. Derived fields are recomputed for the response.
   * Output: The updated application as row and detail, so the list, detail, actions and timeline redraw at once.
   */
  'hiringPipeline.applications.cmdAdvanceToInterview': {
    kind: 'cmd';
    writes: 'Application.advanceToInterview';
    input: { id: string; version: number };
    output: { row: ApplicationRow; application: ApplicationDetail };
    rules: ['recruiterMovesScreeningAndInterview', 'applicationActiveWhileInPipeline', 'daysInPipelineCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Rejects the selected application with the reason the recruiter enters.
   * Input: applicationId and version of the application; reason: why it will not move forward.
   * Processing: Refuses unless the stage is screening, interview or offer and the reason is non-empty (rejectionRequiresReason); refuses on a stale version. Runs transition reject, recording rejectedAt and stageAtRejection with the reason. isActive becomes false and daysInPipeline stops at the rejection day, both computed.
   * Output: The rejected application as row and detail so the page redraws the queue, detail and timeline.
   */
  'hiringPipeline.applications.cmdRejectApplication': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { row: ApplicationRow; application: ApplicationDetail };
    rules: ['rejectionRequiresReason', 'recruiterMovesScreeningAndInterview', 'applicationActiveWhileInPipeline', 'daysInPipelineCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
}
