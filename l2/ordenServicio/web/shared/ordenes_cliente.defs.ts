export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "ordenServicio",
  "pageId": "ordenes_cliente",
  "pageName": "Mis órdenes",
  "baseClassName": "OrdenesClienteShared",
  "routePattern": "/cliente/ordenes_cliente",
  "contractRef": {
    "defPath": "l2/ordenServicio/web/contracts/ordenes_cliente.defs.ts",
    "calls": [
      {
        "actionId": "aprobarPresupuesto",
        "routeConst": "aprobarPresupuestoRoute",
        "inputType": "AprobarPresupuestoInput",
        "outputType": "AprobarPresupuestoOutput"
      },
      {
        "actionId": "rechazarPresupuesto",
        "routeConst": "rechazarPresupuestoRoute",
        "inputType": "RechazarPresupuestoInput",
        "outputType": "RechazarPresupuestoOutput"
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
      "stateKey": "ui.ordenes_cliente.pageStatus",
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
      "stateKey": "ui.ordenes_cliente.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "aprobarPresupuesto"
      ]
    },
    {
      "stateKey": "ui.ordenes_cliente.aprobarPresupuesto.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "aprobarPresupuesto",
      "contractRef": "AprobarPresupuestoInput.OrdenServicio.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_cliente.aprobarPresupuesto.status",
      "name": "aprobarPresupuestoStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "aprobarPresupuesto"
    },
    {
      "stateKey": "ui.ordenes_cliente.aprobarPresupuesto.error",
      "name": "aprobarPresupuestoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "aprobarPresupuesto"
    },
    {
      "stateKey": "ui.ordenes_cliente.aprobarPresupuesto.result",
      "name": "aprobarPresupuestoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "aprobarPresupuesto",
      "contractRef": "AprobarPresupuestoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_cliente.rechazarPresupuesto.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "rechazarPresupuesto",
      "contractRef": "RechazarPresupuestoInput.OrdenServicio.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_cliente.rechazarPresupuesto.status",
      "name": "rechazarPresupuestoStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "rechazarPresupuesto"
    },
    {
      "stateKey": "ui.ordenes_cliente.rechazarPresupuesto.error",
      "name": "rechazarPresupuestoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "rechazarPresupuesto"
    },
    {
      "stateKey": "ui.ordenes_cliente.rechazarPresupuesto.result",
      "name": "rechazarPresupuestoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "rechazarPresupuesto",
      "contractRef": "RechazarPresupuestoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.id",
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
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.serviceOrderNumber",
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
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.status",
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
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.page",
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
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.status",
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
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.error",
      "name": "listOrdenServicioError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.result",
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
      "actionId": "setAprobarPresupuestoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_cliente.aprobarPresupuesto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_cliente.aprobarPresupuesto.input.id"
    },
    {
      "actionId": "aprobarPresupuesto",
      "kind": "command",
      "commandRef": "aprobarPresupuesto",
      "routeRef": "aprobarPresupuestoRoute",
      "inputTypeRef": "AprobarPresupuestoInput",
      "outputTypeRef": "AprobarPresupuestoOutput",
      "inputStateKeys": [
        "ui.ordenes_cliente.aprobarPresupuesto.input.id"
      ],
      "outputStateKeys": [
        "ui.ordenes_cliente.aprobarPresupuesto.result"
      ],
      "statusStateKey": "ui.ordenes_cliente.aprobarPresupuesto.status",
      "errorStateKey": "ui.ordenes_cliente.aprobarPresupuesto.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ]
    },
    {
      "actionId": "setRechazarPresupuestoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_cliente.rechazarPresupuesto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_cliente.rechazarPresupuesto.input.id"
    },
    {
      "actionId": "rechazarPresupuesto",
      "kind": "command",
      "commandRef": "rechazarPresupuesto",
      "routeRef": "rechazarPresupuestoRoute",
      "inputTypeRef": "RechazarPresupuestoInput",
      "outputTypeRef": "RechazarPresupuestoOutput",
      "inputStateKeys": [
        "ui.ordenes_cliente.rechazarPresupuesto.input.id"
      ],
      "outputStateKeys": [
        "ui.ordenes_cliente.rechazarPresupuesto.result"
      ],
      "statusStateKey": "ui.ordenes_cliente.rechazarPresupuesto.status",
      "errorStateKey": "ui.ordenes_cliente.rechazarPresupuesto.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ],
      "confirmation": {
        "required": true,
        "title": "Confirmar rechazo del presupuesto",
        "description": "El rechazo cerrará la orden como rechazada y dejará el aparato disponible para retiro."
      }
    },
    {
      "actionId": "setListOrdenServicioId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.id"
    },
    {
      "actionId": "setListOrdenServicioServiceOrderNumber",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.input.serviceOrderNumber"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.serviceOrderNumber"
    },
    {
      "actionId": "setListOrdenServicioStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.status"
    },
    {
      "actionId": "setListOrdenServicioPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_cliente.listOrdenServicio.input.page"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "commandRef": "listOrdenServicio",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.input.id",
        "ui.ordenes_cliente.listOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_cliente.listOrdenServicio.input.status",
        "ui.ordenes_cliente.listOrdenServicio.input.page"
      ],
      "outputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.result"
      ],
      "statusStateKey": "ui.ordenes_cliente.listOrdenServicio.status",
      "errorStateKey": "ui.ordenes_cliente.listOrdenServicio.error",
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
      "value": "aprobarPresupuesto",
      "kind": "command",
      "actionId": "aprobarPresupuesto",
      "preconditions": [
        "ui.ordenes_cliente.aprobarPresupuesto.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "aprobarPresupuesto",
      "kind": "command",
      "routeRef": "aprobarPresupuestoRoute",
      "inputTypeRef": "AprobarPresupuestoInput",
      "outputTypeRef": "AprobarPresupuestoOutput",
      "inputStateKeys": [
        "ui.ordenes_cliente.aprobarPresupuesto.input.id"
      ],
      "resultStateKey": "ui.ordenes_cliente.aprobarPresupuesto.result"
    },
    {
      "actionId": "rechazarPresupuesto",
      "kind": "command",
      "routeRef": "rechazarPresupuestoRoute",
      "inputTypeRef": "RechazarPresupuestoInput",
      "outputTypeRef": "RechazarPresupuestoOutput",
      "inputStateKeys": [
        "ui.ordenes_cliente.rechazarPresupuesto.input.id"
      ],
      "resultStateKey": "ui.ordenes_cliente.rechazarPresupuesto.result"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_cliente.listOrdenServicio.input.id",
        "ui.ordenes_cliente.listOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_cliente.listOrdenServicio.input.status",
        "ui.ordenes_cliente.listOrdenServicio.input.page"
      ],
      "resultStateKey": "ui.ordenes_cliente.listOrdenServicio.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "ordenes_cliente__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/ordenServicio/web/shared/ordenes_cliente.defs.ts",
    "outputPath": "l2/ordenServicio/web/shared/ordenes_cliente.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/contracts/ordenes_cliente.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
