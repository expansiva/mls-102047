/// <mls fileReference="_102047_/l4/agendaClinica/journeys/cadastrarPaciente.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarPacienteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarPaciente",
  "business": {
    "actorRef": "recepcionista",
    "title": "Cadastrar paciente",
    "goal": "Cadastrar ou vincular o paciente à clínica para permitir seu atendimento.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarPaciente",
        "kind": "act",
        "entity": "Paciente",
        "title": "Registrar paciente",
        "description": "Cadastra o paciente ou vincula o registro existente à clínica."
      }
    ],
    "outcome": {
      "statement": "O paciente fica disponível para agendamento na clínica.",
      "evidence": [
        "Registro do paciente identificado e vinculado ao módulo da clínica."
      ]
    }
  },
  "businessHash": "sha256:f0ba3648040e1c936f1982773f474350d9add931bbfd336af521ba2b9db2b243"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarPacienteJourneyType = typeof cadastrarPacienteJourney;

export default cadastrarPacienteJourney;
