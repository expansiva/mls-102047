/// <mls fileReference="_102047_/l2/controleChamados/web/desktop/page11/ticketCommentCatalogue.test.ts" enhancement="_blank"/>

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
  "page": "ticketCommentCatalogue",
  "variant": "page11",
  "actor": "atendente",
  "cases": [
    {
      "id": "qryListTicketComment.ok",
      "routine": "controleChamados.ticketCommentCatalogue.qryListTicketComment",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCreateTicketComment.ok",
      "routine": "controleChamados.ticketCommentCatalogue.cmdCreateTicketComment",
      "params": {
        "ticketId": "<seedRef>",
        "commentText": "<seedSpare>"
      },
      "paramFieldRefs": {
        "ticketId": "TicketComment.ticketId",
        "commentText": "TicketComment.commentText"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCreateTicketComment.commentText.required",
      "routine": "controleChamados.ticketCommentCatalogue.cmdCreateTicketComment",
      "params": {
        "ticketId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketId": "TicketComment.ticketId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateTicketComment.ok",
      "routine": "controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment",
      "params": {
        "ticketCommentId": "<seedRef>",
        "ticketId": "<seedRef>",
        "commentText": "<seedValue>"
      },
      "paramFieldRefs": {
        "ticketCommentId": "TicketComment.ticketCommentId",
        "ticketId": "TicketComment.ticketId",
        "commentText": "TicketComment.commentText"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdUpdateTicketComment.commentText.required",
      "routine": "controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment",
      "params": {
        "ticketCommentId": "<seedRef>",
        "ticketId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketCommentId": "TicketComment.ticketCommentId",
        "ticketId": "TicketComment.ticketId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "qryGetTicketComment.ok",
      "routine": "controleChamados.ticketCommentCatalogue.qryGetTicketComment",
      "params": {
        "ticketCommentId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketCommentId": "TicketComment.ticketCommentId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    },
    {
      "id": "qryTicketPicker.ok",
      "routine": "controleChamados.ticketCommentCatalogue.qryTicketPicker",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdDeleteTicketComment.ok",
      "routine": "controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment",
      "params": {
        "ticketCommentId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketCommentId": "TicketComment.ticketCommentId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdDeleteTicketComment.gone",
      "routine": "controleChamados.ticketCommentCatalogue.qryGetTicketComment",
      "params": {
        "ticketCommentId": "<seedRef>"
      },
      "paramFieldRefs": {
        "ticketCommentId": "TicketComment.ticketCommentId"
      },
      "mutating": false,
      "expect": {
        "ok": false,
        "errorCode": "NOT_FOUND"
      }
    }
  ]
} as const;
