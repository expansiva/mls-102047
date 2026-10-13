/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/my_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:myPositionsList",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:myPositionsList",
        "persist": true
      },
      "department": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:myPositionsList",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:myPositionsList",
        "persist": true
      },
      "positionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionPipelineDetail",
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
      },
      "jobPositionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:positionPipelineDetail",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "myPositionsList": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "positions"
      ]
    },
    "myPositionDetail": {
      "kind": "qry",
      "trigger": "myPositionDetail",
      "returns": [
        "position",
        "stages",
        "closure"
      ]
    }
  },
  "states": {
    "positions": {
      "source": "myPositionsList.positions",
      "description": "One row of the hiring manager's positions list.",
      "organisms": [
        "myPositionsList"
      ]
    },
    "position": {
      "source": "myPositionDetail.position",
      "description": "Header of the chosen position with its headcount indicators.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    "stages": {
      "source": "myPositionDetail.stages",
      "description": "Applications of the position in one stage, with their count.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    "closure": {
      "source": "myPositionDetail.closure",
      "description": "Timeline of the position: opening, hires and automatic closure.",
      "organisms": [
        "positionClosureTimeline"
      ]
    },
    "selectedJobPosition": {
      "source": "entry.params.jobPositionId",
      "description": "Header of the chosen position with its headcount indicators.",
      "organisms": [
        "myPositionsList",
        "positionPipelineDetail"
      ]
    }
  },
  "functions": {
    "myPositionsList": {
      "description": "Lists the job positions the signed-in hiring manager manages, so she can find and choose one, with remaining openings visible at a glance.",
      "calls": "myPositionsList",
      "sets": "positions"
    },
    "myPositionDetail": {
      "description": "Loads everything the page shows for the chosen position in one call: headcount indicators, applications grouped by stage, and the closure timeline.",
      "calls": "myPositionDetail",
      "sets": "position",
      "updates": [
        "stages",
        "closure"
      ]
    },
    "openApplicationDecision": {
      "description": "The chosen position's headcount, hires so far, remaining openings and whether the headcount is filled, along with its applications grouped by stage, each showing candidate and days in stage. From here I can open an application to hire the candidate or send it back to the recruiter.",
      "navigate": "my_applications",
      "carries": {
        "jobPositionId": "selectedJobPosition.id"
      }
    }
  },
  "journeys": [
    {
      "step": "reviewMyPipeline/findMyPositions",
      "organisms": [
        "myPositionsList"
      ],
      "functions": [
        "myPositionsList"
      ]
    },
    {
      "step": "reviewMyPipeline/inspectPosition",
      "organisms": [
        "positionPipelineDetail",
        "positionClosureTimeline"
      ],
      "functions": [
        "myPositionDetail"
      ]
    },
    {
      "step": "reviewMyPipeline/inspectApplications",
      "organisms": [
        "positionPipelineDetail"
      ],
      "functions": [
        "myPositionDetail"
      ]
    },
    {
      "step": "decideHire/findApplication",
      "organisms": [
        "myPositionsList",
        "positionPipelineDetail"
      ],
      "functions": [
        "myPositionsList",
        "myPositionDetail"
      ]
    },
    {
      "step": "decideHire/checkHeadcount",
      "organisms": [
        "positionPipelineDetail"
      ],
      "functions": [
        "myPositionDetail"
      ]
    },
    {
      "step": "decideHire/reviewOffer",
      "organisms": [],
      "functions": [],
      "continuesIn": "my_applications"
    },
    {
      "step": "decideHire/hire",
      "organisms": [],
      "functions": [],
      "continuesIn": "my_applications"
    }
  ],
  "rules": {
    "myPositionsList": [
      "remainingOpeningsCalculation",
      "hiresSoFarCalculation"
    ],
    "myPositionDetail": [
      "hiresSoFarCalculation",
      "remainingOpeningsCalculation",
      "headcountFilledCalculation",
      "daysInStageCalculation",
      "applicationActiveCalculation",
      "closePositionWhenHeadcountFilled"
    ]
  },
  "access": {
    "actors": [
      "hiringManager"
    ],
    "grants": [
      "hiringManagerMyPositions",
      "hiringManagerMyApplications",
      "hiringManagerCandidates"
    ]
  },
  "fields": {
    "Application.code": [
      "positionClosureTimeline",
      "positionPipelineDetail"
    ],
    "Application.details.daysInStage": [
      "positionPipelineDetail"
    ],
    "Application.details.hire.decidedBy": [
      "positionClosureTimeline"
    ],
    "Application.details.hire.hiredAt": [
      "positionClosureTimeline"
    ],
    "Application.details.isActive": [
      "positionPipelineDetail"
    ],
    "Application.stageChangedAt": [
      "positionPipelineDetail"
    ],
    "Application.status": [
      "positionPipelineDetail"
    ],
    "Candidate.details.identification.name": [
      "positionClosureTimeline",
      "positionPipelineDetail"
    ],
    "JobPosition.department": [
      "myPositionsList"
    ],
    "JobPosition.details.headcount": [
      "myPositionsList",
      "positionPipelineDetail"
    ],
    "JobPosition.details.headcountFilled": [
      "positionClosureTimeline",
      "positionPipelineDetail"
    ],
    "JobPosition.details.hiresSoFar": [
      "positionPipelineDetail"
    ],
    "JobPosition.details.remainingOpenings": [
      "myPositionsList",
      "positionPipelineDetail"
    ],
    "JobPosition.openedAt": [
      "myPositionsList",
      "positionClosureTimeline"
    ],
    "JobPosition.status": [
      "myPositionsList",
      "positionClosureTimeline",
      "positionPipelineDetail"
    ],
    "JobPosition.title": [
      "myPositionsList",
      "positionPipelineDetail"
    ]
  }
} as const;
