/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/confirmHire.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const confirmHireJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "confirmHire",
  "business": {
    "actorRef": "hiringManager",
    "title": "Confirm a hire",
    "goal": "Mark an accepted offer as hired, filling the position's headcount.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "findOffer",
        "kind": "locate",
        "entity": "Application",
        "title": "Find offer applications",
        "description": "The hiring manager lists applications in offer for their positions."
      },
      {
        "stepId": "inspectOffer",
        "kind": "inspect",
        "entity": "Application",
        "title": "Review offer",
        "description": "The hiring manager checks the candidate and the position's remaining headcount."
      },
      {
        "stepId": "hire",
        "kind": "act",
        "entity": "Application",
        "effect": "transition",
        "transitionRef": "hire",
        "title": "Mark as hired",
        "description": "The hiring manager moves the application to hired; when the hires reach the headcount the position closes automatically."
      }
    ],
    "outcome": {
      "statement": "The candidate is hired and the position's filled count is updated, closing the position when headcount is reached.",
      "evidence": [
        "The application shows stage hired",
        "The position shows the updated hires count",
        "A position with headcount filled shows status closed"
      ]
    }
  },
  "businessHash": "sha256:d71f44508f85f6d23b2bc3dfcb72cf211ca1e6dc98707e914936b3bf1fa9af27"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConfirmHireJourneyType = typeof confirmHireJourney;

export default confirmHireJourney;
