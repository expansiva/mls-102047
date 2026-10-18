/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/listas.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ListasContracts, ListaCadastrada } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { createLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/createLista.js';
import { updateLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateLista.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';

interface ListaRecord {
  id: string;
  version: number;
  nome: string;
  ativa: boolean;
  details: { tipo: string; descricao?: string | null };
}

const MAX_PAGE_SIZE = 200;

function isGestor(ctx: RequestContext): boolean {
  const scope = ctx.sessionContext.actorScope ?? [];
  return scope.some(item => item === 'gestor' || item.endsWith(':gestor'));
}

function assertGestor(ctx: RequestContext): void {
  // listaMantidaPorGestor
  if (!isGestor(ctx)) {
    throw new AppError('FORBIDDEN', 'Somente o gestor pode cadastrar e alterar listas.', 403, { ruleId: 'listaMantidaPorGestor' });
  }
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function listAllListas(ctx: RequestContext): Promise<ListaRecord[]> {
  const all: ListaRecord[] = [];
  for (let page = 1; ; page++) {
    const result = await listLista({ page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const item of result.items) all.push(item);
    if (!result.hasMore) break;
  }
  return all;
}

function sortByNome(listas: ListaRecord[]): ListaRecord[] {
  return [...listas].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
}

// quantidadeTarefasAbertas (derived): tarefas whose status is neither concluida nor cancelada, grouped by listaId.
async function countAbertasPorLista(ctx: RequestContext, listaId?: string): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  for (let page = 1; ; page++) {
    const result = listaId === undefined
      ? await listTarefa({ page, pageSize: MAX_PAGE_SIZE }, ctx)
      : await listTarefa({ listaId, page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const tarefa of result.items) {
      if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') continue;
      counts.set(tarefa.listaId, (counts.get(tarefa.listaId) ?? 0) + 1);
    }
    if (!result.hasMore) break;
  }
  return counts;
}

function toListaCadastrada(lista: ListaRecord, abertas: number): ListaCadastrada {
  const tipo = lista.details.tipo;
  if (tipo !== 'project' && tipo !== 'area') {
    throw new AppError('INVALID_DATA', 'Tipo de lista desconhecido: ' + String(tipo), 500);
  }
  const details: ListaCadastrada['details'] = { tipo, quantidadeTarefasAbertas: abertas };
  if (lista.details.descricao != null) details.descricao = lista.details.descricao;
  return { id: lista.id, version: lista.version, nome: lista.nome, ativa: lista.ativa, details };
}

async function composeListas(ctx: RequestContext, listas: ListaRecord[]): Promise<ListaCadastrada[]> {
  const abertas = await countAbertasPorLista(ctx);
  return sortByNome(listas).map(lista => toListaCadastrada(lista, abertas.get(lista.id) ?? 0));
}

function assertNomeUnico(listas: ListaRecord[], nome: string, ignoreId?: string): void {
  // listaNomeUnico
  const outra = listas.find(lista => lista.nome === nome && lista.id !== ignoreId);
  if (outra) {
    throw new AppError('CONFLICT', 'Já existe uma lista com o nome "' + nome + '".', 409, { ruleId: 'listaNomeUnico' });
  }
}

export const requests: { [K in keyof ListasContracts]: (input: ListasContracts[K]['input'], ctx: RequestContext) => Promise<ListasContracts[K]['output']> } = {
  "tarefas.listas.listarListas": async function (input, ctx) {
    const listas = await listAllListas(ctx);
    return { listas: await composeListas(ctx, listas) };
  },

  "tarefas.listas.buscarListas": async function (input, ctx) {
    const term = normalizeText(input.busca.trim());
    const all = await listAllListas(ctx);
    const found = term === '' ? all : all.filter(lista => normalizeText(lista.nome).includes(term));
    return { listas: await composeListas(ctx, found) };
  },

  "tarefas.listas.criarLista": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      assertGestor(bound);
      const existentes = await listAllListas(bound);
      assertNomeUnico(existentes, input.nome);
      const details: { tipo: string; descricao?: string } = { tipo: input.details.tipo };
      if (input.details.descricao !== undefined) details.descricao = input.details.descricao;
      const created = await createLista({ nome: input.nome, ativa: input.ativa, details }, bound);
      // quantidadeTarefasAbertas: derived, starts at zero for a new lista.
      return { lista: toListaCadastrada(created, 0) };
    });
  },

  "tarefas.listas.salvarLista": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      assertGestor(bound);
      const existentes = await listAllListas(bound);
      const atual = existentes.find(lista => lista.id === input.id);
      if (!atual) throw new AppError('NOT_FOUND', 'Lista não encontrada: ' + input.id, 404);
      if (atual.version !== Number(input.version)) {
        throw new AppError('VERSION_CONFLICT', 'A versão da lista não confere com a gravada.', 409);
      }
      assertNomeUnico(existentes, input.nome, input.id);
      const details: { tipo: string; descricao?: string } = { tipo: input.details.tipo };
      if (input.details.descricao !== undefined) details.descricao = input.details.descricao;
      const updated = await updateLista({
        id: String(input.id),
        version: Number(input.version),
        nome: input.nome,
        ativa: input.ativa,
        details,
      }, bound);
      const abertas = await countAbertasPorLista(bound, updated.id);
      return { lista: toListaCadastrada(updated, abertas.get(updated.id) ?? 0) };
    });
  },
};
