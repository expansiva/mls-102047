/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketCatalogue.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "ticketCatalogue",
  "pageName": "Chamado",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosTicketCatalogueBase",
  "routePattern": "/controleChamados/ticketCatalogue/:ticketId?",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:ticketCatalogue",
    "contract:controleChamados.ticketCatalogue.qryListTicket",
    "contract:controleChamados.ticketCatalogue.cmdCreateTicket",
    "contract:controleChamados.ticketCatalogue.cmdUpdateTicket",
    "contract:controleChamados.ticketCatalogue.cmdDeleteTicket",
    "contract:controleChamados.ticketCatalogue.qryGetTicket",
    "contract:controleChamados.ticketCatalogue.qryLocateTicket",
    "contract:controleChamados.ticketCatalogue.cmdDecideClosure"
  ],
  "operationIds": [
    "createTicket",
    "decideClosure",
    "deleteTicket",
    "getTicket",
    "listTicket",
    "locateTicket",
    "updateTicket"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "ticketCatalogue",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "Ticket",
    "owners": [
      {
        "kind": "operation",
        "id": "createTicket",
        "defPath": "_102047_/l4/controleChamados/operations/createTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "decideClosure",
        "defPath": "_102047_/l4/controleChamados/operations/decideClosure.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deleteTicket",
        "defPath": "_102047_/l4/controleChamados/operations/deleteTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "getTicket",
        "defPath": "_102047_/l4/controleChamados/operations/getTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listTicket",
        "defPath": "_102047_/l4/controleChamados/operations/listTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "locateTicket",
        "defPath": "_102047_/l4/controleChamados/operations/locateTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateTicket",
        "defPath": "_102047_/l4/controleChamados/operations/updateTicket.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "createTicket",
          "commandName": "cmdCreateTicket",
          "steps": [
            "Informar os dados do novo registro."
          ]
        },
        {
          "operationId": "decideClosure",
          "commandName": "cmdDecideClosure",
          "steps": [
            "Confirmar o fechamento do chamado",
            "O chamado passa a ter status fechado."
          ]
        },
        {
          "operationId": "deleteTicket",
          "commandName": "cmdDeleteTicket",
          "steps": [
            "Remover o registro escolhido."
          ]
        },
        {
          "operationId": "getTicket",
          "commandName": "qryGetTicket",
          "steps": [
            "Ler o registro pelo identificador."
          ]
        },
        {
          "operationId": "listTicket",
          "commandName": "qryListTicket",
          "steps": [
            "Encontrar o registro."
          ]
        },
        {
          "operationId": "locateTicket",
          "commandName": "qryLocateTicket",
          "steps": [
            "Localizar o chamado aberto",
            "Um chamado aberto é selecionado a partir da Lista de chamados para encerramento."
          ]
        },
        {
          "operationId": "updateTicket",
          "commandName": "cmdUpdateTicket",
          "steps": [
            "Corrigir os dados do registro escolhido."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102047_/l2/controleChamados/web/contracts/ticketCatalogue.ts",
    "contracts": [
      {
        "commandName": "qryListTicket",
        "routeConst": "qryListTicketRoute"
      },
      {
        "commandName": "cmdCreateTicket",
        "routeConst": "cmdCreateTicketRoute"
      },
      {
        "commandName": "cmdUpdateTicket",
        "routeConst": "cmdUpdateTicketRoute"
      },
      {
        "commandName": "cmdDeleteTicket",
        "routeConst": "cmdDeleteTicketRoute"
      },
      {
        "commandName": "qryGetTicket",
        "routeConst": "qryGetTicketRoute"
      },
      {
        "commandName": "qryLocateTicket",
        "routeConst": "qryLocateTicketRoute"
      },
      {
        "commandName": "cmdDecideClosure",
        "routeConst": "cmdDecideClosureRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102047_/l2/controleChamados/web/desktop/page11/ticketCatalogue.defs.ts",
    "layoutId": "ticketCatalogue-pos-workspace"
  },
  "states": [
    {
      "stateKey": "ui.ticketCatalogue.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "detail",
        "createTicket",
        "updateTicket",
        "decideClosure"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.ticketCatalogue.action.qryListTicket.status",
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
      "stateKey": "ui.ticketCatalogue.input.qryListTicket.search",
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
      "stateKey": "ui.ticketCatalogue.input.qryListTicket.sortBy",
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
      "stateKey": "ui.ticketCatalogue.input.qryListTicket.sortOrder",
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
      "stateKey": "ui.ticketCatalogue.data.qryListTicket",
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
      "stateKey": "ui.ticketCatalogue.action.cmdCreateTicket.status",
      "name": "cmdCreateTicketState",
      "kind": "actionStatus",
      "actionRef": "cmdCreateTicket",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.title",
      "name": "cmdCreateTicketTitle",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateTicket",
        "direction": "input",
        "field": "title"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.description",
      "name": "cmdCreateTicketDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateTicket",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.status",
      "name": "cmdCreateTicketStatus",
      "kind": "input",
      "source": "systemDefault",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateTicket",
        "direction": "input",
        "field": "status"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.output.cmdCreateTicket",
      "name": "cmdCreateTicketOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCreateTicket",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCatalogue.action.cmdCreateTicket.error",
      "name": "cmdCreateTicketError",
      "kind": "actionError",
      "actionRef": "cmdCreateTicket",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.action.cmdUpdateTicket.status",
      "name": "cmdUpdateTicketState",
      "kind": "actionStatus",
      "actionRef": "cmdUpdateTicket",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
      "name": "cmdUpdateTicketTicketId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateTicket",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.title",
      "name": "cmdUpdateTicketTitle",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateTicket",
        "direction": "input",
        "field": "title"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.description",
      "name": "cmdUpdateTicketDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateTicket",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.status",
      "name": "cmdUpdateTicketStatus",
      "kind": "input",
      "source": "systemDefault",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateTicket",
        "direction": "input",
        "field": "status"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.output.cmdUpdateTicket",
      "name": "cmdUpdateTicketOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdUpdateTicket",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCatalogue.action.cmdUpdateTicket.error",
      "name": "cmdUpdateTicketError",
      "kind": "actionError",
      "actionRef": "cmdUpdateTicket",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.action.cmdDeleteTicket.status",
      "name": "cmdDeleteTicketState",
      "kind": "actionStatus",
      "actionRef": "cmdDeleteTicket",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId",
      "name": "cmdDeleteTicketTicketId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdDeleteTicket",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.output.cmdDeleteTicket",
      "name": "cmdDeleteTicketOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdDeleteTicket",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCatalogue.action.cmdDeleteTicket.error",
      "name": "cmdDeleteTicketError",
      "kind": "actionError",
      "actionRef": "cmdDeleteTicket",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.action.qryGetTicket.status",
      "name": "qryGetTicketState",
      "kind": "actionStatus",
      "actionRef": "qryGetTicket",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCatalogue.input.qryGetTicket.ticketId",
      "name": "qryGetTicketTicketId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "qryGetTicket",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.data.qryGetTicket",
      "name": "qryGetTicketData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryGetTicket",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCatalogue.action.qryLocateTicket.status",
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
      "stateKey": "ui.ticketCatalogue.data.qryLocateTicket",
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
      "stateKey": "ui.ticketCatalogue.action.cmdDecideClosure.status",
      "name": "cmdDecideClosureState",
      "kind": "actionStatus",
      "actionRef": "cmdDecideClosure",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdDecideClosure.ticketId",
      "name": "cmdDecideClosureTicketId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "cmdDecideClosure",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.input.cmdDecideClosure.status",
      "name": "cmdDecideClosureStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdDecideClosure",
        "direction": "input",
        "field": "status"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCatalogue.output.cmdDecideClosure",
      "name": "cmdDecideClosureOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdDecideClosure",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCatalogue.action.cmdDecideClosure.error",
      "name": "cmdDecideClosureError",
      "kind": "actionError",
      "actionRef": "cmdDecideClosure",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "qryListTicket",
      "kind": "query",
      "commandRef": "qryListTicket",
      "routeKey": "controleChamados.ticketCatalogue.qryListTicket",
      "purpose": "Listar Chamado",
      "methodName": "loadQryListTicket",
      "handlerName": "handleQryListTicketClick",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.qryListTicket.search",
        "ui.ticketCatalogue.input.qryListTicket.sortBy",
        "ui.ticketCatalogue.input.qryListTicket.sortOrder"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketCatalogue.data.qryListTicket"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.qryListTicket.status"
    },
    {
      "actionId": "cmdCreateTicket",
      "kind": "command",
      "commandRef": "cmdCreateTicket",
      "routeKey": "controleChamados.ticketCatalogue.cmdCreateTicket",
      "purpose": "Criar Chamado",
      "methodName": "cmdCreateTicket",
      "handlerName": "handleCmdCreateTicketClick",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdCreateTicket.title",
        "ui.ticketCatalogue.input.cmdCreateTicket.description",
        "ui.ticketCatalogue.input.cmdCreateTicket.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketCatalogue.output.cmdCreateTicket"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.cmdCreateTicket.status",
      "errorStateKey": "ui.ticketCatalogue.action.cmdCreateTicket.error",
      "feedback": {
        "successMessageKey": "action.cmdCreateTicket.success",
        "errorMessageKey": "action.cmdCreateTicket.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCatalogue.input.cmdCreateTicket.title",
        "ui.ticketCatalogue.input.cmdCreateTicket.description",
        "ui.ticketCatalogue.input.cmdCreateTicket.status"
      ],
      "refreshActionIds": [
        "qryListTicket",
        "qryGetTicket",
        "qryLocateTicket"
      ]
    },
    {
      "actionId": "cmdUpdateTicket",
      "kind": "command",
      "commandRef": "cmdUpdateTicket",
      "routeKey": "controleChamados.ticketCatalogue.cmdUpdateTicket",
      "purpose": "Atualizar Chamado",
      "methodName": "cmdUpdateTicket",
      "handlerName": "handleCmdUpdateTicketClick",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
        "ui.ticketCatalogue.input.cmdUpdateTicket.title",
        "ui.ticketCatalogue.input.cmdUpdateTicket.description",
        "ui.ticketCatalogue.input.cmdUpdateTicket.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId"
      ],
      "outputStateKeys": [
        "ui.ticketCatalogue.output.cmdUpdateTicket"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.cmdUpdateTicket.status",
      "errorStateKey": "ui.ticketCatalogue.action.cmdUpdateTicket.error",
      "feedback": {
        "successMessageKey": "action.cmdUpdateTicket.success",
        "errorMessageKey": "action.cmdUpdateTicket.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
        "ui.ticketCatalogue.input.cmdUpdateTicket.title",
        "ui.ticketCatalogue.input.cmdUpdateTicket.description",
        "ui.ticketCatalogue.input.cmdUpdateTicket.status"
      ],
      "refreshActionIds": [
        "qryListTicket",
        "qryGetTicket",
        "qryLocateTicket"
      ]
    },
    {
      "actionId": "cmdDeleteTicket",
      "kind": "command",
      "commandRef": "cmdDeleteTicket",
      "routeKey": "controleChamados.ticketCatalogue.cmdDeleteTicket",
      "purpose": "Excluir Chamado",
      "methodName": "cmdDeleteTicket",
      "handlerName": "handleCmdDeleteTicketClick",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId"
      ],
      "outputStateKeys": [
        "ui.ticketCatalogue.output.cmdDeleteTicket"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.cmdDeleteTicket.status",
      "errorStateKey": "ui.ticketCatalogue.action.cmdDeleteTicket.error",
      "feedback": {
        "successMessageKey": "action.cmdDeleteTicket.success",
        "errorMessageKey": "action.cmdDeleteTicket.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId"
      ],
      "refreshActionIds": [
        "qryListTicket",
        "qryGetTicket",
        "qryLocateTicket"
      ]
    },
    {
      "actionId": "qryGetTicket",
      "kind": "query",
      "commandRef": "qryGetTicket",
      "routeKey": "controleChamados.ticketCatalogue.qryGetTicket",
      "purpose": "Obter Chamado",
      "methodName": "loadQryGetTicket",
      "handlerName": "handleQryGetTicketClick",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.qryGetTicket.ticketId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCatalogue.input.qryGetTicket.ticketId"
      ],
      "outputStateKeys": [
        "ui.ticketCatalogue.data.qryGetTicket"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.qryGetTicket.status"
    },
    {
      "actionId": "qryLocateTicket",
      "kind": "query",
      "commandRef": "qryLocateTicket",
      "routeKey": "controleChamados.ticketCatalogue.qryLocateTicket",
      "purpose": "Localizar o chamado aberto",
      "methodName": "loadQryLocateTicket",
      "handlerName": "handleQryLocateTicketClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketCatalogue.data.qryLocateTicket"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.qryLocateTicket.status"
    },
    {
      "actionId": "cmdDecideClosure",
      "kind": "command",
      "commandRef": "cmdDecideClosure",
      "routeKey": "controleChamados.ticketCatalogue.cmdDecideClosure",
      "purpose": "Confirmar o fechamento do chamado",
      "methodName": "cmdDecideClosure",
      "handlerName": "handleCmdDecideClosureClick",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdDecideClosure.ticketId",
        "ui.ticketCatalogue.input.cmdDecideClosure.status"
      ],
      "routeParamInputStateKeys": [
        "ui.ticketCatalogue.input.cmdDecideClosure.ticketId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketCatalogue.output.cmdDecideClosure"
      ],
      "statusStateKey": "ui.ticketCatalogue.action.cmdDecideClosure.status",
      "errorStateKey": "ui.ticketCatalogue.action.cmdDecideClosure.error",
      "feedback": {
        "successMessageKey": "action.cmdDecideClosure.success",
        "errorMessageKey": "action.cmdDecideClosure.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCatalogue.input.cmdDecideClosure.status"
      ],
      "refreshActionIds": [
        "qryListTicket",
        "qryGetTicket",
        "qryLocateTicket"
      ]
    },
    {
      "actionId": "set.qryListTicketSearch",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.qryListTicket.search",
      "methodName": "setQryListTicketSearch",
      "handlerName": "handleQryListTicketSearchChange"
    },
    {
      "actionId": "set.qryListTicketSortBy",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.qryListTicket.sortBy",
      "methodName": "setQryListTicketSortBy",
      "handlerName": "handleQryListTicketSortByChange"
    },
    {
      "actionId": "set.qryListTicketSortOrder",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.qryListTicket.sortOrder",
      "methodName": "setQryListTicketSortOrder",
      "handlerName": "handleQryListTicketSortOrderChange"
    },
    {
      "actionId": "set.cmdCreateTicketTitle",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.title",
      "methodName": "setCmdCreateTicketTitle",
      "handlerName": "handleCmdCreateTicketTitleChange"
    },
    {
      "actionId": "set.cmdCreateTicketDescription",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.description",
      "methodName": "setCmdCreateTicketDescription",
      "handlerName": "handleCmdCreateTicketDescriptionChange"
    },
    {
      "actionId": "set.cmdCreateTicketStatus",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.status",
      "methodName": "setCmdCreateTicketStatus",
      "handlerName": "handleCmdCreateTicketStatusChange"
    },
    {
      "actionId": "set.cmdUpdateTicketTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
      "methodName": "setCmdUpdateTicketTicketId",
      "handlerName": "handleCmdUpdateTicketTicketIdChange",
      "prefill": {
        "command": "cmdUpdateTicket",
        "sourceStateKey": "ui.ticketCatalogue.data.qryListTicket",
        "sourceOutputShape": "array",
        "matchField": "ticketId",
        "fields": [
          {
            "itemField": "title",
            "targetStateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.title"
          },
          {
            "itemField": "description",
            "targetStateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.description"
          },
          {
            "itemField": "status",
            "targetStateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.status"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateTicketTitle",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.title",
      "methodName": "setCmdUpdateTicketTitle",
      "handlerName": "handleCmdUpdateTicketTitleChange"
    },
    {
      "actionId": "set.cmdUpdateTicketDescription",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.description",
      "methodName": "setCmdUpdateTicketDescription",
      "handlerName": "handleCmdUpdateTicketDescriptionChange"
    },
    {
      "actionId": "set.cmdUpdateTicketStatus",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.status",
      "methodName": "setCmdUpdateTicketStatus",
      "handlerName": "handleCmdUpdateTicketStatusChange"
    },
    {
      "actionId": "set.cmdDeleteTicketTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId",
      "methodName": "setCmdDeleteTicketTicketId",
      "handlerName": "handleCmdDeleteTicketTicketIdChange"
    },
    {
      "actionId": "set.qryGetTicketTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.qryGetTicket.ticketId",
      "methodName": "setQryGetTicketTicketId",
      "handlerName": "handleQryGetTicketTicketIdChange"
    },
    {
      "actionId": "set.cmdDecideClosureTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdDecideClosure.ticketId",
      "methodName": "setCmdDecideClosureTicketId",
      "handlerName": "handleCmdDecideClosureTicketIdChange",
      "prefill": {
        "command": "cmdDecideClosure",
        "sourceStateKey": "ui.ticketCatalogue.data.qryListTicket",
        "sourceOutputShape": "array",
        "matchField": "ticketId",
        "fields": [
          {
            "itemField": "status",
            "targetStateKey": "ui.ticketCatalogue.input.cmdDecideClosure.status"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdDecideClosureStatus",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCatalogue.input.cmdDecideClosure.status",
      "methodName": "setCmdDecideClosureStatus",
      "handlerName": "handleCmdDecideClosureStatusChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListTicket",
      "preconditions": []
    },
    {
      "value": "detail",
      "kind": "detail",
      "commandName": "qryGetTicket",
      "preconditions": [
        "ui.ticketCatalogue.input.qryGetTicket.ticketId"
      ]
    },
    {
      "value": "createTicket",
      "kind": "command",
      "commandName": "cmdCreateTicket",
      "preconditions": []
    },
    {
      "value": "updateTicket",
      "kind": "command",
      "commandName": "cmdUpdateTicket",
      "preconditions": [
        "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId"
      ]
    },
    {
      "value": "decideClosure",
      "kind": "command",
      "commandName": "cmdDecideClosure",
      "preconditions": [
        "ui.ticketCatalogue.input.cmdDecideClosure.ticketId"
      ]
    }
  ],
  "destructiveCommandIds": [
    "cmdDeleteTicket"
  ],
  "initialLoads": [
    {
      "actionId": "qryListTicket",
      "stateKey": "ui.ticketCatalogue.data.qryListTicket"
    },
    {
      "actionId": "qryLocateTicket",
      "stateKey": "ui.ticketCatalogue.data.qryLocateTicket"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.ticketCatalogue.qryListTicket",
      "source": "bff.qryListTicket",
      "command": "qryListTicket",
      "description": "Listar Chamado",
      "kind": "query",
      "stateKey": "ui.ticketCatalogue.data.qryListTicket",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.qryListTicket.search",
        "ui.ticketCatalogue.input.qryListTicket.sortBy",
        "ui.ticketCatalogue.input.qryListTicket.sortOrder"
      ],
      "inputs": [
        {
          "name": "search",
          "stateKey": "ui.ticketCatalogue.input.qryListTicket.search",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortBy",
          "stateKey": "ui.ticketCatalogue.input.qryListTicket.sortBy",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortOrder",
          "stateKey": "ui.ticketCatalogue.input.qryListTicket.sortOrder",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        }
      ],
      "selection": "single"
    },
    {
      "id": "binding.ticketCatalogue.cmdCreateTicket",
      "source": "bff.cmdCreateTicket",
      "command": "cmdCreateTicket",
      "description": "Criar Chamado",
      "kind": "command",
      "stateKey": "ui.ticketCatalogue.output.cmdCreateTicket",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdCreateTicket.title",
        "ui.ticketCatalogue.input.cmdCreateTicket.description",
        "ui.ticketCatalogue.input.cmdCreateTicket.status"
      ],
      "inputs": [
        {
          "name": "title",
          "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.title",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "description",
          "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.description",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "status",
          "stateKey": "ui.ticketCatalogue.input.cmdCreateTicket.status",
          "source": "systemDefault",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.ticketCatalogue.cmdUpdateTicket",
      "source": "bff.cmdUpdateTicket",
      "command": "cmdUpdateTicket",
      "description": "Atualizar Chamado",
      "kind": "command",
      "stateKey": "ui.ticketCatalogue.output.cmdUpdateTicket",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
        "ui.ticketCatalogue.input.cmdUpdateTicket.title",
        "ui.ticketCatalogue.input.cmdUpdateTicket.description",
        "ui.ticketCatalogue.input.cmdUpdateTicket.status"
      ],
      "inputs": [
        {
          "name": "ticketId",
          "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "title",
          "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.title",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "description",
          "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.description",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "status",
          "stateKey": "ui.ticketCatalogue.input.cmdUpdateTicket.status",
          "source": "systemDefault",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.ticketCatalogue.cmdDeleteTicket",
      "source": "bff.cmdDeleteTicket",
      "command": "cmdDeleteTicket",
      "description": "Excluir Chamado",
      "kind": "command",
      "stateKey": "ui.ticketCatalogue.output.cmdDeleteTicket",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId"
      ],
      "inputs": [
        {
          "name": "ticketId",
          "stateKey": "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none",
      "destructive": true
    },
    {
      "id": "binding.ticketCatalogue.qryGetTicket",
      "source": "bff.qryGetTicket",
      "command": "qryGetTicket",
      "description": "Obter Chamado",
      "kind": "query",
      "stateKey": "ui.ticketCatalogue.data.qryGetTicket",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.qryGetTicket.ticketId"
      ],
      "inputs": [
        {
          "name": "ticketId",
          "stateKey": "ui.ticketCatalogue.input.qryGetTicket.ticketId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.ticketCatalogue.qryLocateTicket",
      "source": "bff.qryLocateTicket",
      "command": "qryLocateTicket",
      "description": "Localizar o chamado aberto",
      "kind": "query",
      "stateKey": "ui.ticketCatalogue.data.qryLocateTicket",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.ticketCatalogue.cmdDecideClosure",
      "source": "bff.cmdDecideClosure",
      "command": "cmdDecideClosure",
      "description": "Confirmar o fechamento do chamado",
      "kind": "command",
      "stateKey": "ui.ticketCatalogue.output.cmdDecideClosure",
      "inputStateKeys": [
        "ui.ticketCatalogue.input.cmdDecideClosure.ticketId",
        "ui.ticketCatalogue.input.cmdDecideClosure.status"
      ],
      "inputs": [
        {
          "name": "ticketId",
          "stateKey": "ui.ticketCatalogue.input.cmdDecideClosure.ticketId",
          "source": "routeParam",
          "required": true,
          "presentation": "route"
        },
        {
          "name": "status",
          "stateKey": "ui.ticketCatalogue.input.cmdDecideClosure.status",
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
    "section.recordList.title": "Localizar chamados",
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
    "organism.qryLocateTicket.title": "Localizar o chamado aberto",
    "intent.qryLocateTicket.list.title": "Localizar o chamado aberto",
    "intent.qryLocateTicket.list.empty": "Nenhum registro encontrado",
    "intent.qryLocateTicket.list.column.ticketId.label": "Identificador do chamado",
    "intent.qryLocateTicket.list.column.title.label": "Título",
    "intent.qryLocateTicket.list.column.description.label": "Descrição",
    "intent.qryLocateTicket.list.column.status.label": "Status",
    "organism.cmdDeleteTicket.title": "Excluir Chamado",
    "intent.cmdDeleteTicket.form.title": "Excluir Chamado",
    "intent.cmdDeleteTicket.form.action.cmdDeleteTicket": "Excluir Chamado",
    "organism.qryGetTicket.title": "Obter Chamado",
    "intent.qryGetTicket.list.title": "Obter Chamado",
    "intent.qryGetTicket.list.empty": "Nenhum registro encontrado",
    "intent.qryGetTicket.list.column.ticketId.label": "Identificador do chamado",
    "intent.qryGetTicket.list.column.title.label": "Título",
    "intent.qryGetTicket.list.column.description.label": "Descrição",
    "intent.qryGetTicket.list.column.status.label": "Status",
    "section.recordForm.title": "Criar ou corrigir chamado",
    "organism.cmdCreateTicket.title": "Criar Chamado",
    "intent.cmdCreateTicket.form.title": "Criar Chamado",
    "intent.cmdCreateTicket.form.action.cmdCreateTicket": "Criar Chamado",
    "intent.cmdCreateTicket.form.field.title.label": "Título",
    "intent.cmdCreateTicket.form.field.description.label": "Descrição",
    "intent.cmdCreateTicket.form.field.status.label": "Status",
    "organism.cmdUpdateTicket.title": "Atualizar Chamado",
    "intent.cmdUpdateTicket.form.title": "Atualizar Chamado",
    "intent.cmdUpdateTicket.form.action.cmdUpdateTicket": "Atualizar Chamado",
    "intent.cmdUpdateTicket.form.field.title.label": "Título",
    "intent.cmdUpdateTicket.form.field.description.label": "Descrição",
    "intent.cmdUpdateTicket.form.field.status.label": "Status",
    "section.decideClosure.title": "Decidir fechamento",
    "organism.cmdDecideClosure.title": "Confirmar o fechamento do chamado",
    "intent.cmdDecideClosure.form.title": "Confirmar o fechamento do chamado",
    "intent.cmdDecideClosure.form.action.cmdDecideClosure": "Confirmar o fechamento do chamado",
    "intent.cmdDecideClosure.form.field.status.label": "Status",
    "action.cmdCreateTicket.success": "Criar Chamado: OK",
    "action.cmdCreateTicket.error": "Criar Chamado: falhou",
    "action.cmdUpdateTicket.success": "Atualizar Chamado: OK",
    "action.cmdUpdateTicket.error": "Atualizar Chamado: falhou",
    "action.cmdDeleteTicket.success": "Excluir Chamado: OK",
    "action.cmdDeleteTicket.error": "Excluir Chamado: falhou",
    "action.cmdDecideClosure.success": "Confirmar o fechamento do chamado: OK",
    "action.cmdDecideClosure.error": "Confirmar o fechamento do chamado: falhou"
  },
  "automation": {
    "statePrefix": "ui.ticketCatalogue",
    "stateKeys": [
      "ui.ticketCatalogue.status",
      "ui.ticketCatalogue.scenary",
      "ui.ticketCatalogue.action.qryListTicket.status",
      "ui.ticketCatalogue.input.qryListTicket.search",
      "ui.ticketCatalogue.input.qryListTicket.sortBy",
      "ui.ticketCatalogue.input.qryListTicket.sortOrder",
      "ui.ticketCatalogue.data.qryListTicket",
      "ui.ticketCatalogue.action.cmdCreateTicket.status",
      "ui.ticketCatalogue.input.cmdCreateTicket.title",
      "ui.ticketCatalogue.input.cmdCreateTicket.description",
      "ui.ticketCatalogue.input.cmdCreateTicket.status",
      "ui.ticketCatalogue.output.cmdCreateTicket",
      "ui.ticketCatalogue.action.cmdCreateTicket.error",
      "ui.ticketCatalogue.action.cmdUpdateTicket.status",
      "ui.ticketCatalogue.input.cmdUpdateTicket.ticketId",
      "ui.ticketCatalogue.input.cmdUpdateTicket.title",
      "ui.ticketCatalogue.input.cmdUpdateTicket.description",
      "ui.ticketCatalogue.input.cmdUpdateTicket.status",
      "ui.ticketCatalogue.output.cmdUpdateTicket",
      "ui.ticketCatalogue.action.cmdUpdateTicket.error",
      "ui.ticketCatalogue.action.cmdDeleteTicket.status",
      "ui.ticketCatalogue.input.cmdDeleteTicket.ticketId",
      "ui.ticketCatalogue.output.cmdDeleteTicket",
      "ui.ticketCatalogue.action.cmdDeleteTicket.error",
      "ui.ticketCatalogue.action.qryGetTicket.status",
      "ui.ticketCatalogue.input.qryGetTicket.ticketId",
      "ui.ticketCatalogue.data.qryGetTicket",
      "ui.ticketCatalogue.action.qryLocateTicket.status",
      "ui.ticketCatalogue.data.qryLocateTicket",
      "ui.ticketCatalogue.action.cmdDecideClosure.status",
      "ui.ticketCatalogue.input.cmdDecideClosure.ticketId",
      "ui.ticketCatalogue.input.cmdDecideClosure.status",
      "ui.ticketCatalogue.output.cmdDecideClosure",
      "ui.ticketCatalogue.action.cmdDecideClosure.error"
    ],
    "actionIds": [
      "qryListTicket",
      "cmdCreateTicket",
      "cmdUpdateTicket",
      "cmdDeleteTicket",
      "qryGetTicket",
      "qryLocateTicket",
      "cmdDecideClosure",
      "set.qryListTicketSearch",
      "set.qryListTicketSortBy",
      "set.qryListTicketSortOrder",
      "set.cmdCreateTicketTitle",
      "set.cmdCreateTicketDescription",
      "set.cmdCreateTicketStatus",
      "set.cmdUpdateTicketTicketId",
      "set.cmdUpdateTicketTitle",
      "set.cmdUpdateTicketDescription",
      "set.cmdUpdateTicketStatus",
      "set.cmdDeleteTicketTicketId",
      "set.qryGetTicketTicketId",
      "set.cmdDecideClosureTicketId",
      "set.cmdDecideClosureStatus"
    ]
  }
};

export const pipeline = [
  {
    "id": "ticketCatalogue__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102047_/l2/controleChamados/web/shared/ticketCatalogue.ts",
    "defPath": "_102047_/l2/controleChamados/web/shared/ticketCatalogue.defs.ts",
    "dependsFiles": [
      "_102047_/l2/controleChamados/web/contracts/ticketCatalogue.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanReceiveComment",
      "onlyOpenTicketCanBeClosed",
      "closedTicketCannotBeReopened"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
