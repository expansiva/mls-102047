/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/candidates.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:candidateSearch",
        "persist": true
      },
      "source": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:candidateSearch",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:candidateSearch",
        "persist": true
      },
      "candidateId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:candidateProfile",
        "persist": true
      },
      "jobPositionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:JobPosition",
        "persist": true
      },
      "applicationId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Application",
        "persist": true
      }
    }
  },
  "forms": {
    "registerCandidate": {
      "organism": "candidateRegistration",
      "submit": "registerCandidate"
    }
  },
  "requests": {
    "searchCandidates": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "candidates"
      ]
    },
    "getCandidateProfile": {
      "kind": "qry",
      "trigger": "getCandidateProfile",
      "returns": [
        "profile"
      ]
    },
    "registerCandidate": {
      "kind": "cmd",
      "trigger": "registerCandidate",
      "returns": [
        "profile",
        "candidate",
        "reused"
      ],
      "writes": "Candidate.create"
    }
  },
  "states": {
    "candidates": {
      "source": "searchCandidates.candidates",
      "description": "One row of the candidate search list: the candidate with status, source and e-mail.",
      "organisms": [
        "candidateSearch"
      ]
    },
    "profile": {
      "source": "getCandidateProfile.profile",
      "description": "The candidate's details with e-mail and every application made, ready for the detail panel.",
      "organisms": [
        "candidateProfile"
      ]
    },
    "selectedCandidate": {
      "source": "entry.params.candidateId",
      "description": "The candidate's details with e-mail and every application made, ready for the detail panel.",
      "organisms": [
        "candidateProfile",
        "candidateSearch"
      ]
    }
  },
  "functions": {
    "searchCandidates": {
      "description": "Lists the organization's candidates for the search list, opening with the first page and re-running when the recruiter types a search or picks a source.",
      "calls": "searchCandidates",
      "sets": "candidates"
    },
    "getCandidateProfile": {
      "description": "Loads the chosen candidate with e-mail and all applications so the recruiter sees where the candidate stands before recording a new application.",
      "calls": "getCandidateProfile",
      "sets": "profile"
    },
    "registerCandidate": {
      "description": "Registers a candidate from the registration form, reusing an existing person instead of creating a duplicate. (candidates.items: upsert)",
      "calls": "registerCandidate",
      "sets": "profile",
      "updates": [
        "candidates"
      ]
    },
    "recordApplication": {
      "description": "See the candidate's name, e-mail, resume link and source, plus their applications with position, stage, applied date and days in the current stage",
      "navigate": "applications",
      "carries": {
        "candidateId": "selectedCandidate.id"
      }
    }
  },
  "journeys": [
    {
      "step": "registerCandidateApplication/registerCandidate",
      "organisms": [
        "candidateRegistration"
      ],
      "functions": [
        "registerCandidate"
      ]
    },
    {
      "step": "registerCandidateApplication/findPosition",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    },
    {
      "step": "registerCandidateApplication/createApplication",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    }
  ],
  "rules": {
    "searchCandidates": [],
    "getCandidateProfile": [
      "daysInStageCalculation",
      "applicationActiveCalculation"
    ],
    "registerCandidate": [
      "candidateEmailRequired",
      "candidateReusedNotDuplicated"
    ]
  },
  "access": {
    "actors": [
      "recruiter"
    ],
    "grants": [
      "recruiterPositionsAndApplications",
      "recruiterCandidates"
    ]
  },
  "fields": {
    "Application.appliedAt": [
      "candidateProfile"
    ],
    "Application.code": [
      "candidateProfile"
    ],
    "Application.details.daysInStage": [
      "candidateProfile"
    ],
    "Application.details.isActive": [
      "candidateProfile"
    ],
    "Application.stageChangedAt": [
      "candidateProfile"
    ],
    "Application.status": [
      "candidateProfile"
    ],
    "Candidate.details.hiringPipeline.resumeLink": [
      "candidateProfile",
      "candidateRegistration"
    ],
    "Candidate.details.hiringPipeline.source": [
      "candidateProfile",
      "candidateRegistration",
      "candidateSearch"
    ],
    "Candidate.details.identification.createdAt": [
      "candidateProfile"
    ],
    "Candidate.details.identification.name": [
      "candidateProfile",
      "candidateRegistration",
      "candidateSearch"
    ],
    "Candidate.details.identification.status": [
      "candidateProfile",
      "candidateSearch"
    ],
    "CandidateEmail.details.contactChannel.value": [
      "candidateProfile",
      "candidateRegistration",
      "candidateSearch"
    ],
    "JobPosition.status": [
      "candidateProfile"
    ],
    "JobPosition.title": [
      "candidateProfile"
    ]
  }
} as const;
