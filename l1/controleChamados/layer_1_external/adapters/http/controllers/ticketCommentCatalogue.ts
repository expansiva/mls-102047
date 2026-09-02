/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCommentCatalogue.ts" enhancement="_blank"/>

import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTicketComment, type ListTicketCommentInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/listTicketComment.js';
import { createTicketComment, type CreateTicketCommentInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/createTicketComment.js';
import { updateTicketComment, type UpdateTicketCommentInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/updateTicketComment.js';
import { deleteTicketComment, type DeleteTicketCommentInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicketComment.js';
import { getTicketComment, type GetTicketCommentInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/getTicketComment.js';
import { listTicket, type ListTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.js';

const ALLOWED: readonly string[] = ['internal'];

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

function requireIdentifier(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.length === 0 || /\s/.test(value) || !/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new AppError('VALIDATION_ERROR', field + ' is required and must be a valid identifier', 400, { field });
  }
  return value;
}

function requireText(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', field + ' is required', 400, { field });
  }
  return value;
}

export const ticketCommentCatalogueQryListTicketCommentHandler: BffHandler = async ({ ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketCommentCatalogue.qryListTicketComment');
  if (denial) return denial;
  const result = await listTicketComment(ctx, {} as ListTicketCommentInput);
  return ok(result.map((row) => ({
    ticketCommentId: row.ticketCommentId,
    ticketId: row.ticketId,
    commentText: row.commentText,
  })));
};

export const ticketCommentCatalogueCmdCreateTicketCommentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketCommentCatalogue.cmdCreateTicketComment');
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketId?: unknown; commentText?: unknown };
  const input: CreateTicketCommentInput = {
    ticketId: requireIdentifier(params.ticketId, 'ticketId'),
    commentText: requireText(params.commentText, 'commentText'),
  };
  const result = await createTicketComment(ctx, input);
  return ok({ ticketCommentId: result.ticketCommentId, ticketId: result.ticketId, commentText: result.commentText });
};

export const ticketCommentCatalogueCmdUpdateTicketCommentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment');
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketCommentId?: unknown; ticketId?: unknown; commentText?: unknown };
  const input: UpdateTicketCommentInput = {
    ticketCommentId: requireIdentifier(params.ticketCommentId, 'ticketCommentId'),
    ticketId: requireIdentifier(params.ticketId, 'ticketId'),
    commentText: requireText(params.commentText, 'commentText'),
  };
  const result = await updateTicketComment(ctx, input);
  return ok({ ticketCommentId: result.ticketCommentId, ticketId: result.ticketId, commentText: result.commentText });
};

export const ticketCommentCatalogueCmdDeleteTicketCommentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment');
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketCommentId?: unknown };
  const input: DeleteTicketCommentInput = {
    ticketCommentId: requireIdentifier(params.ticketCommentId, 'ticketCommentId'),
  };
  const result = await deleteTicketComment(ctx, input);
  return ok({ ticketCommentId: result.ticketCommentId, ticketId: result.ticketId, commentText: result.commentText });
};

export const ticketCommentCatalogueQryGetTicketCommentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketCommentCatalogue.qryGetTicketComment');
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketCommentId?: unknown };
  const input: GetTicketCommentInput = {
    ticketCommentId: requireIdentifier(params.ticketCommentId, 'ticketCommentId'),
  };
  const result = await getTicketComment(ctx, input);
  return ok({ ticketCommentId: result.ticketCommentId, ticketId: result.ticketId, commentText: result.commentText });
};

export const ticketCommentCatalogueQryTicketPickerHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.ticketCommentCatalogue.qryTicketPicker');
  if (denial) return denial;
  const params = (request.params ?? {}) as { search?: unknown; sortBy?: unknown; sortOrder?: unknown };
  if (params.sortBy !== undefined && params.sortBy !== 'status') {
    throw new AppError('VALIDATION_ERROR', 'sortBy must be status', 400, { field: 'sortBy' });
  }
  if (params.sortOrder !== undefined && params.sortOrder !== 'asc' && params.sortOrder !== 'desc') {
    throw new AppError('VALIDATION_ERROR', 'sortOrder must be asc or desc', 400, { field: 'sortOrder' });
  }
  if (params.search !== undefined && typeof params.search !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'search must be a string', 400, { field: 'search' });
  }
  const input: ListTicketInput = {
    search: params.search as string | undefined,
    sortBy: params.sortBy as 'status' | undefined,
    sortOrder: params.sortOrder as 'asc' | 'desc' | undefined,
  };
  const result = await listTicket(ctx, input);
  return ok(result.map((row) => ({
    ticketId: row.ticketId,
    title: row.title,
    description: row.description,
    status: row.status,
  })));
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.ticketCommentCatalogue.qryListTicketComment', handler: ticketCommentCatalogueQryListTicketCommentHandler },
  { key: 'controleChamados.ticketCommentCatalogue.cmdCreateTicketComment', handler: ticketCommentCatalogueCmdCreateTicketCommentHandler },
  { key: 'controleChamados.ticketCommentCatalogue.cmdUpdateTicketComment', handler: ticketCommentCatalogueCmdUpdateTicketCommentHandler },
  { key: 'controleChamados.ticketCommentCatalogue.cmdDeleteTicketComment', handler: ticketCommentCatalogueCmdDeleteTicketCommentHandler },
  { key: 'controleChamados.ticketCommentCatalogue.qryGetTicketComment', handler: ticketCommentCatalogueQryGetTicketCommentHandler },
  { key: 'controleChamados.ticketCommentCatalogue.qryTicketPicker', handler: ticketCommentCatalogueQryTicketPickerHandler },
];