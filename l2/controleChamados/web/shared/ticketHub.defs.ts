/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketHub.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "ticketHub",
  "pageName": "Chamado",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosTicketHubBase",
  "routePattern": "/controleChamados/ticketHub",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:ticketHub",
    "contract:controleChamados.ticketHub.qryListTicket",
    "contract:controleChamados.ticketHub.qryListTicketComment"
  ],
  "operationIds": [
    "listTicket",
    "listTicketComment"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "ticketHub",
    "workspaceKind": "landing",
    "actor": "atendente",
    "entity": "Ticket",
    "owners": [
      {
        "kind": "operation",
        "id": "listTicket",
        "defPath": "_102047_/l4/controleChamados/operations/listTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listTicketComment",
        "defPath": "_102047_/l4/controleChamados/operations/listTicketComment.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "listTicket",
          "commandName": "qryListTicket",
          "steps": [
            "Encontrar o registro."
          ]
        },
        {
          "operationId": "listTicketComment",
          "commandName": "qryListTicketComment",
          "steps": [
            "Encontrar o registro."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102047_/l2/controleChamados/web/contracts/ticketHub.ts",
    "contracts": [
      {
        "commandName": "qryListTicket",
        "routeConst": "qryListTicketRoute"
      },
      {
        "commandName": "qryListTicketComment",
        "routeConst": "qryListTicketCommentRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102047_/l2/controleChamados/web/desktop/page11/ticketHub.defs.ts",
    "layoutId": "status_overview"
  },
  "states": [
    {
      "stateKey": "ui.ticketHub.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketHub.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.ticketHub.action.qryListTicket.status",
      "name": "qryListTicketState",
      "kind": "actionStatus",
      "actionRef": "qryListTicket",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketHub.input.qryListTicket.search",
      "name": "qryListTicketSearch",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryListTicket",
        "direction": "input",
        "field": "search"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketHub.input.qryListTicket.sortBy",
      "name": "qryListTicketSortBy",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryListTicket",
        "direction": "input",
        "field": "sortBy"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketHub.input.qryListTicket.sortOrder",
      "name": "qryListTicketSortOrder",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryListTicket",
        "direction": "input",
        "field": "sortOrder"
      },
      "valueSet": [
        "asc",
        "desc"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketHub.data.qryListTicket",
      "name": "qryListTicketData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListTicket",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.ticketHub.action.qryListTicketComment.status",
      "name": "qryListTicketCommentState",
      "kind": "actionStatus",
      "actionRef": "qryListTicketComment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketHub.data.qryListTicketComment",
      "name": "qryListTicketCommentData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListTicketComment",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    }
  ],
  "actions": [
    {
      "actionId": "qryListTicket",
      "kind": "query",
      "commandRef": "qryListTicket",
      "routeKey": "controleChamados.ticketHub.qryListTicket",
      "purpose": "Listar Chamado",
      "methodName": "loadQryListTicket",
      "handlerName": "handleQryListTicketClick",
      "inputStateKeys": [
        "ui.ticketHub.input.qryListTicket.search",
        "ui.ticketHub.input.qryListTicket.sortBy",
        "ui.ticketHub.input.qryListTicket.sortOrder"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketHub.data.qryListTicket"
      ],
      "statusStateKey": "ui.ticketHub.action.qryListTicket.status"
    },
    {
      "actionId": "qryListTicketComment",
      "kind": "query",
      "commandRef": "qryListTicketComment",
      "routeKey": "controleChamados.ticketHub.qryListTicketComment",
      "purpose": "Listar Comentário do chamado",
      "methodName": "loadQryListTicketComment",
      "handlerName": "handleQryListTicketCommentClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketHub.data.qryListTicketComment"
      ],
      "statusStateKey": "ui.ticketHub.action.qryListTicketComment.status"
    },
    {
      "actionId": "set.qryListTicketSearch",
      "kind": "stateSetter",
      "stateKey": "ui.ticketHub.input.qryListTicket.search",
      "methodName": "setQryListTicketSearch",
      "handlerName": "handleQryListTicketSearchChange"
    },
    {
      "actionId": "set.qryListTicketSortBy",
      "kind": "stateSetter",
      "stateKey": "ui.ticketHub.input.qryListTicket.sortBy",
      "methodName": "setQryListTicketSortBy",
      "handlerName": "handleQryListTicketSortByChange"
    },
    {
      "actionId": "set.qryListTicketSortOrder",
      "kind": "stateSetter",
      "stateKey": "ui.ticketHub.input.qryListTicket.sortOrder",
      "methodName": "setQryListTicketSortOrder",
      "handlerName": "handleQryListTicketSortOrderChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListTicket",
      "preconditions": []
    }
  ],
  "destructiveCommandIds": [],
  "initialLoads": [
    {
      "actionId": "qryListTicket",
      "stateKey": "ui.ticketHub.data.qryListTicket"
    },
    {
      "actionId": "qryListTicketComment",
      "stateKey": "ui.ticketHub.data.qryListTicketComment"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.ticketHub.qryListTicket",
      "source": "bff.qryListTicket",
      "command": "qryListTicket",
      "description": "Listar Chamado",
      "kind": "query",
      "stateKey": "ui.ticketHub.data.qryListTicket",
      "inputStateKeys": [
        "ui.ticketHub.input.qryListTicket.search",
        "ui.ticketHub.input.qryListTicket.sortBy",
        "ui.ticketHub.input.qryListTicket.sortOrder"
      ],
      "inputs": [
        {
          "name": "search",
          "stateKey": "ui.ticketHub.input.qryListTicket.search",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortBy",
          "stateKey": "ui.ticketHub.input.qryListTicket.sortBy",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortOrder",
          "stateKey": "ui.ticketHub.input.qryListTicket.sortOrder",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        }
      ],
      "selection": "single"
    },
    {
      "id": "binding.ticketHub.qryListTicketComment",
      "source": "bff.qryListTicketComment",
      "command": "qryListTicketComment",
      "description": "Listar Comentário do chamado",
      "kind": "query",
      "stateKey": "ui.ticketHub.data.qryListTicketComment",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
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
    "section.collection.title": "Carteira de chamados",
    "organism.qryListTicket.title": "Listar Chamado",
    "intent.qryListTicket.list.title": "Listar Chamado",
    "intent.qryListTicket.list.empty": "Nenhum registro encontrado",
    "intent.qryListTicket.list.column.ticketId.label": "Identificador do chamado",
    "intent.qryListTicket.list.column.title.label": "Título",
    "intent.qryListTicket.list.column.description.label": "Descrição",
    "intent.qryListTicket.list.column.status.label": "Status",
    "intent.qryListTicket.list.filter.search.label": "Search",
    "intent.qryListTicket.list.filter.sortBy.label": "Sort By",
    "intent.qryListTicket.list.filter.sortOrder.label": "Sort Order",
    "section.record.title": "Chamado selecionado e comentários",
    "organism.qryListTicketComment.title": "Listar Comentário do chamado",
    "intent.qryListTicketComment.list.title": "Listar Comentário do chamado",
    "intent.qryListTicketComment.list.empty": "Nenhum registro encontrado",
    "intent.qryListTicketComment.list.column.ticketCommentId.label": "Identificador do comentário",
    "intent.qryListTicketComment.list.column.ticketId.label": "Identificador do chamado",
    "intent.qryListTicketComment.list.column.commentText.label": "Comentário",
    "section.ticket-workspace.title": "Carteira de chamados",
    "section.ticket-context.title": "Chamado selecionado"
  },
  "automation": {
    "statePrefix": "ui.ticketHub",
    "stateKeys": [
      "ui.ticketHub.status",
      "ui.ticketHub.scenary",
      "ui.ticketHub.action.qryListTicket.status",
      "ui.ticketHub.input.qryListTicket.search",
      "ui.ticketHub.input.qryListTicket.sortBy",
      "ui.ticketHub.input.qryListTicket.sortOrder",
      "ui.ticketHub.data.qryListTicket",
      "ui.ticketHub.action.qryListTicketComment.status",
      "ui.ticketHub.data.qryListTicketComment"
    ],
    "actionIds": [
      "qryListTicket",
      "qryListTicketComment",
      "set.qryListTicketSearch",
      "set.qryListTicketSortBy",
      "set.qryListTicketSortOrder"
    ]
  }
};

export const pipeline = [
  {
    "id": "ticketHub__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102047_/l2/controleChamados/web/shared/ticketHub.ts",
    "defPath": "_102047_/l2/controleChamados/web/shared/ticketHub.defs.ts",
    "dependsFiles": [
      "_102047_/l2/controleChamados/web/contracts/ticketHub.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
