export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "hiringPipeline",
  "pageId": "recruiter_home",
  "pageName": "Home",
  "baseClassName": "RecruiterHomeShared",
  "routePattern": "/recruiter_home",
  "contractRef": {
    "defPath": "l2/hiringPipeline/web/contracts/recruiter_home.defs.ts",
    "calls": [
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
      "stateKey": "ui.recruiter_home.pageStatus",
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
      "stateKey": "ui.recruiter_home.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base"
      ]
    },
    {
      "stateKey": "ui.recruiter_home.listJobPosition.input.id",
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
      "stateKey": "ui.recruiter_home.listJobPosition.input.title",
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
      "stateKey": "ui.recruiter_home.listJobPosition.input.hiringManagerId",
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
      "stateKey": "ui.recruiter_home.listJobPosition.input.status",
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
      "stateKey": "ui.recruiter_home.listJobPosition.input.page",
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
      "stateKey": "ui.recruiter_home.listJobPosition.status",
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
      "stateKey": "ui.recruiter_home.listJobPosition.error",
      "name": "listJobPositionError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listJobPosition"
    },
    {
      "stateKey": "ui.recruiter_home.listJobPosition.result",
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
      "actionId": "setListJobPositionId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.recruiter_home.listJobPosition.input.id"
    },
    {
      "actionId": "setListJobPositionTitle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.title"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.recruiter_home.listJobPosition.input.title"
    },
    {
      "actionId": "setListJobPositionHiringManagerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.hiringManagerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.recruiter_home.listJobPosition.input.hiringManagerId"
    },
    {
      "actionId": "setListJobPositionStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.recruiter_home.listJobPosition.input.status"
    },
    {
      "actionId": "setListJobPositionPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.recruiter_home.listJobPosition.input.page"
    },
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "commandRef": "listJobPosition",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.id",
        "ui.recruiter_home.listJobPosition.input.title",
        "ui.recruiter_home.listJobPosition.input.hiringManagerId",
        "ui.recruiter_home.listJobPosition.input.status",
        "ui.recruiter_home.listJobPosition.input.page"
      ],
      "outputStateKeys": [
        "ui.recruiter_home.listJobPosition.result"
      ],
      "statusStateKey": "ui.recruiter_home.listJobPosition.status",
      "errorStateKey": "ui.recruiter_home.listJobPosition.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listJobPosition",
      "preconditions": []
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "listJobPosition",
      "kind": "query",
      "routeRef": "listJobPositionRoute",
      "inputTypeRef": "ListJobPositionInput",
      "outputTypeRef": "ListJobPositionOutput",
      "inputStateKeys": [
        "ui.recruiter_home.listJobPosition.input.id",
        "ui.recruiter_home.listJobPosition.input.title",
        "ui.recruiter_home.listJobPosition.input.hiringManagerId",
        "ui.recruiter_home.listJobPosition.input.status",
        "ui.recruiter_home.listJobPosition.input.page"
      ],
      "resultStateKey": "ui.recruiter_home.listJobPosition.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "recruiter_home__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/hiringPipeline/web/shared/recruiter_home.defs.ts",
    "outputPath": "l2/hiringPipeline/web/shared/recruiter_home.ts",
    "dependsFiles": [
      "l2/hiringPipeline/web/contracts/recruiter_home.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
