/// <mls fileReference="_102047_/l1/controleEstoque/layer_2_application/usecases/listMovimentacaoEstoque.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MovimentacaoEstoque } from '/_102047_/l1/controleEstoque/layer_3_domain/entities/movimentacaoEstoque.js';
import type { MovimentacaoEstoqueRepository } from '/_102047_/l1/controleEstoque/layer_2_application/ports/movimentacaoEstoqueRepository.js';
export interface ListMovimentacaoEstoqueInput extends Record<string, unknown> {
  id: string;
  produtoId: string;
  movimentadoEm: string;
  details: {
    tipo: string;
    quantidade: number;
  };
  page: number;
  pageSize: number;
}
export interface ListMovimentacaoEstoqueOutput extends Record<string, unknown> {
  items: MovimentacaoEstoque[];
  hasMore: boolean;
}
export async function listMovimentacaoEstoque(input: ListMovimentacaoEstoqueInput, ctx: RequestContext, ports: { movimentacaoEstoqueRepository: MovimentacaoEstoqueRepository }): Promise<ListMovimentacaoEstoqueOutput> {
    const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
  const readPath = (source: unknown, path: string): unknown => { let value: unknown = source; for (const part of path.split('.')) value = value && typeof value === 'object' ? (value as Record<string, unknown>)[part] : undefined; return value; };
  const writePath = (source: Record<string, unknown>, path: string, value: unknown): void => { const parts = path.split('.'); let node = source; for (const part of parts.slice(0, -1)) node = (node[part] ??= {}) as Record<string, unknown>; node[parts[parts.length - 1]] = value; };
  const body = input;
  const where: Record<string, unknown> = {};
  if (filled(body.id)) where.id = body.id;
  if (filled(body.produtoId)) where.produtoId = body.produtoId;
  if (filled(body.movimentadoEm)) where.movimentadoEm = body.movimentadoEm;
  if (filled(body.details)) where.details = body.details;
  if (filled(readPath(body, "details.tipo"))) writePath(where, "details.tipo", readPath(body, "details.tipo"));
  if (filled(readPath(body, "details.quantidade"))) writePath(where, "details.quantidade", readPath(body, "details.quantidade"));
  const found = await ports.movimentacaoEstoqueRepository.list(where);
  const size = Number(input.pageSize);
  const start = Number(input.page) * size;
  const items = Number.isFinite(size) && size > 0 ? found.slice(start, start + size) : found;
  return { items, hasMore: Number.isFinite(size) && size > 0 ? start + size < found.length : false };
}
