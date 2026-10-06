/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_2_application/usecases/listMesa.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Mesa } from '/_102047_/l1/comandaRestaurante/layer_3_domain/entities/mesa.js';
import type { MesaRepository } from '/_102047_/l1/comandaRestaurante/layer_2_application/ports/mesaRepository.js';

export interface ListMesaInput extends Record<string, unknown> {
  code?: string;
  page?: number;
  pageSize?: number;
}

export interface ListMesaOutput extends Record<string, unknown> {
  items: Mesa[];
  hasMore: boolean;
}

export async function listMesa(input: ListMesaInput, ctx: RequestContext): Promise<ListMesaOutput> {
  const mesaRepository = resolveRepository<MesaRepository>(ctx, 'MesaRepository');
  const filter: Record<string, unknown> = {};
  const rawCode: unknown = input.code;
  if (rawCode !== undefined && rawCode !== null && String(rawCode) !== '') {
    filter.code = String(rawCode);
  }

  const found = await mesaRepository.list(filter);
  const rawPage: unknown = input.page;
  const rawPageSize: unknown = input.pageSize;
  const parsedPage = Number(rawPage);
  const parsedPageSize = Number(rawPageSize);
  const page = Number.isFinite(parsedPage) && parsedPage >= 1 ? Math.trunc(parsedPage) : 1;
  const pageSize = Number.isFinite(parsedPageSize) && parsedPageSize >= 1
    ? Math.min(200, Math.trunc(parsedPageSize))
    : 20;
  const start = (page - 1) * pageSize;

  return {
    items: found.slice(start, start + pageSize),
    hasMore: start + pageSize < found.length,
  };
}
