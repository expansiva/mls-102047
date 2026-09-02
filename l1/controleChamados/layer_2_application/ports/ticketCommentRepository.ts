/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.ts" enhancement="_blank"/>

import type { TicketComment } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';

export type TicketCommentId = string;

export interface TicketCommentListFilter {
  ticketId?: string;
}

export interface ITicketCommentRepository {
  getById(id: TicketCommentId): Promise<TicketComment | null>;
  list(filter: TicketCommentListFilter): Promise<TicketComment[]>;
  save(aggregate: TicketComment): Promise<void>;
  delete(id: TicketCommentId): Promise<void>;
}
