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
      "journeyId": "diagnosticarYpresupuestar",
      "actorRef": "tecnico",
      "title": "Diagnosticar y emitir presupuesto"
    },
    {
      "journeyId": "responderPresupuesto",
      "actorRef": "cliente",
      "title": "Responder al presupuesto"
    },
    {
      "journeyId": "repararAparato",
      "actorRef": "tecnico",
      "title": "Reparar aparato aprobado"
    },
    {
      "journeyId": "entregarYfinalizarOrden",
      "actorRef": "recepcionista",
      "title": "Entregar aparato y finalizar orden"
    },
    {
      "journeyId": "consultarMisOrdenes",
      "actorRef": "cliente",
      "title": "Consultar mis órdenes"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type OrdenServicioJourneyIndexType = typeof ordenServicioJourneyIndex;

export default ordenServicioJourneyIndex;
