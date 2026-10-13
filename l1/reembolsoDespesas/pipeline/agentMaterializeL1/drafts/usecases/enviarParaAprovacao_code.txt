/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/enviarParaAprovacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

export interface EnviarParaAprovacaoInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface EnviarParaAprovacaoOutput extends Record<string, unknown> {
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

function isBlank(value: unknown): boolean {
  return value === undefined || value === null || String(value).trim() === '';
}

export async function enviarParaAprovacao(input: EnviarParaAprovacaoInput, ctx: RequestContext): Promise<EnviarParaAprovacaoOutput> {
  const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

  const id = String(input.id ?? '');
  if (id === '') throw new AppError('VALIDATION_ERROR', 'The expense id is required.', 400);
  const inputVersion = Number(input.version);
  if (!Number.isFinite(inputVersion)) throw new AppError('VALIDATION_ERROR', 'The expense version is required.', 400);

  const current = await repository.get(id);
  if (!current) throw new AppError('NOT_FOUND', 'Expense not found.', 404);

  // expenseOwnerOnly: only the collaborator who registered the expense may submit it
  const actorMdmId = ctx.sessionContext.person?.mdmId;
  if (!actorMdmId) {
    throw new AppError('FORBIDDEN', 'The session has no identified collaborator to own the expense.', 403, { ruleId: 'expenseOwnerOnly' });
  }
  if (String(current.colaboradorId) !== actorMdmId) {
    throw new AppError('FORBIDDEN', 'Only the collaborator who registered the expense can submit it.', 403, { ruleId: 'expenseOwnerOnly' });
  }

  if (current.status !== 'draft') {
    throw new AppError('INVALID_STATE', 'Only a draft expense can be sent for approval.', 409);
  }
  if (Number(current.version) !== inputVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  // validExpenseData: date, category, amount and description are required
  const details = current.details;
  if (!details) {
    throw new AppError('VALIDATION_ERROR', 'The expense details are required.', 400, { ruleId: 'validExpenseData' });
  }
  if (isBlank(details.dataDespesa)) {
    throw new AppError('VALIDATION_ERROR', 'The expense date is required.', 400, { ruleId: 'validExpenseData' });
  }
  if (isBlank(details.categoria) || String(details.categoria).length > 120) {
    throw new AppError('VALIDATION_ERROR', 'The expense category is required and must have at most 120 characters.', 400, { ruleId: 'validExpenseData' });
  }
  const amount = Number(details.valor);
  if (isBlank(details.valor) || !Number.isFinite(amount) || amount < 0.01) {
    throw new AppError('VALIDATION_ERROR', 'The expense amount must be at least 0.01.', 400, { ruleId: 'validExpenseData' });
  }
  if (isBlank(details.descricao) || String(details.descricao).length > 2000) {
    throw new AppError('VALIDATION_ERROR', 'The expense description is required and must have at most 2000 characters.', 400, { ruleId: 'validExpenseData' });
  }

  const next: Despesa = {
    id: current.id,
    version: current.version,
    colaboradorId: current.colaboradorId,
    status: 'awaitingApproval',
    details: { ...current.details },
  };

  const saved = await repository.transition(next, 'enviarParaAprovacao');

  const output: EnviarParaAprovacaoOutput = {
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
    },
  };
  if (saved.details.motivoRejeicao !== undefined) output.details.motivoRejeicao = saved.details.motivoRejeicao;
  if (saved.details.dataPagamento !== undefined) output.details.dataPagamento = saved.details.dataPagamento;
  return output;
}
