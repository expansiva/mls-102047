export const listOrdenServicioRoute = "ordenServicio.inicio_recepcionista.qryListOrdenServicio" as const;

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
