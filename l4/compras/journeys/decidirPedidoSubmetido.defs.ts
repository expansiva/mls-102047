/// <mls fileReference="_102047_/l4/compras/journeys/decidirPedidoSubmetido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decidirPedidoSubmetidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decidirPedidoSubmetido",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Decidir pedido de compra submetido",
    "goal": "Aprovar ou rejeitar um pedido acima do valor limite para definir seu encaminhamento.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarPedidoSubmetido",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedido submetido",
        "description": "Abre o pedido indicado pela notificação, com busca de pedidos submetidos como alternativa."
      },
      {
        "stepId": "inspecionarPedidoSubmetido",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Consultar pedido submetido",
        "description": "Consulta fornecedor, itens, quantidades, preços e valor total do pedido."
      },
      {
        "stepId": "decidirAprovarOuRejeitar",
        "kind": "decide",
        "entity": "PurchaseOrder",
        "title": "Decidir aprovação ou rejeição",
        "description": "Decide entre aprovar ou rejeitar o pedido submetido."
      },
      {
        "stepId": "registrarDecisaoDoPedido",
        "kind": "act",
        "entity": "PurchaseOrder",
        "effect": "transition",
        "transitionRef": "decidePurchaseOrder",
        "title": "Registrar decisão do pedido",
        "description": "Registra a aprovação, liberando o pedido para envio ao fornecedor, ou a rejeição do pedido."
      }
    ],
    "outcome": {
      "statement": "A decisão sobre o pedido submetido é registrada: o pedido é aprovado e liberado para envio, ou rejeitado.",
      "evidence": [
        "Decisão de aprovação ou rejeição registrada.",
        "Pedido aprovado e liberado para envio ou marcado como rejeitado."
      ]
    }
  },
  "businessHash": "sha256:99b5bbaadf8534c51a0428214dffc9deb320af8887ba0f3c3e973e8dd3ad8021"
} as const satisfies Ns5JourneyArtifact;

export type DecidirPedidoSubmetidoJourneyType = typeof decidirPedidoSubmetidoJourney;

export default decidirPedidoSubmetidoJourney;
