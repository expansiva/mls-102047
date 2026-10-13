/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_3_domain/entities/colaborador.ts" enhancement="_blank"/>
export type Colaborador = {
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
      tags: string[];
    };
    base: {
      relationshipRefs: Record<string, unknown>;
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    reembolsoDespesas?: Record<string, unknown>;
  };
};
