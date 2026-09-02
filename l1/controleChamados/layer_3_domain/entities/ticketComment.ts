/// <mls fileReference="_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.ts" enhancement="_blank"/>

export interface TicketComment {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

/**
 * Validates the declared minimum-length constraint for a comment.
 */
export function hasValidTicketCommentText(commentText: string): boolean {
  return commentText.length >= 1;
}

/**
 * A comment may be added only while its ticket is open.
 */
export function canAddTicketComment(ticketStatus: string): boolean {
  return ticketStatus === 'open';
}
