export const definition = {
  "schemaVersion": "2026-09-24-agent-defs-l2-shared-v3",
  "moduleName": "agendaClinica",
  "pageId": "pacientes",
  "pageName": "Pacientes",
  "baseClassName": "PacientesShared",
  "routePattern": "/pacientes",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
    "calls": [
      {
        "actionId": "createPaciente",
        "routeConst": "createPacienteRoute",
        "inputType": "CreatePacienteInput",
        "outputType": "CreatePacienteOutput"
      },
      {
        "actionId": "listPaciente",
        "routeConst": "listPacienteRoute",
        "inputType": "ListPacienteInput",
        "outputType": "ListPacienteOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.pacientes.pageStatus",
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
      "stateKey": "ui.pacientes.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createPaciente"
      ]
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_base",
      "name": "base",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.base",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_general",
      "name": "general",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.general",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_agendaClinica",
      "name": "agendaClinica",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.agendaClinica",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.createPaciente.status",
      "name": "createPacienteStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createPaciente"
    },
    {
      "stateKey": "ui.pacientes.createPaciente.error",
      "name": "createPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createPaciente"
    },
    {
      "stateKey": "ui.pacientes.createPaciente.result",
      "name": "createPacienteResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details_identification",
      "name": "identification",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_subtype",
      "name": "subtype",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification.subtype",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_name",
      "name": "name",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification.name",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_docType",
      "name": "docType",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification.docType",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_docId",
      "name": "docId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification.docId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_countryCode",
      "name": "countryCode",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification.countryCode",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.listPaciente.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.pacientes.listPaciente.status",
      "name": "listPacienteStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.pacientes.listPaciente.error",
      "name": "listPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.pacientes.listPaciente.result",
      "name": "listPacienteResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setCreatePacienteDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details"
    },
    {
      "actionId": "setCreatePacienteDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_identification"
    },
    {
      "actionId": "setCreatePacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_name"
    },
    {
      "actionId": "setCreatePacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_docType"
    },
    {
      "actionId": "setCreatePacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_docId"
    },
    {
      "actionId": "setCreatePacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_identification_countryCode"
    },
    {
      "actionId": "setCreatePacienteDetailsBase",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_base"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_base"
    },
    {
      "actionId": "setCreatePacienteDetailsGeneral",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_general"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_general"
    },
    {
      "actionId": "setCreatePacienteDetailsAgendaClinica",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_agendaClinica"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_agendaClinica"
    },
    {
      "actionId": "createPaciente",
      "kind": "command",
      "commandRef": "createPaciente",
      "routeRef": "createPacienteRoute",
      "inputTypeRef": "CreatePacienteInput",
      "outputTypeRef": "CreatePacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.createPaciente.input.details",
        "ui.pacientes.createPaciente.input.details_identification",
        "ui.pacientes.createPaciente.input.details_identification_name",
        "ui.pacientes.createPaciente.input.details_identification_docType",
        "ui.pacientes.createPaciente.input.details_identification_docId",
        "ui.pacientes.createPaciente.input.details_identification_countryCode",
        "ui.pacientes.createPaciente.input.details_base",
        "ui.pacientes.createPaciente.input.details_general",
        "ui.pacientes.createPaciente.input.details_agendaClinica"
      ],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.result"
      ],
      "statusStateKey": "ui.pacientes.createPaciente.status",
      "errorStateKey": "ui.pacientes.createPaciente.error",
      "refreshActionIds": [
        "listPaciente"
      ]
    },
    {
      "actionId": "setListPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.id"
    },
    {
      "actionId": "setListPacienteDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details"
    },
    {
      "actionId": "setListPacienteDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_subtype"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_name"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_docType"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_docId"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_countryCode"
    },
    {
      "actionId": "setListPacientePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.page"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "commandRef": "listPaciente",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.listPaciente.input.id",
        "ui.pacientes.listPaciente.input.details",
        "ui.pacientes.listPaciente.input.details_identification",
        "ui.pacientes.listPaciente.input.details_identification_subtype",
        "ui.pacientes.listPaciente.input.details_identification_name",
        "ui.pacientes.listPaciente.input.details_identification_docType",
        "ui.pacientes.listPaciente.input.details_identification_docId",
        "ui.pacientes.listPaciente.input.details_identification_countryCode",
        "ui.pacientes.listPaciente.input.page"
      ],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.result"
      ],
      "statusStateKey": "ui.pacientes.listPaciente.status",
      "errorStateKey": "ui.pacientes.listPaciente.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listPaciente",
      "preconditions": [
        "ui.pacientes.listPaciente.input.id",
        "ui.pacientes.listPaciente.input.details"
      ]
    },
    {
      "value": "createPaciente",
      "kind": "command",
      "actionId": "createPaciente",
      "preconditions": [
        "ui.pacientes.createPaciente.input.details"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createPaciente",
      "kind": "command",
      "routeRef": "createPacienteRoute",
      "inputTypeRef": "CreatePacienteInput",
      "outputTypeRef": "CreatePacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.createPaciente.input.details",
        "ui.pacientes.createPaciente.input.details_identification",
        "ui.pacientes.createPaciente.input.details_identification_name",
        "ui.pacientes.createPaciente.input.details_identification_docType",
        "ui.pacientes.createPaciente.input.details_identification_docId",
        "ui.pacientes.createPaciente.input.details_identification_countryCode",
        "ui.pacientes.createPaciente.input.details_base",
        "ui.pacientes.createPaciente.input.details_general",
        "ui.pacientes.createPaciente.input.details_agendaClinica"
      ],
      "resultStateKey": "ui.pacientes.createPaciente.result"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.pacientes.listPaciente.input.id",
        "ui.pacientes.listPaciente.input.details",
        "ui.pacientes.listPaciente.input.details_identification",
        "ui.pacientes.listPaciente.input.details_identification_subtype",
        "ui.pacientes.listPaciente.input.details_identification_name",
        "ui.pacientes.listPaciente.input.details_identification_docType",
        "ui.pacientes.listPaciente.input.details_identification_docId",
        "ui.pacientes.listPaciente.input.details_identification_countryCode",
        "ui.pacientes.listPaciente.input.page"
      ],
      "resultStateKey": "ui.pacientes.listPaciente.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "pacientes__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/pacientes.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
