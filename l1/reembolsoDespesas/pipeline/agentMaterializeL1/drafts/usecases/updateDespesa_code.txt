/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/updateDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

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

  if (input.id === undefined || input.id === null || String(input.id) === '') {
    throw new AppError('INVALID_INPUT', 'The id of the despesa is required.', 400);
  }
  const id = String(input.id);

  const found = await repository.list({ id });
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Despesa not found.', 404);

  if (input.version !== undefined && input.version !== null) {
    const inputVersion = Number(input.version);
    if (!Number.isFinite(inputVersion) || inputVersion !== current.version) {
      throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
    }
  }

  if (current.status !== 'rejected' && current.status !== 'draft') {
    throw new AppError('INVALID_STATE', 'Only a draft or rejected despesa can be updated.', 409);
  }

  const given = input.details;
  const dataDespesa = given?.dataDespesa !== undefined && given?.dataDespesa !== null ? String(given.dataDespesa) : current.details.dataDespesa;
  const categoria = given?.categoria !== undefined && given?.categoria !== null ? String(given.categoria) : current.details.categoria;
  const valor = given?.valor !== undefined && given?.valor !== null ? String(given.valor) : current.details.valor;
  const descricao = given?.descricao !== undefined && given?.descricao !== null ? String(given.descricao) : current.details.descricao;

  if (!dataDespesa.trim()) {
    throw new AppError('INVALID_EXPENSE_DATA', 'The date of the despesa is required.', 400, { ruleId: 'validExpenseData' });
  }
  if (!categoria.trim()) {
    throw new AppError('INVALID_EXPENSE_DATA', 'The category of the despesa is required.', 400, { ruleId: 'validExpenseData' });
  }
  if (!descricao.trim()) {
    throw new AppError('INVALID_EXPENSE_DATA', 'The description of the despesa is required.', 400, { ruleId: 'validExpenseData' });
  }
  const valorNumber = Number(valor);
  if (!valor.trim() || !Number.isFinite(valorNumber) || valorNumber < 0.01) {
    throw new AppError('INVALID_EXPENSE_DATA', 'The value of the despesa must be at least 0.01.', 400, { ruleId: 'validExpenseData' });
  }

  const next: Despesa = {
    ...current,
    details: {
      ...current.details,
      dataDespesa,
      categoria,
      valor,
      descricao,
    },
  };

  const saved = await repository.update(next);
  return {
    id: saved.id,
    version: saved.version,
    colaboradorId: saved.colaboradorId,
    status: saved.status,
    details: {
      dataDespesa: saved.details.dataDespesa,
      categoria: saved.details.categoria,
      valor: saved.details.valor,
      descricao: saved.details.descricao,
      motivoRejeicao: saved.details.motivoRejeicao,
      reenvioRealizado: saved.details.reenvioRealizado,
      dataPagamento: saved.details.dataPagamento,
    },
  };
}
