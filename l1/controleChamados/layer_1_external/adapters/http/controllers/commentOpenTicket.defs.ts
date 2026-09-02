/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/commentOpenTicket.defs.ts" enhancement="_blank"/>

export const commentOpenTicketController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "commentOpenTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "commentOpenTicket",
    "controllerName": "CommentOpenTicketController",
    "ownerKind": "workspace",
    "workspaceId": "commentOpenTicket",
    "actors": [
      "atendente"
    ],
    "allowedScopes": [
      "internal"
    ],
    "handlers": [
      {
        "handlerName": "commentOpenTicketQryLocateTicketHandler",
        "command": "qryLocateTicket",
        "bffId": "qryLocateTicket",
        "route": "controleChamados.commentOpenTicket.qryLocateTicket",
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
        "handlerName": "commentOpenTicketCmdRecordCommentHandler",
        "command": "cmdRecordComment",
        "bffId": "cmdRecordComment",
        "route": "controleChamados.commentOpenTicket.cmdRecordComment",
        "kind": "command",
        "usecaseRef": "recordComment",
        "usecaseRefs": [
          "recordComment"
        ],
        "inputTypeName": "RecordCommentInput",
        "inputContract": [
          {
            "inputId": "ticketId",
            "fieldRef": "Ticket.ticketId",
            "required": true,
            "source": "routeParam",
            "description": "Chamado"
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
              "operationId": "recordComment",
              "path": [
                "ticketCommentId"
              ],
              "fromItems": false
            },
            {
              "name": "ticketId",
              "operationId": "recordComment",
              "path": [
                "ticketId"
              ],
              "fromItems": false
            },
            {
              "name": "commentText",
              "operationId": "recordComment",
              "path": [
                "commentText"
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
        "key": "controleChamados.commentOpenTicket.qryLocateTicket",
        "handlerName": "commentOpenTicketQryLocateTicketHandler"
      },
      {
        "key": "controleChamados.commentOpenTicket.cmdRecordComment",
        "handlerName": "commentOpenTicketCmdRecordCommentHandler"
      }
    ]
  }
} as const;

export default commentOpenTicketController;

export const pipeline = [
  {
    "id": "commentOpenTicket__httpController",
    "type": "httpController",
    "outputPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/commentOpenTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/commentOpenTicket.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.d.ts",
      "_102047_/l4/controleChamados/contracts/commentOpenTicket--qryLocateTicket.defs.ts",
      "_102047_/l1/controleChamados/layer_2_application/usecases/recordComment.d.ts",
      "_102047_/l4/controleChamados/contracts/commentOpenTicket--cmdRecordComment.defs.ts"
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
