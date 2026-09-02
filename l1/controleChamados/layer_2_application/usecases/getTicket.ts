/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/getTicket.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';

export interface GetTicketInput {
  ticketId: string;
}

export interface GetTicketOutput {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export async function getTicket(ctx: RequestContext, input: GetTicketInput): Promise<GetTicketOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');
  const ticket = await tickets.getById(input.ticketId);
  if (!ticket) {
    throw new AppError('NOT_FOUND', `Ticket not found: ${input.ticketId}`, 404, { ticketId: input.ticketId });
  }
  return {
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
  };
}
