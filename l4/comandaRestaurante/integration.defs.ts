/// <mls fileReference="_102047_/l4/comandaRestaurante/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "comandaRestaurante",
  "inbound": [],
  "outbound": [
    {
      "id": "fecharComanda",
      "kind": "event",
      "to": "any",
      "event": "fecharComanda",
      "on": "Comanda.fecharComanda",
      "description": "Publica o fechamento da comanda para módulos que precisem registrar ou acompanhar a conclusão do atendimento da mesa.",
      "entityRefs": [
        "Comanda"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ComandaRestauranteIntegrationType = typeof comandaRestauranteIntegration;

export default comandaRestauranteIntegration;
