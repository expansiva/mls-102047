/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/lancarItemComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const lancarItemComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "lancarItemComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Lançar item na comanda",
    "goal": "Registrar um item do cardápio, sua quantidade e observação em uma comanda aberta.",
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
        "stepId": "inspecionarComanda",
        "kind": "inspect",
        "entity": "Comanda",
        "title": "Conferir comanda",
        "description": "Confere que a comanda permanece aberta antes do lançamento."
      },
      {
        "stepId": "localizarItemCardapio",
        "kind": "locate",
        "entity": "ItemCardapio",
        "title": "Localizar item do cardápio",
        "description": "Localiza o item que será consumido."
      },
      {
        "stepId": "inspecionarItemCardapio",
        "kind": "inspect",
        "entity": "ItemCardapio",
        "title": "Conferir item do cardápio",
        "description": "Confere o item e seu preço vigente no cardápio."
      },
      {
        "stepId": "registrarItemComanda",
        "kind": "act",
        "entity": "ItemComanda",
        "affects": [
          "Comanda"
        ],
        "title": "Registrar item",
        "description": "Lança o item na comanda com quantidade e observação, quando houver."
      }
    ],
    "outcome": {
      "statement": "O consumo é registrado na comanda aberta.",
      "evidence": [
        "Item lançado com quantidade e observação registrada, quando informada.",
        "Total da comanda atualizado com o item lançado."
      ]
    }
  },
  "businessHash": "sha256:839b31058d40e1104c627feaf52cd25f9649622c05ad2cc8c5c6746b5e624496"
} as const satisfies Ns5JourneyArtifact;

export type LancarItemComandaJourneyType = typeof lancarItemComandaJourney;

export default lancarItemComandaJourney;
