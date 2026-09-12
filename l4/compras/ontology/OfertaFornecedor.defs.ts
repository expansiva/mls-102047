/// <mls fileReference="_102047_/l4/compras/ontology/OfertaFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityOfertaFornecedor = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "OfertaFornecedor",
  "title": "Oferta de fornecedor",
  "description": "Condição comercial cadastrada para um produto fornecido, incluindo o preço combinado.",
  "kind": "supporting",
  "party": "none",
  "displayField": "codigoOferta",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da oferta de fornecedor."
    },
    {
      "fieldId": "codigoOferta",
      "title": "Código da oferta",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Código único que identifica a condição comercial cadastrada."
    },
    {
      "fieldId": "fornecedorId",
      "title": "Fornecedor",
      "type": "uuid",
      "required": true,
      "description": "Referência ao fornecedor ao qual a oferta comercial pertence."
    },
    {
      "fieldId": "produtoId",
      "title": "Produto",
      "type": "uuid",
      "required": true,
      "description": "Referência ao produto fornecido nesta oferta."
    },
    {
      "fieldId": "precoCombinado",
      "title": "Preço combinado",
      "type": "money",
      "required": true,
      "constraints": {
        "min": 0,
        "precision": 2
      },
      "description": "Preço unitário combinado com o fornecedor para o produto."
    }
  ],
  "uniqueKeys": [
    [
      "fornecedorId",
      "produtoId"
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

export type ComprasEntityOfertaFornecedorType = typeof comprasEntityOfertaFornecedor;

export default comprasEntityOfertaFornecedor;
