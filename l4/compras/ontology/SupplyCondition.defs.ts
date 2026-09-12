/// <mls fileReference="_102047_/l4/compras/ontology/SupplyCondition.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntitySupplyCondition = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "SupplyCondition",
  "title": "Condição de fornecimento",
  "description": "Condição comercial que registra o preço combinado de um produto fornecido por um fornecedor.",
  "kind": "supporting",
  "party": "none",
  "displayField": "agreedPrice",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da condição de fornecimento."
    },
    {
      "fieldId": "supplierId",
      "title": "Fornecedor",
      "type": "uuid",
      "required": true,
      "description": "Referência ao fornecedor para o qual a condição comercial foi definida."
    },
    {
      "fieldId": "productId",
      "title": "Produto",
      "type": "uuid",
      "required": true,
      "description": "Referência ao produto fornecido sob esta condição comercial."
    },
    {
      "fieldId": "agreedPrice",
      "title": "Preço combinado",
      "type": "money",
      "required": true,
      "description": "Preço unitário combinado entre a organização e o fornecedor para o produto."
    }
  ],
  "uniqueKeys": [
    [
      "supplierId",
      "productId"
    ]
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntitySupplyConditionType = typeof comprasEntitySupplyCondition;

export default comprasEntitySupplyCondition;
