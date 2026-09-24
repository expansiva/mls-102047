export const moveToHiredRoute = "hiringPipeline.managed_applications.cmdMoveToHired" as const;

export interface MoveToHiredInput {
  "id": string;
}

export interface MoveToHiredOutput {
  "id": string;
  "version": number;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
}

export const moveToOfferRoute = "hiringPipeline.managed_applications.cmdMoveToOffer" as const;

export interface MoveToOfferInput {
  "id": string;
}

export interface MoveToOfferOutput {
  "id": string;
  "version": number;
  "candidateId": string;
  "jobPositionId": string;
  "status": "screening" | "interview" | "offer" | "hired" | "rejected";
}

export const listApplicationRoute = "hiringPipeline.managed_applications.qryListApplication" as const;

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
}

export type ListApplicationOutput = ListApplicationItem[];

export const listCandidateRoute = "hiringPipeline.managed_applications.qryListCandidate" as const;

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

export const listJobPositionRoute = "hiringPipeline.managed_applications.qryListJobPosition" as const;

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
