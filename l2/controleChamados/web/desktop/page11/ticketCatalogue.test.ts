/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page11/ticketCatalogue.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (wherever
// TESTS_ENABLED is on).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are ENTITY IDS this page itself reads: the runner resolves them at
// run time from the harvested output of this page's read queries (including the rows of any array in
// the envelope). "<seedValue>" is the value of that field on a seeded row; "<seedSpare>"
// is a leftover valid value for a create command (reusing a seeded unique value would collide).
// paramFieldRefs maps those params to the l4 fieldRef so the pool can match by ontology field, not by
// the input's wire name. Literals stay for free input with no entity counterpart (pagination, typed
// format, closed enum). expect.itemsKey names the collection the wire returns
// for a paginated query (the runner assumes "items" when it is absent). "actor" is this page's l4 actor:
// the run executes these cases as the seeded platform identity of that actor, so a route that reads the
// actor id from the session is runnable headless.
export const pageTests = {
  "moduleName": "controleChamados",
  "page": "ticketCatalogue",
  "variant": "page11",
  "actor": "atendente",
  "cases": [
    {
      "id": "qryListTicket.ok",
      "routine": "controleChamados.ticketCatalogue.qryListTicket",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCreateTicket.ok",
      "routine": "controleChamados.ticketCatalogue.cmdCreateTicket",
      "params": {
        "title": "<seedSpare>",
        "description": "<seedSpare>"
      },
      "paramFieldRefs": {
        "title": "Ticket.title",
        "description": "Ticket.description"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCreateTicket.title.required",
      "routine": "controleChamados.ticketCatalogue.cmdCreateTicket",
      "params": {
        "description": "teste"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdCreateTicket.description.required",
      "routine": "controleChamados.ticketCatalogue.cmdCreateTicket",
      "params": {
        "title": "teste"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateTicket.ok",
      "routine": "controleChamados.ticketCatalogue.cmdUpdateTicket",
      "params": {
        "ticketId": "<seedRef>",
        "title": "<seedValue>",
        "description": "<seedValue>"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId",
        "title": "Ticket.title",
        "description": "Ticket.description"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdUpdateTicket.title.required",
      "routine": "controleChamados.ticketCatalogue.cmdUpdateTicket",
      "params": {
        "ticketId": "<seedRef>",
        "description": "teste"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateTicket.description.required",
      "routine": "controleChamados.ticketCatalogue.cmdUpdateTicket",
      "params": {
        "ticketId": "<seedRef>",
        "title": "teste"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "qryGetTicket.ok",
      "routine": "controleChamados.ticketCatalogue.qryGetTicket",
      "params": {
        "ticketId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    },
    {
      "id": "qryLocateTicket.ok",
      "routine": "controleChamados.ticketCatalogue.qryLocateTicket",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdDecideClosure.ok",
      "routine": "controleChamados.ticketCatalogue.cmdDecideClosure",
      "params": {
        "ticketId": "<seedRef>",
        "status": "closed"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdDecideClosure.status.required",
      "routine": "controleChamados.ticketCatalogue.cmdDecideClosure",
      "params": {
        "ticketId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdDeleteTicket.ok",
      "routine": "controleChamados.ticketCatalogue.cmdDeleteTicket",
      "params": {
        "ticketId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdDeleteTicket.gone",
      "routine": "controleChamados.ticketCatalogue.qryGetTicket",
      "params": {
        "ticketId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketId": "Ticket.ticketId"
      },
      "mutating": false,
      "expect": {
        "ok": false,
        "errorCode": "NOT_FOUND"
      }
    }
  ]
} as const;
