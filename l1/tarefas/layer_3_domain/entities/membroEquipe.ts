/// <mls fileReference="_102047_/l1/tarefas/layer_3_domain/entities/membroEquipe.ts" enhancement="_blank"/>
export type MembroEquipe = {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: 'Person';
      name: string;
      status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode: string;
      tags: string[];
    };
    base: {
      contacts: Record<string, unknown>[];
    };
    person?: {
      privacyConsent?: Record<string, unknown>;
    };
    general?: Record<string, unknown>;
    tarefas?: Record<string, unknown>;
  };
};
