export const listOrdenServicioRoute = "ordenServicio.inicio_tecnico.qryListOrdenServicio" as const;

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
  "version": number;
  "serviceOrderNumber": string;
  "customerId": string;
  "deviceId": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "reportedDefect": string;
    "diagnosis"?: string;
    "requiredParts"?: Array<{
      "description": string;
      "quantity": number;
      "internalCost": number;
    }>;
    "budgetAmount"?: number;
    "technicianNotes"?: string;
    "repairPerformed"?: string;
    "availableForPickup"?: boolean;
  };
}

export type ListOrdenServicioOutput = ListOrdenServicioItem[];
