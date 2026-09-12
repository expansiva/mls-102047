/// <mls fileReference="_102047_/l4/compras/ontology/Product.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityProduct = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "Product",
  "title": "Produto",
  "description": "Produto do cadastro mestre utilizado nas condições de fornecimento, pedidos e entradas de estoque.",
  "kind": "mdm",
  "party": "none",
  "mdmSubtype": "Product",
  "displayField": "name",
  "fields": [],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "compras.Product"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntityProductType = typeof comprasEntityProduct;

export default comprasEntityProduct;
