/// <mls fileReference="_102047_/l4/notasTeste41/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41Workflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "notasTeste41",
  "processes": [],
  "journeyDecisions": [
    {
      "journeyId": "registrarNota",
      "inProcess": false
    },
    {
      "journeyId": "consultarNota",
      "inProcess": false
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type NotasTeste41WorkflowsType = typeof notasTeste41Workflows;

export default notasTeste41Workflows;
