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
      "to": "controleEstoque",
      "event": "fecharComanda",
      "on": "Comanda.fecharComanda",
      "description": "Publica o fechamento da comanda, incluindo os itens lançados, para que o controle de estoque possa registrar o consumo correspondente.",
      "entityRefs": [
        "Comanda",
        "ItemComanda"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ComandaRestauranteIntegrationType = typeof comandaRestauranteIntegration;

export default comandaRestauranteIntegration;
