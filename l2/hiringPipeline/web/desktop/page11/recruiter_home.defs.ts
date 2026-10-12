/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/recruiter_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/dashboardCommandCenter/page21.md",
    "experience": "exceptionTriage"
  },
  "intent": "Give the recruiter one place to see how hiring is going across every position and to deal with the applications waiting for them: record new applications, move screened ones to interview, and reject with a reason the ones that won't go forward.",
  "sections": [
    {
      "id": "workInbox",
      "priority": "primary",
      "purpose": "Applications that need the recruiter now, grouped by what to do next: record, move to interview, or reject with a reason, including those returned by the hiring manager.",
      "organisms": [
        "applicationsInbox"
      ]
    },
    {
      "id": "pipelineOverview",
      "priority": "main",
      "purpose": "How each position is doing: hires so far against remaining openings, applications by stage, which positions are filled, and how long active applications have been in the pipeline.",
      "organisms": [
        "pipelineHighlights"
      ]
    }
  ],
  "organisms": {
    "pipelineHighlights": {
      "kind": "highlights",
      "text": "Positions with hires so far, remaining openings, applications by stage and which are filled; active applications and their days in the pipeline, so the recruiter spots positions close to filling and applications that have been waiting too long.",
      "intents": [
        {
          "id": "openJobPositions",
          "kind": "navigate",
          "to": "job_positions"
        },
        {
          "id": "openApplications",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    },
    "applicationsInbox": {
      "kind": "inbox",
      "text": "Applications waiting for me: new applications to record by choosing the candidate and an open position, applications in screening to move to interview or reject, and applications returned by the hiring manager to reject with a reason.",
      "intents": [
        {
          "id": "recordApplication",
          "kind": "submit"
        },
        {
          "id": "advanceToInterview",
          "kind": "submit"
        },
        {
          "id": "rejectApplication",
          "kind": "submit"
        },
        {
          "id": "openApplicationsPage",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    }
  },
  "molecules": {
    "pipelineHighlights": [
      {
        "role": "Headline counts: hires so far, remaining openings, filled positions, active applications",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Applications by stage across positions",
        "preferred": "groupviewchart--ml-bar-chart",
        "alternative": "groupviewchart--ml-pie-chart"
      },
      {
        "role": "Positions with headcount progress and filled status",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      },
      {
        "role": "Hires against headcount for a position",
        "preferred": "groupshowprogress--ml-linear-progress",
        "alternative": "groupshowprogress--ml-circular-progress"
      }
    ],
    "applicationsInbox": [
      {
        "role": "List of applications waiting for an action",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Switch between to record, in screening and returned for rejection",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Pick the candidate and the open position for a new application",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Rejection reason",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Record, move to interview and reject actions",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "Confirmation after an action",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
