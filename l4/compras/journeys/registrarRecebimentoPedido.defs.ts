/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimentoPedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoPedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimentoPedido",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento de pedido",
    "goal": "Registrar o recebimento total ou parcial dos itens entregues e dar entrada no estoque.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoEnviado",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedido enviado",
        "description": "Localiza o pedido de compra correspondente à entrega recebida."
      },
      {
        "stepId": "inspecionarItensPendentes",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Inspecionar itens pendentes",
        "description": "Confere os itens e as quantidades ainda pendentes de recebimento no pedido."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Receipt",
        "affects": [
          "PurchaseOrder",
          "StockEntry"
        ],
        "title": "Registrar recebimento",
        "description": "Registra as quantidades efetivamente recebidas, total ou parcialmente, e gera as entradas correspondentes no estoque."
      }
    ],
    "outcome": {
      "statement": "O recebimento é registrado e as quantidades recebidas entram no estoque.",
      "evidence": [
        "Recebimento vinculado ao pedido de compra.",
        "Quantidades recebidas registradas por item.",
        "Entradas de estoque registradas para os produtos recebidos.",
        "Saldo pendente do pedido reflete recebimentos parciais, quando houver."
      ]
    }
  },
  "businessHash": "sha256:64a6a1ab17962237acb50f0f3e35d979e2bfa182cfab44230bab34d7222fdcc9"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarRecebimentoPedidoJourneyType = typeof registrarRecebimentoPedidoJourney;

export default registrarRecebimentoPedidoJourney;
