/// <mls fileReference="_102047_/l1/agendaClinica/layer_3_domain/entities/paciente.ts" enhancement="_blank"/>
export interface Paciente {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Person';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other';
      docId?: string;
    };
    base: {
      contacts: Record<string, unknown>[];
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    agendaClinica?: Record<string, unknown>;
  };
}
