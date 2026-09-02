/// <mls fileReference="_102047_/l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts" enhancement="_blank"/>

export const ticketCommentCatalogueWorkspace = {
  "workspaceId": "ticketCommentCatalogue",
  "title": "Comentário do chamado",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
  "entity": "TicketComment",
  "bffCalls": [
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
      "route": "controleChamados.ticketCommentCatalogue.qryListTicketComment"
    },
    {
      "bffId": "cmdCreateTicketComment",
      "kind": "command",
      "uses": [
        {
          "operationId": "createTicketComment"
        }
      ],
      "input": [
        {
          "name": "ticketId",
          "from": "createTicketComment.ticketId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryTicketPicker",
          "type": "string"
        },
        {
          "name": "commentText",
          "from": "createTicketComment.commentText",
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
            "from": "createTicketComment.ticketCommentId",
            "type": "string",
            "required": true
          },
          {
            "name": "ticketId",
            "from": "createTicketComment.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "commentText",
            "from": "createTicketComment.commentText",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCommentCatalogue.cmdCreateTicketComment"
    },
    {
      "bffId": "cmdUpdateTicketComment",
      "kind": "command",
      "uses": [
        {
          "operationId": "updateTicketComment"
        }
      ],
      "input": [
        {
          "name": "ticketCommentId",
          "from": "updateTicketComment.ticketCommentId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        },
        {
          "name": "ticketId",
          "from": "updateTicketComment.ticketId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryTicketPicker",
          "type": "string"
        },
        {
          "name": "commentText",
          "from": "updateTicketComment.commentText",
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
            "from": "updateTicketComment.ticketCommentId",
            "type": "string",
            "required": true
          },
          {
            "name": "ticketId",
            "from": "updateTicketComment.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "commentText",
            "from": "updateTicketComment.commentText",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment"
    },
    {
      "bffId": "cmdDeleteTicketComment",
      "kind": "command",
      "uses": [
        {
          "operationId": "deleteTicketComment"
        }
      ],
      "input": [
        {
          "name": "ticketCommentId",
          "from": "deleteTicketComment.ticketCommentId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketCommentId",
            "from": "deleteTicketComment.ticketCommentId",
            "type": "string",
            "required": true
          },
          {
            "name": "ticketId",
            "from": "deleteTicketComment.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "commentText",
            "from": "deleteTicketComment.commentText",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment"
    },
    {
      "bffId": "qryGetTicketComment",
      "kind": "query",
      "uses": [
        {
          "operationId": "getTicketComment"
        }
      ],
      "input": [
        {
          "name": "ticketCommentId",
          "from": "getTicketComment.ticketCommentId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketCommentId",
            "from": "getTicketComment.ticketCommentId",
            "type": "string",
            "required": true
          },
          {
            "name": "ticketId",
            "from": "getTicketComment.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "commentText",
            "from": "getTicketComment.commentText",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCommentCatalogue.qryGetTicketComment"
    },
    {
      "bffId": "qryTicketPicker",
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
      "route": "controleChamados.ticketCommentCatalogue.qryTicketPicker"
    }
  ],
  "sections": [
    {
      "sectionId": "recordList",
      "intent": "Localizar Comentário do chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListTicketComment"
        },
        {
          "role": "contextualAction",
          "action": "cmdDeleteTicketComment"
        }
      ]
    },
    {
      "sectionId": "recordForm",
      "intent": "Criar ou corrigir Comentário do chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdCreateTicketComment"
        },
        {
          "role": "contextualAction",
          "action": "cmdUpdateTicketComment"
        },
        {
          "role": "filterControl",
          "dataSource": "qryTicketPicker",
          "usage": "picker"
        }
      ]
    }
  ],
  "operationIds": [
    "createTicketComment",
    "deleteTicketComment",
    "getTicketComment",
    "listTicket",
    "listTicketComment",
    "updateTicketComment"
  ],
  "purpose": "Cadastro de Comentário do chamado.",
  "presentation": {
    "categoryRef": "entityRecordManagement",
    "confidence": 10,
    "classificationNote": "Derived from the recordCatalogue tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:50cf1325"
} as const;

export default ticketCommentCatalogueWorkspace;
