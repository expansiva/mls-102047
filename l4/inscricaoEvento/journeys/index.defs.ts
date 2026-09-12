/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "inscricaoEvento",
  "journeys": [
    {
      "journeyId": "cadastrarEvento",
      "actorRef": "organizador",
      "title": "Cadastrar evento"
    },
    {
      "journeyId": "publicarEvento",
      "actorRef": "organizador",
      "title": "Publicar evento"
    },
    {
      "journeyId": "inscreverEmEvento",
      "actorRef": "publico",
      "title": "Inscrever-se em evento"
    },
    {
      "journeyId": "cancelarInscricao",
      "actorRef": "publico",
      "title": "Cancelar inscrição"
    },
    {
      "journeyId": "acompanharInscricoesDoEvento",
      "actorRef": "organizador",
      "title": "Acompanhar inscrições e baixar lista"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type InscricaoEventoJourneyIndexType = typeof inscricaoEventoJourneyIndex;

export default inscricaoEventoJourneyIndex;
