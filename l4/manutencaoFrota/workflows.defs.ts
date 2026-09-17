/// <mls fileReference="_102047_/l4/manutencaoFrota/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaWorkflows = {
  "schemaVersion": "2026-09-12-ns5-workflows-v2",
  "moduleName": "manutencaoFrota",
  "processes": [
    {
      "processId": "alertarPreventivaVencida",
      "title": "Alertar preventiva vencida",
      "description": "Identifica planos cuja quilometragem prevista para a manutenção preventiva foi ultrapassada e encaminha o tratamento ao gestor de frota.",
      "trigger": {
        "kind": "scheduled",
        "schedule": "quando um veículo passou do km previsto para a próxima preventiva"
      },
      "tasks": [
        {
          "taskId": "identificarPlanoEmAtraso",
          "kind": "mechanical",
          "entityRef": "MaintenancePlan",
          "effect": "update",
          "next": [
            "tratarAlertaPreventiva"
          ],
          "description": "Identifica o plano preventivo em atraso pela quilometragem atual do veículo e sinaliza o alerta correspondente."
        },
        {
          "taskId": "tratarAlertaPreventiva",
          "kind": "human",
          "actorRef": "gestor",
          "journeyRef": "tratarAlertaPreventivaVencida",
          "next": [],
          "description": "O gestor avalia o plano alertado e abre a ordem de manutenção preventiva necessária."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "consultarVeiculosAtribuidos",
      "inProcess": false
    },
    {
      "journeyId": "registrarAbastecimento",
      "inProcess": false
    },
    {
      "journeyId": "cadastrarPlanoPreventivo",
      "inProcess": false
    },
    {
      "journeyId": "abrirOrdemPorDefeito",
      "inProcess": false
    },
    {
      "journeyId": "tratarAlertaPreventivaVencida",
      "inProcess": true,
      "processId": "alertarPreventivaVencida"
    },
    {
      "journeyId": "registrarConclusaoOrdemManutencao",
      "inProcess": false
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type ManutencaoFrotaWorkflowsType = typeof manutencaoFrotaWorkflows;

export default manutencaoFrotaWorkflows;
