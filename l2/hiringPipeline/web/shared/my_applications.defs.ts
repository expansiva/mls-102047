/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/my_applications.defs.ts" enhancement="_blank"/>

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
        "effect": "select:applicationReview",
        "persist": true
      }
    }
  },
  "forms": {
    "extendOffer": {
      "organism": "applicationDecision",
      "submit": "extendOffer"
    },
    "sendBackToReject": {
      "organism": "applicationDecision",
      "submit": "sendBackToReject"
    }
  },
  "requests": {
    "listMyApplications": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "applications"
      ]
    },
    "getMyApplication": {
      "kind": "qry",
      "trigger": "getMyApplication",
      "returns": [
        "application"
      ]
    },
    "extendOffer": {
      "kind": "cmd",
      "trigger": "extendOffer",
      "returns": [
        "application",
        "listItem"
      ],
      "writes": "Application.extendOffer"
    },
    "hireCandidate": {
      "kind": "cmd",
      "trigger": "hireCandidate",
      "returns": [
        "application",
        "listItem"
      ],
      "writes": "Application.hire"
    },
    "sendBackToReject": {
      "kind": "cmd",
      "trigger": "sendBackToReject",
      "returns": [
        "application",
        "listItem"
      ],
      "writes": "Application.reject"
    }
  },
  "states": {
    "applications": {
      "source": "listMyApplications.applications",
      "description": "One application row in the hiring manager's list.",
      "organisms": [
        "applicationList"
      ]
    },
    "application": {
      "source": "getMyApplication.application",
      "description": "The selected application with its candidate, history and headcount, as review, decision and history show it.",
      "organisms": [
        "applicationDecision",
        "applicationReview",
        "stageHistory"
      ]
    },
    "selectedApplication": {
      "source": "entry.params.applicationId",
      "description": "The selected application with its candidate, history and headcount, as review, decision and history show it.",
      "organisms": [
        "applicationList",
        "applicationReview"
      ]
    }
  },
  "functions": {
    "listMyApplications": {
      "description": "Loads the page of applications to the positions the signed-in hiring manager manages, and re-runs when she searches, filters by stage or position, or asks for the next page.",
      "calls": "listMyApplications",
      "sets": "applications"
    },
    "getMyApplication": {
      "description": "Opens the application the hiring manager selected, with everything review, decision and history need in one call.",
      "calls": "getMyApplication",
      "sets": "application"
    },
    "extendOffer": {
      "description": "Extends an offer to an interviewed candidate. (application: upsert; applications.items: upsert)",
      "calls": "extendOffer",
      "updates": [
        "application",
        "applications"
      ]
    },
    "hireCandidate": {
      "description": "Hires the candidate of an application in the offer stage. (application: upsert; applications.items: upsert)",
      "calls": "hireCandidate",
      "updates": [
        "application",
        "applications"
      ]
    },
    "sendBackToReject": {
      "description": "Sends the application back as declined, closing it with the hiring manager's rejection reason. (application: upsert; applications.items: upsert)",
      "calls": "sendBackToReject",
      "updates": [
        "application",
        "applications"
      ]
    },
    "openMyPositions": {
      "description": "The candidate and the application: name, contact, resume link and source, when they applied, when they moved to interview, the offer and its notes, and the position's remaining openings, so I can decide with the headcount in view.",
      "navigate": "my_positions",
      "carries": {
        "applicationId": "selectedApplication.id"
      }
    }
  },
  "journeys": [
    {
      "step": "decideHire/findApplication",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listMyApplications"
      ]
    },
    {
      "step": "decideHire/reviewOffer",
      "organisms": [
        "applicationReview",
        "stageHistory"
      ],
      "functions": [
        "getMyApplication"
      ]
    },
    {
      "step": "decideHire/checkHeadcount",
      "organisms": [
        "applicationReview",
        "applicationDecision"
      ],
      "functions": [
        "getMyApplication"
      ]
    },
    {
      "step": "decideHire/hire",
      "organisms": [
        "applicationDecision"
      ],
      "functions": [
        "hireCandidate"
      ]
    },
    {
      "step": "decideOffer/findApplication",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listMyApplications"
      ]
    },
    {
      "step": "decideOffer/reviewCandidate",
      "organisms": [
        "applicationReview",
        "stageHistory"
      ],
      "functions": [
        "getMyApplication"
      ]
    },
    {
      "step": "decideOffer/extendOffer",
      "organisms": [
        "applicationDecision"
      ],
      "functions": [
        "extendOffer"
      ]
    },
    {
      "step": "reviewMyPipeline/findMyPositions",
      "organisms": [],
      "functions": [],
      "continuesIn": "my_positions"
    },
    {
      "step": "reviewMyPipeline/inspectPosition",
      "organisms": [],
      "functions": [],
      "continuesIn": "my_positions"
    },
    {
      "step": "reviewMyPipeline/inspectApplications",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listMyApplications"
      ]
    }
  ],
  "rules": {
    "listMyApplications": [
      "daysInStageCalculation",
      "applicationActiveCalculation"
    ],
    "getMyApplication": [
      "remainingOpeningsCalculation",
      "hiresSoFarCalculation",
      "daysInStageCalculation",
      "applicationActiveCalculation"
    ],
    "extendOffer": [
      "onlyPositionManagerDecides",
      "stageSequenceEnforced",
      "finalStagesAreTerminal"
    ],
    "hireCandidate": [
      "onlyPositionManagerDecides",
      "hireRequiresRemainingHeadcount",
      "closePositionWhenHeadcountFilled",
      "stageSequenceEnforced",
      "finalStagesAreTerminal",
      "remainingOpeningsCalculation",
      "hiresSoFarCalculation",
      "headcountFilledCalculation"
    ],
    "sendBackToReject": [
      "rejectionRequiresReason",
      "finalStagesAreTerminal",
      "stageSequenceEnforced"
    ]
  },
  "access": {
    "actors": [
      "hiringManager"
    ],
    "grants": [
      "hiringManagerMyApplications",
      "hiringManagerCandidates"
    ]
  },
  "fields": {
    "Application.appliedAt": [
      "applicationReview",
      "stageHistory"
    ],
    "Application.candidateId": [
      "applicationList"
    ],
    "Application.code": [
      "applicationList",
      "applicationReview"
    ],
    "Application.details.daysInStage": [
      "applicationList"
    ],
    "Application.details.hire.decidedBy": [
      "stageHistory"
    ],
    "Application.details.hire.hiredAt": [
      "stageHistory"
    ],
    "Application.details.interview.movedAt": [
      "applicationReview",
      "stageHistory"
    ],
    "Application.details.interview.movedBy": [
      "stageHistory"
    ],
    "Application.details.isActive": [
      "applicationList"
    ],
    "Application.details.notes": [
      "applicationReview"
    ],
    "Application.details.offer.decidedBy": [
      "stageHistory"
    ],
    "Application.details.offer.extendedAt": [
      "applicationReview",
      "stageHistory"
    ],
    "Application.details.offer.notes": [
      "applicationDecision",
      "applicationReview"
    ],
    "Application.details.rejection.reason": [
      "applicationDecision"
    ],
    "Application.details.rejection.rejectedAt": [
      "stageHistory"
    ],
    "Application.details.rejection.stageAtRejection": [
      "stageHistory"
    ],
    "Application.details.remainingOpenings": [
      "applicationDecision",
      "applicationReview"
    ],
    "Application.jobPositionId": [
      "applicationList",
      "applicationReview"
    ],
    "Application.stageChangedAt": [
      "applicationList",
      "stageHistory"
    ],
    "Application.status": [
      "applicationDecision",
      "applicationList",
      "applicationReview"
    ],
    "Candidate.details.base.contacts": [
      "applicationReview"
    ],
    "Candidate.details.hiringPipeline.resumeLink": [
      "applicationReview"
    ],
    "Candidate.details.hiringPipeline.source": [
      "applicationReview"
    ],
    "Candidate.details.identification.name": [
      "applicationList",
      "applicationReview"
    ]
  }
} as const;
