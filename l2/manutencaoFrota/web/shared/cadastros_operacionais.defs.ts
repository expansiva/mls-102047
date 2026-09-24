export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "manutencaoFrota",
  "pageId": "cadastros_operacionais",
  "pageName": "Cadastros operacionais",
  "baseClassName": "CadastrosOperacionaisShared",
  "routePattern": "/cadastros_operacionais",
  "contractRef": {
    "defPath": "l2/manutencaoFrota/web/contracts/cadastros_operacionais.defs.ts",
    "calls": [
      {
        "actionId": "createDriver",
        "routeConst": "createDriverRoute",
        "inputType": "CreateDriverInput",
        "outputType": "CreateDriverOutput"
      },
      {
        "actionId": "createVehicle",
        "routeConst": "createVehicleRoute",
        "inputType": "CreateVehicleInput",
        "outputType": "CreateVehicleOutput"
      },
      {
        "actionId": "createVehicleAssignment",
        "routeConst": "createVehicleAssignmentRoute",
        "inputType": "CreateVehicleAssignmentInput",
        "outputType": "CreateVehicleAssignmentOutput"
      },
      {
        "actionId": "createWorkshop",
        "routeConst": "createWorkshopRoute",
        "inputType": "CreateWorkshopInput",
        "outputType": "CreateWorkshopOutput"
      },
      {
        "actionId": "updateDriver",
        "routeConst": "updateDriverRoute",
        "inputType": "UpdateDriverInput",
        "outputType": "UpdateDriverOutput"
      },
      {
        "actionId": "updateVehicle",
        "routeConst": "updateVehicleRoute",
        "inputType": "UpdateVehicleInput",
        "outputType": "UpdateVehicleOutput"
      },
      {
        "actionId": "updateVehicleAssignment",
        "routeConst": "updateVehicleAssignmentRoute",
        "inputType": "UpdateVehicleAssignmentInput",
        "outputType": "UpdateVehicleAssignmentOutput"
      },
      {
        "actionId": "updateWorkshop",
        "routeConst": "updateWorkshopRoute",
        "inputType": "UpdateWorkshopInput",
        "outputType": "UpdateWorkshopOutput"
      },
      {
        "actionId": "listDriver",
        "routeConst": "listDriverRoute",
        "inputType": "ListDriverInput",
        "outputType": "ListDriverOutput"
      },
      {
        "actionId": "listVehicle",
        "routeConst": "listVehicleRoute",
        "inputType": "ListVehicleInput",
        "outputType": "ListVehicleOutput"
      },
      {
        "actionId": "listVehicleAssignment",
        "routeConst": "listVehicleAssignmentRoute",
        "inputType": "ListVehicleAssignmentInput",
        "outputType": "ListVehicleAssignmentOutput"
      },
      {
        "actionId": "listWorkshop",
        "routeConst": "listWorkshopRoute",
        "inputType": "ListWorkshopInput",
        "outputType": "ListWorkshopOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.cadastros_operacionais.pageStatus",
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
      "stateKey": "ui.cadastros_operacionais.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createDriver",
        "createVehicle",
        "createVehicleAssignment",
        "createWorkshop",
        "updateDriver",
        "updateVehicle",
        "updateVehicleAssignment",
        "updateWorkshop"
      ]
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_manutencaoFrota",
      "name": "manutencaoFrota",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverInput.Driver.details.manutencaoFrota",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.status",
      "name": "createDriverStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createDriver"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.error",
      "name": "createDriverError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createDriver"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createDriver.result",
      "name": "createDriverResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createDriver",
      "contractRef": "CreateDriverOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle",
      "name": "assetVehicle",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.assetVehicle",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_plate",
      "name": "plate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.assetVehicle.plate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_model",
      "name": "model",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.assetVehicle.model",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_year",
      "name": "year",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.assetVehicle.year",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota",
      "name": "manutencaoFrota",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.manutencaoFrota",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota_currentMileageKm",
      "name": "currentMileageKm",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleInput.Vehicle.details.manutencaoFrota.currentMileageKm",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.status",
      "name": "createVehicleStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createVehicle"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.error",
      "name": "createVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createVehicle"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicle.result",
      "name": "createVehicleResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createVehicle",
      "contractRef": "CreateVehicleOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicleAssignment",
      "contractRef": "CreateVehicleAssignmentInput.VehicleAssignment.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.driverId",
      "name": "driverId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicleAssignment",
      "contractRef": "CreateVehicleAssignmentInput.VehicleAssignment.driverId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicleAssignment",
      "contractRef": "CreateVehicleAssignmentInput.VehicleAssignment.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.details_assignmentLabel",
      "name": "assignmentLabel",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createVehicleAssignment",
      "contractRef": "CreateVehicleAssignmentInput.VehicleAssignment.details.assignmentLabel",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.status",
      "name": "createVehicleAssignmentStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createVehicleAssignment"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.error",
      "name": "createVehicleAssignmentError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createVehicleAssignment"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.result",
      "name": "createVehicleAssignmentResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createVehicleAssignment",
      "contractRef": "CreateVehicleAssignmentOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_company",
      "name": "company",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.company",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_company_companyKind",
      "name": "companyKind",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.company.companyKind",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_company_legalName",
      "name": "legalName",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.company.legalName",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_manutencaoFrota",
      "name": "manutencaoFrota",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopInput.Workshop.details.manutencaoFrota",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.status",
      "name": "createWorkshopStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createWorkshop"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.error",
      "name": "createWorkshopError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createWorkshop"
    },
    {
      "stateKey": "ui.cadastros_operacionais.createWorkshop.result",
      "name": "createWorkshopResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createWorkshop",
      "contractRef": "CreateWorkshopOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_manutencaoFrota",
      "name": "manutencaoFrota",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverInput.Driver.details.manutencaoFrota",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.status",
      "name": "updateDriverStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateDriver"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.error",
      "name": "updateDriverError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateDriver"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateDriver.result",
      "name": "updateDriverResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateDriver",
      "contractRef": "UpdateDriverOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle",
      "name": "assetVehicle",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.assetVehicle",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_plate",
      "name": "plate",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.assetVehicle.plate",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_model",
      "name": "model",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.assetVehicle.model",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_year",
      "name": "year",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.assetVehicle.year",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota",
      "name": "manutencaoFrota",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.manutencaoFrota",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota_currentMileageKm",
      "name": "currentMileageKm",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleInput.Vehicle.details.manutencaoFrota.currentMileageKm",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.status",
      "name": "updateVehicleStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateVehicle"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.error",
      "name": "updateVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateVehicle"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicle.result",
      "name": "updateVehicleResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateVehicle",
      "contractRef": "UpdateVehicleOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment",
      "contractRef": "UpdateVehicleAssignmentInput.VehicleAssignment.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment",
      "contractRef": "UpdateVehicleAssignmentInput.VehicleAssignment.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.driverId",
      "name": "driverId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment",
      "contractRef": "UpdateVehicleAssignmentInput.VehicleAssignment.driverId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment",
      "contractRef": "UpdateVehicleAssignmentInput.VehicleAssignment.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.details_assignmentLabel",
      "name": "assignmentLabel",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment",
      "contractRef": "UpdateVehicleAssignmentInput.VehicleAssignment.details.assignmentLabel",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.status",
      "name": "updateVehicleAssignmentStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateVehicleAssignment"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.error",
      "name": "updateVehicleAssignmentError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.result",
      "name": "updateVehicleAssignmentResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateVehicleAssignment",
      "contractRef": "UpdateVehicleAssignmentOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_company",
      "name": "company",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.company",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_company_companyKind",
      "name": "companyKind",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.company.companyKind",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_company_legalName",
      "name": "legalName",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.company.legalName",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_manutencaoFrota",
      "name": "manutencaoFrota",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopInput.Workshop.details.manutencaoFrota",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.status",
      "name": "updateWorkshopStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateWorkshop"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.error",
      "name": "updateWorkshopError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateWorkshop"
    },
    {
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.result",
      "name": "updateWorkshopResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateWorkshop",
      "contractRef": "UpdateWorkshopOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listDriver",
      "contractRef": "ListDriverInput.Driver.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.status",
      "name": "listDriverStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listDriver"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.error",
      "name": "listDriverError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listDriver"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listDriver.result",
      "name": "listDriverResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listDriver",
      "contractRef": "ListDriverOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.id",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_subtype",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_name",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_status",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_countryCode",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.page",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.status",
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
      "stateKey": "ui.cadastros_operacionais.listVehicle.error",
      "name": "listVehicleError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listVehicle"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicle.result",
      "name": "listVehicleResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listVehicle",
      "contractRef": "ListVehicleOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicleAssignment",
      "contractRef": "ListVehicleAssignmentInput.VehicleAssignment.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.vehicleId",
      "name": "vehicleId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicleAssignment",
      "contractRef": "ListVehicleAssignmentInput.VehicleAssignment.vehicleId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.driverId",
      "name": "driverId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicleAssignment",
      "contractRef": "ListVehicleAssignmentInput.VehicleAssignment.driverId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listVehicleAssignment",
      "contractRef": "ListVehicleAssignmentInput.VehicleAssignment.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.status",
      "name": "listVehicleAssignmentStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listVehicleAssignment"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.error",
      "name": "listVehicleAssignmentError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listVehicleAssignment"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.result",
      "name": "listVehicleAssignmentResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listVehicleAssignment",
      "contractRef": "ListVehicleAssignmentOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopInput.Workshop.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.status",
      "name": "listWorkshopStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listWorkshop"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.error",
      "name": "listWorkshopError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listWorkshop"
    },
    {
      "stateKey": "ui.cadastros_operacionais.listWorkshop.result",
      "name": "listWorkshopResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listWorkshop",
      "contractRef": "ListWorkshopOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreateDriverDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details"
    },
    {
      "actionId": "setCreateDriverDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification"
    },
    {
      "actionId": "setCreateDriverDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_name"
    },
    {
      "actionId": "setCreateDriverDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_docType"
    },
    {
      "actionId": "setCreateDriverDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_docId"
    },
    {
      "actionId": "setCreateDriverDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateDriverDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_base"
    },
    {
      "actionId": "setCreateDriverDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_person"
    },
    {
      "actionId": "setCreateDriverDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_general"
    },
    {
      "actionId": "setCreateDriverDetailsManutencaoFrota",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details_manutencaoFrota"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createDriver.input.details_manutencaoFrota"
    },
    {
      "actionId": "createDriver",
      "kind": "command",
      "commandRef": "createDriver",
      "routeRef": "createDriverRoute",
      "inputTypeRef": "CreateDriverInput",
      "outputTypeRef": "CreateDriverOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details",
        "ui.cadastros_operacionais.createDriver.input.details_identification",
        "ui.cadastros_operacionais.createDriver.input.details_identification_name",
        "ui.cadastros_operacionais.createDriver.input.details_identification_docType",
        "ui.cadastros_operacionais.createDriver.input.details_identification_docId",
        "ui.cadastros_operacionais.createDriver.input.details_identification_countryCode",
        "ui.cadastros_operacionais.createDriver.input.details_base",
        "ui.cadastros_operacionais.createDriver.input.details_person",
        "ui.cadastros_operacionais.createDriver.input.details_general",
        "ui.cadastros_operacionais.createDriver.input.details_manutencaoFrota"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createDriver.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.createDriver.status",
      "errorStateKey": "ui.cadastros_operacionais.createDriver.error",
      "refreshActionIds": [
        "listDriver"
      ]
    },
    {
      "actionId": "setCreateVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details"
    },
    {
      "actionId": "setCreateVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_identification"
    },
    {
      "actionId": "setCreateVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_identification_name"
    },
    {
      "actionId": "setCreateVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateVehicleDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_base"
    },
    {
      "actionId": "setCreateVehicleDetailsAssetVehicle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle"
    },
    {
      "actionId": "setCreateVehicleDetailsAssetVehiclePlate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_plate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_plate"
    },
    {
      "actionId": "setCreateVehicleDetailsAssetVehicleModel",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_model"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_model"
    },
    {
      "actionId": "setCreateVehicleDetailsAssetVehicleYear",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_year"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_year"
    },
    {
      "actionId": "setCreateVehicleDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_general"
    },
    {
      "actionId": "setCreateVehicleDetailsManutencaoFrota",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota"
    },
    {
      "actionId": "setCreateVehicleDetailsManutencaoFrotaCurrentMileageKm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota_currentMileageKm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota_currentMileageKm"
    },
    {
      "actionId": "createVehicle",
      "kind": "command",
      "commandRef": "createVehicle",
      "routeRef": "createVehicleRoute",
      "inputTypeRef": "CreateVehicleInput",
      "outputTypeRef": "CreateVehicleOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details",
        "ui.cadastros_operacionais.createVehicle.input.details_identification",
        "ui.cadastros_operacionais.createVehicle.input.details_identification_name",
        "ui.cadastros_operacionais.createVehicle.input.details_identification_countryCode",
        "ui.cadastros_operacionais.createVehicle.input.details_base",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_plate",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_model",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_year",
        "ui.cadastros_operacionais.createVehicle.input.details_general",
        "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota",
        "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota_currentMileageKm"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.createVehicle.status",
      "errorStateKey": "ui.cadastros_operacionais.createVehicle.error",
      "refreshActionIds": [
        "listVehicle"
      ]
    },
    {
      "actionId": "setCreateVehicleAssignmentVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.vehicleId"
    },
    {
      "actionId": "setCreateVehicleAssignmentDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.input.driverId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.driverId"
    },
    {
      "actionId": "setCreateVehicleAssignmentDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.details"
    },
    {
      "actionId": "setCreateVehicleAssignmentDetailsAssignmentLabel",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.input.details_assignmentLabel"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createVehicleAssignment.input.details_assignmentLabel"
    },
    {
      "actionId": "createVehicleAssignment",
      "kind": "command",
      "commandRef": "createVehicleAssignment",
      "routeRef": "createVehicleAssignmentRoute",
      "inputTypeRef": "CreateVehicleAssignmentInput",
      "outputTypeRef": "CreateVehicleAssignmentOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.input.vehicleId",
        "ui.cadastros_operacionais.createVehicleAssignment.input.driverId",
        "ui.cadastros_operacionais.createVehicleAssignment.input.details",
        "ui.cadastros_operacionais.createVehicleAssignment.input.details_assignmentLabel"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.createVehicleAssignment.status",
      "errorStateKey": "ui.cadastros_operacionais.createVehicleAssignment.error",
      "refreshActionIds": [
        "listVehicleAssignment"
      ]
    },
    {
      "actionId": "setCreateWorkshopDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details"
    },
    {
      "actionId": "setCreateWorkshopDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification"
    },
    {
      "actionId": "setCreateWorkshopDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_name"
    },
    {
      "actionId": "setCreateWorkshopDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_docType"
    },
    {
      "actionId": "setCreateWorkshopDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_docId"
    },
    {
      "actionId": "setCreateWorkshopDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateWorkshopDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_base"
    },
    {
      "actionId": "setCreateWorkshopDetailsCompany",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_company"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_company"
    },
    {
      "actionId": "setCreateWorkshopDetailsCompanyCompanyKind",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_company_companyKind"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_company_companyKind"
    },
    {
      "actionId": "setCreateWorkshopDetailsCompanyLegalName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_company_legalName"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_company_legalName"
    },
    {
      "actionId": "setCreateWorkshopDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_general"
    },
    {
      "actionId": "setCreateWorkshopDetailsManutencaoFrota",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details_manutencaoFrota"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.createWorkshop.input.details_manutencaoFrota"
    },
    {
      "actionId": "createWorkshop",
      "kind": "command",
      "commandRef": "createWorkshop",
      "routeRef": "createWorkshopRoute",
      "inputTypeRef": "CreateWorkshopInput",
      "outputTypeRef": "CreateWorkshopOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_name",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_docType",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_docId",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_countryCode",
        "ui.cadastros_operacionais.createWorkshop.input.details_base",
        "ui.cadastros_operacionais.createWorkshop.input.details_company",
        "ui.cadastros_operacionais.createWorkshop.input.details_company_companyKind",
        "ui.cadastros_operacionais.createWorkshop.input.details_company_legalName",
        "ui.cadastros_operacionais.createWorkshop.input.details_general",
        "ui.cadastros_operacionais.createWorkshop.input.details_manutencaoFrota"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.createWorkshop.status",
      "errorStateKey": "ui.cadastros_operacionais.createWorkshop.error",
      "refreshActionIds": [
        "listWorkshop"
      ]
    },
    {
      "actionId": "setUpdateDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.id"
    },
    {
      "actionId": "setUpdateDriverDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details"
    },
    {
      "actionId": "setUpdateDriverDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification"
    },
    {
      "actionId": "setUpdateDriverDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_name"
    },
    {
      "actionId": "setUpdateDriverDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_docType"
    },
    {
      "actionId": "setUpdateDriverDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_docId"
    },
    {
      "actionId": "setUpdateDriverDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_identification_countryCode"
    },
    {
      "actionId": "setUpdateDriverDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_base"
    },
    {
      "actionId": "setUpdateDriverDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_person"
    },
    {
      "actionId": "setUpdateDriverDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_general"
    },
    {
      "actionId": "setUpdateDriverDetailsManutencaoFrota",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.details_manutencaoFrota"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateDriver.input.details_manutencaoFrota"
    },
    {
      "actionId": "updateDriver",
      "kind": "command",
      "commandRef": "updateDriver",
      "routeRef": "updateDriverRoute",
      "inputTypeRef": "UpdateDriverInput",
      "outputTypeRef": "UpdateDriverOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.id",
        "ui.cadastros_operacionais.updateDriver.input.details",
        "ui.cadastros_operacionais.updateDriver.input.details_identification",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_name",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_docType",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_docId",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_countryCode",
        "ui.cadastros_operacionais.updateDriver.input.details_base",
        "ui.cadastros_operacionais.updateDriver.input.details_person",
        "ui.cadastros_operacionais.updateDriver.input.details_general",
        "ui.cadastros_operacionais.updateDriver.input.details_manutencaoFrota"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.updateDriver.status",
      "errorStateKey": "ui.cadastros_operacionais.updateDriver.error",
      "refreshActionIds": [
        "listDriver"
      ]
    },
    {
      "actionId": "setUpdateVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.id"
    },
    {
      "actionId": "setUpdateVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details"
    },
    {
      "actionId": "setUpdateVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_identification"
    },
    {
      "actionId": "setUpdateVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_identification_name"
    },
    {
      "actionId": "setUpdateVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setUpdateVehicleDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_base"
    },
    {
      "actionId": "setUpdateVehicleDetailsAssetVehicle",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle"
    },
    {
      "actionId": "setUpdateVehicleDetailsAssetVehiclePlate",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_plate"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_plate"
    },
    {
      "actionId": "setUpdateVehicleDetailsAssetVehicleModel",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_model"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_model"
    },
    {
      "actionId": "setUpdateVehicleDetailsAssetVehicleYear",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_year"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_year"
    },
    {
      "actionId": "setUpdateVehicleDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_general"
    },
    {
      "actionId": "setUpdateVehicleDetailsManutencaoFrota",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota"
    },
    {
      "actionId": "setUpdateVehicleDetailsManutencaoFrotaCurrentMileageKm",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota_currentMileageKm"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota_currentMileageKm"
    },
    {
      "actionId": "updateVehicle",
      "kind": "command",
      "commandRef": "updateVehicle",
      "routeRef": "updateVehicleRoute",
      "inputTypeRef": "UpdateVehicleInput",
      "outputTypeRef": "UpdateVehicleOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.id",
        "ui.cadastros_operacionais.updateVehicle.input.details",
        "ui.cadastros_operacionais.updateVehicle.input.details_identification",
        "ui.cadastros_operacionais.updateVehicle.input.details_identification_name",
        "ui.cadastros_operacionais.updateVehicle.input.details_identification_countryCode",
        "ui.cadastros_operacionais.updateVehicle.input.details_base",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_plate",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_model",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_year",
        "ui.cadastros_operacionais.updateVehicle.input.details_general",
        "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota",
        "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota_currentMileageKm"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.updateVehicle.status",
      "errorStateKey": "ui.cadastros_operacionais.updateVehicle.error",
      "refreshActionIds": [
        "listVehicle"
      ]
    },
    {
      "actionId": "setUpdateVehicleAssignmentId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.id"
    },
    {
      "actionId": "setUpdateVehicleAssignmentVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.vehicleId"
    },
    {
      "actionId": "setUpdateVehicleAssignmentDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.driverId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.driverId"
    },
    {
      "actionId": "setUpdateVehicleAssignmentDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.details"
    },
    {
      "actionId": "setUpdateVehicleAssignmentDetailsAssignmentLabel",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.details_assignmentLabel"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateVehicleAssignment.input.details_assignmentLabel"
    },
    {
      "actionId": "updateVehicleAssignment",
      "kind": "command",
      "commandRef": "updateVehicleAssignment",
      "routeRef": "updateVehicleAssignmentRoute",
      "inputTypeRef": "UpdateVehicleAssignmentInput",
      "outputTypeRef": "UpdateVehicleAssignmentOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.id",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.vehicleId",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.driverId",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.details",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.details_assignmentLabel"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.updateVehicleAssignment.status",
      "errorStateKey": "ui.cadastros_operacionais.updateVehicleAssignment.error",
      "refreshActionIds": [
        "listVehicleAssignment"
      ]
    },
    {
      "actionId": "setUpdateWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.id"
    },
    {
      "actionId": "setUpdateWorkshopDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details"
    },
    {
      "actionId": "setUpdateWorkshopDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification"
    },
    {
      "actionId": "setUpdateWorkshopDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_name"
    },
    {
      "actionId": "setUpdateWorkshopDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docType"
    },
    {
      "actionId": "setUpdateWorkshopDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docId"
    },
    {
      "actionId": "setUpdateWorkshopDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_identification_countryCode"
    },
    {
      "actionId": "setUpdateWorkshopDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_base"
    },
    {
      "actionId": "setUpdateWorkshopDetailsCompany",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_company"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_company"
    },
    {
      "actionId": "setUpdateWorkshopDetailsCompanyCompanyKind",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_company_companyKind"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_company_companyKind"
    },
    {
      "actionId": "setUpdateWorkshopDetailsCompanyLegalName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_company_legalName"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_company_legalName"
    },
    {
      "actionId": "setUpdateWorkshopDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_general"
    },
    {
      "actionId": "setUpdateWorkshopDetailsManutencaoFrota",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.details_manutencaoFrota"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.updateWorkshop.input.details_manutencaoFrota"
    },
    {
      "actionId": "updateWorkshop",
      "kind": "command",
      "commandRef": "updateWorkshop",
      "routeRef": "updateWorkshopRoute",
      "inputTypeRef": "UpdateWorkshopInput",
      "outputTypeRef": "UpdateWorkshopOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.id",
        "ui.cadastros_operacionais.updateWorkshop.input.details",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_name",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docType",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docId",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_countryCode",
        "ui.cadastros_operacionais.updateWorkshop.input.details_base",
        "ui.cadastros_operacionais.updateWorkshop.input.details_company",
        "ui.cadastros_operacionais.updateWorkshop.input.details_company_companyKind",
        "ui.cadastros_operacionais.updateWorkshop.input.details_company_legalName",
        "ui.cadastros_operacionais.updateWorkshop.input.details_general",
        "ui.cadastros_operacionais.updateWorkshop.input.details_manutencaoFrota"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.updateWorkshop.status",
      "errorStateKey": "ui.cadastros_operacionais.updateWorkshop.error",
      "refreshActionIds": [
        "listWorkshop"
      ]
    },
    {
      "actionId": "setListDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.id"
    },
    {
      "actionId": "setListDriverDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details"
    },
    {
      "actionId": "setListDriverDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification"
    },
    {
      "actionId": "setListDriverDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_subtype"
    },
    {
      "actionId": "setListDriverDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_name"
    },
    {
      "actionId": "setListDriverDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_status"
    },
    {
      "actionId": "setListDriverDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_docType"
    },
    {
      "actionId": "setListDriverDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_docId"
    },
    {
      "actionId": "setListDriverDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.details_identification_countryCode"
    },
    {
      "actionId": "setListDriverPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listDriver.input.page"
    },
    {
      "actionId": "listDriver",
      "kind": "query",
      "commandRef": "listDriver",
      "routeRef": "listDriverRoute",
      "inputTypeRef": "ListDriverInput",
      "outputTypeRef": "ListDriverOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.id",
        "ui.cadastros_operacionais.listDriver.input.details",
        "ui.cadastros_operacionais.listDriver.input.details_identification",
        "ui.cadastros_operacionais.listDriver.input.details_identification_subtype",
        "ui.cadastros_operacionais.listDriver.input.details_identification_name",
        "ui.cadastros_operacionais.listDriver.input.details_identification_status",
        "ui.cadastros_operacionais.listDriver.input.details_identification_docType",
        "ui.cadastros_operacionais.listDriver.input.details_identification_docId",
        "ui.cadastros_operacionais.listDriver.input.details_identification_countryCode",
        "ui.cadastros_operacionais.listDriver.input.page"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listDriver.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.listDriver.status",
      "errorStateKey": "ui.cadastros_operacionais.listDriver.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.id"
    },
    {
      "actionId": "setListVehicleDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details"
    },
    {
      "actionId": "setListVehicleDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_subtype"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_name"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_status"
    },
    {
      "actionId": "setListVehicleDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.details_identification_countryCode"
    },
    {
      "actionId": "setListVehiclePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicle.input.page"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "commandRef": "listVehicle",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.id",
        "ui.cadastros_operacionais.listVehicle.input.details",
        "ui.cadastros_operacionais.listVehicle.input.details_identification",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_subtype",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_name",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_status",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_countryCode",
        "ui.cadastros_operacionais.listVehicle.input.page"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.listVehicle.status",
      "errorStateKey": "ui.cadastros_operacionais.listVehicle.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListVehicleAssignmentId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.id"
    },
    {
      "actionId": "setListVehicleAssignmentVehicleId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.input.vehicleId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.vehicleId"
    },
    {
      "actionId": "setListVehicleAssignmentDriverId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.input.driverId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.driverId"
    },
    {
      "actionId": "setListVehicleAssignmentPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listVehicleAssignment.input.page"
    },
    {
      "actionId": "listVehicleAssignment",
      "kind": "query",
      "commandRef": "listVehicleAssignment",
      "routeRef": "listVehicleAssignmentRoute",
      "inputTypeRef": "ListVehicleAssignmentInput",
      "outputTypeRef": "ListVehicleAssignmentOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.input.id",
        "ui.cadastros_operacionais.listVehicleAssignment.input.vehicleId",
        "ui.cadastros_operacionais.listVehicleAssignment.input.driverId",
        "ui.cadastros_operacionais.listVehicleAssignment.input.page"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.listVehicleAssignment.status",
      "errorStateKey": "ui.cadastros_operacionais.listVehicleAssignment.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListWorkshopId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.id"
    },
    {
      "actionId": "setListWorkshopDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details"
    },
    {
      "actionId": "setListWorkshopDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification"
    },
    {
      "actionId": "setListWorkshopDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_subtype"
    },
    {
      "actionId": "setListWorkshopDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_name"
    },
    {
      "actionId": "setListWorkshopDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_status"
    },
    {
      "actionId": "setListWorkshopDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_docType"
    },
    {
      "actionId": "setListWorkshopDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_docId"
    },
    {
      "actionId": "setListWorkshopDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.details_identification_countryCode"
    },
    {
      "actionId": "setListWorkshopPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.cadastros_operacionais.listWorkshop.input.page"
    },
    {
      "actionId": "listWorkshop",
      "kind": "query",
      "commandRef": "listWorkshop",
      "routeRef": "listWorkshopRoute",
      "inputTypeRef": "ListWorkshopInput",
      "outputTypeRef": "ListWorkshopOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.id",
        "ui.cadastros_operacionais.listWorkshop.input.details",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_subtype",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_name",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_status",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_docType",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_docId",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_countryCode",
        "ui.cadastros_operacionais.listWorkshop.input.page"
      ],
      "outputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.result"
      ],
      "statusStateKey": "ui.cadastros_operacionais.listWorkshop.status",
      "errorStateKey": "ui.cadastros_operacionais.listWorkshop.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listDriver",
      "preconditions": []
    },
    {
      "value": "createDriver",
      "kind": "command",
      "actionId": "createDriver",
      "preconditions": []
    },
    {
      "value": "createVehicle",
      "kind": "command",
      "actionId": "createVehicle",
      "preconditions": []
    },
    {
      "value": "createVehicleAssignment",
      "kind": "command",
      "actionId": "createVehicleAssignment",
      "preconditions": []
    },
    {
      "value": "createWorkshop",
      "kind": "command",
      "actionId": "createWorkshop",
      "preconditions": []
    },
    {
      "value": "updateDriver",
      "kind": "command",
      "actionId": "updateDriver",
      "preconditions": [
        "ui.cadastros_operacionais.updateDriver.input.id"
      ]
    },
    {
      "value": "updateVehicle",
      "kind": "command",
      "actionId": "updateVehicle",
      "preconditions": [
        "ui.cadastros_operacionais.updateVehicle.input.id"
      ]
    },
    {
      "value": "updateVehicleAssignment",
      "kind": "command",
      "actionId": "updateVehicleAssignment",
      "preconditions": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.id"
      ]
    },
    {
      "value": "updateWorkshop",
      "kind": "command",
      "actionId": "updateWorkshop",
      "preconditions": [
        "ui.cadastros_operacionais.updateWorkshop.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createDriver",
      "kind": "command",
      "routeRef": "createDriverRoute",
      "inputTypeRef": "CreateDriverInput",
      "outputTypeRef": "CreateDriverOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createDriver.input.details",
        "ui.cadastros_operacionais.createDriver.input.details_identification",
        "ui.cadastros_operacionais.createDriver.input.details_identification_name",
        "ui.cadastros_operacionais.createDriver.input.details_identification_docType",
        "ui.cadastros_operacionais.createDriver.input.details_identification_docId",
        "ui.cadastros_operacionais.createDriver.input.details_identification_countryCode",
        "ui.cadastros_operacionais.createDriver.input.details_base",
        "ui.cadastros_operacionais.createDriver.input.details_person",
        "ui.cadastros_operacionais.createDriver.input.details_general",
        "ui.cadastros_operacionais.createDriver.input.details_manutencaoFrota"
      ],
      "resultStateKey": "ui.cadastros_operacionais.createDriver.result"
    },
    {
      "actionId": "createVehicle",
      "kind": "command",
      "routeRef": "createVehicleRoute",
      "inputTypeRef": "CreateVehicleInput",
      "outputTypeRef": "CreateVehicleOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createVehicle.input.details",
        "ui.cadastros_operacionais.createVehicle.input.details_identification",
        "ui.cadastros_operacionais.createVehicle.input.details_identification_name",
        "ui.cadastros_operacionais.createVehicle.input.details_identification_countryCode",
        "ui.cadastros_operacionais.createVehicle.input.details_base",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_plate",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_model",
        "ui.cadastros_operacionais.createVehicle.input.details_assetVehicle_year",
        "ui.cadastros_operacionais.createVehicle.input.details_general",
        "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota",
        "ui.cadastros_operacionais.createVehicle.input.details_manutencaoFrota_currentMileageKm"
      ],
      "resultStateKey": "ui.cadastros_operacionais.createVehicle.result"
    },
    {
      "actionId": "createVehicleAssignment",
      "kind": "command",
      "routeRef": "createVehicleAssignmentRoute",
      "inputTypeRef": "CreateVehicleAssignmentInput",
      "outputTypeRef": "CreateVehicleAssignmentOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createVehicleAssignment.input.vehicleId",
        "ui.cadastros_operacionais.createVehicleAssignment.input.driverId",
        "ui.cadastros_operacionais.createVehicleAssignment.input.details",
        "ui.cadastros_operacionais.createVehicleAssignment.input.details_assignmentLabel"
      ],
      "resultStateKey": "ui.cadastros_operacionais.createVehicleAssignment.result"
    },
    {
      "actionId": "createWorkshop",
      "kind": "command",
      "routeRef": "createWorkshopRoute",
      "inputTypeRef": "CreateWorkshopInput",
      "outputTypeRef": "CreateWorkshopOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.createWorkshop.input.details",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_name",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_docType",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_docId",
        "ui.cadastros_operacionais.createWorkshop.input.details_identification_countryCode",
        "ui.cadastros_operacionais.createWorkshop.input.details_base",
        "ui.cadastros_operacionais.createWorkshop.input.details_company",
        "ui.cadastros_operacionais.createWorkshop.input.details_company_companyKind",
        "ui.cadastros_operacionais.createWorkshop.input.details_company_legalName",
        "ui.cadastros_operacionais.createWorkshop.input.details_general",
        "ui.cadastros_operacionais.createWorkshop.input.details_manutencaoFrota"
      ],
      "resultStateKey": "ui.cadastros_operacionais.createWorkshop.result"
    },
    {
      "actionId": "updateDriver",
      "kind": "command",
      "routeRef": "updateDriverRoute",
      "inputTypeRef": "UpdateDriverInput",
      "outputTypeRef": "UpdateDriverOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateDriver.input.id",
        "ui.cadastros_operacionais.updateDriver.input.details",
        "ui.cadastros_operacionais.updateDriver.input.details_identification",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_name",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_docType",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_docId",
        "ui.cadastros_operacionais.updateDriver.input.details_identification_countryCode",
        "ui.cadastros_operacionais.updateDriver.input.details_base",
        "ui.cadastros_operacionais.updateDriver.input.details_person",
        "ui.cadastros_operacionais.updateDriver.input.details_general",
        "ui.cadastros_operacionais.updateDriver.input.details_manutencaoFrota"
      ],
      "resultStateKey": "ui.cadastros_operacionais.updateDriver.result"
    },
    {
      "actionId": "updateVehicle",
      "kind": "command",
      "routeRef": "updateVehicleRoute",
      "inputTypeRef": "UpdateVehicleInput",
      "outputTypeRef": "UpdateVehicleOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateVehicle.input.id",
        "ui.cadastros_operacionais.updateVehicle.input.details",
        "ui.cadastros_operacionais.updateVehicle.input.details_identification",
        "ui.cadastros_operacionais.updateVehicle.input.details_identification_name",
        "ui.cadastros_operacionais.updateVehicle.input.details_identification_countryCode",
        "ui.cadastros_operacionais.updateVehicle.input.details_base",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_plate",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_model",
        "ui.cadastros_operacionais.updateVehicle.input.details_assetVehicle_year",
        "ui.cadastros_operacionais.updateVehicle.input.details_general",
        "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota",
        "ui.cadastros_operacionais.updateVehicle.input.details_manutencaoFrota_currentMileageKm"
      ],
      "resultStateKey": "ui.cadastros_operacionais.updateVehicle.result"
    },
    {
      "actionId": "updateVehicleAssignment",
      "kind": "command",
      "routeRef": "updateVehicleAssignmentRoute",
      "inputTypeRef": "UpdateVehicleAssignmentInput",
      "outputTypeRef": "UpdateVehicleAssignmentOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateVehicleAssignment.input.id",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.vehicleId",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.driverId",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.details",
        "ui.cadastros_operacionais.updateVehicleAssignment.input.details_assignmentLabel"
      ],
      "resultStateKey": "ui.cadastros_operacionais.updateVehicleAssignment.result"
    },
    {
      "actionId": "updateWorkshop",
      "kind": "command",
      "routeRef": "updateWorkshopRoute",
      "inputTypeRef": "UpdateWorkshopInput",
      "outputTypeRef": "UpdateWorkshopOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.updateWorkshop.input.id",
        "ui.cadastros_operacionais.updateWorkshop.input.details",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_name",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docType",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_docId",
        "ui.cadastros_operacionais.updateWorkshop.input.details_identification_countryCode",
        "ui.cadastros_operacionais.updateWorkshop.input.details_base",
        "ui.cadastros_operacionais.updateWorkshop.input.details_company",
        "ui.cadastros_operacionais.updateWorkshop.input.details_company_companyKind",
        "ui.cadastros_operacionais.updateWorkshop.input.details_company_legalName",
        "ui.cadastros_operacionais.updateWorkshop.input.details_general",
        "ui.cadastros_operacionais.updateWorkshop.input.details_manutencaoFrota"
      ],
      "resultStateKey": "ui.cadastros_operacionais.updateWorkshop.result"
    },
    {
      "actionId": "listDriver",
      "kind": "query",
      "routeRef": "listDriverRoute",
      "inputTypeRef": "ListDriverInput",
      "outputTypeRef": "ListDriverOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listDriver.input.id",
        "ui.cadastros_operacionais.listDriver.input.details",
        "ui.cadastros_operacionais.listDriver.input.details_identification",
        "ui.cadastros_operacionais.listDriver.input.details_identification_subtype",
        "ui.cadastros_operacionais.listDriver.input.details_identification_name",
        "ui.cadastros_operacionais.listDriver.input.details_identification_status",
        "ui.cadastros_operacionais.listDriver.input.details_identification_docType",
        "ui.cadastros_operacionais.listDriver.input.details_identification_docId",
        "ui.cadastros_operacionais.listDriver.input.details_identification_countryCode",
        "ui.cadastros_operacionais.listDriver.input.page"
      ],
      "resultStateKey": "ui.cadastros_operacionais.listDriver.result"
    },
    {
      "actionId": "listVehicle",
      "kind": "query",
      "routeRef": "listVehicleRoute",
      "inputTypeRef": "ListVehicleInput",
      "outputTypeRef": "ListVehicleOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listVehicle.input.id",
        "ui.cadastros_operacionais.listVehicle.input.details",
        "ui.cadastros_operacionais.listVehicle.input.details_identification",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_subtype",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_name",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_status",
        "ui.cadastros_operacionais.listVehicle.input.details_identification_countryCode",
        "ui.cadastros_operacionais.listVehicle.input.page"
      ],
      "resultStateKey": "ui.cadastros_operacionais.listVehicle.result"
    },
    {
      "actionId": "listVehicleAssignment",
      "kind": "query",
      "routeRef": "listVehicleAssignmentRoute",
      "inputTypeRef": "ListVehicleAssignmentInput",
      "outputTypeRef": "ListVehicleAssignmentOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listVehicleAssignment.input.id",
        "ui.cadastros_operacionais.listVehicleAssignment.input.vehicleId",
        "ui.cadastros_operacionais.listVehicleAssignment.input.driverId",
        "ui.cadastros_operacionais.listVehicleAssignment.input.page"
      ],
      "resultStateKey": "ui.cadastros_operacionais.listVehicleAssignment.result"
    },
    {
      "actionId": "listWorkshop",
      "kind": "query",
      "routeRef": "listWorkshopRoute",
      "inputTypeRef": "ListWorkshopInput",
      "outputTypeRef": "ListWorkshopOutput",
      "inputStateKeys": [
        "ui.cadastros_operacionais.listWorkshop.input.id",
        "ui.cadastros_operacionais.listWorkshop.input.details",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_subtype",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_name",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_status",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_docType",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_docId",
        "ui.cadastros_operacionais.listWorkshop.input.details_identification_countryCode",
        "ui.cadastros_operacionais.listWorkshop.input.page"
      ],
      "resultStateKey": "ui.cadastros_operacionais.listWorkshop.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "cadastros_operacionais__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/manutencaoFrota/web/shared/cadastros_operacionais.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/shared/cadastros_operacionais.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/contracts/cadastros_operacionais.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
