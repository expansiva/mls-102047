/// <mls fileReference="_102047_/l4/ordenServicio/journeys/repararYmarcarLista.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const repararYmarcarListaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "repararYmarcarLista",
  "business": {
    "actorRef": "tecnico",
    "title": "Reparar un aparato aprobado",
    "goal": "Realizar la reparación autorizada, registrar el trabajo efectuado y dejar el aparato listo para entrega.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdenAprobada",
        "kind": "locate",
        "entity": "OrdenServicio",
        "title": "Localizar la orden aprobada.",
        "description": "Abrir la orden aprobada para reparar el aparato conforme al diagnóstico y presupuesto."
      },
      {
        "stepId": "consultarDiagnostico",
        "kind": "inspect",
        "entity": "OrdenServicio",
        "title": "Consultar diagnóstico y piezas necesarias.",
        "description": "Revisar el diagnóstico, las piezas previstas y la autorización del cliente."
      },
      {
        "stepId": "registrarReparacion",
        "kind": "act",
        "entity": "Reparacion",
        "affects": [
          "OrdenServicio"
        ],
        "title": "Registrar la reparación realizada.",
        "description": "Registrar lo realizado durante la reparación del aparato."
      },
      {
        "stepId": "marcarOrdenLista",
        "kind": "act",
        "entity": "OrdenServicio",
        "title": "Marcar la orden como lista.",
        "description": "Indicar que el aparato reparado está listo para ser entregado al cliente."
      },
      {
        "stepId": "remitirParaEntrega",
        "kind": "handoff",
        "entity": "OrdenServicio",
        "title": "Remitir la orden lista para entrega.",
        "description": "Poner la orden lista a disposición del recepcionista para entregar el aparato.",
        "handoffTo": "recepcionista"
      }
    ],
    "outcome": {
      "statement": "La reparación queda registrada y el aparato queda marcado como listo para entrega.",
      "evidence": [
        "La orden contiene el registro del trabajo realizado.",
        "La orden está marcada como lista para entrega."
      ]
    }
  },
  "businessHash": "sha256:f790c9ae7f66d81c3a6ba89b146a4fd2d208171a87f68893066af50bd34cc363"
} as const satisfies Ns5JourneyArtifact;

export type RepararYmarcarListaJourneyType = typeof repararYmarcarListaJourney;

export default repararYmarcarListaJourney;
