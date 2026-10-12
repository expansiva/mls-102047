/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/recruiter_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "On a narrow screen (about 390px, still usable at 360px and 430px), the recruiter sees first the applications waiting for them and acts on them one at a time, then checks a short overview of how positions are filling.",
  "sections": [
    {
      "id": "workInbox",
      "priority": "primary",
      "purpose": "Applications waiting for the recruiter, stacked as one column so each one can be recorded, moved to interview or rejected with a reason.",
      "organisms": [
        "applicationsInbox"
      ]
    },
    {
      "id": "pipelineOverview",
      "priority": "secondary",
      "purpose": "Short pipeline summary below the inbox: hires so far, remaining openings, applications by stage, filled positions and days in the pipeline for active applications.",
      "organisms": [
        "pipelineHighlights"
      ]
    }
  ],
  "organisms": {
    "pipelineHighlights": {
      "kind": "highlights",
      "text": "Positions with hires so far, remaining openings, applications by stage and which are filled; active applications and their days in the pipeline, as compact indicators that wrap to fit the screen width.",
      "intents": [
        {
          "id": "openJobPositions",
          "kind": "navigate",
          "to": "job_positions"
        },
        {
          "id": "openApplications",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    },
    "applicationsInbox": {
      "kind": "inbox",
      "text": "Applications waiting for me: new applications to record, applications in screening to move to interview or reject, and applications returned by the hiring manager to reject with a reason, each shown as a stacked item with its actions.",
      "intents": [
        {
          "id": "recordApplication",
          "kind": "submit"
        },
        {
          "id": "advanceToInterview",
          "kind": "submit"
        },
        {
          "id": "rejectApplication",
          "kind": "submit"
        },
        {
          "id": "openApplicationsPage",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    }
  },
  "molecules": {
    "pipelineHighlights": [
      {
        "role": "Compact headline counts",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-compact-metric-sparkline"
      },
      {
        "role": "Applications by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Positions with filled status on a narrow screen",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "applicationsInbox": [
      {
        "role": "Stacked list of applications waiting for an action",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Switch between inbox groups",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Pick the candidate and open position",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Rejection reason",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Actions on an application",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "Confirmation after an action",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
