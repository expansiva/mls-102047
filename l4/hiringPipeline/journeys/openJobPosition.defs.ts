/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/openJobPosition.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const openJobPositionJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "openJobPosition",
  "business": {
    "actorRef": "recruiter",
    "title": "Open a job position",
    "goal": "Publish a new job position with its hiring manager and headcount so candidates can apply.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "createPosition",
        "kind": "act",
        "entity": "JobPosition",
        "effect": "create",
        "title": "Open job position",
        "description": "The recruiter enters title, department, description, headcount and the hiring manager of the position, and opens it."
      },
      {
        "stepId": "reviewPosition",
        "kind": "inspect",
        "entity": "JobPosition",
        "title": "Review opened position",
        "description": "The recruiter checks the position details and confirms it is open with zero hires."
      }
    ],
    "outcome": {
      "statement": "A job position is open and ready to receive applications.",
      "evidence": [
        "The position appears in the open positions list with its title, department and headcount",
        "The position shows its hiring manager"
      ]
    }
  },
  "businessHash": "sha256:e304868e184cb22c5d71f0481e107e28ca1142df795d4925dfe67f25edccbabc"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type OpenJobPositionJourneyType = typeof openJobPositionJourney;

export default openJobPositionJourney;
