export const definition = {
  "schemaVersion": "2026-09-24-agent-defs-l2-shared-v3",
  "moduleName": "agendaClinica",
  "pageId": "agenda",
  "pageName": "Agenda",
  "baseClassName": "AgendaShared",
  "routePattern": "/profissional/agenda",
  "contractRef": {
    "defPath": "l2/agendaClinica/web/contracts/agenda.defs.ts",
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
      "stateKey": "ui.agenda.pageStatus",
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
      "stateKey": "ui.agenda.scenary",
      "name": "scenary",
      "kind": "uiScenary",
      "defaultValue": "base",
      "valueSet": [
        "base",
        "registrarAtendimento"
      ]
    },
    {
      "stateKey": "ui.agenda.registrarAtendimento.input.id",
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
      "stateKey": "ui.agenda.registrarAtendimento.input.details",
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
      "stateKey": "ui.agenda.registrarAtendimento.input.details_attendanceNote",
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
      "stateKey": "ui.agenda.registrarAtendimento.status",
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
      "stateKey": "ui.agenda.registrarAtendimento.error",
      "name": "registrarAtendimentoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "registrarAtendimento"
    },
    {
      "stateKey": "ui.agenda.registrarAtendimento.result",
      "name": "registrarAtendimentoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.id",
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
      "stateKey": "ui.agenda.listConsulta.input.pacienteId",
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
      "stateKey": "ui.agenda.listConsulta.input.profissionalId",
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
      "stateKey": "ui.agenda.listConsulta.input.scheduledAt",
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
      "stateKey": "ui.agenda.listConsulta.input.status",
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
      "stateKey": "ui.agenda.listConsulta.input.page",
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
      "stateKey": "ui.agenda.listConsulta.status",
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
      "stateKey": "ui.agenda.listConsulta.error",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.agenda.listConsulta.result",
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
      "actionId": "setRegistrarAtendimentoDetails",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.registrarAtendimento.input.details"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.registrarAtendimento.input.details"
    },
    {
      "actionId": "setRegistrarAtendimentoDetailsAttendanceNote",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.registrarAtendimento.input.details_attendanceNote"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.registrarAtendimento.input.details_attendanceNote"
    },
    {
      "actionId": "registrarAtendimento",
      "kind": "command",
      "commandRef": "registrarAtendimento",
      "routeRef": "registrarAtendimentoRoute",
      "inputTypeRef": "RegistrarAtendimentoInput",
      "outputTypeRef": "RegistrarAtendimentoOutput",
      "inputStateKeys": [
        "ui.agenda.registrarAtendimento.input.id",
        "ui.agenda.registrarAtendimento.input.details",
        "ui.agenda.registrarAtendimento.input.details_attendanceNote"
      ],
      "outputStateKeys": [
        "ui.agenda.registrarAtendimento.result"
      ],
      "statusStateKey": "ui.agenda.registrarAtendimento.status",
      "errorStateKey": "ui.agenda.registrarAtendimento.error",
      "refreshActionIds": [
        "listConsulta"
      ]
    },
    {
      "actionId": "setListConsultaId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.listConsulta.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.listConsulta.input.id"
    },
    {
      "actionId": "setListConsultaPacienteId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.listConsulta.input.pacienteId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.listConsulta.input.pacienteId"
    },
    {
      "actionId": "setListConsultaProfissionalId",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.listConsulta.input.profissionalId"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.listConsulta.input.profissionalId"
    },
    {
      "actionId": "setListConsultaScheduledAt",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.listConsulta.input.scheduledAt"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.listConsulta.input.scheduledAt"
    },
    {
      "actionId": "setListConsultaStatus",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.listConsulta.input.status"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.listConsulta.input.status"
    },
    {
      "actionId": "setListConsultaPage",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.listConsulta.input.page"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.listConsulta.input.page"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "commandRef": "listConsulta",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.agenda.listConsulta.input.id",
        "ui.agenda.listConsulta.input.pacienteId",
        "ui.agenda.listConsulta.input.profissionalId",
        "ui.agenda.listConsulta.input.scheduledAt",
        "ui.agenda.listConsulta.input.status",
        "ui.agenda.listConsulta.input.page"
      ],
      "outputStateKeys": [
        "ui.agenda.listConsulta.result"
      ],
      "statusStateKey": "ui.agenda.listConsulta.status",
      "errorStateKey": "ui.agenda.listConsulta.error",
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
        "ui.agenda.registrarAtendimento.input.id"
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
        "ui.agenda.registrarAtendimento.input.id",
        "ui.agenda.registrarAtendimento.input.details",
        "ui.agenda.registrarAtendimento.input.details_attendanceNote"
      ],
      "resultStateKey": "ui.agenda.registrarAtendimento.result"
    },
    {
      "actionId": "listConsulta",
      "kind": "query",
      "routeRef": "listConsultaRoute",
      "inputTypeRef": "ListConsultaInput",
      "outputTypeRef": "ListConsultaOutput",
      "inputStateKeys": [
        "ui.agenda.listConsulta.input.id",
        "ui.agenda.listConsulta.input.pacienteId",
        "ui.agenda.listConsulta.input.profissionalId",
        "ui.agenda.listConsulta.input.scheduledAt",
        "ui.agenda.listConsulta.input.status",
        "ui.agenda.listConsulta.input.page"
      ],
      "resultStateKey": "ui.agenda.listConsulta.result"
    }
  ]
} as const;

export const pipeline = [
  {
    "id": "agenda__l2_shared",
    "type": "l2_shared",
    "defPath": "l2/agendaClinica/web/shared/agenda.defs.ts",
    "outputPath": "l2/agendaClinica/web/shared/agenda.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/contracts/agenda.defs.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
