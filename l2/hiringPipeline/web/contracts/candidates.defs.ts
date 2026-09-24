export const createApplicationRoute = "hiringPipeline.candidates.cmdCreateApplication" as const;

export interface CreateApplicationInput {
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
  "details": {
    "rejectionReason"?: string;
  };
}

export interface CreateApplicationOutput {
  "id": string;
  "version": number;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
  "details": {
    "rejectionReason"?: string;
  };
}

export const createCandidateRoute = "hiringPipeline.candidates.cmdCreateCandidate" as const;

export interface CreateCandidateInput {
  "details": {
    "identification"?: {
      "name": string;
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "person"?: object;
    "general"?: object;
    "hiringPipeline"?: {
      "source": string;
    };
  };
}

export interface CreateCandidateOutput {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: {
      "contacts": Array<object>;
    };
    "person"?: object;
    "general"?: object;
    "hiringPipeline"?: {
      "source": string;
    };
  };
}

export const moveToInterviewRoute = "hiringPipeline.candidates.cmdMoveToInterview" as const;

export interface MoveToInterviewInput {
  "id": string;
}

export interface MoveToInterviewOutput {
  "id": string;
  "version": number;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
  "details": {
    "rejectionReason"?: string;
  };
}

export const listApplicationRoute = "hiringPipeline.candidates.qryListApplication" as const;

export interface ListApplicationInput {
  "id": string;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
  "page"?: number;
}

export interface ListApplicationItem {
  "id": string;
  "version": number;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
  "details": {
    "rejectionReason"?: string;
  };
}

export type ListApplicationOutput = ListApplicationItem[];

export const listCandidateRoute = "hiringPipeline.candidates.qryListCandidate" as const;

export interface ListCandidateInput {
  "id": string;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
  };
  "page"?: number;
}

export interface ListCandidateItem {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: {
      "contacts": Array<object>;
    };
    "person"?: object;
    "general"?: object;
    "hiringPipeline"?: {
      "source": string;
    };
  };
}

export type ListCandidateOutput = ListCandidateItem[];

export const listJobPositionRoute = "hiringPipeline.candidates.qryListJobPosition" as const;

export interface ListJobPositionInput {
  "id": string;
  "title": string;
  "hiringManagerId": string;
  "status": "open" | "closed";
  "page"?: number;
}

export interface ListJobPositionItem {
  "id": string;
  "version": number;
  "title": string;
  "hiringManagerId": string;
  "status": "open" | "closed";
  "details": {
    "department": string;
    "description": string;
    "headcount": number;
    "filledHeadcount"?: number;
    "remainingHeadcount"?: number;
  };
}

export type ListJobPositionOutput = ListJobPositionItem[];
