/// <mls fileReference="_102047_/l4/compras/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const comprasIntegration = {
  "schemaVersion": "2026-09-10-ns5-integration-v1",
  "moduleName": "compras",
  "inbound": [],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type ComprasIntegrationType = typeof comprasIntegration;

export default comprasIntegration;
