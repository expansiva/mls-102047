/// <mls fileReference="_102047_/l4/agendaClinica/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const agendaClinicaWorkflows = {
  "schemaVersion": "2026-09-12-ns5-workflows-v2",
  "moduleName": "agendaClinica",
  "processes": [
    {
      "processId": "confirmacaoDeConsulta",
      "title": "Confirmação de consulta",
      "description": "Orquestra o registro da confirmação telefônica de uma consulta agendada.",
      "trigger": {
        "kind": "manual",
        "actorRef": "recepcionista"
      },
      "tasks": [
        {
          "taskId": "registrarConfirmacao",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "confirmarConsulta",
          "next": [],
          "description": "A recepcionista confirma a consulta por telefone e registra a confirmação."
        }
      ]
    },
    {
      "processId": "registroDeFalta",
      "title": "Registro de falta",
      "description": "Orquestra o registro de não comparecimento do paciente à consulta.",
      "trigger": {
        "kind": "manual",
        "actorRef": "recepcionista"
      },
      "tasks": [
        {
          "taskId": "registrarNaoComparecimento",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "registrarFalta",
          "next": [],
          "description": "A recepcionista registra a falta do paciente na consulta."
        }
      ]
    },
    {
      "processId": "registroDeAtendimento",
      "title": "Registro de atendimento",
      "description": "Orquestra o encerramento de uma consulta pelo profissional responsável.",
      "trigger": {
        "kind": "manual",
        "actorRef": "profissional"
      },
      "tasks": [
        {
          "taskId": "registrarConsultaAtendida",
          "kind": "human",
          "actorRef": "profissional",
          "journeyRef": "registrarAtendimento",
          "next": [],
          "description": "O profissional registra o atendimento realizado e sua anotação na consulta."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarPaciente",
      "inProcess": false
    },
    {
      "journeyId": "agendarConsulta",
      "inProcess": false
    },
    {
      "journeyId": "confirmarConsulta",
      "inProcess": true,
      "processId": "confirmacaoDeConsulta"
    },
    {
      "journeyId": "registrarFalta",
      "inProcess": true,
      "processId": "registroDeFalta"
    },
    {
      "journeyId": "consultarAgendaDoDia",
      "inProcess": false
    },
    {
      "journeyId": "registrarAtendimento",
      "inProcess": true,
      "processId": "registroDeAtendimento"
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type AgendaClinicaWorkflowsType = typeof agendaClinicaWorkflows;

export default agendaClinicaWorkflows;
