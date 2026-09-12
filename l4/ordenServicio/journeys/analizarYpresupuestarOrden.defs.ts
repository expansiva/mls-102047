/// <mls fileReference="_102047_/l4/ordenServicio/journeys/analizarYpresupuestarOrden.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const analizarYpresupuestarOrdenJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "analizarYpresupuestarOrden",
  "business": {
    "actorRef": "tecnico",
    "title": "Analizar y presupuestar una orden",
    "goal": "Documentar el diagnóstico, las piezas necesarias y el valor que se presentará al cliente.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrden",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar la orden pendiente de análisis.",
        "description": "Abrir la orden recibida para revisar los datos del aparato, el defecto informado y las fotos."
      },
      {
        "stepId": "inspeccionarOrden",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Inspeccionar la información de recepción.",
        "description": "Revisar el cliente, el aparato, el defecto informado y las fotos de la orden."
      },
      {
        "stepId": "registrarDiagnosticoYpresupuesto",
        "kind": "act",
        "entity": "OrdenServicio",
        "affects": [
          "PiezaNecesaria"
        ],
        "title": "Registrar diagnóstico y presupuesto.",
        "description": "Registrar el diagnóstico, las piezas necesarias con su costo interno y el valor del presupuesto para el cliente."
      },
      {
        "stepId": "enviarPresupuestoAlCliente",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "Poner el presupuesto a disposición del cliente.",
        "description": "Enviar la orden presupuestada al portal del cliente para que pueda decidir sobre el presupuesto.",
        "handoffTo": "cliente"
      }
    ],
    "outcome": {
      "statement": "El cliente tiene disponible un presupuesto con el diagnóstico y el valor para aprobarlo o rechazarlo.",
      "evidence": [
        "La orden contiene el diagnóstico técnico.",
        "Las piezas necesarias y sus costos internos están registrados.",
        "La orden muestra un valor de presupuesto para el cliente y está disponible en su portal."
      ]
    }
  },
  "businessHash": "sha256:08f8722515feb3e164dc4da8f421309b67d5da0fa4360260eed66988c008da4a"
} as const satisfies Ns5JourneyArtifact;

export type AnalizarYpresupuestarOrdenJourneyType = typeof analizarYpresupuestarOrdenJourney;

export default analizarYpresupuestarOrdenJourney;
