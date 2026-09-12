/// <mls fileReference="_102047_/l4/agendaClinica/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const agendaClinicaJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "agendaClinica",
  "journeys": [
    {
      "journeyId": "cadastrarPaciente",
      "actorRef": "recepcionista",
      "title": "Cadastrar paciente"
    },
    {
      "journeyId": "agendarConsulta",
      "actorRef": "recepcionista",
      "title": "Agendar consulta"
    },
    {
      "journeyId": "confirmarConsultaPorTelefone",
      "actorRef": "recepcionista",
      "title": "Confirmar consulta por telefone"
    },
    {
      "journeyId": "registrarFaltaDoPaciente",
      "actorRef": "recepcionista",
      "title": "Registrar falta do paciente"
    },
    {
      "journeyId": "consultarAgendaDoDia",
      "actorRef": "profissional",
      "title": "Consultar agenda do dia"
    },
    {
      "journeyId": "registrarAtendimento",
      "actorRef": "profissional",
      "title": "Registrar atendimento realizado"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type AgendaClinicaJourneyIndexType = typeof agendaClinicaJourneyIndex;

export default agendaClinicaJourneyIndex;
