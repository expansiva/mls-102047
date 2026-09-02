/// <mls fileReference="_102047_/l4/controleChamados/siteMap.defs.ts" enhancement="_blank"/>

export const controleChamadosSiteMap = {
  "moduleName": "controleChamados",
  "note": "Site map (permanent page index) — workspaces, landings and advisory edges. Detail (sections/organisms/bffCalls) lives per-workspace under workspaces/.",
  "workspaces": [
    {
      "workspaceId": "commentOpenTicket",
      "title": "Registrar comentário em chamado aberto",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "TicketComment",
      "operationIds": [
        "locateTicket",
        "recordComment"
      ],
      "purpose": "Documentar o andamento do atendimento em um chamado aberto."
    },
    {
      "workspaceId": "ticketCatalogue",
      "title": "Chamado",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "Ticket",
      "operationIds": [
        "createTicket",
        "decideClosure",
        "deleteTicket",
        "getTicket",
        "listTicket",
        "locateTicket",
        "updateTicket"
      ],
      "purpose": "Cadastro de Chamado."
    },
    {
      "workspaceId": "ticketCommentCatalogue",
      "title": "Comentário do chamado",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "TicketComment",
      "operationIds": [
        "createTicketComment",
        "deleteTicketComment",
        "getTicketComment",
        "listTicket",
        "listTicketComment",
        "updateTicketComment"
      ],
      "purpose": "Cadastro de Comentário do chamado."
    },
    {
      "workspaceId": "ticketHub",
      "title": "Chamado",
      "actors": [
        "atendente"
      ],
      "kind": "landing",
      "entity": "Ticket",
      "operationIds": [
        "listTicket",
        "listTicketComment"
      ],
      "purpose": "Painel de Chamado."
    }
  ],
  "landings": [
    {
      "actorId": "atendente",
      "workspaceId": "ticketHub",
      "reason": "Painel de Chamado."
    }
  ],
  "navigationEdges": [
    {
      "from": "ticketHub",
      "to": "commentOpenTicket",
      "operationId": "",
      "description": "Registrar comentário em chamado aberto",
      "prominence": "primary",
      "order": 0
    },
    {
      "from": "ticketHub",
      "to": "ticketCommentCatalogue",
      "operationId": "",
      "description": "Comentário do chamado"
    }
  ],
  "workspaceIds": [
    "commentOpenTicket",
    "ticketCatalogue",
    "ticketCommentCatalogue",
    "ticketHub"
  ]
} as const;

export default controleChamadosSiteMap;
