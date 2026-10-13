/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';

export interface UpdateDespesaInput extends Record<string, unknown> {
  colaboradorId: string;
  status: string;
  details: {
    dataDespesa: string;
    categoria: string;
    valor: string;
    descricao: string;
    motivoRejeicao?: string;
    reenvioRealizado: boolean;
    dataPagamento?: string;
  };
  id: string;
  version: number;
}

export interface UpdateDespesaOutput extends Record<string, unknown> {
  id: string;
  version: number;
  colaboradorId: string;
  status: string;
  details: {
    dataDespesa: string;
    categoria: string;
    valor: string;
    descricao: string;
    motivoRejeicao?: string;
    reenvioRealizado: boolean;
    dataPagamento?: string;
  };
}

export async function updateDespesa(input: UpdateDespesaInput, ctx: RequestContext): Promise<UpdateDespesaOutput> {
  const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

  const id = input.id === undefined || input.id === null ? '' : String(input.id);
  if (id === '') throw new AppError('VALIDATION_ERROR', 'id is required.', 400);

  const current = await repository.get(id);
  if (!current) throw new AppError('NOT_FOUND', 'Despesa not found.', 404);

  if (input.version !== undefined && input.version !== null && Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const sessionPersonId = ctx.sessionContext?.person?.mdmId;
  if (sessionPersonId && sessionPersonId !== current.colaboradorId) {
    throw new AppError('FORBIDDEN', 'A collaborator can only correct expenses they registered.', 403, { ruleId: 'expenseOwnerOnly' });
  }

  if (current.status !== 'rejected') {
    throw new AppError('INVALID_STATE', 'Only a rejected expense can be corrected.', 409);
  }

  if (input.colaboradorId !== undefined && input.colaboradorId !== null && String(input.colaboradorId) !== current.colaboradorId) {
    throw new AppError('VALIDATION_ERROR', 'The collaborator of an expense cannot be changed.', 400);
  }

  const given = input.details;
  const dataDespesa = given?.dataDespesa !== undefined && given?.dataDespesa !== null ? String(given.dataDespesa) : current.details.dataDespesa;
  const categoria = given?.categoria !== undefined && given?.categoria !== null ? String(given.categoria) : current.details.categoria;
  const valor = given?.valor !== undefined && given?.valor !== null ? String(given.valor) : current.details.valor;
  const descricao = given?.descricao !== undefined && given?.descricao !== null ? String(given.descricao) : current.details.descricao;

  const numericValor = Number(valor);
  if (
    !dataDespesa || dataDespesa.trim() === '' ||
    !categoria || categoria.trim() === '' ||
    !descricao || descricao.trim() === '' ||
    !valor || Number.isNaN(numericValor) || numericValor <= 0
  ) {
    throw new AppError('INVALID_EXPENSE_DATA', 'An expense requires date, category, a positive amount and description.', 400, { ruleId: 'validExpenseData' });
  }

  const next: Despesa = {
    id: current.id,
    version: current.version,
    colaboradorId: current.colaboradorId,
    status: current.status,
    details: {
      ...current.details,
      dataDespesa,
      categoria,
      valor,
      descricao,
    },
  };

  const saved = await repository.update(next);

  const details: UpdateDespesaOutput['details'] = {
    dataDespesa: saved.details.dataDespesa,
    categoria: saved.details.categoria,
    valor: saved.details.valor,
    descricao: saved.details.descricao,
    reenvioRealizado: saved.details.reenvioRealizado,
  };
  if (saved.details.motivoRejeicao !== undefined) details.motivoRejeicao = saved.details.motivoRejeicao;
  if (saved.details.dataPagamento !== undefined) details.dataPagamento = saved.details.dataPagamento;

  return {
    id: saved.id,
    version: saved.version,
    colaboradorId: saved.colaboradorId,
    status: saved.status,
    details,
  };
}
