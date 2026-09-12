/// <mls fileReference="_102047_/l4/locacaoEquipamentos/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosIntegration = {
  "schemaVersion": "2026-09-10-ns5-integration-v1",
  "moduleName": "locacaoEquipamentos",
  "inbound": [],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type LocacaoEquipamentosIntegrationType = typeof locacaoEquipamentosIntegration;

export default locacaoEquipamentosIntegration;
