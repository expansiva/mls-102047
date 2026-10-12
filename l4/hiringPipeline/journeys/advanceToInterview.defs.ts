/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/advanceToInterview.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const advanceToInterviewJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "advanceToInterview",
  "business": {
    "actorRef": "recruiter",
    "title": "Move an application to interview",
    "goal": "Advance a screened application to the interview stage and pass it to the hiring manager when ready.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "findScreening",
        "kind": "locate",
        "entity": "Application",
        "title": "Find screening applications",
        "description": "The recruiter lists applications in screening for a position."
      },
      {
        "stepId": "inspectApplication",
        "kind": "inspect",
        "entity": "Application",
        "title": "Review application",
        "description": "The recruiter reviews the candidate's resume link, source and application history."
      },
      {
        "stepId": "moveToInterview",
        "kind": "act",
        "entity": "Application",
        "effect": "transition",
        "transitionRef": "advanceToInterview",
        "title": "Move to interview",
        "description": "The recruiter moves the application from screening to interview."
      },
      {
        "stepId": "handToManager",
        "kind": "handoff",
        "entity": "Application",
        "title": "Notify hiring manager",
        "description": "The application in interview is passed to the position's hiring manager to decide on an offer.",
        "handoffTo": "hiringManager"
      }
    ],
    "outcome": {
      "statement": "The application is in the interview stage and the hiring manager can decide on an offer.",
      "evidence": [
        "The application shows stage interview",
        "The application appears in the hiring manager's pipeline"
      ]
    }
  },
  "businessHash": "sha256:437f0d8296ebbfa6a9ec1589a4811f2c6a920e88cf373411b2ab7a78ab71032f"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AdvanceToInterviewJourneyType = typeof advanceToInterviewJourney;

export default advanceToInterviewJourney;
