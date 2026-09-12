/// <mls fileReference="_102047_/l4/controleEstoque/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const controleEstoqueOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "controleEstoque",
  "businessDomain": "Controle de estoque de produtos, com registro imutável de entradas e saídas e acompanhamento do saldo disponível em relação ao estoque mínimo.",
  "entities": [
    "Product",
    "StockMovement"
  ],
  "relationships": [
    {
      "relationshipId": "stockMovementProduct",
      "fromEntity": "StockMovement",
      "toEntity": "Product",
      "type": "manyToOne",
      "required": true,
      "description": "Cada movimentação de estoque registra a entrada ou saída de unidades de um produto controlado.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "StockMovement",
        "from": {
          "entityId": "StockMovement",
          "fieldIds": [
            "productId"
          ]
        },
        "to": {
          "entityId": "Product",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type ControleEstoqueOntologyIndexType = typeof controleEstoqueOntologyIndex;

export default controleEstoqueOntologyIndex;
