/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/hiring_manager_home.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {}
  },
  "forms": {
    "extendOffer": {
      "organism": "decisionInbox",
      "submit": "extendOffer"
    },
    "sendBack": {
      "organism": "decisionInbox",
      "submit": "sendBack"
    }
  },
  "requests": {
    "getHiringManagerHome": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "decisions",
        "pipeline"
      ]
    },
    "extendOffer": {
      "kind": "cmd",
      "trigger": "extendOffer",
      "returns": [
        "decision",
        "pipeline"
      ],
      "writes": "Application.extendOffer"
    },
    "hireCandidate": {
      "kind": "cmd",
      "trigger": "hireCandidate",
      "returns": [
        "decisions",
        "pipeline"
      ],
      "writes": "Application.hire"
    },
    "sendBack": {
      "kind": "cmd",
      "trigger": "sendBack",
      "returns": [
        "id",
        "pipeline"
      ],
      "writes": "Application.reject"
    }
  },
  "states": {
    "decisions": {
      "source": "getHiringManagerHome.decisions",
      "description": "One application waiting for the hiring manager's decision (interview → offer or send back; offer → hire or send back).",
      "organisms": [
        "decisionInbox"
      ]
    },
    "pipeline": {
      "source": "getHiringManagerHome.pipeline",
      "description": "Pipeline reading of one position the hiring manager manages.",
      "organisms": [
        "pipelineSummary"
      ]
    }
  },
  "functions": {
    "getHiringManagerHome": {
      "description": "Loads the hiring manager home in one call: the applications waiting for her decision and the pipeline summary of the positions she manages.",
      "calls": "getHiringManagerHome",
      "sets": "decisions",
      "updates": [
        "pipeline"
      ]
    },
    "extendOffer": {
      "description": "Extends an offer to an interviewed candidate from the inbox. (decisions: upsert)",
      "calls": "extendOffer",
      "sets": "pipeline",
      "updates": [
        "decisions"
      ]
    },
    "hireCandidate": {
      "description": "Hires the candidate of an application in offer, closing the position when its headcount is filled.",
      "calls": "hireCandidate",
      "sets": "decisions",
      "updates": [
        "pipeline"
      ]
    },
    "sendBack": {
      "description": "Sends back an interviewed or offered application by declining it with a reason. (decisions: remove)",
      "calls": "sendBack",
      "sets": "pipeline",
      "updates": [
        "decisions"
      ]
    },
    "openMyPositions": {
      "description": "Active applications on my positions by stage and days in stage, and remaining openings for each position, so I can see where candidates are stuck and how close each position is to being filled.",
      "navigate": "my_positions"
    },
    "openApplication": {
      "description": "Applications waiting for my decision. For interviewed candidates I can extend an offer or send them back to the recruiter. For offers I can hire the candidate or send the application back. Each one shows the candidate, resume link, source, position, days waiting and remaining openings.",
      "navigate": "my_applications"
    }
  },
  "journeys": [
    {
      "step": "decideHire/findApplication",
      "organisms": [
        "decisionInbox"
      ],
      "functions": [
        "getHiringManagerHome"
      ]
    },
    {
      "step": "decideHire/reviewOffer",
      "organisms": [
        "decisionInbox"
      ],
      "functions": [
        "getHiringManagerHome"
      ]
    },
    {
      "step": "decideHire/checkHeadcount",
      "organisms": [
        "decisionInbox",
        "pipelineSummary"
      ],
      "functions": [
        "getHiringManagerHome"
      ]
    },
    {
      "step": "decideHire/hire",
      "organisms": [
        "decisionInbox"
      ],
      "functions": [
        "hireCandidate"
      ]
    },
    {
      "step": "decideOffer/findApplication",
      "organisms": [
        "decisionInbox"
      ],
      "functions": [
        "getHiringManagerHome"
      ]
    },
    {
      "step": "decideOffer/reviewCandidate",
      "organisms": [
        "decisionInbox"
      ],
      "functions": [
        "getHiringManagerHome"
      ]
    },
    {
      "step": "decideOffer/extendOffer",
      "organisms": [
        "decisionInbox"
      ],
      "functions": [
        "extendOffer"
      ]
    },
    {
      "step": "reviewMyPipeline/findMyPositions",
      "organisms": [
        "pipelineSummary"
      ],
      "functions": [
        "getHiringManagerHome"
      ],
      "continuesIn": "my_positions"
    },
    {
      "step": "reviewMyPipeline/inspectPosition",
      "organisms": [
        "pipelineSummary"
      ],
      "functions": [
        "getHiringManagerHome"
      ],
      "continuesIn": "my_positions"
    },
    {
      "step": "reviewMyPipeline/inspectApplications",
      "organisms": [
        "pipelineSummary"
      ],
      "functions": [
        "getHiringManagerHome"
      ]
    }
  ],
  "rules": {
    "getHiringManagerHome": [
      "applicationActiveCalculation",
      "daysInStageCalculation",
      "remainingOpeningsCalculation",
      "hiresSoFarCalculation"
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
      "remainingOpeningsCalculation"
    ],
    "sendBack": [
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
      "decisionInbox"
    ],
    "Application.candidateId": [
      "decisionInbox"
    ],
    "Application.code": [
      "decisionInbox"
    ],
    "Application.details.daysInStage": [
      "decisionInbox",
      "pipelineSummary"
    ],
    "Application.details.interview.movedAt": [
      "decisionInbox"
    ],
    "Application.details.isActive": [
      "pipelineSummary"
    ],
    "Application.details.offer.extendedAt": [
      "decisionInbox"
    ],
    "Application.details.offer.notes": [
      "decisionInbox"
    ],
    "Application.details.rejection.reason": [
      "decisionInbox"
    ],
    "Application.details.remainingOpenings": [
      "decisionInbox",
      "pipelineSummary"
    ],
    "Application.jobPositionId": [
      "decisionInbox",
      "pipelineSummary"
    ],
    "Application.stageChangedAt": [
      "decisionInbox",
      "pipelineSummary"
    ],
    "Application.status": [
      "decisionInbox",
      "pipelineSummary"
    ],
    "Candidate.details.hiringPipeline.resumeLink": [
      "decisionInbox"
    ],
    "Candidate.details.hiringPipeline.source": [
      "decisionInbox"
    ],
    "Candidate.details.identification.name": [
      "decisionInbox"
    ]
  }
} as const;
