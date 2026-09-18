/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cancelarInscricao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarInscricaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarInscricao",
  "business": {
    "actorRef": "publico",
    "title": "Cancelar inscrição",
    "goal": "Cancelar uma inscrição no evento e liberar a vaga quando aplicável.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarInscricao",
        "kind": "locate",
        "entity": "Inscricao",
        "title": "Localizar inscrição",
        "description": "Acessa a inscrição a ser cancelada a partir do contexto do evento ou da confirmação recebida."
      },
      {
        "stepId": "consultarInscricao",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "Consultar inscrição",
        "description": "Confere o evento e a situação atual da inscrição antes do cancelamento."
      },
      {
        "stepId": "cancelarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "transition",
        "transitionRef": "cancelarInscricao",
        "title": "Cancelar inscrição",
        "description": "Cancela a inscrição. Quando a inscrição cancelada ocupava uma vaga, o primeiro inscrito da lista de espera é promovido automaticamente."
      }
    ],
    "outcome": {
      "statement": "A inscrição é cancelada e, se necessário, a próxima pessoa da lista de espera é promovida.",
      "evidence": [
        "Inscrição com situação cancelada.",
        "Vaga liberada ou total de vagas ocupadas atualizado.",
        "Primeira inscrição elegível da lista de espera marcada como confirmada, quando existir."
      ]
    }
  },
  "businessHash": "sha256:1c28983290e54ba50f3b01ec10f1eed72fd547730725e92155c43e3c9b65d3de"
} as const satisfies Ns5JourneyArtifact;

export type CancelarInscricaoJourneyType = typeof cancelarInscricaoJourney;

export default cancelarInscricaoJourney;
