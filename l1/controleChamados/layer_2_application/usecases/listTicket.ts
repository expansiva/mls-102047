/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.ts" enhancement="_blank"/>

import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITicketRepository } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';

export interface ListTicketInput {
  search?: string;
  sortBy?: 'title' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ListTicketItem {
  ticketId: string;
  title: string;
  description: string;
  status: string;
}

export type ListTicketOutput = ListTicketItem[];

export async function listTicket(
  ctx: RequestContext,
  input: ListTicketInput,
): Promise<ListTicketOutput> {
  const tickets = resolveRepository<ITicketRepository>(ctx, 'Ticket');
  const records = await tickets.list({
    search: input.search,
    sortBy: input.sortBy,
    sortOrder: input.sortOrder,
  });

  return records.map((ticket) => ({
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
  }));
}
