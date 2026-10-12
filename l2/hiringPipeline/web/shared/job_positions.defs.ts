/// <mls fileReference="_102047_/l2/hiringPipeline/web/shared/job_positions.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "status": {
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
      "search": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:positionList",
        "persist": true
      },
      "page": {
        "type": "number",
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
        "effect": "filter:positionDetail",
        "persist": true
      },
      "name": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:openPositionForm",
        "persist": true
      },
      "jobPositionId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:positionDetail",
        "persist": true
      },
      "hiringManagerId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:openPositionForm",
        "persist": false
      }
    }
  },
  "forms": {
    "openJobPosition": {
      "organism": "openPositionForm",
      "submit": "openJobPosition"
    }
  },
  "requests": {
    "listPositions": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "positions"
      ]
    },
    "getPosition": {
      "kind": "qry",
      "trigger": "getPosition",
      "returns": [
        "position"
      ]
    },
    "searchHiringManagers": {
      "kind": "qry",
      "trigger": "searchHiringManagers",
      "returns": [
        "hiringManagers"
      ]
    },
    "openJobPosition": {
      "kind": "cmd",
      "trigger": "openJobPosition",
      "returns": [
        "position"
      ],
      "writes": "JobPosition.create"
    }
  },
  "states": {
    "positions": {
      "source": "listPositions.positions",
      "description": "One job position in the overview list with its hiring manager and fill progress.",
      "organisms": [
        "positionList"
      ]
    },
    "hiringManagers": {
      "source": "searchHiringManagers.hiringManagers",
      "description": "An active hiring manager offered in the open position form; id is the value that goes into JobPosition.hiringManagerId.",
      "organisms": [
        "openPositionForm"
      ]
    },
    "position": {
      "source": "getPosition.position",
      "description": "The full job position for the detail and the timeline, with its hiring manager and contacts.",
      "organisms": [
        "positionDetail",
        "positionTimeline"
      ]
    },
    "selectedJobPosition": {
      "source": "entry.params.jobPositionId",
      "description": "The full job position for the detail and the timeline, with its hiring manager and contacts.",
      "organisms": [
        "positionDetail",
        "positionList"
      ]
    }
  },
  "functions": {
    "listPositions": {
      "description": "Loads the page of job positions the recruiter scans, each with its hiring manager name and fill progress, so an open position can be picked for review or for an application.",
      "calls": "listPositions",
      "sets": "positions"
    },
    "getPosition": {
      "description": "Loads the selected job position for the detail and the timeline in one call.",
      "calls": "getPosition",
      "sets": "position"
    },
    "searchHiringManagers": {
      "description": "Offers the hiring managers the recruiter can assign to a new position in the open position form.",
      "calls": "searchHiringManagers",
      "sets": "hiringManagers"
    },
    "openJobPosition": {
      "description": "Opens a new job position from the form without leaving the overview. (positions.items: upsert)",
      "calls": "openJobPosition",
      "sets": "position",
      "updates": [
        "positions"
      ]
    },
    "applyCandidateToPosition": {
      "description": "All job positions with their hiring manager, headcount, hires so far, remaining openings and filled status. Selecting a position opens its details. From an open position the recruiter can go and record an application for a candidate.",
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
        "searchHiringManagers",
        "openJobPosition"
      ]
    },
    {
      "step": "openJobPosition/reviewPosition",
      "organisms": [
        "positionDetail",
        "positionTimeline"
      ],
      "functions": [
        "getPosition"
      ]
    },
    {
      "step": "recordApplication/findPosition",
      "organisms": [
        "positionList"
      ],
      "functions": [
        "listPositions"
      ]
    },
    {
      "step": "recordApplication/findCandidate",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    },
    {
      "step": "recordApplication/createApplication",
      "organisms": [],
      "functions": [],
      "continuesIn": "applications"
    }
  ],
  "rules": {
    "listPositions": [
      "remainingOpeningsCalculated",
      "positionClosesWhenHeadcountFilled"
    ],
    "getPosition": [
      "remainingOpeningsCalculated",
      "positionClosesWhenHeadcountFilled",
      "closePositionWhenHeadcountFilled"
    ],
    "searchHiringManagers": [
      "inactiveHiringManagerCannotBeAssigned"
    ],
    "openJobPosition": [
      "headcountAtLeastOne",
      "inactiveHiringManagerCannotBeAssigned",
      "remainingOpeningsCalculated"
    ]
  },
  "access": {
    "actors": [
      "recruiter"
    ],
    "grants": [
      "recruiterPipeline",
      "recruiterHiringManagers"
    ]
  },
  "fields": {
    "HiringManager.details.base.contacts": [
      "positionDetail"
    ],
    "HiringManager.details.identification.name": [
      "openPositionForm",
      "positionDetail",
      "positionList"
    ],
    "HiringManager.details.identification.status": [
      "openPositionForm"
    ],
    "JobPosition.department": [
      "openPositionForm",
      "positionDetail",
      "positionList"
    ],
    "JobPosition.details.applicationsByStage": [
      "positionDetail"
    ],
    "JobPosition.details.closedAt": [
      "positionTimeline"
    ],
    "JobPosition.details.description": [
      "openPositionForm",
      "positionDetail"
    ],
    "JobPosition.details.headcount": [
      "openPositionForm",
      "positionDetail",
      "positionList",
      "positionTimeline"
    ],
    "JobPosition.details.hiresSoFar": [
      "positionDetail",
      "positionList",
      "positionTimeline"
    ],
    "JobPosition.details.isFilled": [
      "positionDetail",
      "positionList"
    ],
    "JobPosition.details.remainingOpenings": [
      "positionDetail",
      "positionList"
    ],
    "JobPosition.hiringManagerId": [
      "openPositionForm",
      "positionDetail",
      "positionList"
    ],
    "JobPosition.openedAt": [
      "positionDetail",
      "positionList",
      "positionTimeline"
    ],
    "JobPosition.status": [
      "positionDetail",
      "positionList",
      "positionTimeline"
    ],
    "JobPosition.title": [
      "openPositionForm",
      "positionDetail",
      "positionList"
    ]
  }
} as const;
