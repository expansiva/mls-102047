/// <mls fileReference="_{project}_/l4/controleChamados/contracts/ticketCommentCatalogue--cmdUpdateTicketComment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/ticketCommentCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdUpdateTicketComment (command); Output kind=object; route controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment.

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
