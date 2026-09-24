export const createApplicationRoute = "hiringPipeline.applications.cmdCreateApplication" as const;

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

export const moveToInterviewRoute = "hiringPipeline.applications.cmdMoveToInterview" as const;

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

export const rejectApplicationRoute = "hiringPipeline.applications.cmdRejectApplication" as const;

export interface RejectApplicationInput {
  "id": string;
  "details": {
    "rejectionReason"?: string;
  };
}

export interface RejectApplicationOutput {
  "id": string;
  "version": number;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
  "details": {
    "rejectionReason"?: string;
  };
}

export const listApplicationRoute = "hiringPipeline.applications.qryListApplication" as const;

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

export const listCandidateRoute = "hiringPipeline.applications.qryListCandidate" as const;

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

export const listJobPositionRoute = "hiringPipeline.applications.qryListJobPosition" as const;

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
