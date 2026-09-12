/// <mls fileReference="_102047_/l4/compras/journeys/rejeitarPedidoAcimaDoLimite.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const rejeitarPedidoAcimaDoLimiteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "rejeitarPedidoAcimaDoLimite",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Rejeitar pedido acima do limite",
    "goal": "Avaliar um pedido que exige aprovação e rejeitá-lo quando não deve prosseguir.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarPedidoParaRejeicao",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Abre o pedido de compra encaminhado para aprovação."
      },
      {
        "stepId": "inspecionarPedidoParaRejeicao",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Examina fornecedor, itens, quantidades, preços e valor total do pedido."
      },
      {
        "stepId": "decidirRejeicao",
        "kind": "decide",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Decide rejeitar o pedido após a avaliação."
      },
      {
        "stepId": "rejeitarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "rejeitarPedido",
        "title": "x",
        "description": "Registra a rejeição do pedido, impedindo seu recebimento."
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite é rejeitado e não segue para recebimento.",
      "evidence": [
        "Pedido registra a decisão de rejeição do gerente de compras.",
        "Pedido não está disponível para recebimento."
      ]
    }
  },
  "businessHash": "sha256:331580e56f740e51c479053c71575e7fcc1412002fec04eca5b422486e369967"
} as const satisfies Ns5JourneyArtifact;

export type RejeitarPedidoAcimaDoLimiteJourneyType = typeof rejeitarPedidoAcimaDoLimiteJourney;

export default rejeitarPedidoAcimaDoLimiteJourney;
