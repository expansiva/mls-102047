/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/persistence/ticketCommentRepositoryAdapter.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  ITicketCommentRepository,
  TicketCommentListFilter,
} from '/_102047_/l1/controleChamados/layer_2_application/ports/ticketCommentRepository.js';
import type { TicketComment } from '/_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.js';

interface TicketCommentRow {
  ticket_comment_id: string;
  ticket_id: string;
  details: Record<string, unknown> | string | null;
}

interface TicketCommentDetails {
  commentText: string;
}

function toRow(comment: TicketComment): TicketCommentRow {
  const details: TicketCommentDetails = {
    commentText: comment.commentText,
  };
  return {
    ticket_comment_id: comment.ticketCommentId,
    ticket_id: comment.ticketId,
    details: JSON.stringify(details),
  };
}

function detailsDefaults(): TicketCommentDetails {
  return {
    commentText: '',
  };
}

function parseDetails(row: TicketCommentRow): TicketCommentDetails {
  let parsed: Partial<TicketCommentDetails> = {};
  try {
    const raw = typeof row.details === 'string' ? JSON.parse(row.details) : (row.details ?? {});
    parsed = (raw ?? {}) as Partial<TicketCommentDetails>;
  } catch (error) {
    console.warn(
      `[parseDetails] controlechamados_ticket_comment ${row.ticket_comment_id}: details is not JSON`,
      error,
    );
    parsed = {};
  }
  return { ...detailsDefaults(), ...parsed };
}

function toDomain(row: TicketCommentRow): TicketComment {
  const details = parseDetails(row);
  return {
    ticketCommentId: row.ticket_comment_id,
    ticketId: row.ticket_id,
    commentText: details.commentText,
  };
}

function isInputFormatError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as { code?: unknown; message?: unknown };
  const code = String(candidate.code ?? '').toLowerCase();
  const message = String(candidate.message ?? '').toLowerCase();
  return (
    code.includes('invalid') ||
    code.includes('format') ||
    code.includes('malformed') ||
    message.includes('invalid input syntax') ||
    message.includes('invalid uuid') ||
    message.includes('malformed uuid') ||
    message.includes('invalid format')
  );
}

export function createTicketCommentRepositoryAdapter(ctx: RequestContext): ITicketCommentRepository {
  const getTable = () =>
    ctx.data.moduleData.getTable<TicketCommentRow>('controlechamados_ticket_comment');

  return {
    async getById(id) {
      let row: TicketCommentRow | null;
      try {
        row = await (await getTable()).findOne({ where: { ticket_comment_id: id } });
      } catch (error) {
        if (isInputFormatError(error)) {
          throw new AppError('NOT_FOUND', `TicketComment ${id} not found`, 404, { id });
        }
        throw error;
      }
      if (!row) {
        throw new AppError('NOT_FOUND', `TicketComment ${id} not found`, 404, { id });
      }
      return toDomain(row);
    },

    async list(filter: TicketCommentListFilter) {
      const where: Partial<TicketCommentRow> = {};
      if (filter.ticketId) where.ticket_id = filter.ticketId;
      const rows = await (await getTable()).findMany({
        where,
        orderBy: { field: 'ticket_comment_id', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async save(aggregate) {
      const repo = await getTable();
      const row = toRow(aggregate);
      const existing = await repo.findOne({
        where: { ticket_comment_id: aggregate.ticketCommentId },
      });
      if (existing) {
        await repo.update({
          where: { ticket_comment_id: aggregate.ticketCommentId },
          patch: row,
        });
      } else {
        await repo.insert({ record: row });
      }
    },

    async delete(id) {
      await (await getTable()).delete({ where: { ticket_comment_id: id } });
    },
  };
}
