/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/job_positions.defs.ts" enhancement="_blank"/>

/** Identification of a hiring manager visible to the recruiter. */
export interface HiringManagerIdentification {
  details: {
    identification: {
      name: string;
      readonly status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

export interface HiringManagerDetails {
  identification: HiringManagerIdentification;
}

/** A hiring manager as the page shows and picks her: id and name, with status when choosing. */
export interface HiringManagerRef {
  id: string;
  details: HiringManagerDetails;
}

export interface PositionRowDetails {
  readonly remainingOpenings: number;
}

/** One line of the positions list with its remaining openings and hiring manager name. */
export interface PositionRow {
  id: string;
  title: string;
  department: string;
  hiringManagerId: string;
  status: 'open' | 'closed';
  readonly openedAt: string;
  details: PositionRowDetails;
  hiringManager: HiringManagerRef;
}

export interface PositionDetails {
  details: {
    description: string;
    headcount: number;
  };
  readonly hiresSoFar: number;
  readonly remainingOpenings: number;
  readonly headcountFilled: boolean;
}

/** The selected position with its computed headcount indicators and hiring manager name. */
export interface PositionReview {
  id: string;
  version: number;
  title: string;
  department: string;
  hiringManagerId: string;
  status: 'open' | 'closed';
  readonly openedAt: string;
  details: PositionDetails;
  hiringManager: HiringManagerRef;
}

export interface ApplicationHire {
  details: {
    hire: {
      readonly hiredAt: string;
    };
  };
}

export interface ClosingHireDetails {
  hire: ApplicationHire;
}

/** The hired application whose hire filled the headcount and closed the position. */
export interface ClosingHire {
  id: string;
  readonly code: string;
  jobPositionId: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  details: ClosingHireDetails;
}

export interface Job_positionsContracts {
  /**
   * Purpose: Loads everything the page shows when it opens: the first page of job positions with their remaining openings, and the active hiring managers to choose from when opening a position or filtering the list.
   * Input: page and pageSize: the page of positions to return (defaults: first page, a screen-sized page).
   * Processing: Lists the organization’s job positions ordered by openedAt descending, joining the hiring manager name from her master record. For each position computes remaining openings per remainingOpeningsCalculation (headcount minus hires so far, never below zero), where hires so far follow hiresSoFarCalculation (count of its applications in hired). These are computed, never stored. Lists hiring managers whose status is Active, ordered by name, because positionRequiresHiringManager only accepts an active manager.
   * Output: positions as { items, page, pageSize, hasMore } for the list; hiringManagers (id, name, status) for the open-position form picker and the list filter.
   */
  'hiringPipeline.job_positions.loadJobPositionsPage': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { positions: { items: PositionRow[]; page: number; pageSize: number; hasMore: boolean }; hiringManagers: HiringManagerRef[] };
    rules: ['hiresSoFarCalculation', 'remainingOpeningsCalculation', 'positionRequiresHiringManager'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Finds job positions by text and filters as the recruiter searches, so she can locate the open position a candidate applies to.
   * Input: search: part of the title or department; department, hiringManagerId, status: optional exact filters; page and pageSize: the requested page.
   * Processing: Filters positions by the text (title or department contains) and the given filters, ordered by openedAt descending, joining the hiring manager name. Computes remaining openings per remainingOpeningsCalculation from headcount and hires so far (hiresSoFarCalculation: applications in hired).
   * Output: positions as { items, page, pageSize, hasMore }, replacing the list shown.
   */
  'hiringPipeline.job_positions.searchPositions': {
    kind: 'qry';
    input: { search?: string; department?: string; hiringManagerId?: string; status?: 'open' | 'closed'; page: number; pageSize: number };
    output: { positions: { items: PositionRow[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['hiresSoFarCalculation', 'remainingOpeningsCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Loads the selected position for review together with the hire that closed it, for the review and closure timeline sections.
   * Input: positionId: the position selected in the list (or just opened).
   * Processing: Reads the position by id with its hiring manager name. Computes hiresSoFar (hiresSoFarCalculation: applications of the position in hired), remainingOpenings (remainingOpeningsCalculation: headcount minus hires so far, never below zero) and headcountFilled (headcountFilledCalculation: hires so far >= headcount); none is stored. When the position is closed, finds the hired application with the latest hiredAt, which is the hire that filled the headcount and closed the position automatically per closePositionWhenHeadcountFilled.
   * Output: position with its indicators for the review; closingHire (code, status, hiredAt) only when the position was closed, so the timeline shows opened and closed events.
   */
  'hiringPipeline.job_positions.getPositionReview': {
    kind: 'qry';
    input: { positionId: string };
    output: { position: PositionReview; closingHire?: ClosingHire };
    rules: ['hiresSoFarCalculation', 'remainingOpeningsCalculation', 'headcountFilledCalculation', 'closePositionWhenHeadcountFilled'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Opens a new job position so it can receive applications.
   * Input: title, department, description, headcount: the position data entered; hiringManagerId: the hiring manager who will decide offers and hires.
   * Processing: Refuses a headcount that is not a whole number greater than zero (positionHeadcountPositive) and a hiring manager that is missing or not Active (positionRequiresHiringManager). Creates the position with status open; openedAt is written by the system. The returned indicators are computed: hiresSoFar 0, remainingOpenings equal to headcount, headcountFilled false.
   * Output: The created position in review shape so the page shows it in the review section without another call.
   */
  'hiringPipeline.job_positions.openPosition': {
    kind: 'cmd';
    writes: 'JobPosition.create';
    input: { title: string; department: string; details: { description: string; headcount: number }; hiringManagerId: string };
    output: { position: PositionReview };
    rules: ['positionHeadcountPositive', 'positionRequiresHiringManager', 'hiresSoFarCalculation', 'remainingOpeningsCalculation', 'headcountFilledCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterHiringManagers']; scope: 'organization' };
  };
}
