export const createFuelingRoute = "manutencaoFrota.meus_veiculos.cmdCreateFueling" as const;

export interface CreateFuelingInput {
  "vehicleId": string;
  "driverId": string;
  "details": {
    "fuelingDate": string;
    "liters": number;
    "amount": number;
    "odometerKm": number;
  };
}

export interface CreateFuelingOutput {
  "id": string;
  "version": number;
  "vehicleId": string;
  "driverId": string;
  "details": {
    "fuelingDate": string;
    "liters": number;
    "amount": number;
    "odometerKm": number;
  };
}

export const listFuelingRoute = "manutencaoFrota.meus_veiculos.qryListFueling" as const;

export interface ListFuelingInput {
  "id": string;
  "vehicleId": string;
  "driverId": string;
  "page"?: number;
}

export interface ListFuelingItem {
  "id": string;
  "version": number;
  "vehicleId": string;
  "driverId": string;
  "details": {
    "fuelingDate": string;
    "liters": number;
    "amount": number;
    "odometerKm": number;
  };
}

export type ListFuelingOutput = ListFuelingItem[];

export const listVehicleRoute = "manutencaoFrota.meus_veiculos.qryListVehicle" as const;

export interface ListVehicleInput {
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
  "details": {
    "identification"?: {
      "subtype": "AssetVehicle";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "countryCode": string;
    };
    "assetVehicle"?: {
      "plate": string;
      "model": string;
      "year": number;
    };
    "manutencaoFrota"?: {
      "currentMileageKm": number;
      "preventiveMaintenanceMileageOverdue"?: boolean;
    };
  };
}

export type ListVehicleOutput = ListVehicleItem[];
