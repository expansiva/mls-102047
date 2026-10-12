/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/recruiter_home.defs.ts" enhancement="_blank"/>

/** Derived pipeline values of an application (Application.details). */
export interface ApplicationPipelineDetails {
  details: {
    readonly isActive: boolean;
    readonly daysInPipeline: number;
  };
}

export interface CandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface CandidateHiringPipeline {
  details: {
    hiringPipeline: {
      source: 'referral' | 'jobBoard' | 'linkedIn' | 'careerSite' | 'agency' | 'event' | 'other';
    };
  };
}

export interface CandidateDetails {
  identification: CandidateIdentification;
  hiringPipeline: CandidateHiringPipeline;
}

export interface CandidateEmailContactChannel {
  details: {
    contactChannel: {
      value: string;
    };
  };
}

export interface CandidateEmailDetails {
  contactChannel: CandidateEmailContactChannel;
}

/** The candidate’s primary e-mail contact channel. */
export interface CandidateEmailSummary {
  details: CandidateEmailDetails;
}

/** Candidate shown on an inbox item and offered when recording an application: name, source and e-mail. */
export interface CandidateSummary {
  id: string;
  details: CandidateDetails;
  candidateEmail?: CandidateEmailSummary;
}

export interface PositionOpeningDetails {
  details: {
    readonly remainingOpenings: number;
  };
}

/** Job position as shown on an application and offered when recording one: title, status and remaining openings. */
export interface PositionOption {
  id: string;
  title: string;
  status: 'open' | 'closed';
  details: PositionOpeningDetails;
}

/** One application in the recruiter’s inbox, with its candidate and position; also returned by every command so the page redraws the item. */
export interface InboxApplication {
  id: string;
  version: number;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  jobPositionId: string;
  candidateId: string;
  details: ApplicationPipelineDetails;
  candidate: CandidateSummary;
  jobPosition: PositionOption;
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

export interface HiringManagerSummary {
  details: HiringManagerDetails;
}

/** Count of a position’s applications in each stage (JobPosition.details.applicationsByStage). */
export interface StageCounts {
  readonly screening: number;
  readonly interview: number;
  readonly offer: number;
  readonly hired: number;
  readonly rejected: number;
}

export interface PositionHighlightDetails {
  details: {
    headcount: number;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly isFilled: boolean;
  };
  applicationsByStage: StageCounts;
}

/** A position in the pipeline overview with its hiring manager and filling indicators. */
export interface PositionHighlight {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  hiringManagerId: string;
  hiringManager: HiringManagerSummary;
  details: PositionHighlightDetails;
}

/** An active application in the overview, with its days in the pipeline and its position title. */
export interface ActiveApplicationHighlight {
  id: string;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  details: ApplicationPipelineDetails;
  jobPosition: PositionOption;
}

/** Totals computed by the server for the overview header. */
export interface PipelineIndicators {
  readonly openPositions: number;
  readonly filledPositions: number;
  readonly totalRemainingOpenings: number;
  readonly activeApplications: number;
  readonly averageDaysInPipeline: number;
}

export interface Recruiter_homeContracts {
  /**
   * Purpose: Loads in one call the pipeline overview of the recruiter home: header indicators, positions with their filling status and the active applications that have waited longest.
   * Input: None; the organization scope comes from the session.
   * Processing: Reads the organization’s open positions plus positions filled recently (capped list, ordered by remainingOpenings ascending so positions close to filling come first), hydrating the hiring manager name. Computes per position hiresSoFar, remainingOpenings = max(0, headcount - hiresSoFar) (remainingOpeningsCalculated), applicationsByStage counts and isFilled when hires >= headcount (positionClosesWhenHeadcountFilled). Lists active applications (screening, interview, offer per applicationActiveWhileInPipeline) ordered by daysInPipeline descending, capped to the top 10, with daysInPipeline computed from appliedAt to today (daysInPipelineCalculated). Computes the indicators (open and filled positions, total remaining openings, active applications, average days in pipeline) on the server. Derived values are computed, never stored.
   * Output: indicators for the header, positions for the position cards, activeApplications for the longest-waiting list; everything already in the shape the highlights show.
   */
  'hiringPipeline.recruiter_home.getPipelineOverview': {
    kind: 'qry';
    input: {};
    output: { indicators: PipelineIndicators; positions: PositionHighlight[]; activeApplications: ActiveApplicationHighlight[] };
    rules: ['remainingOpeningsCalculated', 'positionClosesWhenHeadcountFilled', 'applicationActiveWhileInPipeline', 'daysInPipelineCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Lists the applications waiting for the recruiter: those in screening to move to interview or reject, and those in interview returned by the hiring manager to reject with a reason.
   * Input: stage: optional filter to one group (screening or interview); without it both groups come back. page and pageSize: the page of the inbox to load.
   * Processing: Selects active applications (applicationActiveWhileInPipeline) of the organization in screening or interview, ordered by appliedAt ascending so the oldest waits first. Hydrates in batch the candidate (name, source, primary e-mail) and the job position (title, status, remainingOpenings computed per remainingOpeningsCalculated). daysInPipeline is computed from appliedAt to today (daysInPipelineCalculated).
   * Output: items as { items, page, pageSize, hasMore }; each item carries id and version for the actions, plus what the inbox shows.
   */
  'hiringPipeline.recruiter_home.listInboxApplications': {
    kind: 'qry';
    input: { status?: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'; page: number; pageSize: number };
    output: { items: { items: InboxApplication[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['applicationActiveWhileInPipeline', 'daysInPipelineCalculated', 'remainingOpeningsCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Finds the candidate the recruiter types when recording a new application.
   * Input: text: part of the candidate’s name or e-mail address.
   * Processing: Locates candidates with the hiringPipeline.Candidate role whose name contains the text or whose e-mail matches it; excludes inactive candidates; returns at most 20 ordered by name, hydrating the primary e-mail.
   * Output: candidates with id, name, source and e-mail so the recruiter picks the right person.
   */
  'hiringPipeline.recruiter_home.searchCandidates': {
    kind: 'qry';
    input: { text: string };
    output: { candidates: CandidateSummary[] };
    rules: [];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Offers the open job positions the candidate can apply to when recording an application.
   * Input: text: optional part of the title or department to narrow the list.
   * Processing: Lists only positions with status open (applicationOnlyToOpenPosition) matching the text on title or department, ordered by openedAt descending, at most 20; remainingOpenings computed as headcount minus hires, never below zero (remainingOpeningsCalculated).
   * Output: positions with id, title, status and remaining openings for the picker.
   */
  'hiringPipeline.recruiter_home.searchOpenPositions': {
    kind: 'qry';
    input: { text?: string };
    output: { positions: PositionOption[] };
    rules: ['applicationOnlyToOpenPosition', 'remainingOpeningsCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Records a new application of the chosen candidate to the chosen open position.
   * Input: candidateId: the candidate who applies. jobPositionId: the open position applied to. rejectionReason: the rejection reason field the inbox form shares; on create it must be absent or empty, because a new application starts in screening and carries no rejection.
   * Processing: Only a recruiter may record (recruiterMovesScreeningAndInterview). Refuses when the position is not open (applicationOnlyToOpenPosition) or when the candidate already has an active application for that position (oneActiveApplicationPerCandidateAndPosition). Refuses a non-empty rejectionReason. Issues applicationNumber from the sequence hiringPipeline.Application (applicationNumberFromSequence), sets status screening (applicationStartsInScreening) and appliedAt to today. isActive and daysInPipeline are computed on read, never stored.
   * Output: application: the new inbox item with candidate and position, inserted into the inbox without another call.
   */
  'hiringPipeline.recruiter_home.recordApplication': {
    kind: 'cmd';
    writes: 'Application.create';
    input: { candidateId: string; jobPositionId: string; details: { rejection: { reason?: string } } };
    output: { application: InboxApplication };
    rules: ['recruiterMovesScreeningAndInterview', 'applicationOnlyToOpenPosition', 'oneActiveApplicationPerCandidateAndPosition', 'applicationNumberFromSequence', 'applicationStartsInScreening'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Moves a screened application to interview, handing it to the position’s hiring manager.
   * Input: id and version of the application (version for optimistic concurrency).
   * Processing: Runs the advanceToInterview transition from screening to interview; only a recruiter may do it (recruiterMovesScreeningAndInterview). Records interviewStartedAt. Refuses on a stale version or a stage other than screening.
   * Output: application: the updated record, so the page removes it from the screening group.
   */
  'hiringPipeline.recruiter_home.advanceToInterview': {
    kind: 'cmd';
    writes: 'Application.advanceToInterview';
    input: { id: string; version: number };
    output: { application: InboxApplication };
    rules: ['recruiterMovesScreeningAndInterview'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Rejects an application that will not move forward, recording the reason.
   * Input: id and version of the application; reason: why it is rejected.
   * Processing: Runs the reject transition; refuses unless the stage is screening, interview or offer and the reason is non-empty (rejectionRequiresReason); records rejectedAt and stageAtRejection. Performed by the recruiter (recruiterMovesScreeningAndInterview). Refuses on a stale version.
   * Output: application: the rejected record, so the page removes it from the inbox.
   */
  'hiringPipeline.recruiter_home.rejectApplication': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { application: InboxApplication };
    rules: ['rejectionRequiresReason', 'recruiterMovesScreeningAndInterview'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
}
