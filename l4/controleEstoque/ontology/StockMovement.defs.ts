/// <mls fileReference="_102047_/l4/controleEstoque/ontology/StockMovement.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const controleEstoqueEntityStockMovement = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "controleEstoque",
  "entityId": "StockMovement",
  "title": "Movimentação de estoque",
  "description": "Registro definitivo de uma entrada ou saída de unidades de um produto controlado.",
  "kind": "event",
  "party": "none",
  "displayField": "movementType",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador da movimentação",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da movimentação de estoque."
    },
    {
      "fieldId": "productId",
      "title": "Produto",
      "type": "uuid",
      "required": true,
      "description": "Referência ao produto controlado selecionado para a movimentação."
    },
    {
      "fieldId": "movementType",
      "title": "Tipo de movimentação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "entry",
          "title": "Entrada"
        },
        {
          "value": "exit",
          "title": "Saída"
        }
      ],
      "description": "Indica se as unidades foram recebidas ou retiradas do estoque."
    },
    {
      "fieldId": "quantity",
      "title": "Quantidade",
      "type": "integer",
      "required": true,
      "constraints": {
        "min": 1
      },
      "description": "Quantidade inteira de unidades registrada na entrada ou saída."
    },
    {
      "fieldId": "registeredAt",
      "title": "Data e hora do registro",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a movimentação foi registrada definitivamente."
    }
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

export type ControleEstoqueEntityStockMovementType = typeof controleEstoqueEntityStockMovement;

export default controleEstoqueEntityStockMovement;
