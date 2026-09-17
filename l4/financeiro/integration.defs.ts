/// <mls fileReference="_102047_/l4/financeiro/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "financeiro",
  "inbound": [
    {
      "id": "pagadorCriadoNoCatalogo",
      "kind": "event",
      "from": "organization",
      "event": "mdmCreated",
      "writes": [
        "Pagador"
      ],
      "effect": "create",
      "description": "Cria o Pagador no financeiro quando seu cadastro é criado no catálogo da organização.",
      "entityRefs": []
    },
    {
      "id": "pagadorAtualizadoNoCatalogo",
      "kind": "event",
      "from": "organization",
      "event": "mdmUpdated",
      "writes": [
        "Pagador"
      ],
      "effect": "update",
      "description": "Atualiza o Pagador no financeiro quando seu cadastro é atualizado no catálogo da organização.",
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
      "description": "Cria um TituloReceber a partir da comanda fechada, com pagador, valor, vencimento e a origem da cobrança.",
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
      "description": "Cria um TituloReceber a partir da ordem de serviço cuja entrega foi finalizada, registrando o pagador, valor, vencimento e origem.",
      "entityRefs": []
    }
  ],
  "outbound": [],
  "plugins": [
    {
      "pluginId": "stripe",
      "description": "Processa o pagamento de título em aberto com cartão no portal do pagador.",
      "usedBy": [
        "pagarTituloComCartao.registrarPagamentoComCartao"
      ]
    }
  ]
} as const satisfies Ns5IntegrationArtifact;

export type FinanceiroIntegrationType = typeof financeiroIntegration;

export default financeiroIntegration;
