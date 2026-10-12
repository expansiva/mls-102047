/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/recordApplication.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const recordApplicationJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "recordApplication",
  "business": {
    "actorRef": "recruiter",
    "title": "Record an application",
    "goal": "Register that a candidate applies to an open position, starting in screening.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "findCandidate",
        "kind": "locate",
        "entity": "Candidate",
        "title": "Find the candidate",
        "description": "The recruiter opens the candidate in hand or searches for them."
      },
      {
        "stepId": "findPosition",
        "kind": "locate",
        "entity": "JobPosition",
        "title": "Choose open position",
        "description": "The recruiter selects the open job position the candidate applies to."
      },
      {
        "stepId": "createApplication",
        "kind": "act",
        "entity": "Application",
        "effect": "create",
        "title": "Create application",
        "description": "The recruiter records the application, which starts in the screening stage."
      }
    ],
    "outcome": {
      "statement": "The candidate has an application in screening for the chosen position.",
      "evidence": [
        "The application appears in the position's pipeline under screening",
        "The candidate's record lists the application"
      ]
    }
  },
  "businessHash": "sha256:8eb78b40a12b0a1711cbb7e9c27ff483703b2c1edbab1e64f9f53cdf2bd8bd57"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RecordApplicationJourneyType = typeof recordApplicationJourney;

export default recordApplicationJourney;
