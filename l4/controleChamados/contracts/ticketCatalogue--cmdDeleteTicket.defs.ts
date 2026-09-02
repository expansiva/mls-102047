/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCatalogue--cmdDeleteTicket.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdDeleteTicket (command); Output kind=object; route controleChamados.ticketCatalogue.cmdDeleteTicket.

export interface CmdDeleteTicketInput {
  ticketId: string;
}

export interface CmdDeleteTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const cmdDeleteTicketRoute = 'controleChamados.ticketCatalogue.cmdDeleteTicket' as const;
