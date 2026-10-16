/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/inicio_membro.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/tarefas/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/tarefas/layer_1_external/auth/authorityMap.js';
import { requests } from '/_102047_/l1/tarefas/layer_2_application/requests/inicio_membro.js';
import type { Inicio_membroContracts } from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';

export const routes: ControllerRoute[] = [
  { key: 'tarefas.inicio_membro.cmdAceitarEntrega', handler: handleCmdAceitarEntrega },
  { key: 'tarefas.inicio_membro.cmdDevolverComMotivo', handler: handleCmdDevolverComMotivo },
  { key: 'tarefas.inicio_membro.cmdEnviarParaRevisao', handler: handleCmdEnviarParaRevisao },
  { key: 'tarefas.inicio_membro.cmdIniciarTarefa', handler: handleCmdIniciarTarefa },
  { key: 'tarefas.inicio_membro.qryInicioMembro', handler: handleQryInicioMembro },
];

async function handleCmdAceitarEntrega(input: IRequestEnvelope): Promise<BffResponse<Inicio_membroContracts['tarefas.inicio_membro.cmdAceitarEntrega']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Inicio_membroContracts['tarefas.inicio_membro.cmdAceitarEntrega']['input'];
  const data = await requests["tarefas.inicio_membro.cmdAceitarEntrega"](params, input.ctx);
  return { ok: true, data: data as Inicio_membroContracts['tarefas.inicio_membro.cmdAceitarEntrega']['output'], error: null };
}

async function handleCmdDevolverComMotivo(input: IRequestEnvelope): Promise<BffResponse<Inicio_membroContracts['tarefas.inicio_membro.cmdDevolverComMotivo']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version', 'details', 'details.motivoDevolucao']);
  const invalid = validateInput(scoped, ['id', 'version', 'details', 'details.motivoDevolucao'], ['id', 'version', 'details', 'details.motivoDevolucao'], []);
  if (invalid) throw invalid;
  const params = scoped as Inicio_membroContracts['tarefas.inicio_membro.cmdDevolverComMotivo']['input'];
  const data = await requests["tarefas.inicio_membro.cmdDevolverComMotivo"](params, input.ctx);
  return { ok: true, data: data as Inicio_membroContracts['tarefas.inicio_membro.cmdDevolverComMotivo']['output'], error: null };
}

async function handleCmdEnviarParaRevisao(input: IRequestEnvelope): Promise<BffResponse<Inicio_membroContracts['tarefas.inicio_membro.cmdEnviarParaRevisao']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Inicio_membroContracts['tarefas.inicio_membro.cmdEnviarParaRevisao']['input'];
  const data = await requests["tarefas.inicio_membro.cmdEnviarParaRevisao"](params, input.ctx);
  return { ok: true, data: data as Inicio_membroContracts['tarefas.inicio_membro.cmdEnviarParaRevisao']['output'], error: null };
}

async function handleCmdIniciarTarefa(input: IRequestEnvelope): Promise<BffResponse<Inicio_membroContracts['tarefas.inicio_membro.cmdIniciarTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Inicio_membroContracts['tarefas.inicio_membro.cmdIniciarTarefa']['input'];
  const data = await requests["tarefas.inicio_membro.cmdIniciarTarefa"](params, input.ctx);
  return { ok: true, data: data as Inicio_membroContracts['tarefas.inicio_membro.cmdIniciarTarefa']['output'], error: null };
}

async function handleQryInicioMembro(input: IRequestEnvelope): Promise<BffResponse<Inicio_membroContracts['tarefas.inicio_membro.qryInicioMembro']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroAvisosProprios']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, []);
  const invalid = validateInput(scoped, [], [], []);
  if (invalid) throw invalid;
  const params = scoped as Inicio_membroContracts['tarefas.inicio_membro.qryInicioMembro']['input'];
  const data = await requests["tarefas.inicio_membro.qryInicioMembro"](params, input.ctx);
  return { ok: true, data: data as Inicio_membroContracts['tarefas.inicio_membro.qryInicioMembro']['output'], error: null };
}

function scopeParams(params: unknown, ctx: { sessionContext?: { actorId?: string } }, held: readonly string[], allowed: readonly string[]): Record<string, unknown> {
  const body = params && typeof params === 'object' && !Array.isArray(params) ? { ...(params as Record<string, unknown>) } : {};
  const grants = held.map(grantId => resolveGrant(grantId)).filter((grant): grant is Exclude<ReturnType<typeof resolveGrant>, { code: string }> => 'grantId' in grant);
  const broader = new Set(grants.filter(grant => grant.scopeMode !== 'own').flatMap(grant => grant.entityRefs));
  const fields = new Set(grants.filter(grant => grant.scopeMode === 'own')
    .flatMap(grant => Object.entries(grant.recordFields).filter(([entityId]) => !broader.has(entityId)).map(([, field]) => field)));
  if (fields.size === 0) return body;
  const actorId = ctx.sessionContext?.actorId ?? '';
  if (!actorId) throw new AppError('FORBIDDEN_ACTOR', 'You have no identity for this scope.', 403);
  for (const field of fields) {
    if (!allowed.includes(field)) continue;
    // enforce:scope
    body[field] = actorId;
  }
  return body;
}

function authorize(request: BffRequest, grantIds: readonly string[]): AppError | string[] {
  const source = request.meta?.source ?? 'http';
  const authorities = request.meta?.verifiedAuthorities ?? [];
  if (source === 'http' && authorities.length === 0) {
    return new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
  }
  if (grantIds.length === 0) return [];
  const held: string[] = [];
  let refused: AppError | null = null;
  for (const grantId of grantIds) {
    const actorRef = actorRefFor(grantId);
    if (!actorRef) { refused = new AppError('AUTHORITY_UNMAPPED', `Grant ${grantId} has no actor in the authority map.`, 403); continue; }
    if (authorities.length > 0 && !authorities.some(item => item === actorRef || item.endsWith(':' + actorRef))) continue;
    const resolved = resolveGrant(grantId);
    if (!('grantId' in resolved)) { refused = new AppError(resolved.code, resolved.detail, 403); continue; }
    held.push(grantId);
  }
  if (held.length > 0) return held;
  return refused ?? new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
}

// `null` is accepted only where the contract type declares it; elsewhere it is refused, never read as absent.
function validateInput(params: unknown, fields: readonly string[], allowed: readonly string[], nullable: readonly string[] = []): AppError | null {
  const body = params && typeof params === 'object' && !Array.isArray(params) ? params as Record<string, unknown> : null;
  if (!body) return new AppError('VALIDATION_ERROR', 'Request body must be an object.', 400);
  const invalidPath = (value: unknown, prefix: string): string => {
    if (Array.isArray(value)) { for (const item of value) { const invalid = invalidPath(item, prefix); if (invalid) return invalid; } return ''; }
    if (!value || typeof value !== 'object') return '';
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      const path = prefix ? prefix + '.' + key : key;
      if (!allowed.includes(path)) return path + ' is not permitted.';
      if (child === null && !nullable.includes(path)) return path + ' must not be null.';
      const invalid = invalidPath(child, path); if (invalid) return invalid;
    }
    return '';
  };
  const invalid = invalidPath(body, ''); if (invalid) return new AppError('VALIDATION_ERROR', invalid, 400);
  for (const field of fields) {
    // A required member of an absent optional parent is not required; a required parent has its own entry.
    const parts = field.split('.');
    let value: unknown = body;
    let parentAbsent = false;
    for (const [index, part] of parts.entries()) {
      if (index > 0 && (value === undefined || value === null)) { parentAbsent = true; break; }
      value = value && typeof value === 'object' ? (value as Record<string, unknown>)[part] : undefined;
    }
    if (parentAbsent) continue;
    if (value === undefined || (value === null && !nullable.includes(field)) || value === '') {
      return new AppError('VALIDATION_ERROR', `${field} is required.`, 400);
    }
  }
  return null;
}

