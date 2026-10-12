/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/my_applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "On a narrow screen (around 390px, still usable at 360px and 430px) the hiring manager scans the applications for their positions by stage, opens one, reviews the candidate and decides, one step at a time in a single fluid column.",
  "sections": [
    {
      "id": "queue",
      "priority": "primary",
      "purpose": "Stacked list of my applications with stage and days in pipeline, with quick filters for interviewed applications and accepted offers.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "selectedApplication",
      "priority": "main",
      "purpose": "After picking an application: the candidate's name, email and resume, then the decisions available for its stage, kept close to the reading.",
      "organisms": [
        "applicationDetail",
        "applicationActions"
      ]
    },
    {
      "id": "history",
      "priority": "secondary",
      "purpose": "The application's stage changes below the decision, for when I want the context of the recruiter's handoff.",
      "organisms": [
        "applicationHistory"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "Applications for my positions as compact rows showing the candidate, position, stage and days in pipeline; quick filters for interviewed applications and accepted offers. Tapping one opens its details.",
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
      "text": "Application details: stage, position and applied date, with the candidate's name, email, source and resume, plus the position's remaining openings.",
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
      "text": "Decisions for the current stage: extend an offer, return to the recruiter for rejection with a reason, or mark an accepted offer as hired, with a clear confirmation of the result.",
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
      "text": "Stage changes of the application in time order, including the recruiter's handoff to interview and any rejection reason.",
      "intents": []
    }
  },
  "molecules": {
    "applicationList": [
      {
        "role": "stage filter for interviewed and offer applications",
        "preferred": "groupnavigatesection--ml-navigate-pills"
      },
      {
        "role": "narrow application queue",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "applicationDetail": [
      {
        "role": "candidate and application summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "applicationActions": [
      {
        "role": "stage decisions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "decision result feedback",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "applicationHistory": [
      {
        "role": "stage change history",
        "preferred": "groupviewdata--ml-timeline-view"
      }
    ]
  }
} as const;
