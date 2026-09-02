/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Deterministic initial data for controleChamados. Scenario planned by agentCbSeeds; rows and ids compiled locally from seeds.defs.ts.
// TableSeedRows exports are discovered by shape and merged by the persistence registry.

/* <agentCbSeedsPlan>
{
  "version": 1,
  "moduleName": "controleChamados",
  "language": "en",
  "plan": {
    "summary": "Three ticket comments attached to the three existing open support tickets, providing distinct customer-support conversation history.",
    "localTables": [
      {
        "tableId": "Ticket",
        "rows": [
          {
            "key": "ticket-1",
            "columns": [
              {
                "name": "title",
                "value": "Unable to update pet profile"
              },
              {
                "name": "status",
                "value": "open"
              }
            ],
            "details": [
              {
                "name": "description",
                "value": "The customer cannot save the pet's updated weight and vaccination details."
              }
            ],
            "children": []
          },
          {
            "key": "ticket-2",
            "columns": [
              {
                "name": "title",
                "value": "Appointment confirmation missing"
              },
              {
                "name": "status",
                "value": "open"
              }
            ],
            "details": [
              {
                "name": "description",
                "value": "The customer completed an appointment request but has not received a confirmation message."
              }
            ],
            "children": []
          },
          {
            "key": "ticket-3",
            "columns": [
              {
                "name": "title",
                "value": "Question about grooming service"
              },
              {
                "name": "status",
                "value": "open"
              }
            ],
            "details": [
              {
                "name": "description",
                "value": "The customer is asking which grooming services are included in the selected package."
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "TicketComment",
        "rows": [
          {
            "key": "comment-1",
            "columns": [
              {
                "name": "ticket_id",
                "value": {
                  "ref": "local:Ticket.ticket-1"
                }
              }
            ],
            "details": [
              {
                "name": "ticketId",
                "value": {
                  "ref": "local:Ticket.ticket-1"
                }
              },
              {
                "name": "commentText",
                "value": "I am available this afternoon if you need any additional information."
              }
            ],
            "children": []
          },
          {
            "key": "comment-2",
            "columns": [
              {
                "name": "ticket_id",
                "value": {
                  "ref": "local:Ticket.ticket-2"
                }
              }
            ],
            "details": [
              {
                "name": "ticketId",
                "value": {
                  "ref": "local:Ticket.ticket-2"
                }
              },
              {
                "name": "commentText",
                "value": "Thank you for the update; I will send the requested document shortly."
              }
            ],
            "children": []
          },
          {
            "key": "comment-3",
            "columns": [
              {
                "name": "ticket_id",
                "value": {
                  "ref": "local:Ticket.ticket-3"
                }
              }
            ],
            "details": [
              {
                "name": "ticketId",
                "value": {
                  "ref": "local:Ticket.ticket-3"
                }
              },
              {
                "name": "commentText",
                "value": "The issue is still occurring after restarting the application."
              }
            ],
            "children": []
          }
        ]
      }
    ],
    "mdmEntities": []
  }
}
</agentCbSeedsPlan> */

// <agentCbSeedAssetUrls>
const seedAssetUrls: Record<string, string> = {};
const seedAssetWarnings: string[] = [];
// </agentCbSeedAssetUrls>

function seedAssetUrl(assetId: string): string | null { return seedAssetUrls[assetId] ?? null; }

function seedSparesPassing(check: (value: string) => boolean, planned: string, used: readonly string[], count = 3, attempts = 100): string[] {
  const spares: string[] = [];
  const taken = new Set(used);
  const match = planned.match(/^(.*?)(\d+)$/u);
  const prefix = match ? match[1] : planned;
  const width = match ? match[2].length : 0;
  const start = match ? Number.parseInt(match[2], 10) : 0;
  if (match && !Number.isFinite(start)) return spares;
  const budget = Math.max(attempts, count * 100);
  for (let i = 1; i <= budget && spares.length < count; i += 1) {
    const candidate = match ? prefix + String(start + i).padStart(width, '0') : planned + String(i);
    if (taken.has(candidate) || !check(candidate)) continue;
    taken.add(candidate);
    spares.push(candidate);
  }
  return spares;
}

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';
import type { Ticket } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';
import type { TicketComment } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';

const ticket1: Ticket = {
  "ticketId": "8c02610a-8d02-429d-8a02-5de48b025f77",
  "title": "Unable to update pet profile",
  "description": "The customer cannot save the pet's updated weight and vaccination details.",
  "status": "open"
};

const ticket2: Ticket = {
  "ticketId": "c8de53db-c7de-4248-8ade-5701c9de556e",
  "title": "Appointment confirmation missing",
  "description": "The customer completed an appointment request but has not received a confirmation message.",
  "status": "open"
};

const ticket3: Ticket = {
  "ticketId": "52650f5c-5365-40ef-8465-128255651415",
  "title": "Question about grooming service",
  "description": "The customer is asking which grooming services are included in the selected package.",
  "status": "open"
};

const ticketRows: Ticket[] = [ticket1, ticket2, ticket3];

const ticketCommentComment1: TicketComment = {
  "ticketCommentId": "922138b6-9321-4a49-8021-359091213723",
  "ticketId": "8c02610a-8d02-429d-8a02-5de48b025f77",
  "commentText": "I am available this afternoon if you need any additional information."
};

const ticketCommentComment2: TicketComment = {
  "ticketCommentId": "6efc9467-6dfc-42d4-80fc-978d6ffc95fa",
  "ticketId": "c8de53db-c7de-4248-8ade-5701c9de556e",
  "commentText": "Thank you for the update; I will send the requested document shortly."
};

const ticketCommentComment3: TicketComment = {
  "ticketCommentId": "771e4278-781e-440b-891e-459e7a1e4731",
  "ticketId": "52650f5c-5365-40ef-8465-128255651415",
  "commentText": "The issue is still occurring after restarting the application."
};

const ticketCommentRows: TicketComment[] = [ticketCommentComment1, ticketCommentComment2, ticketCommentComment3];

export const seedIds = {
  ticket1: ticket1.ticketId,
  ticket2: ticket2.ticketId,
  ticket3: ticket3.ticketId,
  ticketCommentComment1: ticketCommentComment1.ticketCommentId,
  ticketCommentComment2: ticketCommentComment2.ticketCommentId,
  ticketCommentComment3: ticketCommentComment3.ticketCommentId,
} as const;

export const seedSpares = {
  Ticket: {
    title: seedSparesPassing((_value: string) => true, "Unable to update pet profile", [ticket1.title, ticket2.title, ticket3.title], 3),
  },
} as const;

export const ticketSeeds: TableSeedRows = {
  "seedFor": "controleChamadosTicket",
  "rows": [
    {
      "ticket_id": "8c02610a-8d02-429d-8a02-5de48b025f77",
      "title": "Unable to update pet profile",
      "status": "open",
      "details": {
        "description": "The customer cannot save the pet's updated weight and vaccination details."
      }
    },
    {
      "ticket_id": "c8de53db-c7de-4248-8ade-5701c9de556e",
      "title": "Appointment confirmation missing",
      "status": "open",
      "details": {
        "description": "The customer completed an appointment request but has not received a confirmation message."
      }
    },
    {
      "ticket_id": "52650f5c-5365-40ef-8465-128255651415",
      "title": "Question about grooming service",
      "status": "open",
      "details": {
        "description": "The customer is asking which grooming services are included in the selected package."
      }
    }
  ]
};

export const ticketCommentSeeds: TableSeedRows = {
  "seedFor": "controleChamadosTicketComment",
  "rows": [
    {
      "ticket_comment_id": "922138b6-9321-4a49-8021-359091213723",
      "ticket_id": "8c02610a-8d02-429d-8a02-5de48b025f77",
      "details": {
        "ticketId": "8c02610a-8d02-429d-8a02-5de48b025f77",
        "commentText": "I am available this afternoon if you need any additional information."
      }
    },
    {
      "ticket_comment_id": "6efc9467-6dfc-42d4-80fc-978d6ffc95fa",
      "ticket_id": "c8de53db-c7de-4248-8ade-5701c9de556e",
      "details": {
        "ticketId": "c8de53db-c7de-4248-8ade-5701c9de556e",
        "commentText": "Thank you for the update; I will send the requested document shortly."
      }
    },
    {
      "ticket_comment_id": "771e4278-781e-440b-891e-459e7a1e4731",
      "ticket_id": "52650f5c-5365-40ef-8465-128255651415",
      "details": {
        "ticketId": "52650f5c-5365-40ef-8465-128255651415",
        "commentText": "The issue is still occurring after restarting the application."
      }
    }
  ]
};

export const mdmEntityIndexSeeds: TableSeedRows = {
  "seedFor": "mdmEntityIndex",
  "rows": [
    {
      "mdmId": "8be03d19-8ae0-4b86-89e0-39f388e03860",
      "subtype": "Person",
      "name": "Administrador da loja 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "admin"
      ],
      "searchVector": "administrador da loja 1 admin controlechamados",
      "mergedInto": null,
      "dynamoPk": "8be03d19-8ae0-4b86-89e0-39f388e03860",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "0bb4d7c4-0cb4-4957-8db4-daea0eb4dc7d",
      "subtype": "Person",
      "name": "Administrador da loja 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "admin"
      ],
      "searchVector": "administrador da loja 2 admin controlechamados",
      "mergedInto": null,
      "dynamoPk": "0bb4d7c4-0cb4-4957-8db4-daea0eb4dc7d",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "e22eb363-e12e-41d0-842e-b689e32eb4f6",
      "subtype": "Person",
      "name": "Administrador da loja 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "admin"
      ],
      "searchVector": "administrador da loja 3 admin controlechamados",
      "mergedInto": null,
      "dynamoPk": "e22eb363-e12e-41d0-842e-b689e32eb4f6",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "8df054ba-8ef0-464d-8bf0-51948cf05327",
      "subtype": "Person",
      "name": "Cliente responsável pelos pets 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "cliente"
      ],
      "searchVector": "cliente responsável pelos pets 1 cliente controlechamados",
      "mergedInto": null,
      "dynamoPk": "8df054ba-8ef0-464d-8bf0-51948cf05327",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "cacc478b-c9cc-45f8-8ccc-4ab1cbcc491e",
      "subtype": "Person",
      "name": "Cliente responsável pelos pets 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "cliente"
      ],
      "searchVector": "cliente responsável pelos pets 2 cliente controlechamados",
      "mergedInto": null,
      "dynamoPk": "cacc478b-c9cc-45f8-8ccc-4ab1cbcc491e",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "d452398c-d552-4b1f-8652-3cb2d7523e45",
      "subtype": "Person",
      "name": "Cliente responsável pelos pets 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "cliente"
      ],
      "searchVector": "cliente responsável pelos pets 3 cliente controlechamados",
      "mergedInto": null,
      "dynamoPk": "d452398c-d552-4b1f-8652-3cb2d7523e45",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
      "subtype": "Person",
      "name": "Atendente 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 1 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
      "subtype": "Person",
      "name": "Atendente 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 2 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "713ef3dc-723e-456f-833e-f702743ef895",
      "subtype": "Person",
      "name": "Atendente 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 3 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "713ef3dc-723e-456f-833e-f702743ef895",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    }
  ]
};

export const mdmDocumentSeeds: TableSeedRows = {
  "seedFor": "mdmDocumentCache",
  "rows": [
    {
      "mdmId": "8be03d19-8ae0-4b86-89e0-39f388e03860",
      "version": 1,
      "details": {
        "mdmId": "8be03d19-8ae0-4b86-89e0-39f388e03860",
        "subtype": "Person",
        "name": "Administrador da loja 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "admin"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "admin"
      }
    },
    {
      "mdmId": "0bb4d7c4-0cb4-4957-8db4-daea0eb4dc7d",
      "version": 1,
      "details": {
        "mdmId": "0bb4d7c4-0cb4-4957-8db4-daea0eb4dc7d",
        "subtype": "Person",
        "name": "Administrador da loja 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "admin"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "admin"
      }
    },
    {
      "mdmId": "e22eb363-e12e-41d0-842e-b689e32eb4f6",
      "version": 1,
      "details": {
        "mdmId": "e22eb363-e12e-41d0-842e-b689e32eb4f6",
        "subtype": "Person",
        "name": "Administrador da loja 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "admin"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "admin"
      }
    },
    {
      "mdmId": "8df054ba-8ef0-464d-8bf0-51948cf05327",
      "version": 1,
      "details": {
        "mdmId": "8df054ba-8ef0-464d-8bf0-51948cf05327",
        "subtype": "Person",
        "name": "Cliente responsável pelos pets 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "cliente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cliente"
      }
    },
    {
      "mdmId": "cacc478b-c9cc-45f8-8ccc-4ab1cbcc491e",
      "version": 1,
      "details": {
        "mdmId": "cacc478b-c9cc-45f8-8ccc-4ab1cbcc491e",
        "subtype": "Person",
        "name": "Cliente responsável pelos pets 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "cliente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cliente"
      }
    },
    {
      "mdmId": "d452398c-d552-4b1f-8652-3cb2d7523e45",
      "version": 1,
      "details": {
        "mdmId": "d452398c-d552-4b1f-8652-3cb2d7523e45",
        "subtype": "Person",
        "name": "Cliente responsável pelos pets 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "cliente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cliente"
      }
    },
    {
      "mdmId": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
      "version": 1,
      "details": {
        "mdmId": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
        "subtype": "Person",
        "name": "Atendente 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
      "version": 1,
      "details": {
        "mdmId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
        "subtype": "Person",
        "name": "Atendente 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "713ef3dc-723e-456f-833e-f702743ef895",
      "version": 1,
      "details": {
        "mdmId": "713ef3dc-723e-456f-833e-f702743ef895",
        "subtype": "Person",
        "name": "Atendente 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    }
  ]
};
