/// <mls fileReference="_102047_/l4/compras/journeys/aprovarPedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const aprovarPedidoCompraJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "aprovarPedidoCompra",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Aprovar pedido de compra",
    "goal": "Aprovar ou rejeitar pedidos de compra acima do valor limite.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoAprovacao",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Localizar pedido de compra",
        "description": "Encontra o pedido já em mãos ou busca o pedido acima do limite que precisa de decisão."
      },
      {
        "stepId": "analisarPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Analisar pedido de compra",
        "description": "Examina fornecedor, itens, quantidades, preços e valor total do pedido."
      },
      {
        "stepId": "decidirPedido",
        "kind": "decide",
        "entity": "PedidoCompra",
        "title": "Aprovar ou rejeitar",
        "description": "Escolhe aprovar ou rejeitar o pedido de compra acima do valor limite."
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite fica aprovado ou rejeitado conforme a escolha do gerente.",
      "evidence": [
        "A decisão de aprovar ou rejeitar fica visível no pedido."
      ]
    }
  },
  "businessHash": "sha256:37cfee4d59c7baecadea14e3b657bdd10deba361f433fae9fceca7efb964d05b"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AprovarPedidoCompraJourneyType = typeof aprovarPedidoCompraJourney;

export default aprovarPedidoCompraJourney;
