/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Give the recruiter one place to track every application by stage, record new applications, and review and move each one: advance a screened application to interview and hand it to the position's hiring manager, or reject it with a reason.",
  "sections": [
    {
      "id": "pipelineQueue",
      "priority": "primary",
      "purpose": "See all applications by stage, with candidate, position, active flag and days in the pipeline. Narrow the list to screening to find what needs a decision.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "applicationWork",
      "priority": "main",
      "purpose": "Review the selected application, then move it to interview or reject it with a reason.",
      "organisms": [
        "applicationDetail",
        "applicationActions"
      ]
    },
    {
      "id": "applicationHistory",
      "priority": "secondary",
      "purpose": "Check how the selected application moved through the stages, including handoffs to and returns from the hiring manager.",
      "organisms": [
        "stageTimeline"
      ]
    },
    {
      "id": "recordApplication",
      "priority": "secondary",
      "purpose": "Record a new application for a candidate to an open position. It starts in screening.",
      "organisms": [
        "newApplicationForm"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "All applications by stage, with candidate, position, active flag and days in pipeline. The recruiter can filter to screening and pick one to review.",
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
      "text": "Details of the selected application: candidate, position and current stage. The recruiter uses them to decide what happens next.",
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
        "preferred": "groupviewtable--ml-advanced-data-table",
        "alternative": "groupviewdata--ml-kanban-board"
      },
      {
        "role": "stage filter",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "newApplicationForm": [
      {
        "role": "candidate picker",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "open position picker",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "record application",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "creation feedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "applicationDetail": [
      {
        "role": "application summary",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-vertical-card"
      }
    ],
    "applicationActions": [
      {
        "role": "stage decisions",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "rejection reason",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "decision feedback",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
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
