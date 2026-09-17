/// <mls fileReference="_102047_/l4/ordenServicio/journeys/abrirOrdenServicio.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirOrdenServicioJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdenServicio",
  "business": {
    "actorRef": "recepcionista",
    "title": "Abrir una orden de servicio",
    "goal": "Registrar la recepción del aparato y dejar creada la orden para su análisis técnico.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarRecepcion",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "create",
        "title": "Registrar recepción",
        "description": "Crea la orden con los datos del cliente, el aparato recibido, el defecto informado y las fotos aportadas; identifica o vincula los registros maestros necesarios."
      }
    ],
    "outcome": {
      "statement": "La orden queda registrada y disponible para que el técnico la analice.",
      "evidence": [
        "Número de orden generado.",
        "Datos de recepción, defecto informado y fotos asociados a la orden.",
        "Orden remitida al técnico para análisis."
      ]
    }
  },
  "businessHash": "sha256:e6e8248d57669abf278f48f8983f1e4553bc0b447a1a63518d37bfd24e4232be"
} as const satisfies Ns5JourneyArtifact;

export type AbrirOrdenServicioJourneyType = typeof abrirOrdenServicioJourney;

export default abrirOrdenServicioJourney;
