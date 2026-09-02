/// <mls fileReference="_102047_/l2/controleChamados/web/contracts/commentOpenTicket.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace commentOpenTicket; one contract file per workspace, all bffCalls).

// bffCall qryLocateTicket (query) — Output kind=array; route controleChamados.commentOpenTicket.qryLocateTicket.
export interface QryLocateTicketInput {}
export interface QryLocateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const qryLocateTicketRoute = 'controleChamados.commentOpenTicket.qryLocateTicket' as const;

// bffCall cmdRecordComment (command) — Output kind=object; route controleChamados.commentOpenTicket.cmdRecordComment.
export interface CmdRecordCommentInput {
  ticketId: string;
  commentText: string;
}
export interface CmdRecordCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const cmdRecordCommentRoute = 'controleChamados.commentOpenTicket.cmdRecordComment' as const;
