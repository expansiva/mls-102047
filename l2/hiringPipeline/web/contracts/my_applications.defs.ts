/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/my_applications.defs.ts" enhancement="_blank"/>

/** Identification of the candidate visible to the hiring manager. */
export interface CandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Candidate details shown in a list row. */
export interface CandidateSummaryDetails {
  identification: CandidateIdentification;
}

/** The candidate of an application, as shown in the list. */
export interface CandidateSummary {
  details: CandidateSummaryDetails;
}

/** Derived values of a list row. */
export interface ApplicationListItemDetails {
  details: {
    readonly daysInStage: number;
    readonly isActive: boolean;
  };
}

/** One application row in the hiring manager’s list. */
export interface ApplicationListItem {
  id: string;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  candidateId: string;
  jobPositionId: string;
  readonly stageChangedAt: string;
  details: ApplicationListItemDetails;
  candidate: CandidateSummary;
}

/** Contact summary of the candidate. */
export interface CandidateBase {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** Module namespace of the candidate. */
export interface CandidateHiringPipeline {
  details: {
    hiringPipeline: {
      resumeLink: string;
      source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other';
    };
  };
}

/** Candidate details shown in the review. */
export interface CandidateProfileDetails {
  identification: CandidateIdentification;
  base: CandidateBase;
  hiringPipeline: CandidateHiringPipeline;
}

/** The candidate of the reviewed application. */
export interface CandidateProfile {
  details: CandidateProfileDetails;
}

/** Move to interview. */
export interface ApplicationInterview {
  details: {
    interview: {
      readonly movedAt?: string;
      readonly movedBy?: string;
    };
  };
}

/** Offer decision. */
export interface ApplicationOffer {
  details: {
    offer: {
      readonly extendedAt?: string;
      readonly decidedBy?: string;
      notes?: string;
    };
  };
}

/** Hire decision. */
export interface ApplicationHire {
  details: {
    hire: {
      readonly hiredAt?: string;
      readonly decidedBy?: string;
    };
  };
}

/** Rejection record. */
export interface ApplicationRejection {
  details: {
    rejection: {
      reason?: string;
      readonly rejectedAt?: string;
      readonly stageAtRejection?: 'screening' | 'interview' | 'offer';
    };
  };
}

/** Details of the reviewed application, with its stage history and the position’s remaining openings. */
export interface ApplicationDetailDetails {
  details: {
    notes?: string;
    readonly isActive: boolean;
    readonly daysInStage: number;
    readonly remainingOpenings: number;
  };
  interview?: ApplicationInterview;
  offer?: ApplicationOffer;
  hire?: ApplicationHire;
  rejection?: ApplicationRejection;
}

/** The selected application with its candidate, history and headcount, as review, decision and history show it. */
export interface ApplicationDetail {
  id: string;
  version: number;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  jobPositionId: string;
  candidateId: string;
  readonly appliedAt: string;
  readonly stageChangedAt: string;
  details: ApplicationDetailDetails;
  candidate: CandidateProfile;
}

export interface My_applicationsContracts {
  /**
   * Purpose: Loads the page of applications to the positions the signed-in hiring manager manages, and re-runs when she searches, filters by stage or position, or asks for the next page.
   * Input: page and pageSize: the page requested; search: part of the application number or of the candidate’s name; status: optional stage filter; jobPositionId: optional position filter, e.g. from a link of my_positions.
   * Processing: Scopes applications to job positions whose hiring manager is the signed-in user (grant hiringManagerMyApplications). Applies search on code and candidate name (read from the candidate master record), the stage and position filters, and orders by stageChangedAt ascending so the longest-waiting come first. Computes daysInStage from stageChangedAt up to today (daysInStageCalculation) and isActive from the stage (applicationActiveCalculation); neither is stored.
   * Output: Paginated rows { items, page, pageSize, hasMore } with number, stage, candidate name, position, stage change date, days in stage and active flag, ready for the list.
   */
  'hiringPipeline.my_applications.listMyApplications': {
    kind: 'qry';
    input: { search?: string; status?: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'; jobPositionId?: string; page: number; pageSize: number };
    output: { applications: { items: ApplicationListItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['daysInStageCalculation', 'applicationActiveCalculation'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Opens the application the hiring manager selected, with everything review, decision and history need in one call.
   * Input: applicationId: the application selected in the list or given in the URL.
   * Processing: Reads the application by id, refusing it when its position is not managed by the signed-in user. Joins the candidate’s name, contacts, resume link and source from the master record (only fields allowed by hiringManagerCandidates). Computes remainingOpenings as the position headcount minus its hired applications, never below zero (hiresSoFarCalculation, remainingOpeningsCalculation), plus daysInStage and isActive; all computed, never stored.
   * Output: The application with version, stage, dates, notes, interview, offer, hire and rejection history, remaining openings and candidate profile, so the page decides with the headcount in view.
   */
  'hiringPipeline.my_applications.getMyApplication': {
    kind: 'qry';
    input: { applicationId: string };
    output: { application: ApplicationDetail };
    rules: ['remainingOpeningsCalculation', 'hiresSoFarCalculation', 'daysInStageCalculation', 'applicationActiveCalculation'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Extends an offer to an interviewed candidate.
   * Input: applicationId and version: the application and the version the page holds; offerNotes: what the hiring manager wants recorded about the offer.
   * Processing: Refuses when the signed-in user is not the hiring manager of the application’s position (onlyPositionManagerDecides), when the stage is not interview (stageSequenceEnforced, finalStagesAreTerminal) or when the version is stale. Runs transition extendOffer to offer, storing the offer notes; the engine records extendedAt, decidedBy and stageChangedAt.
   * Output: The updated application detail and its list row, so review, decision, history and list redraw without another call.
   */
  'hiringPipeline.my_applications.extendOffer': {
    kind: 'cmd';
    writes: 'Application.extendOffer';
    input: { id: string; version: number; details: { offer: { notes?: string } } };
    output: { application: ApplicationDetail; listItem: ApplicationListItem };
    rules: ['onlyPositionManagerDecides', 'stageSequenceEnforced', 'finalStagesAreTerminal'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Hires the candidate of an application in the offer stage.
   * Input: applicationId and version: the application and the version the page holds.
   * Processing: Refuses when the user is not the position’s hiring manager (onlyPositionManagerDecides), when the stage is not offer (stageSequenceEnforced, finalStagesAreTerminal), when the version is stale, or when the position is not open or its headcount is filled (hireRequiresRemainingHeadcount). In one transaction runs transition hire and, when hires so far reach the headcount (hiresSoFarCalculation, headcountFilledCalculation), closes the position (closePositionWhenHeadcountFilled). Recomputes remainingOpenings for the output.
   * Output: The updated application detail with the new remaining openings and its list row, so the page redraws without another call.
   */
  'hiringPipeline.my_applications.hireCandidate': {
    kind: 'cmd';
    writes: 'Application.hire';
    input: { id: string; version: number };
    output: { application: ApplicationDetail; listItem: ApplicationListItem };
    rules: ['onlyPositionManagerDecides', 'hireRequiresRemainingHeadcount', 'closePositionWhenHeadcountFilled', 'stageSequenceEnforced', 'finalStagesAreTerminal', 'remainingOpeningsCalculation', 'hiresSoFarCalculation', 'headcountFilledCalculation'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Sends the application back as declined, closing it with the hiring manager’s rejection reason.
   * Input: applicationId and version: the application and the version the page holds; rejectionReason: why the application does not move forward.
   * Processing: Refuses an empty reason (rejectionRequiresReason), a stage other than screening, interview or offer (finalStagesAreTerminal, stageSequenceEnforced), a stale version, or an application outside the user’s positions. Runs transition reject; the engine records rejectedAt, stageAtRejection and stageChangedAt.
   * Output: The updated application detail and its list row, so the page redraws the rejected stage and history.
   */
  'hiringPipeline.my_applications.sendBackToReject': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { application: ApplicationDetail; listItem: ApplicationListItem };
    rules: ['rejectionRequiresReason', 'finalStagesAreTerminal', 'stageSequenceEnforced'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'own' };
  };
}
