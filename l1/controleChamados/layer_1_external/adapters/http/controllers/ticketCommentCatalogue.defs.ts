/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCommentCatalogue.defs.ts" enhancement="_blank"/>

export const ticketCommentCatalogueController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "ticketCommentCatalogue",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "ticketCommentCatalogue",
    "controllerName": "TicketCommentCatalogueController",
    "ownerKind": "workspace",
    "workspaceId": "ticketCommentCatalogue",
    "actors": [
      "atendente"
    ],
    "allowedScopes": [
      "internal"
    ],
    "handlers": [
      {
        "handlerName": "ticketCommentCatalogueQryListTicketCommentHandler",
        "command": "qryListTicketComment",
        "bffId": "qryListTicketComment",
        "route": "controleChamados.ticketCommentCatalogue.qryListTicketComment",
        "kind": "query",
        "usecaseRef": "listTicketComment",
        "usecaseRefs": [
          "listTicketComment"
        ],
        "inputTypeName": "ListTicketCommentInput",
        "inputContract": [],
        "projection": {
          "kind": "list",
          "arrayFieldName": null,
          "itemFields": [
            {
              "name": "ticketCommentId",
              "operationId": "listTicketComment",
              "path": [
                "ticketCommentId"
              ],
              "fromItems": true
            },
            {
              "name": "ticketId",
              "operationId": "listTicketComment",
              "path": [
                "ticketId"
              ],
              "fromItems": true
            },
            {
              "name": "commentText",
              "operationId": "listTicketComment",
              "path": [
                "commentText"
              ],
              "fromItems": true
            }
          ],
          "topFields": []
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCommentCatalogueCmdCreateTicketCommentHandler",
        "command": "cmdCreateTicketComment",
        "bffId": "cmdCreateTicketComment",
        "route": "controleChamados.ticketCommentCatalogue.cmdCreateTicketComment",
        "kind": "command",
        "usecaseRef": "createTicketComment",
        "usecaseRefs": [
          "createTicketComment"
        ],
        "inputTypeName": "CreateTicketCommentInput",
        "inputContract": [
          {
            "inputId": "ticketId",
            "fieldRef": "TicketComment.ticketId",
            "required": true,
            "source": "selectedEntity",
            "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido."
          },
          {
            "inputId": "commentText",
            "fieldRef": "TicketComment.commentText",
            "required": true,
            "source": "userInput",
            "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado."
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketCommentId",
              "operationId": "createTicketComment",
              "path": [
                "ticketCommentId"
              ],
              "fromItems": false
            },
            {
              "name": "ticketId",
              "operationId": "createTicketComment",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "commentText",
              "operationId": "createTicketComment",
              "path": [
                "commentText"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCommentCatalogueCmdUpdateTicketCommentHandler",
        "command": "cmdUpdateTicketComment",
        "bffId": "cmdUpdateTicketComment",
        "route": "controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment",
        "kind": "command",
        "usecaseRef": "updateTicketComment",
        "usecaseRefs": [
          "updateTicketComment"
        ],
        "inputTypeName": "UpdateTicketCommentInput",
        "inputContract": [
          {
            "inputId": "ticketCommentId",
            "fieldRef": "TicketComment.ticketCommentId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado."
          },
          {
            "inputId": "ticketId",
            "fieldRef": "TicketComment.ticketId",
            "required": true,
            "source": "selectedEntity",
            "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido."
          },
          {
            "inputId": "commentText",
            "fieldRef": "TicketComment.commentText",
            "required": true,
            "source": "userInput",
            "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado."
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketCommentId",
              "operationId": "updateTicketComment",
              "path": [
                "ticketCommentId"
              ],
              "fromItems": false
            },
            {
              "name": "ticketId",
              "operationId": "updateTicketComment",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "commentText",
              "operationId": "updateTicketComment",
              "path": [
                "commentText"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCommentCatalogueCmdDeleteTicketCommentHandler",
        "command": "cmdDeleteTicketComment",
        "bffId": "cmdDeleteTicketComment",
        "route": "controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment",
        "kind": "command",
        "usecaseRef": "deleteTicketComment",
        "usecaseRefs": [
          "deleteTicketComment"
        ],
        "inputTypeName": "DeleteTicketCommentInput",
        "inputContract": [
          {
            "inputId": "ticketCommentId",
            "fieldRef": "TicketComment.ticketCommentId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado."
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketCommentId",
              "operationId": "deleteTicketComment",
              "path": [
                "ticketCommentId"
              ],
              "fromItems": false
            },
            {
              "name": "ticketId",
              "operationId": "deleteTicketComment",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "commentText",
              "operationId": "deleteTicketComment",
              "path": [
                "commentText"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCommentCatalogueQryGetTicketCommentHandler",
        "command": "qryGetTicketComment",
        "bffId": "qryGetTicketComment",
        "route": "controleChamados.ticketCommentCatalogue.qryGetTicketComment",
        "kind": "query",
        "usecaseRef": "getTicketComment",
        "usecaseRefs": [
          "getTicketComment"
        ],
        "inputTypeName": "GetTicketCommentInput",
        "inputContract": [
          {
            "inputId": "ticketCommentId",
            "fieldRef": "TicketComment.ticketCommentId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado."
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketCommentId",
              "operationId": "getTicketComment",
              "path": [
                "ticketCommentId"
              ],
              "fromItems": false
            },
            {
              "name": "ticketId",
              "operationId": "getTicketComment",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "commentText",
              "operationId": "getTicketComment",
              "path": [
                "commentText"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCommentCatalogueQryTicketPickerHandler",
        "command": "qryTicketPicker",
        "bffId": "qryTicketPicker",
        "route": "controleChamados.ticketCommentCatalogue.qryTicketPicker",
        "kind": "query",
        "usecaseRef": "listTicket",
        "usecaseRefs": [
          "listTicket"
        ],
        "inputTypeName": "ListTicketInput",
        "inputContract": [
          {
            "inputId": "search",
            "fieldRef": "Ticket.title",
            "required": false,
            "source": "userInput",
            "description": "Buscar por Título."
          },
          {
            "inputId": "sortBy",
            "fieldRef": "Ticket.status",
            "required": false,
            "source": "userInput",
            "description": "Campo de ordenação da listagem.",
            "enumValues": [
              "status"
            ]
          },
          {
            "inputId": "sortOrder",
            "fieldRef": "Ticket.status",
            "required": false,
            "source": "userInput",
            "description": "Direção da ordenação.",
            "enumValues": [
              "asc",
              "desc"
            ]
          }
        ],
        "projection": {
          "kind": "list",
          "arrayFieldName": null,
          "itemFields": [
            {
              "name": "ticketId",
              "operationId": "listTicket",
              "path": [
                "ticketId"
              ],
              "fromItems": true
            },
            {
              "name": "title",
              "operationId": "listTicket",
              "path": [
                "title"
              ],
              "fromItems": true
            },
            {
              "name": "description",
              "operationId": "listTicket",
              "path": [
                "description"
              ],
              "fromItems": true
            },
            {
              "name": "status",
              "operationId": "listTicket",
              "path": [
                "status"
              ],
              "fromItems": true
            }
          ],
          "topFields": []
        },
        "optionalUses": []
      }
    ],
    "routes": [
      {
        "key": "controleChamados.ticketCommentCatalogue.qryListTicketComment",
        "handlerName": "ticketCommentCatalogueQryListTicketCommentHandler"
      },
      {
        "key": "controleChamados.ticketCommentCatalogue.cmdCreateTicketComment",
        "handlerName": "ticketCommentCatalogueCmdCreateTicketCommentHandler"
      },
      {
        "key": "controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment",
        "handlerName": "ticketCommentCatalogueCmdUpdateTicketCommentHandler"
      },
      {
        "key": "controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment",
        "handlerName": "ticketCommentCatalogueCmdDeleteTicketCommentHandler"
      },
      {
        "key": "controleChamados.ticketCommentCatalogue.qryGetTicketComment",
        "handlerName": "ticketCommentCatalogueQryGetTicketCommentHandler"
      },
      {
        "key": "controleChamados.ticketCommentCatalogue.qryTicketPicker",
        "handlerName": "ticketCommentCatalogueQryTicketPickerHandler"
      }
    ]
  }
} as const;

export default ticketCommentCatalogueController;

export const pipeline = [
  {
    "id": "ticketCommentCatalogue__httpController",
    "type": "httpController",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCommentCatalogue.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCommentCatalogue.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCommentCatalogue--qryListTicketComment.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/createTicketComment.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCommentCatalogue--cmdCreateTicketComment.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/updateTicketComment.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCommentCatalogue--cmdUpdateTicketComment.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicketComment.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCommentCatalogue--cmdDeleteTicketComment.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/getTicketComment.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCommentCatalogue--qryGetTicketComment.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCommentCatalogue--qryTicketPicker.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
