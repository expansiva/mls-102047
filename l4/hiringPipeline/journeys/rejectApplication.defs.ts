/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/rejectApplication.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const rejectApplicationJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "rejectApplication",
  "business": {
    "actorRef": "recruiter",
    "title": "Reject an application",
    "goal": "Close an application that will not move forward, recording the reason.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "findApplication",
        "kind": "locate",
        "entity": "Application",
        "title": "Find the application",
        "description": "The recruiter opens the application in hand or searches it in the position's pipeline."
      },
      {
        "stepId": "inspectApplication",
        "kind": "inspect",
        "entity": "Application",
        "title": "Review application",
        "description": "The recruiter checks the current stage and history before rejecting."
      },
      {
        "stepId": "reject",
        "kind": "act",
        "entity": "Application",
        "effect": "transition",
        "transitionRef": "reject",
        "title": "Reject with reason",
        "description": "The recruiter enters the rejection reason and moves the application to rejected."
      }
    ],
    "outcome": {
      "statement": "The application is rejected with a recorded reason.",
      "evidence": [
        "The application shows stage rejected",
        "The rejection reason is visible on the application"
      ]
    }
  },
  "businessHash": "sha256:caec38bf9b3fca4abf123b00404f65dbb54eb2a8500ef48611680ac00526856a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RejectApplicationJourneyType = typeof rejectApplicationJourney;

export default rejectApplicationJourney;
