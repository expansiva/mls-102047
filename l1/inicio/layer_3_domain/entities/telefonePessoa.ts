/// <mls fileReference="_102047_/l1/inicio/layer_3_domain/entities/telefonePessoa.ts" enhancement="_blank"/>
export type TelefonePessoa = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'ContactChannel';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode: string;
      tags: string[];
      createdAt: string;
      updatedAt: string;
    };
    base?: Record<string, unknown>;
    contactChannel: {
      contactType: 'Phone';
      value: string;
      isVerified: boolean;
      verifiedAt?: string;
    };
    general?: Record<string, unknown>;
    inicio?: Record<string, unknown>;
  };
};
