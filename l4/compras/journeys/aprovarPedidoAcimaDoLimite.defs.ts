/// <mls fileReference="_102047_/l4/compras/journeys/aprovarPedidoAcimaDoLimite.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const aprovarPedidoAcimaDoLimiteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "aprovarPedidoAcimaDoLimite",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Aprovar pedido acima do limite",
    "goal": "Avaliar um pedido que exige aprovação e autorizá-lo para recebimento.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarPedidoPendente",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Abre o pedido de compra encaminhado para aprovação."
      },
      {
        "stepId": "inspecionarPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Examina fornecedor, itens, quantidades, preços e valor total do pedido."
      },
      {
        "stepId": "decidirAprovacao",
        "kind": "decide",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Decide aprovar o pedido após a avaliação."
      },
      {
        "stepId": "aprovarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "aprovarPedido",
        "title": "x",
        "description": "Registra a aprovação do pedido para que possa ser recebido."
      },
      {
        "stepId": "encaminharParaRecebimento",
        "kind": "handoff",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Disponibiliza o pedido aprovado ao almoxarife para o recebimento.",
        "handoffTo": "almoxarife"
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite é aprovado e autorizado para recebimento.",
      "evidence": [
        "Pedido registra a decisão de aprovação do gerente de compras.",
        "Pedido fica disponível para registro de recebimento pelo almoxarife."
      ]
    }
  },
  "businessHash": "sha256:ba5ab54f49c0a4d08cdfbe89a20f99d30dc8589ca12e1f3a7e84f71f3d5a6bfa"
} as const satisfies Ns5JourneyArtifact;

export type AprovarPedidoAcimaDoLimiteJourneyType = typeof aprovarPedidoAcimaDoLimiteJourney;

export default aprovarPedidoAcimaDoLimiteJourney;
