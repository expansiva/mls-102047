/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/recordApplicationRejection.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const recordApplicationRejectionJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "recordApplicationRejection",
  "business": {
    "actorRef": "recruiter",
    "title": "Reject a candidate application",
    "goal": "End an application that will not continue and record why.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateApplication",
        "kind": "locate",
        "entity": "Application",
        "title": "Find the application",
        "description": "Open the application that will not proceed."
      },
      {
        "stepId": "rejectApplication",
        "kind": "act",
        "entity": "Application",
        "title": "Reject the application",
        "description": "Move the application to rejected and record the rejection reason."
      }
    ],
    "outcome": {
      "statement": "The application is rejected with a recorded reason.",
      "evidence": [
        "The application shows the rejected stage.",
        "The application displays a rejection reason."
      ]
    }
  },
  "businessHash": "sha256:168dfd3fe5d77699c7faa5b484cb507baf38ad5f6590d1674d9850eae95ab42d"
} as const satisfies Ns5JourneyArtifact;

export type RecordApplicationRejectionJourneyType = typeof recordApplicationRejectionJourney;

export default recordApplicationRejectionJourney;
