export const listMaintenanceOrderRoute = "manutencaoFrota.gestor_inicio.qryListMaintenanceOrder" as const;

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

export const listMaintenancePlanRoute = "manutencaoFrota.gestor_inicio.qryListMaintenancePlan" as const;

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

export const listVehicleRoute = "manutencaoFrota.gestor_inicio.qryListVehicle" as const;

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
