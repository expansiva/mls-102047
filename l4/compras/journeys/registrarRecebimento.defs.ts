/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimento",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento",
    "goal": "Registrar o recebimento total ou parcial do pedido e dar entrada no estoque dos produtos recebidos.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoRecebimento",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Localizar pedido de compra",
        "description": "Encontra o pedido já em mãos ou busca o pedido cuja mercadoria chegou."
      },
      {
        "stepId": "conferirItensPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Conferir itens do pedido",
        "description": "Confere os produtos e as quantidades pedidas para registrar o que de fato chegou."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "Registra o recebimento total ou parcial e dá entrada no estoque dos produtos recebidos."
      }
    ],
    "outcome": {
      "statement": "O recebimento total ou parcial fica registrado e os produtos recebidos entram no estoque.",
      "evidence": [
        "O pedido mostra as quantidades recebidas.",
        "O estoque dos produtos recebidos é atualizado."
      ]
    }
  },
  "businessHash": "sha256:1074ca7c9b3bbbeefc730baedf690cc94e5550cc1642c53ddf8e8a85728cde89"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarRecebimentoJourneyType = typeof registrarRecebimentoJourney;

export default registrarRecebimentoJourney;
