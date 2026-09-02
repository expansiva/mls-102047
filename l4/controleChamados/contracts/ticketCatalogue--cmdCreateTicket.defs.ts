/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCatalogue--cmdCreateTicket.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCreateTicket (command); Output kind=object; route controleChamados.ticketCatalogue.cmdCreateTicket.

export interface CmdCreateTicketInput {
  title: string;
  description: string;
  status: 'open' | 'closed';
}

export interface CmdCreateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const cmdCreateTicketRoute = 'controleChamados.ticketCatalogue.cmdCreateTicket' as const;
