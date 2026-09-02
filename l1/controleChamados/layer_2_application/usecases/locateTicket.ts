/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { Ticket } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';

export interface LocateTicketInput {}

export interface LocateTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export async function locateTicket(
  ctx: RequestContext,
  _input: LocateTicketInput,
): Promise<LocateTicketOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');
  const openTickets: Ticket[] = await tickets.list({ status: 'open' });
  const ticket = openTickets[0];

  if (!ticket) {
    throw new AppError('NOT_FOUND', 'No open ticket was found.', 404);
  }

  return {
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
  };
}
