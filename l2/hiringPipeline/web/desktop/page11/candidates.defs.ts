/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/candidates.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "Let the recruiter search existing candidates by name or email before registering anyone, register new candidates with name, email and source, and review a candidate's emails and applications so an application can be recorded for them.",
  "sections": [
    {
      "id": "findCandidates",
      "priority": "primary",
      "purpose": "Search candidates by name or email first, so the recruiter registers nobody twice and can pick the right person to apply to a position.",
      "organisms": [
        "candidateSearchList"
      ]
    },
    {
      "id": "candidateProfile",
      "priority": "main",
      "purpose": "Show the selected candidate with their emails, source and current applications, with a path to record a new application.",
      "organisms": [
        "candidateDetail"
      ]
    },
    {
      "id": "registerCandidate",
      "priority": "secondary",
      "purpose": "Register a candidate the search did not find, with name, email and source.",
      "organisms": [
        "candidateRegistrationForm"
      ]
    }
  ],
  "organisms": {
    "candidateSearchList": {
      "kind": "list",
      "text": "Candidates matching the typed name or email, with their email, source and status, so the recruiter can confirm whether the person is already registered and pick them to record an application.",
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
      "text": "Register a new candidate with full name, email address and the source they came from, after checking they are not already in the list.",
      "intents": [
        {
          "id": "registerCandidate",
          "kind": "submit"
        }
      ]
    },
    "candidateDetail": {
      "kind": "detail",
      "text": "The chosen candidate's name, source and status, their email addresses and the applications they already have, with stage, position and days in the pipeline.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "matching candidates",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "record an application for the picked candidate",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "candidateRegistrationForm": [
      {
        "role": "candidate name and email",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "candidate source",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "register candidate",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "registration result",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "candidateDetail": [
      {
        "role": "candidate summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "switch between emails and applications",
        "preferred": "groupnavigatesection--ml-tabs",
        "alternative": "groupnavigatesection--ml-navigate-pills"
      },
      {
        "role": "candidate applications",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "go record an application",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ]
  }
} as const;
