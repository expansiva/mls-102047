/// <mls fileReference="_102047_/l2/controleChamados/web/contracts/ticketCommentCatalogue.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace ticketCommentCatalogue; one contract file per workspace, all bffCalls).

// bffCall qryListTicketComment (query) — Output kind=array; route controleChamados.ticketCommentCatalogue.qryListTicketComment.
export interface QryListTicketCommentInput {}
export interface QryListTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const qryListTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.qryListTicketComment' as const;

// bffCall cmdCreateTicketComment (command) — Output kind=object; route controleChamados.ticketCommentCatalogue.cmdCreateTicketComment.
export interface CmdCreateTicketCommentInput {
  ticketId: string;
  commentText: string;
}
export interface CmdCreateTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const cmdCreateTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.cmdCreateTicketComment' as const;

// bffCall cmdUpdateTicketComment (command) — Output kind=object; route controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment.
export interface CmdUpdateTicketCommentInput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export interface CmdUpdateTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const cmdUpdateTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment' as const;

// bffCall cmdDeleteTicketComment (command) — Output kind=object; route controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment.
export interface CmdDeleteTicketCommentInput {
  ticketCommentId: string;
}
export interface CmdDeleteTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const cmdDeleteTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment' as const;

// bffCall qryGetTicketComment (query) — Output kind=object; route controleChamados.ticketCommentCatalogue.qryGetTicketComment.
export interface QryGetTicketCommentInput {
  ticketCommentId: string;
}
export interface QryGetTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}
export const qryGetTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.qryGetTicketComment' as const;

// bffCall qryTicketPicker (query) — Output kind=array; route controleChamados.ticketCommentCatalogue.qryTicketPicker.
export interface QryTicketPickerInput {
  search?: string;
  sortBy?: 'open' | 'closed';
  sortOrder?: 'asc' | 'desc';
}
export interface QryTicketPickerOutput {
  ticketId: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
}
export const qryTicketPickerRoute = 'controleChamados.ticketCommentCatalogue.qryTicketPicker' as const;
