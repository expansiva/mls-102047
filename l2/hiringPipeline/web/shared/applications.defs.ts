/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/applications.defs.ts" enhancement="_blank"/>

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
      "search": {
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
    "createApplication": {
      "organism": "newApplicationForm",
      "submit": "createApplication"
    },
    "rejectApplication": {
      "organism": "applicationActions",
      "submit": "rejectApplication"
    }
  },
  "requests": {
    "qryApplications": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "applications"
      ]
    },
    "qryApplicationDetail": {
      "kind": "qry",
      "trigger": "qryApplicationDetail",
      "returns": [
        "application"
      ]
    },
    "qrySearchCandidates": {
      "kind": "qry",
      "trigger": "qrySearchCandidates",
      "returns": [
        "candidates"
      ]
    },
    "qrySearchOpenPositions": {
      "kind": "qry",
      "trigger": "qrySearchOpenPositions",
      "returns": [
        "positions"
      ]
    },
    "cmdCreateApplication": {
      "kind": "cmd",
      "trigger": "createApplication",
      "returns": [
        "row",
        "application"
      ],
      "writes": "Application.create"
    },
    "cmdAdvanceToInterview": {
      "kind": "cmd",
      "trigger": "advanceToInterview",
      "returns": [
        "row",
        "application"
      ],
      "writes": "Application.advanceToInterview"
    },
    "cmdRejectApplication": {
      "kind": "cmd",
      "trigger": "rejectApplication",
      "returns": [
        "row",
        "application"
      ],
      "writes": "Application.reject"
    }
  },
  "states": {
    "applications": {
      "source": "qryApplications.applications",
      "description": "One application in the pipeline list, with candidate name and position title.",
      "organisms": [
        "applicationList"
      ]
    },
    "application": {
      "source": "qryApplicationDetail.application",
      "description": "The selected application with candidate, e-mail, position, hiring manager and stage timeline fields.",
      "organisms": [
        "applicationActions",
        "applicationDetail",
        "stageTimeline"
      ]
    },
    "candidates": {
      "source": "qrySearchCandidates.candidates",
      "description": "A candidate offered in the new application form.",
      "organisms": [
        "newApplicationForm"
      ]
    },
    "positions": {
      "source": "qrySearchOpenPositions.positions",
      "description": "An open job position offered in the new application form.",
      "organisms": [
        "newApplicationForm"
      ]
    },
    "selectedApplication": {
      "source": "entry.params.applicationId",
      "description": "The selected application with candidate, e-mail, position, hiring manager and stage timeline fields.",
      "organisms": [
        "applicationDetail",
        "applicationList"
      ]
    }
  },
  "functions": {
    "qryApplications": {
      "description": "Loads the recruiter's pipeline queue: applications of the organization, optionally narrowed to one stage (screening first) or to an application number, one page at a time.",
      "calls": "qryApplications",
      "sets": "applications"
    },
    "qryApplicationDetail": {
      "description": "Opens the application the recruiter selected, with everything the detail, the actions and the stage timeline show, in one call.",
      "calls": "qryApplicationDetail",
      "sets": "application"
    },
    "qrySearchCandidates": {
      "description": "Finds the candidate to record an application for, as the recruiter types a name.",
      "calls": "qrySearchCandidates",
      "sets": "candidates"
    },
    "qrySearchOpenPositions": {
      "description": "Offers the open job positions the candidate can apply to, searchable by title or department.",
      "calls": "qrySearchOpenPositions",
      "sets": "positions"
    },
    "cmdCreateApplication": {
      "description": "Records a new application of a candidate to an open position. (applications.items: upsert)",
      "calls": "cmdCreateApplication",
      "sets": "application",
      "updates": [
        "applications"
      ]
    },
    "cmdAdvanceToInterview": {
      "description": "Moves a screened application to interview, handing it to the position's hiring manager. (applications.items: upsert)",
      "calls": "cmdAdvanceToInterview",
      "sets": "application",
      "updates": [
        "applications"
      ]
    },
    "cmdRejectApplication": {
      "description": "Rejects the selected application with the reason the recruiter enters. (applications.items: upsert)",
      "calls": "cmdRejectApplication",
      "sets": "application",
      "updates": [
        "applications"
      ]
    }
  },
  "journeys": [
    {
      "step": "advanceToInterview/findScreening",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "qryApplications"
      ]
    },
    {
      "step": "advanceToInterview/inspectApplication",
      "organisms": [
        "applicationDetail",
        "stageTimeline"
      ],
      "functions": [
        "qryApplicationDetail"
      ]
    },
    {
      "step": "advanceToInterview/moveToInterview",
      "organisms": [
        "applicationActions"
      ],
      "functions": [
        "cmdAdvanceToInterview"
      ]
    },
    {
      "step": "recordApplication/findCandidate",
      "organisms": [
        "newApplicationForm"
      ],
      "functions": [
        "qrySearchCandidates"
      ]
    },
    {
      "step": "recordApplication/findPosition",
      "organisms": [
        "newApplicationForm"
      ],
      "functions": [
        "qrySearchOpenPositions"
      ]
    },
    {
      "step": "recordApplication/createApplication",
      "organisms": [
        "newApplicationForm"
      ],
      "functions": [
        "cmdCreateApplication"
      ]
    },
    {
      "step": "rejectApplication/findApplication",
      "organisms": [
        "applicationList"
      ],
      "functions": [
        "qryApplications"
      ]
    },
    {
      "step": "rejectApplication/inspectApplication",
      "organisms": [
        "applicationDetail",
        "stageTimeline"
      ],
      "functions": [
        "qryApplicationDetail"
      ]
    },
    {
      "step": "rejectApplication/reject",
      "organisms": [
        "applicationActions"
      ],
      "functions": [
        "cmdRejectApplication"
      ]
    }
  ],
  "rules": {
    "qryApplications": [
      "daysInPipelineCalculated",
      "applicationActiveWhileInPipeline"
    ],
    "qryApplicationDetail": [
      "daysInPipelineCalculated",
      "applicationActiveWhileInPipeline"
    ],
    "qrySearchCandidates": [],
    "qrySearchOpenPositions": [
      "applicationOnlyToOpenPosition",
      "remainingOpeningsCalculated"
    ],
    "cmdCreateApplication": [
      "recruiterMovesScreeningAndInterview",
      "applicationOnlyToOpenPosition",
      "oneActiveApplicationPerCandidateAndPosition",
      "applicationNumberFromSequence",
      "applicationStartsInScreening",
      "applicationActiveWhileInPipeline",
      "daysInPipelineCalculated"
    ],
    "cmdAdvanceToInterview": [
      "recruiterMovesScreeningAndInterview",
      "applicationActiveWhileInPipeline",
      "daysInPipelineCalculated"
    ],
    "cmdRejectApplication": [
      "rejectionRequiresReason",
      "recruiterMovesScreeningAndInterview",
      "applicationActiveWhileInPipeline",
      "daysInPipelineCalculated"
    ]
  },
  "access": {
    "actors": [
      "recruiter"
    ],
    "grants": [
      "recruiterPipeline",
      "recruiterCandidates",
      "recruiterHiringManagers"
    ]
  },
  "fields": {
    "Application.applicationNumber": [
      "applicationActions",
      "applicationDetail",
      "applicationList"
    ],
    "Application.appliedAt": [
      "applicationDetail",
      "applicationList",
      "stageTimeline"
    ],
    "Application.candidateId": [
      "applicationList",
      "newApplicationForm"
    ],
    "Application.details.daysInPipeline": [
      "applicationDetail",
      "applicationList"
    ],
    "Application.details.hiredAt": [
      "stageTimeline"
    ],
    "Application.details.interviewStartedAt": [
      "stageTimeline"
    ],
    "Application.details.isActive": [
      "applicationDetail",
      "applicationList"
    ],
    "Application.details.offerExtendedAt": [
      "stageTimeline"
    ],
    "Application.details.rejection.reason": [
      "applicationActions",
      "applicationDetail",
      "stageTimeline"
    ],
    "Application.details.rejection.rejectedAt": [
      "stageTimeline"
    ],
    "Application.details.rejection.stageAtRejection": [
      "stageTimeline"
    ],
    "Application.jobPositionId": [
      "applicationList",
      "newApplicationForm"
    ],
    "Application.status": [
      "applicationActions",
      "applicationDetail",
      "applicationList",
      "stageTimeline"
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
      "applicationActions",
      "applicationDetail"
    ],
    "JobPosition.department": [
      "applicationDetail",
      "newApplicationForm"
    ],
    "JobPosition.details.remainingOpenings": [
      "newApplicationForm"
    ],
    "JobPosition.status": [
      "newApplicationForm"
    ],
    "JobPosition.title": [
      "applicationDetail",
      "applicationList",
      "newApplicationForm"
    ]
  }
} as const;
