/// <mls fileReference="_102047_/l2/hiringPipeline/web/desktop/page11/candidates.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "Help the recruiter find any candidate in the organization, register a new candidate without creating a duplicate, and review a candidate's details and applications before recording a new application.",
  "sections": [
    {
      "id": "findCandidates",
      "priority": "primary",
      "purpose": "Search candidates by name, e-mail or source and choose one to review.",
      "organisms": [
        "candidateSearch"
      ]
    },
    {
      "id": "candidateDetails",
      "priority": "main",
      "purpose": "Show the chosen candidate's details and every application they have made, with stage and days in stage, so the recruiter knows where the candidate stands.",
      "organisms": [
        "candidateProfile"
      ]
    },
    {
      "id": "registerCandidate",
      "priority": "secondary",
      "purpose": "Register a new candidate with name, e-mail, resume link and source. An existing person is reused, not duplicated.",
      "organisms": [
        "candidateRegistration"
      ]
    }
  ],
  "organisms": {
    "candidateSearch": {
      "kind": "list",
      "text": "Find a candidate by name, e-mail or source and see each candidate's status at a glance",
      "intents": []
    },
    "candidateRegistration": {
      "kind": "form",
      "text": "Register a candidate with name, e-mail, resume link and source",
      "intents": [
        {
          "id": "registerCandidate",
          "kind": "submit"
        }
      ]
    },
    "candidateProfile": {
      "kind": "detail",
      "text": "See the candidate's name, e-mail, resume link and source, plus their applications with position, stage, applied date and days in the current stage",
      "intents": [
        {
          "id": "recordApplication",
          "kind": "navigate",
          "to": "applications"
        }
      ]
    }
  },
  "molecules": {
    "candidateSearch": [
      {
        "role": "Search by name, e-mail or source",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Candidate results",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Move between result pages",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "candidateRegistration": [
      {
        "role": "Candidate name",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "E-mail address",
        "preferred": "groupentertext--ml-enter-text"
      },
      {
        "role": "Resume link",
        "preferred": "groupentertext--ml-enter-text"
      },
      {
        "role": "Candidate source",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "Register action",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Registration result",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "candidateProfile": [
      {
        "role": "Candidate summary",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Candidate's applications",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;
