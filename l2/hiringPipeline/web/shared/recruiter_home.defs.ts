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
      "text": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:applicationsInbox",
        "persist": true
      },
      "candidateId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:applicationsInbox",
        "persist": false
      },
      "jobPositionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:applicationsInbox",
        "persist": false
      }
    }
  },
  "forms": {
    "recordApplication": {
      "organism": "applicationsInbox",
      "submit": "recordApplication"
    },
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
        "indicators",
        "positions",
        "activeApplications"
      ]
    },
    "listInboxApplications": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "items"
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
    "indicators": {
      "source": "getPipelineOverview.indicators",
      "description": "Totals computed by the server for the overview header.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    "getPipelineOverviewPositions": {
      "source": "getPipelineOverview.positions",
      "description": "A position in the pipeline overview with its hiring manager and filling indicators.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    "activeApplications": {
      "source": "getPipelineOverview.activeApplications",
      "description": "An active application in the overview, with its days in the pipeline and its position title.",
      "organisms": [
        "pipelineHighlights"
      ]
    },
    "items": {
      "source": "listInboxApplications.items",
      "description": "One application in the recruiter's inbox, with its candidate and position; also returned by every command so the page redraws the item.",
      "organisms": [
        "applicationsInbox"
      ]
    },
    "candidates": {
      "source": "searchCandidates.candidates",
      "description": "Candidate shown on an inbox item and offered when recording an application: name, source and e-mail.",
      "organisms": [
        "applicationsInbox"
      ]
    },
    "searchOpenPositionsPositions": {
      "source": "searchOpenPositions.positions",
      "description": "Job position as shown on an application and offered when recording one: title, status and remaining openings.",
      "organisms": [
        "applicationsInbox"
      ]
    }
  },
  "functions": {
    "getPipelineOverview": {
      "description": "Loads in one call the pipeline overview of the recruiter home: header indicators, positions with their filling status and the active applications that have waited longest.",
      "calls": "getPipelineOverview",
      "sets": "indicators",
      "updates": [
        "getPipelineOverviewPositions",
        "activeApplications"
      ]
    },
    "listInboxApplications": {
      "description": "Lists the applications waiting for the recruiter: those in screening to move to interview or reject, and those in interview returned by the hiring manager to reject with a reason. (items.items: append)",
      "calls": "listInboxApplications",
      "sets": "items"
    },
    "searchCandidates": {
      "description": "Finds the candidate the recruiter types when recording a new application.",
      "calls": "searchCandidates",
      "sets": "candidates"
    },
    "searchOpenPositions": {
      "description": "Offers the open job positions the candidate can apply to when recording an application.",
      "calls": "searchOpenPositions",
      "sets": "searchOpenPositionsPositions"
    },
    "recordApplication": {
      "description": "Records a new application of the chosen candidate to the chosen open position. (items.items: upsert)",
      "calls": "recordApplication",
      "updates": [
        "items",
        "indicators",
        "getPipelineOverviewPositions",
        "activeApplications"
      ]
    },
    "advanceToInterview": {
      "description": "Moves a screened application to interview, handing it to the position's hiring manager. (items.items: remove)",
      "calls": "advanceToInterview",
      "updates": [
        "items",
        "indicators",
        "getPipelineOverviewPositions",
        "activeApplications"
      ]
    },
    "rejectApplication": {
      "description": "Rejects an application that will not move forward, recording the reason. (items.items: remove)",
      "calls": "rejectApplication",
      "updates": [
        "items",
        "indicators",
        "getPipelineOverviewPositions",
        "activeApplications"
      ]
    },
    "openJobPositions": {
      "description": "Positions with hires so far, remaining openings, applications by stage and which are filled; active applications and their days in the pipeline, so the recruiter spots positions close to filling and applications that have been waiting too long.",
      "navigate": "job_positions"
    },
    "openApplications": {
      "description": "Positions with hires so far, remaining openings, applications by stage and which are filled; active applications and their days in the pipeline, so the recruiter spots positions close to filling and applications that have been waiting too long.",
      "navigate": "applications"
    },
    "openApplicationsPage": {
      "description": "Applications waiting for me: new applications to record by choosing the candidate and an open position, applications in screening to move to interview or reject, and applications returned by the hiring manager to reject with a reason.",
      "navigate": "applications"
    }
  },
  "journeys": [
    {
      "step": "advanceToInterview/findScreening",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "listInboxApplications"
      ]
    },
    {
      "step": "advanceToInterview/inspectApplication",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "listInboxApplications"
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
      "step": "recordApplication/findCandidate",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "searchCandidates"
      ]
    },
    {
      "step": "recordApplication/findPosition",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "searchOpenPositions"
      ]
    },
    {
      "step": "recordApplication/createApplication",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "recordApplication"
      ]
    },
    {
      "step": "rejectApplication/findApplication",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "listInboxApplications"
      ]
    },
    {
      "step": "rejectApplication/inspectApplication",
      "organisms": [
        "applicationsInbox"
      ],
      "functions": [
        "listInboxApplications"
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
    }
  ],
  "rules": {
    "getPipelineOverview": [
      "remainingOpeningsCalculated",
      "positionClosesWhenHeadcountFilled",
      "applicationActiveWhileInPipeline",
      "daysInPipelineCalculated"
    ],
    "listInboxApplications": [
      "applicationActiveWhileInPipeline",
      "daysInPipelineCalculated",
      "remainingOpeningsCalculated"
    ],
    "searchCandidates": [],
    "searchOpenPositions": [
      "applicationOnlyToOpenPosition",
      "remainingOpeningsCalculated"
    ],
    "recordApplication": [
      "recruiterMovesScreeningAndInterview",
      "applicationOnlyToOpenPosition",
      "oneActiveApplicationPerCandidateAndPosition",
      "applicationNumberFromSequence",
      "applicationStartsInScreening"
    ],
    "advanceToInterview": [
      "recruiterMovesScreeningAndInterview"
    ],
    "rejectApplication": [
      "rejectionRequiresReason",
      "recruiterMovesScreeningAndInterview"
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
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.appliedAt": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.candidateId": [
      "applicationsInbox"
    ],
    "Application.details.daysInPipeline": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.details.isActive": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Application.details.rejection.reason": [
      "applicationsInbox"
    ],
    "Application.jobPositionId": [
      "applicationsInbox"
    ],
    "Application.status": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "Candidate.details.hiringPipeline.source": [
      "applicationsInbox"
    ],
    "Candidate.details.identification.name": [
      "applicationsInbox"
    ],
    "CandidateEmail.details.contactChannel.value": [
      "applicationsInbox"
    ],
    "HiringManager.details.identification.name": [
      "pipelineHighlights"
    ],
    "JobPosition.department": [
      "pipelineHighlights"
    ],
    "JobPosition.details.applicationsByStage": [
      "pipelineHighlights"
    ],
    "JobPosition.details.headcount": [
      "pipelineHighlights"
    ],
    "JobPosition.details.hiresSoFar": [
      "pipelineHighlights"
    ],
    "JobPosition.details.isFilled": [
      "pipelineHighlights"
    ],
    "JobPosition.details.remainingOpenings": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "JobPosition.hiringManagerId": [
      "pipelineHighlights"
    ],
    "JobPosition.status": [
      "applicationsInbox",
      "pipelineHighlights"
    ],
    "JobPosition.title": [
      "applicationsInbox",
      "pipelineHighlights"
    ]
  }
} as const;
