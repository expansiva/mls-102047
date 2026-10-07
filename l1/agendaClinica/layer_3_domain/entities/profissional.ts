/// <mls fileReference="_102047_/l1/agendaClinica/layer_3_domain/entities/profissional.ts" enhancement="_blank"/>
export interface Profissional {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Person';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other';
      docId?: string;
      countryCode: string;
    };
    base?: Record<string, unknown>;
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    agendaClinica: {
      professionalType: 'medical' | 'therapist';
    };
  };
}
