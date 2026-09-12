/// <mls fileReference="_102047_/l4/ordenServicio/journeys/abrirOrdenServicio.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirOrdenServicioJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdenServicio",
  "business": {
    "actorRef": "recepcionista",
    "title": "Abrir una orden de servicio",
    "goal": "Registrar la recepción del aparato de un cliente y dejar la orden lista para análisis técnico.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarRecepcion",
        "kind": "act",
        "entity": "OrdenServicio",
        "affects": [
          "Cliente",
          "Aparato"
        ],
        "title": "Registrar cliente, aparato, defecto informado y fotos de recepción.",
        "description": "Abrir la orden con los datos del cliente y del aparato, el defecto informado y las fotos aportadas."
      }
    ],
    "outcome": {
      "statement": "La orden de servicio queda registrada y disponible para que el técnico la analice.",
      "evidence": [
        "Existe una orden con el cliente, el aparato, el defecto informado y las fotos de recepción.",
        "La orden está disponible para análisis técnico."
      ]
    }
  },
  "businessHash": "sha256:033828dc1dacc8093f727fbaebe087caa1339322e06e5b86ba6a7cb358dcccd5"
} as const satisfies Ns5JourneyArtifact;

export type AbrirOrdenServicioJourneyType = typeof abrirOrdenServicioJourney;

export default abrirOrdenServicioJourney;
