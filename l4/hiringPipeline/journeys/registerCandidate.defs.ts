/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/registerCandidate.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registerCandidateJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registerCandidate",
  "business": {
    "actorRef": "recruiter",
    "title": "Register a candidate",
    "goal": "Record a candidate with name, email, resume link and source.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "searchCandidate",
        "kind": "locate",
        "entity": "Candidate",
        "title": "Search existing candidates",
        "description": "The recruiter searches by name or email to avoid registering the same person twice."
      },
      {
        "stepId": "createCandidate",
        "kind": "act",
        "entity": "Candidate",
        "effect": "create",
        "title": "Register candidate",
        "description": "The recruiter enters the candidate's name, email, resume link and source and saves the record."
      }
    ],
    "outcome": {
      "statement": "The candidate is registered and available to apply to positions.",
      "evidence": [
        "The candidate appears in the candidate list with email, resume link and source"
      ]
    }
  },
  "businessHash": "sha256:fb8922e90ff49bf5ff7235dc39c4496810b1a7892ba85620b1a50e77610ede95"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegisterCandidateJourneyType = typeof registerCandidateJourney;

export default registerCandidateJourney;
