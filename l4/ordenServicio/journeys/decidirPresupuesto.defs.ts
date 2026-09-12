/// <mls fileReference="_102047_/l4/ordenServicio/journeys/decidirPresupuesto.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decidirPresupuestoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decidirPresupuesto",
  "business": {
    "actorRef": "cliente",
    "title": "Decidir sobre un presupuesto",
    "goal": "Consultar una orden propia y aprobar o rechazar el presupuesto recibido.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "localizarOrdenPropia",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Abrir una orden propia presupuestada.",
        "description": "Acceder desde la notificación al presupuesto de una orden propia, con una alternativa de búsqueda entre las propias órdenes."
      },
      {
        "stepId": "consultarPresupuesto",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Consultar estado, diagnóstico y valor del presupuesto.",
        "description": "Revisar la información de la orden propia disponible para el cliente, sin acceso a costos internos ni anotaciones técnicas."
      },
      {
        "stepId": "decidirPresupuesto",
        "kind": "decide",
        "entity": "OrdenServicio",
        "title": "Aprobar o rechazar el presupuesto.",
        "description": "Elegir entre aprobar el presupuesto para autorizar la reparación o rechazarlo para dejar el aparato disponible para retiro."
      },
      {
        "stepId": "remitirOrdenAreparacion",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "Remitir la orden aprobada a reparación.",
        "description": "Poner la orden aprobada a disposición del técnico para realizar la reparación.",
        "handoffTo": "tecnico"
      }
    ],
    "outcome": {
      "statement": "El presupuesto queda aprobado para reparación o la orden queda cerrada como rechazada y el aparato disponible para retiro.",
      "evidence": [
        "La decisión del cliente está registrada en la orden.",
        "Una orden aprobada queda disponible para reparación.",
        "Una orden rechazada queda cerrada como rechazada y el aparato está disponible para retiro."
      ]
    }
  },
  "businessHash": "sha256:27fb4e5beee500d935d577f3bd1af6a781d78cb014491bdfcb49d76045862a12"
} as const satisfies Ns5JourneyArtifact;

export type DecidirPresupuestoJourneyType = typeof decidirPresupuestoJourney;

export default decidirPresupuestoJourney;
