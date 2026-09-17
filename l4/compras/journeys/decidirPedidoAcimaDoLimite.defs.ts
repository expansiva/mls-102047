/// <mls fileReference="_102047_/l4/compras/journeys/decidirPedidoAcimaDoLimite.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decidirPedidoAcimaDoLimiteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decidirPedidoAcimaDoLimite",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Decidir pedido acima do limite",
    "goal": "Aprovar ou rejeitar um pedido de compra cujo valor ultrapassa o limite definido.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "consultarPedidoParaDecisao",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Analisa o fornecedor, os itens, as quantidades, os preços e o valor do pedido encaminhado para decisão."
      },
      {
        "stepId": "decidirPedido",
        "kind": "decide",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Escolhe entre aprovar ou rejeitar o pedido de compra acima do limite."
      },
      {
        "stepId": "registrarDecisaoDoPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "decidirPedidoCompra",
        "title": "x",
        "description": "Registra a aprovação ou a rejeição selecionada para o pedido."
      }
    ],
    "outcome": {
      "statement": "A decisão sobre o pedido acima do limite é registrada, autorizando-o para recebimento ou encerrando-o como rejeitado.",
      "evidence": [
        "Decisão de aprovação ou rejeição registrada no pedido de compra.",
        "Pedido aprovado disponível para recebimento ou pedido rejeitado identificado no acompanhamento de compras."
      ]
    }
  },
  "businessHash": "sha256:d0418da216adec7363bfb5082b16bb265c392d11c2a467b69d461d3229434655"
} as const satisfies Ns5JourneyArtifact;

export type DecidirPedidoAcimaDoLimiteJourneyType = typeof decidirPedidoAcimaDoLimiteJourney;

export default decidirPedidoAcimaDoLimiteJourney;
