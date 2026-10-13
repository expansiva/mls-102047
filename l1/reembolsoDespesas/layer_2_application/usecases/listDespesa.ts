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

function filledText(value: unknown): value is string | number {
  return (typeof value === 'string' && value.trim() !== '') || typeof value === 'number';
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export async function listDespesa(input: ListDespesaInput, ctx: RequestContext): Promise<ListDespesaOutput> {
  const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

  const where: Record<string, unknown> = {};
  if (filledText(input.id)) where.id = String(input.id);
  if (filledText(input.colaboradorId)) where.colaboradorId = String(input.colaboradorId);
  if (filledText(input.status)) where.status = String(input.status);

  const found = await repository.list(where);

  const details = input.details;
  const exactDetails: Array<[keyof Despesa['details'], unknown]> = [
    ['dataDespesa', details?.dataDespesa],
    ['categoria', details?.categoria],
    ['valor', details?.valor],
    ['dataPagamento', details?.dataPagamento],
  ];
  const containsDetails: Array<[keyof Despesa['details'], unknown]> = [
    ['descricao', details?.descricao],
    ['motivoRejeicao', details?.motivoRejeicao],
  ];
  const reenvio = typeof details?.reenvioRealizado === 'boolean' ? details.reenvioRealizado : undefined;

  const kept = found.filter((despesa) => {
    for (const [field, expected] of exactDetails) {
      if (!filledText(expected)) continue;
      if (String(despesa.details?.[field] ?? '') !== String(expected)) return false;
    }
    for (const [field, term] of containsDetails) {
      if (!filledText(term)) continue;
      const stored = despesa.details?.[field];
      if (typeof stored !== 'string') return false;
      if (!normalizeText(stored).includes(normalizeText(String(term)))) return false;
    }
    if (reenvio !== undefined && despesa.details?.reenvioRealizado !== reenvio) return false;
    return true;
  });

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = kept.slice(start, start + size);
  return { items, hasMore: start + size < kept.length };
}
