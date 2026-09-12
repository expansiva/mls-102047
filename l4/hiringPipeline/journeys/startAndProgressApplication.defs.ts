/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/startAndProgressApplication.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const startAndProgressApplicationJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "startAndProgressApplication",
  "business": {
    "actorRef": "recruiter",
    "title": "Start and progress a candidate application",
    "goal": "Add a candidate to a position and manage the application through screening and interview.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locatePosition",
        "kind": "locate",
        "entity": "JobPosition",
        "title": "Find the job position",
        "description": "Open the position the candidate is applying for."
      },
      {
        "stepId": "locateCandidate",
        "kind": "locate",
        "entity": "Candidate",
        "title": "Find the candidate",
        "description": "Open the candidate record to be considered."
      },
      {
        "stepId": "createApplication",
        "kind": "act",
        "entity": "Application",
        "affects": [
          "Candidate",
          "JobPosition"
        ],
        "title": "Create the application",
        "description": "Associate the candidate with the job position and begin the application at screening."
      },
      {
        "stepId": "moveToInterview",
        "kind": "act",
        "entity": "Application",
        "title": "Move the application to interview",
        "description": "Advance a screened candidate to the interview stage."
      },
      {
        "stepId": "sendForOfferDecision",
        "kind": "handoff",
        "entity": "Application",
        "title": "Send for offer decision",
        "description": "Hand the interviewed application to the hiring manager responsible for the position to decide whether to make an offer.",
        "handoffTo": "hiringManager"
      }
    ],
    "outcome": {
      "statement": "The candidate application is in interview or awaiting the hiring manager's offer decision.",
      "evidence": [
        "The application links the selected candidate and job position.",
        "The application shows its current screening or interview stage, or is assigned for an offer decision."
      ]
    }
  },
  "businessHash": "sha256:04eaef16b1ba2aad18b076d5a98e0a4e90d36c2fcc8028ded4c0a9f159d03d6d"
} as const satisfies Ns5JourneyArtifact;

export type StartAndProgressApplicationJourneyType = typeof startAndProgressApplicationJourney;

export default startAndProgressApplicationJourney;
