/// <mls fileReference="_102047_/l4/agendaClinica/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const agendaClinicaWorkflows = {
  "schemaVersion": "2026-09-10-ns5-workflows-v1",
  "moduleName": "agendaClinica",
  "processes": [
    {
      "processId": "acompanharConsulta",
      "title": "Acompanhar consulta",
      "description": "Coordena o acompanhamento de uma consulta agendada entre a recepção e o profissional até seu desfecho.",
      "tasks": [
        {
          "taskId": "agendarConsulta",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "agendarConsulta",
          "stepRef": "registrarConsulta",
          "next": [
            "confirmarConsulta",
            "registrarFalta",
            "registrarAtendimento"
          ],
          "description": "A recepcionista registra a consulta agendada para iniciar seu acompanhamento."
        },
        {
          "taskId": "confirmarConsulta",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "confirmarConsultaPorTelefone",
          "stepRef": "registrarConfirmacao",
          "next": [
            "registrarFalta",
            "registrarAtendimento"
          ],
          "description": "A recepcionista registra a confirmação telefônica antes do desfecho da consulta."
        },
        {
          "taskId": "registrarFalta",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "registrarFaltaDoPaciente",
          "stepRef": "registrarFalta",
          "next": [],
          "description": "A recepcionista registra a falta quando o paciente não comparece."
        },
        {
          "taskId": "registrarAtendimento",
          "kind": "human",
          "actorRef": "profissional",
          "journeyRef": "registrarAtendimento",
          "stepRef": "registrarAtendimentoRealizado",
          "next": [],
          "description": "O profissional registra o atendimento realizado e sua anotação."
        }
      ]
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type AgendaClinicaWorkflowsType = typeof agendaClinicaWorkflows;

export default agendaClinicaWorkflows;
