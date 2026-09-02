/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/decideClosure.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import { canTransitionTicket, type TicketStatus } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';

export interface DecideClosureInput {
  ticketId: string;
  status: string;
}

export interface DecideClosureOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export async function decideClosure(
  ctx: RequestContext,
  input: DecideClosureInput,
): Promise<DecideClosureOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');

  return ctx.data.runInTransaction(async () => {
    if (input.status !== 'closed') {
      throw new AppError(
        'VALIDATION_ERROR',
        'The requested ticket status must be closed.',
        400,
        { field: 'status', expected: 'closed' },
      );
    }

    const ticket = await tickets.getById(input.ticketId);
    if (!ticket) {
      throw new AppError('NOT_FOUND', `Ticket not found: ${input.ticketId}`, 404, {
        ticketId: input.ticketId,
      });
    }

    if (ticket.status !== 'open') {
      throw new AppError(
        'CONFLICT',
        'Only an open ticket can be closed.',
        409,
        { ruleId: 'onlyOpenTicketCanBeClosed', ticketId: input.ticketId },
      );
    }

    const nextStatus: TicketStatus = 'closed';
    if (!canTransitionTicket(ticket.status, nextStatus)) {
      throw new AppError(
        'CONFLICT',
        'The ticket cannot transition to closed from its current status.',
        409,
        { ticketId: input.ticketId, from: ticket.status, to: nextStatus },
      );
    }

    ticket.status = nextStatus;
    await tickets.save(ticket);

    return {
      ticketId: ticket.ticketId,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
    };
  });
}
