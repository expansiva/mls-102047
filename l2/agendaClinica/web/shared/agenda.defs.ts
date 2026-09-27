/// <mls fileReference="_102047_/l2/agendaClinica/web/shared/agenda.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-26-agent-defs-l2-shared-v4",
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
      "memberName": "pageStatus",
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
      "memberName": "scenary",
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
      "memberName": "stateRegistrarAtendimentoId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "title": "Id",
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoInput.id",
      "ontologyRef": "Consulta.id",
      "dtoPath": "id",
      "source": "selectedEntity",
      "presentation": "selection",
      "editable": false,
      "required": true
    },
    {
      "stateKey": "ui.agenda.registrarAtendimento.input.details.attendanceNote",
      "memberName": "stateRegistrarAtendimentoDetailsAttendanceNote",
      "name": "attendanceNote",
      "kind": "input",
      "defaultValue": null,
      "title": "Anotação do atendimento",
      "description": "Anotação registrada pelo profissional ao concluir o atendimento.",
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoInput.details.attendanceNote",
      "ontologyRef": "Consulta.details.attendanceNote",
      "dtoPath": "details.attendanceNote",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": true
    },
    {
      "stateKey": "ui.agenda.registrarAtendimento.status",
      "memberName": "stateRegistrarAtendimentoStatus",
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
      "memberName": "stateRegistrarAtendimentoError",
      "name": "registrarAtendimentoError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "registrarAtendimento"
    },
    {
      "stateKey": "ui.agenda.registrarAtendimento.result",
      "memberName": "stateRegistrarAtendimentoResult",
      "name": "registrarAtendimentoResult",
      "kind": "commandOutput",
      "defaultValue": null,
      "actionRef": "registrarAtendimento",
      "contractRef": "RegistrarAtendimentoOutput",
      "outputShape": "object"
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.id",
      "memberName": "stateListConsultaId",
      "name": "id",
      "kind": "input",
      "defaultValue": null,
      "title": "Id",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.id",
      "ontologyRef": "Consulta.id",
      "dtoPath": "id",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.pacienteId",
      "memberName": "stateListConsultaPacienteId",
      "name": "pacienteId",
      "kind": "input",
      "defaultValue": null,
      "title": "Paciente",
      "description": "Paciente para quem a consulta foi agendada.",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.pacienteId",
      "ontologyRef": "Consulta.pacienteId",
      "dtoPath": "pacienteId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.profissionalId",
      "memberName": "stateListConsultaProfissionalId",
      "name": "profissionalId",
      "kind": "input",
      "defaultValue": null,
      "title": "Profissional",
      "description": "Profissional responsável por realizar a consulta.",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.profissionalId",
      "ontologyRef": "Consulta.profissionalId",
      "dtoPath": "profissionalId",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.scheduledAt",
      "memberName": "stateListConsultaScheduledAt",
      "name": "scheduledAt",
      "kind": "input",
      "defaultValue": null,
      "title": "Data e horário",
      "description": "Data e horário em que a consulta está marcada; é usado para consultar a agenda diária do profissional.",
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.scheduledAt",
      "ontologyRef": "Consulta.scheduledAt",
      "dtoPath": "scheduledAt",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.status",
      "memberName": "stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e00006900006e00007000007500007400002e000073000074000061000074000075000073",
      "name": "status",
      "kind": "input",
      "defaultValue": null,
      "title": "Situação",
      "description": "Situação operacional da consulta.",
      "enumOptions": [
        {
          "value": "scheduled",
          "label": "Agendada"
        },
        {
          "value": "noShow",
          "label": "Falta registrada"
        },
        {
          "value": "attended",
          "label": "Atendida"
        }
      ],
      "valueSet": [
        "scheduled",
        "noShow",
        "attended"
      ],
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.status",
      "ontologyRef": "Consulta.status",
      "dtoPath": "status",
      "source": "userInput",
      "presentation": "form",
      "editable": true,
      "required": false
    },
    {
      "stateKey": "ui.agenda.listConsulta.input.page",
      "memberName": "stateListConsultaPage",
      "name": "page",
      "kind": "input",
      "defaultValue": null,
      "actionRef": "listConsulta",
      "contractRef": "ListConsultaInput.page",
      "ontologyRef": "Consulta.$page",
      "dtoPath": "page",
      "source": "routeParam",
      "presentation": "route",
      "editable": false,
      "required": false
    },
    {
      "stateKey": "ui.agenda.listConsulta.status",
      "memberName": "stateListConsultaStatusX00007300007400006100007400006500003a00007500006900002e00006100006700006500006e00006400006100002e00006c00006900007300007400004300006f00006e00007300007500006c00007400006100002e000073000074000061000074000075000073",
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
      "memberName": "stateListConsultaError",
      "name": "listConsultaError",
      "kind": "actionError",
      "defaultValue": null,
      "actionRef": "listConsulta"
    },
    {
      "stateKey": "ui.agenda.listConsulta.result",
      "memberName": "stateListConsultaResult",
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
      "actionId": "set:scenario",
      "methodName": "setScenario",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.scenary"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.scenary"
    },
    {
      "actionId": "select:registrarAtendimento:id",
      "methodName": "selectRegistrarAtendimentoId",
      "kind": "selection",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.registrarAtendimento.input.id"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.registrarAtendimento.input.id",
      "selection": {
        "sourceActionId": "listConsulta",
        "resultStateKey": "ui.agenda.listConsulta.result",
        "identityPath": "id"
      }
    },
    {
      "actionId": "set:registrarAtendimento:details.attendanceNote",
      "methodName": "setRegistrarAtendimentoDetailsAttendanceNote",
      "kind": "stateSetter",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.agenda.registrarAtendimento.input.details.attendanceNote"
      ],
      "statusStateKey": "",
      "errorStateKey": "",
      "refreshActionIds": [],
      "stateKey": "ui.agenda.registrarAtendimento.input.details.attendanceNote"
    },
    {
      "actionId": "registrarAtendimento",
      "methodName": "runRegistrarAtendimento",
      "kind": "command",
      "commandRef": "registrarAtendimento",
      "routeRef": "registrarAtendimentoRoute",
      "inputTypeRef": "RegistrarAtendimentoInput",
      "outputTypeRef": "RegistrarAtendimentoOutput",
      "inputStateKeys": [
        "ui.agenda.registrarAtendimento.input.id",
        "ui.agenda.registrarAtendimento.input.details.attendanceNote"
      ],
      "outputStateKeys": [
        "ui.agenda.registrarAtendimento.result"
      ],
      "statusStateKey": "ui.agenda.registrarAtendimento.status",
      "errorStateKey": "ui.agenda.registrarAtendimento.error",
      "refreshActionIds": [
        "listConsulta"
      ],
      "operationBinding": {
        "actorRef": "profissional",
        "grantRefs": [
          "profissionalAgendaPropria"
        ],
        "authorities": [
          "profissional"
        ],
        "transition": {
          "transitionId": "registrarAtendimento",
          "from": [
            "scheduled"
          ],
          "to": "attended",
          "by": [
            "profissional"
          ],
          "payload": [
            "details.attendanceNote"
          ]
        },
        "ruleRefs": [
          {
            "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
            "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
          },
          {
            "ruleId": "anotacaoObrigatoriaNoAtendimento",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
            "description": "O registro de atendimento deve incluir uma anotação do atendimento."
          },
          {
            "ruleId": "profissionalAtendeSomentePropriaConsulta",
            "file": "l4/agendaClinica/rules.defs.ts",
            "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
            "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
          }
        ],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "profissional",
          "grantRefs": [
            "profissionalAgendaPropria"
          ],
          "authorities": [
            "profissional"
          ],
          "transition": {
            "transitionId": "registrarAtendimento",
            "from": [
              "scheduled"
            ],
            "to": "attended",
            "by": [
              "profissional"
            ],
            "payload": [
              "details.attendanceNote"
            ]
          },
          "ruleRefs": [
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
              "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
            },
            {
              "ruleId": "anotacaoObrigatoriaNoAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
              "description": "O registro de atendimento deve incluir uma anotação do atendimento."
            },
            {
              "ruleId": "profissionalAtendeSomentePropriaConsulta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
              "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "actionId": "set:listConsulta:id",
      "methodName": "setListConsultaId",
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
      "actionId": "set:listConsulta:pacienteId",
      "methodName": "setListConsultaPacienteId",
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
      "actionId": "set:listConsulta:profissionalId",
      "methodName": "setListConsultaProfissionalId",
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
      "actionId": "set:listConsulta:scheduledAt",
      "methodName": "setListConsultaScheduledAt",
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
      "actionId": "set:listConsulta:status",
      "methodName": "setListConsultaStatus",
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
      "actionId": "listConsulta",
      "methodName": "runListConsulta",
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
      "refreshActionIds": [],
      "operationBinding": {
        "actorRef": "profissional",
        "grantRefs": [
          "profissionalAgendaPropria"
        ],
        "authorities": [
          "profissional"
        ],
        "ruleRefs": [],
        "sourceHashes": [
          "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
          "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
          "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
        ]
      },
      "operationBindings": [
        {
          "actorRef": "profissional",
          "grantRefs": [
            "profissionalAgendaPropria"
          ],
          "authorities": [
            "profissional"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "actionId": "listConsulta",
      "preconditions": [],
      "methodName": "enterBaseScenario",
      "operationBindings": [
        {
          "actorRef": "profissional",
          "grantRefs": [
            "profissionalAgendaPropria"
          ],
          "authorities": [
            "profissional"
          ],
          "ruleRefs": [],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    },
    {
      "value": "registrarAtendimento",
      "kind": "command",
      "actionId": "registrarAtendimento",
      "preconditions": [
        "ui.agenda.registrarAtendimento.input.id"
      ],
      "methodName": "enterRegistrarAtendimentoScenario",
      "operationBindings": [
        {
          "actorRef": "profissional",
          "grantRefs": [
            "profissionalAgendaPropria"
          ],
          "authorities": [
            "profissional"
          ],
          "transition": {
            "transitionId": "registrarAtendimento",
            "from": [
              "scheduled"
            ],
            "to": "attended",
            "by": [
              "profissional"
            ],
            "payload": [
              "details.attendanceNote"
            ]
          },
          "ruleRefs": [
            {
              "ruleId": "consultaSomenteAgendadaPodeRegistrarAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.consultaSomenteAgendadaPodeRegistrarAtendimento",
              "description": "O atendimento só pode ser registrado para uma consulta com situação agendada."
            },
            {
              "ruleId": "anotacaoObrigatoriaNoAtendimento",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.anotacaoObrigatoriaNoAtendimento",
              "description": "O registro de atendimento deve incluir uma anotação do atendimento."
            },
            {
              "ruleId": "profissionalAtendeSomentePropriaConsulta",
              "file": "l4/agendaClinica/rules.defs.ts",
              "symbol": "rules.profissionalAtendeSomentePropriaConsulta",
              "description": "O profissional só pode registrar o atendimento de uma consulta atribuída a ele."
            }
          ],
          "sourceHashes": [
            "l4/agendaClinica/ontology/Consulta.defs.ts#sha256:d288780083aeb12e484740db46702ac341de938194d3380533c93b28200c9552",
            "l4/agendaClinica/access.defs.ts#sha256:22288ce4e7d7522f28879cad28e2582697aebe9124a685a7fc172db1a6e4e65b",
            "l4/agendaClinica/rules.defs.ts#sha256:b5516ac3568e374c7215a3424c381be7ba7485cde1c3d25d611ace61ecffdafe"
          ]
        }
      ]
    }
  ],
  "initialLoads": [
    {
      "actionId": "listConsulta",
      "stateKey": "ui.agenda.listConsulta.result"
    }
  ],
  "dataBindings": [
    {
      "actionId": "registrarAtendimento",
      "kind": "command",
      "routeRef": "registrarAtendimentoRoute",
      "inputTypeRef": "RegistrarAtendimentoInput",
      "outputTypeRef": "RegistrarAtendimentoOutput",
      "inputStateKeys": [
        "ui.agenda.registrarAtendimento.input.id",
        "ui.agenda.registrarAtendimento.input.details.attendanceNote"
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
  ],
  "coverage": [
    {
      "organismId": "organism.list.1",
      "sourceIndex": 0,
      "kind": "list",
      "contentRef": "content.list",
      "content": "Vejo as minhas consultas do dia.",
      "scenarioRefs": [
        "base",
        "registrarAtendimento"
      ],
      "capabilityRefs": [
        "registrarAtendimento",
        "listConsulta"
      ],
      "outputFieldsByCapability": {
        "registrarAtendimento": [],
        "listConsulta": [
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "version"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "pacienteId"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "profissionalId"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "scheduledAt"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "status"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "details.attendanceNote"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details.identification"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details.identification.name"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details.identification"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details.identification.name"
          }
        ]
      },
      "source": {
        "kind": "list",
        "text": "Vejo as minhas consultas do dia."
      }
    },
    {
      "organismId": "organism.detail.1",
      "sourceIndex": 1,
      "kind": "detail",
      "contentRef": "content.detail",
      "content": "Vejo o horário e o paciente da consulta.",
      "scenarioRefs": [
        "base",
        "registrarAtendimento"
      ],
      "capabilityRefs": [
        "registrarAtendimento",
        "listConsulta"
      ],
      "outputFieldsByCapability": {
        "registrarAtendimento": [],
        "listConsulta": [
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "version"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "pacienteId"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "profissionalId"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "scheduledAt"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "status"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "details.attendanceNote"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details.identification"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details.identification.name"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details.identification"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details.identification.name"
          }
        ]
      },
      "source": {
        "kind": "detail",
        "text": "Vejo o horário e o paciente da consulta."
      }
    },
    {
      "organismId": "organism.form.1",
      "sourceIndex": 2,
      "kind": "form",
      "contentRef": "content.form",
      "content": "Marco a consulta como atendida e registro a anotação do atendimento.",
      "scenarioRefs": [
        "base",
        "registrarAtendimento"
      ],
      "capabilityRefs": [
        "registrarAtendimento",
        "listConsulta"
      ],
      "outputFieldsByCapability": {
        "registrarAtendimento": [],
        "listConsulta": [
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "version"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "pacienteId"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "profissionalId"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "scheduledAt"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "status"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "details.attendanceNote"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details.identification"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaPaciente.details.identification.name"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.id"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details.identification"
          },
          {
            "actionId": "listConsulta",
            "outputTypeRef": "ListConsultaOutput",
            "path": "consultaProfissional.details.identification.name"
          }
        ]
      },
      "source": {
        "kind": "form",
        "text": "Marco a consulta como atendida e registro a anotação do atendimento."
      }
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
      "_102029_.d.ts",
      "l4/agendaClinica/access.defs.ts",
      "l4/agendaClinica/ontology/Consulta.defs.ts",
      "l4/agendaClinica/rules.defs.ts",
      "l4/agendaClinica/workflows.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2SharedTs.ts"
    ]
  }
] as const;
