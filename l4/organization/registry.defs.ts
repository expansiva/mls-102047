/// <mls fileReference="_102047_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/agentNewSolution/types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "ns4-level1-v1",
  "modules": []
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
