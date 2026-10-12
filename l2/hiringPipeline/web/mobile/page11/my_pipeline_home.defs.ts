/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/my_pipeline_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "On a narrow screen around 390px wide (still usable at 360px and 430px), lead with the decisions waiting for the hiring manager so they can offer, decline or confirm a hire on the go, followed by a compact summary of how their positions are progressing.",
  "sections": [
    {
      "id": "waitingForMe",
      "priority": "primary",
      "purpose": "Show the applications awaiting the hiring manager's decision first, as stacked items they can act on with one hand.",
      "organisms": [
        "applicationsWaitingForMe"
      ]
    },
    {
      "id": "myPipelineOverview",
      "priority": "main",
      "purpose": "Give a short summary of hires so far, remaining openings, applications by stage and filled positions, with active applications and their days in the pipeline below.",
      "organisms": [
        "myPipelineHighlights"
      ]
    }
  ],
  "organisms": {
    "applicationsWaitingForMe": {
      "kind": "inbox",
      "text": "Applications waiting for me: interviewed candidates for my positions where I decide whether to extend an offer or decline, and accepted offers I confirm as hired. Each item shows the candidate, the position, the stage and days in the pipeline, with remaining openings for offers.",
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
      "text": "My positions with hires so far, remaining openings, applications by stage and which are already filled; my active applications and how many days each has been in the pipeline.",
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
        "role": "Stacked list of applications awaiting my decision",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Switch between offer decisions and hires to confirm",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Decision actions on an application: offer, decline or confirm hire",
        "preferred": "grouptriggeraction--ml-split-button",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "Confirmation after a decision is recorded",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "myPipelineHighlights": [
      {
        "role": "Headline figures: hires so far and remaining openings",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Applications by stage for my positions",
        "preferred": "groupviewchart--ml-bar-chart"
      },
      {
        "role": "Progress of each position toward its headcount",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "My positions and active applications with days in pipeline",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
