/// <mls fileReference="_102047_/l4/compras/ontology/StockEntry.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityStockEntry = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "StockEntry",
  "title": "Entrada de estoque",
  "description": "Fato de entrada em estoque gerado pelas quantidades efetivamente recebidas.",
  "kind": "event",
  "party": "none",
  "displayField": "entryDate",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da entrada de estoque."
    },
    {
      "fieldId": "receiptId",
      "title": "Recebimento",
      "type": "uuid",
      "required": true,
      "description": "Referência ao recebimento que gerou esta entrada de estoque."
    },
    {
      "fieldId": "purchaseOrderItemId",
      "title": "Item do pedido de compra",
      "type": "uuid",
      "required": true,
      "description": "Referência ao item do pedido de compra efetivamente recebido."
    },
    {
      "fieldId": "productId",
      "title": "Produto",
      "type": "uuid",
      "required": true,
      "description": "Referência ao produto que entrou no estoque."
    },
    {
      "fieldId": "entryDate",
      "title": "Data da entrada",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a entrada do produto foi registrada no estoque."
    },
    {
      "fieldId": "quantity",
      "title": "Quantidade recebida",
      "type": "number",
      "required": true,
      "description": "Quantidade do produto efetivamente recebida e registrada nesta entrada."
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

export type ComprasEntityStockEntryType = typeof comprasEntityStockEntry;

export default comprasEntityStockEntry;
