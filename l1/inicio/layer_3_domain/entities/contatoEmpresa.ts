/// <mls fileReference="_102047_/l1/inicio/layer_3_domain/entities/contatoEmpresa.ts" enhancement="_blank"/>
export type ContatoEmpresa = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'ContactChannel';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode: string;
    };
    base?: Record<string, unknown>;
    contactChannel: {
      contactType: 'Phone' | 'Email' | 'WhatsApp';
      value: string;
      isVerified: boolean;
    };
    general?: Record<string, unknown>;
    inicio?: Record<string, unknown>;
  };
};
