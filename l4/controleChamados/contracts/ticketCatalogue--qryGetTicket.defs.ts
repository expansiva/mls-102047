/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCatalogue--qryGetTicket.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryGetTicket (query); Output kind=object; route controleChamados.ticketCatalogue.qryGetTicket.

export interface QryGetTicketInput {
  ticketId: string;
}

export interface QryGetTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const qryGetTicketRoute = 'controleChamados.ticketCatalogue.qryGetTicket' as const;
