/// <mls fileReference="_102047_/l4/hiringPipeline/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const hiringPipelineWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "hiringPipeline",
  "processes": [
    {
      "processId": "applicationPipeline",
      "title": "Application pipeline",
      "description": "Takes an application from screening through interview and the hiring manager's offer decision to a hire or a rejection, and closes the position when its headcount is filled.",
      "trigger": {
        "kind": "manual",
        "actorRef": "recruiter"
      },
      "tasks": [
        {
          "taskId": "recordApplication",
          "kind": "human",
          "actorRef": "recruiter",
          "journeyRef": "recordApplication",
          "next": [
            "screenApplication"
          ],
          "description": "The recruiter records the candidate's application to an open position, starting in screening."
        },
        {
          "taskId": "screenApplication",
          "kind": "human",
          "actorRef": "recruiter",
          "journeyRef": "advanceToInterview",
          "next": [
            "decideOffer",
            "rejectApplication"
          ],
          "description": "The recruiter screens the application and moves it to interview, handing it to the position's hiring manager, or sends it to rejection."
        },
        {
          "taskId": "decideOffer",
          "kind": "human",
          "actorRef": "hiringManager",
          "journeyRef": "decideOffer",
          "next": [
            "confirmHire",
            "rejectApplication"
          ],
          "description": "The hiring manager decides whether to extend an offer or return the application to the recruiter for rejection."
        },
        {
          "taskId": "confirmHire",
          "kind": "human",
          "actorRef": "hiringManager",
          "journeyRef": "confirmHire",
          "next": [
            "closeFilledPosition"
          ],
          "description": "The hiring manager marks the accepted offer as hired, counting toward the position's headcount."
        },
        {
          "taskId": "closeFilledPosition",
          "kind": "mechanical",
          "entityRef": "JobPosition",
          "effect": "transition",
          "transitionRef": "closePosition",
          "next": [],
          "description": "The position is closed automatically when its hires reach the headcount."
        },
        {
          "taskId": "rejectApplication",
          "kind": "human",
          "actorRef": "recruiter",
          "journeyRef": "rejectApplication",
          "next": [],
          "description": "The recruiter rejects the application, recording the reason."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "openJobPosition",
      "inProcess": false
    },
    {
      "journeyId": "registerCandidate",
      "inProcess": false
    },
    {
      "journeyId": "recordApplication",
      "inProcess": true,
      "processId": "applicationPipeline"
    },
    {
      "journeyId": "advanceToInterview",
      "inProcess": true,
      "processId": "applicationPipeline"
    },
    {
      "journeyId": "rejectApplication",
      "inProcess": true,
      "processId": "applicationPipeline"
    },
    {
      "journeyId": "decideOffer",
      "inProcess": true,
      "processId": "applicationPipeline"
    },
    {
      "journeyId": "confirmHire",
      "inProcess": true,
      "processId": "applicationPipeline"
    },
    {
      "journeyId": "reviewMyPipeline",
      "inProcess": false
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type HiringPipelineWorkflowsType = typeof hiringPipelineWorkflows;

export default hiringPipelineWorkflows;
