/// <mls fileReference="_102047_/l4/inscricaoEvento/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "inscricaoEvento",
  "processes": [
    {
      "processId": "promoverListaEspera",
      "title": "Promover lista de espera",
      "description": "Quando uma inscrição confirmada é cancelada, a vaga liberada é ocupada pela primeira inscrição da lista de espera, por ordem de chegada.",
      "trigger": {
        "kind": "event",
        "event": "Inscricao.cancelar"
      },
      "tasks": [
        {
          "taskId": "promoverPrimeiroDaEspera",
          "kind": "mechanical",
          "entityRef": "Inscricao",
          "effect": "transition",
          "transitionRef": "promover",
          "next": [],
          "description": "Se a inscrição cancelada era confirmada, a primeira inscrição da lista de espera do mesmo evento é promovida a confirmada."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarPublicarEvento",
      "inProcess": false
    },
    {
      "journeyId": "editarEvento",
      "inProcess": false
    },
    {
      "journeyId": "acompanharInscritos",
      "inProcess": false
    },
    {
      "journeyId": "inscreverEvento",
      "inProcess": false
    },
    {
      "journeyId": "cancelarInscricao",
      "inProcess": false
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type InscricaoEventoWorkflowsType = typeof inscricaoEventoWorkflows;

export default inscricaoEventoWorkflows;
