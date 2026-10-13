/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/reenviarParaAprovacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';

export interface ReenviarParaAprovacaoInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface ReenviarParaAprovacaoOutput extends Record<string, unknown> {
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

export async function reenviarParaAprovacao(input: ReenviarParaAprovacaoInput, ctx: RequestContext): Promise<ReenviarParaAprovacaoOutput> {
  const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

  if (isBlank(input.id)) {
    throw new AppError('VALIDATION_ERROR', 'The expense id is required.', 400);
  }
  const id = String(input.id);

  const found = await repository.list({ id });
  const current = found[0];
  if (!current) {
    throw new AppError('NOT_FOUND', 'Expense not found.', 404);
  }

  // expenseOwnerOnly: only the collaborator who registered the expense may resubmit it.
  const actorId = ctx.sessionContext.person?.mdmId;
  if (!actorId) {
    throw new AppError('FORBIDDEN', 'The authenticated collaborator could not be identified.', 403, { ruleId: 'expenseOwnerOnly' });
  }
  if (current.colaboradorId !== actorId) {
    throw new AppError('FORBIDDEN', 'Only the collaborator who registered the expense may resubmit it.', 403, { ruleId: 'expenseOwnerOnly' });
  }

  // Optimistic concurrency: the version sent must be the stored one.
  if (Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (current.status !== 'rejected') {
    throw new AppError('INVALID_STATE', 'Only a rejected expense can be resubmitted.', 409);
  }

  // singleResubmission: a rejected expense may be corrected and resubmitted only once.
  if (current.details.reenvioRealizado === true) {
    throw new AppError('ALREADY_RESUBMITTED', 'A rejected expense can be resubmitted only once.', 409, { ruleId: 'singleResubmission' });
  }

  // validExpenseData: date, category, amount and description are required.
  const d = current.details;
  if (isBlank(d.dataDespesa) || isBlank(d.categoria) || isBlank(d.valor) || isBlank(d.descricao)) {
    throw new AppError('VALIDATION_ERROR', 'The expense must have date, category, amount and description.', 400, { ruleId: 'validExpenseData' });
  }
  const amount = Number(d.valor);
  if (!Number.isFinite(amount) || amount < 0.01) {
    throw new AppError('VALIDATION_ERROR', 'The expense amount must be at least 0.01.', 400, { ruleId: 'validExpenseData' });
  }

  const next: Despesa = {
    id: current.id,
    version: current.version,
    colaboradorId: current.colaboradorId,
    status: 'awaitingApproval',
    details: {
      ...current.details,
      reenvioRealizado: true,
    },
  };

  const saved = await repository.transition(next, 'reenviarParaAprovacao');

  const details: ReenviarParaAprovacaoOutput['details'] = {
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
