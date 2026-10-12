/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/editarEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const editarEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "editarEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Editar evento",
    "goal": "Corrigir os dados de um evento já cadastrado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEvento",
        "kind": "locate",
        "entity": "Evento",
        "title": "Localizar evento",
        "description": "O organizador busca o evento na lista de eventos."
      },
      {
        "stepId": "atualizarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "update",
        "title": "Atualizar dados do evento",
        "description": "O organizador altera título, descrição, data, local ou número de vagas."
      }
    ],
    "outcome": {
      "statement": "Os dados do evento estão atualizados.",
      "evidence": [
        "Evento exibe os novos dados"
      ]
    }
  },
  "businessHash": "sha256:6a2152623660be8f4f56cb9fc83704d7ebd4c9bc3501db84a7c0c1c298aa03cf"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type EditarEventoJourneyType = typeof editarEventoJourney;

export default editarEventoJourney;
