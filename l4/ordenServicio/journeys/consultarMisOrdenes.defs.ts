/// <mls fileReference="_102047_/l4/ordenServicio/journeys/consultarMisOrdenes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMisOrdenesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMisOrdenes",
  "business": {
    "actorRef": "cliente",
    "title": "Consultar mis órdenes de servicio",
    "goal": "Conocer el estado, diagnóstico y valor presupuestado de las propias órdenes.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMisOrdenes",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "consultarDetalleOrden",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "Consulta el estado, el diagnóstico y el valor del presupuesto de una orden propia, sin costos internos de piezas ni anotaciones del técnico."
      }
    ],
    "outcome": {
      "statement": "El cliente conoce la situación de sus propias órdenes sin acceder a información interna.",
      "evidence": [
        "Se muestran las órdenes asociadas al cliente autenticado.",
        "El detalle visible incluye estado, diagnóstico y valor del presupuesto.",
        "El detalle no muestra costos internos ni anotaciones técnicas."
      ]
    }
  },
  "businessHash": "sha256:c4a688611977967131984f855ab5d8f1802685b5a6359d426e09ee3184909132"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMisOrdenesJourneyType = typeof consultarMisOrdenesJourney;

export default consultarMisOrdenesJourney;
