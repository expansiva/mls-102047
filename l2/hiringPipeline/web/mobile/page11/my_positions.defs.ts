/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/my_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/analyticalList/page21.md",
    "experience": "kpiFilterTable"
  },
  "intent": "On a narrow phone screen (around 390px, still usable from 360px to 430px), Wagner scrolls one column of his positions and sees how many hires each still needs. He taps one to see its applications by stage and its history, including an automatic closure when hires reached the headcount.",
  "sections": [
    {
      "id": "positionsOverview",
      "priority": "primary",
      "purpose": "A compact stacked list of my positions, each showing hires so far against headcount, remaining openings and filled status.",
      "organisms": [
        "myPositionsList"
      ]
    },
    {
      "id": "positionFocus",
      "priority": "main",
      "purpose": "The tapped position's key numbers first, then its applications by stage, readable in one narrow column.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    {
      "id": "positionHistory",
      "priority": "secondary",
      "purpose": "Below the detail, the position's events, explaining when and why it closed.",
      "organisms": [
        "positionHistoryTimeline"
      ]
    }
  ],
  "organisms": {
    "myPositionsList": {
      "kind": "list",
      "text": "Positions I manage, each as a short entry with title, hires so far against headcount, remaining openings and filled status, so I can tell which still need hires.",
      "intents": []
    },
    "positionPipelineDetail": {
      "kind": "detail",
      "text": "The selected position's headcount, hires so far and remaining openings, then its applications grouped by stage with days in the pipeline. This tells me where each candidate stands.",
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
        "role": "Stacked list of positions for narrow screens",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "Switch between open, filled or all positions",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "Hires against headcount for each position",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "positionPipelineDetail": [
      {
        "role": "Remaining openings as the headline number",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Switch between summary and applications",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Applications by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Applications with stage and days in pipeline",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "positionHistoryTimeline": [
      {
        "role": "Chronological events of the position",
        "preferred": "groupviewdata--ml-timeline-view"
      },
      {
        "role": "Note explaining the automatic closure",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
