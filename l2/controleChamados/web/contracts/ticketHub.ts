/// <mls fileReference="_102047_/l2/controleChamados/web/contracts/ticketHub.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace ticketHub; one contract file per workspace, all bffCalls).

// bffCall qryListTicket (query) — Output kind=array; route controleChamados.ticketHub.qryListTicket.
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
export const qryListTicketRoute = 'controleChamados.ticketHub.qryListTicket' as const;

// bffCall qryListTicketComment (query) — Output kind=array; route controleChamados.ticketHub.qryListTicketComment.
export interface QryListTicketCommentInput {}
export interface QryListTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const qryListTicketCommentRoute = 'controleChamados.ticketHub.qryListTicketComment' as const;
