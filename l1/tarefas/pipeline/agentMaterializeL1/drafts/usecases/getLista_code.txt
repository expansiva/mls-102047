/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getLista.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ListaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/listaRepository.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';

export interface GetListaInput extends Record<string, unknown> {
id: string;
}

export interface GetListaOutput extends Record<string, unknown> {
id: string;
version: number;
nome: string;
ativa: boolean;
details: {
tipo: string;
descricao?: string;
quantidadeTarefasAbertas?: number;
};
}

export async function getLista(input: GetListaInput, ctx: RequestContext): Promise<GetListaOutput> {
const id = typeof input.id === 'string' ? input.id.trim() : '';
if (!id) {
throw new AppError('INVALID_INPUT', 'The id of the lista is required.', 400);
}

const listaRepository = resolveRepository<ListaRepository>(ctx, 'ListaRepository');
const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');

const lista = await listaRepository.get(id);
if (!lista) {
throw new AppError('NOT_FOUND', 'Lista not found: ' + id, 404);
}

// quantidadeTarefasAbertas is derived: calculated every time from the tarefas of this lista.
const tarefas = await tarefaRepository.list({ listaId: lista.id });
let quantidadeTarefasAbertas = 0;
for (const tarefa of tarefas) {
if (tarefa.listaId !== lista.id) continue;
if (tarefa.status === 'aFazer' || tarefa.status === 'emAndamento' || tarefa.status === 'emRevisao') {
quantidadeTarefasAbertas += 1;
}
}

const details: GetListaOutput['details'] = {
tipo: lista.details.tipo,
quantidadeTarefasAbertas,
};
if (lista.details.descricao !== undefined) {
details.descricao = lista.details.descricao;
}

const output: GetListaOutput = {
id: lista.id,
version: lista.version,
nome: lista.nome,
ativa: lista.ativa,
details,
};
return output;
}
