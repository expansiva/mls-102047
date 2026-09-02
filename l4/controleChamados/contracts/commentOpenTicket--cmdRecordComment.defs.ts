/// <mls fileReference="_{project}_/l4/controleChamados/contracts/commentOpenTicket--cmdRecordComment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/commentOpenTicket.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdRecordComment (command); Output kind=object; route controleChamados.commentOpenTicket.cmdRecordComment.

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
