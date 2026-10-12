/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/my_positions.defs.ts" enhancement="_blank"/>

/** Headcount numbers of a position in the list, computed by the server. */
export interface MyPositionRowDetails {
  details: {
    headcount: number;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly isFilled: boolean;
  };
}

/** One position the signed-in hiring manager manages, as a list row. */
export interface MyPositionRow {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  openedAt: string;
  details: MyPositionRowDetails;
}

/** Description and headcount numbers of the selected position. */
export interface PositionDetailDetails {
  details: {
    description: string;
    headcount: number;
    closedAt?: string;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly isFilled: boolean;
  };
}

/** Identification of the position’s hiring manager. */
export interface HiringManagerIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Details of the position’s hiring manager. */
export interface HiringManagerDetails {
  identification: HiringManagerIdentification;
}

/** The hiring manager shown on the position. */
export interface PositionHiringManager {
  details: HiringManagerDetails;
}

/** The selected position with its numbers and hiring manager name. */
export interface PositionDetail {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  openedAt: string;
  details: PositionDetailDetails;
  hiringManager: PositionHiringManager;
}

/** Identification of the candidate behind an application. */
export interface CandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Details of the candidate behind an application. */
export interface CandidateDetails {
  identification: CandidateIdentification;
}

/** Candidate of an application, only the name the hiring manager may see. */
export interface ApplicationCandidate {
  details: CandidateDetails;
}

/** Server-computed pipeline indicators of an application. */
export interface PipelineApplicationDetails {
  details: {
    readonly daysInPipeline: number;
    readonly isActive: boolean;
  };
}

/** One application of the selected position. */
export interface PipelineApplication {
  id: string;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  details: PipelineApplicationDetails;
  candidate: ApplicationCandidate;
}

/** Applications of the position in one stage, with the stage count. */
export interface StageGroup {
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly count: number;
  applications: PipelineApplication[];
}

/** One event in the position’s history: opened, or closed automatically when hires reached the headcount. */
export interface PositionEvent {
  status: 'open' | 'closed';
  readonly occurredAt: string;
  readonly automatic: boolean;
  details: {
    headcount: number;
    readonly hiresSoFar: number;
  };
}

export interface My_positionsContracts {
  /**
   * Purpose: Loads every job position the signed-in hiring manager manages, with its headcount numbers, so the page can show which ones still need hires.
   * Input: No input; the hiring manager is resolved from the session (login).
   * Processing: Resolves the signed-in hiring manager and lists positions whose hiringManagerId points at them (hiringManagerSeesOwnPositions), ordered by openedAt descending. For each position computes hiresSoFar as the count of its applications in hired and remainingOpenings as headcount minus hiresSoFar, never below zero (remainingOpeningsCalculated), and isFilled when hiresSoFar >= headcount (positionClosesWhenHeadcountFilled). Derived values are computed with batched counts, never stored. Not paged: a hiring manager manages a small number of positions.
   * Output: The list of positions with title, department, status, opening date and details (headcount, hires so far, remaining openings, filled), ready for the overview list.
   */
  'hiringPipeline.my_positions.listMyPositions': {
    kind: 'qry';
    input: {};
    output: { positions: MyPositionRow[] };
    rules: ['hiringManagerSeesOwnPositions', 'remainingOpeningsCalculated', 'positionClosesWhenHeadcountFilled'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates', 'managerSelf']; scope: 'own' };
  };
  /**
   * Purpose: Loads the selected position’s detail, its applications grouped by stage and its history in one call when the hiring manager picks a position.
   * Input: jobPositionId: id of the position selected in the list.
   * Processing: Refuses the position if it is not assigned to the signed-in hiring manager (hiringManagerSeesOwnPositions). Reads the position and the hiring manager name. Computes hiresSoFar, remainingOpenings (remainingOpeningsCalculated) and isFilled (positionClosesWhenHeadcountFilled). Lists the position’s applications ordered by appliedAt, hydrating candidate names in one batch, and groups them into the five stages screening, interview, offer, hired, rejected, each with its count (applicationsByStage). For each application computes daysInPipeline from appliedAt to today or to hiredAt/rejectedAt (daysInPipelineCalculated) and isActive while in screening, interview or offer (applicationActiveWhileInPipeline). Builds the history: an ’open’ event at openedAt and, if closedAt is set, a ’closed’ event marked automatic because hires reached the headcount (closePositionWhenHeadcountFilled). Nothing is stored.
   * Output: position (detail with numbers and hiring manager name), stageGroups (always five stages, with counts and applications) and history (timeline events), so the detail and timeline render without further calls.
   */
  'hiringPipeline.my_positions.getPositionPipeline': {
    kind: 'qry';
    input: { jobPositionId: string };
    output: { position: PositionDetail; stageGroups: StageGroup[]; history: PositionEvent[] };
    rules: ['hiringManagerSeesOwnPositions', 'remainingOpeningsCalculated', 'positionClosesWhenHeadcountFilled', 'closePositionWhenHeadcountFilled', 'daysInPipelineCalculated', 'applicationActiveWhileInPipeline'];
    access: { actors: ['hiringManager']; grants: ['managerOwnPipeline', 'managerCandidates', 'managerSelf']; scope: 'own' };
  };
}
