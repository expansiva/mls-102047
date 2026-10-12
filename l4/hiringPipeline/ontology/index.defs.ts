/// <mls fileReference="_102047_/l4/hiringPipeline/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const hiringPipelineOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "hiringPipeline",
  "businessDomain": "Recruitment pipeline: job positions opened by recruiters, candidates registered and their applications moved through screening, interview, offer, hired or rejected, with hiring managers deciding offer and hire on their own positions.",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "hiringPipeline",
    "description": "Branch details.hiringPipeline of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "JobPosition",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Application",
      "kind": "entity",
      "class": "event"
    },
    {
      "entityId": "Candidate",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "CandidateEmail",
      "kind": "role",
      "subtype": "ContactChannel"
    },
    {
      "entityId": "HiringManager",
      "kind": "role",
      "subtype": "Person"
    }
  ],
  "relationships": [
    {
      "relationshipId": "jobPositionHiringManager",
      "from": "JobPosition",
      "to": "HiringManager",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Each job position has one hiring manager who decides offers and hires for it.",
      "field": "JobPosition.hiringManagerId"
    },
    {
      "relationshipId": "applicationJobPosition",
      "from": "Application",
      "to": "JobPosition",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Each application is made to one job position.",
      "field": "Application.jobPositionId"
    },
    {
      "relationshipId": "applicationCandidate",
      "from": "Application",
      "to": "Candidate",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Each application belongs to one candidate.",
      "field": "Application.candidateId"
    },
    {
      "relationshipId": "candidateEmail",
      "from": "Candidate",
      "to": "CandidateEmail",
      "type": "oneToMany",
      "required": false,
      "mode": "mdmRelationship",
      "description": "The candidate's e-mail addresses are contact channels linked to the candidate.",
      "catalogType": "HasContact"
    },
    {
      "relationshipId": "jobPositionCandidates",
      "from": "JobPosition",
      "to": "Candidate",
      "type": "manyToMany",
      "required": false,
      "mode": "throughTable",
      "description": "The candidates who applied to a job position, read through its applications.",
      "through": "Application",
      "path": "JobPosition.id <- Application.jobPositionId, Application.candidateId -> Candidate.id",
      "derived": true
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyIndexV3>;

export type HiringPipelineOntologyIndexType = typeof hiringPipelineOntologyIndex;

export default hiringPipelineOntologyIndex;
