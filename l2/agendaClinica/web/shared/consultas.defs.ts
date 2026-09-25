export const definition = {
  "schemaVersion": "2026-09-24-agent-defs-l2-shared-v3",
  "moduleName": "agendaClinica",
  "pageId": "consultas",
  "pageName": "Consultas",
  "baseClassName": "ConsultasShared",
  "routePattern": "/consultas",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/consultas.defs.ts",
    "calls": [
      {
        "actionId": "createConsulta",
        "routeConst": "createConsultaRoute",
        "inputType": "CreateConsultaInput",
        "outputType": "CreateConsultaOutput"
      },
      {
        "actionId": "registrarFalta",
        "routeConst": "registrarFaltaRoute",
        "inputType": "RegistrarFaltaInput",
        "outputType": "RegistrarFaltaOutput"
      },
      {
        "actionId": "updateConsulta",
        "routeConst": "updateConsultaRoute",
        "inputType": "UpdateConsultaInput",
        "outputType": "UpdateConsultaOutput"
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
      "stateKey": "ui.consultas.pageStatus",
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
      "stateKey": "ui.consultas.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "createConsulta",
        "registrarFalta",
        "updateConsulta"
      ]
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.pacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.pacienteId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.profissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.profissionalId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.scheduledAt",
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
      "stateKey": "ui.consultas.createConsulta.input.status",
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
      "stateKey": "ui.consultas.createConsulta.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.details_telephoneConfirmation",
      "name": "telephoneConfirmation",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.details.telephoneConfirmation",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.createConsulta.input.details_telephoneConfirmation_confirmedAt",
      "name": "confirmedAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaInput.Consulta.details.telephoneConfirmation.confirmedAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.createConsulta.status",
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
      "stateKey": "ui.consultas.createConsulta.error",
      "name": "createConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.consultas.createConsulta.result",
      "name": "createConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas.registrarFalta.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "registrarFalta",
      "contractRef": "RegistrarFaltaInput.Consulta.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.registrarFalta.status",
      "name": "registrarFaltaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "registrarFalta"
    },
    {
      "stateKey": "ui.consultas.registrarFalta.error",
      "name": "registrarFaltaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "registrarFalta"
    },
    {
      "stateKey": "ui.consultas.registrarFalta.result",
      "name": "registrarFaltaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "registrarFalta",
      "contractRef": "RegistrarFaltaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.pacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.pacienteId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.profissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.profissionalId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.scheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.status",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.details_telephoneConfirmation",
      "name": "telephoneConfirmation",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.details.telephoneConfirmation",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas.updateConsulta.input.details_telephoneConfirmation_confirmedAt",
      "name": "confirmedAt",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaInput.Consulta.details.telephoneConfirmation.confirmedAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.updateConsulta.status",
      "name": "updateConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "updateConsulta"
    },
    {
      "stateKey": "ui.consultas.updateConsulta.error",
      "name": "updateConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "updateConsulta"
    },
    {
      "stateKey": "ui.consultas.updateConsulta.result",
      "name": "updateConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "updateConsulta",
      "contractRef": "UpdateConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.id",
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
      "stateKey": "ui.consultas.listConsulta.input.pacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.pacienteId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.profissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.Consulta.profissionalId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas.listConsulta.input.scheduledAt",
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
      "stateKey": "ui.consultas.listConsulta.input.status",
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
      "stateKey": "ui.consultas.listConsulta.input.page",
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
      "stateKey": "ui.consultas.listConsulta.status",
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
      "stateKey": "ui.consultas.listConsulta.error",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.consultas.listConsulta.result",
      "name": "listConsultaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.consultas.listPaciente.input.id",
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
      "stateKey": "ui.consultas.listPaciente.input.details",
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
      "stateKey": "ui.consultas.listPaciente.input.details_identification",
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
      "stateKey": "ui.consultas.listPaciente.input.details_identification_subtype",
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
      "stateKey": "ui.consultas.listPaciente.input.details_identification_name",
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
      "stateKey": "ui.consultas.listPaciente.input.details_identification_docType",
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
      "stateKey": "ui.consultas.listPaciente.input.details_identification_docId",
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
      "stateKey": "ui.consultas.listPaciente.input.details_identification_countryCode",
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
      "stateKey": "ui.consultas.listPaciente.input.page",
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
      "stateKey": "ui.consultas.listPaciente.status",
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
      "stateKey": "ui.consultas.listPaciente.error",
      "name": "listPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.consultas.listPaciente.result",
      "name": "listPacienteResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.consultas.listProfissional.input.id",
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
      "stateKey": "ui.consultas.listProfissional.input.details",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification_subtype",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification_name",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification_status",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification_docType",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification_docId",
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
      "stateKey": "ui.consultas.listProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.consultas.listProfissional.input.page",
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
      "stateKey": "ui.consultas.listProfissional.status",
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
      "stateKey": "ui.consultas.listProfissional.error",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.consultas.listProfissional.result",
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
      "actionId": "setCreateConsultaPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.pacienteId"
    },
    {
      "actionId": "setCreateConsultaProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.profissionalId"
    },
    {
      "actionId": "setCreateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.scheduledAt"
    },
    {
      "actionId": "setCreateConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.status"
    },
    {
      "actionId": "setCreateConsultaDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.details"
    },
    {
      "actionId": "setCreateConsultaDetailsTelephoneConfirmation",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.details_telephoneConfirmation"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.details_telephoneConfirmation"
    },
    {
      "actionId": "setCreateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.createConsulta.input.details_telephoneConfirmation_confirmedAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.createConsulta.input.details_telephoneConfirmation_confirmedAt"
    },
    {
      "actionId": "createConsulta",
      "kind": "command",
      "commandRef": "createConsulta",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.createConsulta.input.pacienteId",
        "ui.consultas.createConsulta.input.profissionalId",
        "ui.consultas.createConsulta.input.scheduledAt",
        "ui.consultas.createConsulta.input.status",
        "ui.consultas.createConsulta.input.details",
        "ui.consultas.createConsulta.input.details_telephoneConfirmation",
        "ui.consultas.createConsulta.input.details_telephoneConfirmation_confirmedAt"
      ],
      "outputStateKeys": [
        "ui.consultas.createConsulta.result"
      ],
      "statusStateKey": "ui.consultas.createConsulta.status",
      "errorStateKey": "ui.consultas.createConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "registrarFalta",
      "kind": "command",
      "commandRef": "registrarFalta",
      "routeRef": "registrarFaltaRoute",
      "inputTypeRef": "RegistrarFaltaInput",
      "outputTypeRef": "RegistrarFaltaOutput",
      "inputStateKeys": [
        "ui.consultas.registrarFalta.input.id"
      ],
      "outputStateKeys": [
        "ui.consultas.registrarFalta.result"
      ],
      "statusStateKey": "ui.consultas.registrarFalta.status",
      "errorStateKey": "ui.consultas.registrarFalta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setUpdateConsultaPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.pacienteId"
    },
    {
      "actionId": "setUpdateConsultaProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.profissionalId"
    },
    {
      "actionId": "setUpdateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.scheduledAt"
    },
    {
      "actionId": "setUpdateConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.status"
    },
    {
      "actionId": "setUpdateConsultaDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.details"
    },
    {
      "actionId": "setUpdateConsultaDetailsTelephoneConfirmation",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.details_telephoneConfirmation"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.details_telephoneConfirmation"
    },
    {
      "actionId": "setUpdateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.input.details_telephoneConfirmation_confirmedAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.updateConsulta.input.details_telephoneConfirmation_confirmedAt"
    },
    {
      "actionId": "updateConsulta",
      "kind": "command",
      "commandRef": "updateConsulta",
      "routeRef": "updateConsultaRoute",
      "inputTypeRef": "UpdateConsultaInput",
      "outputTypeRef": "UpdateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.updateConsulta.input.id",
        "ui.consultas.updateConsulta.input.pacienteId",
        "ui.consultas.updateConsulta.input.profissionalId",
        "ui.consultas.updateConsulta.input.scheduledAt",
        "ui.consultas.updateConsulta.input.status",
        "ui.consultas.updateConsulta.input.details",
        "ui.consultas.updateConsulta.input.details_telephoneConfirmation",
        "ui.consultas.updateConsulta.input.details_telephoneConfirmation_confirmedAt"
      ],
      "outputStateKeys": [
        "ui.consultas.updateConsulta.result"
      ],
      "statusStateKey": "ui.consultas.updateConsulta.status",
      "errorStateKey": "ui.consultas.updateConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.id"
    },
    {
      "actionId": "setListConsultaPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.pacienteId"
    },
    {
      "actionId": "setListConsultaProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.profissionalId"
    },
    {
      "actionId": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.status"
    },
    {
      "actionId": "setListConsultaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listConsulta.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listConsulta.input.page"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.listConsulta.input.id",
        "ui.consultas.listConsulta.input.pacienteId",
        "ui.consultas.listConsulta.input.profissionalId",
        "ui.consultas.listConsulta.input.scheduledAt",
        "ui.consultas.listConsulta.input.status",
        "ui.consultas.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas.listConsulta.result"
      ],
      "statusStateKey": "ui.consultas.listConsulta.status",
      "errorStateKey": "ui.consultas.listConsulta.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.id"
    },
    {
      "actionId": "setListPacienteDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details"
    },
    {
      "actionId": "setListPacienteDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details_identification"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details_identification_subtype"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details_identification_name"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details_identification_docType"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details_identification_docId"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.details_identification_countryCode"
    },
    {
      "actionId": "setListPacientePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listPaciente.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listPaciente.input.page"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "commandRef": "listPaciente",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.consultas.listPaciente.input.id",
        "ui.consultas.listPaciente.input.details",
        "ui.consultas.listPaciente.input.details_identification",
        "ui.consultas.listPaciente.input.details_identification_subtype",
        "ui.consultas.listPaciente.input.details_identification_name",
        "ui.consultas.listPaciente.input.details_identification_docType",
        "ui.consultas.listPaciente.input.details_identification_docId",
        "ui.consultas.listPaciente.input.details_identification_countryCode",
        "ui.consultas.listPaciente.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas.listPaciente.result"
      ],
      "statusStateKey": "ui.consultas.listPaciente.status",
      "errorStateKey": "ui.consultas.listPaciente.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.id"
    },
    {
      "actionId": "setListProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details"
    },
    {
      "actionId": "setListProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification_subtype"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification_name"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification_status"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProfissionalPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas.listProfissional.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas.listProfissional.input.page"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.consultas.listProfissional.input.id",
        "ui.consultas.listProfissional.input.details",
        "ui.consultas.listProfissional.input.details_identification",
        "ui.consultas.listProfissional.input.details_identification_subtype",
        "ui.consultas.listProfissional.input.details_identification_name",
        "ui.consultas.listProfissional.input.details_identification_status",
        "ui.consultas.listProfissional.input.details_identification_docType",
        "ui.consultas.listProfissional.input.details_identification_docId",
        "ui.consultas.listProfissional.input.details_identification_countryCode",
        "ui.consultas.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas.listProfissional.result"
      ],
      "statusStateKey": "ui.consultas.listProfissional.status",
      "errorStateKey": "ui.consultas.listProfissional.error",
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
      "value": "createConsulta",
      "kind": "command",
      "actionId": "createConsulta",
      "preconditions": [
        "ui.consultas.createConsulta.input.pacienteId",
        "ui.consultas.createConsulta.input.profissionalId"
      ]
    },
    {
      "value": "registrarFalta",
      "kind": "command",
      "actionId": "registrarFalta",
      "preconditions": [
        "ui.consultas.registrarFalta.input.id"
      ]
    },
    {
      "value": "updateConsulta",
      "kind": "command",
      "actionId": "updateConsulta",
      "preconditions": [
        "ui.consultas.updateConsulta.input.id"
      ]
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
        "ui.consultas.createConsulta.input.pacienteId",
        "ui.consultas.createConsulta.input.profissionalId",
        "ui.consultas.createConsulta.input.scheduledAt",
        "ui.consultas.createConsulta.input.status",
        "ui.consultas.createConsulta.input.details",
        "ui.consultas.createConsulta.input.details_telephoneConfirmation",
        "ui.consultas.createConsulta.input.details_telephoneConfirmation_confirmedAt"
      ],
      "resultStateKey": "ui.consultas.createConsulta.result"
    },
    {
      "actionId": "registrarFalta",
      "kind": "command",
      "routeRef": "registrarFaltaRoute",
      "inputTypeRef": "RegistrarFaltaInput",
      "outputTypeRef": "RegistrarFaltaOutput",
      "inputStateKeys": [
        "ui.consultas.registrarFalta.input.id"
      ],
      "resultStateKey": "ui.consultas.registrarFalta.result"
    },
    {
      "actionId": "updateConsulta",
      "kind": "command",
      "routeRef": "updateConsultaRoute",
      "inputTypeRef": "UpdateConsultaInput",
      "outputTypeRef": "UpdateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.updateConsulta.input.id",
        "ui.consultas.updateConsulta.input.pacienteId",
        "ui.consultas.updateConsulta.input.profissionalId",
        "ui.consultas.updateConsulta.input.scheduledAt",
        "ui.consultas.updateConsulta.input.status",
        "ui.consultas.updateConsulta.input.details",
        "ui.consultas.updateConsulta.input.details_telephoneConfirmation",
        "ui.consultas.updateConsulta.input.details_telephoneConfirmation_confirmedAt"
      ],
      "resultStateKey": "ui.consultas.updateConsulta.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas.listConsulta.input.id",
        "ui.consultas.listConsulta.input.pacienteId",
        "ui.consultas.listConsulta.input.profissionalId",
        "ui.consultas.listConsulta.input.scheduledAt",
        "ui.consultas.listConsulta.input.status",
        "ui.consultas.listConsulta.input.page"
      ],
      "resultStateKey": "ui.consultas.listConsulta.result"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.consultas.listPaciente.input.id",
        "ui.consultas.listPaciente.input.details",
        "ui.consultas.listPaciente.input.details_identification",
        "ui.consultas.listPaciente.input.details_identification_subtype",
        "ui.consultas.listPaciente.input.details_identification_name",
        "ui.consultas.listPaciente.input.details_identification_docType",
        "ui.consultas.listPaciente.input.details_identification_docId",
        "ui.consultas.listPaciente.input.details_identification_countryCode",
        "ui.consultas.listPaciente.input.page"
      ],
      "resultStateKey": "ui.consultas.listPaciente.result"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.consultas.listProfissional.input.id",
        "ui.consultas.listProfissional.input.details",
        "ui.consultas.listProfissional.input.details_identification",
        "ui.consultas.listProfissional.input.details_identification_subtype",
        "ui.consultas.listProfissional.input.details_identification_name",
        "ui.consultas.listProfissional.input.details_identification_status",
        "ui.consultas.listProfissional.input.details_identification_docType",
        "ui.consultas.listProfissional.input.details_identification_docId",
        "ui.consultas.listProfissional.input.details_identification_countryCode",
        "ui.consultas.listProfissional.input.page"
      ],
      "resultStateKey": "ui.consultas.listProfissional.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "consultas__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/consultas.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/consultas.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/consultas.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
