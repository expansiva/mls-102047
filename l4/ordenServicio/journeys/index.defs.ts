/// <mls fileReference="_102047_/l4/ordenServicio/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "ordenServicio",
  "journeys": [
    {
      "journeyId": "abrirOrdenServicio",
      "actorRef": "recepcionista",
      "title": "Abrir una orden de servicio"
    },
    {
      "journeyId": "analizarYpresupuestarOrden",
      "actorRef": "tecnico",
      "title": "Analizar y presupuestar una orden"
    },
    {
      "journeyId": "decidirPresupuesto",
      "actorRef": "cliente",
      "title": "Decidir sobre un presupuesto"
    },
    {
      "journeyId": "repararYmarcarLista",
      "actorRef": "tecnico",
      "title": "Reparar un aparato aprobado"
    },
    {
      "journeyId": "entregarYfinalizarOrden",
      "actorRef": "recepcionista",
      "title": "Entregar el aparato y finalizar una orden"
    },
    {
      "journeyId": "consultarMisOrdenes",
      "actorRef": "cliente",
      "title": "Consultar mis órdenes de servicio"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type OrdenServicioJourneyIndexType = typeof ordenServicioJourneyIndex;

export default ordenServicioJourneyIndex;
