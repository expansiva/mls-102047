/// <mls fileReference="_102047_/l4/ordenServicio/journeys/repararAparato.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const repararAparatoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "repararAparato",
  "business": {
    "actorRef": "tecnico",
    "title": "Reparar aparato aprobado",
    "goal": "Realizar la reparación autorizada y dejar el aparato listo para entrega.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenAprobada",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar orden aprobada",
        "description": "Busca la orden cuyo presupuesto fue aprobado por el cliente."
      },
      {
        "stepId": "revisarDiagnosticoAprobado",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Revisar diagnóstico aprobado",
        "description": "Consulta el diagnóstico, las piezas necesarias y la autorización de reparación."
      },
      {
        "stepId": "registrarReparacionTerminada",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "transition",
        "transitionRef": "marcarListaParaEntrega",
        "title": "Registrar reparación terminada",
        "description": "Registra el trabajo realizado y marca la orden como lista para entrega."
      },
      {
        "stepId": "remitirParaEntrega",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "Remitir para entrega",
        "description": "La orden lista queda a disposición de recepción para entregar el aparato al cliente.",
        "handoffTo": "recepcionista"
      }
    ],
    "outcome": {
      "statement": "El aparato reparado queda marcado como listo para entrega.",
      "evidence": [
        "Trabajo realizado registrado en la orden.",
        "Estado de orden lista para entrega."
      ]
    }
  },
  "businessHash": "sha256:8ccbe75f914ca16e120c5dccbef11ae7b51a5297989d907406670ed80fa32cc7"
} as const satisfies Ns5JourneyArtifact;

export type RepararAparatoJourneyType = typeof repararAparatoJourney;

export default repararAparatoJourney;
