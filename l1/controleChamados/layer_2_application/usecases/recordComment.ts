/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/recordComment.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketCommentRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { TicketComment } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';
import { canAddCommentToTicket, hasValidTicketCommentText } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';

export interface RecordCommentInput {
  ticketId: string;
  commentText: string;
}

export interface RecordCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export async function recordComment(
  ctx: RequestContext,
  input: RecordCommentInput,
): Promise<RecordCommentOutput> {
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

  return ctx.data.runInTransaction(async () => {
    const ticket = await tickets.getById(input.ticketId);
    if (!ticket) {
      throw new AppError(
        'NOT_FOUND',
        `Ticket not found: ${input.ticketId}`,
        404,
        { ticketId: input.ticketId },
      );
    }

    if (!canAddCommentToTicket(ticket)) {
      // rule: onlyOpenTicketCanReceiveComment
      throw new AppError(
        'VALIDATION_ERROR',
        'A comment can only be added to an open ticket.',
        400,
        {
          ruleId: 'onlyOpenTicketCanReceiveComment',
          ticketId: input.ticketId,
          status: ticket.status,
        },
      );
    }

    const ticketComment: TicketComment = {
      ticketCommentId: ctx.idGenerator.newId(),
      ticketId: input.ticketId,
      commentText: input.commentText,
    };

    await ticketComments.save(ticketComment);

    return {
      ticketCommentId: ticketComment.ticketCommentId,
      ticketId: ticketComment.ticketId,
      commentText: ticketComment.commentText,
    };
  });
}
