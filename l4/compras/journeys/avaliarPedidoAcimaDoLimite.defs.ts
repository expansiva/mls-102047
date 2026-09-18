/// <mls fileReference="_102047_/l4/compras/journeys/avaliarPedidoAcimaDoLimite.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const avaliarPedidoAcimaDoLimiteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "avaliarPedidoAcimaDoLimite",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Avaliar pedido acima do limite",
    "goal": "Avaliar um pedido acima do valor limite e decidir por sua aprovação ou rejeição.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoParaAvaliacao",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedido para avaliação",
        "description": "Recupera o pedido em avaliação ou o localiza entre os pedidos que aguardam aprovação."
      },
      {
        "stepId": "inspecionarPedidoParaAvaliacao",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Inspecionar pedido",
        "description": "Analisa fornecedor, itens, quantidades, preços e valor total do pedido."
      },
      {
        "stepId": "decidirPedido",
        "kind": "decide",
        "entity": "PurchaseOrder",
        "title": "Decidir sobre o pedido",
        "description": "Escolhe aprovar o pedido quando estiver adequado ou rejeitá-lo quando não estiver adequado."
      },
      {
        "stepId": "registrarDecisaoPedido",
        "kind": "act",
        "entity": "PurchaseOrder",
        "effect": "transition",
        "transitionRef": "resolvePurchaseOrderApproval",
        "title": "Registrar decisão",
        "description": "Registra a aprovação ou a rejeição escolhida para o pedido."
      }
    ],
    "outcome": {
      "statement": "O pedido acima do limite tem sua decisão registrada: aprovado para seguir ao recebimento ou rejeitado sem seguir para recebimento.",
      "evidence": [
        "Decisão de aprovação ou rejeição registrada no pedido.",
        "Pedido aprovado disponível para recebimento ou pedido rejeitado identificado como não recebível."
      ]
    }
  },
  "businessHash": "sha256:3184119a7bba0a99ad00b87273e24e34ddda257aadfc4036a4c4505ac9af443d"
} as const satisfies Ns5JourneyArtifact;

export type AvaliarPedidoAcimaDoLimiteJourneyType = typeof avaliarPedidoAcimaDoLimiteJourney;

export default avaliarPedidoAcimaDoLimiteJourney;
