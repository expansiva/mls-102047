/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/recruiter_home.defs.ts" enhancement="_blank"/>

/** One active pipeline stage with its count and time-in-stage indicators. */
export interface StageSummary {
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly activeApplications: number;
  readonly maxDaysInStage: number;
  readonly avgDaysInStage: number;
}

/** Headcount figures of an open position. */
export interface OpenPositionDetails {
  details: {
    headcount: number;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
  };
}

/** An open job position with its remaining openings, hires so far and active applications. */
export interface OpenPositionSummary {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  details: OpenPositionDetails;
  readonly activeApplications: number;
}

/** Derived and free details of a queued application. */
export interface QueueApplicationDetails {
  details: {
    notes?: string;
    readonly isActive: boolean;
    readonly daysInStage: number;
    readonly remainingOpenings: number;
  };
}

export interface QueueCandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface QueueCandidateHiringPipeline {
  details: {
    hiringPipeline: {
      resumeLink: string;
      source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other';
    };
  };
}

export interface QueueCandidateDetails {
  identification: QueueCandidateIdentification;
  hiringPipeline: QueueCandidateHiringPipeline;
}

/** Candidate of the application, read from the master record. */
export interface QueueCandidate {
  id: string;
  details: QueueCandidateDetails;
}

export interface QueueHiringManagerIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface QueueHiringManagerDetails {
  identification: QueueHiringManagerIdentification;
}

/** Hiring manager of the position, only the name allowed by the grant. */
export interface QueueHiringManager {
  details: QueueHiringManagerDetails;
}

/** Position of the application with its hiring manager. */
export interface QueueJobPosition {
  id: string;
  title: string;
  hiringManagerId: string;
  hiringManager: QueueHiringManager;
}

/** One application of the recruiter’s work queue with candidate and position, as the inbox row and its expanded view show it. */
export interface WorkQueueItem {
  id: string;
  version: number;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly appliedAt: string;
  readonly stageChangedAt: string;
  candidateId: string;
  jobPositionId: string;
  details: QueueApplicationDetails;
  candidate: QueueCandidate;
  jobPosition: QueueJobPosition;
}

export interface Recruiter_homeContracts {
  /**
   * Purpose: Loads the pipeline summary of the recruiter home: active applications per stage with time-in-stage indicators, and the open positions with their openings.
   * Input: None; the scope is the recruiter’s organization.
   * Processing: Counts active applications (applicationActiveCalculation: screening, interview or offer) grouped by stage, always returning the three stages even when zero; computes max and average days in stage from stageChangedAt up to today (daysInStageCalculation). Lists positions with status open, with hiresSoFar = applications in hired (hiresSoFarCalculation), remainingOpenings = headcount - hiresSoFar, never below zero (remainingOpeningsCalculation), and the count of active applications per position. Derived values are computed, never stored. Positions ordered by remaining openings descending, then title.
   * Output: stages and openPositions, already computed, so the highlights render without any summing on the page.
   */
  'hiringPipeline.recruiter_home.getPipelineOverview': {
    kind: 'qry';
    input: {};
    output: { stages: StageSummary[]; openPositions: OpenPositionSummary[] };
    rules: ['applicationActiveCalculation', 'daysInStageCalculation', 'hiresSoFarCalculation', 'remainingOpeningsCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Lists the applications waiting for the recruiter, optionally narrowed to one stage picked in the pipeline highlights.
   * Input: status: optional stage filter (screening, interview or offer) chosen in the highlights; page and pageSize: paging of the queue.
   * Processing: Selects active applications only (applicationActiveCalculation) in the organization, filtered by status when given, ordered by stageChangedAt ascending (oldest in their stage first). Joins the candidate master record (name, resume link, source), the job position (title, hiringManagerId) and the hiring manager name. Computes daysInStage up to today (daysInStageCalculation) and the position’s remainingOpenings (remainingOpeningsCalculation) per row.
   * Output: A page { items, page, pageSize, hasMore } of WorkQueueItem, carrying id and version for the stage-change commands.
   */
  'hiringPipeline.recruiter_home.listWorkQueue': {
    kind: 'qry';
    input: { status?: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'; page: number; pageSize: number };
    output: { applications: { items: WorkQueueItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['applicationActiveCalculation', 'daysInStageCalculation', 'remainingOpeningsCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Moves a screened application to the interview stage so it reaches the position’s hiring manager after the interview.
   * Input: id: the application; version: the version the recruiter saw, for optimistic concurrency.
   * Processing: Refuses on version mismatch. Applies transition advanceToInterview only from screening (stageSequenceEnforced) and refuses hired or rejected applications (finalStagesAreTerminal). The engine records status interview, stageChangedAt, details.interview.movedAt and movedBy (the signed-in recruiter). daysInStage is recomputed (daysInStageCalculation), not stored.
   * Output: The updated WorkQueueItem, upserted in place in the queue.
   */
  'hiringPipeline.recruiter_home.advanceToInterview': {
    kind: 'cmd';
    writes: 'Application.advanceToInterview';
    input: { id: string; version: number };
    output: { application: WorkQueueItem };
    rules: ['stageSequenceEnforced', 'finalStagesAreTerminal', 'daysInStageCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Rejects an application that will not move forward, recording the reason.
   * Input: id and version of the application; reason: the rejection reason typed by the recruiter.
   * Processing: Refuses on version mismatch. Refuses an empty reason (rejectionRequiresReason) and records stageAtRejection and rejectedAt. Allowed only from screening, interview or offer (stageSequenceEnforced); hired or rejected applications are refused (finalStagesAreTerminal). Status becomes rejected and the application stops being active.
   * Output: The rejected WorkQueueItem, used to remove the row from the queue.
   */
  'hiringPipeline.recruiter_home.rejectApplication': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { application: WorkQueueItem };
    rules: ['rejectionRequiresReason', 'finalStagesAreTerminal', 'stageSequenceEnforced'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
}
