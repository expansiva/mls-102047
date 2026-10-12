/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cancelarInscricao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cancelarInscricaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarInscricao",
  "business": {
    "actorRef": "publico",
    "title": "Cancelar inscrição",
    "goal": "Desistir da própria inscrição em um evento, liberando a vaga.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarInscricao",
        "kind": "locate",
        "entity": "Inscricao",
        "title": "Localizar minha inscrição",
        "description": "A pessoa encontra a própria inscrição no evento."
      },
      {
        "stepId": "cancelarMinhaInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "transition",
        "transitionRef": "cancelar",
        "title": "Cancelar inscrição",
        "description": "A pessoa cancela a inscrição; se era confirmada, o primeiro da lista de espera é promovido para a vaga liberada."
      }
    ],
    "outcome": {
      "statement": "A inscrição está cancelada e a vaga foi repassada ao primeiro da lista de espera, se houver.",
      "evidence": [
        "Inscrição com situação cancelada",
        "Primeiro da lista de espera com inscrição confirmada"
      ]
    }
  },
  "businessHash": "sha256:5726b6196b406b6afc855abe03f56dce4ba8afee99655c3d11fc37d33cf22a18"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CancelarInscricaoJourneyType = typeof cancelarInscricaoJourney;

export default cancelarInscricaoJourney;
