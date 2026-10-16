/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { AvisoVencimento } from '/_102047_/l1/tarefas/layer_3_domain/entities/avisoVencimento.js';
import type { AvisoVencimentoRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.js';

export interface ListAvisoVencimentoInput extends Record<string, unknown> {
  id?: string;
  responsavelId?: string;
  dataReferencia?: string;
  status?: string;
  page: number;
  pageSize: number;
}

export interface ListAvisoVencimentoOutput extends Record<string, unknown> {
  items: AvisoVencimento[];
  hasMore: boolean;
}

export async function listAvisoVencimento(input: ListAvisoVencimentoInput, ctx: RequestContext): Promise<ListAvisoVencimentoOutput> {
  const repository = resolveRepository<AvisoVencimentoRepository>(ctx, 'AvisoVencimentoRepository');
  const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';
  const where: Record<string, unknown> = {};
  if (filled(input.id)) where.id = String(input.id);
  if (filled(input.responsavelId)) where.responsavelId = String(input.responsavelId);
  if (filled(input.dataReferencia)) where.dataReferencia = String(input.dataReferencia);
  if (filled(input.status)) {
    const status = String(input.status);
    if (status !== 'pending' && status !== 'completed' && status !== 'failed') {
      throw new AppError('INVALID_STATUS', 'status must be pending, completed or failed.', 400);
    }
    where.status = status;
  }
  const found = await repository.list(where);
  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = found.slice(start, start + size);
  return { items, hasMore: start + size < found.length };
}
