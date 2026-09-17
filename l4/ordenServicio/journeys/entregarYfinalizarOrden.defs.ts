/// <mls fileReference="_102047_/l4/ordenServicio/journeys/entregarYfinalizarOrden.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const entregarYfinalizarOrdenJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "entregarYfinalizarOrden",
  "business": {
    "actorRef": "recepcionista",
    "title": "Entregar aparato y finalizar orden",
    "goal": "Registrar la entrega final del aparato al cliente y cerrar la orden.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenParaEntrega",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar orden para entrega",
        "description": "Busca la orden lista para entrega o cerrada como rechazada cuyo aparato será retirado."
      },
      {
        "stepId": "verificarOrdenYretiro",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Verificar orden y retiro",
        "description": "Consulta el estado de la orden y confirma que el aparato corresponde a la entrega solicitada."
      },
      {
        "stepId": "registrarEntregaFinal",
        "kind": "act",
        "entity": "OrdenServicio",
        "effect": "transition",
        "transitionRef": "finalizarEntrega",
        "title": "Registrar entrega final",
        "description": "Registra la entrega del aparato al cliente y finaliza la orden."
      }
    ],
    "outcome": {
      "statement": "La entrega del aparato queda registrada y la orden queda finalizada.",
      "evidence": [
        "Entrega final registrada en la orden.",
        "Estado final de la orden actualizado."
      ]
    }
  },
  "businessHash": "sha256:15f2b1b1bfb4e05162ca17c628b25153ba215ee5aaaac425a282913c1126c01f"
} as const satisfies Ns5JourneyArtifact;

export type EntregarYfinalizarOrdenJourneyType = typeof entregarYfinalizarOrdenJourney;

export default entregarYfinalizarOrdenJourney;
