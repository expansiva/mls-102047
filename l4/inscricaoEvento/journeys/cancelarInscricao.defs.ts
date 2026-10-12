/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cancelarInscricao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cancelarInscricaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarInscricao",
  "business": {
    "actorRef": "publico",
    "title": "Cancelar inscrição",
    "goal": "Desistir da inscrição em um evento, liberando a vaga.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarInscricao",
        "kind": "locate",
        "entity": "Inscricao",
        "title": "Localizar minha inscrição",
        "description": "A pessoa localiza a própria inscrição no evento."
      },
      {
        "stepId": "cancelar",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "transition",
        "transitionRef": "cancelar",
        "title": "Cancelar inscrição",
        "description": "A pessoa cancela a inscrição; se ocupava uma vaga, o primeiro da lista de espera é promovido automaticamente para confirmado."
      }
    ],
    "outcome": {
      "statement": "A inscrição está cancelada e a vaga foi repassada ao primeiro da lista de espera, se houver.",
      "evidence": [
        "Inscrição com situação cancelada",
        "Primeira inscrição da lista de espera passa a confirmada"
      ]
    }
  },
  "businessHash": "sha256:ba42803107df0f175d32fd1ac93668a96654eba56d71c2e279571210b8437c4e"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CancelarInscricaoJourneyType = typeof cancelarInscricaoJourney;

export default cancelarInscricaoJourney;
