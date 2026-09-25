export const definition = {
  "schemaVersion": "2026-09-24-agent-defs-l2-shared-v3",
  "moduleName": "agendaClinica",
  "pageId": "dados_recepcionista",
  "pageName": "Meus dados",
  "baseClassName": "DadosRecepcionistaShared",
  "routePattern": "/cadastro_recepcionista/dados_recepcionista",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/dados_recepcionista.defs.ts",
    "calls": [
      {
        "actionId": "createProfissional",
        "routeConst": "createProfissionalRoute",
        "inputType": "CreateProfissionalInput",
        "outputType": "CreateProfissionalOutput"
      },
      {
        "actionId": "createRecepcionista",
        "routeConst": "createRecepcionistaRoute",
        "inputType": "CreateRecepcionistaInput",
        "outputType": "CreateRecepcionistaOutput"
      },
      {
        "actionId": "updateProfissional",
        "routeConst": "updateProfissionalRoute",
        "inputType": "UpdateProfissionalInput",
        "outputType": "UpdateProfissionalOutput"
      },
      {
        "actionId": "updateRecepcionista",
        "routeConst": "updateRecepcionistaRoute",
        "inputType": "UpdateRecepcionistaInput",
        "outputType": "UpdateRecepcionistaOutput"
      },
      {
        "actionId": "listProfissional",
        "routeConst": "listProfissionalRoute",
        "inputType": "ListProfissionalInput",
        "outputType": "ListProfissionalOutput"
      },
      {
        "actionId": "listRecepcionista",
        "routeConst": "listRecepcionistaRoute",
        "inputType": "ListRecepcionistaInput",
        "outputType": "ListRecepcionistaOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.dados_recepcionista.pageStatus",
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
      "stateKey": "ui.dados_recepcionista.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base"
      ]
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_person_occupation",
      "name": "occupation",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.person.occupation",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_person_privacyConsent",
      "name": "privacyConsent",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.person.privacyConsent",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.status",
      "name": "createProfissionalStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createProfissional"
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.error",
      "name": "createProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createProfissional"
    },
    {
      "stateKey": "ui.dados_recepcionista.createProfissional.result",
      "name": "createProfissionalResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_agendaClinica",
      "name": "agendaClinica",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaInput.Recepcionista.details.agendaClinica",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.status",
      "name": "createRecepcionistaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createRecepcionista"
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.error",
      "name": "createRecepcionistaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createRecepcionista"
    },
    {
      "stateKey": "ui.dados_recepcionista.createRecepcionista.result",
      "name": "createRecepcionistaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createRecepcionista",
      "contractRef": "CreateRecepcionistaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.version",
      "name": "version",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.version",
      "source": "selectedEntity",
      "presentation": "hidden",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_person_occupation",
      "name": "occupation",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.person.occupation",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_person_privacyConsent",
      "name": "privacyConsent",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.person.privacyConsent",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.status",
      "name": "updateProfissionalStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateProfissional"
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.error",
      "name": "updateProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateProfissional"
    },
    {
      "stateKey": "ui.dados_recepcionista.updateProfissional.result",
      "name": "updateProfissionalResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.version",
      "name": "version",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.version",
      "source": "selectedEntity",
      "presentation": "hidden",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_person",
      "name": "person",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.person",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_agendaClinica",
      "name": "agendaClinica",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaInput.Recepcionista.details.agendaClinica",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.status",
      "name": "updateRecepcionistaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateRecepcionista"
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.error",
      "name": "updateRecepcionistaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateRecepcionista"
    },
    {
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.result",
      "name": "updateRecepcionistaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateRecepcionista",
      "contractRef": "UpdateRecepcionistaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalInput.Profissional.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.status",
      "name": "listProfissionalStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.error",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.dados_recepcionista.listProfissional.result",
      "name": "listProfissionalResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaInput.Recepcionista.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.status",
      "name": "listRecepcionistaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listRecepcionista"
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.error",
      "name": "listRecepcionistaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listRecepcionista"
    },
    {
      "stateKey": "ui.dados_recepcionista.listRecepcionista.result",
      "name": "listRecepcionistaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listRecepcionista",
      "contractRef": "ListRecepcionistaOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreateProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_name"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateProfissionalDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_person"
    },
    {
      "actionId": "setCreateProfissionalDetailsPersonOccupation",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_person_occupation"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_person_occupation"
    },
    {
      "actionId": "setCreateProfissionalDetailsPersonPrivacyConsent",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details_person_privacyConsent"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createProfissional.input.details_person_privacyConsent"
    },
    {
      "actionId": "createProfissional",
      "kind": "command",
      "commandRef": "createProfissional",
      "routeRef": "createProfissionalRoute",
      "inputTypeRef": "CreateProfissionalInput",
      "outputTypeRef": "CreateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details",
        "ui.dados_recepcionista.createProfissional.input.details_identification",
        "ui.dados_recepcionista.createProfissional.input.details_identification_name",
        "ui.dados_recepcionista.createProfissional.input.details_identification_docType",
        "ui.dados_recepcionista.createProfissional.input.details_identification_docId",
        "ui.dados_recepcionista.createProfissional.input.details_identification_countryCode",
        "ui.dados_recepcionista.createProfissional.input.details_person",
        "ui.dados_recepcionista.createProfissional.input.details_person_occupation",
        "ui.dados_recepcionista.createProfissional.input.details_person_privacyConsent"
      ],
      "outputStateKeys": [
        "ui.dados_recepcionista.createProfissional.result"
      ],
      "statusStateKey": "ui.dados_recepcionista.createProfissional.status",
      "errorStateKey": "ui.dados_recepcionista.createProfissional.error",
      "refreshActionIds": [
        "listProfissional"
      ]
    },
    {
      "actionId": "setCreateRecepcionistaDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_name"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_docType"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_docId"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_base"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_person"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_general"
    },
    {
      "actionId": "setCreateRecepcionistaDetailsAgendaClinica",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details_agendaClinica"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.createRecepcionista.input.details_agendaClinica"
    },
    {
      "actionId": "createRecepcionista",
      "kind": "command",
      "commandRef": "createRecepcionista",
      "routeRef": "createRecepcionistaRoute",
      "inputTypeRef": "CreateRecepcionistaInput",
      "outputTypeRef": "CreateRecepcionistaOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_name",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_docType",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_docId",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_countryCode",
        "ui.dados_recepcionista.createRecepcionista.input.details_base",
        "ui.dados_recepcionista.createRecepcionista.input.details_person",
        "ui.dados_recepcionista.createRecepcionista.input.details_general",
        "ui.dados_recepcionista.createRecepcionista.input.details_agendaClinica"
      ],
      "outputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.result"
      ],
      "statusStateKey": "ui.dados_recepcionista.createRecepcionista.status",
      "errorStateKey": "ui.dados_recepcionista.createRecepcionista.error",
      "refreshActionIds": [
        "listRecepcionista"
      ]
    },
    {
      "actionId": "setUpdateProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_name"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setUpdateProfissionalDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_person"
    },
    {
      "actionId": "setUpdateProfissionalDetailsPersonOccupation",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_person_occupation"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_person_occupation"
    },
    {
      "actionId": "setUpdateProfissionalDetailsPersonPrivacyConsent",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.details_person_privacyConsent"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateProfissional.input.details_person_privacyConsent"
    },
    {
      "actionId": "updateProfissional",
      "kind": "command",
      "commandRef": "updateProfissional",
      "routeRef": "updateProfissionalRoute",
      "inputTypeRef": "UpdateProfissionalInput",
      "outputTypeRef": "UpdateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.id",
        "ui.dados_recepcionista.updateProfissional.input.version",
        "ui.dados_recepcionista.updateProfissional.input.details",
        "ui.dados_recepcionista.updateProfissional.input.details_identification",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_name",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_docType",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_docId",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_countryCode",
        "ui.dados_recepcionista.updateProfissional.input.details_person",
        "ui.dados_recepcionista.updateProfissional.input.details_person_occupation",
        "ui.dados_recepcionista.updateProfissional.input.details_person_privacyConsent"
      ],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.result"
      ],
      "statusStateKey": "ui.dados_recepcionista.updateProfissional.status",
      "errorStateKey": "ui.dados_recepcionista.updateProfissional.error",
      "refreshActionIds": [
        "listProfissional"
      ]
    },
    {
      "actionId": "setUpdateRecepcionistaDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_name"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docType"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docId"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_identification_countryCode"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_base"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_person"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_general"
    },
    {
      "actionId": "setUpdateRecepcionistaDetailsAgendaClinica",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.details_agendaClinica"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.updateRecepcionista.input.details_agendaClinica"
    },
    {
      "actionId": "updateRecepcionista",
      "kind": "command",
      "commandRef": "updateRecepcionista",
      "routeRef": "updateRecepcionistaRoute",
      "inputTypeRef": "UpdateRecepcionistaInput",
      "outputTypeRef": "UpdateRecepcionistaOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.id",
        "ui.dados_recepcionista.updateRecepcionista.input.version",
        "ui.dados_recepcionista.updateRecepcionista.input.details",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_name",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docType",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docId",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_countryCode",
        "ui.dados_recepcionista.updateRecepcionista.input.details_base",
        "ui.dados_recepcionista.updateRecepcionista.input.details_person",
        "ui.dados_recepcionista.updateRecepcionista.input.details_general",
        "ui.dados_recepcionista.updateRecepcionista.input.details_agendaClinica"
      ],
      "outputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.result"
      ],
      "statusStateKey": "ui.dados_recepcionista.updateRecepcionista.status",
      "errorStateKey": "ui.dados_recepcionista.updateRecepcionista.error",
      "refreshActionIds": [
        "listRecepcionista"
      ]
    },
    {
      "actionId": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.id"
    },
    {
      "actionId": "setListProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details"
    },
    {
      "actionId": "setListProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_subtype"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_name"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_status"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProfissionalPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listProfissional.input.page"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.id",
        "ui.dados_recepcionista.listProfissional.input.details",
        "ui.dados_recepcionista.listProfissional.input.details_identification",
        "ui.dados_recepcionista.listProfissional.input.details_identification_subtype",
        "ui.dados_recepcionista.listProfissional.input.details_identification_name",
        "ui.dados_recepcionista.listProfissional.input.details_identification_status",
        "ui.dados_recepcionista.listProfissional.input.details_identification_docType",
        "ui.dados_recepcionista.listProfissional.input.details_identification_docId",
        "ui.dados_recepcionista.listProfissional.input.details_identification_countryCode",
        "ui.dados_recepcionista.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.dados_recepcionista.listProfissional.result"
      ],
      "statusStateKey": "ui.dados_recepcionista.listProfissional.status",
      "errorStateKey": "ui.dados_recepcionista.listProfissional.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListRecepcionistaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.id"
    },
    {
      "actionId": "setListRecepcionistaDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_subtype"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_name"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_status"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_docType"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_docId"
    },
    {
      "actionId": "setListRecepcionistaDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.details_identification_countryCode"
    },
    {
      "actionId": "setListRecepcionistaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_recepcionista.listRecepcionista.input.page"
    },
    {
      "actionId": "listRecepcionista",
      "kind": "query",
      "commandRef": "listRecepcionista",
      "routeRef": "listRecepcionistaRoute",
      "inputTypeRef": "ListRecepcionistaInput",
      "outputTypeRef": "ListRecepcionistaOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.id",
        "ui.dados_recepcionista.listRecepcionista.input.details",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_subtype",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_name",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_status",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_docType",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_docId",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_countryCode",
        "ui.dados_recepcionista.listRecepcionista.input.page"
      ],
      "outputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.result"
      ],
      "statusStateKey": "ui.dados_recepcionista.listRecepcionista.status",
      "errorStateKey": "ui.dados_recepcionista.listRecepcionista.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listProfissional",
      "preconditions": []
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createProfissional",
      "kind": "command",
      "routeRef": "createProfissionalRoute",
      "inputTypeRef": "CreateProfissionalInput",
      "outputTypeRef": "CreateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.createProfissional.input.details",
        "ui.dados_recepcionista.createProfissional.input.details_identification",
        "ui.dados_recepcionista.createProfissional.input.details_identification_name",
        "ui.dados_recepcionista.createProfissional.input.details_identification_docType",
        "ui.dados_recepcionista.createProfissional.input.details_identification_docId",
        "ui.dados_recepcionista.createProfissional.input.details_identification_countryCode",
        "ui.dados_recepcionista.createProfissional.input.details_person",
        "ui.dados_recepcionista.createProfissional.input.details_person_occupation",
        "ui.dados_recepcionista.createProfissional.input.details_person_privacyConsent"
      ],
      "resultStateKey": "ui.dados_recepcionista.createProfissional.result"
    },
    {
      "actionId": "createRecepcionista",
      "kind": "command",
      "routeRef": "createRecepcionistaRoute",
      "inputTypeRef": "CreateRecepcionistaInput",
      "outputTypeRef": "CreateRecepcionistaOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.createRecepcionista.input.details",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_name",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_docType",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_docId",
        "ui.dados_recepcionista.createRecepcionista.input.details_identification_countryCode",
        "ui.dados_recepcionista.createRecepcionista.input.details_base",
        "ui.dados_recepcionista.createRecepcionista.input.details_person",
        "ui.dados_recepcionista.createRecepcionista.input.details_general",
        "ui.dados_recepcionista.createRecepcionista.input.details_agendaClinica"
      ],
      "resultStateKey": "ui.dados_recepcionista.createRecepcionista.result"
    },
    {
      "actionId": "updateProfissional",
      "kind": "command",
      "routeRef": "updateProfissionalRoute",
      "inputTypeRef": "UpdateProfissionalInput",
      "outputTypeRef": "UpdateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.updateProfissional.input.id",
        "ui.dados_recepcionista.updateProfissional.input.version",
        "ui.dados_recepcionista.updateProfissional.input.details",
        "ui.dados_recepcionista.updateProfissional.input.details_identification",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_name",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_docType",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_docId",
        "ui.dados_recepcionista.updateProfissional.input.details_identification_countryCode",
        "ui.dados_recepcionista.updateProfissional.input.details_person",
        "ui.dados_recepcionista.updateProfissional.input.details_person_occupation",
        "ui.dados_recepcionista.updateProfissional.input.details_person_privacyConsent"
      ],
      "resultStateKey": "ui.dados_recepcionista.updateProfissional.result",
      "snapshotPreconditions": [
        {
          "inputStateKey": "ui.dados_recepcionista.updateProfissional.input.version",
          "selectedIdentityStateKey": "ui.dados_recepcionista.updateProfissional.input.id",
          "sourceActionId": "listProfissional",
          "resultStateKey": "ui.dados_recepcionista.listProfissional.result",
          "identityPath": "id",
          "valuePath": "version",
          "valueScalar": "number",
          "capture": "onSelection",
          "missing": "blockCommandPreserveEdit"
        }
      ]
    },
    {
      "actionId": "updateRecepcionista",
      "kind": "command",
      "routeRef": "updateRecepcionistaRoute",
      "inputTypeRef": "UpdateRecepcionistaInput",
      "outputTypeRef": "UpdateRecepcionistaOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.updateRecepcionista.input.id",
        "ui.dados_recepcionista.updateRecepcionista.input.version",
        "ui.dados_recepcionista.updateRecepcionista.input.details",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_name",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docType",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_docId",
        "ui.dados_recepcionista.updateRecepcionista.input.details_identification_countryCode",
        "ui.dados_recepcionista.updateRecepcionista.input.details_base",
        "ui.dados_recepcionista.updateRecepcionista.input.details_person",
        "ui.dados_recepcionista.updateRecepcionista.input.details_general",
        "ui.dados_recepcionista.updateRecepcionista.input.details_agendaClinica"
      ],
      "resultStateKey": "ui.dados_recepcionista.updateRecepcionista.result",
      "snapshotPreconditions": [
        {
          "inputStateKey": "ui.dados_recepcionista.updateRecepcionista.input.version",
          "selectedIdentityStateKey": "ui.dados_recepcionista.updateRecepcionista.input.id",
          "sourceActionId": "listRecepcionista",
          "resultStateKey": "ui.dados_recepcionista.listRecepcionista.result",
          "identityPath": "id",
          "valuePath": "version",
          "valueScalar": "number",
          "capture": "onSelection",
          "missing": "blockCommandPreserveEdit"
        }
      ]
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.listProfissional.input.id",
        "ui.dados_recepcionista.listProfissional.input.details",
        "ui.dados_recepcionista.listProfissional.input.details_identification",
        "ui.dados_recepcionista.listProfissional.input.details_identification_subtype",
        "ui.dados_recepcionista.listProfissional.input.details_identification_name",
        "ui.dados_recepcionista.listProfissional.input.details_identification_status",
        "ui.dados_recepcionista.listProfissional.input.details_identification_docType",
        "ui.dados_recepcionista.listProfissional.input.details_identification_docId",
        "ui.dados_recepcionista.listProfissional.input.details_identification_countryCode",
        "ui.dados_recepcionista.listProfissional.input.page"
      ],
      "resultStateKey": "ui.dados_recepcionista.listProfissional.result"
    },
    {
      "actionId": "listRecepcionista",
      "kind": "query",
      "routeRef": "listRecepcionistaRoute",
      "inputTypeRef": "ListRecepcionistaInput",
      "outputTypeRef": "ListRecepcionistaOutput",
      "inputStateKeys": [
        "ui.dados_recepcionista.listRecepcionista.input.id",
        "ui.dados_recepcionista.listRecepcionista.input.details",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_subtype",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_name",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_status",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_docType",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_docId",
        "ui.dados_recepcionista.listRecepcionista.input.details_identification_countryCode",
        "ui.dados_recepcionista.listRecepcionista.input.page"
      ],
      "resultStateKey": "ui.dados_recepcionista.listRecepcionista.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "dados_recepcionista__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/dados_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/dados_recepcionista.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
