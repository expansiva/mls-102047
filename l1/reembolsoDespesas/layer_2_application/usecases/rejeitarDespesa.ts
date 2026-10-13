/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/rejeitarDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

export interface RejeitarDespesaInput extends Record<string, unknown> {
id: string;
version: number;
details: {
motivoRejeicao?: string;
};
}

export interface RejeitarDespesaOutput extends Record<string, unknown> {
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

export async function rejeitarDespesa(input: RejeitarDespesaInput, ctx: RequestContext): Promise<RejeitarDespesaOutput> {
const despesaRepository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

const id = String(input.id ?? '');
if (!id) throw new AppError('VALIDATION_ERROR', 'The expense id is required.', 400);

const found = await despesaRepository.list({ id });
const current = found[0];
if (!current) throw new AppError('NOT_FOUND', 'Expense not found.', 404);

// managerTeamExpenseAccess: only a team manager acting in the session may decide on the expense
const actorId = ctx.sessionContext.actorId;
if (!actorId) {
throw new AppError('FORBIDDEN', 'An authenticated team manager is required to reject an expense.', 403, { ruleId: 'managerTeamExpenseAccess' });
}
const scope = ctx.sessionContext.actorScope ?? [];
const isManager = scope.some((entry) => entry === 'gestorEquipe' || entry.endsWith(':gestorEquipe'));
if (!isManager) {
throw new AppError('FORBIDDEN', 'Only the team manager can reject expenses of the team.', 403, { ruleId: 'managerTeamExpenseAccess' });
}
if (String(current.colaboradorId) === String(actorId)) {
throw new AppError('FORBIDDEN', 'A manager cannot reject an expense registered by himself.', 403, { ruleId: 'managerTeamExpenseAccess' });
}

// rejectionReasonRequired
const rawReason = input.details?.motivoRejeicao;
const motivoRejeicao = typeof rawReason === 'string' ? rawReason.trim() : '';
if (!motivoRejeicao) {
throw new AppError('VALIDATION_ERROR', 'A rejection reason is required to reject an expense.', 400, { ruleId: 'rejectionReasonRequired' });
}

if (current.status !== 'awaitingApproval') {
throw new AppError('CONFLICT', 'Only an expense awaiting approval can be rejected.', 409);
}

if (Number(input.version) !== Number(current.version)) {
throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
}

const next: Despesa = {
...current,
status: 'rejected',
details: { ...current.details, motivoRejeicao },
};

const saved = await despesaRepository.transition(next, 'rejeitarDespesa');

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
