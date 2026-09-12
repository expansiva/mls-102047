/// <mls fileReference="_102047_/l4/compras/ontology/PurchaseOrderItem.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityPurchaseOrderItem = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "PurchaseOrderItem",
  "title": "Item do pedido de compra",
  "description": "Produto, quantidade e preço registrados como componente de um pedido de compra.",
  "kind": "supporting",
  "party": "none",
  "displayField": "quantity",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador do item",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item do pedido de compra."
    },
    {
      "fieldId": "purchaseOrderId",
      "title": "Pedido de compra",
      "type": "uuid",
      "required": true,
      "description": "Referência ao pedido de compra ao qual o item pertence."
    },
    {
      "fieldId": "productId",
      "title": "Produto",
      "type": "uuid",
      "required": true,
      "description": "Referência ao produto solicitado neste item."
    },
    {
      "fieldId": "quantity",
      "title": "Quantidade",
      "type": "number",
      "required": true,
      "description": "Quantidade do produto solicitada no item."
    },
    {
      "fieldId": "unitPrice",
      "title": "Preço unitário",
      "type": "money",
      "required": true,
      "description": "Preço unitário combinado para o produto neste pedido."
    }
  ],
  "details": {
    "lineTotal": {
      "type": "money",
      "description": "Valor total do item, calculado pela quantidade multiplicada pelo preço unitário."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntityPurchaseOrderItemType = typeof comprasEntityPurchaseOrderItem;

export default comprasEntityPurchaseOrderItem;
