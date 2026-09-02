/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCatalogue--cmdUpdateTicket.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdUpdateTicket (command); Output kind=object; route controleChamados.ticketCatalogue.cmdUpdateTicket.

export interface CmdUpdateTicketInput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}

export interface CmdUpdateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const cmdUpdateTicketRoute = 'controleChamados.ticketCatalogue.cmdUpdateTicket' as const;
