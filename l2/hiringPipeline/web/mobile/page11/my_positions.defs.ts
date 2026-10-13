/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/my_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "On a narrow screen (about 390px, still comfortable at 360px and 430px), let me scan my positions, open one to see remaining openings and its applications by stage, and check when it closed automatically.",
  "sections": [
    {
      "id": "positionsSection",
      "priority": "primary",
      "purpose": "A stacked, scrollable list of my positions showing title, status and remaining openings, with a search and a status switch.",
      "organisms": [
        "myPositionsList"
      ]
    },
    {
      "id": "positionPipelineSection",
      "priority": "main",
      "purpose": "For the chosen position, the headcount figures come first, then the applications by stage in a single fluid column.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    {
      "id": "positionClosureSection",
      "priority": "secondary",
      "purpose": "A short, vertical history of when the position was opened, filled and closed automatically.",
      "organisms": [
        "positionClosureTimeline"
      ]
    }
  ],
  "organisms": {
    "myPositionsList": {
      "kind": "list",
      "text": "The job positions I manage, each showing title, department, open or closed status and remaining openings, so I can tap the one I want to follow.",
      "intents": []
    },
    "positionPipelineDetail": {
      "kind": "detail",
      "text": "The chosen position's headcount, hires so far, remaining openings and whether the headcount is filled, along with its applications by stage, each showing candidate and days in stage. Tap an application to decide the hire on My applications.",
      "intents": [
        {
          "id": "openApplicationDecision",
          "kind": "navigate",
          "to": "my_applications"
        }
      ]
    },
    "positionClosureTimeline": {
      "kind": "timeline",
      "text": "When the position was opened, the hires recorded against it and the moment the system closed it automatically once hires reached the headcount.",
      "intents": []
    }
  },
  "molecules": {
    "myPositionsList": [
      {
        "role": "stacked positions list",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "search positions by title or department",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "filter by open or closed status",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select-dropdown"
      }
    ],
    "positionPipelineDetail": [
      {
        "role": "remaining openings headline",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "hires against headcount",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      },
      {
        "role": "applications by stage on narrow screens",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "positionClosureTimeline": [
      {
        "role": "position events in time order",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
