/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/http/controllers/minhas_despesas.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.js';
import { requests } from '/_102047_/l1/reembolsoDespesas/layer_2_application/requests/minhas_despesas.js';
import type { Minhas_despesasContracts } from '/_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.js';

export const routes: ControllerRoute[] = [
  { key: 'reembolsoDespesas.minhas_despesas.enviarParaAprovacao', handler: handleEnviarParaAprovacao },
  { key: 'reembolsoDespesas.minhas_despesas.listarMinhasDespesas', handler: handleListarMinhasDespesas },
  { key: 'reembolsoDespesas.minhas_despesas.obterDespesa', handler: handleObterDespesa },
  { key: 'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao', handler: handleReenviarParaAprovacao },
  { key: 'reembolsoDespesas.minhas_despesas.registrarDespesa', handler: handleRegistrarDespesa },
  { key: 'reembolsoDespesas.minhas_despesas.salvarCorrecao', handler: handleSalvarCorrecao },
];

async function handleEnviarParaAprovacao(input: IRequestEnvelope): Promise<BffResponse<Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.enviarParaAprovacao']['output']>> {
  const denied = authorize(input.request, ['colaboradorGerenciaPropriasDespesas']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['colaboradorGerenciaPropriasDespesas']) as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.enviarParaAprovacao']['input'];
  const data = await requests["reembolsoDespesas.minhas_despesas.enviarParaAprovacao"](params, input.ctx);
  return { ok: true, data: data as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.enviarParaAprovacao']['output'], error: null };
}

async function handleListarMinhasDespesas(input: IRequestEnvelope): Promise<BffResponse<Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.listarMinhasDespesas']['output']>> {
  const denied = authorize(input.request, ['colaboradorGerenciaPropriasDespesas']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['page', 'pageSize'], ['status', 'page', 'pageSize'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['colaboradorGerenciaPropriasDespesas']) as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.listarMinhasDespesas']['input'];
  const data = await requests["reembolsoDespesas.minhas_despesas.listarMinhasDespesas"](params, input.ctx);
  return { ok: true, data: data as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.listarMinhasDespesas']['output'], error: null };
}

async function handleObterDespesa(input: IRequestEnvelope): Promise<BffResponse<Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.obterDespesa']['output']>> {
  const denied = authorize(input.request, ['colaboradorGerenciaPropriasDespesas']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id'], ['id'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['colaboradorGerenciaPropriasDespesas']) as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.obterDespesa']['input'];
  const data = await requests["reembolsoDespesas.minhas_despesas.obterDespesa"](params, input.ctx);
  return { ok: true, data: data as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.obterDespesa']['output'], error: null };
}

async function handleReenviarParaAprovacao(input: IRequestEnvelope): Promise<BffResponse<Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.reenviarParaAprovacao']['output']>> {
  const denied = authorize(input.request, ['colaboradorGerenciaPropriasDespesas']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id', 'version'], ['id', 'version'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['colaboradorGerenciaPropriasDespesas']) as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.reenviarParaAprovacao']['input'];
  const data = await requests["reembolsoDespesas.minhas_despesas.reenviarParaAprovacao"](params, input.ctx);
  return { ok: true, data: data as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.reenviarParaAprovacao']['output'], error: null };
}

async function handleRegistrarDespesa(input: IRequestEnvelope): Promise<BffResponse<Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.registrarDespesa']['output']>> {
  const denied = authorize(input.request, ['colaboradorGerenciaPropriasDespesas']);
  if (denied) throw denied;
  // colaboradorId comes from the session (own scope): fill it before validating, or an empty one from the page is refused.
  const params = scopeParams(input.request.params, input.ctx, ['colaboradorGerenciaPropriasDespesas']) as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.registrarDespesa']['input'];
  const invalid = validateInput(params, ['colaboradorId', 'details', 'details.dataDespesa', 'details.categoria', 'details.valor', 'details.descricao'], ['colaboradorId', 'details', 'details.dataDespesa', 'details.categoria', 'details.valor', 'details.descricao'], []);
  if (invalid) throw invalid;
  const data = await requests["reembolsoDespesas.minhas_despesas.registrarDespesa"](params, input.ctx);
  return { ok: true, data: data as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.registrarDespesa']['output'], error: null };
}

async function handleSalvarCorrecao(input: IRequestEnvelope): Promise<BffResponse<Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.salvarCorrecao']['output']>> {
  const denied = authorize(input.request, ['colaboradorGerenciaPropriasDespesas']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['id', 'version', 'details', 'details.dataDespesa', 'details.categoria', 'details.valor', 'details.descricao'], ['id', 'version', 'details', 'details.dataDespesa', 'details.categoria', 'details.valor', 'details.descricao'], []);
  if (invalid) throw invalid;
  const params = scopeParams(input.request.params, input.ctx, ['colaboradorGerenciaPropriasDespesas']) as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.salvarCorrecao']['input'];
  const data = await requests["reembolsoDespesas.minhas_despesas.salvarCorrecao"](params, input.ctx);
  return { ok: true, data: data as Minhas_despesasContracts['reembolsoDespesas.minhas_despesas.salvarCorrecao']['output'], error: null };
}

function scopeParams(params: unknown, ctx: { sessionContext?: { actorId?: string } }, grantIds: readonly string[]): Record<string, unknown> {
  const body = params && typeof params === 'object' && !Array.isArray(params) ? { ...(params as Record<string, unknown>) } : {};
  for (const grantId of grantIds) {
    const resolved = resolveGrant(grantId);
    if (!('grantId' in resolved) || resolved.scopeMode !== 'own' || !resolved.recordField) continue;
    const actorId = ctx.sessionContext?.actorId ?? '';
    if (!actorId) throw new AppError('FORBIDDEN_ACTOR', 'You have no identity for this scope.', 403);
    // enforce:scope
    body[resolved.recordField] = actorId;
  }
  return body;
}

function authorize(request: BffRequest, grantIds: readonly string[]): AppError | null {
  const source = request.meta?.source ?? 'http';
  const authorities = request.meta?.verifiedAuthorities ?? [];
  // TODO(login): o login ainda não está implementado, então nenhuma chamada traz verifiedAuthorities.
  // Reativar quando o login emitir as autoridades.
  // if (source === 'http' && authorities.length === 0) {
  //   return new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
  // }
  void source;
  for (const grantId of grantIds) {
    const resolved = resolveGrant(grantId);
    if (!('grantId' in resolved)) return new AppError(resolved.code, resolved.detail, 403);
    if (resolved.pending) return new AppError(resolved.pending, `Grant ${grantId} is pending ${resolved.pending}.`, 403);
    const actorRef = actorRefFor(grantId);
    if (!actorRef) return new AppError('AUTHORITY_UNMAPPED', `Grant ${grantId} has no actor in the authority map.`, 403);
    if (authorities.length > 0 && !authorities.some(item => item === actorRef || item.endsWith(':' + actorRef))) {
      return new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
    }
  }
  return null;
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

