export const definition = {
  "schemaVersion": "2026-09-21-agent-defs-l2-shared-v1",
  "moduleName": "agendaClinica",
  "pageId": "dados_profissional",
  "pageName": "Meus dados",
  "baseClassName": "DadosProfissionalShared",
  "routePattern": "/cadastro_profissional/dados_profissional",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/dados_profissional.defs.ts",
    "calls": [
      {
        "actionId": "createProfissional",
        "routeConst": "createProfissionalRoute",
        "inputType": "CreateProfissionalInput",
        "outputType": "CreateProfissionalOutput"
      },
      {
        "actionId": "updateProfissional",
        "routeConst": "updateProfissionalRoute",
        "inputType": "UpdateProfissionalInput",
        "outputType": "UpdateProfissionalOutput"
      },
      {
        "actionId": "listProfissional",
        "routeConst": "listProfissionalRoute",
        "inputType": "ListProfissionalInput",
        "outputType": "ListProfissionalOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.dados_profissional.pageStatus",
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
      "stateKey": "ui.dados_profissional.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base"
      ]
    },
    {
      "stateKey": "ui.dados_profissional.createProfissional.input.details",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_name",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_docType",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_docId",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_profissional.createProfissional.input.details_person",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_person_occupation",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_person_privacyConsent",
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
      "stateKey": "ui.dados_profissional.createProfissional.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_profissional.createProfissional.input.details_agendaClinica",
      "name": "agendaClinica",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalInput.Profissional.details.agendaClinica",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_profissional.createProfissional.status",
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
      "stateKey": "ui.dados_profissional.createProfissional.error",
      "name": "createProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createProfissional"
    },
    {
      "stateKey": "ui.dados_profissional.createProfissional.result",
      "name": "createProfissionalResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createProfissional",
      "contractRef": "CreateProfissionalOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.dados_profissional.updateProfissional.input.id",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_name",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_docType",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_docId",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_person",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_person_occupation",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_person_privacyConsent",
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
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_agendaClinica",
      "name": "agendaClinica",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalInput.Profissional.details.agendaClinica",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.dados_profissional.updateProfissional.status",
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
      "stateKey": "ui.dados_profissional.updateProfissional.error",
      "name": "updateProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateProfissional"
    },
    {
      "stateKey": "ui.dados_profissional.updateProfissional.result",
      "name": "updateProfissionalResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateProfissional",
      "contractRef": "UpdateProfissionalOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.dados_profissional.listProfissional.input.id",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_subtype",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_name",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_status",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_docType",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_docId",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.dados_profissional.listProfissional.input.page",
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
      "stateKey": "ui.dados_profissional.listProfissional.status",
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
      "stateKey": "ui.dados_profissional.listProfissional.error",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.dados_profissional.listProfissional.result",
      "name": "listProfissionalResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listProfissional",
      "contractRef": "ListProfissionalOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreateProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_name"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setCreateProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreateProfissionalDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_base"
    },
    {
      "actionId": "setCreateProfissionalDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_person"
    },
    {
      "actionId": "setCreateProfissionalDetailsPersonOccupation",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_person_occupation"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_person_occupation"
    },
    {
      "actionId": "setCreateProfissionalDetailsPersonPrivacyConsent",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_person_privacyConsent"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_person_privacyConsent"
    },
    {
      "actionId": "setCreateProfissionalDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_general"
    },
    {
      "actionId": "setCreateProfissionalDetailsAgendaClinica",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details_agendaClinica"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.createProfissional.input.details_agendaClinica"
    },
    {
      "actionId": "createProfissional",
      "kind": "command",
      "commandRef": "createProfissional",
      "routeRef": "createProfissionalRoute",
      "inputTypeRef": "CreateProfissionalInput",
      "outputTypeRef": "CreateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_profissional.createProfissional.input.details",
        "ui.dados_profissional.createProfissional.input.details_identification",
        "ui.dados_profissional.createProfissional.input.details_identification_name",
        "ui.dados_profissional.createProfissional.input.details_identification_docType",
        "ui.dados_profissional.createProfissional.input.details_identification_docId",
        "ui.dados_profissional.createProfissional.input.details_identification_countryCode",
        "ui.dados_profissional.createProfissional.input.details_base",
        "ui.dados_profissional.createProfissional.input.details_person",
        "ui.dados_profissional.createProfissional.input.details_person_occupation",
        "ui.dados_profissional.createProfissional.input.details_person_privacyConsent",
        "ui.dados_profissional.createProfissional.input.details_general",
        "ui.dados_profissional.createProfissional.input.details_agendaClinica"
      ],
      "outputStateKeys": [
        "ui.dados_profissional.createProfissional.result"
      ],
      "statusStateKey": "ui.dados_profissional.createProfissional.status",
      "errorStateKey": "ui.dados_profissional.createProfissional.error",
      "refreshActionIds": [
        "listProfissional"
      ]
    },
    {
      "actionId": "setUpdateProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.id"
    },
    {
      "actionId": "setUpdateProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_name"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setUpdateProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setUpdateProfissionalDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_base"
    },
    {
      "actionId": "setUpdateProfissionalDetailsPerson",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_person"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_person"
    },
    {
      "actionId": "setUpdateProfissionalDetailsPersonOccupation",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_person_occupation"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_person_occupation"
    },
    {
      "actionId": "setUpdateProfissionalDetailsPersonPrivacyConsent",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_person_privacyConsent"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_person_privacyConsent"
    },
    {
      "actionId": "setUpdateProfissionalDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_general"
    },
    {
      "actionId": "setUpdateProfissionalDetailsAgendaClinica",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.details_agendaClinica"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.updateProfissional.input.details_agendaClinica"
    },
    {
      "actionId": "updateProfissional",
      "kind": "command",
      "commandRef": "updateProfissional",
      "routeRef": "updateProfissionalRoute",
      "inputTypeRef": "UpdateProfissionalInput",
      "outputTypeRef": "UpdateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.id",
        "ui.dados_profissional.updateProfissional.input.details",
        "ui.dados_profissional.updateProfissional.input.details_identification",
        "ui.dados_profissional.updateProfissional.input.details_identification_name",
        "ui.dados_profissional.updateProfissional.input.details_identification_docType",
        "ui.dados_profissional.updateProfissional.input.details_identification_docId",
        "ui.dados_profissional.updateProfissional.input.details_identification_countryCode",
        "ui.dados_profissional.updateProfissional.input.details_base",
        "ui.dados_profissional.updateProfissional.input.details_person",
        "ui.dados_profissional.updateProfissional.input.details_person_occupation",
        "ui.dados_profissional.updateProfissional.input.details_person_privacyConsent",
        "ui.dados_profissional.updateProfissional.input.details_general",
        "ui.dados_profissional.updateProfissional.input.details_agendaClinica"
      ],
      "outputStateKeys": [
        "ui.dados_profissional.updateProfissional.result"
      ],
      "statusStateKey": "ui.dados_profissional.updateProfissional.status",
      "errorStateKey": "ui.dados_profissional.updateProfissional.error",
      "refreshActionIds": [
        "listProfissional"
      ]
    },
    {
      "actionId": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.id"
    },
    {
      "actionId": "setListProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details"
    },
    {
      "actionId": "setListProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_subtype"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_name"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_status"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProfissionalPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.dados_profissional.listProfissional.input.page"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_profissional.listProfissional.input.id",
        "ui.dados_profissional.listProfissional.input.details",
        "ui.dados_profissional.listProfissional.input.details_identification",
        "ui.dados_profissional.listProfissional.input.details_identification_subtype",
        "ui.dados_profissional.listProfissional.input.details_identification_name",
        "ui.dados_profissional.listProfissional.input.details_identification_status",
        "ui.dados_profissional.listProfissional.input.details_identification_docType",
        "ui.dados_profissional.listProfissional.input.details_identification_docId",
        "ui.dados_profissional.listProfissional.input.details_identification_countryCode",
        "ui.dados_profissional.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.dados_profissional.listProfissional.result"
      ],
      "statusStateKey": "ui.dados_profissional.listProfissional.status",
      "errorStateKey": "ui.dados_profissional.listProfissional.error",
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
        "ui.dados_profissional.createProfissional.input.details",
        "ui.dados_profissional.createProfissional.input.details_identification",
        "ui.dados_profissional.createProfissional.input.details_identification_name",
        "ui.dados_profissional.createProfissional.input.details_identification_docType",
        "ui.dados_profissional.createProfissional.input.details_identification_docId",
        "ui.dados_profissional.createProfissional.input.details_identification_countryCode",
        "ui.dados_profissional.createProfissional.input.details_base",
        "ui.dados_profissional.createProfissional.input.details_person",
        "ui.dados_profissional.createProfissional.input.details_person_occupation",
        "ui.dados_profissional.createProfissional.input.details_person_privacyConsent",
        "ui.dados_profissional.createProfissional.input.details_general",
        "ui.dados_profissional.createProfissional.input.details_agendaClinica"
      ],
      "resultStateKey": "ui.dados_profissional.createProfissional.result"
    },
    {
      "actionId": "updateProfissional",
      "kind": "command",
      "routeRef": "updateProfissionalRoute",
      "inputTypeRef": "UpdateProfissionalInput",
      "outputTypeRef": "UpdateProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_profissional.updateProfissional.input.id",
        "ui.dados_profissional.updateProfissional.input.details",
        "ui.dados_profissional.updateProfissional.input.details_identification",
        "ui.dados_profissional.updateProfissional.input.details_identification_name",
        "ui.dados_profissional.updateProfissional.input.details_identification_docType",
        "ui.dados_profissional.updateProfissional.input.details_identification_docId",
        "ui.dados_profissional.updateProfissional.input.details_identification_countryCode",
        "ui.dados_profissional.updateProfissional.input.details_base",
        "ui.dados_profissional.updateProfissional.input.details_person",
        "ui.dados_profissional.updateProfissional.input.details_person_occupation",
        "ui.dados_profissional.updateProfissional.input.details_person_privacyConsent",
        "ui.dados_profissional.updateProfissional.input.details_general",
        "ui.dados_profissional.updateProfissional.input.details_agendaClinica"
      ],
      "resultStateKey": "ui.dados_profissional.updateProfissional.result"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.dados_profissional.listProfissional.input.id",
        "ui.dados_profissional.listProfissional.input.details",
        "ui.dados_profissional.listProfissional.input.details_identification",
        "ui.dados_profissional.listProfissional.input.details_identification_subtype",
        "ui.dados_profissional.listProfissional.input.details_identification_name",
        "ui.dados_profissional.listProfissional.input.details_identification_status",
        "ui.dados_profissional.listProfissional.input.details_identification_docType",
        "ui.dados_profissional.listProfissional.input.details_identification_docId",
        "ui.dados_profissional.listProfissional.input.details_identification_countryCode",
        "ui.dados_profissional.listProfissional.input.page"
      ],
      "resultStateKey": "ui.dados_profissional.listProfissional.result"
    }
  ]
} as const;

export const pipeline = {
  "id": "dados_profissional__l2_shared",
  "type": "l2_shared",
  "defPath": "l2/agendaClinica/web/shared/dados_profissional.defs.ts",
  "outputPath": "l2/agendaClinica/web/shared/dados_profissional.ts",
  "dependsFiles": [
    "l2/agendaClinica/web/contracts/dados_profissional.defs.ts"
  ],
  "dependsOn": []
} as const;
