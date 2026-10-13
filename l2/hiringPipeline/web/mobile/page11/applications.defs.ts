/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "On a narrow screen (about 390px, also usable at 360px and 430px), the recruiter finds an application and then opens it to review the candidate, position and stage. From there they move it to interview or reject it with a reason, and can check its stage history. Recording a new application is a short form that follows.",
  "sections": [
    {
      "id": "findApplications",
      "priority": "primary",
      "purpose": "A compact, searchable list of applications showing stage and days in the current stage.",
      "organisms": [
        "applicationList"
      ]
    },
    {
      "id": "reviewAndAct",
      "priority": "main",
      "purpose": "The selected application's essentials first, then the actions, then its stage history, stacked in one fluid column.",
      "organisms": [
        "applicationDetail",
        "applicationActions",
        "stageHistory"
      ]
    },
    {
      "id": "recordApplication",
      "priority": "secondary",
      "purpose": "Record a candidate's application to an open position. It starts in screening.",
      "organisms": [
        "newApplicationForm"
      ]
    }
  ],
  "organisms": {
    "applicationList": {
      "kind": "list",
      "text": "Stacked application rows showing number, candidate, position, stage and days in stage. The recruiter searches or filters by stage, then taps a row to open it.",
      "intents": []
    },
    "newApplicationForm": {
      "kind": "form",
      "text": "Pick the candidate and an open position and add optional notes to record the application in screening. Go to Candidates first if the person is not registered.",
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
      "text": "Candidate, position, hiring manager, stage and applied date at the top. Interview, offer, hire and rejection details are in sections that expand on demand.",
      "intents": []
    },
    "applicationActions": {
      "kind": "actions",
      "text": "Full-width actions to move a screened application to interview, which hands it to the hiring manager, or to reject it. A reason is required to reject.",
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
      "text": "A vertical history of the application's stages, showing when each change happened and who decided it, including the hiring manager's offer and hire.",
      "intents": []
    }
  },
  "molecules": {
    "applicationList": [
      {
        "role": "application list",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "search",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "stage filter",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-segmented-control"
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
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "applicationDetail": [
      {
        "role": "candidate summary",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewcard--ml-profile-card"
      },
      {
        "role": "stage details",
        "preferred": "groupexpandcontent--ml-accordion",
        "alternative": "groupexpandcontent--ml-collapsible-panel"
      }
    ],
    "applicationActions": [
      {
        "role": "stage actions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "rejection reason",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "confirm rejection",
        "preferred": "groupnotifyuser--ml-alert-modal"
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
