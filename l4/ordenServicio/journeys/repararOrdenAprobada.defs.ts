/// <mls fileReference="_102047_/l4/ordenServicio/journeys/repararOrdenAprobada.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const repararOrdenAprobadaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "repararOrdenAprobada",
  "business": {
    "actorRef": "tecnico",
    "title": "Reparar orden aprobada",
    "goal": "Realizar la reparación autorizada y dejar el aparato listo para entrega.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenAprobada",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "revisarDiagnostico",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "verificarAparatoParaReparacion",
        "kind": "inspect",
        "entity": "Aparato",
        "title": "x",
        "description": "Verifica el aparato recibido antes de efectuar la reparación autorizada."
      },
      {
        "stepId": "registrarReparacionTerminada",
        "kind": "act",
        "entity": "OrdenServicio",
        "affects": [
          "Aparato"
        ],
        "effect": "transition",
        "transitionRef": "marcarLista",
        "title": "x",
        "description": "Registra el trabajo realizado, actualiza la condición del aparato y marca la orden como lista para entrega."
      },
      {
        "stepId": "derivarEntrega",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x",
        "handoffTo": "recepcionista"
      }
    ],
    "outcome": {
      "statement": "La reparación queda registrada y la orden queda lista para entregar al cliente.",
      "evidence": [
        "La orden contiene el registro del trabajo realizado.",
        "La orden figura lista para entrega."
      ]
    }
  },
  "businessHash": "sha256:832999bf8c1127a66a4810cf0be13059f50400b77ff5cfb1436804de4fc78130"
} as const satisfies Ns5JourneyArtifact;

export type RepararOrdenAprobadaJourneyType = typeof repararOrdenAprobadaJourney;

export default repararOrdenAprobadaJourney;
