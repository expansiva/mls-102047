/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "On a narrow screen (about 390px wide, still usable from 360px to 430px), let the recruiter scan applications by stage, open one to review it, and advance it to interview or reject it with a reason. Recording a new application stays one step away.",
  "sections": [
    {
      "id": "pipelineQueue",
      "priority": "primary",
      "purpose": "A stacked list of applications showing candidate, position, stage and days in the pipeline. A compact stage filter puts screening first.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "applicationWork",
      "priority": "main",
      "purpose": "The selected application's summary, followed by full-width actions to move it to interview or reject it with a reason.",
      "organisms": [
        "applicationDetail",
        "applicationActions"
      ]
    },
    {
      "id": "applicationHistory",
      "priority": "secondary",
      "purpose": "A vertical history of the application's stage changes and handoffs with the hiring manager.",
      "organisms": [
        "stageTimeline"
      ]
    },
    {
      "id": "recordApplication",
      "priority": "secondary",
      "purpose": "A short form to record a new application by picking a candidate and an open position.",
      "organisms": [
        "newApplicationForm"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "All applications by stage, with candidate, position, active flag and days in pipeline. The recruiter can filter to screening and tap one to review.",
      "intents": []
    },
    "newApplicationForm": {
      "kind": "form",
      "text": "Record a new application: pick the candidate and an open position. The application starts in screening.",
      "intents": [
        {
          "id": "createApplication",
          "kind": "submit"
        }
      ]
    },
    "applicationDetail": {
      "kind": "detail",
      "text": "Details of the selected application: candidate, position and current stage.",
      "intents": []
    },
    "applicationActions": {
      "kind": "actions",
      "text": "Move the application to interview and hand it to the position's hiring manager, or reject it with a reason.",
      "intents": [
        {
          "id": "advanceToInterview",
          "kind": "submit"
        },
        {
          "id": "rejectApplication",
          "kind": "submit"
        }
      ]
    },
    "stageTimeline": {
      "kind": "timeline",
      "text": "Stage changes of the application, including handoffs to and returns from the hiring manager.",
      "intents": []
    }
  },
  "molecules": {
    "applicationList": [
      {
        "role": "application queue",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "stage filter",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
      }
    ],
    "newApplicationForm": [
      {
        "role": "candidate picker",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "open position picker",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "record application",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "creation feedback",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "applicationDetail": [
      {
        "role": "application summary",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "applicationActions": [
      {
        "role": "stage decisions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "rejection reason",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "decision feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "stageTimeline": [
      {
        "role": "stage history",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
