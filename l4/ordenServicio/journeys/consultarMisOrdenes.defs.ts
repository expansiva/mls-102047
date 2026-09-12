/// <mls fileReference="_102047_/l4/ordenServicio/journeys/consultarMisOrdenes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMisOrdenesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMisOrdenes",
  "business": {
    "actorRef": "cliente",
    "title": "Consultar mis órdenes de servicio",
    "goal": "Ver el estado y la información permitida de las propias órdenes desde el portal.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMisOrdenes",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar mis órdenes.",
        "description": "Acceder al listado de órdenes vinculadas al propio cliente."
      },
      {
        "stepId": "consultarDetalleOrden",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Consultar el detalle permitido de una orden.",
        "description": "Ver el estado, el diagnóstico y el valor del presupuesto de una orden propia, sin costos internos de piezas ni anotaciones técnicas."
      }
    ],
    "outcome": {
      "statement": "El cliente consulta únicamente sus propias órdenes y la información habilitada para él.",
      "evidence": [
        "Las órdenes visibles pertenecen al cliente de la sesión.",
        "Cada orden muestra su estado, diagnóstico y valor de presupuesto.",
        "No se muestran costos internos de piezas ni anotaciones técnicas."
      ]
    }
  },
  "businessHash": "sha256:d8e0bbe3aa070284d8659bdb85c8396c777e26e2fae1161c862235506ff1908f"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMisOrdenesJourneyType = typeof consultarMisOrdenesJourney;

export default consultarMisOrdenesJourney;
