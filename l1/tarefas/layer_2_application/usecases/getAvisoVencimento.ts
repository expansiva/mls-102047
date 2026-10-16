/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { AvisoVencimentoRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/avisoVencimentoRepository.js';

export interface GetAvisoVencimentoInput extends Record<string, unknown> {
id: string;
}

export interface GetAvisoVencimentoOutput extends Record<string, unknown> {
id: string;
version: number;
responsavelId: string;
dataReferencia: string;
status: string;
details: {
geradoEm: string;
finalizadoEm?: string;
motivoFalha?: string;
tarefas: {
tarefaId: string;
prazo: string;
situacaoPrazo: string;
}[];
quantidadeTarefas?: number;
quantidadeAtrasadas?: number;
};
}

export async function getAvisoVencimento(input: GetAvisoVencimentoInput, ctx: RequestContext): Promise<GetAvisoVencimentoOutput> {
const id = typeof input.id === 'string' ? input.id.trim() : '';
if (!id) {
throw new AppError('INVALID_INPUT', 'The id of the aviso is required.', 400);
}
const repository = resolveRepository<AvisoVencimentoRepository>(ctx, 'AvisoVencimentoRepository');
const found = await repository.get(id);
if (!found) {
throw new AppError('NOT_FOUND', 'AvisoVencimento not found: ' + id, 404);
}
const tarefas = (found.details?.tarefas ?? []).map((t) => ({
tarefaId: t.tarefaId,
prazo: t.prazo,
situacaoPrazo: t.situacaoPrazo,
}));
// Derived counts are computed every time, never read from storage.
const quantidadeTarefas = tarefas.length;
const quantidadeAtrasadas = tarefas.filter((t) => t.situacaoPrazo === 'overdue').length;
// The timestamps of the event (generation and end of the sending) are recorded by the daily process
// and carried over as the stored detail group; the counts and the task list are rebuilt here.
const details: GetAvisoVencimentoOutput['details'] = {
...found.details,
tarefas,
quantidadeTarefas,
quantidadeAtrasadas,
};
return {
id: found.id,
version: found.version,
responsavelId: found.responsavelId,
dataReferencia: found.dataReferencia,
status: found.status,
details,
};
}
