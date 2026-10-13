/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/job_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Help the recruiter find job positions, open new ones and check whether each position still has openings, so candidates are only sent to positions that can still hire.",
  "sections": [
    {
      "id": "positionsBrowse",
      "priority": "primary",
      "purpose": "Find a position by title, department, hiring manager or status and see at a glance how many openings remain.",
      "organisms": [
        "positionList"
      ]
    },
    {
      "id": "positionReviewArea",
      "priority": "main",
      "purpose": "Review the selected position: when it opened, its headcount, hires so far, remaining openings and whether the headcount is filled. Go from here to register a candidate or record an application.",
      "organisms": [
        "positionReview"
      ]
    },
    {
      "id": "openPositionArea",
      "priority": "secondary",
      "purpose": "Open a new position with its title, department, description, headcount and hiring manager so it can receive applications.",
      "organisms": [
        "openPositionForm"
      ]
    },
    {
      "id": "positionHistoryArea",
      "priority": "secondary",
      "purpose": "Show when the system closed the position automatically after a hire filled its headcount.",
      "organisms": [
        "positionClosureTimeline"
      ]
    }
  ],
  "organisms": {
    "positionList": {
      "kind": "list",
      "text": "Job positions searchable by title, department, hiring manager or status, each showing its remaining openings, so the recruiter can quickly find the open position a candidate is applying to.",
      "intents": []
    },
    "openPositionForm": {
      "kind": "form",
      "text": "Open a job position by entering title, department, description, headcount and the hiring manager who will decide offers and hires; the position starts open.",
      "intents": [
        {
          "id": "openPosition",
          "kind": "submit"
        }
      ]
    },
    "positionReview": {
      "kind": "detail",
      "text": "The selected position's opening date, headcount, hires so far, remaining openings and whether the headcount is filled, so the recruiter knows if it can still take candidates.",
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
        "role": "search positions by title or department",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filter by status",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "filter by hiring manager",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "positions with remaining openings",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      }
    ],
    "openPositionForm": [
      {
        "role": "title",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "department",
        "preferred": "groupentertext--ml-enter-text"
      },
      {
        "role": "description",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "headcount",
        "preferred": "groupenternumber--ml-number-stepper",
        "alternative": "groupenternumber--ml-number-input"
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
        "role": "headcount, hires so far and remaining openings",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "hires against headcount",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      },
      {
        "role": "position summary",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
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
