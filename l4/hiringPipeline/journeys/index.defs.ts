/// <mls fileReference="_102047_/l4/hiringPipeline/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const hiringPipelineJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "hiringPipeline",
  "journeys": [
    {
      "journeyId": "openJobPosition",
      "actorRef": "recruiter",
      "title": "Open a job position"
    },
    {
      "journeyId": "registerCandidate",
      "actorRef": "recruiter",
      "title": "Register a candidate"
    },
    {
      "journeyId": "startAndProgressApplication",
      "actorRef": "recruiter",
      "title": "Start and progress a candidate application"
    },
    {
      "journeyId": "recordApplicationRejection",
      "actorRef": "recruiter",
      "title": "Reject a candidate application"
    },
    {
      "journeyId": "decideOffer",
      "actorRef": "hiringManager",
      "title": "Decide whether to make an offer"
    },
    {
      "journeyId": "decideHiring",
      "actorRef": "hiringManager",
      "title": "Decide whether to hire a candidate"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type HiringPipelineJourneyIndexType = typeof hiringPipelineJourneyIndex;

export default hiringPipelineJourneyIndex;
