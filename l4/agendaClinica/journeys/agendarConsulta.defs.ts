/// <mls fileReference="_102047_/l4/agendaClinica/journeys/agendarConsulta.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const agendarConsultaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "agendarConsulta",
  "business": {
    "actorRef": "recepcionista",
    "title": "Agendar consulta",
    "goal": "Marcar uma consulta para um paciente com um profissional em data e horário disponíveis.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPaciente",
        "kind": "locate",
        "entity": "Paciente",
        "title": "Localizar paciente",
        "description": "Localiza o paciente que receberá a consulta."
      },
      {
        "stepId": "localizarProfissional",
        "kind": "locate",
        "entity": "Profissional",
        "title": "Localizar profissional",
        "description": "Localiza o médico ou terapeuta que realizará a consulta."
      },
      {
        "stepId": "registrarConsulta",
        "kind": "act",
        "entity": "Consulta",
        "title": "Registrar consulta",
        "description": "Agenda a consulta na data e horário escolhidos para o profissional."
      }
    ],
    "outcome": {
      "statement": "A consulta fica agendada para o paciente e o profissional.",
      "evidence": [
        "Consulta registrada com paciente, profissional, data e horário.",
        "O horário do profissional fica reservado para a consulta."
      ]
    }
  },
  "businessHash": "sha256:d2bf320d66011c391384809a5fedbd917bc41c23c837dcfb7dd40afbaceae8be"
} as const satisfies Ns5JourneyArtifact;

export type AgendarConsultaJourneyType = typeof agendarConsultaJourney;

export default agendarConsultaJourney;
