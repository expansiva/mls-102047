/// <mls fileReference="_102047_/l4/reembolsoDespesas/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const reembolsoDespesasIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "reembolsoDespesas",
  "inbound": [],
  "outbound": [
    {
      "id": "despesaAprovada",
      "kind": "event",
      "to": "financeiro",
      "event": "despesaAprovada",
      "on": "Despesa.registrarDecisaoDaDespesa",
      "description": "Publica a despesa aprovada para o módulo financeiro, permitindo o registro do pagamento.",
      "entityRefs": [
        "Despesa"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ReembolsoDespesasIntegrationType = typeof reembolsoDespesasIntegration;

export default reembolsoDespesasIntegration;
