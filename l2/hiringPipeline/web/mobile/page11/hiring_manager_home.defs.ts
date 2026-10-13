/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/hiring_manager_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "On a narrow screen (about 390px, still usable at 360px and 430px), put the decisions waiting for the hiring manager first, then a short summary of her positions' pipeline.",
  "sections": [
    {
      "id": "decisions",
      "priority": "primary",
      "purpose": "Applications waiting for my decision, stacked one per item, so I can offer, hire or send back without leaving the page.",
      "organisms": [
        "decisionInbox"
      ]
    },
    {
      "id": "pipeline",
      "priority": "main",
      "purpose": "A short view of my pipeline: active applications by stage, days in stage and remaining openings for each position.",
      "organisms": [
        "pipelineSummary"
      ]
    }
  ],
  "organisms": {
    "pipelineSummary": {
      "kind": "summary",
      "text": "Active applications on my positions by stage and days in stage, and remaining openings for each position, as short readings that fit a narrow screen.",
      "intents": [
        {
          "id": "openMyPositions",
          "kind": "navigate",
          "to": "my_positions"
        }
      ]
    },
    "decisionInbox": {
      "kind": "inbox",
      "text": "Applications waiting for my decision, each showing the candidate, position, days waiting and remaining openings. Interviewed candidates can get an offer or be sent back; offers can end in a hire or be sent back.",
      "intents": [
        {
          "id": "extendOffer",
          "kind": "submit"
        },
        {
          "id": "hireCandidate",
          "kind": "submit"
        },
        {
          "id": "sendBack",
          "kind": "submit"
        },
        {
          "id": "openApplication",
          "kind": "navigate",
          "to": "my_applications"
        }
      ]
    }
  },
  "molecules": {
    "pipelineSummary": [
      {
        "role": "Headline counts such as active applications and days in stage",
        "preferred": "groupviewmetric--ml-compact-metric-sparkline",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Active applications by stage",
        "preferred": "groupviewchart--ml-bar-chart"
      },
      {
        "role": "Remaining openings for each position",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "decisionInbox": [
      {
        "role": "Queue of applications waiting for my decision",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Decision actions on an application",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "Confirmation after a decision",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
