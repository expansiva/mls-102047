/// <mls fileReference="_102047_/l4/hiringPipeline/ontology/JobPosition.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const hiringPipelineEntityJobPosition = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "hiringPipeline",
  "entityId": "JobPosition",
  "title": "Job Position",
  "description": "An approved hiring need with its requirements and requested headcount.",
  "kind": "core",
  "party": "none",
  "displayField": "title",
  "fields": [
    {
      "fieldId": "id",
      "title": "ID",
      "type": "uuid",
      "required": true,
      "description": "Unique identifier for the job position."
    },
    {
      "fieldId": "title",
      "title": "Title",
      "type": "string",
      "required": true,
      "description": "Title of the job position."
    },
    {
      "fieldId": "department",
      "title": "Department",
      "type": "string",
      "required": true,
      "description": "Department requesting the job position."
    },
    {
      "fieldId": "description",
      "title": "Description",
      "type": "text",
      "required": true,
      "description": "Hiring requirements and description of the job position."
    },
    {
      "fieldId": "headcount",
      "title": "Headcount",
      "type": "integer",
      "required": true,
      "description": "Number of candidates requested for the job position."
    }
  ],
  "details": {
    "filledHeadcount": {
      "type": "integer",
      "description": "Number of candidates hired for this job position."
    },
    "remainingHeadcount": {
      "type": "integer",
      "description": "Number of additional candidates that can be hired before the requested headcount is filled."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type HiringPipelineEntityJobPositionType = typeof hiringPipelineEntityJobPosition;

export default hiringPipelineEntityJobPosition;
