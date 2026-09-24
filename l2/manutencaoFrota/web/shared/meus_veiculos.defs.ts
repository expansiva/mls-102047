export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "manutencaoFrota",
  "pageId": "meus_veiculos",
  "pageName": "Meus veículos",
  "baseClassName": "MeusVeiculosShared",
  "routePattern": "/minha_frota/meus_veiculos",
  "contractRef": {
    "defPath": "l2/manutencaoFrota/web/contracts/meus_veiculos.defs.ts",
    "calls": [
      {
        "actionId": "createFueling",
        "routeConst": "createFuelingRoute",
        "inputType": "CreateFuelingInput",
        "outputType": "CreateFuelingOutput"
      },
      {
        "actionId": "listFueling",
        "routeConst": "listFuelingRoute",
        "inputType": "ListFuelingInput",
        "outputType": "ListFuelingOutput"
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
      "stateKey": "ui.meus_veiculos.pageStatus",
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
      "stateKey": "ui.meus_veiculos.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createFueling"
      ]
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.driverId",
      "name": "driverId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.driverId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.details_fuelingDate",
      "name": "fuelingDate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.details.fuelingDate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.details_liters",
      "name": "liters",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.details.liters",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.details_amount",
      "name": "amount",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.details.amount",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.input.details_odometerKm",
      "name": "odometerKm",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingInput.Fueling.details.odometerKm",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.status",
      "name": "createFuelingStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createFueling"
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.error",
      "name": "createFuelingError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createFueling"
    },
    {
      "stateKey": "ui.meus_veiculos.createFueling.result",
      "name": "createFuelingResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createFueling",
      "contractRef": "CreateFuelingOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listFueling",
      "contractRef": "ListFuelingInput.Fueling.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listFueling",
      "contractRef": "ListFuelingInput.Fueling.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.input.driverId",
      "name": "driverId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listFueling",
      "contractRef": "ListFuelingInput.Fueling.driverId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listFueling",
      "contractRef": "ListFuelingInput.Fueling.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.status",
      "name": "listFuelingStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listFueling"
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.error",
      "name": "listFuelingError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listFueling"
    },
    {
      "stateKey": "ui.meus_veiculos.listFueling.result",
      "name": "listFuelingResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listFueling",
      "contractRef": "ListFuelingOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.meus_veiculos.listVehicle.input.details",
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
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification",
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
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_subtype",
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
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_name",
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
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_status",
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
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_countryCode",
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
      "stateKey": "ui.meus_veiculos.listVehicle.input.page",
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
      "stateKey": "ui.meus_veiculos.listVehicle.status",
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
      "stateKey": "ui.meus_veiculos.listVehicle.error",
      "name": "listVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listVehicle"
    },
    {
      "stateKey": "ui.meus_veiculos.listVehicle.result",
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
      "actionId": "setCreateFuelingVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.vehicleId"
    },
    {
      "actionId": "setCreateFuelingDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.driverId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.driverId"
    },
    {
      "actionId": "setCreateFuelingDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.details"
    },
    {
      "actionId": "setCreateFuelingDetailsFuelingDate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.details_fuelingDate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.details_fuelingDate"
    },
    {
      "actionId": "setCreateFuelingDetailsLiters",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.details_liters"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.details_liters"
    },
    {
      "actionId": "setCreateFuelingDetailsAmount",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.details_amount"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.details_amount"
    },
    {
      "actionId": "setCreateFuelingDetailsOdometerKm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.input.details_odometerKm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.createFueling.input.details_odometerKm"
    },
    {
      "actionId": "createFueling",
      "kind": "command",
      "commandRef": "createFueling",
      "routeRef": "createFuelingRoute",
      "inputTypeRef": "CreateFuelingInput",
      "outputTypeRef": "CreateFuelingOutput",
      "inputStateKeys": [
        "ui.meus_veiculos.createFueling.input.vehicleId",
        "ui.meus_veiculos.createFueling.input.driverId",
        "ui.meus_veiculos.createFueling.input.details",
        "ui.meus_veiculos.createFueling.input.details_fuelingDate",
        "ui.meus_veiculos.createFueling.input.details_liters",
        "ui.meus_veiculos.createFueling.input.details_amount",
        "ui.meus_veiculos.createFueling.input.details_odometerKm"
      ],
      "outputStateKeys": [
        "ui.meus_veiculos.createFueling.result"
      ],
      "statusStateKey": "ui.meus_veiculos.createFueling.status",
      "errorStateKey": "ui.meus_veiculos.createFueling.error",
      "refreshActionIds": [
        "listFueling",
        "listVehicle"
      ]
    },
    {
      "actionId": "setListFuelingId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listFueling.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listFueling.input.id"
    },
    {
      "actionId": "setListFuelingVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listFueling.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listFueling.input.vehicleId"
    },
    {
      "actionId": "setListFuelingDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listFueling.input.driverId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listFueling.input.driverId"
    },
    {
      "actionId": "setListFuelingPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listFueling.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listFueling.input.page"
    },
    {
      "actionId": "listFueling",
      "kind": "query",
      "commandRef": "listFueling",
      "routeRef": "listFuelingRoute",
      "inputTypeRef": "ListFuelingInput",
      "outputTypeRef": "ListFuelingOutput",
      "inputStateKeys": [
        "ui.meus_veiculos.listFueling.input.id",
        "ui.meus_veiculos.listFueling.input.vehicleId",
        "ui.meus_veiculos.listFueling.input.driverId",
        "ui.meus_veiculos.listFueling.input.page"
      ],
      "outputStateKeys": [
        "ui.meus_veiculos.listFueling.result"
      ],
      "statusStateKey": "ui.meus_veiculos.listFueling.status",
      "errorStateKey": "ui.meus_veiculos.listFueling.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.details"
    },
    {
      "actionId": "setListVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_subtype"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_name"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_status"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setListVehiclePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.meus_veiculos.listVehicle.input.page"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "commandRef": "listVehicle",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details",
        "ui.meus_veiculos.listVehicle.input.details_identification",
        "ui.meus_veiculos.listVehicle.input.details_identification_subtype",
        "ui.meus_veiculos.listVehicle.input.details_identification_name",
        "ui.meus_veiculos.listVehicle.input.details_identification_status",
        "ui.meus_veiculos.listVehicle.input.details_identification_countryCode",
        "ui.meus_veiculos.listVehicle.input.page"
      ],
      "outputStateKeys": [
        "ui.meus_veiculos.listVehicle.result"
      ],
      "statusStateKey": "ui.meus_veiculos.listVehicle.status",
      "errorStateKey": "ui.meus_veiculos.listVehicle.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listVehicle",
      "preconditions": [
        "ui.meus_veiculos.listVehicle.input.details"
      ]
    },
    {
      "value": "createFueling",
      "kind": "command",
      "actionId": "createFueling",
      "preconditions": [
        "ui.meus_veiculos.createFueling.input.vehicleId",
        "ui.meus_veiculos.createFueling.input.driverId",
        "ui.meus_veiculos.createFueling.input.details",
        "ui.meus_veiculos.createFueling.input.details_fuelingDate",
        "ui.meus_veiculos.createFueling.input.details_liters",
        "ui.meus_veiculos.createFueling.input.details_amount",
        "ui.meus_veiculos.createFueling.input.details_odometerKm"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createFueling",
      "kind": "command",
      "routeRef": "createFuelingRoute",
      "inputTypeRef": "CreateFuelingInput",
      "outputTypeRef": "CreateFuelingOutput",
      "inputStateKeys": [
        "ui.meus_veiculos.createFueling.input.vehicleId",
        "ui.meus_veiculos.createFueling.input.driverId",
        "ui.meus_veiculos.createFueling.input.details",
        "ui.meus_veiculos.createFueling.input.details_fuelingDate",
        "ui.meus_veiculos.createFueling.input.details_liters",
        "ui.meus_veiculos.createFueling.input.details_amount",
        "ui.meus_veiculos.createFueling.input.details_odometerKm"
      ],
      "resultStateKey": "ui.meus_veiculos.createFueling.result"
    },
    {
      "actionId": "listFueling",
      "kind": "query",
      "routeRef": "listFuelingRoute",
      "inputTypeRef": "ListFuelingInput",
      "outputTypeRef": "ListFuelingOutput",
      "inputStateKeys": [
        "ui.meus_veiculos.listFueling.input.id",
        "ui.meus_veiculos.listFueling.input.vehicleId",
        "ui.meus_veiculos.listFueling.input.driverId",
        "ui.meus_veiculos.listFueling.input.page"
      ],
      "resultStateKey": "ui.meus_veiculos.listFueling.result"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.meus_veiculos.listVehicle.input.details",
        "ui.meus_veiculos.listVehicle.input.details_identification",
        "ui.meus_veiculos.listVehicle.input.details_identification_subtype",
        "ui.meus_veiculos.listVehicle.input.details_identification_name",
        "ui.meus_veiculos.listVehicle.input.details_identification_status",
        "ui.meus_veiculos.listVehicle.input.details_identification_countryCode",
        "ui.meus_veiculos.listVehicle.input.page"
      ],
      "resultStateKey": "ui.meus_veiculos.listVehicle.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "meus_veiculos__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/manutencaoFrota/web/shared/meus_veiculos.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/shared/meus_veiculos.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/contracts/meus_veiculos.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
