/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/my_pipeline_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
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
    "declineApplication": {
      "organism": "applicationsWaitingForMe",
      "submit": "declineApplication"
    }
  },
  "requests": {
    "getMyPipelineHome": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "hiringManager",
        "waitingForMe",
        "waitingOfferDecisions",
        "waitingHireConfirmations",
        "positions",
        "activeApplications",
        "activeApplicationsCount"
      ]
    },
    "extendOffer": {
      "kind": "cmd",
      "trigger": "extendOffer",
      "returns": [
        "application",
        "activeApplication",
        "position",
        "waitingOfferDecisions",
        "waitingHireConfirmations"
      ],
      "writes": "Application.extendOffer"
    },
    "declineApplication": {
      "kind": "cmd",
      "trigger": "declineApplication",
      "returns": [
        "application",
        "activeApplication",
        "position",
        "waitingOfferDecisions",
        "waitingHireConfirmations"
      ],
      "writes": "Application.reject"
    },
    "confirmHire": {
      "kind": "cmd",
      "trigger": "confirmHire",
      "returns": [
        "application",
        "activeApplication",
        "position",
        "waitingOfferDecisions",
        "waitingHireConfirmations"
      ],
      "writes": "Application.hire"
    }
  },
  "states": {
    "waitingForMe": {
      "source": "getMyPipelineHome.waitingForMe",
      "description": "An application waiting for the hiring manager's decision (interview or offer), with candidate, e-mail and position.",
      "organisms": [
        "applicationsWaitingForMe"
      ]
    },
    "waitingOfferDecisions": {
      "source": "getMyPipelineHome.waitingOfferDecisions",
      "description": "Hiring manager name, the waiting list with its two counters, position summaries with computed indicators (including applicationsByStage per stage) and the longest-running active applications with their total, already shaped for both organisms.",
      "organisms": [
        "applicationsWaitingForMe"
      ]
    },
    "waitingHireConfirmations": {
      "source": "getMyPipelineHome.waitingHireConfirmations",
      "description": "Hiring manager name, the waiting list with its two counters, position summaries with computed indicators (including applicationsByStage per stage) and the longest-running active applications with their total, already shaped for both organisms.",
      "organisms": [
        "applicationsWaitingForMe"
      ]
    },
    "hiringManager": {
      "source": "getMyPipelineHome.hiringManager",
      "description": "Hiring manager name, the waiting list with its two counters, position summaries with computed indicators (including applicationsByStage per stage) and the longest-running active applications with their total, already shaped for both organisms.",
      "organisms": [
        "myPipelineHighlights"
      ]
    },
    "positions": {
      "source": "getMyPipelineHome.positions",
      "description": "One of the hiring manager's positions with its progress toward headcount.",
      "organisms": [
        "myPipelineHighlights"
      ]
    },
    "activeApplications": {
      "source": "getMyPipelineHome.activeApplications",
      "description": "An active application of the hiring manager's positions with its days in pipeline.",
      "organisms": [
        "myPipelineHighlights"
      ]
    },
    "activeApplicationsCount": {
      "source": "getMyPipelineHome.activeApplicationsCount",
      "description": "Hiring manager name, the waiting list with its two counters, position summaries with computed indicators (including applicationsByStage per stage) and the longest-running active applications with their total, already shaped for both organisms.",
      "organisms": [
        "myPipelineHighlights"
      ]
    }
  },
  "functions": {
    "getMyPipelineHome": {
      "description": "Loads the whole hiring manager home in one call: the decisions waiting for them, their positions' progress and their active applications.",
      "calls": "getMyPipelineHome",
      "sets": "waitingForMe",
      "updates": [
        "waitingOfferDecisions",
        "waitingHireConfirmations",
        "hiringManager",
        "positions",
        "activeApplications",
        "activeApplicationsCount"
      ]
    },
    "extendOffer": {
      "description": "Moves an interviewed application to offer on behalf of the position's hiring manager. (waitingForMe: upsert; activeApplications: upsert; positions: upsert)",
      "calls": "extendOffer",
      "sets": "waitingOfferDecisions",
      "updates": [
        "waitingHireConfirmations",
        "waitingForMe",
        "activeApplications",
        "positions"
      ]
    },
    "declineApplication": {
      "description": "Declines an application waiting for the hiring manager, closing it with a reason. (waitingForMe: remove; activeApplications: remove; positions: upsert)",
      "calls": "declineApplication",
      "sets": "waitingOfferDecisions",
      "updates": [
        "waitingHireConfirmations",
        "waitingForMe",
        "activeApplications",
        "positions"
      ]
    },
    "confirmHire": {
      "description": "Confirms an accepted offer as hired and closes the position when its headcount is filled. (waitingForMe: remove; activeApplications: remove; positions: upsert)",
      "calls": "confirmHire",
      "sets": "waitingOfferDecisions",
      "updates": [
        "waitingHireConfirmations",
        "waitingForMe",
        "activeApplications",
        "positions"
      ]
    },
    "openMyApplications": {
      "description": "Applications waiting for me: interviewed candidates for my positions where I decide whether to extend an offer or decline, and accepted offers I confirm as hired. Each item shows the candidate, the position, the stage, how many days it has been in the pipeline and, for offers, how many openings remain on the position.",
      "navigate": "my_applications"
    },
    "openMyPositions": {
      "description": "My positions with hires so far, remaining openings, applications by stage and which are already filled; my active applications and how many days each has been in the pipeline, so I see where hiring is moving and where it is stuck.",
      "navigate": "my_positions"
    },
    "openActiveApplications": {
      "description": "My positions with hires so far, remaining openings, applications by stage and which are already filled; my active applications and how many days each has been in the pipeline, so I see where hiring is moving and where it is stuck.",
      "navigate": "my_applications"
    }
  },
  "journeys": [
    {
      "step": "confirmHire/findOffer",
      "organisms": [
        "applicationsWaitingForMe"
      ],
      "functions": [
        "getMyPipelineHome"
      ]
    },
    {
      "step": "confirmHire/inspectOffer",
      "organisms": [
        "applicationsWaitingForMe"
      ],
      "functions": [
        "getMyPipelineHome"
      ]
    },
    {
      "step": "confirmHire/hire",
      "organisms": [
        "applicationsWaitingForMe"
      ],
      "functions": [
        "confirmHire"
      ]
    },
    {
      "step": "decideOffer/openApplication",
      "organisms": [
        "applicationsWaitingForMe"
      ],
      "functions": [
        "getMyPipelineHome"
      ]
    },
    {
      "step": "decideOffer/inspectCandidate",
      "organisms": [
        "applicationsWaitingForMe"
      ],
      "functions": [
        "getMyPipelineHome"
      ]
    },
    {
      "step": "decideOffer/extendOffer",
      "organisms": [
        "applicationsWaitingForMe"
      ],
      "functions": [
        "extendOffer"
      ]
    }
  ],
  "rules": {
    "getMyPipelineHome": [
      "hiringManagerSeesOwnPositions",
      "applicationActiveWhileInPipeline",
      "daysInPipelineCalculated",
      "remainingOpeningsCalculated",
      "positionClosesWhenHeadcountFilled"
    ],
    "extendOffer": [
      "onlyPositionHiringManagerDecides",
      "hiringManagerSeesOwnPositions"
    ],
    "declineApplication": [
      "rejectionRequiresReason",
      "hiringManagerSeesOwnPositions"
    ],
    "confirmHire": [
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
      "managerCandidates",
      "managerCandidateEmails",
      "managerSelf"
    ]
  },
  "fields": {
    "Application.applicationNumber": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "Application.appliedAt": [
      "applicationsWaitingForMe"
    ],
    "Application.candidateId": [
      "applicationsWaitingForMe"
    ],
    "Application.details.daysInPipeline": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "Application.details.interviewStartedAt": [
      "applicationsWaitingForMe"
    ],
    "Application.details.isActive": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "Application.details.offerExtendedAt": [
      "applicationsWaitingForMe"
    ],
    "Application.details.rejection.reason": [
      "applicationsWaitingForMe"
    ],
    "Application.jobPositionId": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "Application.status": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "Candidate.details.hiringPipeline.source": [
      "applicationsWaitingForMe"
    ],
    "Candidate.details.identification.name": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "CandidateEmail.details.contactChannel.value": [
      "applicationsWaitingForMe"
    ],
    "HiringManager.details.identification.name": [
      "myPipelineHighlights"
    ],
    "JobPosition.department": [
      "myPipelineHighlights"
    ],
    "JobPosition.details.applicationsByStage": [
      "myPipelineHighlights"
    ],
    "JobPosition.details.headcount": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "JobPosition.details.hiresSoFar": [
      "myPipelineHighlights"
    ],
    "JobPosition.details.isFilled": [
      "myPipelineHighlights"
    ],
    "JobPosition.details.remainingOpenings": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ],
    "JobPosition.openedAt": [
      "myPipelineHighlights"
    ],
    "JobPosition.status": [
      "myPipelineHighlights"
    ],
    "JobPosition.title": [
      "applicationsWaitingForMe",
      "myPipelineHighlights"
    ]
  }
} as const;
