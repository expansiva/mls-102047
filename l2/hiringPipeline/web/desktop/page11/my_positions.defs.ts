/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/my_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "Lets Wagner, as the hiring manager, see every position he manages and how close each one is to being filled. He opens one position to see where its applications stand by stage and what has happened to it, including when it closed automatically because hires reached the headcount.",
  "sections": [
    {
      "id": "positionsOverview",
      "priority": "primary",
      "purpose": "Scan all my positions at once and compare headcount, hires so far, remaining openings and filled status to spot those that still need hires.",
      "organisms": [
        "myPositionsList"
      ]
    },
    {
      "id": "positionFocus",
      "priority": "main",
      "purpose": "For the selected position, show its numbers and how its applications are spread across screening, interview, offer, hired and rejected.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    {
      "id": "positionHistory",
      "priority": "secondary",
      "purpose": "Explain what happened to the selected position over time, so an automatic closure is understood rather than surprising.",
      "organisms": [
        "positionHistoryTimeline"
      ]
    }
  ],
  "organisms": {
    "myPositionsList": {
      "kind": "list",
      "text": "Positions I manage with department, opening date, headcount, hires so far, remaining openings and whether each is filled, so I see at a glance which ones still need hires.",
      "intents": []
    },
    "positionPipelineDetail": {
      "kind": "detail",
      "text": "The selected position's description, headcount, hires so far and remaining openings, with its applications grouped by stage and how long each has been in the pipeline. This tells me where each candidate stands.",
      "intents": [
        {
          "id": "openMyApplications",
          "kind": "navigate",
          "to": "my_applications"
        }
      ]
    },
    "positionHistoryTimeline": {
      "kind": "timeline",
      "text": "What happened to the position: when it was opened and, if it applies, when it was closed automatically because hires reached the headcount.",
      "intents": []
    }
  },
  "molecules": {
    "myPositionsList": [
      {
        "role": "Positions table with sortable headcount, hires so far and remaining openings",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "Find a position by title or department",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Switch between open, filled or all positions",
        "preferred": "groupselectone--ml-segmented-control"
      },
      {
        "role": "Hires against headcount for each position",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-segmented-progress"
      }
    ],
    "positionPipelineDetail": [
      {
        "role": "Headcount, hires so far and remaining openings indicators",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-gauge"
      },
      {
        "role": "Applications by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Applications of the position with stage and days in pipeline",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-grouping-table"
      }
    ],
    "positionHistoryTimeline": [
      {
        "role": "Chronological events of the position",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Note explaining the automatic closure when headcount was reached",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
