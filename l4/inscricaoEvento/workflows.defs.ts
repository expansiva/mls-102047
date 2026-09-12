/// <mls fileReference="_102047_/l4/inscricaoEvento/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoWorkflows = {
  "schemaVersion": "2026-09-12-ns5-workflows-v2",
  "moduleName": "inscricaoEvento",
  "processes": [
    {
      "processId": "promoverListaEsperaAposCancelamento",
      "title": "Promover lista de espera após cancelamento",
      "description": "Promove automaticamente a primeira inscrição em lista de espera quando um cancelamento libera uma vaga.",
      "trigger": {
        "kind": "event",
        "event": "Inscricao.cancelarInscricao"
      },
      "tasks": [
        {
          "taskId": "promoverPrimeiraInscricao",
          "kind": "mechanical",
          "entityRef": "Inscricao",
          "effect": "transition",
          "transitionRef": "promoverListaEspera",
          "next": [],
          "description": "Quando o cancelamento liberar uma vaga, promove a primeira inscrição da lista de espera para confirmada."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarEvento",
      "inProcess": false
    },
    {
      "journeyId": "publicarEvento",
      "inProcess": false
    },
    {
      "journeyId": "inscreverEmEvento",
      "inProcess": false
    },
    {
      "journeyId": "cancelarInscricao",
      "inProcess": false
    },
    {
      "journeyId": "acompanharInscricoesDoEvento",
      "inProcess": false
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type InscricaoEventoWorkflowsType = typeof inscricaoEventoWorkflows;

export default inscricaoEventoWorkflows;
