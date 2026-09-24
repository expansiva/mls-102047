export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "ordenServicio",
  "pageId": "ordenes_tecnico",
  "pageName": "Órdenes de servicio",
  "baseClassName": "OrdenesTecnicoShared",
  "routePattern": "/ordenes_tecnico",
  "contractRef": {
    "defPath": "l2/ordenServicio/web/contracts/ordenes_tecnico.defs.ts",
    "calls": [
      {
        "actionId": "emitirPresupuesto",
        "routeConst": "emitirPresupuestoRoute",
        "inputType": "EmitirPresupuestoInput",
        "outputType": "EmitirPresupuestoOutput"
      },
      {
        "actionId": "marcarLista",
        "routeConst": "marcarListaRoute",
        "inputType": "MarcarListaInput",
        "outputType": "MarcarListaOutput"
      },
      {
        "actionId": "updateOrdenServicio",
        "routeConst": "updateOrdenServicioRoute",
        "inputType": "UpdateOrdenServicioInput",
        "outputType": "UpdateOrdenServicioOutput"
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
      "stateKey": "ui.ordenes_tecnico.pageStatus",
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
      "stateKey": "ui.ordenes_tecnico.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "emitirPresupuesto",
        "marcarLista",
        "updateOrdenServicio"
      ]
    },
    {
      "stateKey": "ui.ordenes_tecnico.emitirPresupuesto.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "emitirPresupuesto",
      "contractRef": "EmitirPresupuestoInput.OrdenServicio.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.emitirPresupuesto.status",
      "name": "emitirPresupuestoStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "emitirPresupuesto"
    },
    {
      "stateKey": "ui.ordenes_tecnico.emitirPresupuesto.error",
      "name": "emitirPresupuestoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "emitirPresupuesto"
    },
    {
      "stateKey": "ui.ordenes_tecnico.emitirPresupuesto.result",
      "name": "emitirPresupuestoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "emitirPresupuesto",
      "contractRef": "EmitirPresupuestoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_tecnico.marcarLista.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "marcarLista",
      "contractRef": "MarcarListaInput.OrdenServicio.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.marcarLista.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "marcarLista",
      "contractRef": "MarcarListaInput.OrdenServicio.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.marcarLista.input.details_repairPerformed",
      "name": "repairPerformed",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "marcarLista",
      "contractRef": "MarcarListaInput.OrdenServicio.details.repairPerformed",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_tecnico.marcarLista.status",
      "name": "marcarListaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "marcarLista"
    },
    {
      "stateKey": "ui.ordenes_tecnico.marcarLista.error",
      "name": "marcarListaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "marcarLista"
    },
    {
      "stateKey": "ui.ordenes_tecnico.marcarLista.result",
      "name": "marcarListaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "marcarLista",
      "contractRef": "MarcarListaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.serviceOrderNumber",
      "name": "serviceOrderNumber",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.serviceOrderNumber",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.customerId",
      "name": "customerId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.customerId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.deviceId",
      "name": "deviceId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.deviceId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_reportedDefect",
      "name": "reportedDefect",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.reportedDefect",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_diagnosis",
      "name": "diagnosis",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.diagnosis",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts",
      "name": "requiredParts",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.requiredParts",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_description",
      "name": "description",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.requiredParts.description",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_quantity",
      "name": "quantity",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.requiredParts.quantity",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_internalCost",
      "name": "internalCost",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.requiredParts.internalCost",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_budgetAmount",
      "name": "budgetAmount",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.budgetAmount",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_technicianNotes",
      "name": "technicianNotes",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.technicianNotes",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_repairPerformed",
      "name": "repairPerformed",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioInput.OrdenServicio.details.repairPerformed",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.status",
      "name": "updateOrdenServicioStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.error",
      "name": "updateOrdenServicioError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.result",
      "name": "updateOrdenServicioResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateOrdenServicio",
      "contractRef": "UpdateOrdenServicioOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.id",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.serviceOrderNumber",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.customerId",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.deviceId",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.status",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.page",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.status",
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
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.error",
      "name": "listOrdenServicioError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listOrdenServicio"
    },
    {
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.result",
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
      "actionId": "setEmitirPresupuestoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.emitirPresupuesto.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.emitirPresupuesto.input.id"
    },
    {
      "actionId": "emitirPresupuesto",
      "kind": "command",
      "commandRef": "emitirPresupuesto",
      "routeRef": "emitirPresupuestoRoute",
      "inputTypeRef": "EmitirPresupuestoInput",
      "outputTypeRef": "EmitirPresupuestoOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.emitirPresupuesto.input.id"
      ],
      "outputStateKeys": [
        "ui.ordenes_tecnico.emitirPresupuesto.result"
      ],
      "statusStateKey": "ui.ordenes_tecnico.emitirPresupuesto.status",
      "errorStateKey": "ui.ordenes_tecnico.emitirPresupuesto.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ]
    },
    {
      "actionId": "setMarcarListaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.marcarLista.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.marcarLista.input.id"
    },
    {
      "actionId": "setMarcarListaDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.marcarLista.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.marcarLista.input.details"
    },
    {
      "actionId": "setMarcarListaDetailsRepairPerformed",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.marcarLista.input.details_repairPerformed"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.marcarLista.input.details_repairPerformed"
    },
    {
      "actionId": "marcarLista",
      "kind": "command",
      "commandRef": "marcarLista",
      "routeRef": "marcarListaRoute",
      "inputTypeRef": "MarcarListaInput",
      "outputTypeRef": "MarcarListaOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.marcarLista.input.id",
        "ui.ordenes_tecnico.marcarLista.input.details",
        "ui.ordenes_tecnico.marcarLista.input.details_repairPerformed"
      ],
      "outputStateKeys": [
        "ui.ordenes_tecnico.marcarLista.result"
      ],
      "statusStateKey": "ui.ordenes_tecnico.marcarLista.status",
      "errorStateKey": "ui.ordenes_tecnico.marcarLista.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ]
    },
    {
      "actionId": "setUpdateOrdenServicioId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.id"
    },
    {
      "actionId": "setUpdateOrdenServicioServiceOrderNumber",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.serviceOrderNumber"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.serviceOrderNumber"
    },
    {
      "actionId": "setUpdateOrdenServicioCustomerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.customerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.customerId"
    },
    {
      "actionId": "setUpdateOrdenServicioDeviceId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.deviceId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.deviceId"
    },
    {
      "actionId": "setUpdateOrdenServicioStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.status"
    },
    {
      "actionId": "setUpdateOrdenServicioDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsReportedDefect",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_reportedDefect"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_reportedDefect"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsDiagnosis",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_diagnosis"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_diagnosis"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsRequiredParts",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsRequiredPartsDescription",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_description"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_description"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsRequiredPartsQuantity",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_quantity"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_quantity"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsRequiredPartsInternalCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_internalCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_internalCost"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsBudgetAmount",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_budgetAmount"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_budgetAmount"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsTechnicianNotes",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_technicianNotes"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_technicianNotes"
    },
    {
      "actionId": "setUpdateOrdenServicioDetailsRepairPerformed",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_repairPerformed"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.updateOrdenServicio.input.details_repairPerformed"
    },
    {
      "actionId": "updateOrdenServicio",
      "kind": "command",
      "commandRef": "updateOrdenServicio",
      "routeRef": "updateOrdenServicioRoute",
      "inputTypeRef": "UpdateOrdenServicioInput",
      "outputTypeRef": "UpdateOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.id",
        "ui.ordenes_tecnico.updateOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_tecnico.updateOrdenServicio.input.customerId",
        "ui.ordenes_tecnico.updateOrdenServicio.input.deviceId",
        "ui.ordenes_tecnico.updateOrdenServicio.input.status",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_reportedDefect",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_diagnosis",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_description",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_quantity",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_internalCost",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_budgetAmount",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_technicianNotes",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_repairPerformed"
      ],
      "outputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.result"
      ],
      "statusStateKey": "ui.ordenes_tecnico.updateOrdenServicio.status",
      "errorStateKey": "ui.ordenes_tecnico.updateOrdenServicio.error",
      "refreshActionIds": [
        "listOrdenServicio"
      ]
    },
    {
      "actionId": "setListOrdenServicioId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.id"
    },
    {
      "actionId": "setListOrdenServicioServiceOrderNumber",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.serviceOrderNumber"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.serviceOrderNumber"
    },
    {
      "actionId": "setListOrdenServicioCustomerId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.customerId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.customerId"
    },
    {
      "actionId": "setListOrdenServicioDeviceId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.deviceId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.deviceId"
    },
    {
      "actionId": "setListOrdenServicioStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.status"
    },
    {
      "actionId": "setListOrdenServicioPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordenes_tecnico.listOrdenServicio.input.page"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "commandRef": "listOrdenServicio",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.id",
        "ui.ordenes_tecnico.listOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_tecnico.listOrdenServicio.input.customerId",
        "ui.ordenes_tecnico.listOrdenServicio.input.deviceId",
        "ui.ordenes_tecnico.listOrdenServicio.input.status",
        "ui.ordenes_tecnico.listOrdenServicio.input.page"
      ],
      "outputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.result"
      ],
      "statusStateKey": "ui.ordenes_tecnico.listOrdenServicio.status",
      "errorStateKey": "ui.ordenes_tecnico.listOrdenServicio.error",
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
      "value": "emitirPresupuesto",
      "kind": "command",
      "actionId": "emitirPresupuesto",
      "preconditions": [
        "ui.ordenes_tecnico.emitirPresupuesto.input.id"
      ]
    },
    {
      "value": "marcarLista",
      "kind": "command",
      "actionId": "marcarLista",
      "preconditions": [
        "ui.ordenes_tecnico.marcarLista.input.id"
      ]
    },
    {
      "value": "updateOrdenServicio",
      "kind": "command",
      "actionId": "updateOrdenServicio",
      "preconditions": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "emitirPresupuesto",
      "kind": "command",
      "routeRef": "emitirPresupuestoRoute",
      "inputTypeRef": "EmitirPresupuestoInput",
      "outputTypeRef": "EmitirPresupuestoOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.emitirPresupuesto.input.id"
      ],
      "resultStateKey": "ui.ordenes_tecnico.emitirPresupuesto.result"
    },
    {
      "actionId": "marcarLista",
      "kind": "command",
      "routeRef": "marcarListaRoute",
      "inputTypeRef": "MarcarListaInput",
      "outputTypeRef": "MarcarListaOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.marcarLista.input.id",
        "ui.ordenes_tecnico.marcarLista.input.details",
        "ui.ordenes_tecnico.marcarLista.input.details_repairPerformed"
      ],
      "resultStateKey": "ui.ordenes_tecnico.marcarLista.result"
    },
    {
      "actionId": "updateOrdenServicio",
      "kind": "command",
      "routeRef": "updateOrdenServicioRoute",
      "inputTypeRef": "UpdateOrdenServicioInput",
      "outputTypeRef": "UpdateOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.updateOrdenServicio.input.id",
        "ui.ordenes_tecnico.updateOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_tecnico.updateOrdenServicio.input.customerId",
        "ui.ordenes_tecnico.updateOrdenServicio.input.deviceId",
        "ui.ordenes_tecnico.updateOrdenServicio.input.status",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_reportedDefect",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_diagnosis",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_description",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_quantity",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_requiredParts_internalCost",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_budgetAmount",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_technicianNotes",
        "ui.ordenes_tecnico.updateOrdenServicio.input.details_repairPerformed"
      ],
      "resultStateKey": "ui.ordenes_tecnico.updateOrdenServicio.result"
    },
    {
      "actionId": "listOrdenServicio",
      "kind": "query",
      "routeRef": "listOrdenServicioRoute",
      "inputTypeRef": "ListOrdenServicioInput",
      "outputTypeRef": "ListOrdenServicioOutput",
      "inputStateKeys": [
        "ui.ordenes_tecnico.listOrdenServicio.input.id",
        "ui.ordenes_tecnico.listOrdenServicio.input.serviceOrderNumber",
        "ui.ordenes_tecnico.listOrdenServicio.input.customerId",
        "ui.ordenes_tecnico.listOrdenServicio.input.deviceId",
        "ui.ordenes_tecnico.listOrdenServicio.input.status",
        "ui.ordenes_tecnico.listOrdenServicio.input.page"
      ],
      "resultStateKey": "ui.ordenes_tecnico.listOrdenServicio.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "ordenes_tecnico__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/ordenServicio/web/shared/ordenes_tecnico.defs.ts",
    "outputPath": "l2/ordenServicio/web/shared/ordenes_tecnico.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/contracts/ordenes_tecnico.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
