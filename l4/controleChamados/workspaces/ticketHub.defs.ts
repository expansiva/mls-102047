/// <mls fileReference="_102047_/l4/controleChamados/workspaces/ticketHub.defs.ts" enhancement="_blank"/>

export const ticketHubWorkspace = {
  "workspaceId": "ticketHub",
  "title": "Chamado",
  "actors": [
    "atendente"
  ],
  "kind": "landing",
  "entity": "Ticket",
  "bffCalls": [
    {
      "bffId": "qryListTicket",
      "kind": "query",
      "uses": [
        {
          "operationId": "listTicket"
        }
      ],
      "input": [
        {
          "name": "search",
          "from": "listTicket.search",
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "sortBy",
          "from": "listTicket.sortBy",
          "source": "userInput",
          "type": "string",
          "enumValues": [
            "status"
          ]
        },
        {
          "name": "sortOrder",
          "from": "listTicket.sortOrder",
          "source": "userInput",
          "type": "string",
          "enumValues": [
            "asc",
            "desc"
          ]
        }
      ],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "ticketId",
            "from": "listTicket.$items.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "listTicket.$items.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "listTicket.$items.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "listTicket.$items.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketHub.qryListTicket"
    },
    {
      "bffId": "qryListTicketComment",
      "kind": "query",
      "uses": [
        {
          "operationId": "listTicketComment"
        }
      ],
      "input": [],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "ticketCommentId",
            "from": "listTicketComment.$items.ticketCommentId",
            "type": "string",
            "required": true
          },
          {
            "name": "ticketId",
            "from": "listTicketComment.$items.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "commentText",
            "from": "listTicketComment.$items.commentText",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketHub.qryListTicketComment"
    }
  ],
  "sections": [
    {
      "sectionId": "collection",
      "intent": "Carteira e busca.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListTicket"
        }
      ]
    },
    {
      "sectionId": "record",
      "intent": "Registro selecionado e o que gira em volta dele.",
      "organisms": [
        {
          "role": "detailPanel",
          "dataSource": "qryListTicketComment"
        }
      ]
    }
  ],
  "operationIds": [
    "listTicket",
    "listTicketComment"
  ],
  "purpose": "Painel de Chamado.",
  "presentation": {
    "categoryRef": "dashboardCommandCenter",
    "confidence": 10,
    "classificationNote": "Derived from the hub tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:1333cf38"
} as const;

export default ticketHubWorkspace;
