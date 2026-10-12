/// <mls fileReference="_102047_/l2/hiringPipeline/web/contracts/candidates.defs.ts" enhancement="_blank"/>

/** Identification block of the candidate master record shown in the list and the profile. */
export interface CandidateIdentification {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      readonly createdAt?: string;
    };
  };
}

/** Platform summary of the candidate’s linked contacts. */
export interface CandidateBase {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** The module namespace of the candidate. */
export interface CandidateHiringPipeline {
  details: {
    hiringPipeline: {
      source: 'referral' | 'jobBoard' | 'linkedIn' | 'careerSite' | 'agency' | 'event' | 'other';
    };
  };
}

/** Candidate details as nested in the ontology. */
export interface CandidateDetails {
  identification: CandidateIdentification;
  base?: CandidateBase;
  hiringPipeline: CandidateHiringPipeline;
}

/** The e-mail address and its verification flag. */
export interface CandidateContactChannel {
  details: {
    contactChannel: {
      value: string;
      isVerified?: boolean;
    };
  };
}

/** Details of a candidate e-mail record. */
export interface CandidateEmailDetails {
  contactChannel: CandidateContactChannel;
}

/** One e-mail linked to the candidate by HasContact. */
export interface CandidateEmailLine {
  id: string;
  details: CandidateEmailDetails;
}

/** A candidate row of the search list, with the primary e-mail. */
export interface CandidateSummary {
  id: string;
  details: CandidateDetails;
  candidateEmail?: CandidateEmailLine;
}

/** Derived state of an application line. */
export interface ApplicationLineDetails {
  details: {
    readonly isActive: boolean;
    readonly daysInPipeline: number;
  };
}

/** The position an application targets. */
export interface JobPositionRef {
  title: string;
}

/** One application of the candidate with its stage, position and days in pipeline. */
export interface CandidateApplicationLine {
  id: string;
  applicationNumber: string;
  status: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  details: ApplicationLineDetails;
  jobPosition: JobPositionRef;
}

/** The selected candidate with all e-mails and applications. */
export interface CandidateProfile {
  id: string;
  details: CandidateDetails;
  candidateEmails: CandidateEmailLine[];
  applications: CandidateApplicationLine[];
}

export interface CandidatesContracts {
  /**
   * Purpose: Find existing candidates by name or e-mail so the recruiter avoids duplicates and picks a candidate.
   * Input: search: typed text matched against the candidate name and e-mail address (empty lists the most recently registered); page, pageSize: paging.
   * Processing: Locates candidates with the hiringPipeline.Candidate role whose name contains the text (locate.byName) or who own an e-mail containing it (locate.byContact), deduplicates them, orders by name and hydrates the primary e-mail of each in one batch.
   * Output: A paged list of candidates with name, status, contacts summary, source and primary e-mail, ready for the search list.
   */
  'hiringPipeline.candidates.searchCandidates': {
    kind: 'qry';
    input: { search?: string; page: number; pageSize: number };
    output: { candidates: { items: CandidateSummary[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates']; scope: 'organization' };
  };
  /**
   * Purpose: Load the selected candidate with their e-mails and applications in one call.
   * Input: candidateId: the candidate selected in the search list.
   * Processing: Reads the candidate by id, lists linked e-mails (listLinks) and the candidate’s applications ordered by applied date (listByForeignKey) with each position’s title hydrated in batch. isActive is computed per applicationActiveWhileInPipeline (screening, interview or offer) and daysInPipeline per daysInPipelineCalculated (applied date to today, or to the hire/rejection day); neither is stored.
   * Output: The candidate profile with name, status, registration date, source, e-mails with verification, and applications with number, stage, applied date, active flag, days in pipeline and position title.
   */
  'hiringPipeline.candidates.getCandidateProfile': {
    kind: 'qry';
    input: { candidateId: string };
    output: { candidate: CandidateProfile };
    rules: ['daysInPipelineCalculated', 'applicationActiveWhileInPipeline'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates']; scope: 'organization' };
  };
  /**
   * Purpose: Register a new candidate with name, e-mail and source.
   * Input: name: full name; email: e-mail address; source: channel through which the candidate arrived.
   * Processing: Refuses without a non-empty e-mail (candidateRequiresEmail) or without a source (candidateSourceRequired). Looks up the person and e-mail (register.createOrAttach), creates the master record only when absent, attaches the hiringPipeline.Candidate role, writes the source, creates or attaches the e-mail ContactChannel and links it by HasContact (link.contact).
   * Output: The candidate as a search-list row, upserted into the list, and the full profile (with no applications yet) shown in the detail, so no reload is needed.
   */
  'hiringPipeline.candidates.registerCandidate': {
    kind: 'cmd';
    writes: 'Candidate.create';
    input: { details: { identification: { name: string }; hiringPipeline: { source: 'referral' | 'jobBoard' | 'linkedIn' | 'careerSite' | 'agency' | 'event' | 'other' } }; candidateEmail: { details: { contactChannel: { value: string } } } };
    output: { candidate: CandidateSummary; profile: CandidateProfile };
    rules: ['candidateRequiresEmail', 'candidateSourceRequired'];
    access: { actors: ['recruiter']; grants: ['recruiterPipeline', 'recruiterCandidates']; scope: 'organization' };
  };
}
