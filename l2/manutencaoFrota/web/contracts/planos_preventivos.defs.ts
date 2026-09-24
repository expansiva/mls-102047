export const createMaintenanceOrderRoute = "manutencaoFrota.planos_preventivos.cmdCreateMaintenanceOrder" as const;

export interface CreateMaintenanceOrderInput {
  "vehicleId": string;
  "maintenancePlanId"?: string;
  "workshopId": string;
  "entryDate": string;
  "details": {
    "maintenanceType": "preventive" | "repair";
    "description": string;
    "estimatedCost"?: number;
    "finalCost"?: number;
    "exitDate"?: string;
  };
}

export interface CreateMaintenanceOrderOutput {
  "id": string;
  "version": number;
  "vehicleId": string;
  "maintenancePlanId"?: string;
  "workshopId": string;
  "entryDate": string;
  "details": {
    "maintenanceType": "preventive" | "repair";
    "description": string;
    "estimatedCost"?: number;
    "finalCost"?: number;
    "exitDate"?: string;
    "completed"?: boolean;
  };
}

export const createMaintenancePlanRoute = "manutencaoFrota.planos_preventivos.cmdCreateMaintenancePlan" as const;

export interface CreateMaintenancePlanInput {
  "vehicleId": string;
  "details": {
    "name": string;
    "intervalKilometers"?: number;
    "intervalMonths"?: number;
    "referenceMileage": number;
    "referenceDate": string;
  };
}

export interface CreateMaintenancePlanOutput {
  "id": string;
  "version": number;
  "vehicleId": string;
  "details": {
    "name": string;
    "intervalKilometers"?: number;
    "intervalMonths"?: number;
    "referenceMileage": number;
    "referenceDate": string;
    "nextPreventiveMileage"?: number;
    "nextPreventiveDate"?: string;
    "preventiveOverdue"?: boolean;
  };
}

export const listMaintenanceOrderRoute = "manutencaoFrota.planos_preventivos.qryListMaintenanceOrder" as const;

export interface ListMaintenanceOrderInput {
  "id": string;
  "vehicleId": string;
  "maintenancePlanId"?: string;
  "workshopId": string;
  "entryDate": string;
  "page"?: number;
}

export interface ListMaintenanceOrderItem {
  "id": string;
  "version": number;
  "vehicleId": string;
  "maintenancePlanId"?: string;
  "workshopId": string;
  "entryDate": string;
  "details": {
    "maintenanceType": "preventive" | "repair";
    "description": string;
    "estimatedCost"?: number;
    "finalCost"?: number;
    "exitDate"?: string;
    "completed"?: boolean;
  };
}

export type ListMaintenanceOrderOutput = ListMaintenanceOrderItem[];

export const listMaintenancePlanRoute = "manutencaoFrota.planos_preventivos.qryListMaintenancePlan" as const;

export interface ListMaintenancePlanInput {
  "id": string;
  "vehicleId": string;
  "page"?: number;
}

export interface ListMaintenancePlanItem {
  "id": string;
  "version": number;
  "vehicleId": string;
  "details": {
    "name": string;
    "intervalKilometers"?: number;
    "intervalMonths"?: number;
    "referenceMileage": number;
    "referenceDate": string;
    "nextPreventiveMileage"?: number;
    "nextPreventiveDate"?: string;
    "preventiveOverdue"?: boolean;
  };
}

export type ListMaintenancePlanOutput = ListMaintenancePlanItem[];

export const listVehicleRoute = "manutencaoFrota.planos_preventivos.qryListVehicle" as const;

export interface ListVehicleInput {
  "id": string;
  "details": {
    "identification"?: {
      "subtype": "AssetVehicle";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "countryCode": string;
    };
  };
  "page"?: number;
}

export interface ListVehicleItem {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "AssetVehicle";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "countryCode": string;
    };
    "base"?: object;
    "assetVehicle"?: {
      "plate": string;
      "model": string;
      "year": number;
    };
    "general"?: object;
    "manutencaoFrota"?: {
      "currentMileageKm": number;
      "preventiveMaintenanceMileageOverdue"?: boolean;
    };
  };
}

export type ListVehicleOutput = ListVehicleItem[];
