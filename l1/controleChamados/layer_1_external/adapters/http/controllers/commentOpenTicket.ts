/// <mls fileReference="_102047_/l1/controleChamados/layer_1_external/adapters/http/controllers/commentOpenTicket.ts" enhancement="_blank"/>

import {
  ok,
  fail,
  AppError,
  type BffHandler,
  type BffResponse,
  type ControllerRoute,
  type RequestContext,
} from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  locateTicket,
  type LocateTicketInput,
} from '/_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.js';
import {
  recordComment,
  type RecordCommentInput,
} from '/_102047_/l1/controleChamados/layer_2_application/usecases/recordComment.js';

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
  return fail(
    new AppError(
      'FORBIDDEN_ACTOR',
      'actor scope not permitted for ' + route,
      403,
      { route },
    ),
  );
}

function isValidIdentifier(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && !/\s/.test(value) && /^[A-Za-z0-9_-]+$/.test(value);
}

export const commentOpenTicketQryLocateTicketHandler: BffHandler = async ({ ctx }) => {
  const denial = enforceActors(
    ctx,
    ALLOWED,
    'controleChamados.commentOpenTicket.qryLocateTicket',
  );
  if (denial) return denial;

  const input: LocateTicketInput = {};
  const result = await locateTicket(ctx, input);
  return ok([
    {
      ticketId: result.ticketId,
      title: result.title,
      description: result.description,
      status: result.status,
    },
  ]);
};

export const commentOpenTicketCmdRecordCommentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(
    ctx,
    ALLOWED,
    'controleChamados.commentOpenTicket.cmdRecordComment',
  );
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    ticketId?: unknown;
    commentText?: unknown;
  };
  if (!isValidIdentifier(params.ticketId)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'ticketId is required and must be a valid identifier',
      400,
      { field: 'ticketId' },
    );
  }
  if (typeof params.commentText !== 'string' || params.commentText.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'commentText is required',
      400,
      { field: 'commentText' },
    );
  }

  const input: RecordCommentInput = {
    ticketId: params.ticketId,
    commentText: params.commentText,
  };
  const result = await recordComment(ctx, input);
  return ok({
    ticketCommentId: result.ticketCommentId,
    ticketId: result.ticketId,
    commentText: result.commentText,
  });
};

export const routes: ControllerRoute[] = [
  {
    key: 'controleChamados.commentOpenTicket.qryLocateTicket',
    handler: commentOpenTicketQryLocateTicketHandler,
  },
  {
    key: 'controleChamados.commentOpenTicket.cmdRecordComment',
    handler: commentOpenTicketCmdRecordCommentHandler,
  },
];
