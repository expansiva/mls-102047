/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/my_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "jobPositionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:positionPipelineDetail",
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
      }
    }
  },
  "forms": {},
  "requests": {
    "listMyPositions": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "positions"
      ]
    },
    "getPositionPipeline": {
      "kind": "qry",
      "trigger": "getPositionPipeline",
      "returns": [
        "position",
        "stageGroups",
        "history"
      ]
    }
  },
  "states": {
    "positions": {
      "source": "listMyPositions.positions",
      "description": "One position the signed-in hiring manager manages, as a list row.",
      "organisms": [
        "myPositionsList"
      ]
    },
    "position": {
      "source": "getPositionPipeline.position",
      "description": "The selected position with its numbers and hiring manager name.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    "stageGroups": {
      "source": "getPositionPipeline.stageGroups",
      "description": "Applications of the position in one stage, with the stage count.",
      "organisms": [
        "positionPipelineDetail"
      ]
    },
    "history": {
      "source": "getPositionPipeline.history",
      "description": "One event in the position's history: opened, or closed automatically when hires reached the headcount.",
      "organisms": [
        "positionHistoryTimeline"
      ]
    },
    "selectedJobPosition": {
      "source": "entry.params.jobPositionId",
      "description": "The selected position with its numbers and hiring manager name.",
      "organisms": [
        "myPositionsList",
        "positionPipelineDetail"
      ]
    }
  },
  "functions": {
    "listMyPositions": {
      "description": "Loads every job position the signed-in hiring manager manages, with its headcount numbers, so the page can show which ones still need hires.",
      "calls": "listMyPositions",
      "sets": "positions"
    },
    "getPositionPipeline": {
      "description": "Loads the selected position's detail, its applications grouped by stage and its history in one call when the hiring manager picks a position.",
      "calls": "getPositionPipeline",
      "sets": "position",
      "updates": [
        "stageGroups",
        "history"
      ]
    },
    "openMyApplications": {
      "description": "The selected position's description, headcount, hires so far and remaining openings, with its applications grouped by stage and how long each has been in the pipeline. This tells me where each candidate stands.",
      "navigate": "my_applications",
      "carries": {
        "jobPositionId": "selectedJobPosition.id"
      }
    }
  },
  "journeys": [
    {
      "step": "reviewMyPipeline/listMyPositions",
      "organisms": [
        "myPositionsList"
      ],
      "functions": [
        "listMyPositions"
      ]
    },
    {
      "step": "reviewMyPipeline/inspectPosition",
      "organisms": [
        "positionPipelineDetail",
        "positionHistoryTimeline"
      ],
      "functions": [
        "getPositionPipeline"
      ]
    }
  ],
  "rules": {
    "listMyPositions": [
      "hiringManagerSeesOwnPositions",
      "remainingOpeningsCalculated",
      "positionClosesWhenHeadcountFilled"
    ],
    "getPositionPipeline": [
      "hiringManagerSeesOwnPositions",
      "remainingOpeningsCalculated",
      "positionClosesWhenHeadcountFilled",
      "closePositionWhenHeadcountFilled",
      "daysInPipelineCalculated",
      "applicationActiveWhileInPipeline"
    ]
  },
  "access": {
    "actors": [
      "hiringManager"
    ],
    "grants": [
      "managerOwnPipeline",
      "managerCandidates",
      "managerSelf"
    ]
  },
  "fields": {
    "Application.applicationNumber": [
      "positionPipelineDetail"
    ],
    "Application.appliedAt": [
      "positionPipelineDetail"
    ],
    "Application.details.daysInPipeline": [
      "positionPipelineDetail"
    ],
    "Application.details.isActive": [
      "positionPipelineDetail"
    ],
    "Application.status": [
      "positionPipelineDetail"
    ],
    "Candidate.details.identification.name": [
      "positionPipelineDetail"
    ],
    "HiringManager.details.identification.name": [
      "positionPipelineDetail"
    ],
    "JobPosition.department": [
      "myPositionsList",
      "positionPipelineDetail"
    ],
    "JobPosition.details.applicationsByStage": [
      "positionPipelineDetail"
    ],
    "JobPosition.details.closedAt": [
      "positionHistoryTimeline"
    ],
    "JobPosition.details.description": [
      "positionPipelineDetail"
    ],
    "JobPosition.details.headcount": [
      "myPositionsList",
      "positionHistoryTimeline",
      "positionPipelineDetail"
    ],
    "JobPosition.details.hiresSoFar": [
      "myPositionsList",
      "positionHistoryTimeline",
      "positionPipelineDetail"
    ],
    "JobPosition.details.isFilled": [
      "myPositionsList",
      "positionPipelineDetail"
    ],
    "JobPosition.details.remainingOpenings": [
      "myPositionsList",
      "positionPipelineDetail"
    ],
    "JobPosition.openedAt": [
      "myPositionsList",
      "positionHistoryTimeline"
    ],
    "JobPosition.status": [
      "myPositionsList",
      "positionHistoryTimeline",
      "positionPipelineDetail"
    ],
    "JobPosition.title": [
      "myPositionsList",
      "positionPipelineDetail"
    ]
  }
} as const;
