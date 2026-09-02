/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.ts" enhancement="_blank"/>

import type { Ticket, TicketStatus } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';

export type TicketId = string;

export interface TicketListFilter {
  status?: TicketStatus;
  search?: string;
  sortBy?: 'title' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ITicketRepository {
  getById(id: TicketId): Promise<Ticket | null>;
  list(filter: TicketListFilter): Promise<Ticket[]>;
  save(aggregate: Ticket): Promise<void>;
  delete(id: TicketId): Promise<void>;
}
