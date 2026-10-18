/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/minhas_tarefas.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/tarefas/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/tarefas/layer_1_external/auth/authorityMap.js';
import { requests } from '/_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.js';
import type { Minhas_tarefasContracts } from '/_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.js';

export const routes: ControllerRoute[] = [
  { key: 'tarefas.minhas_tarefas.cmdAceitar', handler: handleCmdAceitar },
  { key: 'tarefas.minhas_tarefas.cmdCancelar', handler: handleCmdCancelar },
  { key: 'tarefas.minhas_tarefas.cmdCriarTarefa', handler: handleCmdCriarTarefa },
  { key: 'tarefas.minhas_tarefas.cmdDevolver', handler: handleCmdDevolver },
  { key: 'tarefas.minhas_tarefas.cmdEnviarRevisao', handler: handleCmdEnviarRevisao },
  { key: 'tarefas.minhas_tarefas.cmdIniciar', handler: handleCmdIniciar },
  { key: 'tarefas.minhas_tarefas.cmdSalvarChecklist', handler: handleCmdSalvarChecklist },
  { key: 'tarefas.minhas_tarefas.cmdSalvarEdicao', handler: handleCmdSalvarEdicao },
  { key: 'tarefas.minhas_tarefas.qryBuscarMembros', handler: handleQryBuscarMembros },
  { key: 'tarefas.minhas_tarefas.qryListasAtivas', handler: handleQryListasAtivas },
  { key: 'tarefas.minhas_tarefas.qryMinhasTarefas', handler: handleQryMinhasTarefas },
  { key: 'tarefas.minhas_tarefas.qryTarefa', handler: handleQryTarefa },
];

async function handleCmdAceitar(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdAceitar']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdAceitar']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdAceitar"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdAceitar']['output'], error: null };
}

async function handleCmdCancelar(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdCancelar']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdCancelar']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdCancelar"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdCancelar']['output'], error: null };
}

async function handleCmdCriarTarefa(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdCriarTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['chaveCriacao', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId', 'criadorId', 'checklist', 'checklist.id', 'checklist.version', 'checklist.details', 'checklist.details.descricao', 'checklist.ordem', 'checklist.feito']);
  const invalid = validateInput(scoped, ['chaveCriacao', 'listaId', 'titulo', 'details', 'prioridade', 'prazo', 'responsavelId', 'checklist.details', 'checklist.details.descricao', 'checklist.ordem', 'checklist.feito'], ['chaveCriacao', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId', 'criadorId', 'checklist', 'checklist.id', 'checklist.version', 'checklist.details', 'checklist.details.descricao', 'checklist.ordem', 'checklist.feito'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdCriarTarefa']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdCriarTarefa"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdCriarTarefa']['output'], error: null };
}

async function handleCmdDevolver(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdDevolver']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version', 'details', 'details.motivoDevolucao']);
  const invalid = validateInput(scoped, ['id', 'version', 'details', 'details.motivoDevolucao'], ['id', 'version', 'details', 'details.motivoDevolucao'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdDevolver']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdDevolver"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdDevolver']['output'], error: null };
}

async function handleCmdEnviarRevisao(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdEnviarRevisao']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdEnviarRevisao']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdEnviarRevisao"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdEnviarRevisao']['output'], error: null };
}

async function handleCmdIniciar(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdIniciar']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdIniciar']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdIniciar"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdIniciar']['output'], error: null };
}

async function handleCmdSalvarChecklist(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdSalvarChecklist']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['tarefaId', 'itens', 'itens.id', 'itens.version', 'itens.details', 'itens.details.descricao', 'itens.ordem', 'itens.feito']);
  const invalid = validateInput(scoped, ['tarefaId', 'itens', 'itens.details', 'itens.details.descricao', 'itens.ordem', 'itens.feito'], ['tarefaId', 'itens', 'itens.id', 'itens.version', 'itens.details', 'itens.details.descricao', 'itens.ordem', 'itens.feito'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdSalvarChecklist']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdSalvarChecklist"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdSalvarChecklist']['output'], error: null };
}

async function handleCmdSalvarEdicao(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdSalvarEdicao']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId']);
  const invalid = validateInput(scoped, ['id', 'version', 'listaId', 'titulo', 'details', 'prioridade', 'prazo', 'responsavelId'], ['id', 'version', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdSalvarEdicao']['input'];
  const data = await requests["tarefas.minhas_tarefas.cmdSalvarEdicao"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cmdSalvarEdicao']['output'], error: null };
}

async function handleQryBuscarMembros(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.qryBuscarMembros']['output']>> {
  const held = authorize(input.request, ['membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['termo']);
  const invalid = validateInput(scoped, ['termo'], ['termo'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryBuscarMembros']['input'];
  const data = await requests["tarefas.minhas_tarefas.qryBuscarMembros"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryBuscarMembros']['output'], error: null };
}

async function handleQryListasAtivas(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.qryListasAtivas']['output']>> {
  const held = authorize(input.request, ['membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, []);
  const invalid = validateInput(scoped, [], [], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryListasAtivas']['input'];
  const data = await requests["tarefas.minhas_tarefas.qryListasAtivas"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryListasAtivas']['output'], error: null };
}

async function handleQryMinhasTarefas(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.qryMinhasTarefas']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['filtro', 'page', 'pageSize']);
  const invalid = validateInput(scoped, ['page', 'pageSize'], ['filtro', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryMinhasTarefas']['input'];
  const data = await requests["tarefas.minhas_tarefas.qryMinhasTarefas"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryMinhasTarefas']['output'], error: null };
}

async function handleQryTarefa(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.qryTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['tarefaId']);
  const invalid = validateInput(scoped, ['tarefaId'], ['tarefaId'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryTarefa']['input'];
  const data = await requests["tarefas.minhas_tarefas.qryTarefa"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.qryTarefa']['output'], error: null };
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
    // A list on the way applies the rest of the path to each of its items: an empty list requires nothing.
    const missing = (value: unknown, parts: readonly string[], path: string, top: boolean): string => {
      if (parts.length === 0) return value === undefined || (value === null && !nullable.includes(field)) || value === '' ? path : '';
      if (!top && (value === undefined || value === null)) return '';
      if (Array.isArray(value)) {
        for (const [index, item] of value.entries()) { const found = missing(item, parts, `${path}[${index}]`, false); if (found) return found; }
        return '';
      }
      const next = value && typeof value === 'object' ? (value as Record<string, unknown>)[parts[0]] : undefined;
      return missing(next, parts.slice(1), path ? `${path}.${parts[0]}` : parts[0], false);
    };
    const found = missing(body, field.split('.'), '', true);
    if (found) return new AppError('VALIDATION_ERROR', `${found} is required.`, 400);
  }
  return null;
}

