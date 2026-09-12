/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/openJobPosition.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const openJobPositionJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "openJobPosition",
  "business": {
    "actorRef": "recruiter",
    "title": "Open a job position",
    "goal": "Create a position with the hiring requirements and capacity.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "createPosition",
        "kind": "act",
        "entity": "JobPosition",
        "title": "Create the job position",
        "description": "Record the title, department, description, and headcount for the new position."
      }
    ],
    "outcome": {
      "statement": "An active job position is available for candidate applications.",
      "evidence": [
        "The job position shows its title, department, description, and requested headcount.",
        "The job position is available in the hiring pipeline."
      ]
    }
  },
  "businessHash": "sha256:76b20574ba315f7afe6e984f19f9c5c8a249aab6f2d5940f8535e4c634ba9c8b"
} as const satisfies Ns5JourneyArtifact;

export type OpenJobPositionJourneyType = typeof openJobPositionJourney;

export default openJobPositionJourney;
