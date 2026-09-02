/// <mls fileReference="_102047_/l4/controleChamados/workspaces/commentOpenTicket.defs.ts" enhancement="_blank"/>

export const commentOpenTicketWorkspace = {
  "workspaceId": "commentOpenTicket",
  "title": "Registrar comentário em chamado aberto",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
  "entity": "TicketComment",
  "bffCalls": [
    {
      "bffId": "qryLocateTicket",
      "kind": "query",
      "uses": [
        {
          "operationId": "locateTicket"
        }
      ],
      "input": [],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "ticketId",
            "from": "locateTicket.$items.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "locateTicket.$items.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "locateTicket.$items.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "locateTicket.$items.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.commentOpenTicket.qryLocateTicket"
    },
    {
      "bffId": "cmdRecordComment",
      "kind": "command",
      "uses": [
        {
          "operationId": "recordComment"
        }
      ],
      "input": [
        {
          "name": "ticketId",
          "from": "recordComment.ticketId",
          "required": true,
          "source": "routeParam",
          "type": "string"
        },
        {
          "name": "commentText",
          "from": "recordComment.commentText",
          "required": true,
          "source": "userInput",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketCommentId",
            "from": "recordComment.ticketCommentId",
            "type": "string",
            "required": true
          },
          {
            "name": "ticketId",
            "from": "recordComment.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "commentText",
            "from": "recordComment.commentText",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.commentOpenTicket.cmdRecordComment"
    }
  ],
  "sections": [
    {
      "sectionId": "locateTicket",
      "intent": "Um chamado aberto é selecionado a partir da Lista de chamados para acompanhamento.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryLocateTicket",
          "usage": "picker"
        }
      ]
    },
    {
      "sectionId": "recordComment",
      "intent": "Um comentário fica registrado no histórico do chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdRecordComment"
        }
      ]
    }
  ],
  "operationIds": [
    "locateTicket",
    "recordComment"
  ],
  "purpose": "Documentar o andamento do atendimento em um chamado aberto.",
  "presentation": {
    "categoryRef": "processWizard",
    "confidence": 10,
    "classificationNote": "Derived from the journey tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:2fca13e1"
} as const;

export default commentOpenTicketWorkspace;
