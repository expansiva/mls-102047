/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/updateTicket.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { Ticket } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';

export interface UpdateTicketInput {
  ticketId: string;
  title: string;
  description: string;
}

export interface UpdateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export async function updateTicket(
  ctx: RequestContext,
  input: UpdateTicketInput,
): Promise<UpdateTicketOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');
  const ticket = await tickets.getById(input.ticketId);

  if (!ticket) {
    throw new AppError('NOT_FOUND', `Ticket not found: ${input.ticketId}`, 404, {
      ticketId: input.ticketId,
    });
  }

  if (input.title.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'Ticket title is required.', 400, {
      field: 'title',
    });
  }

  if (input.description.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'Ticket description is required.', 400, {
      field: 'description',
    });
  }

  const updatedTicket: Ticket = {
    ...ticket,
    title: input.title,
    description: input.description,
  };

  await ctx.data.runInTransaction(async () => {
    await tickets.save(updatedTicket);
  });

  return {
    ticketId: updatedTicket.ticketId,
    title: updatedTicket.title,
    description: updatedTicket.description,
    status: updatedTicket.status,
  };
}
