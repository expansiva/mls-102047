/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/openTab.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const openTabJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "openTab",
  "business": {
    "actorRef": "garcom",
    "title": "Open a table tab",
    "goal": "Open a tab for an available restaurant table.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "locateAvailableTable",
        "kind": "locate",
        "entity": "Table",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "inspectTableAvailability",
        "kind": "inspect",
        "entity": "Table",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "createTabForTable",
        "kind": "act",
        "entity": "OrderTab",
        "affects": [
          "Table"
        ],
        "effect": "create",
        "title": "x",
        "description": "Open a tab and mark the selected table as occupied."
      }
    ],
    "outcome": {
      "statement": "An open tab is linked to the selected table.",
      "evidence": [
        "The tab has an open status and identifies the table.",
        "The table is shown as occupied."
      ]
    }
  },
  "businessHash": "sha256:34171fac38ef4164e81848acb017d9fbdb8ac62bf61aceef8fb8c76836fa6700"
} as const satisfies Ns5JourneyArtifact;

export type OpenTabJourneyType = typeof openTabJourney;

export default openTabJourney;
