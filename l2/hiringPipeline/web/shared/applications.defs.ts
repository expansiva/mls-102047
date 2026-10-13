/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationList",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationList",
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
      "candidateId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Candidate",
        "persist": true
      },
      "activeOnly": {
        "type": "boolean",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationList",
        "persist": true
      },
      "sortBy": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationList",
        "persist": true
      },
      "applicationId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:applicationDetail",
        "persist": true
      }
    }
  },
  "forms": {
    "recordApplication": {
      "organism": "newApplicationForm",
      "submit": "recordApplication"
    },
    "rejectApplication": {
      "organism": "applicationActions",
      "submit": "rejectApplication"
    }
  },
  "requests": {
    "listApplications": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "applications"
      ]
    },
    "getApplication": {
      "kind": "qry",
      "trigger": "getApplication",
      "returns": [
        "application",
        "history"
      ]
    },
    "searchCandidates": {
      "kind": "qry",
      "trigger": "searchCandidates",
      "returns": [
        "candidates"
      ]
    },
    "searchOpenPositions": {
      "kind": "qry",
      "trigger": "searchOpenPositions",
      "returns": [
        "positions"
      ]
    },
    "recordApplication": {
      "kind": "cmd",
      "trigger": "recordApplication",
      "returns": [
        "application"
      ],
      "writes": "Application.create"
    },
    "moveToInterview": {
      "kind": "cmd",
      "trigger": "moveToInterview",
      "returns": [
        "application",
        "history",
        "row"
      ],
      "writes": "Application.advanceToInterview"
    },
    "rejectApplication": {
      "kind": "cmd",
      "trigger": "rejectApplication",
      "returns": [
        "application",
        "history",
        "row"
      ],
      "writes": "Application.reject"
    }
  },
  "states": {
    "applications": {
      "source": "listApplications.applications",
      "description": "One row of the recruiter's application list, with candidate and position names already resolved and the days in the current stage computed.",
      "organisms": [
        "applicationList"
      ]
    },
    "candidates": {
      "source": "searchCandidates.candidates",
      "description": "A registered candidate the recruiter can pick in the new application form.",
      "organisms": [
        "newApplicationForm"
      ]
    },
    "positions": {
      "source": "searchOpenPositions.positions",
      "description": "An open job position with remaining openings, offered in the new application form.",
      "organisms": [
        "newApplicationForm"
      ]
    },
    "application": {
      "source": "getApplication.application",
      "description": "The selected application in full: stage, dates, notes, stage details, candidate with e-mail, resume link and source, position with status and hiring manager.",
      "organisms": [
        "applicationActions",
        "applicationDetail"
      ]
    },
    "history": {
      "source": "getApplication.history",
      "description": "One step of the application's pipeline: the stage entered, when, and who decided it.",
      "organisms": [
        "stageHistory"
      ]
    },
    "selectedApplication": {
      "source": "entry.params.applicationId",
      "description": "The selected application in full: stage, dates, notes, stage details, candidate with e-mail, resume link and source, position with status and hiring manager.",
      "organisms": [
        "applicationDetail",
        "applicationList"
      ]
    }
  },
  "functions": {
    "listApplications": {
      "description": "Loads the recruiter's work queue of applications across the organization, one page at a time, so she can find the one to work on and spot stalled ones. (applications.items: append)",
      "calls": "listApplications",
      "sets": "applications"
    },
    "getApplication": {
      "description": "Opens the application the recruiter selected in the list, with everything needed to review it and act on it, and its stage history.",
      "calls": "getApplication",
      "sets": "application",
      "updates": [
        "history"
      ]
    },
    "searchCandidates": {
      "description": "Finds registered candidates as the recruiter types, to choose who is applying.",
      "calls": "searchCandidates",
      "sets": "candidates"
    },
    "searchOpenPositions": {
      "description": "Finds the open positions a candidate can apply to.",
      "calls": "searchOpenPositions",
      "sets": "positions"
    },
    "recordApplication": {
      "description": "Records a candidate's application to an open position. (applications.items: upsert)",
      "calls": "recordApplication",
      "updates": [
        "applications"
      ]
    },
    "moveToInterview": {
      "description": "Moves a screened application to interview, handing it to the position's hiring manager for the offer decision. (applications.items: upsert)",
      "calls": "moveToInterview",
      "sets": "application",
      "updates": [
        "history",
        "applications"
      ]
    },
    "rejectApplication": {
      "description": "Rejects an active application with a reason, taking it out of the active pipeline. (applications.items: upsert)",
      "calls": "rejectApplication",
      "sets": "application",
      "updates": [
        "history",
        "applications"
      ]
    },
    "registerNewCandidate": {
      "description": "Choose the candidate and an open position and add optional notes to record the application in screening. If the candidate is not registered yet, register them first on the Candidates page.",
      "navigate": "candidates"
    }
  },
  "journeys": [
    {
      "step": "advanceToInterview/findApplication",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listApplications"
      ]
    },
    {
      "step": "advanceToInterview/reviewApplication",
      "organisms": [
        "applicationDetail",
        "stageHistory"
      ],
      "functions": [
        "getApplication"
      ]
    },
    {
      "step": "advanceToInterview/moveToInterview",
      "organisms": [
        "applicationActions"
      ],
      "functions": [
        "moveToInterview"
      ]
    },
    {
      "step": "registerCandidateApplication/registerCandidate",
      "organisms": [],
      "functions": [],
      "continuesIn": "candidates"
    },
    {
      "step": "registerCandidateApplication/findPosition",
      "organisms": [
        "newApplicationForm"
      ],
      "functions": [
        "searchOpenPositions"
      ]
    },
    {
      "step": "registerCandidateApplication/createApplication",
      "organisms": [
        "newApplicationForm"
      ],
      "functions": [
        "searchCandidates",
        "recordApplication"
      ]
    },
    {
      "step": "rejectApplication/findApplication",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listApplications"
      ]
    },
    {
      "step": "rejectApplication/reviewApplication",
      "organisms": [
        "applicationDetail",
        "stageHistory"
      ],
      "functions": [
        "getApplication"
      ]
    },
    {
      "step": "rejectApplication/reject",
      "organisms": [
        "applicationActions"
      ],
      "functions": [
        "rejectApplication"
      ]
    }
  ],
  "rules": {
    "listApplications": [
      "daysInStageCalculation",
      "applicationActiveCalculation"
    ],
    "getApplication": [
      "daysInStageCalculation",
      "applicationActiveCalculation",
      "remainingOpeningsCalculation"
    ],
    "searchCandidates": [],
    "searchOpenPositions": [
      "applicationOnlyToOpenPosition",
      "closedPositionAcceptsNoApplications",
      "remainingOpeningsCalculation"
    ],
    "recordApplication": [
      "applicationOnlyToOpenPosition",
      "closedPositionAcceptsNoApplications",
      "onePerCandidatePerPosition",
      "applicationStartsInScreening"
    ],
    "moveToInterview": [
      "stageSequenceEnforced",
      "finalStagesAreTerminal"
    ],
    "rejectApplication": [
      "rejectionRequiresReason",
      "finalStagesAreTerminal",
      "stageSequenceEnforced"
    ]
  },
  "access": {
    "actors": [
      "recruiter"
    ],
    "grants": [
      "recruiterPositionsAndApplications",
      "recruiterCandidates",
      "recruiterHiringManagers"
    ]
  },
  "fields": {
    "Application.appliedAt": [
      "applicationDetail",
      "applicationList",
      "stageHistory"
    ],
    "Application.candidateId": [
      "applicationList",
      "newApplicationForm"
    ],
    "Application.code": [
      "applicationActions",
      "applicationDetail",
      "applicationList"
    ],
    "Application.details.daysInStage": [
      "applicationDetail",
      "applicationList"
    ],
    "Application.details.hire.decidedBy": [
      "stageHistory"
    ],
    "Application.details.hire.hiredAt": [
      "applicationDetail",
      "stageHistory"
    ],
    "Application.details.interview.movedAt": [
      "applicationDetail",
      "stageHistory"
    ],
    "Application.details.interview.movedBy": [
      "stageHistory"
    ],
    "Application.details.isActive": [
      "applicationActions",
      "applicationList"
    ],
    "Application.details.notes": [
      "applicationDetail",
      "newApplicationForm"
    ],
    "Application.details.offer.decidedBy": [
      "stageHistory"
    ],
    "Application.details.offer.extendedAt": [
      "applicationDetail",
      "stageHistory"
    ],
    "Application.details.offer.notes": [
      "applicationDetail"
    ],
    "Application.details.rejection.reason": [
      "applicationActions",
      "applicationDetail",
      "stageHistory"
    ],
    "Application.details.rejection.rejectedAt": [
      "applicationDetail",
      "stageHistory"
    ],
    "Application.details.rejection.stageAtRejection": [
      "applicationDetail",
      "stageHistory"
    ],
    "Application.details.remainingOpenings": [
      "applicationDetail"
    ],
    "Application.jobPositionId": [
      "applicationList",
      "newApplicationForm"
    ],
    "Application.stageChangedAt": [
      "applicationDetail",
      "applicationList",
      "stageHistory"
    ],
    "Application.status": [
      "applicationActions",
      "applicationDetail",
      "applicationList",
      "stageHistory"
    ],
    "Candidate.details.hiringPipeline.resumeLink": [
      "applicationDetail"
    ],
    "Candidate.details.hiringPipeline.source": [
      "applicationDetail"
    ],
    "Candidate.details.identification.name": [
      "applicationDetail",
      "applicationList",
      "newApplicationForm"
    ],
    "CandidateEmail.details.contactChannel.value": [
      "applicationDetail",
      "newApplicationForm"
    ],
    "HiringManager.details.identification.name": [
      "applicationDetail"
    ],
    "JobPosition.department": [
      "applicationDetail",
      "applicationList",
      "newApplicationForm"
    ],
    "JobPosition.details.remainingOpenings": [
      "newApplicationForm"
    ],
    "JobPosition.status": [
      "applicationDetail",
      "newApplicationForm"
    ],
    "JobPosition.title": [
      "applicationDetail",
      "applicationList",
      "newApplicationForm"
    ]
  }
} as const;
