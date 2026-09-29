/// <mls fileReference="_102047_/l4/financeiro/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "financeiro",
  "processes": [],
  "journeyDecisions": [
    {
      "journeyId": "receberTitulo",
      "inProcess": false
    },
    {
      "journeyId": "estornarRecebimentoNoMesmoDia",
      "inProcess": false
    },
    {
      "journeyId": "acompanharRecebiveis",
      "inProcess": false
    },
    {
      "journeyId": "emitirExtratoPorPagador",
      "inProcess": false
    },
    {
      "journeyId": "consultarMeusTitulosErecebimentos",
      "inProcess": false
    },
    {
      "journeyId": "pagarTituloComCartao",
      "inProcess": false
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type FinanceiroWorkflowsType = typeof financeiroWorkflows;

export default financeiroWorkflows;
