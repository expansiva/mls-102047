/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/cancelarItemLancado.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarItemLancadoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarItemLancado",
  "business": {
    "actorRef": "garcom",
    "title": "Cancelar item lançado por engano",
    "goal": "Retirar um lançamento incorreto de uma comanda que ainda está aberta.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaParaCancelamento",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda aberta da mesa."
      },
      {
        "stepId": "inspecionarLancamento",
        "kind": "inspect",
        "entity": "ItemComanda",
        "title": "Inspecionar lançamento",
        "description": "Confere o lançamento que foi registrado por engano antes de cancelá-lo."
      },
      {
        "stepId": "cancelarLancamento",
        "kind": "act",
        "entity": "ItemComanda",
        "effect": "transition",
        "transitionRef": "cancelarItem",
        "title": "Cancelar item",
        "description": "Cancela o item lançado por engano enquanto a comanda permanece aberta."
      }
    ],
    "outcome": {
      "statement": "O lançamento incorreto deixa de compor o consumo da comanda.",
      "evidence": [
        "O item consta como cancelado na comanda.",
        "O total da comanda é recalculado sem o item cancelado."
      ]
    }
  },
  "businessHash": "sha256:52c2163f74e0f4b849c6fdf39370c707b2c657b62b0dfafdef8ee81e4157d70d"
} as const satisfies Ns5JourneyArtifact;

export type CancelarItemLancadoJourneyType = typeof cancelarItemLancadoJourney;

export default cancelarItemLancadoJourney;
