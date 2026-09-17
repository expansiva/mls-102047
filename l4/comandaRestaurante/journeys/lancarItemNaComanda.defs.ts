/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/lancarItemNaComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const lancarItemNaComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "lancarItemNaComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Lançar item na comanda",
    "goal": "Registrar um pedido com quantidade e observação em uma comanda aberta.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaAberta",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza uma comanda aberta da mesa atendida."
      },
      {
        "stepId": "consultarItemDoCardapio",
        "kind": "inspect",
        "entity": "ItemCardapio",
        "title": "Consultar item do cardápio",
        "description": "Consulta o item e o preço vigente no cardápio antes de incluí-lo no pedido."
      },
      {
        "stepId": "registrarItemLancado",
        "kind": "act",
        "entity": "ItemComanda",
        "effect": "create",
        "title": "Lançar item",
        "description": "Registra na comanda aberta o item escolhido, a quantidade e a observação informada."
      }
    ],
    "outcome": {
      "statement": "O item solicitado é lançado na comanda aberta.",
      "evidence": [
        "Existe um lançamento de item com quantidade e observação na comanda.",
        "O valor parcial e o total da comanda refletem o lançamento."
      ]
    }
  },
  "businessHash": "sha256:76eeb6ec3118718f81a9ba7b4ba0dc411e6e29e3cbbf342c9058c6c428a47f1a"
} as const satisfies Ns5JourneyArtifact;

export type LancarItemNaComandaJourneyType = typeof lancarItemNaComandaJourney;

export default lancarItemNaComandaJourney;
