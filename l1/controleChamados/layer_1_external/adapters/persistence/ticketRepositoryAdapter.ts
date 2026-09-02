/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketRepositoryAdapter.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ITicketRepository, TicketListFilter } from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.js';
import type { Ticket, TicketStatus } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticket.js';

interface TicketRow {
  ticket_id: string;
  title: string;
  status: string;
  details: Record<string, unknown> | string | null;
}

interface TicketDetails {
  description: string;
}

function toRow(ticket: Ticket): TicketRow {
  const details: TicketDetails = {
    description: ticket.description,
  };
  return {
    ticket_id: ticket.ticketId,
    title: ticket.title,
    status: ticket.status,
    details: JSON.stringify(details),
  };
}

function detailsDefaults(): TicketDetails {
  return {
    description: '',
  };
}

function parseDetails(row: TicketRow): TicketDetails {
  let parsed: Partial<TicketDetails> = {};
  try {
    const raw = typeof row.details === 'string' ? JSON.parse(row.details) : (row.details ?? {});
    parsed = (raw ?? {}) as Partial<TicketDetails>;
  } catch (error) {
    console.warn(`[parseDetails] ticket ${row.ticket_id}: details is not JSON`, error);
    parsed = {};
  }
  return { ...detailsDefaults(), ...parsed };
}

function toDomain(row: TicketRow): Ticket {
  const details = parseDetails(row);
  return {
    ticketId: row.ticket_id,
    title: row.title,
    description: details.description,
    status: row.status as TicketStatus,
  };
}

function isInputFormatError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return (
    message.includes('invalid input syntax') ||
    message.includes('invalid uuid') ||
    message.includes('malformed uuid') ||
    message.includes('invalid key')
  );
}

export function createTicketRepositoryAdapter(ctx: RequestContext): ITicketRepository {
  const getTable = () => ctx.data.moduleData.getTable<TicketRow>('controlechamados_ticket');

  return {
    async delete(id) {
      await (await getTable()).delete({ where: { ticket_id: id } });
    },

    async getById(id) {
      let row: TicketRow | null;
      try {
        row = await (await getTable()).findOne({ where: { ticket_id: id } });
      } catch (error) {
        if (isInputFormatError(error)) {
          throw new AppError('NOT_FOUND', `Ticket ${id} not found`, 404, { id });
        }
        throw error;
      }
      return row ? toDomain(row) : null;
    },

    async list(filter: TicketListFilter) {
      const where: Partial<TicketRow> = {};
      if (filter.status) where.status = filter.status;

      const input: {
        where: Partial<TicketRow>;
        ilike?: { title: string };
        orderBy?: { field: 'title' | 'status'; direction: 'asc' | 'desc' };
      } = { where };
      if (filter.search) input.ilike = { title: filter.search };

      if (filter.sortBy === 'title') {
        input.orderBy = { field: 'title', direction: filter.sortOrder ?? 'asc' };
      }

      const rows = await (await getTable()).findMany(input);
      const tickets = rows.map(toDomain);

      if (filter.sortBy === 'status') {
        const statusOrder: Record<TicketStatus, number> = { open: 0, closed: 1 };
        const direction = filter.sortOrder === 'desc' ? -1 : 1;
        return tickets
          .map((ticket, index) => ({ ticket, index }))
          .sort((a, b) => {
            const difference = statusOrder[a.ticket.status] - statusOrder[b.ticket.status];
            return difference !== 0 ? difference * direction : a.index - b.index;
          })
          .map(({ ticket }) => ticket);
      }

      return tickets;
    },

    async save(aggregate) {
      const repo = await getTable();
      const row = toRow(aggregate);
      const existing = await repo.findOne({ where: { ticket_id: aggregate.ticketId } });
      if (existing) {
        await repo.update({ where: { ticket_id: aggregate.ticketId }, patch: row });
      } else {
        await repo.insert({ record: row });
      }
    },
  };
}
