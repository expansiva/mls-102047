/// <mls fileReference="_102047_/l1/controleEstoque/layer_1_external/adapters/http/controllers/produtos.ts" enhancement="_blank"/>
import { AppError, type BffRequest, type BffResponse, type ControllerRoute, type IRequestEnvelope } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveGrant } from '/_102047_/l1/controleEstoque/layer_2_application/scope/accessScope.js';
import { actorRefFor } from '/_102047_/l1/controleEstoque/layer_1_external/auth/authorityMap.js';
import { createMovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/createMovimentacaoEstoque.js';
import { createProduto } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/createProduto.js';
import { listMovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.js';
import { listProduto } from '/_102047_/l1/controleEstoque/layer_2_application/usecases/listProduto.js';
import type { CreateMovimentacaoEstoqueInput } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import type { CreateProdutoInput } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import type { ListMovimentacaoEstoqueInput } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import type { ListProdutoInput } from '/_102047_/l2/controleEstoque/web/contracts/produtos.defs.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { MovimentacaoEstoqueRepository } from '/_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.js';

export const routes: ControllerRoute[] = [
  { key: 'controleEstoque.produtos.cmdCreateMovimentacaoEstoque', handler: handleCmdCreateMovimentacaoEstoque },
  { key: 'controleEstoque.produtos.cmdCreateProduto', handler: handleCmdCreateProduto },
  { key: 'controleEstoque.produtos.qryListMovimentacaoEstoque', handler: handleQryListMovimentacaoEstoque },
  { key: 'controleEstoque.produtos.qryListProduto', handler: handleQryListProduto },
];

async function handleCmdCreateMovimentacaoEstoque(input: IRequestEnvelope): Promise<BffResponse> {
  const denied = authorize(input.request, ['gerenciarEstoque']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['produtoId', 'movimentadoEm', 'details', 'details.tipo', 'details.quantidade'], ['produtoId', 'movimentadoEm', 'details', 'details.tipo', 'details.quantidade'], []);
  if (invalid) throw invalid;
  const data = await createMovimentacaoEstoque(scopeParams(input.request.params, input.ctx, ['gerenciarEstoque']) as unknown as CreateMovimentacaoEstoqueInput, input.ctx, { movimentacaoEstoqueRepository: resolveRepository<MovimentacaoEstoqueRepository>(input.ctx, 'MovimentacaoEstoqueRepository') });
  return { ok: true, data: projectOutput(data, ['id', 'version', 'produtoId', 'movimentadoEm', 'details.tipo', 'details.quantidade', 'movimentacaoEstoqueProduto.id', 'movimentacaoEstoqueProduto.details.identification.name']), error: null };
}

async function handleCmdCreateProduto(input: IRequestEnvelope): Promise<BffResponse> {
  const denied = authorize(input.request, ['gerenciarEstoque']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, ['details', 'details.identification.name', 'details.product.unitOfMeasure', 'details.controleEstoque.quantidadeMinima'], ['details', 'details.identification', 'details.identification.name', 'details.product', 'details.product.unitOfMeasure', 'details.controleEstoque', 'details.controleEstoque.quantidadeMinima'], []);
  if (invalid) throw invalid;
  const data = await createProduto(scopeParams(input.request.params, input.ctx, ['gerenciarEstoque']) as unknown as CreateProdutoInput, input.ctx);
  return { ok: true, data: projectOutput(data, ['id', 'version', 'details.identification.subtype', 'details.identification.name', 'details.identification.status', 'details.base', 'details.product.unitOfMeasure', 'details.general', 'details.controleEstoque.quantidadeMinima', 'details.controleEstoque.saldoAtual', 'details.controleEstoque.saldoAbaixoDoMinimo']), error: null };
}

async function handleQryListMovimentacaoEstoque(input: IRequestEnvelope): Promise<BffResponse> {
  const denied = authorize(input.request, ['gerenciarEstoque']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, [], ['id', 'produtoId', 'movimentadoEm', 'page'], []);
  if (invalid) throw invalid;
  const data = await listMovimentacaoEstoque(scopeParams(input.request.params, input.ctx, ['gerenciarEstoque']) as unknown as ListMovimentacaoEstoqueInput, input.ctx, { movimentacaoEstoqueRepository: resolveRepository<MovimentacaoEstoqueRepository>(input.ctx, 'MovimentacaoEstoqueRepository') });
  return { ok: true, data: projectOutput(data, ['id', 'version', 'produtoId', 'movimentadoEm', 'details.tipo', 'details.quantidade', 'movimentacaoEstoqueProduto.id', 'movimentacaoEstoqueProduto.details.identification.name']), error: null };
}

async function handleQryListProduto(input: IRequestEnvelope): Promise<BffResponse> {
  const denied = authorize(input.request, ['gerenciarEstoque']);
  if (denied) throw denied;
  const invalid = validateInput(input.request.params, [], ['id', 'details', 'details.identification', 'details.identification.subtype', 'details.identification.name', 'details.identification.status', 'page'], []);
  if (invalid) throw invalid;
  const data = await listProduto(scopeParams(input.request.params, input.ctx, ['gerenciarEstoque']) as unknown as ListProdutoInput, input.ctx);
  return { ok: true, data: projectOutput(data, ['id', 'version', 'details.identification.subtype', 'details.identification.name', 'details.identification.status', 'details.base', 'details.product.unitOfMeasure', 'details.general', 'details.controleEstoque.quantidadeMinima', 'details.controleEstoque.saldoAtual', 'details.controleEstoque.saldoAbaixoDoMinimo']), error: null };
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
  if (source === 'http' && authorities.length === 0) {
    return new AppError('FORBIDDEN_ACTOR', 'You have no authority to call this routine.', 403);
  }
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

// A path in `fields` is copied whole; an ancestor of one is walked; anything else is dropped.
function projectOutput(data: unknown, fields: readonly string[], prefix = ''): unknown {
  if (Array.isArray(data)) return data.map(item => projectOutput(item, fields, prefix));
  const source = data && typeof data === 'object' ? data as Record<string, unknown> : {};
  const projected: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(source)) {
    const path = prefix ? prefix + '.' + key : key;
    if (fields.includes(path)) projected[key] = child;
    else if (child && typeof child === 'object' && fields.some(field => field.startsWith(path + '.'))) projected[key] = projectOutput(child, fields, path);
  }
  return projected;
}
