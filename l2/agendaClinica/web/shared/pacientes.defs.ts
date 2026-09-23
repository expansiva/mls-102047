export const definition = {
  "schemaVersion": "2026-09-21-agent-defs-l2-shared-v1",
  "moduleName": "agendaClinica",
  "pageId": "pacientes",
  "pageName": "Pacientes",
  "baseClassName": "PacientesShared",
  "routePattern": "/pacientes",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/pacientes.defs.ts",
    "calls": [
      {
        "actionId": "createConsulta",
        "routeConst": "createConsultaRoute",
        "inputType": "CreateConsultaInput",
        "outputType": "CreateConsultaOutput"
      },
      {
        "actionId": "createPaciente",
        "routeConst": "createPacienteRoute",
        "inputType": "CreatePacienteInput",
        "outputType": "CreatePacienteOutput"
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
        "listPaciente",
        "listProfissional",
        "createConsulta",
        "createPaciente"
      ]
    },
    {
      "stateKey": "ui.pacientes.createConsulta.input.patientId",
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
      "stateKey": "ui.pacientes.createConsulta.input.professionalId",
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
      "stateKey": "ui.pacientes.createConsulta.input.scheduledAt",
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
      "stateKey": "ui.pacientes.createConsulta.input.status",
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
      "stateKey": "ui.pacientes.createConsulta.status",
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
      "stateKey": "ui.pacientes.createConsulta.error",
      "name": "createConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.pacientes.createConsulta.result",
      "name": "createConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaOutput",
      "outputShape": "object"
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
      "stateKey": "ui.pacientes.createPaciente.input.details_base_aliases",
      "name": "aliases",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.base.aliases",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.pacientes.createPaciente.input.details_base_notes",
      "name": "notes",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createPaciente",
      "contractRef": "CreatePacienteInput.Paciente.details.base.notes",
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
      "stateKey": "ui.pacientes.listConsulta.input.id",
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
      "stateKey": "ui.pacientes.listConsulta.input.patientId",
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
      "stateKey": "ui.pacientes.listConsulta.input.professionalId",
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
      "stateKey": "ui.pacientes.listConsulta.input.scheduledAt",
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
      "stateKey": "ui.pacientes.listConsulta.input.status",
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
      "stateKey": "ui.pacientes.listConsulta.input.page",
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
      "stateKey": "ui.pacientes.listConsulta.status",
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
      "stateKey": "ui.pacientes.listConsulta.error",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.pacientes.listConsulta.result",
      "name": "listConsultaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaOutput",
      "outputShape": "array"
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
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_status",
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
    },
    {
      "stateKey": "ui.pacientes.listProfissional.input.id",
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
      "stateKey": "ui.pacientes.listProfissional.input.details",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_subtype",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_name",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_status",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_docType",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_docId",
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
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.pacientes.listProfissional.input.page",
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
      "stateKey": "ui.pacientes.listProfissional.status",
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
      "stateKey": "ui.pacientes.listProfissional.error",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.pacientes.listProfissional.result",
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
        "ui.pacientes.createConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createConsulta.input.patientId"
    },
    {
      "actionId": "setCreateConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createConsulta.input.professionalId"
    },
    {
      "actionId": "setCreateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createConsulta.input.scheduledAt"
    },
    {
      "actionId": "setCreateConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createConsulta.input.status"
    },
    {
      "actionId": "createConsulta",
      "kind": "command",
      "commandRef": "createConsulta",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.pacientes.createConsulta.input.patientId",
        "ui.pacientes.createConsulta.input.professionalId",
        "ui.pacientes.createConsulta.input.scheduledAt",
        "ui.pacientes.createConsulta.input.status"
      ],
      "outputStateKeys": [
        "ui.pacientes.createConsulta.result"
      ],
      "statusStateKey": "ui.pacientes.createConsulta.status",
      "errorStateKey": "ui.pacientes.createConsulta.error",
      "refreshActionIds": [
        "listConsulta",
        "listPaciente"
      ]
    },
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
      "actionId": "setCreatePacienteDetailsBaseAliases",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_base_aliases"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_base_aliases"
    },
    {
      "actionId": "setCreatePacienteDetailsBaseNotes",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.createPaciente.input.details_base_notes"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.createPaciente.input.details_base_notes"
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
        "ui.pacientes.createPaciente.input.details_base_aliases",
        "ui.pacientes.createPaciente.input.details_base_notes"
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
      "actionId": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listConsulta.input.id"
    },
    {
      "actionId": "setListConsultaPatientId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listConsulta.input.patientId"
    },
    {
      "actionId": "setListConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listConsulta.input.professionalId"
    },
    {
      "actionId": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listConsulta.input.status"
    },
    {
      "actionId": "setListConsultaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listConsulta.input.page"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.pacientes.listConsulta.input.id",
        "ui.pacientes.listConsulta.input.patientId",
        "ui.pacientes.listConsulta.input.professionalId",
        "ui.pacientes.listConsulta.input.scheduledAt",
        "ui.pacientes.listConsulta.input.status",
        "ui.pacientes.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.pacientes.listConsulta.result"
      ],
      "statusStateKey": "ui.pacientes.listConsulta.status",
      "errorStateKey": "ui.pacientes.listConsulta.error",
      "refreshActionIds": []
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
      "actionId": "setListPacienteDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listPaciente.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listPaciente.input.details_identification_status"
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
        "ui.pacientes.listPaciente.input.details_identification_status",
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
    },
    {
      "actionId": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.id"
    },
    {
      "actionId": "setListProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details"
    },
    {
      "actionId": "setListProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_subtype"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_name"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_status"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProfissionalPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.pacientes.listProfissional.input.page"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.pacientes.listProfissional.input.id",
        "ui.pacientes.listProfissional.input.details",
        "ui.pacientes.listProfissional.input.details_identification",
        "ui.pacientes.listProfissional.input.details_identification_subtype",
        "ui.pacientes.listProfissional.input.details_identification_name",
        "ui.pacientes.listProfissional.input.details_identification_status",
        "ui.pacientes.listProfissional.input.details_identification_docType",
        "ui.pacientes.listProfissional.input.details_identification_docId",
        "ui.pacientes.listProfissional.input.details_identification_countryCode",
        "ui.pacientes.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.pacientes.listProfissional.result"
      ],
      "statusStateKey": "ui.pacientes.listProfissional.status",
      "errorStateKey": "ui.pacientes.listProfissional.error",
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
    },
    {
      "value": "createPaciente",
      "kind": "command",
      "actionId": "createPaciente",
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
        "ui.pacientes.createConsulta.input.patientId",
        "ui.pacientes.createConsulta.input.professionalId",
        "ui.pacientes.createConsulta.input.scheduledAt",
        "ui.pacientes.createConsulta.input.status"
      ],
      "resultStateKey": "ui.pacientes.createConsulta.result"
    },
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
        "ui.pacientes.createPaciente.input.details_base_aliases",
        "ui.pacientes.createPaciente.input.details_base_notes"
      ],
      "resultStateKey": "ui.pacientes.createPaciente.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.pacientes.listConsulta.input.id",
        "ui.pacientes.listConsulta.input.patientId",
        "ui.pacientes.listConsulta.input.professionalId",
        "ui.pacientes.listConsulta.input.scheduledAt",
        "ui.pacientes.listConsulta.input.status",
        "ui.pacientes.listConsulta.input.page"
      ],
      "resultStateKey": "ui.pacientes.listConsulta.result"
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
        "ui.pacientes.listPaciente.input.details_identification_status",
        "ui.pacientes.listPaciente.input.details_identification_docType",
        "ui.pacientes.listPaciente.input.details_identification_docId",
        "ui.pacientes.listPaciente.input.details_identification_countryCode",
        "ui.pacientes.listPaciente.input.page"
      ],
      "resultStateKey": "ui.pacientes.listPaciente.result"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.pacientes.listProfissional.input.id",
        "ui.pacientes.listProfissional.input.details",
        "ui.pacientes.listProfissional.input.details_identification",
        "ui.pacientes.listProfissional.input.details_identification_subtype",
        "ui.pacientes.listProfissional.input.details_identification_name",
        "ui.pacientes.listProfissional.input.details_identification_status",
        "ui.pacientes.listProfissional.input.details_identification_docType",
        "ui.pacientes.listProfissional.input.details_identification_docId",
        "ui.pacientes.listProfissional.input.details_identification_countryCode",
        "ui.pacientes.listProfissional.input.page"
      ],
      "resultStateKey": "ui.pacientes.listProfissional.result"
    }
  ]
} as const;

export const pipeline = {
  "id": "pacientes__l2_shared",
  "type": "l2_shared",
  "defPath": "l2/agendaClinica/web/shared/pacientes.defs.ts",
  "outputPath": "l2/agendaClinica/web/shared/pacientes.ts",
  "dependsFiles": [
    "l2/agendaClinica/web/contracts/pacientes.defs.ts"
  ],
  "dependsOn": []
} as const;
