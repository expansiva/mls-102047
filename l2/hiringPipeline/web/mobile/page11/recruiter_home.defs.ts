/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/recruiter_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "On a phone, put the recruiter straight into the applications waiting for her, with a short pipeline summary above them. The layout is fluid narrow content around 390px that still works at 360px and 430px, so she can move candidates to interview or reject them with a reason while away from her desk.",
  "sections": [
    {
      "id": "pipelineOverview",
      "priority": "secondary",
      "purpose": "A compact summary of active applications per stage with days in stage, and the remaining openings of open positions. It stacks above the queue so the recruiter can scan it quickly.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    {
      "id": "myWorkQueue",
      "priority": "primary",
      "purpose": "The waiting applications as a scrollable list. Opening one reveals its stage-change actions.",
      "organisms": [
        "applicationsInbox"
      ]
    }
  ],
  "organisms": {
    "pipelineHighlights": {
      "kind": "highlights",
      "text": "How many active applications are in screening, interview and offer, and how long they have been there. Also the remaining openings and hires so far for each open position. Tapping a stage narrows the queue below.",
      "intents": [
        {
          "id": "openJobPositions",
          "kind": "navigate",
          "to": "job_positions"
        }
      ]
    },
    "applicationsInbox": {
      "kind": "inbox",
      "text": "Applications waiting for me, each showing the candidate, position, stage and days in stage. Opening one shows the application number, applied date, resume link and source. From there I can move it to interview so it reaches the hiring manager after the interview, or reject it with a reason. I can also start registering a new candidate application.",
      "intents": [
        {
          "id": "advanceToInterview",
          "kind": "submit"
        },
        {
          "id": "rejectApplication",
          "kind": "submit"
        },
        {
          "id": "registerApplication",
          "kind": "navigate",
          "to": "applications"
        },
        {
          "id": "registerCandidate",
          "kind": "navigate",
          "to": "candidates"
        }
      ]
    }
  },
  "molecules": {
    "pipelineHighlights": [
      {
        "role": "Active applications count per stage",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      },
      {
        "role": "Open positions with remaining openings",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "applicationsInbox": [
      {
        "role": "Scrollable list of waiting applications",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Filter the queue by stage",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      },
      {
        "role": "Rejection reason",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Move to interview, reject and register actions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "Confirmation after a stage change",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
