/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/hiring_manager_home.defs.ts" enhancement="_blank"/>

/** Interview stage facts of an application waiting for a decision. */
export interface DecisionInterview {
  details: {
    interview: {
      readonly movedAt?: string;
    };
  };
}

/** Offer stage facts of an application waiting for a hire decision. */
export interface DecisionOffer {
  details: {
    offer: {
      readonly extendedAt?: string;
    };
  };
}

/** Computed and stage details of an application waiting for a decision. */
export interface DecisionDetails {
  details: {
    readonly daysInStage: number;
    readonly remainingOpenings: number;
  };
  interview?: DecisionInterview;
  offer?: DecisionOffer;
}

/** Candidate name as shown in the inbox. */
export interface DecisionCandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Candidate module fields the hiring manager reviews before deciding. */
export interface DecisionCandidateHiringPipeline {
  details: {
    hiringPipeline: {
      resumeLink: string;
      source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other';
    };
  };
}

/** Candidate details visible to the hiring manager. */
export interface DecisionCandidateDetails {
  identification: DecisionCandidateIdentification;
  hiringPipeline: DecisionCandidateHiringPipeline;
}

/** The candidate of the application, read from the master record. */
export interface DecisionCandidate {
  details: DecisionCandidateDetails;
}

/** One application waiting for the hiring manager’s decision (interview → offer or send back; offer → hire or send back). */
export interface DecisionItem {
  id: string;
  version: number;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  candidateId: string;
  jobPositionId: string;
  readonly appliedAt: string;
  readonly stageChangedAt: string;
  details: DecisionDetails;
  candidate: DecisionCandidate;
}

/** Active applications of one position in one stage, with how long they have stayed there. */
export interface StagePipeline {
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly activeCount: number;
  readonly maxDaysInStage: number;
  readonly oldestStageChangedAt?: string;
}

/** Pipeline reading of one position the hiring manager manages. */
export interface PositionPipeline {
  jobPositionId: string;
  details: {
    readonly remainingOpenings: number;
  };
  readonly activeCount: number;
  stages: StagePipeline[];
}

export interface Hiring_manager_homeContracts {
  /**
   * Purpose: Loads the hiring manager home in one call: the applications waiting for her decision and the pipeline summary of the positions she manages.
   * Input: None. The signed-in hiring manager is resolved from the session (login), and every read is scoped to the job positions whose hiring manager she is.
   * Processing: Decisions: applications of her positions in status interview or offer, ordered by stageChangedAt ascending (longest waiting first), joined with the candidate master record (name, resumeLink, source only, per grant). Pipeline: for each of her positions, active applications (applicationActiveCalculation: screening, interview or offer) grouped by stage with count, max days in stage and oldest stageChangedAt; daysInStage computed as days from stageChangedAt to today (daysInStageCalculation); remainingOpenings computed as headcount minus hires so far, never below zero (hiresSoFarCalculation, remainingOpeningsCalculation). All derived values are computed at read time, never stored.
   * Output: decisions: the inbox items ready to show with candidate, position, days waiting and remaining openings; pipeline: one row per position with stage counts already computed, so the page sums nothing.
   */
  'hiringPipeline.hiring_manager_home.getHiringManagerHome': {
    kind: 'qry';
    input: {};
    output: { decisions: DecisionItem[]; pipeline: PositionPipeline[] };
    rules: ['applicationActiveCalculation', 'daysInStageCalculation', 'remainingOpeningsCalculation', 'hiresSoFarCalculation'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Extends an offer to an interviewed candidate from the inbox.
   * Input: applicationId: the application to move; version: optimistic concurrency check; offerNotes: what the hiring manager wants recorded about the offer.
   * Processing: Refuses unless the signed-in user is the hiring manager of the application’s position (onlyPositionManagerDecides), the application is in interview (stageSequenceEnforced) and not hired or rejected (finalStagesAreTerminal), and the version matches. Moves interview → offer, records offer notes; the engine records extendedAt, decidedBy and stageChangedAt. Then recomputes the pipeline of her positions.
   * Output: decision: the updated inbox item, now in offer and waiting for the hire decision; pipeline: refreshed stage counts, so the page needs no second call.
   */
  'hiringPipeline.hiring_manager_home.extendOffer': {
    kind: 'cmd';
    writes: 'Application.extendOffer';
    input: { id: string; version: number; details: { offer: { notes?: string } } };
    output: { decision: DecisionItem; pipeline: PositionPipeline[] };
    rules: ['onlyPositionManagerDecides', 'stageSequenceEnforced', 'finalStagesAreTerminal'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Hires the candidate of an application in offer, closing the position when its headcount is filled.
   * Input: applicationId: the application in offer to hire; version: optimistic concurrency check.
   * Processing: Refuses unless the signed-in user is the position’s hiring manager (onlyPositionManagerDecides), the application is in offer (stageSequenceEnforced, finalStagesAreTerminal), the version matches, and the position is open with remaining openings (hireRequiresRemainingHeadcount). In one transaction moves offer → hired (engine records hiredAt, decidedBy, stageChangedAt) and, if hires now reach headcount, closes the job position (closePositionWhenHeadcountFilled). Remaining openings are recomputed (remainingOpeningsCalculation), never stored.
   * Output: decisions: the whole inbox again, because the hired item leaves it and the remaining openings of other items of the same position change; pipeline: refreshed per-position summary.
   */
  'hiringPipeline.hiring_manager_home.hireCandidate': {
    kind: 'cmd';
    writes: 'Application.hire';
    input: { id: string; version: number };
    output: { decisions: DecisionItem[]; pipeline: PositionPipeline[] };
    rules: ['onlyPositionManagerDecides', 'hireRequiresRemainingHeadcount', 'closePositionWhenHeadcountFilled', 'stageSequenceEnforced', 'finalStagesAreTerminal', 'remainingOpeningsCalculation'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Sends back an interviewed or offered application by declining it with a reason.
   * Input: applicationId: the application to decline; version: optimistic concurrency check; reason: why the application does not move forward (required).
   * Processing: Refuses without a reason (rejectionRequiresReason) or when the application is already hired or rejected (finalStagesAreTerminal); only screening, interview or offer may be rejected (stageSequenceEnforced); checks the version and that the application belongs to her positions. Moves to rejected, recording the reason; the engine records rejectedAt and stageAtRejection. Recomputes the pipeline.
   * Output: applicationId: the item to remove from the inbox; pipeline: refreshed per-position summary.
   */
  'hiringPipeline.hiring_manager_home.sendBack': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { id: string; pipeline: PositionPipeline[] };
    rules: ['rejectionRequiresReason', 'finalStagesAreTerminal', 'stageSequenceEnforced'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
}
