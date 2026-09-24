export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "manutencaoFrota",
  "pageId": "ordens_manutencao",
  "pageName": "Ordens de manutenção",
  "baseClassName": "OrdensManutencaoShared",
  "routePattern": "/ordens_manutencao",
  "contractRef": {
    "defPath": "l2/manutencaoFrota/web/contracts/ordens_manutencao.defs.ts",
    "calls": [
      {
        "actionId": "createMaintenanceOrder",
        "routeConst": "createMaintenanceOrderRoute",
        "inputType": "CreateMaintenanceOrderInput",
        "outputType": "CreateMaintenanceOrderOutput"
      },
      {
        "actionId": "updateMaintenanceOrder",
        "routeConst": "updateMaintenanceOrderRoute",
        "inputType": "UpdateMaintenanceOrderInput",
        "outputType": "UpdateMaintenanceOrderOutput"
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
      "stateKey": "ui.ordens_manutencao.pageStatus",
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
      "stateKey": "ui.ordens_manutencao.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "vehicle",
        "maintenancePlan",
        "createMaintenanceOrder",
        "updateMaintenanceOrder"
      ]
    },
    {
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.vehicleId",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.maintenancePlanId",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.workshopId",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.entryDate",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_maintenanceType",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_description",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_estimatedCost",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_finalCost",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_exitDate",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.status",
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
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.error",
      "name": "createMaintenanceOrderError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder"
    },
    {
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.result",
      "name": "createMaintenanceOrderResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createMaintenanceOrder",
      "contractRef": "CreateMaintenanceOrderOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.maintenancePlanId",
      "name": "maintenancePlanId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.maintenancePlanId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.workshopId",
      "name": "workshopId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.workshopId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.entryDate",
      "name": "entryDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.entryDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_maintenanceType",
      "name": "maintenanceType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.details.maintenanceType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_description",
      "name": "description",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.details.description",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_estimatedCost",
      "name": "estimatedCost",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.details.estimatedCost",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_finalCost",
      "name": "finalCost",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.details.finalCost",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_exitDate",
      "name": "exitDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderInput.MaintenanceOrder.details.exitDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.status",
      "name": "updateMaintenanceOrderStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateMaintenanceOrder"
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.error",
      "name": "updateMaintenanceOrderError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder"
    },
    {
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.result",
      "name": "updateMaintenanceOrderResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateMaintenanceOrder",
      "contractRef": "UpdateMaintenanceOrderOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.id",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.vehicleId",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.maintenancePlanId",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.workshopId",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.entryDate",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.page",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.status",
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
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.error",
      "name": "listMaintenanceOrderError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder"
    },
    {
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.result",
      "name": "listMaintenanceOrderResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.input.id",
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
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.input.vehicleId",
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
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.input.page",
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
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.status",
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
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.error",
      "name": "listMaintenancePlanError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMaintenancePlan"
    },
    {
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.result",
      "name": "listMaintenancePlanResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMaintenancePlan",
      "contractRef": "ListMaintenancePlanOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.ordens_manutencao.listVehicle.input.id",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_subtype",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_name",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_status",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_countryCode",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.input.page",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.status",
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
      "stateKey": "ui.ordens_manutencao.listVehicle.error",
      "name": "listVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listVehicle"
    },
    {
      "stateKey": "ui.ordens_manutencao.listVehicle.result",
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
        "ui.ordens_manutencao.createMaintenanceOrder.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.vehicleId"
    },
    {
      "actionId": "setCreateMaintenanceOrderMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.maintenancePlanId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.maintenancePlanId"
    },
    {
      "actionId": "setCreateMaintenanceOrderWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.workshopId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.workshopId"
    },
    {
      "actionId": "setCreateMaintenanceOrderEntryDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.entryDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.entryDate"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsMaintenanceType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_maintenanceType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_maintenanceType"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsDescription",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_description"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_description"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsEstimatedCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_estimatedCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_estimatedCost"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsFinalCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_finalCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_finalCost"
    },
    {
      "actionId": "setCreateMaintenanceOrderDetailsExitDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_exitDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.createMaintenanceOrder.input.details_exitDate"
    },
    {
      "actionId": "createMaintenanceOrder",
      "kind": "command",
      "commandRef": "createMaintenanceOrder",
      "routeRef": "createMaintenanceOrderRoute",
      "inputTypeRef": "CreateMaintenanceOrderInput",
      "outputTypeRef": "CreateMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.input.vehicleId",
        "ui.ordens_manutencao.createMaintenanceOrder.input.maintenancePlanId",
        "ui.ordens_manutencao.createMaintenanceOrder.input.workshopId",
        "ui.ordens_manutencao.createMaintenanceOrder.input.entryDate",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_maintenanceType",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_description",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_estimatedCost",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_finalCost",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_exitDate"
      ],
      "outputStateKeys": [
        "ui.ordens_manutencao.createMaintenanceOrder.result"
      ],
      "statusStateKey": "ui.ordens_manutencao.createMaintenanceOrder.status",
      "errorStateKey": "ui.ordens_manutencao.createMaintenanceOrder.error",
      "refreshActionIds": [
        "listMaintenanceOrder"
      ]
    },
    {
      "actionId": "setUpdateMaintenanceOrderId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.id"
    },
    {
      "actionId": "setUpdateMaintenanceOrderVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.vehicleId"
    },
    {
      "actionId": "setUpdateMaintenanceOrderMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.maintenancePlanId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.maintenancePlanId"
    },
    {
      "actionId": "setUpdateMaintenanceOrderWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.workshopId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.workshopId"
    },
    {
      "actionId": "setUpdateMaintenanceOrderEntryDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.entryDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.entryDate"
    },
    {
      "actionId": "setUpdateMaintenanceOrderDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details"
    },
    {
      "actionId": "setUpdateMaintenanceOrderDetailsMaintenanceType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_maintenanceType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_maintenanceType"
    },
    {
      "actionId": "setUpdateMaintenanceOrderDetailsDescription",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_description"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_description"
    },
    {
      "actionId": "setUpdateMaintenanceOrderDetailsEstimatedCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_estimatedCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_estimatedCost"
    },
    {
      "actionId": "setUpdateMaintenanceOrderDetailsFinalCost",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_finalCost"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_finalCost"
    },
    {
      "actionId": "setUpdateMaintenanceOrderDetailsExitDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_exitDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.updateMaintenanceOrder.input.details_exitDate"
    },
    {
      "actionId": "updateMaintenanceOrder",
      "kind": "command",
      "commandRef": "updateMaintenanceOrder",
      "routeRef": "updateMaintenanceOrderRoute",
      "inputTypeRef": "UpdateMaintenanceOrderInput",
      "outputTypeRef": "UpdateMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.id",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.vehicleId",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.maintenancePlanId",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.workshopId",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.entryDate",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_maintenanceType",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_description",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_estimatedCost",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_finalCost",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_exitDate"
      ],
      "outputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.result"
      ],
      "statusStateKey": "ui.ordens_manutencao.updateMaintenanceOrder.status",
      "errorStateKey": "ui.ordens_manutencao.updateMaintenanceOrder.error",
      "refreshActionIds": [
        "listMaintenanceOrder"
      ]
    },
    {
      "actionId": "setListMaintenanceOrderId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.id"
    },
    {
      "actionId": "setListMaintenanceOrderVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.vehicleId"
    },
    {
      "actionId": "setListMaintenanceOrderMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.maintenancePlanId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.maintenancePlanId"
    },
    {
      "actionId": "setListMaintenanceOrderWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.workshopId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.workshopId"
    },
    {
      "actionId": "setListMaintenanceOrderEntryDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.entryDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.entryDate"
    },
    {
      "actionId": "setListMaintenanceOrderPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenanceOrder.input.page"
    },
    {
      "actionId": "listMaintenanceOrder",
      "kind": "query",
      "commandRef": "listMaintenanceOrder",
      "routeRef": "listMaintenanceOrderRoute",
      "inputTypeRef": "ListMaintenanceOrderInput",
      "outputTypeRef": "ListMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.id",
        "ui.ordens_manutencao.listMaintenanceOrder.input.vehicleId",
        "ui.ordens_manutencao.listMaintenanceOrder.input.maintenancePlanId",
        "ui.ordens_manutencao.listMaintenanceOrder.input.workshopId",
        "ui.ordens_manutencao.listMaintenanceOrder.input.entryDate",
        "ui.ordens_manutencao.listMaintenanceOrder.input.page"
      ],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.result"
      ],
      "statusStateKey": "ui.ordens_manutencao.listMaintenanceOrder.status",
      "errorStateKey": "ui.ordens_manutencao.listMaintenanceOrder.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenancePlan.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.input.id"
    },
    {
      "actionId": "setListMaintenancePlanVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenancePlan.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.input.vehicleId"
    },
    {
      "actionId": "setListMaintenancePlanPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenancePlan.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listMaintenancePlan.input.page"
    },
    {
      "actionId": "listMaintenancePlan",
      "kind": "query",
      "commandRef": "listMaintenancePlan",
      "routeRef": "listMaintenancePlanRoute",
      "inputTypeRef": "ListMaintenancePlanInput",
      "outputTypeRef": "ListMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.listMaintenancePlan.input.id",
        "ui.ordens_manutencao.listMaintenancePlan.input.vehicleId",
        "ui.ordens_manutencao.listMaintenancePlan.input.page"
      ],
      "outputStateKeys": [
        "ui.ordens_manutencao.listMaintenancePlan.result"
      ],
      "statusStateKey": "ui.ordens_manutencao.listMaintenancePlan.status",
      "errorStateKey": "ui.ordens_manutencao.listMaintenancePlan.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.id"
    },
    {
      "actionId": "setListVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details"
    },
    {
      "actionId": "setListVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_subtype"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_name"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_status"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setListVehiclePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.ordens_manutencao.listVehicle.input.page"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "commandRef": "listVehicle",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.id",
        "ui.ordens_manutencao.listVehicle.input.details",
        "ui.ordens_manutencao.listVehicle.input.details_identification",
        "ui.ordens_manutencao.listVehicle.input.details_identification_subtype",
        "ui.ordens_manutencao.listVehicle.input.details_identification_name",
        "ui.ordens_manutencao.listVehicle.input.details_identification_status",
        "ui.ordens_manutencao.listVehicle.input.details_identification_countryCode",
        "ui.ordens_manutencao.listVehicle.input.page"
      ],
      "outputStateKeys": [
        "ui.ordens_manutencao.listVehicle.result"
      ],
      "statusStateKey": "ui.ordens_manutencao.listVehicle.status",
      "errorStateKey": "ui.ordens_manutencao.listVehicle.error",
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
      "value": "vehicle",
      "kind": "detail",
      "actionId": "listVehicle",
      "preconditions": []
    },
    {
      "value": "maintenancePlan",
      "kind": "detail",
      "actionId": "listMaintenancePlan",
      "preconditions": []
    },
    {
      "value": "createMaintenanceOrder",
      "kind": "command",
      "actionId": "createMaintenanceOrder",
      "preconditions": []
    },
    {
      "value": "updateMaintenanceOrder",
      "kind": "command",
      "actionId": "updateMaintenanceOrder",
      "preconditions": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.id"
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
        "ui.ordens_manutencao.createMaintenanceOrder.input.vehicleId",
        "ui.ordens_manutencao.createMaintenanceOrder.input.maintenancePlanId",
        "ui.ordens_manutencao.createMaintenanceOrder.input.workshopId",
        "ui.ordens_manutencao.createMaintenanceOrder.input.entryDate",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_maintenanceType",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_description",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_estimatedCost",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_finalCost",
        "ui.ordens_manutencao.createMaintenanceOrder.input.details_exitDate"
      ],
      "resultStateKey": "ui.ordens_manutencao.createMaintenanceOrder.result"
    },
    {
      "actionId": "updateMaintenanceOrder",
      "kind": "command",
      "routeRef": "updateMaintenanceOrderRoute",
      "inputTypeRef": "UpdateMaintenanceOrderInput",
      "outputTypeRef": "UpdateMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.updateMaintenanceOrder.input.id",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.vehicleId",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.maintenancePlanId",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.workshopId",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.entryDate",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_maintenanceType",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_description",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_estimatedCost",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_finalCost",
        "ui.ordens_manutencao.updateMaintenanceOrder.input.details_exitDate"
      ],
      "resultStateKey": "ui.ordens_manutencao.updateMaintenanceOrder.result"
    },
    {
      "actionId": "listMaintenanceOrder",
      "kind": "query",
      "routeRef": "listMaintenanceOrderRoute",
      "inputTypeRef": "ListMaintenanceOrderInput",
      "outputTypeRef": "ListMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.listMaintenanceOrder.input.id",
        "ui.ordens_manutencao.listMaintenanceOrder.input.vehicleId",
        "ui.ordens_manutencao.listMaintenanceOrder.input.maintenancePlanId",
        "ui.ordens_manutencao.listMaintenanceOrder.input.workshopId",
        "ui.ordens_manutencao.listMaintenanceOrder.input.entryDate",
        "ui.ordens_manutencao.listMaintenanceOrder.input.page"
      ],
      "resultStateKey": "ui.ordens_manutencao.listMaintenanceOrder.result"
    },
    {
      "actionId": "listMaintenancePlan",
      "kind": "query",
      "routeRef": "listMaintenancePlanRoute",
      "inputTypeRef": "ListMaintenancePlanInput",
      "outputTypeRef": "ListMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.listMaintenancePlan.input.id",
        "ui.ordens_manutencao.listMaintenancePlan.input.vehicleId",
        "ui.ordens_manutencao.listMaintenancePlan.input.page"
      ],
      "resultStateKey": "ui.ordens_manutencao.listMaintenancePlan.result"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.ordens_manutencao.listVehicle.input.id",
        "ui.ordens_manutencao.listVehicle.input.details",
        "ui.ordens_manutencao.listVehicle.input.details_identification",
        "ui.ordens_manutencao.listVehicle.input.details_identification_subtype",
        "ui.ordens_manutencao.listVehicle.input.details_identification_name",
        "ui.ordens_manutencao.listVehicle.input.details_identification_status",
        "ui.ordens_manutencao.listVehicle.input.details_identification_countryCode",
        "ui.ordens_manutencao.listVehicle.input.page"
      ],
      "resultStateKey": "ui.ordens_manutencao.listVehicle.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "ordens_manutencao__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/manutencaoFrota/web/shared/ordens_manutencao.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/shared/ordens_manutencao.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/contracts/ordens_manutencao.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
