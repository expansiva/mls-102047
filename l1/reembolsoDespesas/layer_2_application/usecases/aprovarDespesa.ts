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
const despesaRepository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

const id = String(input.id ?? '');
if (!id) throw new AppError('VALIDATION_ERROR', 'The expense id is required.', 400);
const version = Number(input.version);
if (!Number.isFinite(version)) throw new AppError('VALIDATION_ERROR', 'The expense version is required.', 400);

const current = await despesaRepository.get(id);
if (!current) throw new AppError('NOT_FOUND', 'Expense not found.', 404);

// managerTeamExpenseAccess: the actor must be the manager the expense's collaborator reports to.
const actorId = ctx.sessionContext.person?.mdmId ?? ctx.sessionContext.actorId;
if (!actorId) {
throw new AppError('FORBIDDEN', 'The manager could not be identified from the session.', 403, { ruleId: 'managerTeamExpenseAccess' });
}
// Colaborador lives in the platform MDM: its ReportsTo link is the compact ref `reportManagers`.
const colaborador = await ctx.mdm.entity.get({ mdmId: current.colaboradorId });
const refs = (colaborador.details as { relationshipRefs?: Record<string, unknown> }).relationshipRefs ?? {};
const managers = refs['reportManagers'];
if (!Array.isArray(managers) || !managers.includes(actorId)) {
throw new AppError('FORBIDDEN', 'The manager can only approve expenses of collaborators of their own team.', 403, { ruleId: 'managerTeamExpenseAccess' });
}

if (current.version !== version) {
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
const saved = await despesaRepository.transition(next, 'aprovarDespesa');

const details: AprovarDespesaOutput['details'] = {
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
