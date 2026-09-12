/// <mls fileReference="_102047_/l4/ordenServicio/ontology/PiezaNecesaria.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioEntityPiezaNecesaria = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "ordenServicio",
  "entityId": "PiezaNecesaria",
  "title": "Pieza necesaria",
  "description": "Pieza prevista para una orden durante el diagnóstico, con su costo interno y su consideración en el presupuesto.",
  "kind": "supporting",
  "party": "none",
  "displayField": "descripcion",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único de la pieza necesaria registrada."
    },
    {
      "fieldId": "ordenServicioId",
      "title": "Orden de servicio",
      "type": "uuid",
      "required": true,
      "description": "Orden de servicio para la que se prevé esta pieza."
    },
    {
      "fieldId": "descripcion",
      "title": "Descripción",
      "type": "string",
      "required": true,
      "description": "Descripción de la pieza necesaria para la reparación."
    },
    {
      "fieldId": "costoInterno",
      "title": "Costo interno",
      "type": "money",
      "required": true,
      "description": "Costo interno estimado de la pieza para el servicio técnico."
    },
    {
      "fieldId": "incluidaEnPresupuesto",
      "title": "Incluida en el presupuesto",
      "type": "boolean",
      "required": true,
      "description": "Indica si el costo de la pieza se considera en el presupuesto presentado al cliente."
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

export type OrdenServicioEntityPiezaNecesariaType = typeof ordenServicioEntityPiezaNecesaria;

export default ordenServicioEntityPiezaNecesaria;
