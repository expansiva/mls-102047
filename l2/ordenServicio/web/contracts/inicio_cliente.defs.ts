export const listOrdenServicioRoute = "ordenServicio.inicio_cliente.qryListOrdenServicio" as const;

export interface ListOrdenServicioInput {
  "id": string;
  "serviceOrderNumber": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "page"?: number;
}

export interface ListOrdenServicioItem {
  "id": string;
  "serviceOrderNumber": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "availableForPickup"?: boolean;
  };
}

export type ListOrdenServicioOutput = ListOrdenServicioItem[];
