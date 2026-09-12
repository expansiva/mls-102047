/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/addTabItem.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const addTabItemJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "addTabItem",
  "business": {
    "actorRef": "garcom",
    "title": "Add an item to an open tab",
    "goal": "Record a menu item, quantity, and optional preparation note on an open tab.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateOpenTab",
        "kind": "locate",
        "entity": "OrderTab",
        "title": "x",
        "description": "x"
      },
      {
        "stepId": "inspectOpenTab",
        "kind": "inspect",
        "entity": "OrderTab",
        "title": "x",
        "description": "Review the current tab and its launched items."
      },
      {
        "stepId": "locateMenuItem",
        "kind": "locate",
        "entity": "MenuItem",
        "title": "x",
        "description": "Find the menu item to launch."
      },
      {
        "stepId": "inspectMenuItem",
        "kind": "inspect",
        "entity": "MenuItem",
        "title": "x",
        "description": "Review the menu item and its current price."
      },
      {
        "stepId": "createTabItem",
        "kind": "act",
        "entity": "TabItem",
        "affects": [
          "OrderTab"
        ],
        "effect": "create",
        "title": "x",
        "description": "Launch the selected menu item with its quantity and optional note."
      }
    ],
    "outcome": {
      "statement": "The item is recorded on the open tab.",
      "evidence": [
        "The tab lists the new item with its quantity, note, and charged price.",
        "The tab total reflects the launched item."
      ]
    }
  },
  "businessHash": "sha256:b0e85afc45434e8f8611b1609b0ca08ad38d1ba8fd0cd32de5b792b1b8cc0403"
} as const satisfies Ns5JourneyArtifact;

export type AddTabItemJourneyType = typeof addTabItemJourney;

export default addTabItemJourney;
