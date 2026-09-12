/// <mls fileReference="_102047_/l4/compras/ontology/Comprador.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comprasEntityComprador = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "compras",
  "entityId": "Comprador",
  "title": "Comprador responsável",
  "description": "Pessoa responsável pelos fornecedores e ofertas que cadastra no módulo de compras.",
  "kind": "mdm",
  "party": "person",
  "mdmSubtype": "Person",
  "displayField": "name",
  "fields": [],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "compras.Comprador"
  },
  "writer": "crud"
} as const satisfies Ns5OntologyEntityArtifact;

export type ComprasEntityCompradorType = typeof comprasEntityComprador;

export default comprasEntityComprador;
