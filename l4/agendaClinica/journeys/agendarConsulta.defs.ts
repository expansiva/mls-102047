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
        "title": "x",
        "description": "Localiza o paciente já cadastrado para o agendamento."
      },
      {
        "stepId": "localizarProfissional",
        "kind": "locate",
        "entity": "Profissional",
        "title": "x",
        "description": "Localiza o médico ou terapeuta que realizará a consulta."
      },
      {
        "stepId": "criarConsulta",
        "kind": "act",
        "entity": "Consulta",
        "effect": "create",
        "title": "x",
        "description": "Registra a consulta com paciente, profissional, data e hora, somente em horário livre."
      }
    ],
    "outcome": {
      "statement": "Uma consulta é marcada para o paciente com o profissional no horário escolhido.",
      "evidence": [
        "Consulta registrada com paciente, profissional, data e hora.",
        "Horário do profissional permanece sem duplicidade de consulta."
      ]
    }
  },
  "businessHash": "sha256:95c355343f6a297a7b3ab793b212810cda73295768f0fc8f14466b8e4f42ae63"
} as const satisfies Ns5JourneyArtifact;

export type AgendarConsultaJourneyType = typeof agendarConsultaJourney;

export default agendarConsultaJourney;
