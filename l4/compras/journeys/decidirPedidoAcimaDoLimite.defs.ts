/// <mls fileReference="_102047_/l4/compras/journeys/decidirPedidoAcimaDoLimite.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decidirPedidoAcimaDoLimiteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decidirPedidoAcimaDoLimite",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Aprovar ou rejeitar pedido acima do limite",
    "goal": "Decidir se um pedido de compra acima do valor limite pode prosseguir.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarPedido",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedido",
        "description": "Abre o pedido acima do valor limite indicado para decisão."
      },
      {
        "stepId": "inspecionarPedido",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Inspecionar pedido",
        "description": "Analisa o fornecedor, os itens, as quantidades, os preços e o valor total do pedido."
      },
      {
        "stepId": "decidirPedido",
        "kind": "decide",
        "entity": "PurchaseOrder",
        "title": "Aprovar ou rejeitar pedido",
        "description": "Decide entre aprovar o pedido para prosseguimento ou rejeitá-lo."
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite recebe uma decisão do gerente de compras.",
      "evidence": [
        "Decisão de aprovação ou rejeição registrada no pedido.",
        "Pedidos aprovados podem seguir para recebimento.",
        "Pedidos rejeitados não seguem para recebimento."
      ]
    }
  },
  "businessHash": "sha256:c62d172065b11677928cbafbcee137010606f622bb3aff313ba79b7f45db9307"
} as const satisfies Ns5JourneyArtifact;

export type DecidirPedidoAcimaDoLimiteJourneyType = typeof decidirPedidoAcimaDoLimiteJourney;

export default decidirPedidoAcimaDoLimiteJourney;
