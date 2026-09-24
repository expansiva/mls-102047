export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "manutencaoFrota",
  "pageId": "planos_preventivos",
  "pageName": "Planos preventivos",
  "baseClassName": "PlanosPreventivosShared",
  "routePattern": "/planos_preventivos",
  "contractRef": {
    "defPath": "l2/manutencaoFrota/web/contracts/planos_preventivos.defs.ts",
    "calls": [
      {
        "actionId": "createMaintenanceOrder",
        "routeConst": "createMaintenanceOrderRoute",
        "inputType": "CreateMaintenanceOrderInput",
        "outputType": "CreateMaintenanceOrderOutput"
      },
      {
        "actionId": "createMaintenancePlan",
        "routeConst": "createMaintenancePlanRoute",
        "inputType": "CreateMaintenancePlanInput",
        "outputType": "CreateMaintenancePlanOutput"
      },
      {
        "actionId": "listMaintenanceOrder",
        "routeConst": "listMaintenanceOrderRoute",
        "inputType": "ListMaintenanceOrderInput",
        "outputType": "ListMaintenanceOrderOutput"
      },
      {
        "actionId": "listMaintenancePlan",
        "routeConst": "listMaintenancePlanRoute",
        "inputType": "ListMaintenancePlanInput",
        "outputType": "ListMaintenancePlanOutput"
      },
      {
        "actionId": "listVehicle",
        "routeConst": "listVehicleRoute",
        "inputType": "ListVehicleInput",
        "outputType": "ListVehicleOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.planos_preventivos.pageStatus",
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
      "stateKey": "ui.planos_preventivos.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createMaintenanceOrder",
        "createMaintenancePlan"
      ]
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.maintenancePlanId",
      "name": "maintenancePlanId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.maintenancePlanId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.workshopId",
      "name": "workshopId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.workshopId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.entryDate",
      "name": "entryDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.entryDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_maintenanceType",
      "name": "maintenanceType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.details.maintenanceType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_description",
      "name": "description",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.details.description",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_estimatedCost",
      "name": "estimatedCost",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.details.estimatedCost",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_finalCost",
      "name": "finalCost",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.details.finalCost",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_exitDate",
      "name": "exitDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderInput.MaintenanceOrder.details.exitDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.status",
      "name": "createMaintenanceOrderStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createMaintenanceOrder"
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.error",
      "name": "createMaintenanceOrderError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder"
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.result",
      "name": "createMaintenanceOrderResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.details.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_intervalKilometers",
      "name": "intervalKilometers",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.details.intervalKilometers",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_intervalMonths",
      "name": "intervalMonths",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.details.intervalMonths",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_referenceMileage",
      "name": "referenceMileage",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.details.referenceMileage",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_referenceDate",
      "name": "referenceDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanInput.MaintenancePlan.details.referenceDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.status",
      "name": "createMaintenancePlanStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createMaintenancePlan"
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.error",
      "name": "createMaintenancePlanError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan"
    },
    {
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.result",
      "name": "createMaintenancePlanResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMaintenancePlan",
      "contractRef": "CreateMaintenancePlanOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderInput.MaintenanceOrder.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderInput.MaintenanceOrder.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.maintenancePlanId",
      "name": "maintenancePlanId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderInput.MaintenanceOrder.maintenancePlanId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.workshopId",
      "name": "workshopId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderInput.MaintenanceOrder.workshopId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.entryDate",
      "name": "entryDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderInput.MaintenanceOrder.entryDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderInput.MaintenanceOrder.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.status",
      "name": "listMaintenanceOrderStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listMaintenanceOrder"
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.error",
      "name": "listMaintenanceOrderError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder"
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.result",
      "name": "listMaintenanceOrderResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenancePlan",
      "contractRef": "ListMaintenancePlanInput.MaintenancePlan.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenancePlan",
      "contractRef": "ListMaintenancePlanInput.MaintenancePlan.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listMaintenancePlan",
      "contractRef": "ListMaintenancePlanInput.MaintenancePlan.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.status",
      "name": "listMaintenancePlanStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listMaintenancePlan"
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.error",
      "name": "listMaintenancePlanError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMaintenancePlan"
    },
    {
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.result",
      "name": "listMaintenancePlanResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMaintenancePlan",
      "contractRef": "ListMaintenancePlanOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleInput.Vehicle.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.status",
      "name": "listVehicleStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listVehicle"
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.error",
      "name": "listVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listVehicle"
    },
    {
      "stateKey": "ui.planos_preventivos.listVehicle.result",
      "name": "listVehicleResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreateMaintenanceOrderVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.vehicleId"
    },
    {
      "actionId": "setCreateMaintenanceOrderMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.maintenancePlanId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.maintenancePlanId"
    },
    {
      "actionId": "setCreateMaintenanceOrderWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.workshopId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.workshopId"
    },
    {
      "actionId": "setCreateMaintenanceOrderEntryDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.entryDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.entryDate"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsMaintenanceType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.details_maintenanceType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_maintenanceType"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsDescription",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.details_description"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_description"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsEstimatedCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.details_estimatedCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_estimatedCost"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsFinalCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.details_finalCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_finalCost"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsExitDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.details_exitDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenanceOrder.input.details_exitDate"
    },
    {
      "actionId": "createMaintenanceOrder",
      "kind": "command",
      "commandRef": "createMaintenanceOrder",
      "routeRef": "createMaintenanceOrderRoute",
      "inputTypeRef": "CreateMaintenanceOrderInput",
      "outputTypeRef": "CreateMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.vehicleId",
        "ui.planos_preventivos.createMaintenanceOrder.input.maintenancePlanId",
        "ui.planos_preventivos.createMaintenanceOrder.input.workshopId",
        "ui.planos_preventivos.createMaintenanceOrder.input.entryDate",
        "ui.planos_preventivos.createMaintenanceOrder.input.details",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_maintenanceType",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_description",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_estimatedCost",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_finalCost",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_exitDate"
      ],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.result"
      ],
      "statusStateKey": "ui.planos_preventivos.createMaintenanceOrder.status",
      "errorStateKey": "ui.planos_preventivos.createMaintenanceOrder.error",
      "refreshActionIds": [
        "listMaintenanceOrder"
      ]
    },
    {
      "actionId": "setCreateMaintenancePlanVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.vehicleId"
    },
    {
      "actionId": "setCreateMaintenancePlanDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details"
    },
    {
      "actionId": "setCreateMaintenancePlanDetailsName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.details_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_name"
    },
    {
      "actionId": "setCreateMaintenancePlanDetailsIntervalKilometers",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.details_intervalKilometers"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_intervalKilometers"
    },
    {
      "actionId": "setCreateMaintenancePlanDetailsIntervalMonths",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.details_intervalMonths"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_intervalMonths"
    },
    {
      "actionId": "setCreateMaintenancePlanDetailsReferenceMileage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceMileage"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_referenceMileage"
    },
    {
      "actionId": "setCreateMaintenancePlanDetailsReferenceDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.createMaintenancePlan.input.details_referenceDate"
    },
    {
      "actionId": "createMaintenancePlan",
      "kind": "command",
      "commandRef": "createMaintenancePlan",
      "routeRef": "createMaintenancePlanRoute",
      "inputTypeRef": "CreateMaintenancePlanInput",
      "outputTypeRef": "CreateMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.vehicleId",
        "ui.planos_preventivos.createMaintenancePlan.input.details",
        "ui.planos_preventivos.createMaintenancePlan.input.details_name",
        "ui.planos_preventivos.createMaintenancePlan.input.details_intervalKilometers",
        "ui.planos_preventivos.createMaintenancePlan.input.details_intervalMonths",
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceMileage",
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceDate"
      ],
      "outputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.result"
      ],
      "statusStateKey": "ui.planos_preventivos.createMaintenancePlan.status",
      "errorStateKey": "ui.planos_preventivos.createMaintenancePlan.error",
      "refreshActionIds": [
        "listMaintenancePlan",
        "listVehicle"
      ]
    },
    {
      "actionId": "setListMaintenanceOrderId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.id"
    },
    {
      "actionId": "setListMaintenanceOrderVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.vehicleId"
    },
    {
      "actionId": "setListMaintenanceOrderMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.maintenancePlanId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.maintenancePlanId"
    },
    {
      "actionId": "setListMaintenanceOrderWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.workshopId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.workshopId"
    },
    {
      "actionId": "setListMaintenanceOrderEntryDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.entryDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.entryDate"
    },
    {
      "actionId": "setListMaintenanceOrderPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenanceOrder.input.page"
    },
    {
      "actionId": "listMaintenanceOrder",
      "kind": "query",
      "commandRef": "listMaintenanceOrder",
      "routeRef": "listMaintenanceOrderRoute",
      "inputTypeRef": "ListMaintenanceOrderInput",
      "outputTypeRef": "ListMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.id",
        "ui.planos_preventivos.listMaintenanceOrder.input.vehicleId",
        "ui.planos_preventivos.listMaintenanceOrder.input.maintenancePlanId",
        "ui.planos_preventivos.listMaintenanceOrder.input.workshopId",
        "ui.planos_preventivos.listMaintenanceOrder.input.entryDate",
        "ui.planos_preventivos.listMaintenanceOrder.input.page"
      ],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.result"
      ],
      "statusStateKey": "ui.planos_preventivos.listMaintenanceOrder.status",
      "errorStateKey": "ui.planos_preventivos.listMaintenanceOrder.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenancePlan.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.input.id"
    },
    {
      "actionId": "setListMaintenancePlanVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenancePlan.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.input.vehicleId"
    },
    {
      "actionId": "setListMaintenancePlanPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenancePlan.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listMaintenancePlan.input.page"
    },
    {
      "actionId": "listMaintenancePlan",
      "kind": "query",
      "commandRef": "listMaintenancePlan",
      "routeRef": "listMaintenancePlanRoute",
      "inputTypeRef": "ListMaintenancePlanInput",
      "outputTypeRef": "ListMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.listMaintenancePlan.input.id",
        "ui.planos_preventivos.listMaintenancePlan.input.vehicleId",
        "ui.planos_preventivos.listMaintenancePlan.input.page"
      ],
      "outputStateKeys": [
        "ui.planos_preventivos.listMaintenancePlan.result"
      ],
      "statusStateKey": "ui.planos_preventivos.listMaintenancePlan.status",
      "errorStateKey": "ui.planos_preventivos.listMaintenancePlan.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.id"
    },
    {
      "actionId": "setListVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.details"
    },
    {
      "actionId": "setListVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_subtype"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_name"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_status"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setListVehiclePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.planos_preventivos.listVehicle.input.page"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "commandRef": "listVehicle",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.id",
        "ui.planos_preventivos.listVehicle.input.details",
        "ui.planos_preventivos.listVehicle.input.details_identification",
        "ui.planos_preventivos.listVehicle.input.details_identification_subtype",
        "ui.planos_preventivos.listVehicle.input.details_identification_name",
        "ui.planos_preventivos.listVehicle.input.details_identification_status",
        "ui.planos_preventivos.listVehicle.input.details_identification_countryCode",
        "ui.planos_preventivos.listVehicle.input.page"
      ],
      "outputStateKeys": [
        "ui.planos_preventivos.listVehicle.result"
      ],
      "statusStateKey": "ui.planos_preventivos.listVehicle.status",
      "errorStateKey": "ui.planos_preventivos.listVehicle.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listMaintenanceOrder",
      "preconditions": []
    },
    {
      "value": "createMaintenanceOrder",
      "kind": "command",
      "actionId": "createMaintenanceOrder",
      "preconditions": [
        "ui.planos_preventivos.createMaintenanceOrder.input.vehicleId",
        "ui.planos_preventivos.createMaintenanceOrder.input.workshopId",
        "ui.planos_preventivos.createMaintenanceOrder.input.entryDate",
        "ui.planos_preventivos.createMaintenanceOrder.input.details",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_maintenanceType",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_description"
      ]
    },
    {
      "value": "createMaintenancePlan",
      "kind": "command",
      "actionId": "createMaintenancePlan",
      "preconditions": [
        "ui.planos_preventivos.createMaintenancePlan.input.vehicleId",
        "ui.planos_preventivos.createMaintenancePlan.input.details",
        "ui.planos_preventivos.createMaintenancePlan.input.details_name",
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceMileage",
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceDate"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createMaintenanceOrder",
      "kind": "command",
      "routeRef": "createMaintenanceOrderRoute",
      "inputTypeRef": "CreateMaintenanceOrderInput",
      "outputTypeRef": "CreateMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.createMaintenanceOrder.input.vehicleId",
        "ui.planos_preventivos.createMaintenanceOrder.input.maintenancePlanId",
        "ui.planos_preventivos.createMaintenanceOrder.input.workshopId",
        "ui.planos_preventivos.createMaintenanceOrder.input.entryDate",
        "ui.planos_preventivos.createMaintenanceOrder.input.details",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_maintenanceType",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_description",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_estimatedCost",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_finalCost",
        "ui.planos_preventivos.createMaintenanceOrder.input.details_exitDate"
      ],
      "resultStateKey": "ui.planos_preventivos.createMaintenanceOrder.result"
    },
    {
      "actionId": "createMaintenancePlan",
      "kind": "command",
      "routeRef": "createMaintenancePlanRoute",
      "inputTypeRef": "CreateMaintenancePlanInput",
      "outputTypeRef": "CreateMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.createMaintenancePlan.input.vehicleId",
        "ui.planos_preventivos.createMaintenancePlan.input.details",
        "ui.planos_preventivos.createMaintenancePlan.input.details_name",
        "ui.planos_preventivos.createMaintenancePlan.input.details_intervalKilometers",
        "ui.planos_preventivos.createMaintenancePlan.input.details_intervalMonths",
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceMileage",
        "ui.planos_preventivos.createMaintenancePlan.input.details_referenceDate"
      ],
      "resultStateKey": "ui.planos_preventivos.createMaintenancePlan.result"
    },
    {
      "actionId": "listMaintenanceOrder",
      "kind": "query",
      "routeRef": "listMaintenanceOrderRoute",
      "inputTypeRef": "ListMaintenanceOrderInput",
      "outputTypeRef": "ListMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.listMaintenanceOrder.input.id",
        "ui.planos_preventivos.listMaintenanceOrder.input.vehicleId",
        "ui.planos_preventivos.listMaintenanceOrder.input.maintenancePlanId",
        "ui.planos_preventivos.listMaintenanceOrder.input.workshopId",
        "ui.planos_preventivos.listMaintenanceOrder.input.entryDate",
        "ui.planos_preventivos.listMaintenanceOrder.input.page"
      ],
      "resultStateKey": "ui.planos_preventivos.listMaintenanceOrder.result"
    },
    {
      "actionId": "listMaintenancePlan",
      "kind": "query",
      "routeRef": "listMaintenancePlanRoute",
      "inputTypeRef": "ListMaintenancePlanInput",
      "outputTypeRef": "ListMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.listMaintenancePlan.input.id",
        "ui.planos_preventivos.listMaintenancePlan.input.vehicleId",
        "ui.planos_preventivos.listMaintenancePlan.input.page"
      ],
      "resultStateKey": "ui.planos_preventivos.listMaintenancePlan.result"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.planos_preventivos.listVehicle.input.id",
        "ui.planos_preventivos.listVehicle.input.details",
        "ui.planos_preventivos.listVehicle.input.details_identification",
        "ui.planos_preventivos.listVehicle.input.details_identification_subtype",
        "ui.planos_preventivos.listVehicle.input.details_identification_name",
        "ui.planos_preventivos.listVehicle.input.details_identification_status",
        "ui.planos_preventivos.listVehicle.input.details_identification_countryCode",
        "ui.planos_preventivos.listVehicle.input.page"
      ],
      "resultStateKey": "ui.planos_preventivos.listVehicle.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "planos_preventivos__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/manutencaoFrota/web/shared/planos_preventivos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/shared/planos_preventivos.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/contracts/planos_preventivos.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
