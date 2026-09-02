/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCatalogue.defs.ts" enhancement="_blank"/>

export const ticketCatalogueController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "ticketCatalogue",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "ticketCatalogue",
    "controllerName": "TicketCatalogueController",
    "ownerKind": "workspace",
    "workspaceId": "ticketCatalogue",
    "actors": [
      "atendente"
    ],
    "allowedScopes": [
      "internal"
    ],
    "handlers": [
      {
        "handlerName": "ticketCatalogueQryListTicketHandler",
        "command": "qryListTicket",
        "bffId": "qryListTicket",
        "route": "controleChamados.ticketCatalogue.qryListTicket",
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
      },
      {
        "handlerName": "ticketCatalogueCmdCreateTicketHandler",
        "command": "cmdCreateTicket",
        "bffId": "cmdCreateTicket",
        "route": "controleChamados.ticketCatalogue.cmdCreateTicket",
        "kind": "command",
        "usecaseRef": "createTicket",
        "usecaseRefs": [
          "createTicket"
        ],
        "inputTypeName": "CreateTicketInput",
        "inputContract": [
          {
            "inputId": "title",
            "fieldRef": "Ticket.title",
            "required": true,
            "source": "userInput",
            "description": "Título que identifica resumidamente a solicitação de atendimento."
          },
          {
            "inputId": "description",
            "fieldRef": "Ticket.description",
            "required": true,
            "source": "userInput",
            "description": "Descrição detalhada da solicitação de atendimento registrada no chamado."
          },
          {
            "inputId": "status",
            "fieldRef": "Ticket.status",
            "required": true,
            "source": "systemDefault",
            "description": "Situação atual do chamado durante o atendimento.",
            "enumValues": [
              "open",
              "closed"
            ]
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketId",
              "operationId": "createTicket",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "title",
              "operationId": "createTicket",
              "path": [
                "title"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "createTicket",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "createTicket",
              "path": [
                "status"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCatalogueCmdUpdateTicketHandler",
        "command": "cmdUpdateTicket",
        "bffId": "cmdUpdateTicket",
        "route": "controleChamados.ticketCatalogue.cmdUpdateTicket",
        "kind": "command",
        "usecaseRef": "updateTicket",
        "usecaseRefs": [
          "updateTicket"
        ],
        "inputTypeName": "UpdateTicketInput",
        "inputContract": [
          {
            "inputId": "ticketId",
            "fieldRef": "Ticket.ticketId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento."
          },
          {
            "inputId": "title",
            "fieldRef": "Ticket.title",
            "required": true,
            "source": "userInput",
            "description": "Título que identifica resumidamente a solicitação de atendimento."
          },
          {
            "inputId": "description",
            "fieldRef": "Ticket.description",
            "required": true,
            "source": "userInput",
            "description": "Descrição detalhada da solicitação de atendimento registrada no chamado."
          },
          {
            "inputId": "status",
            "fieldRef": "Ticket.status",
            "required": true,
            "source": "systemDefault",
            "description": "Situação atual do chamado durante o atendimento.",
            "enumValues": [
              "open",
              "closed"
            ]
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketId",
              "operationId": "updateTicket",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "title",
              "operationId": "updateTicket",
              "path": [
                "title"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "updateTicket",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "updateTicket",
              "path": [
                "status"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCatalogueCmdDeleteTicketHandler",
        "command": "cmdDeleteTicket",
        "bffId": "cmdDeleteTicket",
        "route": "controleChamados.ticketCatalogue.cmdDeleteTicket",
        "kind": "command",
        "usecaseRef": "deleteTicket",
        "usecaseRefs": [
          "deleteTicket"
        ],
        "inputTypeName": "DeleteTicketInput",
        "inputContract": [
          {
            "inputId": "ticketId",
            "fieldRef": "Ticket.ticketId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento."
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketId",
              "operationId": "deleteTicket",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "title",
              "operationId": "deleteTicket",
              "path": [
                "title"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "deleteTicket",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "deleteTicket",
              "path": [
                "status"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCatalogueQryGetTicketHandler",
        "command": "qryGetTicket",
        "bffId": "qryGetTicket",
        "route": "controleChamados.ticketCatalogue.qryGetTicket",
        "kind": "query",
        "usecaseRef": "getTicket",
        "usecaseRefs": [
          "getTicket"
        ],
        "inputTypeName": "GetTicketInput",
        "inputContract": [
          {
            "inputId": "ticketId",
            "fieldRef": "Ticket.ticketId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento."
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketId",
              "operationId": "getTicket",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "title",
              "operationId": "getTicket",
              "path": [
                "title"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "getTicket",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "getTicket",
              "path": [
                "status"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCatalogueQryLocateTicketHandler",
        "command": "qryLocateTicket",
        "bffId": "qryLocateTicket",
        "route": "controleChamados.ticketCatalogue.qryLocateTicket",
        "kind": "query",
        "usecaseRef": "locateTicket",
        "usecaseRefs": [
          "locateTicket"
        ],
        "inputTypeName": "LocateTicketInput",
        "inputContract": [],
        "projection": {
          "kind": "list",
          "arrayFieldName": null,
          "itemFields": [
            {
              "name": "ticketId",
              "operationId": "locateTicket",
              "path": [
                "ticketId"
              ],
              "fromItems": true
            },
            {
              "name": "title",
              "operationId": "locateTicket",
              "path": [
                "title"
              ],
              "fromItems": true
            },
            {
              "name": "description",
              "operationId": "locateTicket",
              "path": [
                "description"
              ],
              "fromItems": true
            },
            {
              "name": "status",
              "operationId": "locateTicket",
              "path": [
                "status"
              ],
              "fromItems": true
            }
          ],
          "topFields": []
        },
        "optionalUses": []
      },
      {
        "handlerName": "ticketCatalogueCmdDecideClosureHandler",
        "command": "cmdDecideClosure",
        "bffId": "cmdDecideClosure",
        "route": "controleChamados.ticketCatalogue.cmdDecideClosure",
        "kind": "command",
        "usecaseRef": "decideClosure",
        "usecaseRefs": [
          "decideClosure"
        ],
        "inputTypeName": "DecideClosureInput",
        "inputContract": [
          {
            "inputId": "ticketId",
            "fieldRef": "Ticket.ticketId",
            "required": true,
            "source": "routeParam",
            "description": "Chamado"
          },
          {
            "inputId": "status",
            "fieldRef": "Ticket.status",
            "required": true,
            "source": "userInput",
            "description": "Decisão tomada.",
            "enumValues": [
              "closed"
            ]
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "ticketId",
              "operationId": "decideClosure",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "title",
              "operationId": "decideClosure",
              "path": [
                "title"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "decideClosure",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "decideClosure",
              "path": [
                "status"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      }
    ],
    "routes": [
      {
        "key": "controleChamados.ticketCatalogue.qryListTicket",
        "handlerName": "ticketCatalogueQryListTicketHandler"
      },
      {
        "key": "controleChamados.ticketCatalogue.cmdCreateTicket",
        "handlerName": "ticketCatalogueCmdCreateTicketHandler"
      },
      {
        "key": "controleChamados.ticketCatalogue.cmdUpdateTicket",
        "handlerName": "ticketCatalogueCmdUpdateTicketHandler"
      },
      {
        "key": "controleChamados.ticketCatalogue.cmdDeleteTicket",
        "handlerName": "ticketCatalogueCmdDeleteTicketHandler"
      },
      {
        "key": "controleChamados.ticketCatalogue.qryGetTicket",
        "handlerName": "ticketCatalogueQryGetTicketHandler"
      },
      {
        "key": "controleChamados.ticketCatalogue.qryLocateTicket",
        "handlerName": "ticketCatalogueQryLocateTicketHandler"
      },
      {
        "key": "controleChamados.ticketCatalogue.cmdDecideClosure",
        "handlerName": "ticketCatalogueCmdDecideClosureHandler"
      }
    ]
  }
} as const;

export default ticketCatalogueController;

export const pipeline = [
  {
    "id": "ticketCatalogue__httpController",
    "type": "httpController",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCatalogue.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCatalogue.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--qryListTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/createTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--cmdCreateTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/updateTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--cmdUpdateTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--cmdDeleteTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/getTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--qryGetTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--qryLocateTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/decideClosure.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketCatalogue--cmdDecideClosure.defs.ts"
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
