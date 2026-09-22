export const definition = {
  "schemaVersion": "2026-09-21-agent-defs-l2-shared-v1",
  "moduleName": "agendaClinica",
  "pageId": "profissionais",
  "pageName": "Profissionais",
  "baseClassName": "ProfissionaisShared",
  "routePattern": "/profissionais",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/profissionais.defs.ts",
    "calls": [
      {
        "actionId": "createConsulta",
        "routeConst": "createConsultaRoute",
        "inputType": "CreateConsultaInput",
        "outputType": "CreateConsultaOutput"
      },
      {
        "actionId": "listConsulta",
        "routeConst": "listConsultaRoute",
        "inputType": "ListConsultaInput",
        "outputType": "ListConsultaOutput"
      },
      {
        "actionId": "listPaciente",
        "routeConst": "listPacienteRoute",
        "inputType": "ListPacienteInput",
        "outputType": "ListPacienteOutput"
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
      "stateKey": "ui.profissionais.pageStatus",
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
      "stateKey": "ui.profissionais.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "listPaciente",
        "listProfissional",
        "createConsulta"
      ]
    },
    {
      "stateKey": "ui.profissionais.createConsulta.input.patientId",
      "name": "patientId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.patientId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.createConsulta.input.professionalId",
      "name": "professionalId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.professionalId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.createConsulta.input.scheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.createConsulta.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.createConsulta.status",
      "name": "createConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.profissionais.createConsulta.error",
      "name": "createConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.profissionais.createConsulta.result",
      "name": "createConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.profissionais.listConsulta.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.listConsulta.input.patientId",
      "name": "patientId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.patientId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.listConsulta.input.professionalId",
      "name": "professionalId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.professionalId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.listConsulta.input.scheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.listConsulta.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.listConsulta.input.page",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.$page",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.profissionais.listConsulta.status",
      "name": "listConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.profissionais.listConsulta.error",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.profissionais.listConsulta.result",
      "name": "listConsultaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.profissionais.listPaciente.input.id",
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
      "stateKey": "ui.profissionais.listPaciente.input.details",
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
      "stateKey": "ui.profissionais.listPaciente.input.details_identification",
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
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_subtype",
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
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_name",
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
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteInput.Paciente.details.identification.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_docType",
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
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_docId",
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
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_countryCode",
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
      "stateKey": "ui.profissionais.listPaciente.input.page",
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
      "stateKey": "ui.profissionais.listPaciente.status",
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
      "stateKey": "ui.profissionais.listPaciente.error",
      "name": "listPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.profissionais.listPaciente.result",
      "name": "listPacienteResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.profissionais.listProfissional.input.id",
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
      "stateKey": "ui.profissionais.listProfissional.input.details",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_subtype",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_name",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_status",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_docType",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_docId",
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
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.profissionais.listProfissional.input.page",
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
      "stateKey": "ui.profissionais.listProfissional.status",
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
      "stateKey": "ui.profissionais.listProfissional.error",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.profissionais.listProfissional.result",
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
      "actionId": "setCreateConsultaPatientId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.createConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.createConsulta.input.patientId"
    },
    {
      "actionId": "setCreateConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.createConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.createConsulta.input.professionalId"
    },
    {
      "actionId": "setCreateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.createConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.createConsulta.input.scheduledAt"
    },
    {
      "actionId": "setCreateConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.createConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.createConsulta.input.status"
    },
    {
      "actionId": "createConsulta",
      "kind": "command",
      "commandRef": "createConsulta",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.profissionais.createConsulta.input.patientId",
        "ui.profissionais.createConsulta.input.professionalId",
        "ui.profissionais.createConsulta.input.scheduledAt",
        "ui.profissionais.createConsulta.input.status"
      ],
      "outputStateKeys": [
        "ui.profissionais.createConsulta.result"
      ],
      "statusStateKey": "ui.profissionais.createConsulta.status",
      "errorStateKey": "ui.profissionais.createConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listConsulta.input.id"
    },
    {
      "actionId": "setListConsultaPatientId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listConsulta.input.patientId"
    },
    {
      "actionId": "setListConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listConsulta.input.professionalId"
    },
    {
      "actionId": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listConsulta.input.status"
    },
    {
      "actionId": "setListConsultaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listConsulta.input.page"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.profissionais.listConsulta.input.id",
        "ui.profissionais.listConsulta.input.patientId",
        "ui.profissionais.listConsulta.input.professionalId",
        "ui.profissionais.listConsulta.input.scheduledAt",
        "ui.profissionais.listConsulta.input.status",
        "ui.profissionais.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.profissionais.listConsulta.result"
      ],
      "statusStateKey": "ui.profissionais.listConsulta.status",
      "errorStateKey": "ui.profissionais.listConsulta.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.id"
    },
    {
      "actionId": "setListPacienteDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details"
    },
    {
      "actionId": "setListPacienteDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_subtype"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_name"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_status"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_docType"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_docId"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.details_identification_countryCode"
    },
    {
      "actionId": "setListPacientePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listPaciente.input.page"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "commandRef": "listPaciente",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.profissionais.listPaciente.input.id",
        "ui.profissionais.listPaciente.input.details",
        "ui.profissionais.listPaciente.input.details_identification",
        "ui.profissionais.listPaciente.input.details_identification_subtype",
        "ui.profissionais.listPaciente.input.details_identification_name",
        "ui.profissionais.listPaciente.input.details_identification_status",
        "ui.profissionais.listPaciente.input.details_identification_docType",
        "ui.profissionais.listPaciente.input.details_identification_docId",
        "ui.profissionais.listPaciente.input.details_identification_countryCode",
        "ui.profissionais.listPaciente.input.page"
      ],
      "outputStateKeys": [
        "ui.profissionais.listPaciente.result"
      ],
      "statusStateKey": "ui.profissionais.listPaciente.status",
      "errorStateKey": "ui.profissionais.listPaciente.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.id"
    },
    {
      "actionId": "setListProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details"
    },
    {
      "actionId": "setListProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_subtype"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_name"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_status"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProfissionalPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.profissionais.listProfissional.input.page"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.profissionais.listProfissional.input.id",
        "ui.profissionais.listProfissional.input.details",
        "ui.profissionais.listProfissional.input.details_identification",
        "ui.profissionais.listProfissional.input.details_identification_subtype",
        "ui.profissionais.listProfissional.input.details_identification_name",
        "ui.profissionais.listProfissional.input.details_identification_status",
        "ui.profissionais.listProfissional.input.details_identification_docType",
        "ui.profissionais.listProfissional.input.details_identification_docId",
        "ui.profissionais.listProfissional.input.details_identification_countryCode",
        "ui.profissionais.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.profissionais.listProfissional.result"
      ],
      "statusStateKey": "ui.profissionais.listProfissional.status",
      "errorStateKey": "ui.profissionais.listProfissional.error",
      "refreshActionIds": []
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listConsulta",
      "preconditions": []
    },
    {
      "value": "listPaciente",
      "kind": "detail",
      "actionId": "listPaciente",
      "preconditions": []
    },
    {
      "value": "listProfissional",
      "kind": "detail",
      "actionId": "listProfissional",
      "preconditions": []
    },
    {
      "value": "createConsulta",
      "kind": "command",
      "actionId": "createConsulta",
      "preconditions": []
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "createConsulta",
      "kind": "command",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.profissionais.createConsulta.input.patientId",
        "ui.profissionais.createConsulta.input.professionalId",
        "ui.profissionais.createConsulta.input.scheduledAt",
        "ui.profissionais.createConsulta.input.status"
      ],
      "resultStateKey": "ui.profissionais.createConsulta.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.profissionais.listConsulta.input.id",
        "ui.profissionais.listConsulta.input.patientId",
        "ui.profissionais.listConsulta.input.professionalId",
        "ui.profissionais.listConsulta.input.scheduledAt",
        "ui.profissionais.listConsulta.input.status",
        "ui.profissionais.listConsulta.input.page"
      ],
      "resultStateKey": "ui.profissionais.listConsulta.result"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.profissionais.listPaciente.input.id",
        "ui.profissionais.listPaciente.input.details",
        "ui.profissionais.listPaciente.input.details_identification",
        "ui.profissionais.listPaciente.input.details_identification_subtype",
        "ui.profissionais.listPaciente.input.details_identification_name",
        "ui.profissionais.listPaciente.input.details_identification_status",
        "ui.profissionais.listPaciente.input.details_identification_docType",
        "ui.profissionais.listPaciente.input.details_identification_docId",
        "ui.profissionais.listPaciente.input.details_identification_countryCode",
        "ui.profissionais.listPaciente.input.page"
      ],
      "resultStateKey": "ui.profissionais.listPaciente.result"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.profissionais.listProfissional.input.id",
        "ui.profissionais.listProfissional.input.details",
        "ui.profissionais.listProfissional.input.details_identification",
        "ui.profissionais.listProfissional.input.details_identification_subtype",
        "ui.profissionais.listProfissional.input.details_identification_name",
        "ui.profissionais.listProfissional.input.details_identification_status",
        "ui.profissionais.listProfissional.input.details_identification_docType",
        "ui.profissionais.listProfissional.input.details_identification_docId",
        "ui.profissionais.listProfissional.input.details_identification_countryCode",
        "ui.profissionais.listProfissional.input.page"
      ],
      "resultStateKey": "ui.profissionais.listProfissional.result"
    }
  ]
} as const;

export const pipeline = {
  "id": "profissionais__l2_shared",
  "type": "l2_shared",
  "defPath": "l2/agendaClinica/web/shared/profissionais.defs.ts",
  "outputPath": "l2/agendaClinica/web/shared/profissionais.ts",
  "dependsFiles": [
    "l2/agendaClinica/web/contracts/profissionais.defs.ts"
  ],
  "dependsOn": []
} as const;
