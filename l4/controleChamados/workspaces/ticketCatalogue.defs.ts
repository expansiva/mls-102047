/// <mls fileReference="_102047_/l4/controleChamados/workspaces/ticketCatalogue.defs.ts" enhancement="_blank"/>

export const ticketCatalogueWorkspace = {
  "workspaceId": "ticketCatalogue",
  "title": "Chamado",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
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
      "route": "controleChamados.ticketCatalogue.qryListTicket"
    },
    {
      "bffId": "cmdCreateTicket",
      "kind": "command",
      "uses": [
        {
          "operationId": "createTicket"
        }
      ],
      "input": [
        {
          "name": "title",
          "from": "createTicket.title",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "description",
          "from": "createTicket.description",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "status",
          "from": "createTicket.status",
          "required": true,
          "source": "systemDefault",
          "type": "string",
          "enumValues": [
            "open",
            "closed"
          ]
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketId",
            "from": "createTicket.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "createTicket.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "createTicket.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "createTicket.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCatalogue.cmdCreateTicket"
    },
    {
      "bffId": "cmdUpdateTicket",
      "kind": "command",
      "uses": [
        {
          "operationId": "updateTicket"
        }
      ],
      "input": [
        {
          "name": "ticketId",
          "from": "updateTicket.ticketId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        },
        {
          "name": "title",
          "from": "updateTicket.title",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "description",
          "from": "updateTicket.description",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "status",
          "from": "updateTicket.status",
          "required": true,
          "source": "systemDefault",
          "type": "string",
          "enumValues": [
            "open",
            "closed"
          ]
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketId",
            "from": "updateTicket.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "updateTicket.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "updateTicket.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "updateTicket.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCatalogue.cmdUpdateTicket"
    },
    {
      "bffId": "cmdDeleteTicket",
      "kind": "command",
      "uses": [
        {
          "operationId": "deleteTicket"
        }
      ],
      "input": [
        {
          "name": "ticketId",
          "from": "deleteTicket.ticketId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketId",
            "from": "deleteTicket.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "deleteTicket.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "deleteTicket.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "deleteTicket.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCatalogue.cmdDeleteTicket"
    },
    {
      "bffId": "qryGetTicket",
      "kind": "query",
      "uses": [
        {
          "operationId": "getTicket"
        }
      ],
      "input": [
        {
          "name": "ticketId",
          "from": "getTicket.ticketId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketId",
            "from": "getTicket.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "getTicket.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "getTicket.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "getTicket.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCatalogue.qryGetTicket"
    },
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
      "route": "controleChamados.ticketCatalogue.qryLocateTicket"
    },
    {
      "bffId": "cmdDecideClosure",
      "kind": "command",
      "uses": [
        {
          "operationId": "decideClosure"
        }
      ],
      "input": [
        {
          "name": "ticketId",
          "from": "decideClosure.ticketId",
          "required": true,
          "source": "routeParam",
          "type": "string"
        },
        {
          "name": "status",
          "from": "decideClosure.status",
          "required": true,
          "source": "userInput",
          "type": "string",
          "enumValues": [
            "closed"
          ]
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "ticketId",
            "from": "decideClosure.ticketId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "from": "decideClosure.title",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "from": "decideClosure.description",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "decideClosure.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.ticketCatalogue.cmdDecideClosure"
    }
  ],
  "sections": [
    {
      "sectionId": "recordList",
      "intent": "Localizar Chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListTicket"
        },
        {
          "role": "filterControl",
          "attachTo": "qryListTicket"
        },
        {
          "role": "contextualAction",
          "action": "cmdDeleteTicket"
        }
      ]
    },
    {
      "sectionId": "recordForm",
      "intent": "Criar ou corrigir Chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdCreateTicket"
        },
        {
          "role": "contextualAction",
          "action": "cmdUpdateTicket"
        }
      ]
    },
    {
      "sectionId": "decideClosure",
      "intent": "O chamado passa a ter status fechado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdDecideClosure"
        }
      ]
    }
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
  "purpose": "Cadastro de Chamado.",
  "presentation": {
    "categoryRef": "entityRecordManagement",
    "confidence": 10,
    "classificationNote": "Derived from the recordCatalogue tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:72aa9a44"
} as const;

export default ticketCatalogueWorkspace;
