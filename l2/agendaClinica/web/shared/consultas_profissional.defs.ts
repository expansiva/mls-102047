export const definition = {
  "schemaVersion": "2026-09-21-agent-defs-l2-shared-v1",
  "moduleName": "agendaClinica",
  "pageId": "consultas_profissional",
  "pageName": "Agenda do dia",
  "baseClassName": "ConsultasProfissionalShared",
  "routePattern": "/consultas_profissional",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/consultas_profissional.defs.ts",
    "calls": [
      {
        "actionId": "registrarAtendimento",
        "routeConst": "registrarAtendimentoRoute",
        "inputType": "RegistrarAtendimentoInput",
        "outputType": "RegistrarAtendimentoOutput"
      },
      {
        "actionId": "listConsulta",
        "routeConst": "listConsultaRoute",
        "inputType": "ListConsultaInput",
        "outputType": "ListConsultaOutput"
      }
    ]
  },
  "states": [
    {
      "stateKey": "ui.consultas_profissional.pageStatus",
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
      "stateKey": "ui.consultas_profissional.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "registrarAtendimento"
      ]
    },
    {
      "stateKey": "ui.consultas_profissional.registrarAtendimento.input.id",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoInput.Consulta.id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.consultas_profissional.registrarAtendimento.input.details",
      "name": "details",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoInput.Consulta.details",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.consultas_profissional.registrarAtendimento.input.details_attendanceNote",
      "name": "attendanceNote",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoInput.Consulta.details.attendanceNote",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.consultas_profissional.registrarAtendimento.status",
      "name": "registrarAtendimentoStatus",
      "kind": "actionStatus",
      "defaultValue": "idle",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "actionRef": "registrarAtendimento"
    },
    {
      "stateKey": "ui.consultas_profissional.registrarAtendimento.error",
      "name": "registrarAtendimentoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "registrarAtendimento"
    },
    {
      "stateKey": "ui.consultas_profissional.registrarAtendimento.result",
      "name": "registrarAtendimentoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.consultas_profissional.listConsulta.input.id",
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
      "stateKey": "ui.consultas_profissional.listConsulta.input.patientId",
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
      "stateKey": "ui.consultas_profissional.listConsulta.input.professionalId",
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
      "stateKey": "ui.consultas_profissional.listConsulta.input.scheduledAt",
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
      "stateKey": "ui.consultas_profissional.listConsulta.input.status",
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
      "stateKey": "ui.consultas_profissional.listConsulta.input.page",
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
      "stateKey": "ui.consultas_profissional.listConsulta.status",
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
      "stateKey": "ui.consultas_profissional.listConsulta.error",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.consultas_profissional.listConsulta.result",
      "name": "listConsultaResult",
      "kind": "queryResult",
      "defaultValue": [],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaOutput",
      "outputShape": "array"
    }
  ],
  "actions": [
    {
      "actionId": "setRegistrarAtendimentoId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.registrarAtendimento.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.registrarAtendimento.input.id"
    },
    {
      "actionId": "setRegistrarAtendimentoDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.registrarAtendimento.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.registrarAtendimento.input.details"
    },
    {
      "actionId": "setRegistrarAtendimentoDetailsAttendanceNote",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.registrarAtendimento.input.details_attendanceNote"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.registrarAtendimento.input.details_attendanceNote"
    },
    {
      "actionId": "registrarAtendimento",
      "kind": "command",
      "commandRef": "registrarAtendimento",
      "routeRef": "registrarAtendimentoRoute",
      "inputTypeRef": "RegistrarAtendimentoInput",
      "outputTypeRef": "RegistrarAtendimentoOutput",
      "inputStateKeys": [
        "ui.consultas_profissional.registrarAtendimento.input.id",
        "ui.consultas_profissional.registrarAtendimento.input.details",
        "ui.consultas_profissional.registrarAtendimento.input.details_attendanceNote"
      ],
      "outputStateKeys": [
        "ui.consultas_profissional.registrarAtendimento.result"
      ],
      "statusStateKey": "ui.consultas_profissional.registrarAtendimento.status",
      "errorStateKey": "ui.consultas_profissional.registrarAtendimento.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.listConsulta.input.id"
    },
    {
      "actionId": "setListConsultaPatientId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.patientId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.listConsulta.input.patientId"
    },
    {
      "actionId": "setListConsultaProfessionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.professionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.listConsulta.input.professionalId"
    },
    {
      "actionId": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.listConsulta.input.status"
    },
    {
      "actionId": "setListConsultaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.consultas_profissional.listConsulta.input.page"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.id",
        "ui.consultas_profissional.listConsulta.input.patientId",
        "ui.consultas_profissional.listConsulta.input.professionalId",
        "ui.consultas_profissional.listConsulta.input.scheduledAt",
        "ui.consultas_profissional.listConsulta.input.status",
        "ui.consultas_profissional.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.consultas_profissional.listConsulta.result"
      ],
      "statusStateKey": "ui.consultas_profissional.listConsulta.status",
      "errorStateKey": "ui.consultas_profissional.listConsulta.error",
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
      "value": "registrarAtendimento",
      "kind": "command",
      "actionId": "registrarAtendimento",
      "preconditions": [
        "ui.consultas_profissional.registrarAtendimento.input.id"
      ]
    }
  ],
  "initialLoads": [],
  "dataBindings": [
    {
      "actionId": "registrarAtendimento",
      "kind": "command",
      "routeRef": "registrarAtendimentoRoute",
      "inputTypeRef": "RegistrarAtendimentoInput",
      "outputTypeRef": "RegistrarAtendimentoOutput",
      "inputStateKeys": [
        "ui.consultas_profissional.registrarAtendimento.input.id",
        "ui.consultas_profissional.registrarAtendimento.input.details",
        "ui.consultas_profissional.registrarAtendimento.input.details_attendanceNote"
      ],
      "resultStateKey": "ui.consultas_profissional.registrarAtendimento.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.consultas_profissional.listConsulta.input.id",
        "ui.consultas_profissional.listConsulta.input.patientId",
        "ui.consultas_profissional.listConsulta.input.professionalId",
        "ui.consultas_profissional.listConsulta.input.scheduledAt",
        "ui.consultas_profissional.listConsulta.input.status",
        "ui.consultas_profissional.listConsulta.input.page"
      ],
      "resultStateKey": "ui.consultas_profissional.listConsulta.result"
    }
  ]
} as const;

export const pipeline = {
  "id": "consultas_profissional__l2_shared",
  "type": "l2_shared",
  "defPath": "l2/agendaClinica/web/shared/consultas_profissional.defs.ts",
  "outputPath": "l2/agendaClinica/web/shared/consultas_profissional.ts",
  "dependsFiles": [
    "l2/agendaClinica/web/contracts/consultas_profissional.defs.ts"
  ],
  "dependsOn": []
} as const;
