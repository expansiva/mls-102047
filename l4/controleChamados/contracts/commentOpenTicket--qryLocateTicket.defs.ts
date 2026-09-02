/// <mls fileReference="_{project}_/l4/controleChamados/contracts/commentOpenTicket--qryLocateTicket.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/commentOpenTicket.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryLocateTicket (query); Output kind=list; route controleChamados.commentOpenTicket.qryLocateTicket.

export interface QryLocateTicketInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryLocateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export const qryLocateTicketRoute = 'controleChamados.commentOpenTicket.qryLocateTicket' as const;
