/// <mls fileReference="_102047_/l1/controleChamados/layer_3_domain/entities/ticket.ts" enhancement="_blank"/>

export type TicketStatus = 'open' | 'closed';

export interface Ticket {
  ticketId: string;
  title: string;
  description: string;
  status: TicketStatus;
}

export const TICKET_STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  open: ['closed'],
  closed: [],
};

export function canTransitionTicket(from: TicketStatus, to: TicketStatus): boolean {
  return TICKET_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function ticketStartsOpen(ticket: Pick<Ticket, 'status'>): boolean {
  return ticket.status === 'open';
}

export function canAddCommentToTicket(ticket: Pick<Ticket, 'status'>): boolean {
  return ticket.status === 'open';
}
