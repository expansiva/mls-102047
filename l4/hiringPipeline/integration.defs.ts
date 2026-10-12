/// <mls fileReference="_102047_/l4/hiringPipeline/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const hiringPipelineIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "hiringPipeline",
  "inbound": [],
  "outbound": [
    {
      "id": "candidateHired",
      "kind": "event",
      "to": "any",
      "event": "candidateHired",
      "on": "Application.hire",
      "description": "Published when the hiring manager confirms a hire, so other modules (for example onboarding or payroll) can start working with the new hire and the position they were hired for.",
      "entityRefs": [
        "Application",
        "Candidate",
        "JobPosition"
      ]
    },
    {
      "id": "positionClosed",
      "kind": "event",
      "to": "any",
      "event": "positionClosed",
      "on": "JobPosition.closePosition",
      "description": "Published when a job position closes automatically after its headcount is filled, so other modules know the opening is no longer available.",
      "entityRefs": [
        "JobPosition"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type HiringPipelineIntegrationType = typeof hiringPipelineIntegration;

export default hiringPipelineIntegration;
