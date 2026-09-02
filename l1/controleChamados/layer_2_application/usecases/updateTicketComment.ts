/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/updateTicketComment.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketCommentRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { TicketComment } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';
import { canAddCommentToTicket, hasValidTicketCommentText } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';

export interface UpdateTicketCommentInput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export interface UpdateTicketCommentOutput {
  ticketCommentId: string;
  ticketId: string;
  commentText: string;
}

export async function updateTicketComment(
  ctx: RequestContext,
  input: UpdateTicketCommentInput,
): Promise<UpdateTicketCommentOutput> {
  if (!input || typeof input.ticketCommentId !== 'string' || input.ticketCommentId.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'ticketCommentId is required.', 400, { field: 'ticketCommentId' });
  }
  if (typeof input.ticketId !== 'string' || input.ticketId.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'ticketId is required.', 400, { field: 'ticketId' });
  }
  if (typeof input.commentText !== 'string' || !hasValidTicketCommentText(input.commentText)) {
    throw new AppError('VALIDATION_ERROR', 'commentText must contain at least one character.', 400, { field: 'commentText' });
  }

  const ticketComments = resolveRepository<ITicketCommentRepository>(ctx, 'TicketComment');
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');

  let updatedComment: TicketComment | null = null;
  await ctx.data.runInTransaction(async () => {
    const comment = await ticketComments.getById(input.ticketCommentId);
    if (!comment) {
      throw new AppError('NOT_FOUND', `Ticket comment not found: ${input.ticketCommentId}`, 404, {
        ticketCommentId: input.ticketCommentId,
      });
    }
    if (comment.ticketId !== input.ticketId) {
      throw new AppError('VALIDATION_ERROR', 'The ticket comment does not belong to the specified ticket.', 400, {
        ticketCommentId: input.ticketCommentId,
        ticketId: input.ticketId,
      });
    }

    const ticket = await tickets.getById(input.ticketId);
    if (!ticket) {
      throw new AppError('NOT_FOUND', `Ticket not found: ${input.ticketId}`, 404, { ticketId: input.ticketId });
    }
    if (!canAddCommentToTicket(ticket)) {
      throw new AppError('CONFLICT', 'Only an open ticket can receive a comment.', 409, {
        ruleId: 'onlyOpenTicketCanReceiveComment',
        ticketId: input.ticketId,
        status: ticket.status,
      });
    }

    updatedComment = {
      ...comment,
      commentText: input.commentText,
    };
    await ticketComments.save(updatedComment);
  });

  if (!updatedComment) {
    throw new AppError('CONFLICT', 'The ticket comment could not be updated.', 409, {
      ticketCommentId: input.ticketCommentId,
    });
  }

  return {
    ticketCommentId: updatedComment.ticketCommentId,
    ticketId: updatedComment.ticketId,
    commentText: updatedComment.commentText,
  };
}
