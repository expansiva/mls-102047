/// <mls fileReference="_102047_/l2/controleChamados/web/contracts/ticketCatalogue.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace ticketCatalogue; one contract file per workspace, all bffCalls).

// bffCall qryListTicket (query) — Output kind=array; route controleChamados.ticketCatalogue.qryListTicket.
export interface QryListTicketInput {
  search?: string;
  sortBy?: 'open' | 'closed';
  sortOrder?: 'asc' | 'desc';
}
export interface QryListTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const qryListTicketRoute = 'controleChamados.ticketCatalogue.qryListTicket' as const;

// bffCall cmdCreateTicket (command) — Output kind=object; route controleChamados.ticketCatalogue.cmdCreateTicket.
export interface CmdCreateTicketInput {
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export interface CmdCreateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const cmdCreateTicketRoute = 'controleChamados.ticketCatalogue.cmdCreateTicket' as const;

// bffCall cmdUpdateTicket (command) — Output kind=object; route controleChamados.ticketCatalogue.cmdUpdateTicket.
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
  status: 'open' | 'closed';
}
export const cmdUpdateTicketRoute = 'controleChamados.ticketCatalogue.cmdUpdateTicket' as const;

// bffCall cmdDeleteTicket (command) — Output kind=object; route controleChamados.ticketCatalogue.cmdDeleteTicket.
export interface CmdDeleteTicketInput {
  ticketId: string;
}
export interface CmdDeleteTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const cmdDeleteTicketRoute = 'controleChamados.ticketCatalogue.cmdDeleteTicket' as const;

// bffCall qryGetTicket (query) — Output kind=object; route controleChamados.ticketCatalogue.qryGetTicket.
export interface QryGetTicketInput {
  ticketId: string;
}
export interface QryGetTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const qryGetTicketRoute = 'controleChamados.ticketCatalogue.qryGetTicket' as const;

// bffCall qryLocateTicket (query) — Output kind=array; route controleChamados.ticketCatalogue.qryLocateTicket.
export interface QryLocateTicketInput {}
export interface QryLocateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const qryLocateTicketRoute = 'controleChamados.ticketCatalogue.qryLocateTicket' as const;

// bffCall cmdDecideClosure (command) — Output kind=object; route controleChamados.ticketCatalogue.cmdDecideClosure.
export interface CmdDecideClosureInput {
  ticketId: string;
  status: 'open' | 'closed';
}
export interface CmdDecideClosureOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const cmdDecideClosureRoute = 'controleChamados.ticketCatalogue.cmdDecideClosure' as const;
