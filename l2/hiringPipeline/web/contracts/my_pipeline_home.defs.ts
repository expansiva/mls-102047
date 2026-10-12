/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/my_pipeline_home.defs.ts" enhancement="_blank"/>

/** Application details the page shows: stage timestamps and the derived activity and days in pipeline. */
export interface ApplicationDetailsView {
  details: {
    interviewStartedAt?: string;
    offerExtendedAt?: string;
    readonly isActive: boolean;
    readonly daysInPipeline: number;
  };
}

export interface CandidateIdentificationView {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface CandidateHiringPipelineView {
  details: {
    hiringPipeline: {
      source: 'referral' | 'jobBoard' | 'linkedIn' | 'careerSite' | 'agency' | 'event' | 'other';
    };
  };
}

export interface CandidateDetailsView {
  identification: CandidateIdentificationView;
  hiringPipeline?: CandidateHiringPipelineView;
}

/** The candidate behind an application, limited to the fields the hiring manager may see. */
export interface CandidateView {
  details: CandidateDetailsView;
}

export interface CandidateEmailContactChannelView {
  details: {
    contactChannel: {
      value: string;
    };
  };
}

export interface CandidateEmailDetailsView {
  contactChannel: CandidateEmailContactChannelView;
}

export interface CandidateEmailView {
  details: CandidateEmailDetailsView;
}

export interface JobPositionRefDetails {
  details: {
    headcount: number;
    readonly remainingOpenings: number;
  };
}

/** The position of an application with its headcount and remaining openings. */
export interface JobPositionRef {
  id: string;
  title: string;
  details: JobPositionRefDetails;
}

/** An application waiting for the hiring manager’s decision (interview or offer), with candidate, e-mail and position. */
export interface WaitingApplication {
  id: string;
  version: number;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  jobPositionId: string;
  candidateId: string;
  details: ApplicationDetailsView;
  candidate: CandidateView;
  candidateEmail?: CandidateEmailView;
  jobPosition: JobPositionRef;
}

/** Derived JobPosition.details.applicationsByStage: count of a position’s applications in each stage. */
export interface ApplicationsByStage {
  readonly screening: number;
  readonly interview: number;
  readonly offer: number;
  readonly hired: number;
  readonly rejected: number;
}

export interface PositionSummaryDetails {
  details: {
    headcount: number;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly isFilled: boolean;
  };
  applicationsByStage: ApplicationsByStage;
}

/** One of the hiring manager’s positions with its progress toward headcount. */
export interface PositionSummary {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  openedAt: string;
  details: PositionSummaryDetails;
}

/** An active application of the hiring manager’s positions with its days in pipeline. */
export interface ActiveApplication {
  id: string;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  jobPositionId: string;
  details: ApplicationDetailsView;
  candidate: CandidateView;
  jobPosition: JobPositionRef;
}

export interface HiringManagerIdentificationView {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface HiringManagerDetailsView {
  identification: HiringManagerIdentificationView;
}

export interface HiringManagerView {
  id: string;
  details: HiringManagerDetailsView;
}

export interface My_pipeline_homeContracts {
  /**
   * Purpose: Loads the whole hiring manager home in one call: the decisions waiting for them, their positions’ progress and their active applications.
   * Input: No input; the signed-in hiring manager is resolved from the login (HiringManager locate.byLogin).
   * Processing: Resolve the signed-in hiring manager and list their positions by JobPosition.hiringManagerId (hiringManagerSeesOwnPositions), ordered by openedAt descending. For each position compute hiresSoFar and remainingOpenings = max(headcount - hiresSoFar, 0) (remainingOpeningsCalculated), applicationsByStage by counting applications per status, and isFilled when hiresSoFar >= headcount (positionClosesWhenHeadcountFilled). waitingForMe: applications of those positions in status interview or offer, ordered by appliedAt ascending, hydrated with candidate name and source, candidate e-mail (HasContact) and position title/headcount/remainingOpenings in batch. waitingOfferDecisions counts interview items and waitingHireConfirmations counts offer items. activeApplications: applications of those positions in screening, interview or offer (applicationActiveWhileInPipeline), ordered by daysInPipeline descending, capped at the 20 longest; activeApplicationsCount is the full count. daysInPipeline and isActive are computed on read (daysInPipelineCalculated), never stored.
   * Output: Hiring manager name, the waiting list with its two counters, position summaries with computed indicators (including applicationsByStage per stage) and the longest-running active applications with their total, already shaped for both organisms.
   */
  'hiringPipeline.my_pipeline_home.getMyPipelineHome': {
    kind: 'qry';
    input: {};
    output: { hiringManager: HiringManagerView; waitingForMe: WaitingApplication[]; readonly waitingOfferDecisions: number; readonly waitingHireConfirmations: number; positions: PositionSummary[]; activeApplications: ActiveApplication[]; readonly activeApplicationsCount: number };
    rules: ['hiringManagerSeesOwnPositions', 'applicationActiveWhileInPipeline', 'daysInPipelineCalculated', 'remainingOpeningsCalculated', 'positionClosesWhenHeadcountFilled'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates', 'managerCandidateEmails', 'managerSelf']; scope: 'own' };
  };
  /**
   * Purpose: Moves an interviewed application to offer on behalf of the position’s hiring manager.
   * Input: id and version of the application (version for optimistic concurrency).
   * Processing: Load the application and its position; refuse unless the signed-in user is the position’s hiring manager (onlyPositionHiringManagerDecides, hiringManagerSeesOwnPositions) and the status is interview. Run the extendOffer transition, recording details.offerExtendedAt. Recompute the position’s applicationsByStage and the waiting counters; daysInPipeline is computed, not stored.
   * Output: The updated application in both list shapes (it stays waiting, now as an offer), the updated position summary and the new waiting counters, so the page redraws without reloading.
   */
  'hiringPipeline.my_pipeline_home.extendOffer': {
    kind: 'cmd';
    writes: 'Application.extendOffer';
    input: { id: string; version: number };
    output: { application: WaitingApplication; activeApplication: ActiveApplication; position: PositionSummary; readonly waitingOfferDecisions: number; readonly waitingHireConfirmations: number };
    rules: ['onlyPositionHiringManagerDecides', 'hiringManagerSeesOwnPositions'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates', 'managerCandidateEmails', 'managerSelf']; scope: 'own' };
  };
  /**
   * Purpose: Declines an application waiting for the hiring manager, closing it with a reason.
   * Input: id and version of the application; reason is the rejection reason typed by the hiring manager.
   * Processing: Refuse unless the application belongs to one of the signed-in hiring manager’s positions (hiringManagerSeesOwnPositions). Refuse when the status is not screening, interview or offer, or when the reason is empty (rejectionRequiresReason). Run the reject transition recording rejection.reason, rejection.rejectedAt (now) and rejection.stageAtRejection (current stage). Recompute the position’s applicationsByStage and the waiting counters.
   * Output: The rejected application (removed from the waiting and active lists by id), the updated position summary and the new counters.
   */
  'hiringPipeline.my_pipeline_home.declineApplication': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { application: WaitingApplication; activeApplication: ActiveApplication; position: PositionSummary; readonly waitingOfferDecisions: number; readonly waitingHireConfirmations: number };
    rules: ['rejectionRequiresReason', 'hiringManagerSeesOwnPositions'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates', 'managerCandidateEmails', 'managerSelf']; scope: 'own' };
  };
  /**
   * Purpose: Confirms an accepted offer as hired and closes the position when its headcount is filled.
   * Input: id and version of the application in offer.
   * Processing: Refuse unless the signed-in user is the position’s hiring manager (onlyPositionHiringManagerDecides) and the status is offer. Refuse unless the position is open and has remainingOpenings >= 1 (hireWithinRemainingHeadcount). In one transaction run the hire transition recording details.hiredAt, recompute hiresSoFar and remainingOpenings (remainingOpeningsCalculated), and when hiresSoFar reaches headcount run closePosition recording details.closedAt (closePositionWhenHeadcountFilled, positionClosesWhenHeadcountFilled).
   * Output: The hired application (removed from waiting and active lists), the updated position summary with new hires, remaining openings, filled flag and status, and the new counters.
   */
  'hiringPipeline.my_pipeline_home.confirmHire': {
    kind: 'cmd';
    writes: 'Application.hire';
    input: { id: string; version: number };
    output: { application: WaitingApplication; activeApplication: ActiveApplication; position: PositionSummary; readonly waitingOfferDecisions: number; readonly waitingHireConfirmations: number };
    rules: ['onlyPositionHiringManagerDecides', 'hireWithinRemainingHeadcount', 'positionClosesWhenHeadcountFilled', 'closePositionWhenHeadcountFilled', 'remainingOpeningsCalculated'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates', 'managerCandidateEmails', 'managerSelf']; scope: 'own' };
  };
}
