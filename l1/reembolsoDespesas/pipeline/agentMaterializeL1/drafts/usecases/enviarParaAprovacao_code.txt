/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/enviarParaAprovacao.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';

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

  const found = await repository.list({ id });
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Expense not found.', 404);

  // expenseOwnerOnly: only the collaborator who registered the expense may send it.
  const callerId = ctx.sessionContext.person?.mdmId;
  if (isBlank(callerId)) {
    throw new AppError('FORBIDDEN', 'The authenticated collaborator could not be identified.', 403, { ruleId: 'expenseOwnerOnly' });
  }
  if (String(current.colaboradorId ?? '') !== callerId) {
    throw new AppError('FORBIDDEN', 'Only the collaborator who registered the expense can send it for approval.', 403, { ruleId: 'expenseOwnerOnly' });
  }

  if (current.status !== 'draft') {
    throw new AppError('INVALID_STATE', 'Only a draft expense can be sent for approval.', 409);
  }

  if (Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  // validExpenseData: date, category, amount and description are required.
  const d = current.details;
  const amount = Number(d?.valor);
  if (
    !d ||
    isBlank(d.dataDespesa) ||
    isBlank(d.categoria) ||
    isBlank(d.valor) ||
    !Number.isFinite(amount) ||
    amount < 0.01 ||
    isBlank(d.descricao)
  ) {
    throw new AppError('VALIDATION_ERROR', 'The expense must have a date, category, amount and description to be sent for approval.', 400, { ruleId: 'validExpenseData' });
  }

  const next: Despesa = {
    id: current.id,
    version: current.version,
    colaboradorId: current.colaboradorId,
    status: 'awaitingApproval',
    details: { ...current.details },
  };

  const saved = await repository.transition(next, 'enviarParaAprovacao');

  const details: EnviarParaAprovacaoOutput['details'] = {
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
