/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimentoPedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoPedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimentoPedido",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento de pedido",
    "goal": "Registrar o recebimento total ou parcial dos produtos de um pedido e dar entrada no estoque recebido.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoParaRecebimento",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Localiza o pedido de compra que chegou para recebimento."
      },
      {
        "stepId": "conferirPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Confere os itens e as quantidades previstas no pedido antes de registrar a entrega."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "RecebimentoPedido",
        "effect": "create",
        "title": "x",
        "description": "Registra as quantidades efetivamente recebidas, total ou parcialmente, e dá entrada no estoque dos produtos recebidos."
      }
    ],
    "outcome": {
      "statement": "O recebimento do pedido é registrado e o estoque reflete as quantidades recebidas.",
      "evidence": [
        "Recebimento vinculado ao pedido com as quantidades efetivamente recebidas.",
        "Entrada de estoque registrada para os produtos recebidos.",
        "Situação do pedido atualizada conforme o recebimento total ou parcial."
      ]
    }
  },
  "businessHash": "sha256:1186852e721a12b844bebc31740a4b224623e1fc7dd17c98e0137c22a249bed8"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarRecebimentoPedidoJourneyType = typeof registrarRecebimentoPedidoJourney;

export default registrarRecebimentoPedidoJourney;
