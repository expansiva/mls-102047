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
        "effect": "filter:candidateSearchList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:candidateSearchList",
        "persist": true
      },
      "candidateId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:candidateDetail",
        "persist": true
      }
    }
  },
  "forms": {
    "registerCandidate": {
      "organism": "candidateRegistrationForm",
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
        "candidate"
      ]
    },
    "registerCandidate": {
      "kind": "cmd",
      "trigger": "registerCandidate",
      "returns": [
        "candidate",
        "profile"
      ],
      "writes": "Candidate.create"
    }
  },
  "states": {
    "candidates": {
      "source": "searchCandidates.candidates",
      "description": "A candidate row of the search list, with the primary e-mail.",
      "organisms": [
        "candidateSearchList"
      ]
    },
    "candidate": {
      "source": "getCandidateProfile.candidate",
      "description": "The selected candidate with all e-mails and applications.",
      "organisms": [
        "candidateDetail"
      ]
    },
    "selectedCandidate": {
      "source": "entry.params.candidateId",
      "description": "The selected candidate with all e-mails and applications.",
      "organisms": [
        "candidateDetail",
        "candidateSearchList"
      ]
    }
  },
  "functions": {
    "searchCandidates": {
      "description": "Find existing candidates by name or e-mail so the recruiter avoids duplicates and picks a candidate.",
      "calls": "searchCandidates",
      "sets": "candidates"
    },
    "getCandidateProfile": {
      "description": "Load the selected candidate with their e-mails and applications in one call.",
      "calls": "getCandidateProfile",
      "sets": "candidate"
    },
    "registerCandidate": {
      "description": "Register a new candidate with name, e-mail and source. (candidates.items: upsert)",
      "calls": "registerCandidate",
      "sets": "candidate",
      "updates": [
        "candidates"
      ]
    },
    "recordApplicationForCandidate": {
      "description": "Candidates matching the typed name or email, with their email, source and status, so the recruiter can confirm whether the person is already registered and pick them to record an application.",
      "navigate": "applications",
      "carries": {
        "candidateId": "selectedCandidate.id"
      }
    },
    "openApplicationsForCandidate": {
      "description": "The chosen candidate's name, source and status, their email addresses and the applications they already have, with stage, position and days in the pipeline.",
      "navigate": "applications",
      "carries": {
        "candidateId": "selectedCandidate.id"
      }
    }
  },
  "journeys": [
    {
      "step": "registerCandidate/searchCandidate",
      "organisms": [
        "candidateSearchList"
      ],
      "functions": [
        "searchCandidates"
      ]
    },
    {
      "step": "registerCandidate/createCandidate",
      "organisms": [
        "candidateRegistrationForm"
      ],
      "functions": [
        "registerCandidate"
      ]
    },
    {
      "step": "recordApplication/findCandidate",
      "organisms": [
        "candidateSearchList",
        "candidateDetail"
      ],
      "functions": [
        "searchCandidates",
        "getCandidateProfile"
      ]
    },
    {
      "step": "recordApplication/findPosition",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    },
    {
      "step": "recordApplication/createApplication",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    }
  ],
  "rules": {
    "searchCandidates": [],
    "getCandidateProfile": [
      "daysInPipelineCalculated",
      "applicationActiveWhileInPipeline"
    ],
    "registerCandidate": [
      "candidateRequiresEmail",
      "candidateSourceRequired"
    ]
  },
  "access": {
    "actors": [
      "recruiter"
    ],
    "grants": [
      "recruiterPipeline",
      "recruiterCandidates"
    ]
  },
  "fields": {
    "Application.applicationNumber": [
      "candidateDetail"
    ],
    "Application.appliedAt": [
      "candidateDetail"
    ],
    "Application.details.daysInPipeline": [
      "candidateDetail"
    ],
    "Application.details.isActive": [
      "candidateDetail"
    ],
    "Application.status": [
      "candidateDetail"
    ],
    "Candidate.details.base.contacts": [
      "candidateSearchList"
    ],
    "Candidate.details.hiringPipeline.source": [
      "candidateDetail",
      "candidateRegistrationForm",
      "candidateSearchList"
    ],
    "Candidate.details.identification.createdAt": [
      "candidateDetail"
    ],
    "Candidate.details.identification.name": [
      "candidateDetail",
      "candidateRegistrationForm",
      "candidateSearchList"
    ],
    "Candidate.details.identification.status": [
      "candidateDetail",
      "candidateSearchList"
    ],
    "Candidate.id": [
      "candidateDetail",
      "candidateSearchList"
    ],
    "CandidateEmail.details.contactChannel.isVerified": [
      "candidateDetail"
    ],
    "CandidateEmail.details.contactChannel.value": [
      "candidateDetail",
      "candidateRegistrationForm",
      "candidateSearchList"
    ],
    "JobPosition.title": [
      "candidateDetail"
    ]
  }
} as const;
