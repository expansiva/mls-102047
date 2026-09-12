/// <mls fileReference="_102047_/l4/ordenServicio/journeys/decidirPresupuesto.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decidirPresupuestoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decidirPresupuesto",
  "business": {
    "actorRef": "cliente",
    "title": "Decidir sobre presupuesto",
    "goal": "Revisar el presupuesto de una orden propia y aprobar o rechazar la reparación propuesta.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarOrdenNotificada",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "consultarPresupuesto",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "decidirPresupuesto",
        "kind": "decide",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "Elige aprobar el presupuesto para autorizar la reparación o rechazarlo para cerrar la orden y dejar el aparato disponible para retiro."
      },
      {
        "stepId": "registrarDecisionPresupuesto",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "transition",
        "transitionRef": "resolverPresupuesto",
        "title": "x",
        "description": "Registra la decisión seleccionada sobre el presupuesto."
      }
    ],
    "outcome": {
      "statement": "La decisión del cliente queda registrada: la orden queda autorizada para reparación o cerrada como rechazada y disponible para retiro.",
      "evidence": [
        "La orden registra la aprobación o el rechazo del presupuesto.",
        "Una orden aprobada queda disponible para reparación técnica.",
        "Una orden rechazada queda cerrada y su aparato queda disponible para retiro."
      ]
    }
  },
  "businessHash": "sha256:656fdbbc38bd83da6b42db294a319b658f1d8264bd5bd0810e16eb25175bb65d"
} as const satisfies Ns5JourneyArtifact;

export type DecidirPresupuestoJourneyType = typeof decidirPresupuestoJourney;

export default decidirPresupuestoJourney;
