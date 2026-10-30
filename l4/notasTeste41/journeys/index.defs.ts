/// <mls fileReference="_102047_/l4/notasTeste41/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41JourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "notasTeste41",
  "journeys": [
    {
      "journeyId": "registrarNota",
      "actorRef": "operador",
      "title": "Registrar nota"
    },
    {
      "journeyId": "consultarNota",
      "actorRef": "operador",
      "title": "Consultar nota"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5Readonly<Ns5JourneyIndexArtifact>;

export type NotasTeste41JourneyIndexType = typeof notasTeste41JourneyIndex;

export default notasTeste41JourneyIndex;
