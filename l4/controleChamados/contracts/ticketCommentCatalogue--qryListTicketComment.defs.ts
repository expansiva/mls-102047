/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCommentCatalogue--qryListTicketComment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryListTicketComment (query); Output kind=list; route controleChamados.ticketCommentCatalogue.qryListTicketComment.

export interface QryListTicketCommentInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryListTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export const qryListTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.qryListTicketComment' as const;
