/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/my_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "Help me follow every job position I manage: which are still open, how many openings remain, where their applications stand by stage, and when a position closed on its own because its headcount was filled.",
  "sections": [
    {
      "id": "positionsSection",
      "priority": "primary",
      "purpose": "Find and choose one of my positions by title, department or status, with the remaining openings visible at a glance.",
      "organisms": [
        "myPositionsList"
      ]
    },
    {
      "id": "positionPipelineSection",
      "priority": "main",
      "purpose": "For the chosen position, compare headcount with hires so far and remaining openings, and see its applications grouped by stage so I know which ones need my decision.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    {
      "id": "positionClosureSection",
      "priority": "secondary",
      "purpose": "Show the hire that filled the headcount and when the system closed the position automatically.",
      "organisms": [
        "positionClosureTimeline"
      ]
    }
  ],
  "organisms": {
    "myPositionsList": {
      "kind": "list",
      "text": "The job positions I manage, with title, department, open or closed status, opened at, headcount and remaining openings, so I can see which ones still need hires.",
      "intents": []
    },
    "positionPipelineDetail": {
      "kind": "detail",
      "text": "The chosen position's headcount, hires so far, remaining openings and whether the headcount is filled, along with its applications grouped by stage, each showing candidate and days in stage. From here I can open an application to hire the candidate or send it back to the recruiter.",
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
        "role": "positions table with sortable remaining openings",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "search positions by title or department",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "filter by open or closed status",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "positionPipelineDetail": [
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
        "role": "applications count by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "applications grouped by stage",
        "preferred": "groupviewtable--ml-grouping-table",
        "alternative": "groupviewtable--ml-data-table"
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
