/// <mls fileReference="_102047_/l4/manutencaoFrota/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaIntegration = {
  "schemaVersion": "2026-09-10-ns5-integration-v1",
  "moduleName": "manutencaoFrota",
  "inbound": [],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ManutencaoFrotaIntegrationType = typeof manutencaoFrotaIntegration;

export default manutencaoFrotaIntegration;
