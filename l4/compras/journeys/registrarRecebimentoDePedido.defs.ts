/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimentoDePedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoDePedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimentoDePedido",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento de pedido",
    "goal": "Registrar o recebimento total ou parcial dos itens de um pedido e dar entrada no estoque do que foi recebido.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoParaRecebimento",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Localiza o pedido aprovado ou enviado que chegou para recebimento."
      },
      {
        "stepId": "inspecionarItensDoPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Confere os itens e as quantidades solicitadas no pedido."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "RecebimentoCompra",
        "affects": [
          "PedidoCompra",
          "Estoque"
        ],
        "effect": "create",
        "title": "x",
        "description": "Registra as quantidades efetivamente recebidas, totais ou parciais, atualiza o acompanhamento do pedido e lança a entrada dos produtos no estoque."
      }
    ],
    "outcome": {
      "statement": "O recebimento é registrado e o estoque passa a considerar as quantidades efetivamente recebidas.",
      "evidence": [
        "Recebimento identifica o pedido, os itens e as quantidades recebidas.",
        "Saldo de estoque dos produtos recebidos reflete a entrada registrada.",
        "Pedido indica o recebimento total ou parcial."
      ]
    }
  },
  "businessHash": "sha256:f5eeca8d98f0c2905f4e5678ac717a389aae544ebc97ad40778091b619e2b41e"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarRecebimentoDePedidoJourneyType = typeof registrarRecebimentoDePedidoJourney;

export default registrarRecebimentoDePedidoJourney;
