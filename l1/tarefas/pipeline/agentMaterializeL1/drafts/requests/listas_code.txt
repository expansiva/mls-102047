/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/listas.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ListasContracts, ListaResumo, ListaEdicao } from '/_102047_/l2/tarefas/web/contracts/listas.defs.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { createLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/createLista.js';
import { updateLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateLista.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';

const PAGE_SIZE = 200;
const OPEN_STATUSES: readonly string[] = ['aFazer', 'emAndamento', 'emRevisao'];

interface ListaRecord {
  id: string;
  version: number;
  nome: string;
  ativa: boolean;
  details: {
    tipo: string;
    descricao?: string | null;
  };
}

function toTipo(tipo: string): 'project' | 'area' {
  if (tipo === 'project' || tipo === 'area') return tipo;
  throw new AppError('INVALID_DATA', 'Tipo de lista desconhecido: ' + String(tipo), 500);
}

// listaMantidaPorGestor: somente o gestor cadastra e altera listas.
function assertGestor(ctx: RequestContext): void {
  const scope = ctx.sessionContext.actorScope ?? [];
  const isGestor = scope.some((item) => item === 'gestor' || item.endsWith(':gestor'));
  if (!isGestor) {
    throw new AppError('FORBIDDEN', 'Somente o gestor pode cadastrar e alterar listas.', 403, { ruleId: 'listaMantidaPorGestor' });
  }
}

// listaNomeUnico: não pode haver duas listas com o mesmo nome (ignora a própria lista ao salvar).
async function assertNomeUnico(nome: string, ctx: RequestContext, ownId?: string): Promise<void> {
  let page = 1;
  for (;;) {
    const result = await listLista({ nome, page, pageSize: PAGE_SIZE }, ctx);
    const clash = result.items.some((item) => item.nome === nome && item.id !== ownId);
    if (clash) {
      throw new AppError('CONFLICT', 'Já existe uma lista com o nome "' + nome + '".', 409, { ruleId: 'listaNomeUnico' });
    }
    if (!result.hasMore) return;
    page += 1;
  }
}

// quantidadeTarefasAbertas: derivada; conta tarefas da lista em aFazer, emAndamento ou emRevisao.
async function contarTarefasAbertas(listaId: string, ctx: RequestContext): Promise<number> {
  let total = 0;
  for (const status of OPEN_STATUSES) {
    let page = 1;
    for (;;) {
      const result = await listTarefa({ listaId, status, page, pageSize: PAGE_SIZE }, ctx);
      total += result.items.length;
      if (!result.hasMore) break;
      page += 1;
    }
  }
  return total;
}

function toResumo(record: ListaRecord, abertas: number): ListaResumo {
  return {
    id: record.id,
    nome: record.nome,
    ativa: record.ativa,
    details: {
      details: { tipo: toTipo(record.details.tipo) },
      quantidadeTarefasAbertas: abertas,
    },
  };
}

function toEdicao(record: ListaRecord): ListaEdicao {
  const inner: { tipo: 'project' | 'area'; descricao?: string } = { tipo: toTipo(record.details.tipo) };
  if (record.details.descricao != null) inner.descricao = record.details.descricao;
  return {
    id: record.id,
    version: record.version,
    nome: record.nome,
    ativa: record.ativa,
    details: { details: inner },
  };
}

export const requests: { [K in keyof ListasContracts]: (input: ListasContracts[K]['input'], ctx: RequestContext) => Promise<ListasContracts[K]['output']> } = {
  "tarefas.listas.listarListas": async function (input, ctx) {
    const records: ListaRecord[] = [];
    let page = 1;
    for (;;) {
      const result = await listLista({ page, pageSize: PAGE_SIZE }, ctx);
      for (const item of result.items) records.push(item);
      if (!result.hasMore) break;
      page += 1;
    }
    records.sort((a, b) => a.nome.localeCompare(b.nome));
    const listas: ListaResumo[] = [];
    for (const record of records) {
      const abertas = await contarTarefasAbertas(record.id, ctx);
      listas.push(toResumo(record, abertas));
    }
    return { listas };
  },

  "tarefas.listas.obterLista": async function (input, ctx) {
    const record = await getLista({ id: String(input.listaId) }, ctx);
    return { lista: toEdicao(record) };
  },

  "tarefas.listas.criarLista": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      assertGestor(bound);
      await assertNomeUnico(input.nome, bound);
      const details: { tipo: string; descricao?: string } = { tipo: input.details.tipo };
      if (input.details.descricao != null) details.descricao = input.details.descricao;
      const created = await createLista({ nome: input.nome, ativa: input.ativa, details }, bound);
      // quantidadeTarefasAbertas: lista nova não tem tarefas.
      return { lista: toResumo(created, 0), registro: toEdicao(created) };
    });
  },

  "tarefas.listas.salvarLista": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      assertGestor(bound);
      await assertNomeUnico(input.nome, bound, String(input.id));
      const details: { tipo: string; descricao?: string } = { tipo: input.details.tipo };
      if (input.details.descricao != null) details.descricao = input.details.descricao;
      const updated = await updateLista({
        id: String(input.id),
        version: Number(input.version),
        nome: input.nome,
        ativa: input.ativa,
        details,
      }, bound);
      const abertas = await contarTarefasAbertas(updated.id, bound);
      return { lista: toResumo(updated, abertas), registro: toEdicao(updated) };
    });
  },
};
