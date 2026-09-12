/// <mls fileReference="_102047_/l4/compras/ontology/RecebimentoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityRecebimentoCompra = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "RecebimentoCompra",
  "title": "Recebimento de compra",
  "description": "Registro do recebimento total ou parcial dos produtos de um pedido de compra.",
  "kind": "event",
  "party": "none",
  "displayField": "numeroRecebimento",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do registro de recebimento de compra."
    },
    {
      "fieldId": "numeroRecebimento",
      "title": "Número do recebimento",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica o recebimento de compra."
    },
    {
      "fieldId": "pedidoCompraId",
      "title": "Pedido de compra",
      "type": "uuid",
      "required": true,
      "description": "Referência ao pedido de compra ao qual este recebimento pertence."
    },
    {
      "fieldId": "estoqueId",
      "title": "Estoque",
      "type": "uuid",
      "required": true,
      "description": "Referência ao estoque externo que recebe a entrada dos produtos."
    },
    {
      "fieldId": "dataRecebimento",
      "title": "Data e hora do recebimento",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que os produtos foram efetivamente recebidos."
    },
    {
      "fieldId": "itensRecebidos",
      "title": "Itens recebidos",
      "type": "json",
      "required": true,
      "description": "Lista dos produtos recebidos, com referências aos produtos e as respectivas quantidades efetivamente recebidas."
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

export type ComprasEntityRecebimentoCompraType = typeof comprasEntityRecebimentoCompra;

export default comprasEntityRecebimentoCompra;
