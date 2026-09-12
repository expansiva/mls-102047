/// <mls fileReference="_102047_/l4/ordenServicio/journeys/analizarYpresupuestarOrden.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const analizarYpresupuestarOrdenJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "analizarYpresupuestarOrden",
  "business": {
    "actorRef": "tecnico",
    "title": "Analizar y presupuestar orden",
    "goal": "Diagnosticar el aparato y enviar al cliente un presupuesto para su decisión.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenAsignada",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "inspeccionarRecepcion",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "registrarDiagnosticoYpresupuesto",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "transition",
        "transitionRef": "enviarPresupuesto",
        "title": "x",
        "description": "Registra el diagnóstico, las piezas necesarias con su costo interno y el valor del presupuesto para el cliente, y envía el presupuesto."
      },
      {
        "stepId": "enviarDecisionCliente",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x",
        "handoffTo": "cliente"
      }
    ],
    "outcome": {
      "statement": "El cliente dispone de un presupuesto con el diagnóstico y el valor propuesto para decidir.",
      "evidence": [
        "La orden contiene el diagnóstico técnico y el valor del presupuesto.",
        "La orden queda pendiente de la decisión del cliente."
      ]
    }
  },
  "businessHash": "sha256:c1635b1d941141d321af0ea824537cc3009ada2128739b235a32345ef84211ba"
} as const satisfies Ns5JourneyArtifact;

export type AnalizarYpresupuestarOrdenJourneyType = typeof analizarYpresupuestarOrdenJourney;

export default analizarYpresupuestarOrdenJourney;
