/// <mls fileReference="_102047_/l4/agendaClinica/journeys/consultarAgendaDoDia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarAgendaDoDiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarAgendaDoDia",
  "business": {
    "actorRef": "profissional",
    "title": "Consultar agenda do dia",
    "goal": "Ver as próprias consultas programadas para o dia.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarConsultasDoDia",
        "kind": "locate",
        "entity": "Consulta",
        "title": "x",
        "description": "Localiza as consultas do dia atribuídas ao próprio profissional."
      },
      {
        "stepId": "inspecionarAgendaDoDia",
        "kind": "inspect",
        "entity": "Consulta",
        "title": "x",
        "description": "Consulta horários e dados necessários dos pacientes da própria agenda."
      }
    ],
    "outcome": {
      "statement": "O profissional visualiza sua agenda do dia.",
      "evidence": [
        "Lista de consultas do dia atribuídas ao profissional é exibida."
      ]
    }
  },
  "businessHash": "sha256:5f5f2da222b828e7bb88bcdca43bbe862dbfbfb29c98723c8d1df74adc8c4bd3"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarAgendaDoDiaJourneyType = typeof consultarAgendaDoDiaJourney;

export default consultarAgendaDoDiaJourney;
