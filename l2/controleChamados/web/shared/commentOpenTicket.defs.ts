/// <mls fileReference="_102047_/l2/controleChamados/web/shared/commentOpenTicket.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "commentOpenTicket",
  "pageName": "Registrar comentário em chamado aberto",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosCommentOpenTicketBase",
  "routePattern": "/controleChamados/commentOpenTicket/:ticketId?",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:commentOpenTicket",
    "contract:controleChamados.commentOpenTicket.qryLocateTicket",
    "contract:controleChamados.commentOpenTicket.cmdRecordComment"
  ],
  "operationIds": [
    "locateTicket",
    "recordComment"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "commentOpenTicket",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "TicketComment",
    "owners": [
      {
        "kind": "operation",
        "id": "locateTicket",
        "defPath": "_102047_/l4/controleChamados/operations/locateTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "recordComment",
        "defPath": "_102047_/l4/controleChamados/operations/recordComment.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "locateTicket",
          "commandName": "qryLocateTicket",
          "steps": [
            "Localizar o chamado aberto",
            "Um chamado aberto é selecionado a partir da Lista de chamados para encerramento."
          ]
        },
        {
          "operationId": "recordComment",
          "commandName": "cmdRecordComment",
          "steps": [
            "Registrar comentário",
            "Um comentário fica registrado no histórico do chamado."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102047_/l2/controleChamados/web/contracts/commentOpenTicket.ts",
    "contracts": [
      {
        "commandName": "qryLocateTicket",
        "routeConst": "qryLocateTicketRoute"
      },
      {
        "commandName": "cmdRecordComment",
        "routeConst": "cmdRecordCommentRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102047_/l2/controleChamados/web/desktop/page11/commentOpenTicket.defs.ts",
    "layoutId": "commentOpenTicket-pos-workspace"
  },
  "states": [
    {
      "stateKey": "ui.commentOpenTicket.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.commentOpenTicket.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "recordComment"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.commentOpenTicket.action.qryLocateTicket.status",
      "name": "qryLocateTicketState",
      "kind": "actionStatus",
      "actionRef": "qryLocateTicket",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.commentOpenTicket.data.qryLocateTicket",
      "name": "qryLocateTicketData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryLocateTicket",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.commentOpenTicket.action.cmdRecordComment.status",
      "name": "cmdRecordCommentState",
      "kind": "actionStatus",
      "actionRef": "cmdRecordComment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.commentOpenTicket.input.cmdRecordComment.ticketId",
      "name": "cmdRecordCommentTicketId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "cmdRecordComment",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.commentOpenTicket.input.cmdRecordComment.commentText",
      "name": "cmdRecordCommentCommentText",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdRecordComment",
        "direction": "input",
        "field": "commentText"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.commentOpenTicket.output.cmdRecordComment",
      "name": "cmdRecordCommentOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdRecordComment",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.commentOpenTicket.action.cmdRecordComment.error",
      "name": "cmdRecordCommentError",
      "kind": "actionError",
      "actionRef": "cmdRecordComment",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "qryLocateTicket",
      "kind": "query",
      "commandRef": "qryLocateTicket",
      "routeKey": "controleChamados.commentOpenTicket.qryLocateTicket",
      "purpose": "Localizar o chamado aberto",
      "methodName": "loadQryLocateTicket",
      "handlerName": "handleQryLocateTicketClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.commentOpenTicket.data.qryLocateTicket"
      ],
      "statusStateKey": "ui.commentOpenTicket.action.qryLocateTicket.status"
    },
    {
      "actionId": "cmdRecordComment",
      "kind": "command",
      "commandRef": "cmdRecordComment",
      "routeKey": "controleChamados.commentOpenTicket.cmdRecordComment",
      "purpose": "Registrar comentário",
      "methodName": "cmdRecordComment",
      "handlerName": "handleCmdRecordCommentClick",
      "inputStateKeys": [
        "ui.commentOpenTicket.input.cmdRecordComment.ticketId",
        "ui.commentOpenTicket.input.cmdRecordComment.commentText"
      ],
      "routeParamInputStateKeys": [
        "ui.commentOpenTicket.input.cmdRecordComment.ticketId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.commentOpenTicket.output.cmdRecordComment"
      ],
      "statusStateKey": "ui.commentOpenTicket.action.cmdRecordComment.status",
      "errorStateKey": "ui.commentOpenTicket.action.cmdRecordComment.error",
      "feedback": {
        "successMessageKey": "action.cmdRecordComment.success",
        "errorMessageKey": "action.cmdRecordComment.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.commentOpenTicket.input.cmdRecordComment.commentText"
      ],
      "refreshActionIds": [
        "qryLocateTicket"
      ]
    },
    {
      "actionId": "set.cmdRecordCommentTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.commentOpenTicket.input.cmdRecordComment.ticketId",
      "methodName": "setCmdRecordCommentTicketId",
      "handlerName": "handleCmdRecordCommentTicketIdChange"
    },
    {
      "actionId": "set.cmdRecordCommentCommentText",
      "kind": "stateSetter",
      "stateKey": "ui.commentOpenTicket.input.cmdRecordComment.commentText",
      "methodName": "setCmdRecordCommentCommentText",
      "handlerName": "handleCmdRecordCommentCommentTextChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryLocateTicket",
      "preconditions": []
    },
    {
      "value": "recordComment",
      "kind": "command",
      "commandName": "cmdRecordComment",
      "preconditions": [
        "ui.commentOpenTicket.input.cmdRecordComment.ticketId"
      ]
    }
  ],
  "destructiveCommandIds": [],
  "initialLoads": [
    {
      "actionId": "qryLocateTicket",
      "stateKey": "ui.commentOpenTicket.data.qryLocateTicket"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.commentOpenTicket.qryLocateTicket",
      "source": "bff.qryLocateTicket",
      "command": "qryLocateTicket",
      "description": "Localizar o chamado aberto",
      "kind": "query",
      "stateKey": "ui.commentOpenTicket.data.qryLocateTicket",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.commentOpenTicket.cmdRecordComment",
      "source": "bff.cmdRecordComment",
      "command": "cmdRecordComment",
      "description": "Registrar comentário",
      "kind": "command",
      "stateKey": "ui.commentOpenTicket.output.cmdRecordComment",
      "inputStateKeys": [
        "ui.commentOpenTicket.input.cmdRecordComment.ticketId",
        "ui.commentOpenTicket.input.cmdRecordComment.commentText"
      ],
      "inputs": [
        {
          "name": "ticketId",
          "stateKey": "ui.commentOpenTicket.input.cmdRecordComment.ticketId",
          "source": "routeParam",
          "required": true,
          "presentation": "route"
        },
        {
          "name": "commentText",
          "stateKey": "ui.commentOpenTicket.input.cmdRecordComment.commentText",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt"
    ],
    "runtimeLocales": [
      "pt-br"
    ]
  },
  "i18n": {
    "section.locateTicket.title": "Localizar chamado",
    "organism.qryLocateTicket.title": "Localizar o chamado aberto",
    "intent.qryLocateTicket.list.title": "Localizar o chamado aberto",
    "intent.qryLocateTicket.list.empty": "Nenhum registro encontrado",
    "intent.qryLocateTicket.list.column.ticketId.label": "Chamado",
    "intent.qryLocateTicket.list.column.title.label": "Título",
    "intent.qryLocateTicket.list.column.description.label": "Descrição",
    "intent.qryLocateTicket.list.column.status.label": "Status",
    "section.recordComment.title": "Registrar comentário",
    "organism.cmdRecordComment.title": "Registrar comentário",
    "intent.cmdRecordComment.form.title": "Registrar comentário",
    "intent.cmdRecordComment.form.action.cmdRecordComment": "Registrar comentário",
    "intent.cmdRecordComment.form.field.commentText.label": "Comentário",
    "action.cmdRecordComment.success": "Registrar comentário: OK",
    "action.cmdRecordComment.error": "Registrar comentário: falhou",
    "section.ticket-context.title": "Chamado em acompanhamento",
    "section.comment-action.title": "Registro no histórico"
  },
  "automation": {
    "statePrefix": "ui.commentOpenTicket",
    "stateKeys": [
      "ui.commentOpenTicket.status",
      "ui.commentOpenTicket.scenary",
      "ui.commentOpenTicket.action.qryLocateTicket.status",
      "ui.commentOpenTicket.data.qryLocateTicket",
      "ui.commentOpenTicket.action.cmdRecordComment.status",
      "ui.commentOpenTicket.input.cmdRecordComment.ticketId",
      "ui.commentOpenTicket.input.cmdRecordComment.commentText",
      "ui.commentOpenTicket.output.cmdRecordComment",
      "ui.commentOpenTicket.action.cmdRecordComment.error"
    ],
    "actionIds": [
      "qryLocateTicket",
      "cmdRecordComment",
      "set.cmdRecordCommentTicketId",
      "set.cmdRecordCommentCommentText"
    ]
  }
};

export const pipeline = [
  {
    "id": "commentOpenTicket__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102047_/l2/controleChamados/web/shared/commentOpenTicket.ts",
    "defPath": "_102047_/l2/controleChamados/web/shared/commentOpenTicket.defs.ts",
    "dependsFiles": [
      "_102047_/l2/controleChamados/web/contracts/commentOpenTicket.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanReceiveComment"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
