/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/decideOffer.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const decideOfferJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decideOffer",
  "business": {
    "actorRef": "hiringManager",
    "title": "Decide whether to make an offer",
    "goal": "Choose whether an interviewed candidate should receive an offer for the manager's position.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "inspectApplication",
        "kind": "inspect",
        "entity": "Application",
        "title": "Review the interviewed application",
        "description": "Review the candidate and application for the job position."
      },
      {
        "stepId": "chooseOfferOutcome",
        "kind": "decide",
        "entity": "Application",
        "title": "Decide on the offer",
        "description": "Choose to move the application to offer or not to offer."
      },
      {
        "stepId": "returnToRecruiter",
        "kind": "handoff",
        "entity": "Application",
        "title": "Return the application to the recruiter",
        "description": "Return the offer decision to the recruiter for follow-up, including rejection recording when no offer is approved.",
        "handoffTo": "recruiter"
      }
    ],
    "outcome": {
      "statement": "The hiring manager's offer decision is available for recruiter follow-up.",
      "evidence": [
        "The application records the hiring manager's offer decision.",
        "An approved offer application shows the offer stage, or a declined application is returned for rejection handling."
      ]
    }
  },
  "businessHash": "sha256:b043d565196a22161ee0760949920678aa94dbf5d699a47ad6a6e49f064ba5d3"
} as const satisfies Ns5JourneyArtifact;

export type DecideOfferJourneyType = typeof decideOfferJourney;

export default decideOfferJourney;
