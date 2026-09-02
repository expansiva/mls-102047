/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicket.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';

export interface DeleteTicketInput {
  ticketId: string;
}

export interface DeleteTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export async function deleteTicket(
  ctx: RequestContext,
  input: DeleteTicketInput,
): Promise<DeleteTicketOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');

  return ctx.data.runInTransaction(async () => {
    const ticket = await tickets.getById(input.ticketId);
    if (!ticket) {
      throw new AppError('NOT_FOUND', `Ticket not found: ${input.ticketId}`, 404, {
        ticketId: input.ticketId,
      });
    }

    const deletedTicket: DeleteTicketOutput = {
      ticketId: ticket.ticketId,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
    };

    await tickets.delete(ticket.ticketId);
    return deletedTicket;
  });
}
