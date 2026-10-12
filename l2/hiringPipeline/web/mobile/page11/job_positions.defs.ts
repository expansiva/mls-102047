/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/job_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "Let the recruiter check job positions on a phone. A narrow, fluid column of positions shows fill status first, built around 390px and still usable at 360px and 430px. Tapping a position shows its stage counts and history, and the recruiter can open a new position or start an application on an open one.",
  "sections": [
    {
      "id": "positionsOverview",
      "priority": "primary",
      "purpose": "Stacked list of positions showing hiring manager, remaining openings and filled status, so an open position is quick to spot.",
      "organisms": [
        "positionList"
      ]
    },
    {
      "id": "positionFocus",
      "priority": "main",
      "purpose": "After a position is picked, show its numbers and applications by stage, then its history below them in the same narrow column.",
      "organisms": [
        "positionDetail",
        "positionTimeline"
      ]
    },
    {
      "id": "openPosition",
      "priority": "secondary",
      "purpose": "Short, single-column form to open a new position.",
      "organisms": [
        "openPositionForm"
      ]
    }
  ],
  "organisms": {
    "positionList": {
      "kind": "list",
      "text": "All job positions with their hiring manager, headcount, hires so far, remaining openings and filled status, shown as stacked rows. Tapping a position opens its details. From an open position the recruiter can go and record an application for a candidate.",
      "intents": [
        {
          "id": "applyCandidateToPosition",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    },
    "openPositionForm": {
      "kind": "form",
      "text": "Open a new job position: enter its title, department, description and headcount, and choose an active hiring manager. The position starts open with zero hires.",
      "intents": [
        {
          "id": "openJobPosition",
          "kind": "submit"
        }
      ]
    },
    "positionDetail": {
      "kind": "detail",
      "text": "Details of the selected position: headcount, hires so far and remaining openings first, then applications in each stage, the hiring manager and the role description.",
      "intents": []
    },
    "positionTimeline": {
      "kind": "timeline",
      "text": "What happened to the selected position: when it was opened, and when it closed automatically because hires reached the headcount.",
      "intents": []
    }
  },
  "molecules": {
    "positionList": [
      {
        "role": "positions list",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "fill progress per position",
        "preferred": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "apply candidate action",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      }
    ],
    "openPositionForm": [
      {
        "role": "title and department",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "role description",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "headcount",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "hiring manager choice",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "open position action",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "opened confirmation",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "positionDetail": [
      {
        "role": "headcount, hires and remaining openings",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "applications by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "fill progress",
        "preferred": "groupshowprogress--ml-circular-progress",
        "alternative": "groupshowprogress--ml-linear-progress"
      },
      {
        "role": "role description",
        "preferred": "groupexpandcontent--ml-readmore-expand",
        "alternative": "groupexpandcontent--ml-collapsible-panel"
      }
    ],
    "positionTimeline": [
      {
        "role": "position events",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
