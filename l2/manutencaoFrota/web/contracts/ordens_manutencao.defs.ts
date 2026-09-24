export const createMaintenanceOrderRoute = "manutencaoFrota.ordens_manutencao.cmdCreateMaintenanceOrder" as const;

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

export const updateMaintenanceOrderRoute = "manutencaoFrota.ordens_manutencao.cmdUpdateMaintenanceOrder" as const;

export interface UpdateMaintenanceOrderInput {
  "id": string;
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

export interface UpdateMaintenanceOrderOutput {
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

export const listMaintenanceOrderRoute = "manutencaoFrota.ordens_manutencao.qryListMaintenanceOrder" as const;

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

export const listMaintenancePlanRoute = "manutencaoFrota.ordens_manutencao.qryListMaintenancePlan" as const;

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

export const listVehicleRoute = "manutencaoFrota.ordens_manutencao.qryListVehicle" as const;

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
