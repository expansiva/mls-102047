/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketHub.ts" enhancement="_blank"/>

import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTicket, type ListTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.js';
import { listTicketComment, type ListTicketCommentInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.js';

const ALLOWED: readonly string[] = ['controleChamados:internal'];

function enforceActors(ctx: RequestContext, allowed: readonly string[], route: string): BffResponse | null {
  if (allowed.length === 0) return null;
  const scope = ctx.sessionContext?.actorScope ?? [];
  if (scope.length === 0) {
    ctx.log.info('bff.actor.no-scope', { route, allowed });
    return null;
  }
  if (scope.some((value) => allowed.includes(value))) return null;
  return fail(new AppError('FORBIDDEN_ACTOR', 'actor scope not permitted for ' + route, 403, { route }));
}

export const ticketHubQryListTicketHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketHub.qryListTicket');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    search?: string;
    sortBy?: 'status';
    sortOrder?: 'asc' | 'desc';
  };
  if (params.sortBy !== undefined && params.sortBy !== 'status') {
    throw new AppError('VALIDATION_ERROR', 'sortBy must be status', 400, { field: 'sortBy' });
  }
  if (params.sortOrder !== undefined && params.sortOrder !== 'asc' && params.sortOrder !== 'desc') {
    throw new AppError('VALIDATION_ERROR', 'sortOrder must be asc or desc', 400, { field: 'sortOrder' });
  }
  const input: ListTicketInput = {
    search: params.search,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  };
  const result = await listTicket(ctx, input);
  const items = (result ?? []).map((row) => ({
    ticketId: row.ticketId,
    title: row.title,
    description: row.description,
    status: row.status,
  }));
  return ok(items);
};

export const ticketHubQryListTicketCommentHandler: BffHandler = async ({ ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketHub.qryListTicketComment');
  if (denial) return denial;

  const input: ListTicketCommentInput = {};
  const result = await listTicketComment(ctx, input);
  const items = (result ?? []).map((row) => ({
    ticketCommentId: row.ticketCommentId,
    ticketId: row.ticketId,
    commentText: row.commentText,
  }));
  return ok(items);
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.ticketHub.qryListTicket', handler: ticketHubQryListTicketHandler },
  { key: 'controleChamados.ticketHub.qryListTicketComment', handler: ticketHubQryListTicketCommentHandler },
];
