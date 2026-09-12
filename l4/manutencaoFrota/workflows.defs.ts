/// <mls fileReference="_102047_/l4/manutencaoFrota/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaWorkflows = {
  "schemaVersion": "2026-09-10-ns5-workflows-v1",
  "moduleName": "manutencaoFrota",
  "processes": []
} as const satisfies Ns5WorkflowsArtifact;

export type ManutencaoFrotaWorkflowsType = typeof manutencaoFrotaWorkflows;

export default manutencaoFrotaWorkflows;
