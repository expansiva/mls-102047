/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/lancarItemNaComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const lancarItemNaComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "lancarItemNaComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Lançar item na comanda",
    "goal": "Registrar o consumo solicitado em uma comanda aberta.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaAberta",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda aberta da mesa."
      },
      {
        "stepId": "consultarCardapio",
        "kind": "inspect",
        "entity": "ItemCardapio",
        "title": "Consultar item do cardápio",
        "description": "Consulta o item e o preço vigente no cardápio para atender ao pedido."
      },
      {
        "stepId": "registrarItem",
        "kind": "act",
        "entity": "ItemComanda",
        "effect": "create",
        "title": "Lançar item",
        "description": "Registra na comanda aberta o item solicitado, sua quantidade e eventual observação."
      }
    ],
    "outcome": {
      "statement": "O item solicitado é incluído no consumo da comanda aberta.",
      "evidence": [
        "A comanda apresenta o lançamento com item, quantidade e observação informada.",
        "O total da comanda considera o lançamento realizado."
      ]
    }
  },
  "businessHash": "sha256:29368bcb11f4ba43a834e8eb6362681b2526df4dcc4a40252116970dd46c3169"
} as const satisfies Ns5JourneyArtifact;

export type LancarItemNaComandaJourneyType = typeof lancarItemNaComandaJourney;

export default lancarItemNaComandaJourney;
