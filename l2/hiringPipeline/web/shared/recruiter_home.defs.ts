/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/recruiter_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationsInbox",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationsInbox",
        "persist": true
      },
      "applicationId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:applicationsInbox",
        "persist": true
      }
    }
  },
  "forms": {
    "rejectApplication": {
      "organism": "applicationsInbox",
      "submit": "rejectApplication"
    }
  },
  "requests": {
    "getPipelineOverview": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "stages",
        "openPositions"
      ]
    },
    "listWorkQueue": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "applications"
      ]
    },
    "advanceToInterview": {
      "kind": "cmd",
      "trigger": "advanceToInterview",
      "returns": [
        "application"
      ],
      "writes": "Application.advanceToInterview"
    },
    "rejectApplication": {
      "kind": "cmd",
      "trigger": "rejectApplication",
      "returns": [
        "application"
      ],
      "writes": "Application.reject"
    }
  },
  "states": {
    "stages": {
      "source": "getPipelineOverview.stages",
      "description": "One active pipeline stage with its count and time-in-stage indicators.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    "openPositions": {
      "source": "getPipelineOverview.openPositions",
      "description": "An open job position with its remaining openings, hires so far and active applications.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    "applications": {
      "source": "listWorkQueue.applications",
      "description": "One application of the recruiter's work queue with candidate and position, as the inbox row and its expanded view show it.",
      "organisms": [
        "applicationsInbox"
      ]
    },
    "selectedApplication": {
      "source": "entry.params.applicationId",
      "description": "One application of the recruiter's work queue with candidate and position, as the inbox row and its expanded view show it.",
      "organisms": [
        "applicationsInbox",
        "pipelineHighlights"
      ]
    }
  },
  "functions": {
    "getPipelineOverview": {
      "description": "Loads the pipeline summary of the recruiter home: active applications per stage with time-in-stage indicators, and the open positions with their openings.",
      "calls": "getPipelineOverview",
      "sets": "stages",
      "updates": [
        "openPositions"
      ]
    },
    "listWorkQueue": {
      "description": "Lists the applications waiting for the recruiter, optionally narrowed to one stage picked in the pipeline highlights.",
      "calls": "listWorkQueue",
      "sets": "applications"
    },
    "advanceToInterview": {
      "description": "Moves a screened application to the interview stage so it reaches the position's hiring manager after the interview. (applications.items: upsert)",
      "calls": "advanceToInterview",
      "updates": [
        "applications",
        "stages",
        "openPositions"
      ]
    },
    "rejectApplication": {
      "description": "Rejects an application that will not move forward, recording the reason. (applications.items: remove)",
      "calls": "rejectApplication",
      "updates": [
        "applications",
        "stages",
        "openPositions"
      ]
    },
    "openJobPositions": {
      "description": "Active applications by stage (screening, interview, offer) with days in the current stage, so stalled ones stand out. Also each open position with its remaining openings and hires so far. Picking a stage narrows the work queue to that stage.",
      "navigate": "job_positions",
      "carries": {
        "applicationId": "selectedApplication.id"
      }
    },
    "registerApplication": {
      "description": "Applications waiting for me, oldest in their stage first. Each shows the application number, candidate, position, stage, applied date and days in stage, plus the candidate's resume link and source. I can move a screened application to interview, so it goes to the position's hiring manager once the interview is done. I can reject one that will not move forward by giving a reason. I can also register a new candidate application.",
      "navigate": "applications",
      "carries": {
        "applicationId": "selectedApplication.id"
      }
    },
    "registerCandidate": {
      "description": "Applications waiting for me, oldest in their stage first. Each shows the application number, candidate, position, stage, applied date and days in stage, plus the candidate's resume link and source. I can move a screened application to interview, so it goes to the position's hiring manager once the interview is done. I can reject one that will not move forward by giving a reason. I can also register a new candidate application.",
      "navigate": "candidates",
      "carries": {
        "applicationId": "selectedApplication.id"
      }
    }
  },
  "journeys": [
    {
      "step": "advanceToInterview/findApplication",
      "organisms": [
        "pipelineHighlights",
        "applicationsInbox"
      ],
      "functions": [
        "getPipelineOverview",
        "listWorkQueue"
      ]
    },
    {
      "step": "advanceToInterview/reviewApplication",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "listWorkQueue"
      ]
    },
    {
      "step": "advanceToInterview/moveToInterview",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "advanceToInterview"
      ]
    },
    {
      "step": "rejectApplication/findApplication",
      "organisms": [
        "pipelineHighlights",
        "applicationsInbox"
      ],
      "functions": [
        "getPipelineOverview",
        "listWorkQueue"
      ]
    },
    {
      "step": "rejectApplication/reviewApplication",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "listWorkQueue"
      ]
    },
    {
      "step": "rejectApplication/reject",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "rejectApplication"
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
    "getPipelineOverview": [
      "applicationActiveCalculation",
      "daysInStageCalculation",
      "hiresSoFarCalculation",
      "remainingOpeningsCalculation"
    ],
    "listWorkQueue": [
      "applicationActiveCalculation",
      "daysInStageCalculation",
      "remainingOpeningsCalculation"
    ],
    "advanceToInterview": [
      "stageSequenceEnforced",
      "finalStagesAreTerminal",
      "daysInStageCalculation"
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
      "applicationsInbox"
    ],
    "Application.candidateId": [
      "applicationsInbox"
    ],
    "Application.code": [
      "applicationsInbox"
    ],
    "Application.details.daysInStage": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.details.isActive": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.details.notes": [
      "applicationsInbox"
    ],
    "Application.details.rejection.reason": [
      "applicationsInbox"
    ],
    "Application.details.remainingOpenings": [
      "applicationsInbox"
    ],
    "Application.jobPositionId": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.stageChangedAt": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.status": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Candidate.details.hiringPipeline.resumeLink": [
      "applicationsInbox"
    ],
    "Candidate.details.hiringPipeline.source": [
      "applicationsInbox"
    ],
    "Candidate.details.identification.name": [
      "applicationsInbox"
    ],
    "HiringManager.details.identification.name": [
      "applicationsInbox"
    ],
    "JobPosition.department": [
      "pipelineHighlights"
    ],
    "JobPosition.details.headcount": [
      "pipelineHighlights"
    ],
    "JobPosition.details.hiresSoFar": [
      "pipelineHighlights"
    ],
    "JobPosition.details.remainingOpenings": [
      "pipelineHighlights"
    ],
    "JobPosition.hiringManagerId": [
      "applicationsInbox"
    ],
    "JobPosition.status": [
      "pipelineHighlights"
    ],
    "JobPosition.title": [
      "applicationsInbox",
      "pipelineHighlights"
    ]
  }
} as const;
