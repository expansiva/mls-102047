/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/ticketCatalogue.ts" enhancement="_blank"/>

import {
  ok,
  fail,
  AppError,
  type BffHandler,
  type BffResponse,
  type ControllerRoute,
  type RequestContext,
} from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTicket, type ListTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.js';
import { createTicket, type CreateTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/createTicket.js';
import { updateTicket, type UpdateTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/updateTicket.js';
import { deleteTicket, type DeleteTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicket.js';
import { getTicket, type GetTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/getTicket.js';
import { locateTicket, type LocateTicketInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.js';
import { decideClosure, type DecideClosureInput } from '/_102047_/l1/controleChamados/layer_2_application/usecases/decideClosure.js';

const ALLOWED: readonly string[] = ['internal'];

function enforceActors(
  ctx: RequestContext,
  allowed: readonly string[],
  route: string,
): BffResponse | null {
  if (allowed.length === 0) return null;
  const scope = ctx.sessionContext?.actorScope ?? [];
  if (scope.length === 0) {
    ctx.log.info('bff.actor.no-scope', { route, allowed });
    return null;
  }
  if (scope.some((value) => allowed.includes(value))) return null;
  return fail(new AppError('FORBIDDEN_ACTOR', 'actor scope not permitted for ' + route, 403, { route }));
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', field + ' is required', 400, { field });
  }
  return value;
}

function requiredId(value: unknown, field: string): string {
  const id = requiredString(value, field);
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new AppError('VALIDATION_ERROR', field + ' has an invalid format', 400, { field });
  }
  return id;
}

function optionalEnum(value: unknown, field: string, values: readonly string[]): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string' || !values.includes(value)) {
    throw new AppError('VALIDATION_ERROR', field + ' has an invalid value', 400, { field, allowed: values });
  }
  return value;
}

export const ticketCatalogueQryListTicketHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.qryListTicket';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { search?: unknown; sortBy?: unknown; sortOrder?: unknown };
  const sortBy = optionalEnum(params.sortBy, 'sortBy', ['status']) as ListTicketInput['sortBy'];
  const sortOrder = optionalEnum(params.sortOrder, 'sortOrder', ['asc', 'desc']) as ListTicketInput['sortOrder'];
  const input: ListTicketInput = {
    search: params.search === undefined ? undefined : requiredString(params.search, 'search'),
    sortBy,
    sortOrder,
  };
  const result = await listTicket(ctx, input);
  const items = result.map((row) => ({
    ticketId: row.ticketId,
    title: row.title,
    description: row.description,
    status: row.status,
  }));
  return ok(items);
};

export const ticketCatalogueCmdCreateTicketHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.cmdCreateTicket';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { title?: unknown; description?: unknown };
  const input: CreateTicketInput = {
    title: requiredString(params.title, 'title'),
    description: requiredString(params.description, 'description'),
  };
  const result = await createTicket(ctx, input);
  return ok({
    ticketId: result.ticketId,
    title: result.title,
    description: result.description,
    status: result.status,
  });
};

export const ticketCatalogueCmdUpdateTicketHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.cmdUpdateTicket';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketId?: unknown; title?: unknown; description?: unknown };
  const input: UpdateTicketInput = {
    ticketId: requiredId(params.ticketId, 'ticketId'),
    title: requiredString(params.title, 'title'),
    description: requiredString(params.description, 'description'),
  };
  const result = await updateTicket(ctx, input);
  return ok({
    ticketId: result.ticketId,
    title: result.title,
    description: result.description,
    status: result.status,
  });
};

export const ticketCatalogueCmdDeleteTicketHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.cmdDeleteTicket';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketId?: unknown };
  const input: DeleteTicketInput = { ticketId: requiredId(params.ticketId, 'ticketId') };
  const result = await deleteTicket(ctx, input);
  return ok({
    ticketId: result.ticketId,
    title: result.title,
    description: result.description,
    status: result.status,
  });
};

export const ticketCatalogueQryGetTicketHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.qryGetTicket';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketId?: unknown };
  const input: GetTicketInput = { ticketId: requiredId(params.ticketId, 'ticketId') };
  const result = await getTicket(ctx, input);
  return ok({
    ticketId: result.ticketId,
    title: result.title,
    description: result.description,
    status: result.status,
  });
};

export const ticketCatalogueQryLocateTicketHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.qryLocateTicket';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const input: LocateTicketInput = {};
  const result = await locateTicket(ctx, input);
  const items = [result].map((row) => ({
    ticketId: row.ticketId,
    title: row.title,
    description: row.description,
    status: row.status,
  }));
  return ok(items);
};

export const ticketCatalogueCmdDecideClosureHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.ticketCatalogue.cmdDecideClosure';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { ticketId?: unknown; status?: unknown };
  const status = requiredString(params.status, 'status');
  if (status !== 'closed') {
    throw new AppError('VALIDATION_ERROR', 'status has an invalid value', 400, { field: 'status', allowed: ['closed'] });
  }
  const input: DecideClosureInput = {
    ticketId: requiredId(params.ticketId, 'ticketId'),
    status,
  };
  const result = await decideClosure(ctx, input);
  return ok({
    ticketId: result.ticketId,
    title: result.title,
    description: result.description,
    status: result.status,
  });
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.ticketCatalogue.qryListTicket', handler: ticketCatalogueQryListTicketHandler },
  { key: 'controleChamados.ticketCatalogue.cmdCreateTicket', handler: ticketCatalogueCmdCreateTicketHandler },
  { key: 'controleChamados.ticketCatalogue.cmdUpdateTicket', handler: ticketCatalogueCmdUpdateTicketHandler },
  { key: 'controleChamados.ticketCatalogue.cmdDeleteTicket', handler: ticketCatalogueCmdDeleteTicketHandler },
  { key: 'controleChamados.ticketCatalogue.qryGetTicket', handler: ticketCatalogueQryGetTicketHandler },
  { key: 'controleChamados.ticketCatalogue.qryLocateTicket', handler: ticketCatalogueQryLocateTicketHandler },
  { key: 'controleChamados.ticketCatalogue.cmdDecideClosure', handler: ticketCatalogueCmdDecideClosureHandler },
];
