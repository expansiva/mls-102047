export const emitirPresupuestoRoute = "ordenServicio.ordenes_tecnico.cmdEmitirPresupuesto" as const;

export interface EmitirPresupuestoInput {
  "id": string;
}

export interface EmitirPresupuestoOutput {
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

export const marcarListaRoute = "ordenServicio.ordenes_tecnico.cmdMarcarLista" as const;

export interface MarcarListaInput {
  "id": string;
  "details": {
    "repairPerformed"?: string;
  };
}

export interface MarcarListaOutput {
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

export const updateOrdenServicioRoute = "ordenServicio.ordenes_tecnico.cmdUpdateOrdenServicio" as const;

export interface UpdateOrdenServicioInput {
  "id": string;
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
  };
}

export interface UpdateOrdenServicioOutput {
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

export const listOrdenServicioRoute = "ordenServicio.ordenes_tecnico.qryListOrdenServicio" as const;

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
