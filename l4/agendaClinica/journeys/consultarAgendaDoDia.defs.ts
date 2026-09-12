/// <mls fileReference="_102047_/l4/agendaClinica/journeys/consultarAgendaDoDia.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarAgendaDoDiaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarAgendaDoDia",
  "business": {
    "actorRef": "profissional",
    "title": "Consultar agenda do dia",
    "goal": "Ver as próprias consultas previstas para o dia.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarConsultasDoDia",
        "kind": "locate",
        "entity": "Consulta",
        "title": "Localizar consultas do dia",
        "description": "Localiza as consultas previstas para a própria agenda no dia."
      },
      {
        "stepId": "consultarAgenda",
        "kind": "inspect",
        "entity": "Consulta",
        "title": "Consultar agenda",
        "description": "Consulta horários e pacientes das consultas encontradas."
      }
    ],
    "outcome": {
      "statement": "O profissional visualiza sua agenda do dia.",
      "evidence": [
        "Lista das consultas do dia do profissional apresentada."
      ]
    }
  },
  "businessHash": "sha256:cbbdfceae53d9c24fb1772ec7dc59e394d7ccdc9fc5e36ce7059e52fdc352b19"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarAgendaDoDiaJourneyType = typeof consultarAgendaDoDiaJourney;

export default consultarAgendaDoDiaJourney;
