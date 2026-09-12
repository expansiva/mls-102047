/// <mls fileReference="_102047_/l4/compras/ontology/Estoque.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityEstoque = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "Estoque",
  "title": "Estoque",
  "description": "Referência ao estoque mantido pelo módulo de controle de estoque, que recebe as entradas originadas nos recebimentos de compra.",
  "kind": "supporting",
  "party": "none",
  "displayField": "id",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador do estoque",
      "type": "uuid",
      "required": true,
      "description": "Identificador do estoque mantido externamente pelo módulo de controle de estoque."
    }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "external",
    "scope": "platform",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntityEstoqueType = typeof comprasEntityEstoque;

export default comprasEntityEstoque;
