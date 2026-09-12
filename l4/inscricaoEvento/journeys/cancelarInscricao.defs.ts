/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cancelarInscricao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarInscricaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarInscricao",
  "business": {
    "actorRef": "publico",
    "title": "Cancelar inscrição",
    "goal": "Cancelar a própria inscrição em um evento.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarInscricao",
        "kind": "locate",
        "entity": "Inscricao",
        "title": "x",
        "description": "Localiza a própria inscrição do evento."
      },
      {
        "stepId": "inspecionarInscricao",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "x",
        "description": "Confere os dados e a situação da inscrição antes de cancelá-la."
      },
      {
        "stepId": "cancelarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "transition",
        "transitionRef": "cancelarInscricao",
        "title": "x",
        "description": "Cancela a própria inscrição, liberando a vaga quando aplicável."
      }
    ],
    "outcome": {
      "statement": "A inscrição é cancelada e a próxima pessoa elegível da lista de espera pode ser promovida.",
      "evidence": [
        "Situação da inscrição registrada como cancelada.",
        "Quando houver lista de espera, a primeira inscrição elegível passa a ocupar a vaga liberada."
      ]
    }
  },
  "businessHash": "sha256:acb36f3090f62ec9170f1b0e74d3d9bc129250d3b56a90e5c7ab7e71dfd9e9d8"
} as const satisfies Ns5JourneyArtifact;

export type CancelarInscricaoJourneyType = typeof cancelarInscricaoJourney;

export default cancelarInscricaoJourney;
