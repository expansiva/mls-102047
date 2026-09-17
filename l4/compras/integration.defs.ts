/// <mls fileReference="_102047_/l4/compras/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const comprasIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "compras",
  "inbound": [
    {
      "id": "produtoMdmCriado",
      "kind": "event",
      "from": "organization",
      "event": "mdmCreated",
      "writes": [
        "Produto"
      ],
      "effect": "create",
      "description": "Cria ou disponibiliza no módulo de compras o produto mestre cadastrado no catálogo organizacional.",
      "entityRefs": []
    },
    {
      "id": "produtoMdmAtualizado",
      "kind": "event",
      "from": "organization",
      "event": "mdmUpdated",
      "writes": [
        "Produto"
      ],
      "effect": "update",
      "description": "Atualiza no módulo de compras os dados do produto mestre alterados no catálogo organizacional.",
      "entityRefs": []
    },
    {
      "id": "produtoMdmInativado",
      "kind": "event",
      "from": "organization",
      "event": "mdmInactivated",
      "writes": [
        "Produto"
      ],
      "effect": "update",
      "description": "Atualiza a disponibilidade do produto no módulo de compras quando ele é inativado no catálogo organizacional.",
      "entityRefs": []
    }
  ],
  "outbound": [
    {
      "id": "entradaEstoquePorRecebimentoParcial",
      "kind": "event",
      "to": "controleEstoque",
      "event": "entradaEstoquePorRecebimentoParcial",
      "on": "PedidoCompra.registrarRecebimentoParcial",
      "description": "Comunica ao controle de estoque as quantidades de produtos efetivamente recebidas em um recebimento parcial para registrar a entrada no estoque.",
      "entityRefs": [
        "PedidoCompra",
        "RecebimentoPedido",
        "Produto"
      ]
    },
    {
      "id": "entradaEstoquePorRecebimentoTotal",
      "kind": "event",
      "to": "controleEstoque",
      "event": "entradaEstoquePorRecebimentoTotal",
      "on": "PedidoCompra.registrarRecebimentoTotal",
      "description": "Comunica ao controle de estoque as quantidades de produtos efetivamente recebidas em um recebimento total para registrar a entrada no estoque.",
      "entityRefs": [
        "PedidoCompra",
        "RecebimentoPedido",
        "Produto"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ComprasIntegrationType = typeof comprasIntegration;

export default comprasIntegration;
