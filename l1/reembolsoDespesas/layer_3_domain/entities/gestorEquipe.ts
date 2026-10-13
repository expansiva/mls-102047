/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_3_domain/entities/gestorEquipe.ts" enhancement="_blank"/>
export type GestorEquipe = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Person';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other';
      docId?: string;
      countryCode: string;
    };
    base?: Record<string, unknown>;
    person?: Record<string, unknown>;
    general?: Record<string, unknown>;
    reembolsoDespesas?: Record<string, unknown>;
  };
};
