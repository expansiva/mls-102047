/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/applications.defs.ts" enhancement="_blank"/>

/** One row of the recruiter’s application list, with candidate and position names already resolved and the days in the current stage computed. */
export interface ApplicationRow {
  id: string;
  version: number;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly appliedAt: string;
  readonly stageChangedAt: string;
  details: {
    readonly daysInStage: number;
    readonly isActive: boolean;
  };
  candidateId: string;
  jobPositionId: string;
  candidate: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  jobPosition: {
    title: string;
    department: string;
  };
}

/** The selected application in full: stage, dates, notes, stage details, candidate with e-mail, resume link and source, position with status and hiring manager. */
export interface ApplicationReview {
  id: string;
  version: number;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly appliedAt: string;
  readonly stageChangedAt: string;
  details: {
    readonly daysInStage: number;
    readonly isActive: boolean;
    notes?: string;
    readonly remainingOpenings: number;
    interview: {
      readonly movedAt?: string;
    };
    offer: {
      readonly extendedAt?: string;
      notes?: string;
    };
    hire: {
      readonly hiredAt?: string;
    };
    rejection: {
      reason?: string;
      readonly rejectedAt?: string;
      readonly stageAtRejection?: 'screening' | 'interview' | 'offer';
    };
  };
  candidateId: string;
  candidate: {
    details: {
      identification: {
        name: string;
      };
      hiringPipeline: {
        resumeLink: string;
        source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other';
      };
    };
  };
  candidateEmail: {
    details: {
      contactChannel: {
        value?: string;
      };
    };
  };
  jobPositionId: string;
  jobPosition: {
    title: string;
    department: string;
    status: 'open' | 'closed';
  };
  hiringManager: {
    details: {
      identification: {
        name: string;
      };
    };
  };
}

/** One step of the application’s pipeline: the stage entered, when, and who decided it. */
export interface StageHistoryEntry {
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly at: string;
  readonly decidedBy?: string;
  details: {
    rejection: {
      reason?: string;
      readonly stageAtRejection?: 'screening' | 'interview' | 'offer';
    };
  };
}

/** A registered candidate the recruiter can pick in the new application form. */
export interface CandidateOption {
  id: string;
  details: {
    identification: {
      name: string;
    };
  };
  candidateEmail: {
    details: {
      contactChannel: {
        value?: string;
      };
    };
  };
}

/** An open job position with remaining openings, offered in the new application form. */
export interface PositionOption {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  details: {
    readonly remainingOpenings: number;
  };
}

export interface ApplicationsContracts {
  /**
   * Purpose: Loads the recruiter’s work queue of applications across the organization, one page at a time, so she can find the one to work on and spot stalled ones.
   * Input: page and pageSize: the page requested. search: part of the application number. status: only applications in this stage. jobPositionId / candidateId: only applications of this position or candidate. activeOnly: only applications still in screening, interview or offer. sortBy: order by applied date (newest first, default) or by stage-change date (oldest first, to surface stalled ones).
   * Processing: Filters applications of the organization by the given criteria, joins the candidate name from the candidate master record and the position title and department. Computes daysInStage per row as the days from stageChangedAt up to today (daysInStageCalculation) and isActive as status in screening, interview or offer (applicationActiveCalculation); both are computed, never stored.
   * Output: A page { items, page, pageSize, hasMore } of ApplicationRow ready for the list, with number, candidate, position, stage and days in stage.
   */
  'hiringPipeline.applications.listApplications': {
    kind: 'qry';
    input: { search?: string; status?: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'; jobPositionId?: string; candidateId?: string; activeOnly?: boolean; sortBy?: 'appliedAt' | 'stageChangedAt'; page: number; pageSize: number };
    output: { applications: { items: ApplicationRow[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['daysInStageCalculation', 'applicationActiveCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Opens the application the recruiter selected in the list, with everything needed to review it and act on it, and its stage history.
   * Input: applicationId: the application selected in the list.
   * Processing: Reads the application by id, its candidate (name, resume link, source) and the candidate’s e-mail contact channel, its job position (title, department, status) and the position’s hiring manager name. Computes daysInStage up to today (daysInStageCalculation), isActive (applicationActiveCalculation) and remainingOpenings as headcount minus hired applications, never below zero (remainingOpeningsCalculation). Builds the history in chronological order: screening at appliedAt, interview at interview.movedAt by movedBy, offer at offer.extendedAt by offer.decidedBy, hired at hire.hiredAt by hire.decidedBy, rejected at rejection.rejectedAt with reason and stageAtRejection; only steps that happened are included.
   * Output: application: the full review record for detail and actions (status and isActive drive which actions are enabled). history: the timeline entries for the stage history.
   */
  'hiringPipeline.applications.getApplication': {
    kind: 'qry';
    input: { applicationId: string };
    output: { application: ApplicationReview; history: StageHistoryEntry[] };
    rules: ['daysInStageCalculation', 'applicationActiveCalculation', 'remainingOpeningsCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Finds registered candidates as the recruiter types, to choose who is applying.
   * Input: search: part of the candidate’s name or e-mail address.
   * Processing: Searches active candidates tagged hiringPipeline.Candidate by name or by linked e-mail, returning at most 20 matches ordered by name, each with its e-mail.
   * Output: candidates: the matches for the candidate picker; the e-mail tells apart people with the same name.
   */
  'hiringPipeline.applications.searchCandidates': {
    kind: 'qry';
    input: { search: string };
    output: { candidates: CandidateOption[] };
    rules: [];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Finds the open positions a candidate can apply to.
   * Input: search: optional part of the position title or department.
   * Processing: Returns only positions with status open (applicationOnlyToOpenPosition, closedPositionAcceptsNoApplications), matching the search, at most 20, ordered by title. remainingOpenings is computed as headcount minus hires so far, never below zero (remainingOpeningsCalculation).
   * Output: positions: the choices for the position picker with their remaining openings.
   */
  'hiringPipeline.applications.searchOpenPositions': {
    kind: 'qry';
    input: { search?: string };
    output: { positions: PositionOption[] };
    rules: ['applicationOnlyToOpenPosition', 'closedPositionAcceptsNoApplications', 'remainingOpeningsCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Records a candidate’s application to an open position.
   * Input: candidateId: the chosen candidate. jobPositionId: the chosen open position. notes: optional recruiter notes.
   * Processing: Refuses when the position is not open (applicationOnlyToOpenPosition, closedPositionAcceptsNoApplications) and when the candidate already has an application to that position (onePerCandidatePerPosition). Creates the application in screening (applicationStartsInScreening); the platform issues the application number, appliedAt and stageChangedAt.
   * Output: application: the new list row, inserted at the top of the list without reloading it.
   */
  'hiringPipeline.applications.recordApplication': {
    kind: 'cmd';
    writes: 'Application.create';
    input: { candidateId: string; jobPositionId: string; details: { notes?: string } };
    output: { application: ApplicationRow };
    rules: ['applicationOnlyToOpenPosition', 'closedPositionAcceptsNoApplications', 'onePerCandidatePerPosition', 'applicationStartsInScreening'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Moves a screened application to interview, handing it to the position’s hiring manager for the offer decision.
   * Input: applicationId and version: the application being reviewed and the version the recruiter saw.
   * Processing: Refuses when the version differs. Allows only screening to interview (stageSequenceEnforced) and refuses hired or rejected applications (finalStagesAreTerminal). The transition records interview.movedAt and movedBy (the signed-in recruiter) and stageChangedAt; daysInStage and isActive are recomputed on read, never stored.
   * Output: application and history: the redrawn review and timeline; row: the updated list row, replaced in place.
   */
  'hiringPipeline.applications.moveToInterview': {
    kind: 'cmd';
    writes: 'Application.advanceToInterview';
    input: { id: string; version: number };
    output: { application: ApplicationReview; history: StageHistoryEntry[]; row: ApplicationRow };
    rules: ['stageSequenceEnforced', 'finalStagesAreTerminal'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Rejects an active application with a reason, taking it out of the active pipeline.
   * Input: applicationId and version: the application and the version the recruiter saw. reason: why the application does not move forward.
   * Processing: Refuses when the version differs, when the reason is empty (rejectionRequiresReason), or when the application is already hired or rejected (finalStagesAreTerminal); rejection is allowed from screening, interview or offer (stageSequenceEnforced). Records the reason, rejectedAt, stageAtRejection (the stage it was in) and stageChangedAt.
   * Output: application and history: the redrawn review and timeline showing the rejection; row: the updated list row, replaced in place.
   */
  'hiringPipeline.applications.rejectApplication': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { application: ApplicationReview; history: StageHistoryEntry[]; row: ApplicationRow };
    rules: ['rejectionRequiresReason', 'finalStagesAreTerminal', 'stageSequenceEnforced'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates', 'recruiterHiringManagers']; scope: 'organization' };
  };
}
