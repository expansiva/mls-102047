/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/my_applications.defs.ts" enhancement="_blank"/>

/** Identification block of the candidate master record, limited to what the hiring manager may see. */
export interface CandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Candidate details shown on a list row. */
export interface CandidateRefDetails {
  identification: CandidateIdentification;
}

/** The candidate of a list row: name only. */
export interface CandidateRef {
  details: CandidateRefDetails;
}

/** The position of a list row: title only. */
export interface JobPositionRef {
  title: string;
}

/** Derived values shown on a list row. */
export interface ApplicationRowDetails {
  details: {
    readonly daysInPipeline: number;
    readonly isActive: boolean;
  };
}

/** One application of my positions in the queue, with its candidate and position. */
export interface ApplicationRow {
  id: string;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  jobPositionId: string;
  candidateId: string;
  details: ApplicationRowDetails;
  jobPosition: JobPositionRef;
  candidate: CandidateRef;
}

/** Rejection record of the application, present only once rejected. */
export interface ApplicationRejection {
  details: {
    rejection: {
      reason: string;
      rejectedAt: string;
      stageAtRejection: 'screening' | 'interview' | 'offer';
    };
  };
}

/** Stage timestamps, rejection and derived values of the application, used by the detail and the history timeline. */
export interface ApplicationViewDetails {
  details: {
    interviewStartedAt?: string;
    offerExtendedAt?: string;
    hiredAt?: string;
    readonly isActive: boolean;
    readonly daysInPipeline: number;
  };
  rejection?: ApplicationRejection;
}

/** Derived headcount figure of the position. */
export interface JobPositionViewDetails {
  details: {
    readonly remainingOpenings: number;
  };
}

/** The position of the selected application, with remaining openings so a hire is known to fit. */
export interface JobPositionView {
  id: string;
  title: string;
  status: 'open' | 'closed';
  details: JobPositionViewDetails;
}

/** Linked contact channels summary; the candidate’s e-mail is read from here. */
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
      source: 'referral' | 'jobBoard' | 'linkedIn' | 'careerSite' | 'agency' | 'event' | 'other';
    };
  };
}

/** Candidate details visible to the hiring manager. */
export interface CandidateViewDetails {
  identification: CandidateIdentification;
  base: CandidateBase;
  hiringPipeline: CandidateHiringPipeline;
}

/** The candidate of the selected application: name, e-mail (contacts) and source. */
export interface CandidateView {
  id: string;
  details: CandidateViewDetails;
}

/** The selected application with its candidate, position and stage history; returned by the detail query and by every decision command. */
export interface ApplicationView {
  id: string;
  version: number;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  jobPositionId: string;
  candidateId: string;
  details: ApplicationViewDetails;
  jobPosition: JobPositionView;
  candidate: CandidateView;
}

export interface My_applicationsContracts {
  /**
   * Purpose: Loads the hiring manager’s application queue: applications to the positions they manage, with candidate name, position title and days in pipeline, plus the counts behind the ’interviewed’ and ’accepted offers’ quick filters.
   * Input: status: optional stage filter (quick filters use ’interview’ and ’offer’); activeOnly: when true only applications still in screening, interview or offer; page/pageSize: paging of the queue.
   * Processing: Resolves the signed-in hiring manager and restricts to applications whose job position has hiringManagerId = that manager (hiringManagerSeesOwnPositions). Applies the stage and active filters, orders by appliedAt descending, hydrates job position title and candidate name in batch (listByForeignKey / read.mdmRecord). daysInPipeline is computed (daysInPipelineCalculated: from appliedAt to today, or to hiredAt/rejectedAt) and isActive computed from the stage (applicationActiveWhileInPipeline); neither is stored. interviewCount and offerCount are counts of my applications in interview and in offer, independent of the current filter.
   * Output: A page { items, page, pageSize, hasMore } of ApplicationRow for the list, and the two counts shown on the quick filters.
   */
  'hiringPipeline.my_applications.listMyApplications': {
    kind: 'qry';
    input: { status?: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'; details: { isActive?: boolean }; page: number; pageSize: number };
    output: { applications: { items: ApplicationRow[]; page: number; pageSize: number; hasMore: boolean }; readonly interviewCount: number; readonly offerCount: number };
    rules: ['hiringManagerSeesOwnPositions', 'daysInPipelineCalculated', 'applicationActiveWhileInPipeline'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Opens the application picked in the queue (or arrived from a notification) with everything the detail, the decision buttons and the history need, in one call.
   * Input: applicationId: id of the selected application, from the list selection or the URL.
   * Processing: Reads the application by id and refuses it unless its job position belongs to the signed-in hiring manager (hiringManagerSeesOwnPositions). Joins the job position (title, status, remainingOpenings computed as headcount minus hired applications, never below zero — remainingOpeningsCalculated) and the candidate master record limited to the granted fields (name, contacts with the e-mail, source). daysInPipeline and isActive are computed, not stored. Stage timestamps and the rejection block feed the history timeline.
   * Output: ApplicationView: the record with version for the commands, candidate, position with remaining openings, and stage history fields.
   */
  'hiringPipeline.my_applications.getMyApplication': {
    kind: 'qry';
    input: { applicationId: string };
    output: { application: ApplicationView };
    rules: ['hiringManagerSeesOwnPositions', 'daysInPipelineCalculated', 'remainingOpeningsCalculated', 'applicationActiveWhileInPipeline'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Extends an offer to the interviewed candidate: moves the application from interview to offer.
   * Input: applicationId and version of the selected application (optimistic concurrency).
   * Processing: Runs transition extendOffer (interview → offer). Refuses unless the caller is the hiring manager assigned to the application’s job position (onlyPositionHiringManagerDecides) and the stage is interview; refuses on version mismatch. The engine records offerExtendedAt.
   * Output: The updated ApplicationView so the detail, actions and history redraw without a second call.
   */
  'hiringPipeline.my_applications.extendOffer': {
    kind: 'cmd';
    writes: 'Application.extendOffer';
    input: { id: string; version: number };
    output: { application: ApplicationView };
    rules: ['onlyPositionHiringManagerDecides'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Declines the application with a reason, closing it as rejected on behalf of the recruiter handoff.
   * Input: applicationId and version of the selected application; reason: the rejection reason typed by the hiring manager.
   * Processing: Checks the application belongs to one of the caller’s positions (hiringManagerSeesOwnPositions). Runs transition reject; refuses unless the stage is screening, interview or offer and the reason is non-empty (rejectionRequiresReason). The engine records rejectedAt and stageAtRejection with the reason.
   * Output: The updated ApplicationView, with the rejection block for the history timeline.
   */
  'hiringPipeline.my_applications.returnForRejection': {
    kind: 'cmd';
    writes: 'Application.reject';
    input: { id: string; version: number; details: { rejection: { reason: string } } };
    output: { application: ApplicationView };
    rules: ['rejectionRequiresReason', 'hiringManagerSeesOwnPositions'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates']; scope: 'own' };
  };
  /**
   * Purpose: Confirms the hire of an accepted offer: moves the application from offer to hired, closing the position when the headcount is filled.
   * Input: applicationId and version of the selected application.
   * Processing: Refuses unless the caller is the position’s assigned hiring manager (onlyPositionHiringManagerDecides), the stage is offer, and the position is open with at least one remaining opening (hireWithinRemainingHeadcount). In one transaction it writes the application as hired (hiredAt recorded) and, when hired applications now reach the headcount, runs closePosition recording closedAt (positionClosesWhenHeadcountFilled, closePositionWhenHeadcountFilled). remainingOpenings is recomputed, never stored.
   * Output: The updated ApplicationView with the position’s new status and remaining openings, so the page confirms the result immediately.
   */
  'hiringPipeline.my_applications.markHired': {
    kind: 'cmd';
    writes: 'Application.hire';
    input: { id: string; version: number };
    output: { application: ApplicationView };
    rules: ['onlyPositionHiringManagerDecides', 'hireWithinRemainingHeadcount', 'positionClosesWhenHeadcountFilled', 'closePositionWhenHeadcountFilled', 'remainingOpeningsCalculated'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates']; scope: 'own' };
  };
}
