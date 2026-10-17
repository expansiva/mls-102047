/// <mls fileReference="_102047_/l1/inicio/layer_3_domain/entities/empresa.ts" enhancement="_blank"/>
export type Empresa = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Company';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'CNPJ' | 'EIN' | 'VAT' | 'NationalId' | 'Other';
      docId?: string;
      countryCode: string;
      tags: string[];
    };
    base: {
      aliases: string[];
      addresses: Record<string, unknown>[];
      contacts: Record<string, unknown>[];
    };
    company: {
      companyKind: 'LegalEntity';
      legalName: string;
      tradeName?: string;
    };
    general?: Record<string, unknown>;
    inicio?: {
      preparada?: boolean;
      dadosFaltantes?: string;
    };
  };
};
