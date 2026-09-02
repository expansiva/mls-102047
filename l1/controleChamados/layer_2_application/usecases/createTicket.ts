/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/createTicket.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { Ticket } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';

export interface CreateTicketInput {
  title: string;
  description: string;
}

export interface CreateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export async function createTicket(
  ctx: RequestContext,
  input: CreateTicketInput,
): Promise<CreateTicketOutput> {
  if (typeof input.title !== 'string' || input.title.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'Ticket title is required.', 400, { field: 'title' });
  }
  if (typeof input.description !== 'string' || input.description.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'Ticket description is required.', 400, { field: 'description' });
  }

  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');
  const ticket: Ticket = {
    ticketId: ctx.idGenerator.newId(),
    title: input.title,
    description: input.description,
    status: 'open',
  };

  await ctx.data.runInTransaction(async () => {
    await tickets.save(ticket);
  });

  return {
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
  };
}
