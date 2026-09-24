export const aprobarPresupuestoRoute = "ordenServicio.ordenes_cliente.cmdAprobarPresupuesto" as const;

export interface AprobarPresupuestoInput {
  "id": string;
}

export interface AprobarPresupuestoOutput {
  "id": string;
  "serviceOrderNumber": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "availableForPickup"?: boolean;
  };
}

export const rechazarPresupuestoRoute = "ordenServicio.ordenes_cliente.cmdRechazarPresupuesto" as const;

export interface RechazarPresupuestoInput {
  "id": string;
}

export interface RechazarPresupuestoOutput {
  "id": string;
  "serviceOrderNumber": string;
  "status": "underAnalysis" | "budgetSent" | "approved" | "rejected" | "readyForPickup" | "completed";
  "details": {
    "diagnosis"?: string;
    "budgetAmount"?: number;
    "availableForPickup"?: boolean;
  };
}

export const listOrdenServicioRoute = "ordenServicio.ordenes_cliente.qryListOrdenServicio" as const;

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
