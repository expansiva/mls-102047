/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCommentCatalogue--qryGetTicketComment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryGetTicketComment (query); Output kind=object; route controleChamados.ticketCommentCatalogue.qryGetTicketComment.

export interface QryGetTicketCommentInput {
  ticketCommentId: string;
}

export interface QryGetTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export const qryGetTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.qryGetTicketComment' as const;
