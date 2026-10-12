/// <mls fileReference="_102047_/l4/hiringPipeline/ontology/JobPosition.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const hiringPipelineEntityJobPosition = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "hiringPipeline",
  "entityId": "JobPosition",
  "title": "Job Position",
  "description": "An open role to fill, with title, department, description, headcount and its hiring manager. It closes automatically when hires reach the headcount; hires so far and applications by stage are derived from its applications.",
  "displayField": "title",
  "relationships": {
    "hiringManager": {
      "relationshipId": "jobPositionHiringManager",
      "to": "HiringManager",
      "via": "JobPosition.hiringManagerId",
      "cardinality": "N:1",
      "title": "Hiring manager",
      "description": "Each job position has one hiring manager who decides offers and hires for it.",
      "mode": "fk",
      "required": true
    },
    "applications": {
      "relationshipId": "applicationJobPosition",
      "to": "Application",
      "via": "Application.jobPositionId",
      "cardinality": "1:N",
      "title": "Applications",
      "description": "Applications made to this position.",
      "mode": "fk",
      "direction": "to",
      "required": true
    },
    "candidates": {
      "relationshipId": "jobPositionCandidates",
      "to": "Candidate",
      "via": "Application",
      "cardinality": "N:N",
      "title": "Candidates",
      "description": "Candidates who applied to this position, read through its applications.",
      "mode": "throughTable",
      "path": "JobPosition.id <- Application.jobPositionId, Application.candidateId -> Candidate.id",
      "derived": true
    }
  },
  "capabilities": {
    "read.byId": "Opens one job position by id for the recruiter's review and the hiring manager's position screen.",
    "locate.byColumn": "Lists positions filtered by status, department or hiring manager and ordered by opening date, so the recruiter picks an open position and the hiring manager sees the ones they manage.",
    "locate.byText": "Searches positions by title or department from the recruiter's search box when recording an application.",
    "count": "Counts open or closed positions for list headers seen by recruiters and hiring managers.",
    "listByForeignKey": "Lists the positions of one hiring manager by hiringManagerId, and fills the position of many applications at once.",
    "create": "The recruiter opens a new position with title, department, description, headcount and hiring manager, starting open.",
    "update": "The recruiter corrects title, department, description, headcount or hiring manager of a position.",
    "transition": "The application pipeline moves the position from open to closed when its headcount is filled; no person does it.",
    "read.mdmRecord": "Reads the hiring manager's master record behind hiringManagerId to show their name on the position.",
    "comment": "Recruiters and hiring managers leave notes on a position.",
    "attach.document": "The recruiter attaches a job description file or approval document to the position."
  },
  "rules": [
    "closePositionWhenHeadcountFilled",
    "applicationOnlyToOpenPosition",
    "headcountAtLeastOne",
    "hiringManagerSeesOwnPositions"
  ],
  "kind": "entity",
  "class": "core",
  "storage": {
    "target": "moduleDatabase",
    "table": "hiringPipeline_jobposition",
    "kind": "relational"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "title": {
        "type": "string",
        "required": true,
        "indexed": true,
        "title": "Title",
        "description": "Title of the job position, shown in lists and searched by recruiters and hiring managers.",
        "maxLength": 160
      },
      "department": {
        "type": "string",
        "required": true,
        "indexed": true,
        "title": "Department",
        "description": "Department the position belongs to; recruiters filter and sort positions by it.",
        "maxLength": 120
      },
      "hiringManagerId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "HiringManager"
        ],
        "title": "Hiring manager",
        "description": "The hiring manager of this position, who decides offers and hires; hiring managers list their own positions by it."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "open",
            "title": "Open",
            "description": "Accepting applications."
          },
          {
            "value": "closed",
            "title": "Closed",
            "description": "Headcount filled; no new applications."
          }
        ],
        "title": "Status",
        "description": "Whether the position is open to applications or closed because its headcount was filled."
      },
      "openedAt": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Opened on",
        "description": "Date the recruiter opened the position; lists are ordered by it."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Details",
        "description": "Everything else about the position.",
        "fields": {
          "description": {
            "type": "text",
            "required": true,
            "title": "Description",
            "description": "Description of the role, its responsibilities and requirements."
          },
          "headcount": {
            "type": "integer",
            "required": true,
            "title": "Headcount",
            "description": "Number of people to hire for this position; the position closes when hires reach it.",
            "min": 1
          },
          "closedAt": {
            "type": "timestamp",
            "title": "Closed at",
            "description": "When the position was closed automatically because its headcount was filled."
          },
          "hiresSoFar": {
            "type": "integer",
            "derived": true,
            "title": "Hires so far",
            "description": "Number of applications to this position that are in the hired stage."
          },
          "remainingOpenings": {
            "type": "integer",
            "derived": true,
            "title": "Remaining openings",
            "description": "Headcount of the position minus the applications already hired, never below zero."
          },
          "applicationsByStage": {
            "type": "object",
            "derived": true,
            "title": "Applications by stage",
            "description": "Count of this position's applications in each stage: screening, interview, offer, hired and rejected."
          },
          "isFilled": {
            "type": "boolean",
            "derived": true,
            "title": "Filled",
            "description": "True when the applications hired for this position reach its headcount."
          }
        }
      }
    }
  },
  "lifecycleStates": [
    {
      "state": "open",
      "reachedBy": "actor"
    },
    {
      "state": "closed",
      "reachedBy": "command"
    }
  ],
  "transitions": [
    {
      "transitionId": "closePosition",
      "from": [
        "open"
      ],
      "to": "closed",
      "by": [],
      "description": "The application pipeline closes the position automatically when the number of hired applications reaches the headcount.",
      "payload": [
        "details.closedAt"
      ],
      "ruleRefs": [
        "closePositionWhenHeadcountFilled"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type HiringPipelineEntityJobPositionType = typeof hiringPipelineEntityJobPosition;

export default hiringPipelineEntityJobPosition;
