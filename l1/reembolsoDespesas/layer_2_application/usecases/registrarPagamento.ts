/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/registrarPagamento.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';
import type { Despesa } from '/_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.js';

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
const current = found[0];
if (!current) throw new AppError('NOT_FOUND', 'Expense not found.', 404);

if (Number(input.version) !== Number(current.version)) {
throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
}

// financeApprovedExpenseAccess: the finance actor only handles approved expenses.
if (current.status !== 'approved') {
throw new AppError('EXPENSE_NOT_APPROVED', 'Only approved expenses can be handled by finance for payment.', 409, { ruleId: 'financeApprovedExpenseAccess' });
}

// paymentDateRequired: the payment registration needs the payment date.
const rawDate = input.details?.dataPagamento;
const dataPagamento = typeof rawDate === 'string' ? rawDate.trim() : '';
if (dataPagamento === '') {
throw new AppError('PAYMENT_DATE_REQUIRED', 'The payment date is required to register the payment.', 400, { ruleId: 'paymentDateRequired' });
}

const next: Despesa = {
id: current.id,
version: current.version,
colaboradorId: current.colaboradorId,
status: 'paid',
details: {
...current.details,
dataPagamento,
},
};

const saved = await repository.transition(next, 'registrarPagamento');

const output: RegistrarPagamentoOutput = {
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
