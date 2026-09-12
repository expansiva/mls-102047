/// <mls fileReference="_102047_/l4/compras/ontology/Supplier.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntitySupplier = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "Supplier",
  "title": "Fornecedor",
  "description": "Empresa fornecedora vinculada à organização para participação nos processos de compra.",
  "kind": "mdm",
  "party": "organization",
  "mdmSubtype": "Company",
  "displayField": "legalName",
  "fields": [],
  "details": {
    "totalPurchasedThisMonth": {
      "type": "money",
      "description": "Valor total dos pedidos de compra do fornecedor no mês corrente."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "compras.Supplier"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntitySupplierType = typeof comprasEntitySupplier;

export default comprasEntitySupplier;
