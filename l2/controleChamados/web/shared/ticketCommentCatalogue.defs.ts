/// <mls fileReference="_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "ticketCommentCatalogue",
  "pageName": "Comentário do chamado",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosTicketCommentCatalogueBase",
  "routePattern": "/controleChamados/ticketCommentCatalogue",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:ticketCommentCatalogue",
    "contract:controleChamados.ticketCommentCatalogue.qryListTicketComment",
    "contract:controleChamados.ticketCommentCatalogue.cmdCreateTicketComment",
    "contract:controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment",
    "contract:controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment",
    "contract:controleChamados.ticketCommentCatalogue.qryGetTicketComment",
    "contract:controleChamados.ticketCommentCatalogue.qryTicketPicker"
  ],
  "operationIds": [
    "createTicketComment",
    "deleteTicketComment",
    "getTicketComment",
    "listTicket",
    "listTicketComment",
    "updateTicketComment"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "ticketCommentCatalogue",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "TicketComment",
    "owners": [
      {
        "kind": "operation",
        "id": "createTicketComment",
        "defPath": "_102047_/l4/controleChamados/operations/createTicketComment.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deleteTicketComment",
        "defPath": "_102047_/l4/controleChamados/operations/deleteTicketComment.defs.ts"
      },
      {
        "kind": "operation",
        "id": "getTicketComment",
        "defPath": "_102047_/l4/controleChamados/operations/getTicketComment.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listTicket",
        "defPath": "_102047_/l4/controleChamados/operations/listTicket.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listTicketComment",
        "defPath": "_102047_/l4/controleChamados/operations/listTicketComment.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateTicketComment",
        "defPath": "_102047_/l4/controleChamados/operations/updateTicketComment.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "createTicketComment",
          "commandName": "cmdCreateTicketComment",
          "steps": [
            "Informar os dados do novo registro."
          ]
        },
        {
          "operationId": "deleteTicketComment",
          "commandName": "cmdDeleteTicketComment",
          "steps": [
            "Remover o registro escolhido."
          ]
        },
        {
          "operationId": "getTicketComment",
          "commandName": "qryGetTicketComment",
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
          "operationId": "listTicketComment",
          "commandName": "qryListTicketComment",
          "steps": [
            "Encontrar o registro."
          ]
        },
        {
          "operationId": "updateTicketComment",
          "commandName": "cmdUpdateTicketComment",
          "steps": [
            "Corrigir os dados do registro escolhido."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.ts",
    "contracts": [
      {
        "commandName": "qryListTicketComment",
        "routeConst": "qryListTicketCommentRoute"
      },
      {
        "commandName": "cmdCreateTicketComment",
        "routeConst": "cmdCreateTicketCommentRoute"
      },
      {
        "commandName": "cmdUpdateTicketComment",
        "routeConst": "cmdUpdateTicketCommentRoute"
      },
      {
        "commandName": "cmdDeleteTicketComment",
        "routeConst": "cmdDeleteTicketCommentRoute"
      },
      {
        "commandName": "qryGetTicketComment",
        "routeConst": "qryGetTicketCommentRoute"
      },
      {
        "commandName": "qryTicketPicker",
        "routeConst": "qryTicketPickerRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102047_/l2/controleChamados/web/desktop/page11/ticketCommentCatalogue.defs.ts",
    "layoutId": "ticketCommentCatalogue-pos-workspace"
  },
  "states": [
    {
      "stateKey": "ui.ticketCommentCatalogue.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "detail",
        "createTicketComment",
        "updateTicketComment"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.qryListTicketComment.status",
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
      "stateKey": "ui.ticketCommentCatalogue.data.qryListTicketComment",
      "name": "qryListTicketCommentData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListTicketComment",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status",
      "name": "cmdCreateTicketCommentState",
      "kind": "actionStatus",
      "actionRef": "cmdCreateTicketComment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
      "name": "cmdCreateTicketCommentTicketId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdCreateTicketComment",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText",
      "name": "cmdCreateTicketCommentCommentText",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateTicketComment",
        "direction": "input",
        "field": "commentText"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.output.cmdCreateTicketComment",
      "name": "cmdCreateTicketCommentOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCreateTicketComment",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error",
      "name": "cmdCreateTicketCommentError",
      "kind": "actionError",
      "actionRef": "cmdCreateTicketComment",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status",
      "name": "cmdUpdateTicketCommentState",
      "kind": "actionStatus",
      "actionRef": "cmdUpdateTicketComment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
      "name": "cmdUpdateTicketCommentTicketCommentId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateTicketComment",
        "direction": "input",
        "field": "ticketCommentId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
      "name": "cmdUpdateTicketCommentTicketId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateTicketComment",
        "direction": "input",
        "field": "ticketId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText",
      "name": "cmdUpdateTicketCommentCommentText",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateTicketComment",
        "direction": "input",
        "field": "commentText"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.output.cmdUpdateTicketComment",
      "name": "cmdUpdateTicketCommentOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdUpdateTicketComment",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error",
      "name": "cmdUpdateTicketCommentError",
      "kind": "actionError",
      "actionRef": "cmdUpdateTicketComment",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status",
      "name": "cmdDeleteTicketCommentState",
      "kind": "actionStatus",
      "actionRef": "cmdDeleteTicketComment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId",
      "name": "cmdDeleteTicketCommentTicketCommentId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdDeleteTicketComment",
        "direction": "input",
        "field": "ticketCommentId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.output.cmdDeleteTicketComment",
      "name": "cmdDeleteTicketCommentOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdDeleteTicketComment",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error",
      "name": "cmdDeleteTicketCommentError",
      "kind": "actionError",
      "actionRef": "cmdDeleteTicketComment",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.qryGetTicketComment.status",
      "name": "qryGetTicketCommentState",
      "kind": "actionStatus",
      "actionRef": "qryGetTicketComment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId",
      "name": "qryGetTicketCommentTicketCommentId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "qryGetTicketComment",
        "direction": "input",
        "field": "ticketCommentId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.data.qryGetTicketComment",
      "name": "qryGetTicketCommentData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryGetTicketComment",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.action.qryTicketPicker.status",
      "name": "qryTicketPickerState",
      "kind": "actionStatus",
      "actionRef": "qryTicketPicker",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.search",
      "name": "qryTicketPickerSearch",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryTicketPicker",
        "direction": "input",
        "field": "search"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy",
      "name": "qryTicketPickerSortBy",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryTicketPicker",
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
      "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder",
      "name": "qryTicketPickerSortOrder",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryTicketPicker",
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
      "stateKey": "ui.ticketCommentCatalogue.data.qryTicketPicker",
      "name": "qryTicketPickerData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryTicketPicker",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    }
  ],
  "actions": [
    {
      "actionId": "qryListTicketComment",
      "kind": "query",
      "commandRef": "qryListTicketComment",
      "routeKey": "controleChamados.ticketCommentCatalogue.qryListTicketComment",
      "purpose": "Listar Comentário do chamado",
      "methodName": "loadQryListTicketComment",
      "handlerName": "handleQryListTicketCommentClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketCommentCatalogue.data.qryListTicketComment"
      ],
      "statusStateKey": "ui.ticketCommentCatalogue.action.qryListTicketComment.status"
    },
    {
      "actionId": "cmdCreateTicketComment",
      "kind": "command",
      "commandRef": "cmdCreateTicketComment",
      "routeKey": "controleChamados.ticketCommentCatalogue.cmdCreateTicketComment",
      "purpose": "Criar Comentário do chamado",
      "methodName": "cmdCreateTicketComment",
      "handlerName": "handleCmdCreateTicketCommentClick",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId"
      ],
      "outputStateKeys": [
        "ui.ticketCommentCatalogue.output.cmdCreateTicketComment"
      ],
      "statusStateKey": "ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status",
      "errorStateKey": "ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error",
      "feedback": {
        "successMessageKey": "action.cmdCreateTicketComment.success",
        "errorMessageKey": "action.cmdCreateTicketComment.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText"
      ],
      "refreshActionIds": [
        "qryListTicketComment",
        "qryGetTicketComment",
        "qryTicketPicker"
      ]
    },
    {
      "actionId": "cmdUpdateTicketComment",
      "kind": "command",
      "commandRef": "cmdUpdateTicketComment",
      "routeKey": "controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment",
      "purpose": "Atualizar Comentário do chamado",
      "methodName": "cmdUpdateTicketComment",
      "handlerName": "handleCmdUpdateTicketCommentClick",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId"
      ],
      "outputStateKeys": [
        "ui.ticketCommentCatalogue.output.cmdUpdateTicketComment"
      ],
      "statusStateKey": "ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status",
      "errorStateKey": "ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error",
      "feedback": {
        "successMessageKey": "action.cmdUpdateTicketComment.success",
        "errorMessageKey": "action.cmdUpdateTicketComment.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText"
      ],
      "refreshActionIds": [
        "qryListTicketComment",
        "qryGetTicketComment",
        "qryTicketPicker"
      ]
    },
    {
      "actionId": "cmdDeleteTicketComment",
      "kind": "command",
      "commandRef": "cmdDeleteTicketComment",
      "routeKey": "controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment",
      "purpose": "Excluir Comentário do chamado",
      "methodName": "cmdDeleteTicketComment",
      "handlerName": "handleCmdDeleteTicketCommentClick",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId"
      ],
      "outputStateKeys": [
        "ui.ticketCommentCatalogue.output.cmdDeleteTicketComment"
      ],
      "statusStateKey": "ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status",
      "errorStateKey": "ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error",
      "feedback": {
        "successMessageKey": "action.cmdDeleteTicketComment.success",
        "errorMessageKey": "action.cmdDeleteTicketComment.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId"
      ],
      "refreshActionIds": [
        "qryListTicketComment",
        "qryGetTicketComment",
        "qryTicketPicker"
      ]
    },
    {
      "actionId": "qryGetTicketComment",
      "kind": "query",
      "commandRef": "qryGetTicketComment",
      "routeKey": "controleChamados.ticketCommentCatalogue.qryGetTicketComment",
      "purpose": "Obter Comentário do chamado",
      "methodName": "loadQryGetTicketComment",
      "handlerName": "handleQryGetTicketCommentClick",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId"
      ],
      "outputStateKeys": [
        "ui.ticketCommentCatalogue.data.qryGetTicketComment"
      ],
      "statusStateKey": "ui.ticketCommentCatalogue.action.qryGetTicketComment.status"
    },
    {
      "actionId": "qryTicketPicker",
      "kind": "query",
      "commandRef": "qryTicketPicker",
      "routeKey": "controleChamados.ticketCommentCatalogue.qryTicketPicker",
      "purpose": "Listar Chamado",
      "methodName": "loadQryTicketPicker",
      "handlerName": "handleQryTicketPickerClick",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.qryTicketPicker.search",
        "ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy",
        "ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.ticketCommentCatalogue.data.qryTicketPicker"
      ],
      "statusStateKey": "ui.ticketCommentCatalogue.action.qryTicketPicker.status"
    },
    {
      "actionId": "set.cmdCreateTicketCommentTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
      "methodName": "setCmdCreateTicketCommentTicketId",
      "handlerName": "handleCmdCreateTicketCommentTicketIdChange",
      "prefill": {
        "command": "cmdCreateTicketComment",
        "sourceStateKey": "ui.ticketCommentCatalogue.data.qryListTicketComment",
        "sourceOutputShape": "array",
        "matchField": "ticketId",
        "fields": [
          {
            "itemField": "commentText",
            "targetStateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdCreateTicketCommentCommentText",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText",
      "methodName": "setCmdCreateTicketCommentCommentText",
      "handlerName": "handleCmdCreateTicketCommentCommentTextChange"
    },
    {
      "actionId": "set.cmdUpdateTicketCommentTicketCommentId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
      "methodName": "setCmdUpdateTicketCommentTicketCommentId",
      "handlerName": "handleCmdUpdateTicketCommentTicketCommentIdChange",
      "prefill": {
        "command": "cmdUpdateTicketComment",
        "sourceStateKey": "ui.ticketCommentCatalogue.data.qryListTicketComment",
        "sourceOutputShape": "array",
        "matchField": "ticketCommentId",
        "fields": [
          {
            "itemField": "commentText",
            "targetStateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateTicketCommentTicketId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
      "methodName": "setCmdUpdateTicketCommentTicketId",
      "handlerName": "handleCmdUpdateTicketCommentTicketIdChange",
      "prefill": {
        "command": "cmdUpdateTicketComment",
        "sourceStateKey": "ui.ticketCommentCatalogue.data.qryListTicketComment",
        "sourceOutputShape": "array",
        "matchField": "ticketId",
        "fields": [
          {
            "itemField": "commentText",
            "targetStateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateTicketCommentCommentText",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText",
      "methodName": "setCmdUpdateTicketCommentCommentText",
      "handlerName": "handleCmdUpdateTicketCommentCommentTextChange"
    },
    {
      "actionId": "set.cmdDeleteTicketCommentTicketCommentId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId",
      "methodName": "setCmdDeleteTicketCommentTicketCommentId",
      "handlerName": "handleCmdDeleteTicketCommentTicketCommentIdChange"
    },
    {
      "actionId": "set.qryGetTicketCommentTicketCommentId",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId",
      "methodName": "setQryGetTicketCommentTicketCommentId",
      "handlerName": "handleQryGetTicketCommentTicketCommentIdChange"
    },
    {
      "actionId": "set.qryTicketPickerSearch",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.search",
      "methodName": "setQryTicketPickerSearch",
      "handlerName": "handleQryTicketPickerSearchChange"
    },
    {
      "actionId": "set.qryTicketPickerSortBy",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy",
      "methodName": "setQryTicketPickerSortBy",
      "handlerName": "handleQryTicketPickerSortByChange"
    },
    {
      "actionId": "set.qryTicketPickerSortOrder",
      "kind": "stateSetter",
      "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder",
      "methodName": "setQryTicketPickerSortOrder",
      "handlerName": "handleQryTicketPickerSortOrderChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListTicketComment",
      "preconditions": []
    },
    {
      "value": "detail",
      "kind": "detail",
      "commandName": "qryGetTicketComment",
      "preconditions": [
        "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId"
      ]
    },
    {
      "value": "createTicketComment",
      "kind": "command",
      "commandName": "cmdCreateTicketComment",
      "preconditions": [
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId"
      ]
    },
    {
      "value": "updateTicketComment",
      "kind": "command",
      "commandName": "cmdUpdateTicketComment",
      "preconditions": [
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId"
      ]
    }
  ],
  "destructiveCommandIds": [
    "cmdDeleteTicketComment"
  ],
  "initialLoads": [
    {
      "actionId": "qryListTicketComment",
      "stateKey": "ui.ticketCommentCatalogue.data.qryListTicketComment"
    },
    {
      "actionId": "qryTicketPicker",
      "stateKey": "ui.ticketCommentCatalogue.data.qryTicketPicker"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.ticketCommentCatalogue.qryListTicketComment",
      "source": "bff.qryListTicketComment",
      "command": "qryListTicketComment",
      "description": "Listar Comentário do chamado",
      "kind": "query",
      "stateKey": "ui.ticketCommentCatalogue.data.qryListTicketComment",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.ticketCommentCatalogue.cmdCreateTicketComment",
      "source": "bff.cmdCreateTicketComment",
      "command": "cmdCreateTicketComment",
      "description": "Criar Comentário do chamado",
      "kind": "command",
      "stateKey": "ui.ticketCommentCatalogue.output.cmdCreateTicketComment",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
        "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText"
      ],
      "inputs": [
        {
          "name": "ticketId",
          "stateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "commentText",
          "stateKey": "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.ticketCommentCatalogue.cmdUpdateTicketComment",
      "source": "bff.cmdUpdateTicketComment",
      "command": "cmdUpdateTicketComment",
      "description": "Atualizar Comentário do chamado",
      "kind": "command",
      "stateKey": "ui.ticketCommentCatalogue.output.cmdUpdateTicketComment",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
        "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText"
      ],
      "inputs": [
        {
          "name": "ticketCommentId",
          "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "ticketId",
          "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "commentText",
          "stateKey": "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.ticketCommentCatalogue.cmdDeleteTicketComment",
      "source": "bff.cmdDeleteTicketComment",
      "command": "cmdDeleteTicketComment",
      "description": "Excluir Comentário do chamado",
      "kind": "command",
      "stateKey": "ui.ticketCommentCatalogue.output.cmdDeleteTicketComment",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId"
      ],
      "inputs": [
        {
          "name": "ticketCommentId",
          "stateKey": "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none",
      "destructive": true
    },
    {
      "id": "binding.ticketCommentCatalogue.qryGetTicketComment",
      "source": "bff.qryGetTicketComment",
      "command": "qryGetTicketComment",
      "description": "Obter Comentário do chamado",
      "kind": "query",
      "stateKey": "ui.ticketCommentCatalogue.data.qryGetTicketComment",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId"
      ],
      "inputs": [
        {
          "name": "ticketCommentId",
          "stateKey": "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.ticketCommentCatalogue.qryTicketPicker",
      "source": "bff.qryTicketPicker",
      "command": "qryTicketPicker",
      "description": "Listar Chamado",
      "kind": "query",
      "stateKey": "ui.ticketCommentCatalogue.data.qryTicketPicker",
      "inputStateKeys": [
        "ui.ticketCommentCatalogue.input.qryTicketPicker.search",
        "ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy",
        "ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder"
      ],
      "inputs": [
        {
          "name": "search",
          "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.search",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortBy",
          "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortOrder",
          "stateKey": "ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        }
      ],
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
    "section.recordList.title": "Comentários do chamado",
    "organism.qryListTicketComment.title": "Listar Comentário do chamado",
    "intent.qryListTicketComment.list.title": "Listar Comentário do chamado",
    "intent.qryListTicketComment.list.empty": "Nenhum registro encontrado",
    "intent.qryListTicketComment.list.column.ticketCommentId.label": "Identificador do comentário",
    "intent.qryListTicketComment.list.column.ticketId.label": "Chamado",
    "intent.qryListTicketComment.list.column.commentText.label": "Comentário",
    "organism.qryGetTicketComment.title": "Obter Comentário do chamado",
    "intent.qryGetTicketComment.list.title": "Obter Comentário do chamado",
    "intent.qryGetTicketComment.list.empty": "Nenhum registro encontrado",
    "intent.qryGetTicketComment.list.column.ticketCommentId.label": "Identificador do comentário",
    "intent.qryGetTicketComment.list.column.ticketId.label": "Chamado",
    "intent.qryGetTicketComment.list.column.commentText.label": "Comentário",
    "organism.cmdDeleteTicketComment.title": "Excluir Comentário do chamado",
    "intent.cmdDeleteTicketComment.form.title": "Excluir Comentário do chamado",
    "intent.cmdDeleteTicketComment.form.action.cmdDeleteTicketComment": "Excluir Comentário do chamado",
    "section.recordForm.title": "Comentário",
    "organism.cmdCreateTicketComment.title": "Criar Comentário do chamado",
    "intent.cmdCreateTicketComment.form.title": "Criar Comentário do chamado",
    "intent.cmdCreateTicketComment.form.action.cmdCreateTicketComment": "Criar Comentário do chamado",
    "intent.cmdCreateTicketComment.form.field.commentText.label": "Comentário",
    "organism.cmdUpdateTicketComment.title": "Atualizar Comentário do chamado",
    "intent.cmdUpdateTicketComment.form.title": "Atualizar Comentário do chamado",
    "intent.cmdUpdateTicketComment.form.action.cmdUpdateTicketComment": "Atualizar Comentário do chamado",
    "intent.cmdUpdateTicketComment.form.field.commentText.label": "Comentário",
    "organism.qryTicketPicker.title": "Listar Chamado",
    "intent.qryTicketPicker.list.title": "Listar Chamado",
    "intent.qryTicketPicker.list.empty": "Nenhum registro encontrado",
    "intent.qryTicketPicker.list.column.ticketId.label": "Chamado",
    "intent.qryTicketPicker.list.column.title.label": "Título",
    "intent.qryTicketPicker.list.column.description.label": "Descrição",
    "intent.qryTicketPicker.list.column.status.label": "Status",
    "intent.qryTicketPicker.list.filter.search.label": "Search",
    "intent.qryTicketPicker.list.filter.sortBy.label": "Sort By",
    "intent.qryTicketPicker.list.filter.sortOrder.label": "Sort Order",
    "action.cmdCreateTicketComment.success": "Criar Comentário do chamado: OK",
    "action.cmdCreateTicketComment.error": "Criar Comentário do chamado: falhou",
    "action.cmdUpdateTicketComment.success": "Atualizar Comentário do chamado: OK",
    "action.cmdUpdateTicketComment.error": "Atualizar Comentário do chamado: falhou",
    "action.cmdDeleteTicketComment.success": "Excluir Comentário do chamado: OK",
    "action.cmdDeleteTicketComment.error": "Excluir Comentário do chamado: falhou",
    "section.commentWorkspace.title": "Comentários do chamado",
    "section.commentCreation.title": "Novo comentário"
  },
  "automation": {
    "statePrefix": "ui.ticketCommentCatalogue",
    "stateKeys": [
      "ui.ticketCommentCatalogue.status",
      "ui.ticketCommentCatalogue.scenary",
      "ui.ticketCommentCatalogue.action.qryListTicketComment.status",
      "ui.ticketCommentCatalogue.data.qryListTicketComment",
      "ui.ticketCommentCatalogue.action.cmdCreateTicketComment.status",
      "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.ticketId",
      "ui.ticketCommentCatalogue.input.cmdCreateTicketComment.commentText",
      "ui.ticketCommentCatalogue.output.cmdCreateTicketComment",
      "ui.ticketCommentCatalogue.action.cmdCreateTicketComment.error",
      "ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.status",
      "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketCommentId",
      "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.ticketId",
      "ui.ticketCommentCatalogue.input.cmdUpdateTicketComment.commentText",
      "ui.ticketCommentCatalogue.output.cmdUpdateTicketComment",
      "ui.ticketCommentCatalogue.action.cmdUpdateTicketComment.error",
      "ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.status",
      "ui.ticketCommentCatalogue.input.cmdDeleteTicketComment.ticketCommentId",
      "ui.ticketCommentCatalogue.output.cmdDeleteTicketComment",
      "ui.ticketCommentCatalogue.action.cmdDeleteTicketComment.error",
      "ui.ticketCommentCatalogue.action.qryGetTicketComment.status",
      "ui.ticketCommentCatalogue.input.qryGetTicketComment.ticketCommentId",
      "ui.ticketCommentCatalogue.data.qryGetTicketComment",
      "ui.ticketCommentCatalogue.action.qryTicketPicker.status",
      "ui.ticketCommentCatalogue.input.qryTicketPicker.search",
      "ui.ticketCommentCatalogue.input.qryTicketPicker.sortBy",
      "ui.ticketCommentCatalogue.input.qryTicketPicker.sortOrder",
      "ui.ticketCommentCatalogue.data.qryTicketPicker"
    ],
    "actionIds": [
      "qryListTicketComment",
      "cmdCreateTicketComment",
      "cmdUpdateTicketComment",
      "cmdDeleteTicketComment",
      "qryGetTicketComment",
      "qryTicketPicker",
      "set.cmdCreateTicketCommentTicketId",
      "set.cmdCreateTicketCommentCommentText",
      "set.cmdUpdateTicketCommentTicketCommentId",
      "set.cmdUpdateTicketCommentTicketId",
      "set.cmdUpdateTicketCommentCommentText",
      "set.cmdDeleteTicketCommentTicketCommentId",
      "set.qryGetTicketCommentTicketCommentId",
      "set.qryTicketPickerSearch",
      "set.qryTicketPickerSortBy",
      "set.qryTicketPickerSortOrder"
    ]
  }
};

export const pipeline = [
  {
    "id": "ticketCommentCatalogue__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.ts",
    "defPath": "_102047_/l2/controleChamados/web/shared/ticketCommentCatalogue.defs.ts",
    "dependsFiles": [
      "_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.ts",
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
