/// <mls fileReference="_102047_/l4/ordenServicio/journeys/responderPresupuesto.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const responderPresupuestoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "responderPresupuesto",
  "business": {
    "actorRef": "cliente",
    "title": "Responder al presupuesto",
    "goal": "Aprobar o rechazar desde el portal el presupuesto de reparación recibido.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "consultarPresupuestoRecibido",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Consultar presupuesto",
        "description": "Revisa el estado de su orden, el diagnóstico y el valor del presupuesto, sin acceso a costos internos ni anotaciones técnicas."
      },
      {
        "stepId": "decidirRespuestaAlPresupuesto",
        "kind": "decide",
        "entity": "OrdenServicio",
        "title": "Decidir sobre el presupuesto",
        "description": "Elige entre aprobar o rechazar el presupuesto recibido."
      },
      {
        "stepId": "registrarRespuestaAlPresupuesto",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "transition",
        "transitionRef": "resolverPresupuesto",
        "title": "Registrar respuesta",
        "description": "Registra la aprobación o el rechazo del cliente. La aprobación autoriza la reparación; el rechazo cierra la orden como rechazada y deja el aparato disponible para retiro."
      }
    ],
    "outcome": {
      "statement": "La respuesta del cliente queda registrada: la orden se autoriza para reparación o queda cerrada como rechazada y disponible para retiro.",
      "evidence": [
        "Respuesta al presupuesto registrada en la orden.",
        "Una orden aprobada queda disponible para reparación técnica.",
        "Una orden rechazada queda cerrada y disponible para retiro."
      ]
    }
  },
  "businessHash": "sha256:6fe15423d9d2bbcdc9cf11c73703b2b97683310e3b51cac15d02ada6d99374a8"
} as const satisfies Ns5JourneyArtifact;

export type ResponderPresupuestoJourneyType = typeof responderPresupuestoJourney;

export default responderPresupuestoJourney;
