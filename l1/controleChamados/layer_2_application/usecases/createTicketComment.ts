/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/createTicketComment.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketCommentRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { TicketComment } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';
import { canAddCommentToTicket } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';
import { hasValidTicketCommentText } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';

export interface CreateTicketCommentInput {
  ticketId: string;
  commentText: string;
}

export interface CreateTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export async function createTicketComment(
  ctx: RequestContext,
  input: CreateTicketCommentInput,
): Promise<CreateTicketCommentOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');
  const ticketComments = resolveRepository<ITicketCommentRepository>(ctx, 'TicketComment');

  if (!hasValidTicketCommentText(input.commentText)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Comment text must contain at least one character.',
      400,
      { field: 'commentText' },
    );
  }

  const ticket = await tickets.getById(input.ticketId);
  if (!ticket) {
    throw new AppError('NOT_FOUND', 'Ticket not found.', 404, { ticketId: input.ticketId });
  }

  if (!canAddCommentToTicket(ticket)) {
    throw new AppError(
      'CONFLICT',
      'Comments can only be added to open tickets.',
      409,
      { ruleId: 'onlyOpenTicketCanReceiveComment', ticketId: input.ticketId },
    );
  }

  const ticketComment: TicketComment = {
    ticketCommentId: ctx.idGenerator.newId(),
    ticketId: input.ticketId,
    commentText: input.commentText,
  };

  await ctx.data.runInTransaction(async () => {
    await ticketComments.save(ticketComment);
  });

  return {
    ticketCommentId: ticketComment.ticketCommentId,
    ticketId: ticketComment.ticketId,
    commentText: ticketComment.commentText,
  };
}
