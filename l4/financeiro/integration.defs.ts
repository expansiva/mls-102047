/// <mls fileReference="_102047_/l4/financeiro/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "financeiro",
  "inbound": [
    {
      "id": "pagadorCriado",
      "kind": "event",
      "from": "organization",
      "event": "mdmCreated",
      "writes": [
        "Pagador"
      ],
      "effect": "create",
      "description": "Recebe a criação de um pagador no catálogo da organização para vinculá-lo aos títulos a receber.",
      "entityRefs": []
    },
    {
      "id": "pagadorAtualizado",
      "kind": "event",
      "from": "organization",
      "event": "mdmUpdated",
      "writes": [
        "Pagador"
      ],
      "effect": "update",
      "description": "Recebe a atualização cadastral de um pagador no catálogo da organização.",
      "entityRefs": []
    },
    {
      "id": "comandaFechada",
      "kind": "event",
      "from": "comandaRestaurante",
      "event": "fecharComanda",
      "writes": [
        "TituloReceber"
      ],
      "effect": "create",
      "description": "Cria um título a receber a partir da comanda fechada no restaurante.",
      "entityRefs": []
    },
    {
      "id": "mensalidadeGerada",
      "kind": "event",
      "from": "mensalidadesAcademia",
      "event": "mensalidadeGerada",
      "writes": [
        "TituloReceber"
      ],
      "effect": "create",
      "description": "Cria um título a receber a partir da mensalidade gerada na academia.",
      "entityRefs": []
    },
    {
      "id": "ordemServicoEntregue",
      "kind": "event",
      "from": "ordenServicio",
      "event": "entregaFinalizada",
      "writes": [
        "TituloReceber"
      ],
      "effect": "create",
      "description": "Cria um título a receber a partir da ordem de serviço entregue pela assistência técnica.",
      "entityRefs": []
    }
  ],
  "outbound": [],
  "plugins": [
    {
      "pluginId": "stripe",
      "description": "Processa pagamentos com cartão via Stripe para títulos a receber.",
      "usedBy": [
        "receberTitulo.registrarRecebimento",
        "pagarTituloComCartao.pagarTituloComCartao"
      ]
    }
  ]
} as const satisfies Ns5IntegrationArtifact;

export type FinanceiroIntegrationType = typeof financeiroIntegration;

export default financeiroIntegration;
