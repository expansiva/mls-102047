/// <mls fileReference="_102047_/l4/hiringPipeline/ontology/Application.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const hiringPipelineEntityApplication = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "hiringPipeline",
  "entityId": "Application",
  "title": "Application",
  "description": "A candidate applying to a job position. It moves through screening, interview, offer, then hired or rejected; a rejection records its reason.",
  "displayField": "applicationNumber",
  "relationships": {
    "jobPosition": {
      "relationshipId": "applicationJobPosition",
      "to": "JobPosition",
      "via": "Application.jobPositionId",
      "cardinality": "N:1",
      "title": "Job position applied to",
      "description": "Each application is made to one job position.",
      "mode": "fk",
      "required": true
    },
    "candidate": {
      "relationshipId": "applicationCandidate",
      "to": "Candidate",
      "via": "Application.candidateId",
      "cardinality": "N:1",
      "title": "Applying candidate",
      "description": "Each application belongs to one candidate.",
      "mode": "fk",
      "required": true
    }
  },
  "capabilities": {
    "read.byId": "Opens one application by its id when the recruiter or hiring manager follows a notification or a link from the pipeline.",
    "locate.byColumn": "Lists applications filtered by position, candidate and stage, ordered by applied date, so the recruiter sees screening lists and the hiring manager sees interview and offer lists of their positions.",
    "locate.byText": "Finds an application by typing part of its application number in the pipeline search box.",
    "count": "Counts applications per stage of a position for the pipeline header and counts hires against the headcount.",
    "listByForeignKey": "Lists all applications of a job position or of a candidate on their record screens, hydrating many at once.",
    "create": "The recruiter records a new application of a candidate to an open position, starting in screening.",
    "update": "The recruiter corrects the application details while it is still active.",
    "transition": "Moves the stage column: the recruiter advances to interview and rejects with a reason, the position's hiring manager extends the offer and confirms the hire.",
    "uniqueKey": "The engine refuses a second application with the same application number.",
    "transaction": "Confirming a hire writes the application as hired and closes the job position in one all-or-nothing operation when the headcount is filled.",
    "read.mdmRecord": "Reads the candidate master record behind each application to show name, e-mail, resume link and source to the recruiter and hiring manager.",
    "sequence.next": "Issues the application number from the platform sequence hiringPipeline.Application when the recruiter records the application.",
    "comment": "Recruiter and hiring manager leave notes on the application while discussing interviews and offers.",
    "statusHistory.read": "Shows when the application changed stage and who moved it, reviewed before advancing, offering or rejecting.",
    "audit": "Lets an administrator see who changed an application and when."
  },
  "rules": [
    "applicationNumberFromSequence",
    "applicationStartsInScreening",
    "applicationOnlyToOpenPosition",
    "oneActiveApplicationPerCandidateAndPosition",
    "recruiterMovesScreeningAndInterview",
    "onlyPositionHiringManagerDecides",
    "rejectionRequiresReason",
    "hireWithinRemainingHeadcount",
    "positionClosesWhenHeadcountFilled"
  ],
  "kind": "entity",
  "class": "event",
  "storage": {
    "target": "moduleDatabase",
    "table": "hiringPipeline_application",
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
      "applicationNumber": {
        "type": "string",
        "required": true,
        "unique": true,
        "indexed": true,
        "title": "Application number",
        "description": "Number people quote for the application, issued by the platform number sequence when the application is recorded.",
        "maxLength": 30
      },
      "jobPositionId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "JobPosition"
        ],
        "title": "Job position",
        "description": "The job position the candidate applies to; used to list a position's pipeline."
      },
      "candidateId": {
        "type": "record",
        "required": true,
        "indexed": true,
        "to": [
          "Candidate"
        ],
        "title": "Candidate",
        "description": "The candidate who applies; name, e-mail, resume link and source are read from the candidate record."
      },
      "status": {
        "type": "enum",
        "required": true,
        "indexed": true,
        "values": [
          {
            "value": "screening",
            "title": "Screening",
            "description": "Recorded and being screened by the recruiter."
          },
          {
            "value": "interview",
            "title": "Interview",
            "description": "In interviews; the hiring manager decides on an offer."
          },
          {
            "value": "offer",
            "title": "Offer",
            "description": "An offer was extended to the candidate."
          },
          {
            "value": "hired",
            "title": "Hired",
            "description": "The candidate was hired; counts towards the position's headcount."
          },
          {
            "value": "rejected",
            "title": "Rejected",
            "description": "The application was closed with a reason."
          }
        ],
        "title": "Stage",
        "description": "Current stage of the application in the hiring pipeline."
      },
      "appliedAt": {
        "type": "date",
        "required": true,
        "indexed": true,
        "title": "Applied on",
        "description": "Date the application was recorded; lists are ordered by it."
      },
      "details": {
        "type": "object",
        "required": true,
        "title": "Application details",
        "description": "Everything about the application that nobody filters by.",
        "fields": {
          "interviewStartedAt": {
            "type": "timestamp",
            "title": "Moved to interview at",
            "description": "When the recruiter moved the application from screening to interview."
          },
          "offerExtendedAt": {
            "type": "timestamp",
            "title": "Offer extended at",
            "description": "When the hiring manager moved the application to offer."
          },
          "hiredAt": {
            "type": "timestamp",
            "title": "Hired at",
            "description": "When the hiring manager confirmed the hire."
          },
          "rejection": {
            "type": "object",
            "title": "Rejection",
            "description": "Filled when the application is rejected.",
            "fields": {
              "reason": {
                "type": "text",
                "required": true,
                "title": "Rejection reason",
                "description": "Why the application will not move forward; required to reject.",
                "maxLength": 2000
              },
              "rejectedAt": {
                "type": "timestamp",
                "required": true,
                "title": "Rejected at",
                "description": "When the application was moved to rejected."
              },
              "stageAtRejection": {
                "type": "enum",
                "required": true,
                "values": [
                  {
                    "value": "screening",
                    "title": "Screening"
                  },
                  {
                    "value": "interview",
                    "title": "Interview"
                  },
                  {
                    "value": "offer",
                    "title": "Offer"
                  }
                ],
                "title": "Stage at rejection",
                "description": "The stage the application was in when it was rejected."
              }
            }
          },
          "isActive": {
            "type": "boolean",
            "derived": true,
            "title": "Active",
            "description": "True while the application is still in screening, interview or offer, that is, not yet hired nor rejected."
          },
          "daysInPipeline": {
            "type": "integer",
            "derived": true,
            "title": "Days in pipeline",
            "description": "Days from the application date until today, or until the day it was hired or rejected."
          }
        }
      }
    }
  },
  "uniqueKeys": [
    [
      "applicationNumber"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "screening",
      "reachedBy": "actor"
    },
    {
      "state": "interview",
      "reachedBy": "actor"
    },
    {
      "state": "offer",
      "reachedBy": "actor"
    },
    {
      "state": "hired",
      "reachedBy": "actor"
    },
    {
      "state": "rejected",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "advanceToInterview",
      "from": [
        "screening"
      ],
      "to": "interview",
      "by": [
        "recruiter"
      ],
      "description": "The recruiter moves a screened application to interview, handing it to the position's hiring manager.",
      "payload": [],
      "ruleRefs": [
        "recruiterMovesScreeningAndInterview"
      ]
    },
    {
      "transitionId": "extendOffer",
      "from": [
        "interview"
      ],
      "to": "offer",
      "by": [
        "hiringManager"
      ],
      "description": "The position's hiring manager decides to extend an offer to the interviewed candidate.",
      "payload": [],
      "ruleRefs": [
        "onlyPositionHiringManagerDecides"
      ]
    },
    {
      "transitionId": "hire",
      "from": [
        "offer"
      ],
      "to": "hired",
      "by": [
        "hiringManager"
      ],
      "description": "The position's hiring manager confirms the hire; when hires reach the headcount the position closes automatically.",
      "payload": [],
      "ruleRefs": [
        "onlyPositionHiringManagerDecides",
        "hireWithinRemainingHeadcount",
        "positionClosesWhenHeadcountFilled"
      ]
    },
    {
      "transitionId": "reject",
      "from": [
        "screening",
        "interview",
        "offer"
      ],
      "to": "rejected",
      "by": [
        "recruiter",
        "hiringManager"
      ],
      "description": "The application is closed with a reason; normally the recruiter records it, and the hiring manager may decline at interview instead of returning it.",
      "payload": [
        "details.rejection.reason"
      ],
      "ruleRefs": [
        "rejectionRequiresReason"
      ]
    }
  ]
} as const satisfies Ns5Readonly<Ns5OntologyEntityV3>;

export type HiringPipelineEntityApplicationType = typeof hiringPipelineEntityApplication;

export default hiringPipelineEntityApplication;
