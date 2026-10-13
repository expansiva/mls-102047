/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/job_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionList",
        "persist": true
      },
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionList",
        "persist": true
      },
      "department": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionList",
        "persist": true
      },
      "hiringManagerId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionList",
        "persist": true
      },
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionList",
        "persist": true
      },
      "positionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionReview",
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
        "effect": "select:positionReview",
        "persist": true
      }
    }
  },
  "forms": {
    "openPosition": {
      "organism": "openPositionForm",
      "submit": "openPosition"
    }
  },
  "requests": {
    "loadJobPositionsPage": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "positions",
        "hiringManagers"
      ]
    },
    "searchPositions": {
      "kind": "qry",
      "trigger": "searchPositions",
      "returns": [
        "positions"
      ]
    },
    "getPositionReview": {
      "kind": "qry",
      "trigger": "getPositionReview",
      "returns": [
        "position",
        "closingHire"
      ]
    },
    "openPosition": {
      "kind": "cmd",
      "trigger": "openPosition",
      "returns": [
        "position"
      ],
      "writes": "JobPosition.create"
    }
  },
  "states": {
    "positions": {
      "source": "loadJobPositionsPage.positions",
      "description": "One line of the positions list with its remaining openings and hiring manager name.",
      "organisms": [
        "positionList"
      ]
    },
    "hiringManagers": {
      "source": "loadJobPositionsPage.hiringManagers",
      "description": "A hiring manager as the page shows and picks her: id and name, with status when choosing.",
      "organisms": [
        "openPositionForm"
      ]
    },
    "position": {
      "source": "getPositionReview.position",
      "description": "The selected position with its computed headcount indicators and hiring manager name.",
      "organisms": [
        "positionClosureTimeline",
        "positionReview"
      ]
    },
    "closingHire": {
      "source": "getPositionReview.closingHire",
      "description": "The hired application whose hire filled the headcount and closed the position.",
      "organisms": [
        "positionClosureTimeline"
      ]
    },
    "selectedJobPosition": {
      "source": "entry.params.jobPositionId",
      "description": "The selected position with its computed headcount indicators and hiring manager name.",
      "organisms": [
        "positionList",
        "positionReview"
      ]
    }
  },
  "functions": {
    "loadJobPositionsPage": {
      "description": "Loads everything the page shows when it opens: the first page of job positions with their remaining openings, and the active hiring managers to choose from when opening a position or filtering the list.",
      "calls": "loadJobPositionsPage",
      "sets": "positions",
      "updates": [
        "hiringManagers"
      ]
    },
    "searchPositions": {
      "description": "Finds job positions by text and filters as the recruiter searches, so she can locate the open position a candidate applies to.",
      "calls": "searchPositions",
      "sets": "positions"
    },
    "getPositionReview": {
      "description": "Loads the selected position for review together with the hire that closed it, for the review and closure timeline sections.",
      "calls": "getPositionReview",
      "sets": "position",
      "updates": [
        "closingHire"
      ]
    },
    "openPosition": {
      "description": "Opens a new job position so it can receive applications.",
      "calls": "openPosition",
      "sets": "position",
      "updates": [
        "positions",
        "hiringManagers"
      ]
    },
    "goRegisterCandidate": {
      "description": "The selected position's opening date, headcount, hires so far, remaining openings and whether the headcount is filled, so the recruiter knows if it can still take candidates.",
      "navigate": "candidates",
      "carries": {
        "jobPositionId": "selectedJobPosition.id"
      }
    },
    "goRecordApplication": {
      "description": "The selected position's opening date, headcount, hires so far, remaining openings and whether the headcount is filled, so the recruiter knows if it can still take candidates.",
      "navigate": "applications",
      "carries": {
        "jobPositionId": "selectedJobPosition.id"
      }
    }
  },
  "journeys": [
    {
      "step": "openJobPosition/createPosition",
      "organisms": [
        "openPositionForm"
      ],
      "functions": [
        "loadJobPositionsPage",
        "openPosition"
      ]
    },
    {
      "step": "openJobPosition/reviewPosition",
      "organisms": [
        "positionReview",
        "positionList"
      ],
      "functions": [
        "openPosition",
        "getPositionReview"
      ]
    },
    {
      "step": "registerCandidateApplication/findPosition",
      "organisms": [
        "positionList",
        "positionReview"
      ],
      "functions": [
        "loadJobPositionsPage",
        "searchPositions",
        "getPositionReview"
      ]
    },
    {
      "step": "registerCandidateApplication/registerCandidate",
      "organisms": [],
      "functions": [],
      "continuesIn": "candidates"
    },
    {
      "step": "registerCandidateApplication/createApplication",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    }
  ],
  "rules": {
    "loadJobPositionsPage": [
      "hiresSoFarCalculation",
      "remainingOpeningsCalculation",
      "positionRequiresHiringManager"
    ],
    "searchPositions": [
      "hiresSoFarCalculation",
      "remainingOpeningsCalculation"
    ],
    "getPositionReview": [
      "hiresSoFarCalculation",
      "remainingOpeningsCalculation",
      "headcountFilledCalculation",
      "closePositionWhenHeadcountFilled"
    ],
    "openPosition": [
      "positionHeadcountPositive",
      "positionRequiresHiringManager",
      "hiresSoFarCalculation",
      "remainingOpeningsCalculation",
      "headcountFilledCalculation"
    ]
  },
  "access": {
    "actors": [
      "recruiter"
    ],
    "grants": [
      "recruiterPositionsAndApplications",
      "recruiterHiringManagers"
    ]
  },
  "fields": {
    "Application.code": [
      "positionClosureTimeline"
    ],
    "Application.details.hire.hiredAt": [
      "positionClosureTimeline"
    ],
    "Application.jobPositionId": [
      "positionClosureTimeline"
    ],
    "Application.status": [
      "positionClosureTimeline"
    ],
    "HiringManager.details.identification.name": [
      "openPositionForm",
      "positionList",
      "positionReview"
    ],
    "HiringManager.details.identification.status": [
      "openPositionForm"
    ],
    "JobPosition.department": [
      "openPositionForm",
      "positionList",
      "positionReview"
    ],
    "JobPosition.details.description": [
      "openPositionForm",
      "positionReview"
    ],
    "JobPosition.details.headcount": [
      "openPositionForm",
      "positionReview"
    ],
    "JobPosition.details.headcountFilled": [
      "positionClosureTimeline",
      "positionReview"
    ],
    "JobPosition.details.hiresSoFar": [
      "positionReview"
    ],
    "JobPosition.details.remainingOpenings": [
      "positionList",
      "positionReview"
    ],
    "JobPosition.hiringManagerId": [
      "openPositionForm",
      "positionList",
      "positionReview"
    ],
    "JobPosition.openedAt": [
      "positionClosureTimeline",
      "positionList",
      "positionReview"
    ],
    "JobPosition.status": [
      "positionClosureTimeline",
      "positionList",
      "positionReview"
    ],
    "JobPosition.title": [
      "openPositionForm",
      "positionList",
      "positionReview"
    ]
  }
} as const;
