/// <mls fileReference="_102047_/l4/locacaoEquipamentos/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "locacaoEquipamentos",
  "inbound": [],
  "outbound": [
    {
      "id": "multaCalculada",
      "kind": "event",
      "to": "financeiro",
      "event": "multaCalculada",
      "on": "ContratoLocacao.registrarDevolucao",
      "description": "Publica a devolução registrada com a multa calculada, quando houver atraso, para que o módulo financeiro possa tratar a cobrança.",
      "entityRefs": [
        "ContratoLocacao"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type LocacaoEquipamentosIntegrationType = typeof locacaoEquipamentosIntegration;

export default locacaoEquipamentosIntegration;
