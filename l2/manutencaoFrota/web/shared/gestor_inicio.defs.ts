export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "manutencaoFrota",
  "pageId": "gestor_inicio",
  "pageName": "Início",
  "baseClassName": "GestorInicioShared",
  "routePattern": "/gestor_inicio",
  "contractRef": {
    "defPath": "l2/manutencaoFrota/web/contracts/gestor_inicio.defs.ts",
    "calls": [
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
      "stateKey": "ui.gestor_inicio.pageStatus",
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
      "stateKey": "ui.gestor_inicio.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base"
      ]
    },
    {
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.id",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.vehicleId",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.maintenancePlanId",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.workshopId",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.entryDate",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.page",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.status",
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
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.error",
      "name": "listMaintenanceOrderError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMaintenanceOrder"
    },
    {
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.result",
      "name": "listMaintenanceOrderResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMaintenanceOrder",
      "contractRef": "ListMaintenanceOrderOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.input.id",
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
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.input.vehicleId",
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
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.input.page",
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
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.status",
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
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.error",
      "name": "listMaintenancePlanError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listMaintenancePlan"
    },
    {
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.result",
      "name": "listMaintenancePlanResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listMaintenancePlan",
      "contractRef": "ListMaintenancePlanOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.gestor_inicio.listVehicle.input.id",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.details",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_subtype",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_name",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_status",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_countryCode",
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
      "stateKey": "ui.gestor_inicio.listVehicle.input.page",
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
      "stateKey": "ui.gestor_inicio.listVehicle.status",
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
      "stateKey": "ui.gestor_inicio.listVehicle.error",
      "name": "listVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listVehicle"
    },
    {
      "stateKey": "ui.gestor_inicio.listVehicle.result",
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
      "actionId": "setListMaintenanceOrderId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.id"
    },
    {
      "actionId": "setListMaintenanceOrderVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.vehicleId"
    },
    {
      "actionId": "setListMaintenanceOrderMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.maintenancePlanId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.maintenancePlanId"
    },
    {
      "actionId": "setListMaintenanceOrderWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.workshopId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.workshopId"
    },
    {
      "actionId": "setListMaintenanceOrderEntryDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.entryDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.entryDate"
    },
    {
      "actionId": "setListMaintenanceOrderPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenanceOrder.input.page"
    },
    {
      "actionId": "listMaintenanceOrder",
      "kind": "query",
      "commandRef": "listMaintenanceOrder",
      "routeRef": "listMaintenanceOrderRoute",
      "inputTypeRef": "ListMaintenanceOrderInput",
      "outputTypeRef": "ListMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.id",
        "ui.gestor_inicio.listMaintenanceOrder.input.vehicleId",
        "ui.gestor_inicio.listMaintenanceOrder.input.maintenancePlanId",
        "ui.gestor_inicio.listMaintenanceOrder.input.workshopId",
        "ui.gestor_inicio.listMaintenanceOrder.input.entryDate",
        "ui.gestor_inicio.listMaintenanceOrder.input.page"
      ],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.result"
      ],
      "statusStateKey": "ui.gestor_inicio.listMaintenanceOrder.status",
      "errorStateKey": "ui.gestor_inicio.listMaintenanceOrder.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListMaintenancePlanId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenancePlan.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.input.id"
    },
    {
      "actionId": "setListMaintenancePlanVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenancePlan.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.input.vehicleId"
    },
    {
      "actionId": "setListMaintenancePlanPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenancePlan.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listMaintenancePlan.input.page"
    },
    {
      "actionId": "listMaintenancePlan",
      "kind": "query",
      "commandRef": "listMaintenancePlan",
      "routeRef": "listMaintenancePlanRoute",
      "inputTypeRef": "ListMaintenancePlanInput",
      "outputTypeRef": "ListMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.gestor_inicio.listMaintenancePlan.input.id",
        "ui.gestor_inicio.listMaintenancePlan.input.vehicleId",
        "ui.gestor_inicio.listMaintenancePlan.input.page"
      ],
      "outputStateKeys": [
        "ui.gestor_inicio.listMaintenancePlan.result"
      ],
      "statusStateKey": "ui.gestor_inicio.listMaintenancePlan.status",
      "errorStateKey": "ui.gestor_inicio.listMaintenancePlan.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.id"
    },
    {
      "actionId": "setListVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.details"
    },
    {
      "actionId": "setListVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_subtype"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_name"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_status"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setListVehiclePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.gestor_inicio.listVehicle.input.page"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "commandRef": "listVehicle",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.id",
        "ui.gestor_inicio.listVehicle.input.details",
        "ui.gestor_inicio.listVehicle.input.details_identification",
        "ui.gestor_inicio.listVehicle.input.details_identification_subtype",
        "ui.gestor_inicio.listVehicle.input.details_identification_name",
        "ui.gestor_inicio.listVehicle.input.details_identification_status",
        "ui.gestor_inicio.listVehicle.input.details_identification_countryCode",
        "ui.gestor_inicio.listVehicle.input.page"
      ],
      "outputStateKeys": [
        "ui.gestor_inicio.listVehicle.result"
      ],
      "statusStateKey": "ui.gestor_inicio.listVehicle.status",
      "errorStateKey": "ui.gestor_inicio.listVehicle.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listMaintenanceOrder",
      "preconditions": []
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "listMaintenanceOrder",
      "kind": "query",
      "routeRef": "listMaintenanceOrderRoute",
      "inputTypeRef": "ListMaintenanceOrderInput",
      "outputTypeRef": "ListMaintenanceOrderOutput",
      "inputStateKeys": [
        "ui.gestor_inicio.listMaintenanceOrder.input.id",
        "ui.gestor_inicio.listMaintenanceOrder.input.vehicleId",
        "ui.gestor_inicio.listMaintenanceOrder.input.maintenancePlanId",
        "ui.gestor_inicio.listMaintenanceOrder.input.workshopId",
        "ui.gestor_inicio.listMaintenanceOrder.input.entryDate",
        "ui.gestor_inicio.listMaintenanceOrder.input.page"
      ],
      "resultStateKey": "ui.gestor_inicio.listMaintenanceOrder.result"
    },
    {
      "actionId": "listMaintenancePlan",
      "kind": "query",
      "routeRef": "listMaintenancePlanRoute",
      "inputTypeRef": "ListMaintenancePlanInput",
      "outputTypeRef": "ListMaintenancePlanOutput",
      "inputStateKeys": [
        "ui.gestor_inicio.listMaintenancePlan.input.id",
        "ui.gestor_inicio.listMaintenancePlan.input.vehicleId",
        "ui.gestor_inicio.listMaintenancePlan.input.page"
      ],
      "resultStateKey": "ui.gestor_inicio.listMaintenancePlan.result"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.gestor_inicio.listVehicle.input.id",
        "ui.gestor_inicio.listVehicle.input.details",
        "ui.gestor_inicio.listVehicle.input.details_identification",
        "ui.gestor_inicio.listVehicle.input.details_identification_subtype",
        "ui.gestor_inicio.listVehicle.input.details_identification_name",
        "ui.gestor_inicio.listVehicle.input.details_identification_status",
        "ui.gestor_inicio.listVehicle.input.details_identification_countryCode",
        "ui.gestor_inicio.listVehicle.input.page"
      ],
      "resultStateKey": "ui.gestor_inicio.listVehicle.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "gestor_inicio__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/manutencaoFrota/web/shared/gestor_inicio.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/shared/gestor_inicio.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/contracts/gestor_inicio.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
