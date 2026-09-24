export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "ordenServicio",
  "pageId": "ordenes_recepcionista",
  "pageName": "Órdenes de servicio",
  "baseClassName": "OrdenesRecepcionistaShared",
  "routePattern": "/ordenes_recepcionista",
  "contractRef": {
    "defPath": "l2/ordenServicio/web/contracts/ordenes_recepcionista.defs.ts",
    "calls": [
      {
        "actionId": "createOrdenServicio",
        "routeConst": "createOrdenServicioRoute",
        "inputType": "CreateOrdenServicioInput",
        "outputType": "CreateOrdenServicioOutput"
      },
      {
        "actionId": "entregarYfinalizar",
        "routeConst": "entregarYfinalizarRoute",
        "inputType": "EntregarYfinalizarInput",
        "outputType": "EntregarYfinalizarOutput"
      },
      {
        "actionId": "listOrdenServicio",
        "routeConst": "listOrdenServicioRoute",
        "inputType": "ListOrdenServicioInput",
        "outputType": "ListOrdenServicioOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.ordenes_recepcionista.pageStatus",
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
      "stateKey": "ui.ordenes_recepcionista.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createOrdenServicio",
        "entregarYfinalizar"
      ]
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.serviceOrderNumber",
      "name": "serviceOrderNumber",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.serviceOrderNumber",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.customerId",
      "name": "customerId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.customerId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.deviceId",
      "name": "deviceId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.deviceId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_reportedDefect",
      "name": "reportedDefect",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.details.reportedDefect",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_diagnosis",
      "name": "diagnosis",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.details.diagnosis",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_budgetAmount",
      "name": "budgetAmount",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.details.budgetAmount",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_repairPerformed",
      "name": "repairPerformed",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioInput.OrdenServicio.details.repairPerformed",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.status",
      "name": "createOrdenServicioStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.error",
      "name": "createOrdenServicioError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.result",
      "name": "createOrdenServicioResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createOrdenServicio",
      "contractRef": "CreateOrdenServicioOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.entregarYfinalizar.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "entregarYfinalizar",
      "contractRef": "EntregarYfinalizarInput.OrdenServicio.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.entregarYfinalizar.status",
      "name": "entregarYfinalizarStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "entregarYfinalizar"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.entregarYfinalizar.error",
      "name": "entregarYfinalizarError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "entregarYfinalizar"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.entregarYfinalizar.result",
      "name": "entregarYfinalizarResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "entregarYfinalizar",
      "contractRef": "EntregarYfinalizarOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioInput.OrdenServicio.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.serviceOrderNumber",
      "name": "serviceOrderNumber",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioInput.OrdenServicio.serviceOrderNumber",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.customerId",
      "name": "customerId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioInput.OrdenServicio.customerId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.deviceId",
      "name": "deviceId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioInput.OrdenServicio.deviceId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioInput.OrdenServicio.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioInput.OrdenServicio.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.status",
      "name": "listOrdenServicioStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.error",
      "name": "listOrdenServicioError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.result",
      "name": "listOrdenServicioResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listOrdenServicio",
      "contractRef": "ListOrdenServicioOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreateOrdenServicioServiceOrderNumber",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.serviceOrderNumber"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.serviceOrderNumber"
    },
    {
      "actionId": "setCreateOrdenServicioCustomerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.customerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.customerId"
    },
    {
      "actionId": "setCreateOrdenServicioDeviceId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.deviceId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.deviceId"
    },
    {
      "actionId": "setCreateOrdenServicioStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.status"
    },
    {
      "actionId": "setCreateOrdenServicioDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details"
    },
    {
      "actionId": "setCreateOrdenServicioDetailsReportedDefect",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_reportedDefect"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_reportedDefect"
    },
    {
      "actionId": "setCreateOrdenServicioDetailsDiagnosis",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_diagnosis"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_diagnosis"
    },
    {
      "actionId": "setCreateOrdenServicioDetailsBudgetAmount",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_budgetAmount"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_budgetAmount"
    },
    {
      "actionId": "setCreateOrdenServicioDetailsRepairPerformed",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_repairPerformed"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.createOrdenServicio.input.details_repairPerformed"
    },
    {
      "actionId": "createOrdenServicio",
      "kind": "command",
      "commandRef": "createOrdenServicio",
      "routeRef": "createOrdenServicioRoute",
      "inputTypeRef": "CreateOrdenServicioInput",
      "outputTypeRef": "CreateOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_recepcionista.createOrdenServicio.input.customerId",
        "ui.ordenes_recepcionista.createOrdenServicio.input.deviceId",
        "ui.ordenes_recepcionista.createOrdenServicio.input.status",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_reportedDefect",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_diagnosis",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_budgetAmount",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_repairPerformed"
      ],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.result"
      ],
      "statusStateKey": "ui.ordenes_recepcionista.createOrdenServicio.status",
      "errorStateKey": "ui.ordenes_recepcionista.createOrdenServicio.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ]
    },
    {
      "actionId": "setEntregarYfinalizarId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.entregarYfinalizar.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.entregarYfinalizar.input.id"
    },
    {
      "actionId": "entregarYfinalizar",
      "kind": "command",
      "commandRef": "entregarYfinalizar",
      "routeRef": "entregarYfinalizarRoute",
      "inputTypeRef": "EntregarYfinalizarInput",
      "outputTypeRef": "EntregarYfinalizarOutput",
      "inputStateKeys": [
        "ui.ordenes_recepcionista.entregarYfinalizar.input.id"
      ],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.entregarYfinalizar.result"
      ],
      "statusStateKey": "ui.ordenes_recepcionista.entregarYfinalizar.status",
      "errorStateKey": "ui.ordenes_recepcionista.entregarYfinalizar.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ]
    },
    {
      "actionId": "setListOrdenServicioId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.id"
    },
    {
      "actionId": "setListOrdenServicioServiceOrderNumber",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.serviceOrderNumber"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.serviceOrderNumber"
    },
    {
      "actionId": "setListOrdenServicioCustomerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.customerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.customerId"
    },
    {
      "actionId": "setListOrdenServicioDeviceId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.deviceId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.deviceId"
    },
    {
      "actionId": "setListOrdenServicioStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.status"
    },
    {
      "actionId": "setListOrdenServicioPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_recepcionista.listOrdenServicio.input.page"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "commandRef": "listOrdenServicio",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.id",
        "ui.ordenes_recepcionista.listOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_recepcionista.listOrdenServicio.input.customerId",
        "ui.ordenes_recepcionista.listOrdenServicio.input.deviceId",
        "ui.ordenes_recepcionista.listOrdenServicio.input.status",
        "ui.ordenes_recepcionista.listOrdenServicio.input.page"
      ],
      "outputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.result"
      ],
      "statusStateKey": "ui.ordenes_recepcionista.listOrdenServicio.status",
      "errorStateKey": "ui.ordenes_recepcionista.listOrdenServicio.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listOrdenServicio",
      "preconditions": []
    },
    {
      "value": "createOrdenServicio",
      "kind": "command",
      "actionId": "createOrdenServicio",
      "preconditions": []
    },
    {
      "value": "entregarYfinalizar",
      "kind": "command",
      "actionId": "entregarYfinalizar",
      "preconditions": [
        "ui.ordenes_recepcionista.entregarYfinalizar.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createOrdenServicio",
      "kind": "command",
      "routeRef": "createOrdenServicioRoute",
      "inputTypeRef": "CreateOrdenServicioInput",
      "outputTypeRef": "CreateOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_recepcionista.createOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_recepcionista.createOrdenServicio.input.customerId",
        "ui.ordenes_recepcionista.createOrdenServicio.input.deviceId",
        "ui.ordenes_recepcionista.createOrdenServicio.input.status",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_reportedDefect",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_diagnosis",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_budgetAmount",
        "ui.ordenes_recepcionista.createOrdenServicio.input.details_repairPerformed"
      ],
      "resultStateKey": "ui.ordenes_recepcionista.createOrdenServicio.result"
    },
    {
      "actionId": "entregarYfinalizar",
      "kind": "command",
      "routeRef": "entregarYfinalizarRoute",
      "inputTypeRef": "EntregarYfinalizarInput",
      "outputTypeRef": "EntregarYfinalizarOutput",
      "inputStateKeys": [
        "ui.ordenes_recepcionista.entregarYfinalizar.input.id"
      ],
      "resultStateKey": "ui.ordenes_recepcionista.entregarYfinalizar.result"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_recepcionista.listOrdenServicio.input.id",
        "ui.ordenes_recepcionista.listOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_recepcionista.listOrdenServicio.input.customerId",
        "ui.ordenes_recepcionista.listOrdenServicio.input.deviceId",
        "ui.ordenes_recepcionista.listOrdenServicio.input.status",
        "ui.ordenes_recepcionista.listOrdenServicio.input.page"
      ],
      "resultStateKey": "ui.ordenes_recepcionista.listOrdenServicio.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "ordenes_recepcionista__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/ordenServicio/web/shared/ordenes_recepcionista.defs.ts",
    "outputPath": "l2/ordenServicio/web/shared/ordenes_recepcionista.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/contracts/ordenes_recepcionista.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
