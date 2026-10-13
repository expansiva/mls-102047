/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/job_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "On a narrow screen (about 390px, still usable at 360px and 430px), let the recruiter find a position, see its remaining openings, open a new position and check when it closed, in a single fluid column.",
  "sections": [
    {
      "id": "positionsBrowse",
      "priority": "primary",
      "purpose": "Search and filter positions and scan their remaining openings in a stacked list that fits a narrow screen.",
      "organisms": [
        "positionList"
      ]
    },
    {
      "id": "positionReviewArea",
      "priority": "main",
      "purpose": "Show the selected position's headcount, hires so far, remaining openings and filled status first, with shortcuts to register a candidate or record an application.",
      "organisms": [
        "positionReview"
      ]
    },
    {
      "id": "openPositionArea",
      "priority": "secondary",
      "purpose": "Open a new position with a short, single-column form.",
      "organisms": [
        "openPositionForm"
      ]
    },
    {
      "id": "positionHistoryArea",
      "priority": "secondary",
      "purpose": "Show when the position closed automatically after its headcount was filled.",
      "organisms": [
        "positionClosureTimeline"
      ]
    }
  ],
  "organisms": {
    "positionList": {
      "kind": "list",
      "text": "Job positions searchable by title, department, hiring manager or status, each with its remaining openings, stacked for quick scanning on a phone.",
      "intents": []
    },
    "openPositionForm": {
      "kind": "form",
      "text": "Open a job position with title, department, description, headcount and hiring manager; the position starts open and ready for applications.",
      "intents": [
        {
          "id": "openPosition",
          "kind": "submit"
        }
      ]
    },
    "positionReview": {
      "kind": "detail",
      "text": "The selected position's opening date, headcount, hires so far, remaining openings and whether the headcount is filled, with the key numbers shown first.",
      "intents": [
        {
          "id": "goRegisterCandidate",
          "kind": "navigate",
          "to": "candidates"
        },
        {
          "id": "goRecordApplication",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    },
    "positionClosureTimeline": {
      "kind": "timeline",
      "text": "When the position opened and when the system closed it automatically after the hire that filled its headcount.",
      "intents": []
    }
  },
  "molecules": {
    "positionList": [
      {
        "role": "search positions",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "filter by status",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "positions with remaining openings",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "openPositionForm": [
      {
        "role": "title",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "department",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "description",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "headcount",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-floating-number-input"
      },
      {
        "role": "hiring manager",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "open position",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "result feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "positionReview": [
      {
        "role": "remaining openings",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "hires against headcount",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "position summary",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "positionClosureTimeline": [
      {
        "role": "opening and automatic closing events",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
