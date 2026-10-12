/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/candidates.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "On a narrow screen (about 390px, still usable from 360px to 430px), let the recruiter search candidates by name or email first, open one to see their emails and applications, or register a new candidate with name, email and source.",
  "sections": [
    {
      "id": "findCandidates",
      "priority": "primary",
      "purpose": "A full-width search with a stacked list of matching candidates, so nobody is registered twice and the right person can be picked.",
      "organisms": [
        "candidateSearchList"
      ]
    },
    {
      "id": "candidateProfile",
      "priority": "main",
      "purpose": "The selected candidate shown as a stacked profile with emails and applications, plus a path to record an application.",
      "organisms": [
        "candidateDetail"
      ]
    },
    {
      "id": "registerCandidate",
      "priority": "secondary",
      "purpose": "A short single-column form to register a candidate the search did not find.",
      "organisms": [
        "candidateRegistrationForm"
      ]
    }
  ],
  "organisms": {
    "candidateSearchList": {
      "kind": "list",
      "text": "Candidates matching the typed name or email, each showing their email and source, so the recruiter confirms whether the person already exists and picks them to record an application.",
      "intents": [
        {
          "id": "recordApplicationForCandidate",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    },
    "candidateRegistrationForm": {
      "kind": "form",
      "text": "Register a new candidate with full name, email address and source, one field per line.",
      "intents": [
        {
          "id": "registerCandidate",
          "kind": "submit"
        }
      ]
    },
    "candidateDetail": {
      "kind": "detail",
      "text": "The chosen candidate's name, source and status, their email addresses and their applications with stage, position and days in the pipeline.",
      "intents": [
        {
          "id": "openApplicationsForCandidate",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    }
  },
  "molecules": {
    "candidateSearchList": [
      {
        "role": "search candidates by name or email",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "matching candidates",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "record an application for the picked candidate",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "candidateRegistrationForm": [
      {
        "role": "candidate name and email",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "candidate source",
        "preferred": "groupselectone--ml-select-dropdown",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "register candidate",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "registration result",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "candidateDetail": [
      {
        "role": "candidate summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "switch between emails and applications",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "candidate applications",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "go record an application",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
