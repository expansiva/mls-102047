/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { TarefaRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/tarefaRepository.js';
import type { ItemChecklistRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.js';

export interface GetTarefaInput extends Record<string, unknown> {
  id: string;
}

export interface GetTarefaOutput extends Record<string, unknown> {
  id: string;
  version: number;
  titulo: string;
  status: string;
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  criadorId: string;
  tarefaPaiId?: string;
  chaveCriacao: string;
  criadaEm: string;
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
    aberta?: boolean;
    venceHoje?: boolean;
    atrasada?: boolean;
    quantidadeSubtarefas?: number;
    progressoChecklist?: string;
  };
}

export async function getTarefa(input: GetTarefaInput, ctx: RequestContext): Promise<GetTarefaOutput> {
  const id = input.id === undefined || input.id === null ? '' : String(input.id);
  if (id === '') {
    throw new AppError('INVALID_INPUT', 'The id of the tarefa is required.', 400);
  }

  const tarefaRepository = resolveRepository<TarefaRepository>(ctx, 'TarefaRepository');
  const itemChecklistRepository = resolveRepository<ItemChecklistRepository>(ctx, 'ItemChecklistRepository');

  const found = await tarefaRepository.get(id);
  if (!found) {
    throw new AppError('NOT_FOUND', `Tarefa ${id} was not found.`, 404);
  }

  // Derived fields: calculated every time, never read from storage.
  const aberta = found.status === 'aFazer' || found.status === 'emAndamento' || found.status === 'emRevisao';
  const today = ctx.clock.nowIso().slice(0, 10);
  const prazoDay = String(found.prazo).slice(0, 10);
  const venceHoje = aberta && prazoDay === today;
  const atrasada = aberta && prazoDay < today;

  const subtarefas = await tarefaRepository.list({ tarefaPaiId: found.id });
  const itens = await itemChecklistRepository.list({ tarefaId: found.id });
  const feitos = itens.filter((item) => item.feito === true).length;

  const details: GetTarefaOutput['details'] = {
    aberta,
    venceHoje,
    atrasada,
    quantidadeSubtarefas: subtarefas.length,
    progressoChecklist: `${feitos}/${itens.length}`,
  };
  if (found.details?.descricao !== undefined) details.descricao = found.details.descricao;
  if (found.details?.motivoDevolucao !== undefined) details.motivoDevolucao = found.details.motivoDevolucao;
  if (found.details?.devolvidaEm !== undefined) details.devolvidaEm = found.details.devolvidaEm;
  if (found.details?.concluidaEm !== undefined) details.concluidaEm = found.details.concluidaEm;
  if (found.details?.canceladaEm !== undefined) details.canceladaEm = found.details.canceladaEm;

  const output: GetTarefaOutput = {
    id: found.id,
    version: found.version,
    titulo: found.titulo,
    status: found.status,
    prioridade: found.prioridade,
    prazo: found.prazo,
    listaId: found.listaId,
    responsavelId: found.responsavelId,
    criadorId: found.criadorId,
    chaveCriacao: found.chaveCriacao,
    criadaEm: found.criadaEm,
    details,
  };
  if (found.tarefaPaiId !== undefined && found.tarefaPaiId !== null) {
    output.tarefaPaiId = found.tarefaPaiId;
  }
  return output;
}
