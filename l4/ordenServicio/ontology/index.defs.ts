/// <mls fileReference="_102047_/l4/ordenServicio/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const ordenServicioOntologyIndex = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "ordenServicio",
  "businessDomain": "Servicio técnico de electrónica",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "ordenServicio",
    "description": "Branch details.ordenServicio of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Cliente",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Aparato",
      "kind": "role",
      "subtype": "AssetEquipment"
    },
    {
      "entityId": "OrdenServicio",
      "kind": "entity",
      "class": "core"
    }
  ],
  "relationships": [
    {
      "relationshipId": "ordenServicioCliente",
      "from": "OrdenServicio",
      "to": "Cliente",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada orden de servicio corresponde a un cliente; un cliente puede tener varias órdenes.",
      "field": "OrdenServicio.clienteId"
    },
    {
      "relationshipId": "ordenServicioAparato",
      "from": "OrdenServicio",
      "to": "Aparato",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada orden registra el aparato recibido; un aparato puede contar con varias órdenes de servicio a lo largo de su historial.",
      "field": "OrdenServicio.aparatoId"
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type OrdenServicioOntologyIndexType = typeof ordenServicioOntologyIndex;

export default ordenServicioOntologyIndex;
