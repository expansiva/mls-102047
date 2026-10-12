/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/decideOffer.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const decideOfferJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "decideOffer",
  "business": {
    "actorRef": "hiringManager",
    "title": "Decide on an offer",
    "goal": "Decide whether an interviewed candidate receives an offer for my position.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "openApplication",
        "kind": "locate",
        "entity": "Application",
        "title": "Open interviewed application",
        "description": "The hiring manager opens the application from the notification or from the interview list of their positions."
      },
      {
        "stepId": "inspectCandidate",
        "kind": "inspect",
        "entity": "Application",
        "title": "Review candidate",
        "description": "The hiring manager reviews the candidate, resume link and application history."
      },
      {
        "stepId": "chooseOffer",
        "kind": "decide",
        "entity": "Application",
        "title": "Offer or send back",
        "description": "The hiring manager chooses to extend an offer or to return the application to the recruiter for rejection."
      },
      {
        "stepId": "extendOffer",
        "kind": "act",
        "entity": "Application",
        "effect": "transition",
        "transitionRef": "extendOffer",
        "title": "Move to offer",
        "description": "When the choice is to offer, the hiring manager moves the application from interview to offer."
      },
      {
        "stepId": "returnToRecruiter",
        "kind": "handoff",
        "entity": "Application",
        "title": "Return to recruiter",
        "description": "When the choice is not to offer, the application goes back to the recruiter to reject it with a reason.",
        "handoffTo": "recruiter"
      }
    ],
    "outcome": {
      "statement": "The interviewed application either moves to offer or returns to the recruiter for rejection.",
      "evidence": [
        "The application shows stage offer, or",
        "The recruiter sees the application flagged for rejection"
      ]
    }
  },
  "businessHash": "sha256:61d5f1835f56f9ebb436d87e3e6586110fcd2228d3db3650c765ed662d138b90"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type DecideOfferJourneyType = typeof decideOfferJourney;

export default decideOfferJourney;
