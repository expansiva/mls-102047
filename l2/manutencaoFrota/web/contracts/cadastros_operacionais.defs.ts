export const createDriverRoute = "manutencaoFrota.cadastros_operacionais.cmdCreateDriver" as const;

export interface CreateDriverInput {
  "details": {
    "identification"?: {
      "name": string;
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "person"?: object;
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export interface CreateDriverOutput {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "person"?: object;
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export const createVehicleRoute = "manutencaoFrota.cadastros_operacionais.cmdCreateVehicle" as const;

export interface CreateVehicleInput {
  "details": {
    "identification"?: {
      "name": string;
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
    };
  };
}

export interface CreateVehicleOutput {
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

export const createVehicleAssignmentRoute = "manutencaoFrota.cadastros_operacionais.cmdCreateVehicleAssignment" as const;

export interface CreateVehicleAssignmentInput {
  "vehicleId": string;
  "driverId": string;
  "details": {
    "assignmentLabel": string;
  };
}

export interface CreateVehicleAssignmentOutput {
  "id": string;
  "version": number;
  "vehicleId": string;
  "driverId": string;
  "details": {
    "assignmentLabel": string;
  };
}

export const createWorkshopRoute = "manutencaoFrota.cadastros_operacionais.cmdCreateWorkshop" as const;

export interface CreateWorkshopInput {
  "details": {
    "identification"?: {
      "name": string;
      "docType"?: "CNPJ";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "company"?: {
      "companyKind": "LegalEntity";
      "legalName": string;
    };
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export interface CreateWorkshopOutput {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Company";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "CNPJ";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "company"?: {
      "companyKind": "LegalEntity";
      "legalName": string;
    };
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export const updateDriverRoute = "manutencaoFrota.cadastros_operacionais.cmdUpdateDriver" as const;

export interface UpdateDriverInput {
  "id": string;
  "details": {
    "identification"?: {
      "name": string;
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "person"?: object;
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export interface UpdateDriverOutput {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "person"?: object;
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export const updateVehicleRoute = "manutencaoFrota.cadastros_operacionais.cmdUpdateVehicle" as const;

export interface UpdateVehicleInput {
  "id": string;
  "details": {
    "identification"?: {
      "name": string;
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
    };
  };
}

export interface UpdateVehicleOutput {
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

export const updateVehicleAssignmentRoute = "manutencaoFrota.cadastros_operacionais.cmdUpdateVehicleAssignment" as const;

export interface UpdateVehicleAssignmentInput {
  "id": string;
  "vehicleId": string;
  "driverId": string;
  "details": {
    "assignmentLabel": string;
  };
}

export interface UpdateVehicleAssignmentOutput {
  "id": string;
  "version": number;
  "vehicleId": string;
  "driverId": string;
  "details": {
    "assignmentLabel": string;
  };
}

export const updateWorkshopRoute = "manutencaoFrota.cadastros_operacionais.cmdUpdateWorkshop" as const;

export interface UpdateWorkshopInput {
  "id": string;
  "details": {
    "identification"?: {
      "name": string;
      "docType"?: "CNPJ";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "company"?: {
      "companyKind": "LegalEntity";
      "legalName": string;
    };
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export interface UpdateWorkshopOutput {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Company";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "CNPJ";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "company"?: {
      "companyKind": "LegalEntity";
      "legalName": string;
    };
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export const listDriverRoute = "manutencaoFrota.cadastros_operacionais.qryListDriver" as const;

export interface ListDriverInput {
  "id": string;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
  };
  "page"?: number;
}

export interface ListDriverItem {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Person";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "SSN" | "EIN" | "Passport" | "DriversLicense" | "NationalId" | "CPF" | "CNPJ" | "VAT" | "Other";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "person"?: object;
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export type ListDriverOutput = ListDriverItem[];

export const listVehicleRoute = "manutencaoFrota.cadastros_operacionais.qryListVehicle" as const;

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

export const listVehicleAssignmentRoute = "manutencaoFrota.cadastros_operacionais.qryListVehicleAssignment" as const;

export interface ListVehicleAssignmentInput {
  "id": string;
  "vehicleId": string;
  "driverId": string;
  "page"?: number;
}

export interface ListVehicleAssignmentItem {
  "id": string;
  "version": number;
  "vehicleId": string;
  "driverId": string;
  "details": {
    "assignmentLabel": string;
  };
}

export type ListVehicleAssignmentOutput = ListVehicleAssignmentItem[];

export const listWorkshopRoute = "manutencaoFrota.cadastros_operacionais.qryListWorkshop" as const;

export interface ListWorkshopInput {
  "id": string;
  "details": {
    "identification"?: {
      "subtype": "Company";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "CNPJ";
      "docId"?: string;
      "countryCode": string;
    };
  };
  "page"?: number;
}

export interface ListWorkshopItem {
  "id": string;
  "version": number;
  "details": {
    "identification"?: {
      "subtype": "Company";
      "name": string;
      "status": "Active" | "Inactive" | "Merged" | "Blocked";
      "docType"?: "CNPJ";
      "docId"?: string;
      "countryCode": string;
    };
    "base"?: object;
    "company"?: {
      "companyKind": "LegalEntity";
      "legalName": string;
    };
    "general"?: object;
    "manutencaoFrota"?: object;
  };
}

export type ListWorkshopOutput = ListWorkshopItem[];
