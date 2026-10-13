/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

export interface ListDespesaInput extends Record<string, unknown> {
  id?: string;
  colaboradorId?: string;
  status?: string;
  details?: {
    dataDespesa?: string;
    categoria?: string;
    valor?: string;
    descricao?: string;
    motivoRejeicao?: string;
    reenvioRealizado?: boolean;
    dataPagamento?: string;
  };
  page: number;
  pageSize: number;
}

export interface ListDespesaOutput extends Record<string, unknown> {
  items: Despesa[];
  hasMore: boolean;
}

export async function listDespesa(input: ListDespesaInput, ctx: RequestContext): Promise<ListDespesaOutput> {
  const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');
  const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';

  const where: Record<string, unknown> = {};
  if (filled(input.id)) where.id = String(input.id);
  if (filled(input.colaboradorId)) where.colaboradorId = String(input.colaboradorId);
  if (filled(input.status)) where.status = String(input.status);

  const found = await repository.list(where);

  const detailFilters: Array<[keyof Despesa['details'], unknown]> = [];
  const given = input.details;
  if (given && typeof given === 'object') {
    const keys: Array<keyof Despesa['details']> = [
      'dataDespesa',
      'categoria',
      'valor',
      'descricao',
      'motivoRejeicao',
      'reenvioRealizado',
      'dataPagamento',
    ];
    for (const key of keys) {
      const value = given[key];
      if (filled(value)) detailFilters.push([key, value]);
    }
  }

  const kept = found.filter((despesa) =>
    detailFilters.every(([key, value]) => String(despesa.details?.[key]) === String(value)),
  );

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
