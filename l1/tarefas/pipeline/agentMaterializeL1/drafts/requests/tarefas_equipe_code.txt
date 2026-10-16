/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/tarefas_equipe.ts" enhancement="_blank"/>

import type { Tarefas_equipeContracts, TarefaQuadroItem, TarefaDetalhe, TarefaDetalheDetails, MembroResumo, ListaResumo, ItemChecklistLinha } from '/_102047_/l2/tarefas/web/contracts/tarefas_equipe.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import type { ListTarefaInput, ListTarefaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import type { ListListaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { listMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import type { ListMembroEquipeOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import type { ListItemChecklistOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { reatribuirQuemAge, avancarEtapaTarefa } from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';

type Status = TarefaQuadroItem['status'];
type Prioridade = TarefaQuadroItem['prioridade'];
type StatusMembro = NonNullable<MembroResumo['details']['identification']['details']['identification']['status']>;

const STATUS_VALIDOS: Status[] = ['aFazer', 'emAndamento', 'emRevisao', 'concluida', 'cancelada'];
const PRIORIDADES_VALIDAS: Prioridade[] = ['low', 'medium', 'high'];
const STATUS_MEMBRO_VALIDOS: StatusMembro[] = ['Active', 'Inactive', 'Merged', 'Blocked'];
const STATUS_ABERTOS: string[] = ['aFazer', 'emAndamento', 'emRevisao'];
const RANK_PRIORIDADE: Record<Prioridade, number> = { high: 0, medium: 1, low: 2 };

interface TarefaRegistro {
  id: string;
  version: number;
  titulo: string;
  status: string;
  prioridade: string;
  prazo: string;
  listaId: string;
  responsavelId: string;
  criadorId: string;
  tarefaPaiId?: string | null;
  criadaEm: string;
  details: {
    descricao?: string | null;
    motivoDevolucao?: string | null;
    devolvidaEm?: string | null;
    concluidaEm?: string | null;
    canceladaEm?: string | null;
  };
}

interface MembroRegistro {
  id: string;
  details: { identification: { name: string; status: string } };
}

interface Resolvers {
  lista(id: string): Promise<ListaResumo>;
  membro(id: string): Promise<MembroResumo>;
}

function asStatus(v: string): Status {
  const f = STATUS_VALIDOS.find((s) => s === v);
  if (f === undefined) throw new AppError('INVALID_DATA', `Situação de tarefa desconhecida: ${v}`, 500);
  return f;
}

function asPrioridade(v: string): Prioridade {
  const f = PRIORIDADES_VALIDAS.find((s) => s === v);
  if (f === undefined) throw new AppError('INVALID_DATA', `Prioridade de tarefa desconhecida: ${v}`, 500);
  return f;
}

function asStatusMembro(v: string | null | undefined): StatusMembro | undefined {
  if (v == null) return undefined;
  return STATUS_MEMBRO_VALIDOS.find((s) => s === v);
}

function normalizarTexto(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function resolverPagina(page: number | undefined, pageSize: number | undefined): { page: number; pageSize: number } {
  const p = typeof page === 'number' && Number.isInteger(page) && page >= 1 ? page : 1;
  const sRaw = typeof pageSize === 'number' && Number.isInteger(pageSize) && pageSize >= 1 ? pageSize : 20;
  return { page: p, pageSize: Math.min(sRaw, 200) };
}

function hojeDe(ctx: RequestContext): string {
  const iso = ctx.clock.nowIso();
  const tz = ctx.organization.timezone;
  if (tz) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso));
  }
  return iso.slice(0, 10);
}

function ehGestor(ctx: RequestContext): boolean {
  const escopo = ctx.sessionContext.actorScope ?? [];
  return escopo.some((s) => s === 'gestor' || s.endsWith(':gestor'));
}

function toMembroResumo(m: MembroRegistro): MembroResumo {
  const status = asStatusMembro(m.details.identification.status);
  return {
    id: m.id,
    details: {
      identification: {
        details: {
          identification: {
            name: m.details.identification.name,
            ...(status !== undefined ? { status } : {}),
          },
        },
      },
    },
  };
}

function criarResolvers(ctx: RequestContext): Resolvers {
  const listas = new Map<string, Promise<ListaResumo>>();
  const membros = new Map<string, Promise<MembroResumo>>();
  return {
    lista(id: string): Promise<ListaResumo> {
      let p = listas.get(id);
      if (p === undefined) {
        p = getLista({ id }, ctx).then((l) => ({ id: l.id, nome: l.nome }));
        listas.set(id, p);
      }
      return p;
    },
    membro(id: string): Promise<MembroResumo> {
      let p = membros.get(id);
      if (p === undefined) {
        p = getMembroEquipe({ id }, ctx).then((m) => toMembroResumo(m));
        membros.set(id, p);
      }
      return p;
    },
  };
}

async function listarTodasTarefas(
  filtros: { listaId?: string; responsavelId?: string; prioridade?: string; tarefaPaiId?: string },
  ctx: RequestContext,
): Promise<ListTarefaOutput['items']> {
  const todas: ListTarefaOutput['items'] = [];
  let page = 1;
  for (;;) {
    const entrada: ListTarefaInput = { page, pageSize: 200 };
    if (filtros.listaId != null) entrada.listaId = filtros.listaId;
    if (filtros.responsavelId != null) entrada.responsavelId = filtros.responsavelId;
    if (filtros.prioridade != null) entrada.prioridade = filtros.prioridade;
    if (filtros.tarefaPaiId != null) entrada.tarefaPaiId = filtros.tarefaPaiId;
    const r = await listTarefa(entrada, ctx);
    todas.push(...r.items);
    if (!r.hasMore) break;
    page += 1;
  }
  return todas;
}

async function carregarChecklist(tarefaId: string, ctx: RequestContext): Promise<ListItemChecklistOutput['items']> {
  const todos: ListItemChecklistOutput['items'] = [];
  let page = 1;
  for (;;) {
    const r = await listItemChecklist({ tarefaId, page, pageSize: 200 }, ctx);
    todos.push(...r.items);
    if (!r.hasMore) break;
    page += 1;
  }
  return todos.slice().sort((a, b) => a.ordem - b.ordem);
}

function textoProgresso(itens: ListItemChecklistOutput['items']): string {
  const feitos = itens.filter((i) => i.feito).length;
  return `${feitos}/${itens.length}`;
}

function calcularIndicadores(tarefa: TarefaRegistro, hoje: string): { aberta: boolean; venceHoje: boolean; atrasada: boolean } {
  const aberta = STATUS_ABERTOS.includes(tarefa.status);
  const dia = tarefa.prazo.slice(0, 10);
  return {
    aberta,
    venceHoje: aberta && dia === hoje,
    atrasada: aberta && dia < hoje,
  };
}

async function montarItemQuadro(
  tarefa: TarefaRegistro,
  progressoChecklist: string,
  hoje: string,
  res: Resolvers,
): Promise<TarefaQuadroItem> {
  const [lista, responsavel] = await Promise.all([res.lista(tarefa.listaId), res.membro(tarefa.responsavelId)]);
  const ind = calcularIndicadores(tarefa, hoje);
  return {
    id: tarefa.id,
    titulo: tarefa.titulo,
    status: asStatus(tarefa.status),
    prioridade: asPrioridade(tarefa.prioridade),
    prazo: tarefa.prazo,
    listaId: tarefa.listaId,
    responsavelId: tarefa.responsavelId,
    details: {
      details: {
        aberta: ind.aberta,
        venceHoje: ind.venceHoje,
        atrasada: ind.atrasada,
        progressoChecklist,
      },
    },
    lista,
    responsavel,
  };
}

async function montarDetalhe(tarefa: TarefaRegistro, ctx: RequestContext, res: Resolvers): Promise<TarefaDetalhe> {
  const [lista, responsavel, criador, checklistItens, subtarefas, tarefaPai] = await Promise.all([
    res.lista(tarefa.listaId),
    res.membro(tarefa.responsavelId),
    res.membro(tarefa.criadorId),
    carregarChecklist(tarefa.id, ctx),
    listarTodasTarefas({ tarefaPaiId: tarefa.id }, ctx),
    tarefa.tarefaPaiId != null ? getTarefa({ id: tarefa.tarefaPaiId }, ctx) : Promise.resolve(null),
  ]);

  const checklist: ItemChecklistLinha[] = checklistItens.map((i) => ({
    id: i.id,
    ordem: i.ordem,
    feito: i.feito,
    details: { details: { descricao: i.details.descricao } },
  }));

  const ind = calcularIndicadores(tarefa, hojeDe(ctx));
  // aberta, quantidadeSubtarefas e progressoChecklist são derivados: calculados aqui, nunca lidos do armazenamento.
  const interno: TarefaDetalheDetails['details'] = {
    aberta: ind.aberta,
    quantidadeSubtarefas: subtarefas.length,
    progressoChecklist: textoProgresso(checklistItens),
  };
  if (tarefa.details.descricao != null) interno.descricao = tarefa.details.descricao;
  if (tarefa.details.motivoDevolucao != null) interno.motivoDevolucao = tarefa.details.motivoDevolucao;
  if (tarefa.details.devolvidaEm != null) interno.devolvidaEm = tarefa.details.devolvidaEm;
  if (tarefa.details.concluidaEm != null) interno.concluidaEm = tarefa.details.concluidaEm;
  if (tarefa.details.canceladaEm != null) interno.canceladaEm = tarefa.details.canceladaEm;

  const detalhe: TarefaDetalhe = {
    id: tarefa.id,
    version: tarefa.version,
    titulo: tarefa.titulo,
    status: asStatus(tarefa.status),
    prioridade: asPrioridade(tarefa.prioridade),
    prazo: tarefa.prazo,
    listaId: tarefa.listaId,
    responsavelId: tarefa.responsavelId,
    criadorId: tarefa.criadorId,
    criadaEm: tarefa.criadaEm,
    details: { details: interno },
    lista,
    responsavel,
    criador,
    checklist,
  };
  if (tarefa.tarefaPaiId != null) detalhe.tarefaPaiId = tarefa.tarefaPaiId;
  if (tarefaPai != null) detalhe.tarefaPai = { id: tarefaPai.id, titulo: tarefaPai.titulo };
  return detalhe;
}

export const requests: { [K in keyof Tarefas_equipeContracts]: (input: Tarefas_equipeContracts[K]['input'], ctx: RequestContext) => Promise<Tarefas_equipeContracts[K]['output']> } = {
  'tarefas.tarefas_equipe.qryTarefasEquipe': async function (input, ctx) {
    const { page, pageSize } = resolverPagina(input.page, input.pageSize);
    const hoje = hojeDe(ctx);

    // editarSomenteTarefaVisivel: o gestor (escopo organização) vê todas as tarefas da equipe; nenhum recorte por criador/responsável.
    const todas = await listarTodasTarefas(
      { listaId: input.listaId, responsavelId: input.responsavelId, prioridade: input.prioridade },
      ctx,
    );

    const termo = input.titulo != null && input.titulo.trim() !== '' ? normalizarTexto(input.titulo.trim()) : null;
    const statusDesejados = input.status != null && input.status.length > 0 ? input.status : null;
    const diaPrazo = input.prazo != null && input.prazo !== '' ? input.prazo.slice(0, 10) : null;

    const filtradas = todas.filter((t) => {
      if (statusDesejados !== null && !statusDesejados.some((s) => s === t.status)) return false;
      if (diaPrazo !== null && t.prazo.slice(0, 10) !== diaPrazo) return false;
      if (termo !== null && !normalizarTexto(t.titulo).includes(termo)) return false;
      return true;
    });

    filtradas.sort((a, b) => {
      const pa = a.prazo.slice(0, 10);
      const pb = b.prazo.slice(0, 10);
      if (pa !== pb) return pa < pb ? -1 : 1;
      return RANK_PRIORIDADE[asPrioridade(a.prioridade)] - RANK_PRIORIDADE[asPrioridade(b.prioridade)];
    });

    const inicio = (page - 1) * pageSize;
    const pagina = filtradas.slice(inicio, inicio + pageSize);
    const hasMore = inicio + pageSize < filtradas.length;

    const res = criarResolvers(ctx);
    const items = await Promise.all(
      pagina.map(async (t) => {
        const checklist = await carregarChecklist(t.id, ctx);
        return montarItemQuadro(t, textoProgresso(checklist), hoje, res);
      }),
    );

    return { tarefas: { items, page, pageSize, hasMore } };
  },

  'tarefas.tarefas_equipe.qryListasFiltro': async function (_input, ctx) {
    const todas: ListListaOutput['items'] = [];
    let page = 1;
    for (;;) {
      const r = await listLista({ page, pageSize: 200 }, ctx);
      todas.push(...r.items);
      if (!r.hasMore) break;
      page += 1;
    }
    const listas: ListaResumo[] = todas
      .map((l) => ({ id: l.id, nome: l.nome }))
      .sort((a, b) => a.nome.localeCompare(b.nome));
    return { listas };
  },

  'tarefas.tarefas_equipe.qryBuscarMembros': async function (input, ctx) {
    const nome = input.details.identification.name;
    const termo = nome != null && nome.trim() !== '' ? normalizarTexto(nome.trim()) : null;

    const todos: ListMembroEquipeOutput['items'] = [];
    let page = 1;
    for (;;) {
      const r = await listMembroEquipe({ page, pageSize: 200 }, ctx);
      todos.push(...r.items);
      if (!r.hasMore) break;
      page += 1;
    }

    const encontrados = todos.filter((m) => {
      // responsavelDeveSerMembroAtivo: na escolha do novo responsável só entra situação Active.
      if (input.somenteAtivos === true && m.details.identification.status !== 'Active') return false;
      if (termo !== null && !normalizarTexto(m.details.identification.name).includes(termo)) return false;
      return true;
    });
    encontrados.sort((a, b) => a.details.identification.name.localeCompare(b.details.identification.name));

    const membros: MembroResumo[] = encontrados.slice(0, 30).map((m) => toMembroResumo(m));
    return { membros };
  },

  'tarefas.tarefas_equipe.qryDetalheTarefa': async function (input, ctx) {
    // editarSomenteTarefaVisivel: o gestor vê todas as tarefas; a tarefa é lida pelo id sem recorte.
    const tarefa = await getTarefa({ id: input.tarefaId }, ctx);
    const detalhe = await montarDetalhe(tarefa, ctx, criarResolvers(ctx));
    return { tarefa: detalhe };
  },

  'tarefas.tarefas_equipe.cmdReatribuirTarefa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      // editarSomenteTarefaVisivel: o gestor vê e edita todas as tarefas da equipe.
      const atual = await getTarefa({ id: input.id }, bound);
      if (atual.version !== Number(input.version)) {
        throw new AppError('VERSION_CONFLICT', 'A tarefa foi alterada por outra pessoa; recarregue antes de reatribuir.', 409);
      }

      // reatribuicaoPorCriadorOuGestor
      if (!ehGestor(bound) && bound.sessionContext.actorId !== atual.criadorId) {
        throw new AppError('FORBIDDEN', 'Somente o criador da tarefa ou o gestor pode trocar o responsável.', 403, { ruleId: 'reatribuicaoPorCriadorOuGestor' });
      }

      // responsavelDeveSerMembroAtivo
      const novo = await getMembroEquipe({ id: String(input.responsavelId) }, bound);
      if (novo.details.identification.status !== 'Active') {
        throw new AppError('RESPONSAVEL_INATIVO', 'O novo responsável deve ser um membro ativo da equipe.', 422, { ruleId: 'responsavelDeveSerMembroAtivo' });
      }

      const resultado = await reatribuirQuemAge({ id: input.id, responsavelId: String(input.responsavelId) }, bound);

      // edicaoNaoMudaSituacao: a reatribuição grava só o responsável; a situação deve permanecer a mesma.
      if (resultado.tarefa.status !== atual.status) {
        throw new AppError('SITUACAO_ALTERADA', 'A reatribuição não pode alterar a situação da tarefa.', 409, { ruleId: 'edicaoNaoMudaSituacao' });
      }

      const res = criarResolvers(bound);
      const detalhe = await montarDetalhe(resultado.tarefa, bound, res);
      const itemQuadro = await montarItemQuadro(resultado.tarefa, detalhe.details.details.progressoChecklist, hojeDe(bound), res);
      return { tarefa: detalhe, itemQuadro };
    });
  },

  'tarefas.tarefas_equipe.cmdCancelarTarefa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      const atual = await getTarefa({ id: input.id }, bound);
      if (atual.version !== Number(input.version)) {
        throw new AppError('VERSION_CONFLICT', 'A tarefa foi alterada por outra pessoa; recarregue antes de cancelar.', 409);
      }

      // tarefaEncerradaNaoTransiciona
      if (atual.status === 'concluida' || atual.status === 'cancelada') {
        throw new AppError('TAREFA_ENCERRADA', 'Uma tarefa concluída ou cancelada não muda mais de situação.', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
      }

      // cancelamentoPorCriadorOuGestor: só criador ou gestor, e só a partir de a fazer, em andamento ou em revisão.
      if (!ehGestor(bound) && bound.sessionContext.actorId !== atual.criadorId) {
        throw new AppError('FORBIDDEN', 'Somente o criador da tarefa ou o gestor pode cancelá-la.', 403, { ruleId: 'cancelamentoPorCriadorOuGestor' });
      }
      if (!STATUS_ABERTOS.includes(atual.status)) {
        throw new AppError('TRANSICAO_INVALIDA', 'A tarefa só pode ser cancelada a partir de a fazer, em andamento ou em revisão.', 409, { ruleId: 'cancelamentoPorCriadorOuGestor' });
      }

      const resultado = await avancarEtapaTarefa({ id: input.id, transicao: 'cancelar' }, bound);

      const res = criarResolvers(bound);
      const detalhe = await montarDetalhe(resultado.tarefa, bound, res);
      const itemQuadro = await montarItemQuadro(resultado.tarefa, detalhe.details.details.progressoChecklist, hojeDe(bound), res);
      return { tarefa: detalhe, itemQuadro };
    });
  },
};
