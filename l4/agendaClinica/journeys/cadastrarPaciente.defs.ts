/// <mls fileReference="_102047_/l4/agendaClinica/journeys/cadastrarPaciente.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarPacienteJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarPaciente",
  "business": {
    "actorRef": "recepcionista",
    "title": "Cadastrar paciente",
    "goal": "Registrar um paciente para viabilizar seu atendimento na clínica.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarPaciente",
        "kind": "act",
        "entity": "Paciente",
        "effect": "create",
        "title": "x",
        "description": "Cadastra ou vincula o paciente usando seus dados de identificação e contato."
      }
    ],
    "outcome": {
      "statement": "O paciente fica disponível para agendamento na clínica.",
      "evidence": [
        "Cadastro do paciente disponível para consulta e seleção em um agendamento."
      ]
    }
  },
  "businessHash": "sha256:e0e174fc65898091e092ec09d3e1fad04a1a185238bcf725c7389f7e7448bf2c"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarPacienteJourneyType = typeof cadastrarPacienteJourney;

export default cadastrarPacienteJourney;
