/// <mls fileReference="_102047_/l4/hiringPipeline/ontology/Candidate.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const hiringPipelineEntityCandidate = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "hiringPipeline",
  "entityId": "Candidate",
  "title": "Candidate",
  "description": "A person registered for consideration in the organization's hiring process.",
  "kind": "mdm",
  "party": "person",
  "mdmSubtype": "Person",
  "displayField": "name",
  "fields": [
    {
      "fieldId": "resumeLink",
      "title": "Resume link",
      "type": "string",
      "required": true,
      "constraints": {
        "maxLength": 2048
      },
      "description": "Link to the candidate's resume."
    },
    {
      "fieldId": "source",
      "title": "Source",
      "type": "string",
      "required": true,
      "constraints": {
        "maxLength": 255
      },
      "description": "How the candidate was sourced for the hiring process."
    }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "hiringPipeline.Candidate"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type HiringPipelineEntityCandidateType = typeof hiringPipelineEntityCandidate;

export default hiringPipelineEntityCandidate;
