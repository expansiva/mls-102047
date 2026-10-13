/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

export interface RegistrarPagamentoInput extends Record<string, unknown> {
id: string;
version: number;
details: {
dataPagamento?: string;
};
}

export interface RegistrarPagamentoOutput extends Record<string, unknown> {
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

export async function registrarPagamento(input: RegistrarPagamentoInput, ctx: RequestContext): Promise<RegistrarPagamentoOutput> {
const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');

const id = String(input.id ?? '');
if (id === '') throw new AppError('VALIDATION_ERROR', 'The expense id is required.', 400);

const found = await repository.list({ id });
const current: Despesa | undefined = found[0];
if (!current) throw new AppError('NOT_FOUND', 'Expense not found.', 404);

if (current.status !== 'approved') {
throw new AppError('INVALID_STATE', 'Finance can only access approved expenses to register the payment.', 409, { ruleId: 'financeApprovedExpenseAccess' });
}

const rawDate = input.details?.dataPagamento;
const dataPagamento = typeof rawDate === 'string' ? rawDate.trim() : '';
if (dataPagamento === '') {
throw new AppError('VALIDATION_ERROR', 'The payment date is required to register the payment.', 400, { ruleId: 'paymentDateRequired' });
}

if (Number(input.version) !== current.version) {
throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
}

const next: Despesa = {
id: current.id,
version: current.version,
colaboradorId: current.colaboradorId,
status: 'paid',
details: { ...current.details, dataPagamento },
};

const saved = await repository.transition(next, 'registrarPagamento');

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
