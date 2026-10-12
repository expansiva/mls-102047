/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/my_applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Lets the hiring manager work through the applications for their own positions: find interviewed candidates waiting for an offer decision and accepted offers waiting to be marked hired, check the candidate and the application history, and act on it in the same place.",
  "sections": [
    {
      "id": "queue",
      "priority": "primary",
      "purpose": "Applications for my positions grouped by stage, with days in pipeline, so I can quickly filter to interviewed ones and accepted offers that need my decision.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "selectedApplication",
      "priority": "main",
      "purpose": "The selected application with the candidate's name, email and resume, and the decisions I can take on it right now.",
      "organisms": [
        "applicationDetail",
        "applicationActions"
      ]
    },
    {
      "id": "history",
      "priority": "secondary",
      "purpose": "How the application got here: its stage changes, including when the recruiter handed it to me.",
      "organisms": [
        "applicationHistory"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "Applications for my positions by stage, with the candidate, the position, the applied date and days in pipeline; quick filters for interviewed applications and accepted offers. Picking one opens it beside the list.",
      "intents": [
        {
          "id": "openMyHome",
          "kind": "navigate",
          "to": "my_pipeline_home"
        }
      ]
    },
    "applicationDetail": {
      "kind": "detail",
      "text": "Application details: number, stage, position and applied date, with the candidate's name, email, source and resume, plus the position's remaining openings so I know a hire still fits the headcount.",
      "intents": [
        {
          "id": "openMyPositions",
          "kind": "navigate",
          "to": "my_positions"
        }
      ]
    },
    "applicationActions": {
      "kind": "actions",
      "text": "Decisions on the selected application: extend an offer to an interviewed candidate, return it to the recruiter for rejection with a reason, or mark an accepted offer as hired. Only the decisions valid for the current stage are offered, and the result is confirmed right away.",
      "intents": [
        {
          "id": "extendOffer",
          "kind": "submit"
        },
        {
          "id": "returnForRejection",
          "kind": "submit"
        },
        {
          "id": "markHired",
          "kind": "submit"
        }
      ]
    },
    "applicationHistory": {
      "kind": "timeline",
      "text": "Stage changes of the application in time order: moved to interview by the recruiter, offer extended, hired, or rejected with its reason and the stage it was in.",
      "intents": []
    }
  },
  "molecules": {
    "applicationList": [
      {
        "role": "stage filter for interviewed and offer applications",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "application queue with the selected record opened beside it",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "applicationDetail": [
      {
        "role": "candidate and application summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "applicationActions": [
      {
        "role": "stage decisions",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "decision result feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "applicationHistory": [
      {
        "role": "stage change history",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
