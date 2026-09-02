/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketHub--qryListTicket.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketHub.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryListTicket (query); Output kind=list; route controleChamados.ticketHub.qryListTicket.

export interface QryListTicketInput {
  search?: string;
  sortBy?: 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface QryListTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const qryListTicketRoute = 'controleChamados.ticketHub.qryListTicket' as const;
