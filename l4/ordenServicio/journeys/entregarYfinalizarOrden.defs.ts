/// <mls fileReference="_102047_/l4/ordenServicio/journeys/entregarYfinalizarOrden.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const entregarYfinalizarOrdenJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "entregarYfinalizarOrden",
  "business": {
    "actorRef": "recepcionista",
    "title": "Entregar aparato y finalizar orden",
    "goal": "Entregar al cliente su aparato y finalizar la orden de servicio.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenParaEntrega",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "verificarOrdenYretiro",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "registrarEntregaFinal",
        "kind": "act",
        "entity": "OrdenServicio",
        "affects": [
          "Aparato"
        ],
        "effect": "transition",
        "transitionRef": "finalizarOrden",
        "title": "x",
        "description": "Registra la entrega del aparato al cliente y finaliza la orden."
      }
    ],
    "outcome": {
      "statement": "El aparato queda entregado al cliente y la orden queda finalizada.",
      "evidence": [
        "La orden registra la entrega final.",
        "La orden figura finalizada."
      ]
    }
  },
  "businessHash": "sha256:5706c53bb86d4f73732e79aeb21f0d1875b60d4c88d5b20e0ffbfbd62d617962"
} as const satisfies Ns5JourneyArtifact;

export type EntregarYfinalizarOrdenJourneyType = typeof entregarYfinalizarOrdenJourney;

export default entregarYfinalizarOrdenJourney;
