/// <mls fileReference="_102047_/l2/hiringPipeline/web/mobile/page11/candidates.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "On a narrow screen (about 390px, still usable at 360px and 430px), let the recruiter quickly find a candidate, open their details and applications, and register a new candidate in one short flowing column.",
  "sections": [
    {
      "id": "findCandidates",
      "priority": "primary",
      "purpose": "Search candidates by name, e-mail or source in a compact list. Tapping a candidate opens their details.",
      "organisms": [
        "candidateSearch"
      ]
    },
    {
      "id": "candidateDetails",
      "priority": "main",
      "purpose": "Show the chosen candidate's contact data and applications as stacked items that are easy to read on a phone.",
      "organisms": [
        "candidateProfile"
      ]
    },
    {
      "id": "registerCandidate",
      "priority": "secondary",
      "purpose": "Register a new candidate with a short single-column form.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Candidate results",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Move between result pages",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "candidateRegistration": [
      {
        "role": "Candidate name",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
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
        "alternative": "groupselectone--ml-select-dropdown"
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
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Candidate's applications",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ]
  }
} as const;
