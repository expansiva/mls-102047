/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCommentCatalogue--cmdDeleteTicketComment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdDeleteTicketComment (command); Output kind=object; route controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment.

export interface CmdDeleteTicketCommentInput {
  ticketCommentId: string;
}

export interface CmdDeleteTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export const cmdDeleteTicketCommentRoute = 'controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment' as const;
