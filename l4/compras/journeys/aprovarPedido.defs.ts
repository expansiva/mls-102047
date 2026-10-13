/// <mls fileReference="_102047_/l4/compras/journeys/aprovarPedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const aprovarPedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "aprovarPedido",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Aprovar ou rejeitar pedido",
    "goal": "Decidir sobre pedidos de compra acima do valor limite.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarPendentes",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Ver pedidos pendentes",
        "description": "O gerente abre a lista de pedidos aguardando aprovação."
      },
      {
        "stepId": "analisarPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Analisar pedido",
        "description": "O gerente examina fornecedor, itens, preços e valor total do pedido."
      },
      {
        "stepId": "decidirPedido",
        "kind": "decide",
        "entity": "PedidoCompra",
        "title": "Aprovar ou rejeitar",
        "description": "O gerente escolhe aprovar ou rejeitar o pedido."
      },
      {
        "stepId": "aprovar",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "aprovar",
        "title": "Aprovar pedido",
        "description": "O gerente aprova o pedido, que fica liberado ao fornecedor."
      },
      {
        "stepId": "rejeitar",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "rejeitar",
        "title": "Rejeitar pedido",
        "description": "O gerente rejeita o pedido informando o motivo."
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite está aprovado ou rejeitado.",
      "evidence": [
        "Situação do pedido aprovado ou rejeitado",
        "Pedido sai da lista de pendentes de aprovação"
      ]
    }
  },
  "businessHash": "sha256:186a121333c83e52ec02e633ffc1cafddb4d3997e7b672078d8598b7cd947b30"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AprovarPedidoJourneyType = typeof aprovarPedidoJourney;

export default aprovarPedidoJourney;
