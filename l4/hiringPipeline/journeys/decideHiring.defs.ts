/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/decideHiring.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decideHiringJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decideHiring",
  "business": {
    "actorRef": "hiringManager",
    "title": "Decide whether to hire a candidate",
    "goal": "Choose whether a candidate with an offer should be hired for the position.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "inspectOfferApplication",
        "kind": "inspect",
        "entity": "Application",
        "title": "Review the offer application",
        "description": "Review the candidate's application at the offer stage."
      },
      {
        "stepId": "inspectPositionCapacity",
        "kind": "inspect",
        "entity": "JobPosition",
        "title": "Review position capacity",
        "description": "Review the position's requested and filled headcount before making the hiring decision."
      },
      {
        "stepId": "chooseHiringOutcome",
        "kind": "decide",
        "entity": "Application",
        "title": "Decide on hiring",
        "description": "Choose to mark the candidate as hired or not hired for the position."
      },
      {
        "stepId": "returnToRecruiter",
        "kind": "handoff",
        "entity": "Application",
        "title": "Return the hiring decision to the recruiter",
        "description": "Return the hiring decision for follow-up, including rejection recording when the candidate is not hired.",
        "handoffTo": "recruiter"
      }
    ],
    "outcome": {
      "statement": "The hiring decision is recorded, and the position is closed when its headcount has been filled.",
      "evidence": [
        "The application shows hired when the candidate is selected, or is returned for rejection handling when not selected.",
        "A position whose filled headcount reaches its requested headcount shows as closed."
      ]
    }
  },
  "businessHash": "sha256:f9bab969c32b2ce2236492693bd045124afd458c4458a8dec8f6e54d0d7c8dfc"
} as const satisfies Ns5JourneyArtifact;

export type DecideHiringJourneyType = typeof decideHiringJourney;

export default decideHiringJourney;
