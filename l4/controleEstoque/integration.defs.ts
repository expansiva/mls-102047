/// <mls fileReference="_102047_/l4/controleEstoque/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const controleEstoqueIntegration = {
  "schemaVersion": "2026-09-10-ns5-integration-v1",
  "moduleName": "controleEstoque",
  "inbound": [],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ControleEstoqueIntegrationType = typeof controleEstoqueIntegration;

export default controleEstoqueIntegration;
