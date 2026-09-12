/// <mls fileReference="_102047_/l4/reembolsoDespesas/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const reembolsoDespesasIntegration = {
  "schemaVersion": "2026-09-10-ns5-integration-v1",
  "moduleName": "reembolsoDespesas",
  "inbound": [],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ReembolsoDespesasIntegrationType = typeof reembolsoDespesasIntegration;

export default reembolsoDespesasIntegration;
