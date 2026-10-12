/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/reviewMyPipeline.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const reviewMyPipelineJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "reviewMyPipeline",
  "business": {
    "actorRef": "hiringManager",
    "title": "Review my positions' pipeline",
    "goal": "See the applications of the positions I manage by stage.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "listMyPositions",
        "kind": "locate",
        "entity": "JobPosition",
        "title": "List my positions",
        "description": "The hiring manager lists the job positions where they are the hiring manager."
      },
      {
        "stepId": "inspectPosition",
        "kind": "inspect",
        "entity": "JobPosition",
        "title": "View position pipeline",
        "description": "The hiring manager sees headcount, hires so far and applications grouped by stage."
      }
    ],
    "outcome": {
      "statement": "The hiring manager knows where each application of their positions stands.",
      "evidence": [
        "Applications are shown per stage for each managed position",
        "Headcount and hires count are visible per position"
      ]
    }
  },
  "businessHash": "sha256:e01a14be7ea66639fbe393995d0bd82ba33adf4b1677cee7b6f9dd0828de22c5"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ReviewMyPipelineJourneyType = typeof reviewMyPipelineJourney;

export default reviewMyPipelineJourney;
