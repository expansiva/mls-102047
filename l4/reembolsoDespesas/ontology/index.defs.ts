/// <mls fileReference="_102047_/l4/reembolsoDespesas/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const reembolsoDespesasOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "reembolsoDespesas",
  "businessDomain": "Reembolso de despesas de colaboradores",
  "entities": [
    "Despesa"
  ],
  "relationships": []
} as const satisfies Ns5OntologyIndexArtifact;

export type ReembolsoDespesasOntologyIndexType = typeof reembolsoDespesasOntologyIndex;

export default reembolsoDespesasOntologyIndex;
