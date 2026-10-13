/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/hiring_manager_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Give the hiring manager one place to see where the applications on her positions stand and to act on the ones waiting for her decision: interviewed candidates to offer or send back, and offers to hire or send back.",
  "sections": [
    {
      "id": "decisions",
      "priority": "primary",
      "purpose": "Applications waiting for my decision, with what I need to choose: the candidate, the position, how long the application has waited and how many openings are left.",
      "organisms": [
        "decisionInbox"
      ]
    },
    {
      "id": "pipeline",
      "priority": "main",
      "purpose": "How my positions' pipeline is going: active applications by stage, how long they have stayed there, and how many openings each position still has.",
      "organisms": [
        "pipelineSummary"
      ]
    }
  ],
  "organisms": {
    "pipelineSummary": {
      "kind": "summary",
      "text": "Active applications on my positions by stage and days in stage, and remaining openings for each position, so I can see where candidates are stuck and how close each position is to being filled.",
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
      "text": "Applications waiting for my decision. For interviewed candidates I can extend an offer or send them back to the recruiter. For offers I can hire the candidate or send the application back. Each one shows the candidate, resume link, source, position, days waiting and remaining openings.",
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
        "role": "Active applications by stage",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Headline counts such as active applications and days in stage",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Remaining openings for each position",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "decisionInbox": [
      {
        "role": "Queue of applications waiting for my decision",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Decision actions on an application",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Confirmation after a decision",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
