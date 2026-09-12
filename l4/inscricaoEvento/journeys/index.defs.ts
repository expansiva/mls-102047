/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "inscricaoEvento",
  "journeys": [
    {
      "journeyId": "cadastrarEpublicarEvento",
      "actorRef": "organizador",
      "title": "Cadastrar e publicar evento"
    },
    {
      "journeyId": "realizarInscricaoNoEvento",
      "actorRef": "publico",
      "title": "Inscrever-se em evento publicado"
    },
    {
      "journeyId": "cancelarInscricaoNoEvento",
      "actorRef": "publico",
      "title": "Cancelar inscrição em evento"
    },
    {
      "journeyId": "acompanharEexportarInscricoes",
      "actorRef": "organizador",
      "title": "Acompanhar e exportar inscrições"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type InscricaoEventoJourneyIndexType = typeof inscricaoEventoJourneyIndex;

export default inscricaoEventoJourneyIndex;
