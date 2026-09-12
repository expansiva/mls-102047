/// <mls fileReference="_102047_/l4/ordenServicio/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "ordenServicio",
  "businessDomain": "Servicio técnico de electrónica",
  "entities": [
    "Cliente",
    "Aparato",
    "OrdenServicio",
    "PiezaNecesaria",
    "Reparacion"
  ],
  "relationships": [
    {
      "relationshipId": "ordenServicioCliente",
      "fromEntity": "OrdenServicio",
      "toEntity": "Cliente",
      "type": "manyToOne",
      "required": true,
      "description": "Cada orden de servicio corresponde a un cliente.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "OrdenServicio",
        "from": {
          "entityId": "OrdenServicio",
          "fieldIds": [
            "clienteId"
          ]
        },
        "to": {
          "entityId": "Cliente",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "ordenServicioAparato",
      "fromEntity": "OrdenServicio",
      "toEntity": "Aparato",
      "type": "manyToOne",
      "required": true,
      "description": "Cada orden de servicio se abre para un aparato recibido.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "OrdenServicio",
        "from": {
          "entityId": "OrdenServicio",
          "fieldIds": [
            "aparatoId"
          ]
        },
        "to": {
          "entityId": "Aparato",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "piezasNecesariasOrdenServicio",
      "fromEntity": "PiezaNecesaria",
      "toEntity": "OrdenServicio",
      "type": "manyToOne",
      "required": true,
      "description": "Cada pieza necesaria se registra para una orden de servicio.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "PiezaNecesaria",
        "from": {
          "entityId": "PiezaNecesaria",
          "fieldIds": [
            "ordenServicioId"
          ]
        },
        "to": {
          "entityId": "OrdenServicio",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "reparacionOrdenServicio",
      "fromEntity": "Reparacion",
      "toEntity": "OrdenServicio",
      "type": "manyToOne",
      "required": true,
      "description": "Cada reparación documenta el trabajo realizado en una orden de servicio aprobada.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Reparacion",
        "from": {
          "entityId": "Reparacion",
          "fieldIds": [
            "ordenServicioId"
          ]
        },
        "to": {
          "entityId": "OrdenServicio",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type OrdenServicioOntologyIndexType = typeof ordenServicioOntologyIndex;

export default ordenServicioOntologyIndex;
