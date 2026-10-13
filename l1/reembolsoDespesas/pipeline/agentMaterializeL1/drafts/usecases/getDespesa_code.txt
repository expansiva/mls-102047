/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { DespesaRepository } from '/_102047_/l1/reembolsoDespesas/layer_2_application/ports/despesaRepository.js';

export interface GetDespesaInput extends Record<string, unknown> {
id: string;
}

export interface GetDespesaOutput extends Record<string, unknown> {
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

export async function getDespesa(input: GetDespesaInput, ctx: RequestContext): Promise<GetDespesaOutput> {
const id = typeof input.id === 'string' ? input.id.trim() : '';
if (id === '') {
throw new AppError('INVALID_INPUT', 'The despesa id is required.', 400);
}
const repository = resolveRepository<DespesaRepository>(ctx, 'DespesaRepository');
const found = await repository.get(id);
if (!found) {
throw new AppError('NOT_FOUND', `Despesa ${id} was not found.`, 404);
}
const output: GetDespesaOutput = {
id: found.id,
version: found.version,
colaboradorId: found.colaboradorId,
status: found.status,
details: {
dataDespesa: found.details.dataDespesa,
categoria: found.details.categoria,
valor: found.details.valor,
descricao: found.details.descricao,
reenvioRealizado: found.details.reenvioRealizado,
},
};
if (found.details.motivoRejeicao !== undefined) {
output.details.motivoRejeicao = found.details.motivoRejeicao;
}
if (found.details.dataPagamento !== undefined) {
output.details.dataPagamento = found.details.dataPagamento;
}
return output;
}
