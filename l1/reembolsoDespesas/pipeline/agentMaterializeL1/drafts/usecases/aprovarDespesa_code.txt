/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/aprovarDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';

export interface AprovarDespesaInput extends Record<string, unknown> {
id: string;
version: number;
}

export interface AprovarDespesaOutput extends Record<string, unknown> {
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

export async function aprovarDespesa(input: AprovarDespesaInput, ctx: RequestContext): Promise<AprovarDespesaOutput> {
const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

const id = String(input.id ?? '');
if (id === '') {
throw new AppError('VALIDATION_ERROR', 'The expense id is required.', 400);
}
const inputVersion = Number(input.version);
if (!Number.isFinite(inputVersion)) {
throw new AppError('VALIDATION_ERROR', 'The expense version is required.', 400);
}

// managerTeamExpenseAccess: only the team manager acts on the expense of a collaborator of the own team.
const session = ctx.sessionContext;
const managerId = session.actorId ?? session.actorSession.actorId ?? session.person?.mdmId;
if (!managerId) {
throw new AppError('FORBIDDEN', 'The team manager could not be identified.', 403, { ruleId: 'managerTeamExpenseAccess' });
}
const scope: string[] = session.actorScope ?? session.actorSession.scope ?? [];
const isManager = scope.some((entry) => entry === 'gestorEquipe' || entry.endsWith(':gestorEquipe'));
if (!isManager) {
throw new AppError('FORBIDDEN', 'Only the team manager can approve team expenses.', 403, { ruleId: 'managerTeamExpenseAccess' });
}

const found = await repository.list({ id });
const current: Despesa | undefined = found.find((item) => item.id === id);
if (!current) {
throw new AppError('NOT_FOUND', 'Expense not found.', 404);
}
if (current.colaboradorId === managerId) {
throw new AppError('FORBIDDEN', 'A manager cannot approve an expense that is not from a collaborator of the team.', 403, { ruleId: 'managerTeamExpenseAccess' });
}

if (current.version !== inputVersion) {
throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
}
if (current.status !== 'awaitingApproval') {
throw new AppError('INVALID_STATE', 'Only an expense awaiting approval can be approved.', 409);
}

const next: Despesa = {
id: current.id,
version: current.version,
colaboradorId: current.colaboradorId,
status: 'approved',
details: { ...current.details },
};
const saved = await repository.transition(next, 'aprovarDespesa');

const output: AprovarDespesaOutput = {
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
return output;
}
