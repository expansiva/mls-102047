/// <mls fileReference="_102047_/l4/compras/ontology/Receipt.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityReceipt = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "Receipt",
  "title": "Recebimento",
  "description": "Registro do recebimento total ou parcial de um pedido de compra.",
  "kind": "event",
  "party": "none",
  "displayField": "receiptNumber",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do recebimento."
    },
    {
      "fieldId": "receiptNumber",
      "title": "Número do recebimento",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica o recebimento."
    },
    {
      "fieldId": "purchaseOrderId",
      "title": "Pedido de compra",
      "type": "uuid",
      "required": true,
      "description": "Referência ao pedido de compra ao qual este recebimento pertence."
    },
    {
      "fieldId": "receivedAt",
      "title": "Data e hora do recebimento",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que os produtos foram efetivamente recebidos."
    },
    {
      "fieldId": "receivedItems",
      "title": "Itens recebidos",
      "type": "json",
      "required": true,
      "description": "Itens do pedido e respectivas quantidades efetivamente recebidas neste registro."
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

export type ComprasEntityReceiptType = typeof comprasEntityReceipt;

export default comprasEntityReceipt;
