/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/getTicketComment.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketCommentRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.js';

export interface GetTicketCommentInput {
  ticketCommentId: string;
}

export interface GetTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export async function getTicketComment(
  ctx: RequestContext,
  input: GetTicketCommentInput,
): Promise<GetTicketCommentOutput> {
  const ticketComments = resolveRepository<ITicketCommentRepository>(ctx, 'TicketComment');
  const ticketComment = await ticketComments.getById(input.ticketCommentId);

  if (!ticketComment) {
    throw new AppError(
      'NOT_FOUND',
      `Ticket comment not found: ${input.ticketCommentId}`,
      404,
      { ticketCommentId: input.ticketCommentId },
    );
  }

  return {
    ticketCommentId: ticketComment.ticketCommentId,
    ticketId: ticketComment.ticketId,
    commentText: ticketComment.commentText,
  };
}
