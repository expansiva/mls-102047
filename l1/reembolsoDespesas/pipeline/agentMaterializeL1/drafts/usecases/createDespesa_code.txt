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

function requiredText(value: unknown, field: string): string {
  const text = typeof value === 'string' ? value.trim() : value === undefined || value === null ? '' : String(value).trim();
  if (text === '') {
    throw new AppError('INVALID_EXPENSE_DATA', `Field ${field} is required to register an expense.`, 400, { ruleId: 'validExpenseData' });
  }
  return text;
}

export async function createDespesa(input: CreateDespesaInput, ctx: RequestContext): Promise<CreateDespesaOutput> {
  const despesaRepository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

  const colaboradorId = String(input.colaboradorId ?? '').trim();
  if (colaboradorId === '') {
    throw new AppError('INVALID_EXPENSE_DATA', 'Field colaboradorId is required to register an expense.', 400, { ruleId: 'validExpenseData' });
  }

  const details = input.details as Partial<CreateDespesaInput['details']> | undefined;
  const dataDespesa = requiredText(details?.dataDespesa, 'details.dataDespesa');
  const categoria = requiredText(details?.categoria, 'details.categoria');
  const valor = requiredText(details?.valor, 'details.valor');
  const descricao = requiredText(details?.descricao, 'details.descricao');

  const valorNumber = Number(valor);
  if (!Number.isFinite(valorNumber) || valorNumber < 0.01) {
    throw new AppError('INVALID_EXPENSE_DATA', 'Field details.valor must be at least 0.01.', 400, { ruleId: 'validExpenseData' });
  }
  if (categoria.length > 120) {
    throw new AppError('INVALID_EXPENSE_DATA', 'Field details.categoria must have at most 120 characters.', 400, { ruleId: 'validExpenseData' });
  }
  if (descricao.length > 2000) {
    throw new AppError('INVALID_EXPENSE_DATA', 'Field details.descricao must have at most 2000 characters.', 400, { ruleId: 'validExpenseData' });
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

  const saved = await despesaRepository.create(record);

  const output: CreateDespesaOutput = {
    id: saved.id,
    version: saved.version,
    colaboradorId: saved.colaboradorId,
    status: saved.status,
    details: {
      dataDespesa: saved.details.dataDespesa,
      categoria: saved.details.categoria,
      valor: saved.details.valor,
      descricao: saved.details.descricao,
      reenvioRealizado: saved.details.reenvioRealizado,
      ...(saved.details.motivoRejeicao !== undefined ? { motivoRejeicao: saved.details.motivoRejeicao } : {}),
      ...(saved.details.dataPagamento !== undefined ? { dataPagamento: saved.details.dataPagamento } : {}),
    },
  };
  return output;
}
