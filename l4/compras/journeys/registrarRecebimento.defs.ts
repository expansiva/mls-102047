/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimento",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento do pedido",
    "goal": "Registrar a chegada total ou parcial de um pedido e dar entrada no estoque.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedido",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Localizar pedido a receber",
        "description": "O almoxarife encontra o pedido enviado ou aprovado que chegou."
      },
      {
        "stepId": "conferirPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Conferir itens pendentes",
        "description": "O almoxarife confere as quantidades pedidas e ainda não recebidas."
      },
      {
        "stepId": "registrarEntrada",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar quantidades recebidas",
        "description": "O almoxarife informa a quantidade recebida de cada item; isso dá entrada no estoque dos produtos e marca o pedido como recebido total ou parcialmente."
      }
    ],
    "outcome": {
      "statement": "O recebimento foi registrado e o estoque dos produtos aumentou.",
      "evidence": [
        "O pedido aparece como recebido ou parcialmente recebido.",
        "O estoque dos produtos recebidos mostra a nova quantidade."
      ]
    }
  },
  "businessHash": "sha256:3aed431c54547ff2b2f50e3b62f90dd76bdaa9f81340b01e32a3926d5de0d99e"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarRecebimentoJourneyType = typeof registrarRecebimentoJourney;

export default registrarRecebimentoJourney;
