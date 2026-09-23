export const definition = {
  "schemaVersion": "2026-09-23-agent-defs-l2-shared-v2",
  "moduleName": "agendaClinica",
  "pageId": "consultas_recepcionista",
  "pageName": "Consultas",
  "baseClassName": "ConsultasRecepcionistaShared",
  "routePattern": "/consultas_recepcionista",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/consultas_recepcionista.defs.ts",
    "calls": [
      {
        "actionId": "confirmarConsulta",
        "routeConst": "confirmarConsultaRoute",
        "inputType": "ConfirmarConsultaInput",
        "outputType": "ConfirmarConsultaOutput"
      },
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
      "stateKey": "ui.consultas_recepcionista.pageStatus",
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
      "stateKey": "ui.consultas_recepcionista.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "confirmarConsulta",
        "createConsulta",
        "registrarFalta"
      ]
    },
    {
      "stateKey": "ui.consultas_recepcionista.confirmarConsulta.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "confirmarConsulta",
      "contractRef": "ConfirmarConsultaInput.Consulta.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas_recepcionista.confirmarConsulta.status",
      "name": "confirmarConsultaStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "confirmarConsulta"
    },
    {
      "stateKey": "ui.consultas_recepcionista.confirmarConsulta.error",
      "name": "confirmarConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "confirmarConsulta"
    },
    {
      "stateKey": "ui.consultas_recepcionista.confirmarConsulta.result",
      "name": "confirmarConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "confirmarConsulta",
      "contractRef": "ConfirmarConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.patientId",
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
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.professionalId",
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
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.scheduledAt",
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
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.status",
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
      "stateKey": "ui.consultas_recepcionista.createConsulta.status",
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
      "stateKey": "ui.consultas_recepcionista.createConsulta.error",
      "name": "createConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "createConsulta"
    },
    {
      "stateKey": "ui.consultas_recepcionista.createConsulta.result",
      "name": "createConsultaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "createConsulta",
      "contractRef": "CreateConsultaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas_recepcionista.registrarFalta.input.id",
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
      "stateKey": "ui.consultas_recepcionista.registrarFalta.status",
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
      "stateKey": "ui.consultas_recepcionista.registrarFalta.error",
      "name": "registrarFaltaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "registrarFalta"
    },
    {
      "stateKey": "ui.consultas_recepcionista.registrarFalta.result",
      "name": "registrarFaltaResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "registrarFalta",
      "contractRef": "RegistrarFaltaOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.id",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.patientId",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.professionalId",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.scheduledAt",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.status",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.page",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.status",
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
      "stateKey": "ui.consultas_recepcionista.listConsulta.error",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.consultas_recepcionista.listConsulta.result",
      "name": "listConsultaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.id",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_subtype",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_name",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_status",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_docType",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_docId",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_countryCode",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.page",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.status",
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
      "stateKey": "ui.consultas_recepcionista.listPaciente.error",
      "name": "listPacienteError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listPaciente"
    },
    {
      "stateKey": "ui.consultas_recepcionista.listPaciente.result",
      "name": "listPacienteResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listPaciente",
      "contractRef": "ListPacienteOutput",
      "outputShape": "array"
    },
    {
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.id",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_subtype",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_name",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_status",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_docType",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_docId",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_countryCode",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.page",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.status",
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
      "stateKey": "ui.consultas_recepcionista.listProfissional.error",
      "name": "listProfissionalError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listProfissional"
    },
    {
      "stateKey": "ui.consultas_recepcionista.listProfissional.result",
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
      "actionId": "setConfirmarConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.confirmarConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.confirmarConsulta.input.id"
    },
    {
      "actionId": "confirmarConsulta",
      "kind": "command",
      "commandRef": "confirmarConsulta",
      "routeRef": "confirmarConsultaRoute",
      "inputTypeRef": "ConfirmarConsultaInput",
      "outputTypeRef": "ConfirmarConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.confirmarConsulta.input.id"
      ],
      "outputStateKeys": [
        "ui.consultas_recepcionista.confirmarConsulta.result"
      ],
      "statusStateKey": "ui.consultas_recepcionista.confirmarConsulta.status",
      "errorStateKey": "ui.consultas_recepcionista.confirmarConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setCreateConsultaPatientId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.patientId"
    },
    {
      "actionId": "setCreateConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.professionalId"
    },
    {
      "actionId": "setCreateConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.scheduledAt"
    },
    {
      "actionId": "setCreateConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.createConsulta.input.status"
    },
    {
      "actionId": "createConsulta",
      "kind": "command",
      "commandRef": "createConsulta",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.input.patientId",
        "ui.consultas_recepcionista.createConsulta.input.professionalId",
        "ui.consultas_recepcionista.createConsulta.input.scheduledAt",
        "ui.consultas_recepcionista.createConsulta.input.status"
      ],
      "outputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.result"
      ],
      "statusStateKey": "ui.consultas_recepcionista.createConsulta.status",
      "errorStateKey": "ui.consultas_recepcionista.createConsulta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setRegistrarFaltaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.registrarFalta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.registrarFalta.input.id"
    },
    {
      "actionId": "registrarFalta",
      "kind": "command",
      "commandRef": "registrarFalta",
      "routeRef": "registrarFaltaRoute",
      "inputTypeRef": "RegistrarFaltaInput",
      "outputTypeRef": "RegistrarFaltaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.registrarFalta.input.id"
      ],
      "outputStateKeys": [
        "ui.consultas_recepcionista.registrarFalta.result"
      ],
      "statusStateKey": "ui.consultas_recepcionista.registrarFalta.status",
      "errorStateKey": "ui.consultas_recepcionista.registrarFalta.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.id"
    },
    {
      "actionId": "setListConsultaPatientId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.patientId"
    },
    {
      "actionId": "setListConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.professionalId"
    },
    {
      "actionId": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.status"
    },
    {
      "actionId": "setListConsultaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listConsulta.input.page"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.id",
        "ui.consultas_recepcionista.listConsulta.input.patientId",
        "ui.consultas_recepcionista.listConsulta.input.professionalId",
        "ui.consultas_recepcionista.listConsulta.input.scheduledAt",
        "ui.consultas_recepcionista.listConsulta.input.status",
        "ui.consultas_recepcionista.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.result"
      ],
      "statusStateKey": "ui.consultas_recepcionista.listConsulta.status",
      "errorStateKey": "ui.consultas_recepcionista.listConsulta.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.id"
    },
    {
      "actionId": "setListPacienteDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details"
    },
    {
      "actionId": "setListPacienteDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_subtype"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_name"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_status"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_docType"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_docId"
    },
    {
      "actionId": "setListPacienteDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.details_identification_countryCode"
    },
    {
      "actionId": "setListPacientePage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listPaciente.input.page"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "commandRef": "listPaciente",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.id",
        "ui.consultas_recepcionista.listPaciente.input.details",
        "ui.consultas_recepcionista.listPaciente.input.details_identification",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_subtype",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_name",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_status",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_docType",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_docId",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_countryCode",
        "ui.consultas_recepcionista.listPaciente.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.result"
      ],
      "statusStateKey": "ui.consultas_recepcionista.listPaciente.status",
      "errorStateKey": "ui.consultas_recepcionista.listPaciente.error",
      "refreshActionIds": []
    },
    {
      "actionId": "setListProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.id"
    },
    {
      "actionId": "setListProfissionalDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details"
    },
    {
      "actionId": "setListProfissionalDetailsIdentification",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationSubtype",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification_subtype"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_subtype"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationName",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification_name"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_name"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification_status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_status"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocType",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification_docType"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_docType"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationDocId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification_docId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_docId"
    },
    {
      "actionId": "setListProfissionalDetailsIdentificationCountryCode",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.details_identification_countryCode"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.details_identification_countryCode"
    },
    {
      "actionId": "setListProfissionalPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_recepcionista.listProfissional.input.page"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "commandRef": "listProfissional",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.id",
        "ui.consultas_recepcionista.listProfissional.input.details",
        "ui.consultas_recepcionista.listProfissional.input.details_identification",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_subtype",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_name",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_status",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_docType",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_docId",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_countryCode",
        "ui.consultas_recepcionista.listProfissional.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.result"
      ],
      "statusStateKey": "ui.consultas_recepcionista.listProfissional.status",
      "errorStateKey": "ui.consultas_recepcionista.listProfissional.error",
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
      "value": "confirmarConsulta",
      "kind": "command",
      "actionId": "confirmarConsulta",
      "preconditions": [
        "ui.consultas_recepcionista.confirmarConsulta.input.id"
      ]
    },
    {
      "value": "createConsulta",
      "kind": "command",
      "actionId": "createConsulta",
      "preconditions": []
    },
    {
      "value": "registrarFalta",
      "kind": "command",
      "actionId": "registrarFalta",
      "preconditions": [
        "ui.consultas_recepcionista.registrarFalta.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "confirmarConsulta",
      "kind": "command",
      "routeRef": "confirmarConsultaRoute",
      "inputTypeRef": "ConfirmarConsultaInput",
      "outputTypeRef": "ConfirmarConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.confirmarConsulta.input.id"
      ],
      "resultStateKey": "ui.consultas_recepcionista.confirmarConsulta.result"
    },
    {
      "actionId": "createConsulta",
      "kind": "command",
      "routeRef": "createConsultaRoute",
      "inputTypeRef": "CreateConsultaInput",
      "outputTypeRef": "CreateConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.createConsulta.input.patientId",
        "ui.consultas_recepcionista.createConsulta.input.professionalId",
        "ui.consultas_recepcionista.createConsulta.input.scheduledAt",
        "ui.consultas_recepcionista.createConsulta.input.status"
      ],
      "resultStateKey": "ui.consultas_recepcionista.createConsulta.result"
    },
    {
      "actionId": "registrarFalta",
      "kind": "command",
      "routeRef": "registrarFaltaRoute",
      "inputTypeRef": "RegistrarFaltaInput",
      "outputTypeRef": "RegistrarFaltaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.registrarFalta.input.id"
      ],
      "resultStateKey": "ui.consultas_recepcionista.registrarFalta.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.listConsulta.input.id",
        "ui.consultas_recepcionista.listConsulta.input.patientId",
        "ui.consultas_recepcionista.listConsulta.input.professionalId",
        "ui.consultas_recepcionista.listConsulta.input.scheduledAt",
        "ui.consultas_recepcionista.listConsulta.input.status",
        "ui.consultas_recepcionista.listConsulta.input.page"
      ],
      "resultStateKey": "ui.consultas_recepcionista.listConsulta.result"
    },
    {
      "actionId": "listPaciente",
      "kind": "query",
      "routeRef": "listPacienteRoute",
      "inputTypeRef": "ListPacienteInput",
      "outputTypeRef": "ListPacienteOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.listPaciente.input.id",
        "ui.consultas_recepcionista.listPaciente.input.details",
        "ui.consultas_recepcionista.listPaciente.input.details_identification",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_subtype",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_name",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_status",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_docType",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_docId",
        "ui.consultas_recepcionista.listPaciente.input.details_identification_countryCode",
        "ui.consultas_recepcionista.listPaciente.input.page"
      ],
      "resultStateKey": "ui.consultas_recepcionista.listPaciente.result"
    },
    {
      "actionId": "listProfissional",
      "kind": "query",
      "routeRef": "listProfissionalRoute",
      "inputTypeRef": "ListProfissionalInput",
      "outputTypeRef": "ListProfissionalOutput",
      "inputStateKeys": [
        "ui.consultas_recepcionista.listProfissional.input.id",
        "ui.consultas_recepcionista.listProfissional.input.details",
        "ui.consultas_recepcionista.listProfissional.input.details_identification",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_subtype",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_name",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_status",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_docType",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_docId",
        "ui.consultas_recepcionista.listProfissional.input.details_identification_countryCode",
        "ui.consultas_recepcionista.listProfissional.input.page"
      ],
      "resultStateKey": "ui.consultas_recepcionista.listProfissional.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "consultas_recepcionista__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/consultas_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/consultas_recepcionista.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
