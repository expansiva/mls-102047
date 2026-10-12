/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/my_applications.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationList",
        "persist": true
      },
      "isActive": {
        "type": "boolean",
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
      },
      "jobPositionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:JobPosition",
        "persist": true
      }
    }
  },
  "forms": {
    "returnForRejection": {
      "organism": "applicationActions",
      "submit": "returnForRejection"
    }
  },
  "requests": {
    "listMyApplications": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "applications",
        "interviewCount",
        "offerCount"
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
        "application"
      ],
      "writes": "Application.extendOffer"
    },
    "returnForRejection": {
      "kind": "cmd",
      "trigger": "returnForRejection",
      "returns": [
        "application"
      ],
      "writes": "Application.reject"
    },
    "markHired": {
      "kind": "cmd",
      "trigger": "markHired",
      "returns": [
        "application"
      ],
      "writes": "Application.hire"
    }
  },
  "states": {
    "applications": {
      "source": "listMyApplications.applications",
      "description": "One application of my positions in the queue, with its candidate and position.",
      "organisms": [
        "applicationList"
      ]
    },
    "interviewCount": {
      "source": "listMyApplications.interviewCount",
      "description": "A page { items, page, pageSize, hasMore } of ApplicationRow for the list, and the two counts shown on the quick filters.",
      "organisms": [
        "applicationList"
      ]
    },
    "offerCount": {
      "source": "listMyApplications.offerCount",
      "description": "A page { items, page, pageSize, hasMore } of ApplicationRow for the list, and the two counts shown on the quick filters.",
      "organisms": [
        "applicationList"
      ]
    },
    "application": {
      "source": "getMyApplication.application",
      "description": "The selected application with its candidate, position and stage history; returned by the detail query and by every decision command.",
      "organisms": [
        "applicationActions",
        "applicationDetail",
        "applicationHistory"
      ]
    },
    "selectedApplication": {
      "source": "entry.params.applicationId",
      "description": "The selected application with its candidate, position and stage history; returned by the detail query and by every decision command.",
      "organisms": [
        "applicationDetail",
        "applicationList"
      ]
    }
  },
  "functions": {
    "listMyApplications": {
      "description": "Loads the hiring manager's application queue: applications to the positions they manage, with candidate name, position title and days in pipeline, plus the counts behind the 'interviewed' and 'accepted offers' quick filters.",
      "calls": "listMyApplications",
      "sets": "applications",
      "updates": [
        "interviewCount",
        "offerCount"
      ]
    },
    "getMyApplication": {
      "description": "Opens the application picked in the queue (or arrived from a notification) with everything the detail, the decision buttons and the history need, in one call.",
      "calls": "getMyApplication",
      "sets": "application"
    },
    "extendOffer": {
      "description": "Extends an offer to the interviewed candidate: moves the application from interview to offer.",
      "calls": "extendOffer",
      "sets": "application",
      "updates": [
        "applications",
        "interviewCount",
        "offerCount"
      ]
    },
    "returnForRejection": {
      "description": "Declines the application with a reason, closing it as rejected on behalf of the recruiter handoff.",
      "calls": "returnForRejection",
      "sets": "application",
      "updates": [
        "applications",
        "interviewCount",
        "offerCount"
      ]
    },
    "markHired": {
      "description": "Confirms the hire of an accepted offer: moves the application from offer to hired, closing the position when the headcount is filled.",
      "calls": "markHired",
      "sets": "application",
      "updates": [
        "applications",
        "interviewCount",
        "offerCount"
      ]
    },
    "openMyHome": {
      "description": "Applications for my positions by stage, with the candidate, the position, the applied date and days in pipeline; quick filters for interviewed applications and accepted offers. Picking one opens it beside the list.",
      "navigate": "my_pipeline_home",
      "carries": {
        "applicationId": "selectedApplication.id"
      }
    },
    "openMyPositions": {
      "description": "Application details: number, stage, position and applied date, with the candidate's name, email, source and resume, plus the position's remaining openings so I know a hire still fits the headcount.",
      "navigate": "my_positions",
      "carries": {
        "applicationId": "selectedApplication.id"
      }
    }
  },
  "journeys": [
    {
      "step": "confirmHire/findOffer",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listMyApplications"
      ]
    },
    {
      "step": "confirmHire/inspectOffer",
      "organisms": [
        "applicationDetail",
        "applicationHistory"
      ],
      "functions": [
        "getMyApplication"
      ]
    },
    {
      "step": "confirmHire/hire",
      "organisms": [
        "applicationActions"
      ],
      "functions": [
        "markHired"
      ]
    },
    {
      "step": "decideOffer/openApplication",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "listMyApplications",
        "getMyApplication"
      ]
    },
    {
      "step": "decideOffer/inspectCandidate",
      "organisms": [
        "applicationDetail",
        "applicationHistory"
      ],
      "functions": [
        "getMyApplication"
      ]
    },
    {
      "step": "decideOffer/extendOffer",
      "organisms": [
        "applicationActions"
      ],
      "functions": [
        "extendOffer"
      ]
    }
  ],
  "rules": {
    "listMyApplications": [
      "hiringManagerSeesOwnPositions",
      "daysInPipelineCalculated",
      "applicationActiveWhileInPipeline"
    ],
    "getMyApplication": [
      "hiringManagerSeesOwnPositions",
      "daysInPipelineCalculated",
      "remainingOpeningsCalculated",
      "applicationActiveWhileInPipeline"
    ],
    "extendOffer": [
      "onlyPositionHiringManagerDecides"
    ],
    "returnForRejection": [
      "rejectionRequiresReason",
      "hiringManagerSeesOwnPositions"
    ],
    "markHired": [
      "onlyPositionHiringManagerDecides",
      "hireWithinRemainingHeadcount",
      "positionClosesWhenHeadcountFilled",
      "closePositionWhenHeadcountFilled",
      "remainingOpeningsCalculated"
    ]
  },
  "access": {
    "actors": [
      "hiringManager"
    ],
    "grants": [
      "managerOwnPipeline",
      "managerCandidates"
    ]
  },
  "fields": {
    "Application.applicationNumber": [
      "applicationDetail",
      "applicationList"
    ],
    "Application.appliedAt": [
      "applicationDetail",
      "applicationHistory",
      "applicationList"
    ],
    "Application.candidateId": [
      "applicationList"
    ],
    "Application.details.daysInPipeline": [
      "applicationDetail",
      "applicationList"
    ],
    "Application.details.hiredAt": [
      "applicationHistory"
    ],
    "Application.details.interviewStartedAt": [
      "applicationHistory"
    ],
    "Application.details.isActive": [
      "applicationList"
    ],
    "Application.details.offerExtendedAt": [
      "applicationHistory"
    ],
    "Application.details.rejection.reason": [
      "applicationActions",
      "applicationHistory"
    ],
    "Application.details.rejection.rejectedAt": [
      "applicationHistory"
    ],
    "Application.details.rejection.stageAtRejection": [
      "applicationHistory"
    ],
    "Application.jobPositionId": [
      "applicationList"
    ],
    "Application.status": [
      "applicationActions",
      "applicationDetail",
      "applicationHistory",
      "applicationList"
    ],
    "Candidate.details.base.contacts": [
      "applicationDetail"
    ],
    "Candidate.details.hiringPipeline.source": [
      "applicationDetail"
    ],
    "Candidate.details.identification.name": [
      "applicationDetail",
      "applicationList"
    ],
    "JobPosition.details.remainingOpenings": [
      "applicationActions",
      "applicationDetail"
    ],
    "JobPosition.title": [
      "applicationDetail",
      "applicationList"
    ]
  }
} as const;
