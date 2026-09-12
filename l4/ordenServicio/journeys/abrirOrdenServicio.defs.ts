/// <mls fileReference="_102047_/l4/ordenServicio/journeys/abrirOrdenServicio.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirOrdenServicioJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdenServicio",
  "business": {
    "actorRef": "recepcionista",
    "title": "Abrir orden de servicio",
    "goal": "Registrar la recepción del aparato y abrir una orden para su atención técnica.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "identificarCliente",
        "kind": "locate",
        "entity": "Cliente",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "registrarOrden",
        "kind": "act",
        "entity": "OrdenServicio",
        "affects": [
          "Cliente",
          "Aparato"
        ],
        "effect": "create",
        "title": "x",
        "description": "Registra la recepción del aparato, el defecto informado y las fotos, y abre la orden de servicio."
      },
      {
        "stepId": "derivarAnalisis",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "x",
        "description": "x",
        "handoffTo": "tecnico"
      }
    ],
    "outcome": {
      "statement": "La orden queda abierta con el cliente, el aparato, el defecto informado y las fotos de recepción registrados.",
      "evidence": [
        "Existe una orden de servicio abierta asociada al cliente y al aparato.",
        "La orden contiene el defecto informado y las fotos de recepción."
      ]
    }
  },
  "businessHash": "sha256:2c5973488aab599af062007e240aff7ba2d3dd98850142624a02533b1b5d50bf"
} as const satisfies Ns5JourneyArtifact;

export type AbrirOrdenServicioJourneyType = typeof abrirOrdenServicioJourney;

export default abrirOrdenServicioJourney;
