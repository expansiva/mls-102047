/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/listas.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ListasContracts, ListaResumo, ListaEdicao } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { createLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/createLista.js';
import { updateLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateLista.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';

const MAX_PAGE_SIZE = 200;
const OPEN_STATUSES: readonly string[] = ['aFazer', 'emAndamento', 'emRevisao'];

interface ListaRecord {
  id: string;
  version: number;
  nome: string;
  ativa: boolean;
  details: { tipo: string; descricao?: string | null };
}

function toTipo(value: string): 'project' | 'area' {
  if (value === 'project' || value === 'area') return value;
  throw new AppError('INVALID_STATE', 'Lista com tipo inválido: ' + String(value), 500);
}

function assertGestor(ctx: RequestContext): void {
  const scope = ctx.sessionContext.actorScope ?? [];
  const isGestor = scope.some((item) => item === 'gestor' || item.endsWith(':gestor'));
  if (!isGestor) {
    throw new AppError('FORBIDDEN', 'Somente o gestor pode cadastrar e alterar listas.', 403, { ruleId: 'listaMantidaPorGestor' });
  }
}

function toResumo(record: ListaRecord, quantidadeTarefasAbertas: number): ListaResumo {
  return {
    id: record.id,
    nome: record.nome,
    ativa: record.ativa,
    details: {
      details: { tipo: toTipo(record.details.tipo) },
      quantidadeTarefasAbertas,
    },
  };
}

function toEdicao(record: ListaRecord): ListaEdicao {
  return {
    id: record.id,
    version: record.version,
    nome: record.nome,
    ativa: record.ativa,
    details: {
      details: {
        tipo: toTipo(record.details.tipo),
        ...(record.details.descricao != null ? { descricao: record.details.descricao } : {}),
      },
    },
  };
}

async function listAllListas(ctx: RequestContext, nome?: string): Promise<ListaRecord[]> {
  const all: ListaRecord[] = [];
  let page = 1;
  for (;;) {
    const result = await listLista(nome != null ? { nome, page, pageSize: MAX_PAGE_SIZE } : { page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const item of result.items) {
      const record: ListaRecord = item;
      all.push(record);
    }
    if (!result.hasMore) break;
    page += 1;
  }
  return all;
}

// quantidadeTarefasAbertas: derived, counted here from the tasks with status aFazer, emAndamento or emRevisao.
async function countOpenByLista(ctx: RequestContext, listaId?: string): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  for (const status of OPEN_STATUSES) {
    let page = 1;
    for (;;) {
      const result = await listTarefa(
        listaId != null ? { status, listaId, page, pageSize: MAX_PAGE_SIZE } : { status, page, pageSize: MAX_PAGE_SIZE },
        ctx,
      );
      for (const tarefa of result.items) {
        const key = String(tarefa.listaId);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      if (!result.hasMore) break;
      page += 1;
    }
  }
  return counts;
}

async function assertNomeUnico(ctx: RequestContext, nome: string, ownId?: string): Promise<void> {
  const found = await listAllListas(ctx, nome);
  for (const other of found) {
    if (other.nome === nome && other.id !== ownId) {
      throw new AppError('CONFLICT', 'Já existe uma lista com o nome "' + nome + '".', 409, { ruleId: 'listaNomeUnico' });
    }
  }
}

export const requests: { [K in keyof ListasContracts]: (input: ListasContracts[K]['input'], ctx: RequestContext) => Promise<ListasContracts[K]['output']> } = {
  "tarefas.listas.listarListas": async function (input, ctx) {
    const records = await listAllListas(ctx);
    records.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
    const counts = await countOpenByLista(ctx);
    const listas: ListaResumo[] = records.map((record) => toResumo(record, counts.get(record.id) ?? 0));
    return { listas };
  },
  "tarefas.listas.obterLista": async function (input, ctx) {
    const record = await getLista({ id: input.listaId }, ctx);
    if (record == null) {
      throw new AppError('NOT_FOUND', 'Lista não encontrada: ' + input.listaId, 404);
    }
    const typed: ListaRecord = record;
    return { lista: toEdicao(typed) };
  },
  "tarefas.listas.criarLista": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      // listaMantidaPorGestor
      assertGestor(bound);
      // listaNomeUnico
      await assertNomeUnico(bound, input.nome);
      const created = await createLista({
        nome: input.nome,
        ativa: input.ativa,
        details: {
          tipo: input.details.tipo,
          ...(input.details.descricao != null ? { descricao: input.details.descricao } : {}),
        },
      }, bound);
      const record: ListaRecord = created;
      // quantidadeTarefasAbertas: zero for a new lista (calculated, never stored)
      return { lista: toResumo(record, 0), registro: toEdicao(record) };
    });
  },
  "tarefas.listas.salvarLista": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      // listaMantidaPorGestor
      assertGestor(bound);
      const current = await getLista({ id: input.id }, bound);
      if (current == null) {
        throw new AppError('NOT_FOUND', 'Lista não encontrada: ' + input.id, 404);
      }
      if (Number(current.version) !== Number(input.version)) {
        throw new AppError('CONFLICT', 'A lista foi alterada por outra pessoa; recarregue antes de salvar.', 409);
      }
      // listaNomeUnico: another lista with the same name
      await assertNomeUnico(bound, input.nome, input.id);
      const updated = await updateLista({
        id: input.id,
        version: Number(input.version),
        nome: input.nome,
        ativa: input.ativa,
        details: {
          tipo: input.details.tipo,
          ...(input.details.descricao != null ? { descricao: input.details.descricao } : {}),
        },
      }, bound);
      const record: ListaRecord = updated;
      // quantidadeTarefasAbertas: recalculated, never stored
      const counts = await countOpenByLista(bound, record.id);
      return { lista: toResumo(record, counts.get(record.id) ?? 0), registro: toEdicao(record) };
    });
  },
};
