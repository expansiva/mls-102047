export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "hiringPipeline",
  "pageId": "managed_positions",
  "pageName": "Job positions",
  "baseClassName": "ManagedPositionsShared",
  "routePattern": "/hiring_workspace/managed_positions",
  "contractRef": {
    "defPath": "l2/hiringPipeline/web/contracts/managed_positions.defs.ts",
    "calls": [
      {
        "actionId": "moveToHired",
        "routeConst": "moveToHiredRoute",
        "inputType": "MoveToHiredInput",
        "outputType": "MoveToHiredOutput"
      },
      {
        "actionId": "listApplication",
        "routeConst": "listApplicationRoute",
        "inputType": "ListApplicationInput",
        "outputType": "ListApplicationOutput"
      },
      {
        "actionId": "listJobPosition",
        "routeConst": "listJobPositionRoute",
        "inputType": "ListJobPositionInput",
        "outputType": "ListJobPositionOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.managed_positions.pageStatus",
      "name": "pageStatus",
      "kind": "pageStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "empty",
        "success",
        "error"
      ]
    },
    {
      "stateKey": "ui.managed_positions.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "offeredApplication",
        "positionHeadcount",
        "moveToHired"
      ]
    },
    {
      "stateKey": "ui.managed_positions.moveToHired.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "moveToHired",
      "contractRef": "MoveToHiredInput.Application.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.moveToHired.status",
      "name": "moveToHiredStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "moveToHired"
    },
    {
      "stateKey": "ui.managed_positions.moveToHired.error",
      "name": "moveToHiredError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "moveToHired"
    },
    {
      "stateKey": "ui.managed_positions.moveToHired.result",
      "name": "moveToHiredResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "moveToHired",
      "contractRef": "MoveToHiredOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.managed_positions.listApplication.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listApplication.input.candidateId",
      "name": "candidateId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.candidateId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listApplication.input.jobPositionId",
      "name": "jobPositionId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.jobPositionId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listApplication.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listApplication.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listApplication",
      "contractRef": "ListApplicationInput.Application.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.managed_positions.listApplication.status",
      "name": "listApplicationStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.managed_positions.listApplication.error",
      "name": "listApplicationError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listApplication"
    },
    {
      "stateKey": "ui.managed_positions.listApplication.result",
      "name": "listApplicationResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listApplication",
      "contractRef": "ListApplicationOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.input.title",
      "name": "title",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.title",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.input.hiringManagerId",
      "name": "hiringManagerId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.hiringManagerId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionInput.JobPosition.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.status",
      "name": "listJobPositionStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.error",
      "name": "listJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.managed_positions.listJobPosition.result",
      "name": "listJobPositionResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listJobPosition",
      "contractRef": "ListJobPositionOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setMoveToHiredId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.moveToHired.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.moveToHired.input.id"
    },
    {
      "actionId": "moveToHired",
      "kind": "command",
      "commandRef": "moveToHired",
      "routeRef": "moveToHiredRoute",
      "inputTypeRef": "MoveToHiredInput",
      "outputTypeRef": "MoveToHiredOutput",
      "inputStateKeys": [
        "ui.managed_positions.moveToHired.input.id"
      ],
      "outputStateKeys": [
        "ui.managed_positions.moveToHired.result"
      ],
      "statusStateKey": "ui.managed_positions.moveToHired.status",
      "errorStateKey": "ui.managed_positions.moveToHired.error",
      "refreshActionIds": [
        "listApplication",
        "listJobPosition"
      ]
    },
    {
      "actionId": "setListApplicationId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listApplication.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listApplication.input.id"
    },
    {
      "actionId": "setListApplicationCandidateId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listApplication.input.candidateId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listApplication.input.candidateId"
    },
    {
      "actionId": "setListApplicationJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listApplication.input.jobPositionId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listApplication.input.jobPositionId"
    },
    {
      "actionId": "setListApplicationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listApplication.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listApplication.input.status"
    },
    {
      "actionId": "setListApplicationPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listApplication.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listApplication.input.page"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "commandRef": "listApplication",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.managed_positions.listApplication.input.id",
        "ui.managed_positions.listApplication.input.candidateId",
        "ui.managed_positions.listApplication.input.jobPositionId",
        "ui.managed_positions.listApplication.input.status",
        "ui.managed_positions.listApplication.input.page"
      ],
      "outputStateKeys": [
        "ui.managed_positions.listApplication.result"
      ],
      "statusStateKey": "ui.managed_positions.listApplication.status",
      "errorStateKey": "ui.managed_positions.listApplication.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listJobPosition.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listJobPosition.input.id"
    },
    {
      "actionId": "setListJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listJobPosition.input.title"
    },
    {
      "actionId": "setListJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setListJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listJobPosition.input.status"
    },
    {
      "actionId": "setListJobPositionPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managed_positions.listJobPosition.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.managed_positions.listJobPosition.input.page"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "commandRef": "listJobPosition",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.managed_positions.listJobPosition.input.id",
        "ui.managed_positions.listJobPosition.input.title",
        "ui.managed_positions.listJobPosition.input.hiringManagerId",
        "ui.managed_positions.listJobPosition.input.status",
        "ui.managed_positions.listJobPosition.input.page"
      ],
      "outputStateKeys": [
        "ui.managed_positions.listJobPosition.result"
      ],
      "statusStateKey": "ui.managed_positions.listJobPosition.status",
      "errorStateKey": "ui.managed_positions.listJobPosition.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listApplication",
      "preconditions": []
    },
    {
      "value": "offeredApplication",
      "kind": "detail",
      "actionId": "listApplication",
      "preconditions": [
        "ui.managed_positions.listApplication.input.id"
      ]
    },
    {
      "value": "positionHeadcount",
      "kind": "detail",
      "actionId": "listJobPosition",
      "preconditions": [
        "ui.managed_positions.listJobPosition.input.id"
      ]
    },
    {
      "value": "moveToHired",
      "kind": "command",
      "actionId": "moveToHired",
      "preconditions": [
        "ui.managed_positions.moveToHired.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "moveToHired",
      "kind": "command",
      "routeRef": "moveToHiredRoute",
      "inputTypeRef": "MoveToHiredInput",
      "outputTypeRef": "MoveToHiredOutput",
      "inputStateKeys": [
        "ui.managed_positions.moveToHired.input.id"
      ],
      "resultStateKey": "ui.managed_positions.moveToHired.result"
    },
    {
      "actionId": "listApplication",
      "kind": "query",
      "routeRef": "listApplicationRoute",
      "inputTypeRef": "ListApplicationInput",
      "outputTypeRef": "ListApplicationOutput",
      "inputStateKeys": [
        "ui.managed_positions.listApplication.input.id",
        "ui.managed_positions.listApplication.input.candidateId",
        "ui.managed_positions.listApplication.input.jobPositionId",
        "ui.managed_positions.listApplication.input.status",
        "ui.managed_positions.listApplication.input.page"
      ],
      "resultStateKey": "ui.managed_positions.listApplication.result"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.managed_positions.listJobPosition.input.id",
        "ui.managed_positions.listJobPosition.input.title",
        "ui.managed_positions.listJobPosition.input.hiringManagerId",
        "ui.managed_positions.listJobPosition.input.status",
        "ui.managed_positions.listJobPosition.input.page"
      ],
      "resultStateKey": "ui.managed_positions.listJobPosition.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "managed_positions__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/hiringPipeline/web/shared/managed_positions.defs.ts",
    "outputPath": "l2/hiringPipeline/web/shared/managed_positions.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/contracts/managed_positions.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
