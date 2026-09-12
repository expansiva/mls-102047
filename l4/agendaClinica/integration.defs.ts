/// <mls fileReference="_102047_/l4/agendaClinica/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact } from '/_102035_/l2/solution/types.js';

export const agendaClinicaIntegration = {
  "schemaVersion": "2026-09-10-ns5-integration-v1",
  "moduleName": "agendaClinica",
  "inbound": [],
  "outbound": [],
  "plugins": []
} as const satisfies Ns5IntegrationArtifact;

export type AgendaClinicaIntegrationType = typeof agendaClinicaIntegration;

export default agendaClinicaIntegration;
