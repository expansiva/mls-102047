/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/my_pipeline_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Give the hiring manager, on opening their pipeline, a clear view of the decisions waiting for them — interviewed candidates to offer or decline and accepted offers to confirm as hired — next to an overview of how each of their positions is progressing toward its headcount.",
  "sections": [
    {
      "id": "waitingForMe",
      "priority": "primary",
      "purpose": "Show first what only the hiring manager can move forward: interviewed applications awaiting an offer decision and offers awaiting hire confirmation, so nothing stalls in their hands.",
      "organisms": [
        "applicationsWaitingForMe"
      ]
    },
    {
      "id": "myPipelineOverview",
      "priority": "main",
      "purpose": "Summarize how the hiring manager's positions are doing: hires so far against headcount, remaining openings, applications by stage, which positions are filled, and how long active applications have been in the pipeline.",
      "organisms": [
        "myPipelineHighlights"
      ]
    }
  ],
  "organisms": {
    "applicationsWaitingForMe": {
      "kind": "inbox",
      "text": "Applications waiting for me: interviewed candidates for my positions where I decide whether to extend an offer or decline, and accepted offers I confirm as hired. Each item shows the candidate, the position, the stage, how many days it has been in the pipeline and, for offers, how many openings remain on the position.",
      "intents": [
        {
          "id": "extendOffer",
          "kind": "submit"
        },
        {
          "id": "declineApplication",
          "kind": "submit"
        },
        {
          "id": "confirmHire",
          "kind": "submit"
        },
        {
          "id": "openMyApplications",
          "kind": "navigate",
          "to": "my_applications"
        }
      ]
    },
    "myPipelineHighlights": {
      "kind": "highlights",
      "text": "My positions with hires so far, remaining openings, applications by stage and which are already filled; my active applications and how many days each has been in the pipeline, so I see where hiring is moving and where it is stuck.",
      "intents": [
        {
          "id": "openMyPositions",
          "kind": "navigate",
          "to": "my_positions"
        },
        {
          "id": "openActiveApplications",
          "kind": "navigate",
          "to": "my_applications"
        }
      ]
    }
  },
  "molecules": {
    "applicationsWaitingForMe": [
      {
        "role": "List of applications awaiting my decision",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Switch between offer decisions and hires to confirm",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Decision actions on an application: offer, decline or confirm hire",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Confirmation after a decision is recorded",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "myPipelineHighlights": [
      {
        "role": "Headline figures: hires so far and remaining openings across my positions",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Applications by stage for my positions",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Progress of each position toward its headcount",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      },
      {
        "role": "My positions with openings and filled status, and active applications with days in pipeline",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      }
    ]
  }
} as const;
