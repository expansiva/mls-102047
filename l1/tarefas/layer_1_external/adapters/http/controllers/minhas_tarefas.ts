/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/minhas_tarefas.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/tarefas/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/tarefas/layer_1_external/auth/authorityMap.js';
import { requests } from '/_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.js';
import type { Minhas_tarefasContracts } from '/_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.js';

export const routes: ControllerRoute[] = [
  { key: 'tarefas.minhas_tarefas.aceitarEntrega', handler: handleAceitarEntrega },
  { key: 'tarefas.minhas_tarefas.cancelarTarefa', handler: handleCancelarTarefa },
  { key: 'tarefas.minhas_tarefas.devolverComMotivo', handler: handleDevolverComMotivo },
  { key: 'tarefas.minhas_tarefas.enviarParaRevisao', handler: handleEnviarParaRevisao },
  { key: 'tarefas.minhas_tarefas.iniciarTarefa', handler: handleIniciarTarefa },
  { key: 'tarefas.minhas_tarefas.marcarItemChecklist', handler: handleMarcarItemChecklist },
  { key: 'tarefas.minhas_tarefas.minhasTarefas', handler: handleMinhasTarefas },
  { key: 'tarefas.minhas_tarefas.salvarEdicaoTarefa', handler: handleSalvarEdicaoTarefa },
  { key: 'tarefas.minhas_tarefas.salvarNovaTarefa', handler: handleSalvarNovaTarefa },
  { key: 'tarefas.minhas_tarefas.tarefaAberta', handler: handleTarefaAberta },
  { key: 'tarefas.minhas_tarefas.opcoesFormulario', handler: handleOpcoesFormulario },
  { key: 'tarefas.minhas_tarefas.buscarResponsaveis', handler: handleBuscarResponsaveis },
];

async function handleAceitarEntrega(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.aceitarEntrega']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.aceitarEntrega']['input'];
  const data = await requests["tarefas.minhas_tarefas.aceitarEntrega"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.aceitarEntrega']['output'], error: null };
}

async function handleCancelarTarefa(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.cancelarTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.cancelarTarefa']['input'];
  const data = await requests["tarefas.minhas_tarefas.cancelarTarefa"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.cancelarTarefa']['output'], error: null };
}

async function handleDevolverComMotivo(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.devolverComMotivo']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version', 'details', 'details.motivoDevolucao']);
  const invalid = validateInput(scoped, ['id', 'version', 'details', 'details.motivoDevolucao'], ['id', 'version', 'details', 'details.motivoDevolucao'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.devolverComMotivo']['input'];
  const data = await requests["tarefas.minhas_tarefas.devolverComMotivo"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.devolverComMotivo']['output'], error: null };
}

async function handleEnviarParaRevisao(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.enviarParaRevisao']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.enviarParaRevisao']['input'];
  const data = await requests["tarefas.minhas_tarefas.enviarParaRevisao"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.enviarParaRevisao']['output'], error: null };
}

async function handleIniciarTarefa(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.iniciarTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version']);
  const invalid = validateInput(scoped, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.iniciarTarefa']['input'];
  const data = await requests["tarefas.minhas_tarefas.iniciarTarefa"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.iniciarTarefa']['output'], error: null };
}

async function handleMarcarItemChecklist(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.marcarItemChecklist']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version', 'feito']);
  const invalid = validateInput(scoped, ['id', 'version', 'feito'], ['id', 'version', 'feito'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.marcarItemChecklist']['input'];
  const data = await requests["tarefas.minhas_tarefas.marcarItemChecklist"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.marcarItemChecklist']['output'], error: null };
}

async function handleMinhasTarefas(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.minhasTarefas']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['criadasPorMim', 'atribuidasAMim', 'status', 'somenteDevolvidas', 'page', 'pageSize']);
  const invalid = validateInput(scoped, ['page', 'pageSize'], ['criadasPorMim', 'atribuidasAMim', 'status', 'somenteDevolvidas', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.minhasTarefas']['input'];
  const data = await requests["tarefas.minhas_tarefas.minhasTarefas"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.minhasTarefas']['output'], error: null };
}

async function handleSalvarEdicaoTarefa(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.salvarEdicaoTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['id', 'version', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId', 'checklist', 'checklist.id', 'checklist.version', 'checklist.ordem', 'checklist.details', 'checklist.details.details', 'checklist.details.details.descricao']);
  const invalid = validateInput(scoped, ['id', 'version', 'listaId', 'titulo', 'details', 'prioridade', 'prazo', 'responsavelId', 'checklist.ordem', 'checklist.details', 'checklist.details.details', 'checklist.details.details.descricao'], ['id', 'version', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId', 'checklist', 'checklist.id', 'checklist.version', 'checklist.ordem', 'checklist.details', 'checklist.details.details', 'checklist.details.details.descricao'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.salvarEdicaoTarefa']['input'];
  const data = await requests["tarefas.minhas_tarefas.salvarEdicaoTarefa"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.salvarEdicaoTarefa']['output'], error: null };
}

async function handleSalvarNovaTarefa(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.salvarNovaTarefa']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['chaveCriacao', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId', 'criadorId', 'checklist', 'checklist.id', 'checklist.version', 'checklist.ordem', 'checklist.details', 'checklist.details.details', 'checklist.details.details.descricao']);
  const invalid = validateInput(scoped, ['chaveCriacao', 'listaId', 'titulo', 'details', 'prioridade', 'prazo', 'responsavelId', 'criadorId', 'checklist.ordem', 'checklist.details', 'checklist.details.details', 'checklist.details.details.descricao'], ['chaveCriacao', 'listaId', 'titulo', 'details', 'details.descricao', 'prioridade', 'prazo', 'responsavelId', 'criadorId', 'checklist', 'checklist.id', 'checklist.version', 'checklist.ordem', 'checklist.details', 'checklist.details.details', 'checklist.details.details.descricao'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.salvarNovaTarefa']['input'];
  const data = await requests["tarefas.minhas_tarefas.salvarNovaTarefa"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.salvarNovaTarefa']['output'], error: null };
}

async function handleTarefaAberta(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.tarefaAberta']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['tarefaId']);
  const invalid = validateInput(scoped, ['tarefaId'], ['tarefaId'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.tarefaAberta']['input'];
  const data = await requests["tarefas.minhas_tarefas.tarefaAberta"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.tarefaAberta']['output'], error: null };
}

async function handleOpcoesFormulario(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.opcoesFormulario']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, []);
  const invalid = validateInput(scoped, [], [], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.opcoesFormulario']['input'];
  const data = await requests["tarefas.minhas_tarefas.opcoesFormulario"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.opcoesFormulario']['output'], error: null };
}

async function handleBuscarResponsaveis(input: IRequestEnvelope): Promise<BffResponse<Minhas_tarefasContracts['tarefas.minhas_tarefas.buscarResponsaveis']['output']>> {
  const held = authorize(input.request, ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']);
  if (held instanceof AppError) throw held;
  const scoped = scopeParams(input.request.params, input.ctx, held, ['termo']);
  const invalid = validateInput(scoped, ['termo'], ['termo'], []);
  if (invalid) throw invalid;
  const params = scoped as Minhas_tarefasContracts['tarefas.minhas_tarefas.buscarResponsaveis']['input'];
  const data = await requests["tarefas.minhas_tarefas.buscarResponsaveis"](params, input.ctx);
  return { ok: true, data: data as Minhas_tarefasContracts['tarefas.minhas_tarefas.buscarResponsaveis']['output'], error: null };
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

