/// <mls fileReference="_102047_/l4/ordenServicio/journeys/consultarMisOrdenes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarMisOrdenesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarMisOrdenes",
  "business": {
    "actorRef": "cliente",
    "title": "Consultar mis órdenes",
    "goal": "Conocer el estado y la información disponible de sus propias órdenes de servicio.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMisOrdenes",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar mis órdenes",
        "description": "Accede a las órdenes vinculadas a su propia identidad en el portal."
      },
      {
        "stepId": "consultarDetalleDeOrden",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Consultar detalle de orden",
        "description": "Revisa el estado, el diagnóstico y el valor del presupuesto de una de sus órdenes, sin ver costos internos de piezas ni anotaciones del técnico."
      }
    ],
    "outcome": {
      "statement": "El cliente conoce el estado, diagnóstico y presupuesto de sus propias órdenes.",
      "evidence": [
        "Listado de órdenes propias disponible.",
        "Estado, diagnóstico y valor del presupuesto visibles para la orden consultada."
      ]
    }
  },
  "businessHash": "sha256:1e6cc25ed57ed6d2a85b95dcf3a3feb9f5d56de0a5a8221439ea74ed44d25328"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarMisOrdenesJourneyType = typeof consultarMisOrdenesJourney;

export default consultarMisOrdenesJourney;
