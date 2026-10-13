/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Help the recruiter find any application in the organization, see how long it has been in its current stage, and review it: candidate, position, stage history and hiring manager decisions. The recruiter can then move it to interview, hand it to the hiring manager, or reject it with a reason. New applications for open positions can be recorded on the same page.",
  "sections": [
    {
      "id": "findApplications",
      "priority": "primary",
      "purpose": "Find applications by number, candidate, position or stage, and spot stalled ones by their days in the current stage.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "reviewAndAct",
      "priority": "main",
      "purpose": "Review the selected application in full, act on it, and see how it moved through the pipeline.",
      "organisms": [
        "applicationDetail",
        "applicationActions",
        "stageHistory"
      ]
    },
    {
      "id": "recordApplication",
      "priority": "secondary",
      "purpose": "Record a new application from a candidate to an open position. It starts in screening.",
      "organisms": [
        "newApplicationForm"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "Applications with number, candidate, position, stage and days in the current stage. The recruiter can search and filter them to find the one to work on.",
      "intents": []
    },
    "newApplicationForm": {
      "kind": "form",
      "text": "Choose the candidate and an open position and add optional notes to record the application in screening. If the candidate is not registered yet, register them first on the Candidates page.",
      "intents": [
        {
          "id": "recordApplication",
          "kind": "submit"
        },
        {
          "id": "registerNewCandidate",
          "kind": "navigate",
          "to": "candidates"
        }
      ]
    },
    "applicationDetail": {
      "kind": "detail",
      "text": "The selected application: candidate with e-mail, resume link and source; position with its hiring manager and remaining openings; current stage and applied date. Also shows interview, offer, hire and rejection details when they exist.",
      "intents": []
    },
    "applicationActions": {
      "kind": "actions",
      "text": "Move a screened application to interview so it goes to the position's hiring manager for the offer decision, or reject an active application. A reason is required to reject.",
      "intents": [
        {
          "id": "moveToInterview",
          "kind": "submit"
        },
        {
          "id": "rejectApplication",
          "kind": "submit"
        }
      ]
    },
    "stageHistory": {
      "kind": "timeline",
      "text": "Each stage the application passed through, with when it happened and who decided: the move to interview, the hiring manager's offer and hire, or the rejection with the stage it was in.",
      "intents": []
    }
  },
  "molecules": {
    "applicationList": [
      {
        "role": "application table",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-advanced-data-table"
      },
      {
        "role": "search by number, candidate or position",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "stage filter",
        "preferred": "groupselectone--ml-segmented-control",
        "alternative": "groupselectone--ml-select"
      }
    ],
    "newApplicationForm": [
      {
        "role": "candidate choice",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "open position choice",
        "preferred": "groupselectone--ml-combobox",
        "alternative": "groupselectone--ml-select-one-autocomplete"
      },
      {
        "role": "application notes",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "record application",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "recorded confirmation",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "applicationDetail": [
      {
        "role": "candidate summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "interview, offer, hire and rejection details",
        "preferred": "groupexpandcontent--ml-collapsible-panel",
        "alternative": "groupexpandcontent--ml-accordion"
      }
    ],
    "applicationActions": [
      {
        "role": "stage actions",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "rejection reason",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "confirm rejection",
        "preferred": "groupnotifyuser--ml-alert-modal",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "stageHistory": [
      {
        "role": "stage history",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
