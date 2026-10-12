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
        "title": "Ver pedidos aguardando aprovação",
        "description": "O gerente abre a lista de pedidos acima do limite aguardando aprovação."
      },
      {
        "stepId": "analisarPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Analisar pedido",
        "description": "O gerente confere fornecedor, itens, quantidades, preços e valor total."
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
        "description": "O pedido aprovado segue para o fornecedor."
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
      "statement": "O pedido foi aprovado ou rejeitado.",
      "evidence": [
        "O pedido aparece com situação aprovado ou rejeitado e data da decisão."
      ]
    }
  },
  "businessHash": "sha256:5a541218aa38f186a6ab1c6340d18382192233fd1f81db003eb87e20581690a0"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AprovarPedidoJourneyType = typeof aprovarPedidoJourney;

export default aprovarPedidoJourney;
