/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "comandaRestaurante",
  "journeys": [
    {
      "journeyId": "openTab",
      "actorRef": "garcom",
      "title": "Open a table tab"
    },
    {
      "journeyId": "addTabItem",
      "actorRef": "garcom",
      "title": "Add an item to an open tab"
    },
    {
      "journeyId": "cancelTabItem",
      "actorRef": "garcom",
      "title": "Cancel a mistakenly launched item"
    },
    {
      "journeyId": "closeTab",
      "actorRef": "caixa",
      "title": "Close and settle a table tab"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type ComandaRestauranteJourneyIndexType = typeof comandaRestauranteJourneyIndex;

export default comandaRestauranteJourneyIndex;
