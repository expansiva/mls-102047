export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "ordenServicio",
  "pageId": "inicio_recepcionista",
  "pageName": "Inicio",
  "baseClassName": "InicioRecepcionistaShared",
  "routePattern": "/inicio_recepcionista",
  "contractRef": {
    "defPath": "l2/ordenServicio/web/contracts/inicio_recepcionista.defs.ts",
    "calls": [
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
      "stateKey": "ui.inicio_recepcionista.pageStatus",
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
      "stateKey": "ui.inicio_recepcionista.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base"
      ]
    },
    {
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.id",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.serviceOrderNumber",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.customerId",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.deviceId",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.status",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.page",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.status",
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
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.error",
      "name": "listOrdenServicioError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listOrdenServicio"
    },
    {
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.result",
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
      "actionId": "setListOrdenServicioId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.id"
    },
    {
      "actionId": "setListOrdenServicioServiceOrderNumber",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.serviceOrderNumber"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.serviceOrderNumber"
    },
    {
      "actionId": "setListOrdenServicioCustomerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.customerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.customerId"
    },
    {
      "actionId": "setListOrdenServicioDeviceId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.deviceId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.deviceId"
    },
    {
      "actionId": "setListOrdenServicioStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.status"
    },
    {
      "actionId": "setListOrdenServicioPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.inicio_recepcionista.listOrdenServicio.input.page"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "commandRef": "listOrdenServicio",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.id",
        "ui.inicio_recepcionista.listOrdenServicio.input.serviceOrderNumber",
        "ui.inicio_recepcionista.listOrdenServicio.input.customerId",
        "ui.inicio_recepcionista.listOrdenServicio.input.deviceId",
        "ui.inicio_recepcionista.listOrdenServicio.input.status",
        "ui.inicio_recepcionista.listOrdenServicio.input.page"
      ],
      "outputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.result"
      ],
      "statusStateKey": "ui.inicio_recepcionista.listOrdenServicio.status",
      "errorStateKey": "ui.inicio_recepcionista.listOrdenServicio.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listOrdenServicio",
      "preconditions": []
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.inicio_recepcionista.listOrdenServicio.input.id",
        "ui.inicio_recepcionista.listOrdenServicio.input.serviceOrderNumber",
        "ui.inicio_recepcionista.listOrdenServicio.input.customerId",
        "ui.inicio_recepcionista.listOrdenServicio.input.deviceId",
        "ui.inicio_recepcionista.listOrdenServicio.input.status",
        "ui.inicio_recepcionista.listOrdenServicio.input.page"
      ],
      "resultStateKey": "ui.inicio_recepcionista.listOrdenServicio.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "inicio_recepcionista__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/ordenServicio/web/shared/inicio_recepcionista.defs.ts",
    "outputPath": "l2/ordenServicio/web/shared/inicio_recepcionista.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/contracts/inicio_recepcionista.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
