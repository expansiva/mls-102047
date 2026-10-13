/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/createDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

export interface CreateDespesaInput extends Record<string, unknown> {
  colaboradorId: string;
  details: {
    dataDespesa: string;
    categoria: string;
    valor: string;
    descricao: string;
  };
}

export interface CreateDespesaOutput extends Record<string, unknown> {
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

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function createDespesa(input: CreateDespesaInput, ctx: RequestContext): Promise<CreateDespesaOutput> {
  const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

  const colaboradorId = text(input.colaboradorId);
  if (colaboradorId === '') {
    throw new AppError('COLABORADOR_REQUIRED', 'colaboradorId is required to register an expense.', 400, { ruleId: 'validExpenseData' });
  }

  const dataDespesa = text(input.details?.dataDespesa);
  const categoria = text(input.details?.categoria);
  const valor = text(input.details?.valor);
  const descricao = text(input.details?.descricao);

  if (dataDespesa === '' || Number.isNaN(Date.parse(dataDespesa))) {
    throw new AppError('EXPENSE_DATE_REQUIRED', 'The expense date is required and must be a valid date.', 400, { ruleId: 'validExpenseData' });
  }
  if (categoria === '') {
    throw new AppError('EXPENSE_CATEGORY_REQUIRED', 'The expense category is required.', 400, { ruleId: 'validExpenseData' });
  }
  if (categoria.length > 120) {
    throw new AppError('EXPENSE_CATEGORY_TOO_LONG', 'The expense category must have at most 120 characters.', 400, { ruleId: 'validExpenseData' });
  }
  const valorNumber = Number(valor);
  if (valor === '' || Number.isNaN(valorNumber) || valorNumber < 0.01) {
    throw new AppError('EXPENSE_VALUE_INVALID', 'The expense value is required and must be at least 0.01.', 400, { ruleId: 'validExpenseData' });
  }
  if (descricao === '') {
    throw new AppError('EXPENSE_DESCRIPTION_REQUIRED', 'The expense description is required.', 400, { ruleId: 'validExpenseData' });
  }
  if (descricao.length > 2000) {
    throw new AppError('EXPENSE_DESCRIPTION_TOO_LONG', 'The expense description must have at most 2000 characters.', 400, { ruleId: 'validExpenseData' });
  }

  const record: Despesa = {
    id: ctx.idGenerator.newId(),
    version: 1,
    colaboradorId,
    status: 'draft',
    details: {
      dataDespesa,
      categoria,
      valor,
      descricao,
      reenvioRealizado: false,
    },
  };

  const saved = await repository.create(record);

  const details: CreateDespesaOutput['details'] = {
    dataDespesa: saved.details.dataDespesa,
    categoria: saved.details.categoria,
    valor: saved.details.valor,
    descricao: saved.details.descricao,
    reenvioRealizado: saved.details.reenvioRealizado,
  };
  if (saved.details.motivoRejeicao !== undefined) {
    details.motivoRejeicao = saved.details.motivoRejeicao;
  }
  if (saved.details.dataPagamento !== undefined) {
    details.dataPagamento = saved.details.dataPagamento;
  }

  return {
    id: saved.id,
    version: saved.version,
    colaboradorId: saved.colaboradorId,
    status: saved.status,
    details,
  };
}
