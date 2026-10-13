/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/my_positions.defs.ts" enhancement="_blank"/>

/** Headcount figures of a position in the list. */
export interface PositionSummaryDetails {
  details: {
    headcount: number;
    readonly remainingOpenings: number;
  };
}

/** One row of the hiring manager’s positions list. */
export interface PositionSummary {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed';
  readonly openedAt: string;
  details: PositionSummaryDetails;
}

/** Headcount indicators of the chosen position, computed by the server. */
export interface PositionPipelineDetails {
  details: {
    headcount: number;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly headcountFilled: boolean;
  };
}

/** Header of the chosen position with its headcount indicators. */
export interface PositionPipeline {
  id: string;
  title: string;
  status: 'open' | 'closed';
  details: PositionPipelineDetails;
}

/** Identification of the candidate visible to the hiring manager. */
export interface CandidateIdentification {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Candidate details visible to the hiring manager. */
export interface CandidateDetails {
  identification: CandidateIdentification;
}

/** The candidate of an application, read from the master record. */
export interface ApplicationCandidate {
  details: CandidateDetails;
}

/** Derived state of an application in the pipeline. */
export interface PipelineApplicationDetails {
  details: {
    readonly daysInStage: number;
    readonly isActive: boolean;
  };
}

/** One application of the chosen position inside its stage group. */
export interface PipelineApplication {
  id: string;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly stageChangedAt: string;
  details: PipelineApplicationDetails;
  candidate: ApplicationCandidate;
}

/** Applications of the position in one stage, with their count. */
export interface StageGroup {
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly count: number;
  applications: PipelineApplication[];
}

/** When and by whom the hire was recorded. */
export interface HireInfo {
  details: {
    hire: {
      readonly hiredAt: string;
      readonly decidedBy: string;
    };
  };
}

/** Hire block of a hired application. */
export interface HireEventDetails {
  hire: HireInfo;
}

/** A hire recorded against the position, shown on its timeline. */
export interface HireEvent {
  id: string;
  readonly code: string;
  details: HireEventDetails;
  candidate: ApplicationCandidate;
}

/** Whether the headcount is filled. */
export interface PositionClosureDetails {
  details: {
    readonly headcountFilled: boolean;
  };
}

/** Timeline of the position: opening, hires and automatic closure. */
export interface PositionClosure {
  status: 'open' | 'closed';
  readonly openedAt: string;
  details: PositionClosureDetails;
  readonly closedAt?: string;
  hires: HireEvent[];
}

export interface My_positionsContracts {
  /**
   * Purpose: Lists the job positions the signed-in hiring manager manages, so she can find and choose one, with remaining openings visible at a glance.
   * Input: page and pageSize: the page of the list requested; search: optional text matched against part of the title or department; status: optional filter open or closed; department: optional exact department filter.
   * Processing: Resolves the signed-in hiring manager from the session and filters positions by JobPosition.hiringManagerId (grant hiringManagerMyPositions, assigned scope). Applies search, status and department filters and orders by openedAt descending. For each position computes remainingOpenings as headcount minus the count of its hired applications, never below zero (hiresSoFarCalculation, remainingOpeningsCalculation); derived values are computed at read time, never stored.
   * Output: A paginated list { items, page, pageSize, hasMore } of positions with id, title, department, status, openedAt, headcount and remainingOpenings; the id is used to load the chosen position.
   */
  'hiringPipeline.my_positions.myPositionsList': {
    kind: 'qry';
    input: { search?: string; status?: 'open' | 'closed'; department?: string; page: number; pageSize: number };
    output: { positions: { items: PositionSummary[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['remainingOpeningsCalculation', 'hiresSoFarCalculation'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyPositions', 'hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'assigned' };
  };
  /**
   * Purpose: Loads everything the page shows for the chosen position in one call: headcount indicators, applications grouped by stage, and the closure timeline.
   * Input: positionId: id of the position selected in the list.
   * Processing: Reads the position and refuses it when its hiringManagerId is not the signed-in hiring manager. Lists its applications by jobPositionId with the candidate name from the master record. Computes hiresSoFar as the count of hired applications (hiresSoFarCalculation), remainingOpenings as headcount minus hiresSoFar never below zero (remainingOpeningsCalculation) and headcountFilled when hiresSoFar >= headcount (headcountFilledCalculation). For each application computes daysInStage as days from stageChangedAt to today (daysInStageCalculation) and isActive for screening, interview or offer (applicationActiveCalculation). Groups applications by stage in the order screening, interview, offer, hired, rejected, each with its count, ordered by stageChangedAt. Builds the timeline from openedAt, the hired applications ordered by hiredAt, and, when the position is closed, closedAt as the hiredAt of the hire that brought hires to the headcount, since the position closes in the same operation as that hire (closePositionWhenHeadcountFilled). All derived values are computed, never stored.
   * Output: position: header with headcount figures; stages: applications grouped by stage with counts, each with candidate name and days in stage, so the manager knows which ones need her decision and can open one on My applications; closure: opening date, hires and automatic closure moment.
   */
  'hiringPipeline.my_positions.myPositionDetail': {
    kind: 'qry';
    input: { positionId: string };
    output: { position: PositionPipeline; stages: StageGroup[]; closure: PositionClosure };
    rules: ['hiresSoFarCalculation', 'remainingOpeningsCalculation', 'headcountFilledCalculation', 'daysInStageCalculation', 'applicationActiveCalculation', 'closePositionWhenHeadcountFilled'];
    access: { actors: ['hiringManager']; grants: ['hiringManagerMyPositions', 'hiringManagerMyApplications', 'hiringManagerCandidates']; scope: 'assigned' };
  };
}
