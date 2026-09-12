/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/publicarEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const publicarEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "publicarEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Publicar evento",
    "goal": "Disponibilizar um evento cadastrado para inscrições públicas.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEvento",
        "kind": "locate",
        "entity": "Evento",
        "title": "x",
        "description": "Localiza o evento cadastrado que deseja publicar."
      },
      {
        "stepId": "inspecionarEvento",
        "kind": "inspect",
        "entity": "Evento",
        "title": "x",
        "description": "Confere os dados e a capacidade do evento antes de disponibilizá-lo ao público."
      },
      {
        "stepId": "publicarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "transition",
        "transitionRef": "publicarEvento",
        "title": "x",
        "description": "Publica o evento e sua página de inscrição pública."
      }
    ],
    "outcome": {
      "statement": "O evento publicado pode receber inscrições do público.",
      "evidence": [
        "Evento identificado como publicado.",
        "Página pública de inscrição disponível."
      ]
    }
  },
  "businessHash": "sha256:b795cede7a06ac13490a5a1e84f357849b3257c6f575adf13443c5ea1ce469e3"
} as const satisfies Ns5JourneyArtifact;

export type PublicarEventoJourneyType = typeof publicarEventoJourney;

export default publicarEventoJourney;
