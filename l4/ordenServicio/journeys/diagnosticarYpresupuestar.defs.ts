/// <mls fileReference="_102047_/l4/ordenServicio/journeys/diagnosticarYpresupuestar.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const diagnosticarYpresupuestarJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "diagnosticarYpresupuestar",
  "business": {
    "actorRef": "tecnico",
    "title": "Diagnosticar y emitir presupuesto",
    "goal": "Analizar el aparato y comunicar al cliente un presupuesto para decidir la reparación.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenPendiente",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar orden pendiente",
        "description": "Busca la orden recibida para análisis técnico."
      },
      {
        "stepId": "inspeccionarAparato",
        "kind": "inspect",
        "entity": "Aparato",
        "title": "Inspeccionar aparato",
        "description": "Examina el aparato recibido y su defecto informado para realizar el diagnóstico técnico."
      },
      {
        "stepId": "registrarDiagnosticoTecnico",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "update",
        "title": "Registrar diagnóstico técnico",
        "description": "Registra el diagnóstico y las piezas necesarias con su costo interno para uso técnico."
      },
      {
        "stepId": "emitirPresupuesto",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "transition",
        "transitionRef": "emitirPresupuesto",
        "title": "Emitir presupuesto",
        "description": "Registra el valor del presupuesto que se comunicará al cliente."
      },
      {
        "stepId": "enviarPresupuestoAlCliente",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "Enviar presupuesto al cliente",
        "description": "El presupuesto queda disponible para la decisión del cliente en el portal.",
        "handoffTo": "cliente"
      }
    ],
    "outcome": {
      "statement": "El cliente recibe un presupuesto con el diagnóstico y el valor propuesto.",
      "evidence": [
        "Diagnóstico registrado en la orden.",
        "Piezas necesarias y costos internos registrados para uso técnico.",
        "Valor del presupuesto disponible para el cliente."
      ]
    }
  },
  "businessHash": "sha256:4d86e14676d260de266212ecacb6552a96d07765b7c08bd871c35491887870c4"
} as const satisfies Ns5JourneyArtifact;

export type DiagnosticarYpresupuestarJourneyType = typeof diagnosticarYpresupuestarJourney;

export default diagnosticarYpresupuestarJourney;
