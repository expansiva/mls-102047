export const createOrdenServicioRoute = "ordenServicio.ordenes_recepcionista.cmdCreateOrdenServicio" as const;

export interface CreateOrdenServicioInput {
  "serviceOrderNumber": string;
  "customerId": string;
  "deviceId": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "reportedDefect": string;
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "repairPerformed"?: string;
  };
}

export interface CreateOrdenServicioOutput {
  "id": string;
  "serviceOrderNumber": string;
  "customerId": string;
  "deviceId": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "reportedDefect": string;
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "repairPerformed"?: string;
    "availableForPickup"?: boolean;
  };
}

export const entregarYfinalizarRoute = "ordenServicio.ordenes_recepcionista.cmdEntregarYfinalizar" as const;

export interface EntregarYfinalizarInput {
  "id": string;
}

export interface EntregarYfinalizarOutput {
  "id": string;
  "serviceOrderNumber": string;
  "customerId": string;
  "deviceId": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "reportedDefect": string;
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "repairPerformed"?: string;
    "availableForPickup"?: boolean;
  };
}

export const listOrdenServicioRoute = "ordenServicio.ordenes_recepcionista.qryListOrdenServicio" as const;

export interface ListOrdenServicioInput {
  "id": string;
  "serviceOrderNumber": string;
  "customerId": string;
  "deviceId": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "page"?: number;
}

export interface ListOrdenServicioItem {
  "id": string;
  "serviceOrderNumber": string;
  "customerId": string;
  "deviceId": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "reportedDefect": string;
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "repairPerformed"?: string;
    "availableForPickup"?: boolean;
  };
}

export type ListOrdenServicioOutput = ListOrdenServicioItem[];
