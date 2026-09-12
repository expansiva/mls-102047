/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/closeTab.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const closeTabJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "closeTab",
  "business": {
    "actorRef": "caixa",
    "title": "Close and settle a table tab",
    "goal": "Settle an open tab with an optional discount and payment method, then free its table.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateOpenTabForSettlement",
        "kind": "locate",
        "entity": "OrderTab",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "inspectTabTotal",
        "kind": "inspect",
        "entity": "OrderTab",
        "title": "x",
        "description": "Review the launched items and total due."
      },
      {
        "stepId": "applyOptionalDiscount",
        "kind": "act",
        "entity": "OrderTab",
        "effect": "update",
        "title": "x",
        "description": "Record a discount when one applies to the tab."
      },
      {
        "stepId": "recordPayment",
        "kind": "act",
        "entity": "Payment",
        "affects": [
          "OrderTab"
        ],
        "effect": "create",
        "title": "x",
        "description": "Record the payment method and amount used to settle the tab."
      },
      {
        "stepId": "closeSettledTab",
        "kind": "act",
        "entity": "OrderTab",
        "affects": [
          "Table"
        ],
        "effect": "transition",
        "transitionRef": "closeOrderTab",
        "title": "x",
        "description": "Close the settled tab and free its table."
      }
    ],
    "outcome": {
      "statement": "The tab is closed, its payment is recorded, and the table is available again.",
      "evidence": [
        "The tab has a closed status, final total, and any applied discount.",
        "A payment record shows the registered payment method and amount.",
        "The associated table is shown as available."
      ]
    }
  },
  "businessHash": "sha256:58eace969bede96514343d38c2494039c073749a5e0993d90ae6ca7d2f89e8d0"
} as const satisfies Ns5JourneyArtifact;

export type CloseTabJourneyType = typeof closeTabJourney;

export default closeTabJourney;
