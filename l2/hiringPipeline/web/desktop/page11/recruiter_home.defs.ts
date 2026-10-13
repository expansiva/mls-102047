/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/recruiter_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Give the recruiter one place to see how the hiring pipeline stands today and to work through the applications waiting for her. She can move screened candidates to interview, reject the ones that will not move forward with a reason, and start registering new applications.",
  "sections": [
    {
      "id": "pipelineOverview",
      "priority": "secondary",
      "purpose": "Shows how many active applications are in each stage and how long they have been there. It also shows each open position's remaining openings and hires so far, so the recruiter knows where to focus.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    {
      "id": "myWorkQueue",
      "priority": "primary",
      "purpose": "The applications that need the recruiter now, with the stage-change actions that move each one forward or close it.",
      "organisms": [
        "applicationsInbox"
      ]
    }
  ],
  "organisms": {
    "pipelineHighlights": {
      "kind": "highlights",
      "text": "Active applications by stage (screening, interview, offer) with days in the current stage, so stalled ones stand out. Also each open position with its remaining openings and hires so far. Picking a stage narrows the work queue to that stage.",
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
      "text": "Applications waiting for me, oldest in their stage first. Each shows the application number, candidate, position, stage, applied date and days in stage, plus the candidate's resume link and source. I can move a screened application to interview, so it goes to the position's hiring manager once the interview is done. I can reject one that will not move forward by giving a reason. I can also register a new candidate application.",
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
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Distribution of active applications across stages",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Open positions with remaining openings and hires so far",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "applicationsInbox": [
      {
        "role": "Queue of waiting applications with a review panel for the chosen one",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewtable--ml-data-table"
      },
      {
        "role": "Filter the queue by stage",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
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
