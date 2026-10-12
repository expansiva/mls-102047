/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/job_positions.defs.ts" enhancement="_blank"/>

/** Identification block of the hiring manager master record, limited to the fields the recruiter grant allows. */
export interface HiringManagerIdentification {
  details: {
    identification: {
      name: string;
      readonly status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Base block of the hiring manager with the summary of linked contact channels. */
export interface HiringManagerBase {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** Details of the hiring manager nested as in the ontology. */
export interface HiringManagerDetails {
  identification: HiringManagerIdentification;
  base?: HiringManagerBase;
}

/** The hiring manager shown on a position. */
export interface HiringManagerRef {
  details: HiringManagerDetails;
}

/** An active hiring manager offered in the open position form; id is the value that goes into JobPosition.hiringManagerId. */
export interface HiringManagerOption {
  hiringManagerId: string;
  details: HiringManagerDetails;
}

/** Count of the position’s applications in each stage. */
export interface ApplicationsByStage {
  readonly screening: number;
  readonly interview: number;
  readonly offer: number;
  readonly hired: number;
  readonly rejected: number;
}

/** Fill progress shown on each row of the position list. */
export interface PositionRowDetails {
  details: {
    headcount: number;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly isFilled: boolean;
  };
}

/** One job position in the overview list with its hiring manager and fill progress. */
export interface PositionRow {
  id: string;
  title: string;
  department: string;
  hiringManagerId: string;
  status: 'open' | 'closed';
  openedAt: string;
  details: PositionRowDetails;
  hiringManager: HiringManagerRef;
}

/** Details of the selected position: description, numbers, closing time and stage counts. */
export interface PositionDetails {
  details: {
    description: string;
    headcount: number;
    closedAt?: string;
    readonly hiresSoFar: number;
    readonly remainingOpenings: number;
    readonly isFilled: boolean;
  };
  applicationsByStage: ApplicationsByStage;
}

/** The full job position for the detail and the timeline, with its hiring manager and contacts. */
export interface Position {
  id: string;
  version: number;
  title: string;
  department: string;
  hiringManagerId: string;
  status: 'open' | 'closed';
  openedAt: string;
  details: PositionDetails;
  hiringManager: HiringManagerRef;
}

export interface Job_positionsContracts {
  /**
   * Purpose: Loads the page of job positions the recruiter scans, each with its hiring manager name and fill progress, so an open position can be picked for review or for an application.
   * Input: status: optional filter open/closed; department: optional department filter; search: optional text matched against title or department; page and pageSize: paging of the list.
   * Processing: Lists JobPosition in the organization scope filtered by status, department and search text, ordered by openedAt descending. Hydrates the hiring manager names of the page in one batch (read.mdmRecord). For each position computes hiresSoFar as the count of its applications in the hired stage and remainingOpenings as headcount minus hiresSoFar never below zero (remainingOpeningsCalculated), and isFilled when hires reach headcount (positionClosesWhenHeadcountFilled). Derived fields are computed, never stored.
   * Output: positions as { items, page, pageSize, hasMore } of PositionRow, ready for the overview list.
   */
  'hiringPipeline.job_positions.listPositions': {
    kind: 'qry';
    input: { status?: 'open' | 'closed'; department?: string; search?: string; page: number; pageSize: number };
    output: { positions: { items: PositionRow[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['remainingOpeningsCalculated', 'positionClosesWhenHeadcountFilled'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Loads the selected job position for the detail and the timeline in one call.
   * Input: positionId: id of the position selected in the list.
   * Processing: Reads JobPosition by id; reads the hiring manager master record for name and contacts summary. Counts the position’s applications per stage (screening, interview, offer, hired, rejected) into applicationsByStage; computes hiresSoFar, remainingOpenings never below zero (remainingOpeningsCalculated) and isFilled (positionClosesWhenHeadcountFilled). closedAt is returned as recorded by the automatic closing (closePositionWhenHeadcountFilled) so the timeline can show it.
   * Output: position with description, numbers, stage counts, status, openedAt, closedAt and hiring manager, used by positionDetail and positionTimeline.
   */
  'hiringPipeline.job_positions.getPosition': {
    kind: 'qry';
    input: { positionId: string };
    output: { position: Position };
    rules: ['remainingOpeningsCalculated', 'positionClosesWhenHeadcountFilled', 'closePositionWhenHeadcountFilled'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Offers the hiring managers the recruiter can assign to a new position in the open position form.
   * Input: name: optional text the recruiter types to find a hiring manager by name.
   * Processing: Locates hiring managers by name (locate.byName) and keeps only those with status Active (inactiveHiringManagerCannotBeAssigned); returns at most a short list of matches ordered by name. Only the granted fields name and status are exposed.
   * Output: hiringManagers: the active matches with the id to assign, name and status, for the hiring manager picker.
   */
  'hiringPipeline.job_positions.searchHiringManagers': {
    kind: 'qry';
    input: { details: { identification: { name?: string } } };
    output: { hiringManagers: HiringManagerOption[] };
    rules: ['inactiveHiringManagerCannotBeAssigned'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterHiringManagers']; scope: 'organization' };
  };
  /**
   * Purpose: Opens a new job position from the form without leaving the overview.
   * Input: title, department, description, headcount: the position data typed by the recruiter; hiringManagerId: the active hiring manager chosen.
   * Processing: Refuses a headcount that is not a whole number of at least one (headcountAtLeastOne). Reads the hiring manager and refuses it unless its status is Active (inactiveHiringManagerCannotBeAssigned). Creates the JobPosition with status open and openedAt set to today. Returns the record with hiresSoFar 0, remainingOpenings equal to headcount and all stage counts 0, computed and never stored (remainingOpeningsCalculated).
   * Output: position: the created position with its hiring manager, inserted into the list and shown in the detail so the recruiter can confirm it is open with zero hires.
   */
  'hiringPipeline.job_positions.openJobPosition': {
    kind: 'cmd';
    writes: 'JobPosition.create';
    input: { title: string; department: string; details: { description: string; headcount: number }; hiringManagerId: string };
    output: { position: Position };
    rules: ['headcountAtLeastOne', 'inactiveHiringManagerCannotBeAssigned', 'remainingOpeningsCalculated'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterHiringManagers']; scope: 'organization' };
  };
}
