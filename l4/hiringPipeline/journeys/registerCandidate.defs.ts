/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/registerCandidate.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registerCandidateJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registerCandidate",
  "business": {
    "actorRef": "recruiter",
    "title": "Register a candidate",
    "goal": "Record a candidate so they can be considered for positions.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "createCandidate",
        "kind": "act",
        "entity": "Candidate",
        "title": "Register the candidate",
        "description": "Record the candidate's name, email address, resume link, and source."
      }
    ],
    "outcome": {
      "statement": "The candidate is available to be added to a job application.",
      "evidence": [
        "The candidate record shows the name, email address, resume link, and source."
      ]
    }
  },
  "businessHash": "sha256:b75d4d662133e651b3247a1c0f859c70709f6d6efbf58f3c921d3ef43e7997c9"
} as const satisfies Ns5JourneyArtifact;

export type RegisterCandidateJourneyType = typeof registerCandidateJourney;

export default registerCandidateJourney;
