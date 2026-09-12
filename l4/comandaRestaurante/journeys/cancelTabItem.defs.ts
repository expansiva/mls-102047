/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/cancelTabItem.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelTabItemJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelTabItem",
  "business": {
    "actorRef": "garcom",
    "title": "Cancel a mistakenly launched item",
    "goal": "Cancel an item launched by mistake while its tab remains open.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateOpenTabForCorrection",
        "kind": "locate",
        "entity": "OrderTab",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "inspectTabItems",
        "kind": "inspect",
        "entity": "TabItem",
        "title": "x",
        "description": "Review the items launched on the open tab."
      },
      {
        "stepId": "cancelLaunchedItem",
        "kind": "act",
        "entity": "TabItem",
        "affects": [
          "OrderTab"
        ],
        "effect": "transition",
        "transitionRef": "cancelTabItem",
        "title": "x",
        "description": "Cancel the item that was launched by mistake."
      }
    ],
    "outcome": {
      "statement": "The mistakenly launched item is cancelled and no longer contributes to the tab total.",
      "evidence": [
        "The item is identified as cancelled on the tab.",
        "The tab total is recalculated without the cancelled item."
      ]
    }
  },
  "businessHash": "sha256:9fce627574bd398d28458dbc93f8b49a1f32b529c4cefd5174b9b561675c7ec1"
} as const satisfies Ns5JourneyArtifact;

export type CancelTabItemJourneyType = typeof cancelTabItemJourney;

export default cancelTabItemJourney;
