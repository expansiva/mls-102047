/// <mls fileReference="_102047_/l4/manutencaoFrota/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "manutencaoFrota",
  "processes": [
    {
      "processId": "atualizarPlanoAposPreventiva",
      "title": "Atualizar plano após preventiva concluída",
      "description": "Quando uma ordem de manutenção preventiva é concluída, o plano do veículo passa a prever o km e a data da próxima preventiva.",
      "trigger": {
        "kind": "event",
        "event": "OrdemManutencao.concluir"
      },
      "tasks": [
        {
          "taskId": "recalcularProximaPreventiva",
          "kind": "mechanical",
          "entityRef": "PlanoManutencao",
          "effect": "update",
          "next": [],
          "description": "Se a ordem concluída for preventiva, o sistema atualiza no plano vinculado a referência da última preventiva e o km e a data previstos para a próxima."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "registrarAbastecimento",
      "inProcess": false
    },
    {
      "journeyId": "consultarMeusVeiculos",
      "inProcess": false
    },
    {
      "journeyId": "cadastrarVeiculo",
      "inProcess": false
    },
    {
      "journeyId": "cadastrarPlanoPreventiva",
      "inProcess": false
    },
    {
      "journeyId": "abrirOrdemPorAviso",
      "inProcess": false
    },
    {
      "journeyId": "abrirOrdemPorDefeito",
      "inProcess": false
    },
    {
      "journeyId": "concluirOrdem",
      "inProcess": false
    },
    {
      "journeyId": "acompanharFrota",
      "inProcess": false
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type ManutencaoFrotaWorkflowsType = typeof manutencaoFrotaWorkflows;

export default manutencaoFrotaWorkflows;
