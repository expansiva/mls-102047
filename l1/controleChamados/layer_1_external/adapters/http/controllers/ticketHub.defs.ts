/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketHub.defs.ts" enhancement="_blank"/>

export const ticketHubController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "ticketHub",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "ticketHub",
    "controllerName": "TicketHubController",
    "ownerKind": "workspace",
    "workspaceId": "ticketHub",
    "actors": [
      "atendente"
    ],
    "allowedScopes": [
      "internal"
    ],
    "handlers": [
      {
        "handlerName": "ticketHubQryListTicketHandler",
        "command": "qryListTicket",
        "bffId": "qryListTicket",
        "route": "controleChamados.ticketHub.qryListTicket",
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
        "handlerName": "ticketHubQryListTicketCommentHandler",
        "command": "qryListTicketComment",
        "bffId": "qryListTicketComment",
        "route": "controleChamados.ticketHub.qryListTicketComment",
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
      }
    ],
    "routes": [
      {
        "key": "controleChamados.ticketHub.qryListTicket",
        "handlerName": "ticketHubQryListTicketHandler"
      },
      {
        "key": "controleChamados.ticketHub.qryListTicketComment",
        "handlerName": "ticketHubQryListTicketCommentHandler"
      }
    ]
  }
} as const;

export default ticketHubController;

export const pipeline = [
  {
    "id": "ticketHub__httpController",
    "type": "httpController",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketHub.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketHub.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketHub--qryListTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.d.ts",
      "_102047_/l4/controleChamados/contracts/ticketHub--qryListTicketComment.defs.ts"
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
