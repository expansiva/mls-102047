/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/candidates.defs.ts" enhancement="_blank"/>

/** One row of the candidate search list: the candidate with status, source and e-mail. */
export interface CandidateSummary {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    hiringPipeline: {
      source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other';
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

/** The job position an application was made to, as shown on the candidate’s application line. */
export interface ApplicationJobPosition {
  id: string;
  title: string;
  status: 'open' | 'closed';
}

/** One application of the candidate with its position, stage, dates and computed days in stage. */
export interface CandidateApplication {
  id: string;
  readonly code: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  readonly appliedAt: string;
  readonly stageChangedAt: string;
  readonly daysInStage: number;
  readonly isActive: boolean;
  jobPosition: ApplicationJobPosition;
}

/** The candidate’s details with e-mail and every application made, ready for the detail panel. */
export interface CandidateProfile {
  id: string;
  version: number;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      readonly createdAt: string;
    };
    hiringPipeline: {
      resumeLink: string;
      source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other';
    };
  };
  candidateEmail: {
    details: {
      contactChannel: {
        value?: string;
      };
    };
  };
  applications: CandidateApplication[];
}

export interface CandidatesContracts {
  /**
   * Purpose: Lists the organization’s candidates for the search list, opening with the first page and re-running when the recruiter types a search or picks a source.
   * Input: search: optional text matched against the candidate’s name, aliases and e-mail address; source: optional source filter; page and pageSize: the page requested.
   * Processing: Reads candidates tagged hiringPipeline.Candidate in the organization (grant recruiterCandidates), matching search by name (locate.byName) or e-mail (locate.byContact through the HasContact link) and filtering by source when given. Joins the candidate’s active e-mail contact. Orders by name.
   * Output: A paged list { items, page, pageSize, hasMore } of candidate rows with name, record status, source and e-mail, so the recruiter sees each candidate’s status at a glance and can pick one.
   */
  'hiringPipeline.candidates.searchCandidates': {
    kind: 'qry';
    input: { search?: string; details: { hiringPipeline: { source?: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other' } }; page: number; pageSize: number };
    output: { candidates: { items: CandidateSummary[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates']; scope: 'organization' };
  };
  /**
   * Purpose: Loads the chosen candidate with e-mail and all applications so the recruiter sees where the candidate stands before recording a new application.
   * Input: candidateId: the candidate selected in the search list.
   * Processing: Reads the candidate by id with its linked e-mail, then lists the candidate’s applications (listByForeignKey on candidateId) joined with each job position’s title and status, ordered by appliedAt descending. daysInStage is computed per application as days from stageChangedAt to today (daysInStageCalculation); isActive is computed as status in screening, interview or offer (applicationActiveCalculation). Neither is stored.
   * Output: The candidate profile with name, status, registration date, resume link, source, e-mail and the list of applications with position, stage, dates, days in stage and active flag.
   */
  'hiringPipeline.candidates.getCandidateProfile': {
    kind: 'qry';
    input: { candidateId: string };
    output: { profile: CandidateProfile };
    rules: ['daysInStageCalculation', 'applicationActiveCalculation'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates']; scope: 'organization' };
  };
  /**
   * Purpose: Registers a candidate from the registration form, reusing an existing person instead of creating a duplicate.
   * Input: name: the candidate’s full name; email: the candidate’s e-mail address; resumeLink: web address of the resume; source: where the candidate came from.
   * Processing: Refuses the request when name, e-mail, resume link or source is missing (candidateEmailRequired). Looks up an existing candidate owning the same e-mail (locate.byContact) and reuses it (candidateReusedNotDuplicated) via register.createOrAttach: the person is created only when not found, tagged hiringPipeline.Candidate, the resume link and source are written in the hiringPipeline namespace, and the e-mail contact channel is created or attached and linked with HasContact. Status and createdAt are set by the platform, not by the endpoint.
   * Output: The resulting candidate profile (with any existing applications when reused) for the detail panel, the summary row to upsert into the search list, and reused telling the recruiter an existing candidate was used.
   */
  'hiringPipeline.candidates.registerCandidate': {
    kind: 'cmd';
    writes: 'Candidate.create';
    input: { details: { identification: { name: string }; hiringPipeline: { resumeLink: string; source: 'careerSite' | 'jobBoard' | 'linkedIn' | 'referral' | 'agency' | 'event' | 'other' } }; candidateEmail: { details: { contactChannel: { value: string } } } };
    output: { profile: CandidateProfile; candidate: CandidateSummary; readonly reused: boolean };
    rules: ['candidateEmailRequired', 'candidateReusedNotDuplicated'];
    access: { actors: ['recruiter']; grants: ['recruiterPositionsAndApplications', 'recruiterCandidates']; scope: 'organization' };
  };
}
