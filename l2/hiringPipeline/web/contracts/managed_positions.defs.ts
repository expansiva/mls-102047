export const moveToHiredRoute = "hiringPipeline.managed_positions.cmdMoveToHired" as const;

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

export const listApplicationRoute = "hiringPipeline.managed_positions.qryListApplication" as const;

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

export const listJobPositionRoute = "hiringPipeline.managed_positions.qryListJobPosition" as const;

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
