/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/job_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "Give the recruiter a view of every job position: who manages it, how many people it needs, how many have been hired, and whether it is filled. From here the recruiter can open new positions, check how applications are spread across stages, see when a position closed by itself, and start an application on an open position.",
  "sections": [
    {
      "id": "positionsOverview",
      "priority": "primary",
      "purpose": "Scan all positions with their hiring manager and fill progress, and pick one to review or to apply a candidate to.",
      "organisms": [
        "positionList"
      ]
    },
    {
      "id": "positionFocus",
      "priority": "main",
      "purpose": "Show the selected position next to the list: its description, headcount against hires, applications by stage, and its history including any automatic closing.",
      "organisms": [
        "positionDetail",
        "positionTimeline"
      ]
    },
    {
      "id": "openPosition",
      "priority": "secondary",
      "purpose": "Open a new job position without leaving the overview.",
      "organisms": [
        "openPositionForm"
      ]
    }
  ],
  "organisms": {
    "positionList": {
      "kind": "list",
      "text": "All job positions with their hiring manager, headcount, hires so far, remaining openings and filled status. Selecting a position opens its details. From an open position the recruiter can go and record an application for a candidate.",
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
      "text": "Details of the selected position: title, department, description, hiring manager, headcount, hires so far, remaining openings, and how many applications sit in each stage.",
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
        "role": "positions table",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "fill progress per position",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      },
      {
        "role": "apply candidate action",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "openPositionForm": [
      {
        "role": "title and department",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "role description",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "headcount",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
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
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "positionDetail": [
      {
        "role": "headcount, hires and remaining openings",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "applications by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "fill progress",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "role description",
        "preferred": "groupexpandcontent--ml-readmore-expand"
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
