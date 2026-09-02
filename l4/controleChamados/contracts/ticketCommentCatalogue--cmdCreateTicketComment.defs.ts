/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCommentCatalogue--cmdCreateTicketComment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCreateTicketComment (command); Output kind=object; route controleChamados.ticketCommentCatalogue.cmdCreateTicketComment.

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
