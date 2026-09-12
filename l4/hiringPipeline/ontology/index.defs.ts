/// <mls fileReference="_102047_/l4/hiringPipeline/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const hiringPipelineOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "hiringPipeline",
  "businessDomain": "Recruitment and hiring pipeline management",
  "entities": [
    "JobPosition",
    "Candidate",
    "Application"
  ],
  "relationships": [
    {
      "relationshipId": "applicationCandidate",
      "fromEntity": "Application",
      "toEntity": "Candidate",
      "type": "manyToOne",
      "required": true,
      "description": "Each application is submitted by one candidate.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Application",
        "from": {
          "entityId": "Application",
          "fieldIds": [
            "candidateId"
          ]
        },
        "to": {
          "entityId": "Candidate",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "applicationJobPosition",
      "fromEntity": "Application",
      "toEntity": "JobPosition",
      "type": "manyToOne",
      "required": true,
      "description": "Each application is for one job position.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Application",
        "from": {
          "entityId": "Application",
          "fieldIds": [
            "jobPositionId"
          ]
        },
        "to": {
          "entityId": "JobPosition",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type HiringPipelineOntologyIndexType = typeof hiringPipelineOntologyIndex;

export default hiringPipelineOntologyIndex;
