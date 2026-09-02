/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.ts" enhancement="_blank"/>

import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketCommentRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.js';

export interface ListTicketCommentInput {}

export interface ListTicketCommentItem {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export type ListTicketCommentOutput = ListTicketCommentItem[];

export async function listTicketComment(
  ctx: RequestContext,
  _input: ListTicketCommentInput,
): Promise<ListTicketCommentOutput> {
  const ticketComments = resolveRepository<ITicketCommentRepository>(ctx, 'TicketComment');
  const records = await ticketComments.list({});
  return records.map((record) => ({
    ticketCommentId: record.ticketCommentId,
    ticketId: record.ticketId,
    commentText: record.commentText,
  }));
}
