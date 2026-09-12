/// <mls fileReference="_102047_/l4/ordenServicio/ontology/Reparacion.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioEntityReparacion = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "ordenServicio",
  "entityId": "Reparacion",
  "title": "Reparación",
  "description": "Registro del trabajo técnico realizado sobre el aparato de una orden aprobada.",
  "kind": "event",
  "party": "none",
  "displayField": "descripcion",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único del registro de reparación."
    },
    {
      "fieldId": "ordenServicioId",
      "title": "Orden de servicio",
      "type": "uuid",
      "required": true,
      "description": "Referencia a la orden de servicio aprobada sobre la que se realizó el trabajo."
    },
    {
      "fieldId": "descripcion",
      "title": "Trabajo realizado",
      "type": "text",
      "required": true,
      "description": "Descripción del trabajo técnico efectuado durante la reparación."
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

export type OrdenServicioEntityReparacionType = typeof ordenServicioEntityReparacion;

export default ordenServicioEntityReparacion;
