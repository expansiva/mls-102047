/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/my_applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/approvalWorkflow/page21.md",
    "experience": "readAndDecide"
  },
  "intent": "Decide on applications to the positions I manage. Find the application, review the candidate, the interview, the offer and the remaining openings, then extend an offer, hire the candidate, or send the application back to the recruiter to be rejected.",
  "sections": [
    {
      "id": "findSection",
      "priority": "main",
      "purpose": "Find applications on my positions by number, candidate, stage or position. Days in the current stage show which applications are waiting longest for my decision.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "reviewSection",
      "priority": "primary",
      "purpose": "Review the selected application before deciding: the candidate's resume link and source, the interview, the offer, and how many openings the position still has.",
      "organisms": [
        "applicationReview"
      ]
    },
    {
      "id": "decisionSection",
      "priority": "primary",
      "purpose": "Make the decision this stage calls for: extend an offer to an interviewed candidate, hire a candidate who has an offer, or send the application back to the recruiter with a reason.",
      "organisms": [
        "applicationDecision"
      ]
    },
    {
      "id": "historySection",
      "priority": "secondary",
      "purpose": "See how the application moved through the stages, who moved it, and who decided the offer and the hire.",
      "organisms": [
        "stageHistory"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "Applications to the positions I manage. Each shows its number, candidate, position, stage and days in the current stage, and can be searched or filtered by stage.",
      "intents": []
    },
    "applicationReview": {
      "kind": "detail",
      "text": "The candidate and the application: name, contact, resume link and source, when they applied, when they moved to interview, the offer and its notes, and the position's remaining openings, so I can decide with the headcount in view.",
      "intents": [
        {
          "id": "openMyPositions",
          "kind": "navigate",
          "to": "my_positions"
        }
      ]
    },
    "applicationDecision": {
      "kind": "actions",
      "text": "Only the decisions allowed at the current stage: extend an offer with offer notes, hire the candidate when an opening remains, or send the application back to the recruiter with a rejection reason.",
      "intents": [
        {
          "id": "extendOffer",
          "kind": "submit"
        },
        {
          "id": "hireCandidate",
          "kind": "submit"
        },
        {
          "id": "sendBackToReject",
          "kind": "submit"
        }
      ]
    },
    "stageHistory": {
      "kind": "timeline",
      "text": "The application's stage history: when it was applied, moved to interview and by whom, when the offer was extended and the hire was decided and by whom, and when and at which stage it was rejected.",
      "intents": []
    }
  },
  "molecules": {
    "applicationList": [
      {
        "role": "Search by application number, candidate or position",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Filter by stage",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Applications with stage and days in stage",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "applicationReview": [
      {
        "role": "Candidate summary with resume link and source",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Remaining openings of the position",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Interview and offer details",
        "preferred": "groupexpandcontent--ml-collapsible-panel",
        "alternative": "groupexpandcontent--ml-accordion"
      }
    ],
    "applicationDecision": [
      {
        "role": "Decision buttons for offer, hire or send back",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Offer notes or rejection reason",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Confirm the decision before it is recorded",
        "preferred": "groupnotifyuser--ml-alert-modal"
      },
      {
        "role": "Result of the decision",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "stageHistory": [
      {
        "role": "Stage changes over time",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewtable--ml-data-table-minimal"
      }
    ]
  }
} as const;
