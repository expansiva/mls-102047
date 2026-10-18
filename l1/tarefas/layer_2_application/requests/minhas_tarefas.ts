/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.ts" enhancement="_blank"/>

import type {
  Minhas_tarefasContracts,
  TarefaDetalhe,
  TarefaResumo,
  ItemChecklistLinha,
  ListaOpcao,
  MembroOpcao,
  MembroRef,
} from '/_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { updateTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import type { GetListaOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { listLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/listLista.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import type { GetMembroEquipeOutput } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { updateItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/updateItemChecklist.js';
import type { ItemChecklistRepository } from '/_102047_/l1/tarefas/layer_2_application/ports/itemChecklistRepository.js';
import {
  abrirOcorrenciaTarefa,
  avancarEtapaTarefa,
  reatribuirQuemAge,
} from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';
import type { TransicaoTarefa } from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';

type C = Minhas_tarefasContracts;
type NovoItemChecklist = Parameters<ItemChecklistRepository['create']>[0];

/** Campos da tarefa que este serviço lê; qualquer registro de Tarefa devolvido pelos usecases o satisfaz. */
interface TarefaBase {
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
  };
}

interface ChecklistRegistro {
  id: string;
  version: number;
  ordem: number;
  feito: boolean;
  details: { descricao: string; marcadoEm?: string };
}

type Status = TarefaResumo['status'];
type Prioridade = TarefaResumo['prioridade'];

const STATUS_ENCERRADOS: string[] = ['concluida', 'cancelada'];

function sessao(ctx: RequestContext): string {
  const id = ctx.sessionContext.actorId;
  if (id == null || id === '') {
    throw new AppError('UNAUTHENTICATED', 'Sessão sem pessoa identificada', 401);
  }
  return id;
}

function hoje(ctx: RequestContext): string {
  return ctx.clock.nowIso().slice(0, 10);
}

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function lerTodos<T>(buscar: (page: number) => Promise<{ items: T[]; hasMore: boolean }>): Promise<T[]> {
  const todos: T[] = [];
  let page = 1;
  for (;;) {
    const r = await buscar(page);
    todos.push(...r.items);
    if (!r.hasMore || r.items.length === 0) break;
    page += 1;
  }
  return todos;
}

async function lerChecklist(tarefaId: string, ctx: RequestContext): Promise<ChecklistRegistro[]> {
  const itens = await lerTodos((page) => listItemChecklist({ tarefaId, page, pageSize: 200 }, ctx));
  return [...itens].sort((a, b) => a.ordem - b.ordem);
}

interface Busca {
  lista(id: string): Promise<GetListaOutput>;
  membro(id: string): Promise<GetMembroEquipeOutput>;
}

function criarBusca(ctx: RequestContext): Busca {
  const listas = new Map<string, Promise<GetListaOutput>>();
  const membros = new Map<string, Promise<GetMembroEquipeOutput>>();
  return {
    lista(id: string): Promise<GetListaOutput> {
      let p = listas.get(id);
      if (p === undefined) {
        p = getLista({ id }, ctx);
        listas.set(id, p);
      }
      return p;
    },
    membro(id: string): Promise<GetMembroEquipeOutput> {
      let p = membros.get(id);
      if (p === undefined) {
        p = getMembroEquipe({ id }, ctx);
        membros.set(id, p);
      }
      return p;
    },
  };
}

function membroRef(m: GetMembroEquipeOutput): MembroRef {
  return { details: { identification: { name: m.details.identification.name } } };
}

function linhaChecklist(i: ChecklistRegistro): ItemChecklistLinha {
  const details: ItemChecklistLinha['details'] = { descricao: i.details.descricao };
  if (i.details.marcadoEm != null) details.marcadoEm = i.details.marcadoEm;
  return { id: i.id, version: i.version, ordem: i.ordem, feito: i.feito, details };
}

function estaAberta(status: string): boolean {
  return !STATUS_ENCERRADOS.includes(status);
}

function garantirVisivel(t: TarefaBase, ator: string): void {
  // editarSomenteTarefaVisivel: o membro só vê tarefas que criou ou pelas quais responde.
  if (t.criadorId !== ator && t.responsavelId !== ator) {
    throw new AppError('FORBIDDEN', 'A tarefa não é visível para o membro da sessão', 403, {
      ruleId: 'editarSomenteTarefaVisivel',
    });
  }
}

function garantirVersao(t: TarefaBase, version: number): void {
  if (t.version !== Number(version)) {
    throw new AppError('VERSION_CONFLICT', 'A tarefa foi alterada: a versão lida não é mais a atual', 409);
  }
}

function garantirListaAtiva(lista: GetListaOutput): void {
  if (!lista.ativa) {
    throw new AppError('LISTA_INATIVA', 'Uma lista inativa não pode receber tarefas', 422, {
      ruleId: 'listaInativaNaoRecebeTarefa',
    });
  }
}

function garantirMembroAtivo(membro: GetMembroEquipeOutput): void {
  if (membro.details.identification.status !== 'Active') {
    throw new AppError('RESPONSAVEL_INATIVO', 'O responsável deve ser um membro da equipe ativo', 422, {
      ruleId: 'responsavelDeveSerMembroAtivo',
    });
  }
}

async function montarDetalhe(t: TarefaBase, ctx: RequestContext): Promise<TarefaDetalhe> {
  const ator = sessao(ctx);
  const busca = criarBusca(ctx);
  const [lista, criador, responsavel, checklist] = await Promise.all([
    busca.lista(t.listaId),
    busca.membro(t.criadorId),
    busca.membro(t.responsavelId),
    lerChecklist(t.id, ctx),
  ]);
  const details: TarefaDetalhe['details'] = {};
  if (t.details.descricao != null) details.descricao = t.details.descricao;
  if (t.details.motivoDevolucao != null) details.motivoDevolucao = t.details.motivoDevolucao;
  if (t.details.devolvidaEm != null) details.devolvidaEm = t.details.devolvidaEm;
  if (t.details.concluidaEm != null) details.concluidaEm = t.details.concluidaEm;
  if (t.details.canceladaEm != null) details.canceladaEm = t.details.canceladaEm;
  return {
    id: t.id,
    version: t.version,
    titulo: t.titulo,
    details,
    listaId: t.listaId,
    lista: { nome: lista.nome },
    criadorId: t.criadorId,
    criador: membroRef(criador),
    responsavelId: t.responsavelId,
    responsavel: membroRef(responsavel),
    prazo: t.prazo,
    prioridade: t.prioridade as Prioridade,
    status: t.status as Status,
    criadaEm: t.criadaEm,
    souCriador: t.criadorId === ator, // calculado: criadorId = pessoa da sessão
    souResponsavel: t.responsavelId === ator, // calculado: responsavelId = pessoa da sessão
    checklist: checklist.map(linhaChecklist),
  };
}

interface ConfigTransicao {
  transicao: TransicaoTarefa;
  papel: 'responsavel' | 'criador';
  regraPapel: string;
  estados: string[];
  motivoDevolucao?: string;
}

async function transicionar(
  input: { id: string; version: number },
  ctx: RequestContext,
  cfg: ConfigTransicao,
): Promise<{ tarefa: TarefaDetalhe }> {
  return ctx.data.moduleData.runInTransaction(async (tx) => {
    const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
    const ator = sessao(bound);
    const t = await getTarefa({ id: String(input.id) }, bound);
    garantirVersao(t, input.version);
    const donoEsperado = cfg.papel === 'responsavel' ? t.responsavelId : t.criadorId;
    if (donoEsperado !== ator) {
      throw new AppError(
        'FORBIDDEN',
        cfg.papel === 'responsavel'
          ? 'Somente o responsável da tarefa pode executar esta transição'
          : 'Somente quem criou a tarefa pode executar esta transição',
        403,
        { ruleId: cfg.regraPapel },
      );
    }
    if (STATUS_ENCERRADOS.includes(t.status)) {
      throw new AppError('TAREFA_ENCERRADA', 'Uma tarefa concluída ou cancelada não muda mais de situação', 409, {
        ruleId: 'tarefaEncerradaNaoTransiciona',
      });
    }
    if (!cfg.estados.includes(t.status)) {
      throw new AppError(
        'INVALID_STATE',
        `A transição ${cfg.transicao} não é permitida a partir da situação ${t.status}`,
        409,
      );
    }
    const resultado = cfg.motivoDevolucao !== undefined
      ? await avancarEtapaTarefa(
          { id: t.id, transicao: cfg.transicao, motivoDevolucao: cfg.motivoDevolucao },
          bound,
        )
      : await avancarEtapaTarefa({ id: t.id, transicao: cfg.transicao }, bound);
    return { tarefa: await montarDetalhe(resultado.tarefa, bound) };
  });
}

export const requests: { [K in keyof Minhas_tarefasContracts]: (input: Minhas_tarefasContracts[K]['input'], ctx: RequestContext) => Promise<Minhas_tarefasContracts[K]['output']> } = {
  'tarefas.minhas_tarefas.qryMinhasTarefas': async function (input, ctx) {
    const ator = sessao(ctx);
    const page = input.page >= 1 ? Math.floor(input.page) : 1;
    const pageSize = input.pageSize >= 1 ? Math.min(Math.floor(input.pageSize), 200) : 20;
    const filtro = input.filtro;

    const filtroStatus: { status?: string } = {};
    if (filtro === 'emRevisao') filtroStatus.status = 'emRevisao';
    if (filtro === 'devolvidas') filtroStatus.status = 'emAndamento';

    // editarSomenteTarefaVisivel: só tarefas em que a pessoa da sessão é criadora ou responsável.
    const visiveis = new Map<string, TarefaBase>();
    if (filtro !== 'atribuidasAMim') {
      const criadas = await lerTodos((p) =>
        listTarefa({ criadorId: ator, ...filtroStatus, page: p, pageSize: 200 }, ctx),
      );
      for (const t of criadas) visiveis.set(t.id, t);
    }
    if (filtro !== 'criadasPorMim') {
      const atribuidas = await lerTodos((p) =>
        listTarefa({ responsavelId: ator, ...filtroStatus, page: p, pageSize: 200 }, ctx),
      );
      for (const t of atribuidas) visiveis.set(t.id, t);
    }

    let todas = Array.from(visiveis.values());
    if (filtro === 'devolvidas') {
      todas = todas.filter((t) => t.details.devolvidaEm != null && t.status === 'emAndamento');
    }
    todas.sort((a, b) => (a.prazo < b.prazo ? -1 : a.prazo > b.prazo ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

    const inicio = (page - 1) * pageSize;
    const fim = inicio + pageSize;
    const pagina = todas.slice(inicio, fim);
    const hasMore = todas.length > fim;

    const busca = criarBusca(ctx);
    const dia = hoje(ctx);
    const items: TarefaResumo[] = [];
    for (const t of pagina) {
      const [lista, responsavel, criador, subtarefas, checklist] = await Promise.all([
        busca.lista(t.listaId),
        busca.membro(t.responsavelId),
        busca.membro(t.criadorId),
        lerTodos((p) => listTarefa({ tarefaPaiId: t.id, page: p, pageSize: 200 }, ctx)),
        lerChecklist(t.id, ctx),
      ]);
      const aberta = estaAberta(t.status);
      const prazoDia = t.prazo.slice(0, 10);
      const feitos = checklist.filter((i) => i.feito).length;
      const details: TarefaResumo['details'] = {
        quantidadeSubtarefas: subtarefas.length,
        progressoChecklist: `${feitos}/${checklist.length}`,
        venceHoje: aberta && prazoDia === dia,
        atrasada: aberta && prazoDia < dia,
      };
      if (t.details.devolvidaEm != null) details.devolvidaEm = t.details.devolvidaEm;
      items.push({
        id: t.id,
        version: t.version,
        titulo: t.titulo,
        listaId: t.listaId,
        lista: { nome: lista.nome },
        responsavelId: t.responsavelId,
        responsavel: membroRef(responsavel),
        criadorId: t.criadorId,
        criador: membroRef(criador),
        prioridade: t.prioridade as Prioridade,
        prazo: t.prazo,
        status: t.status as Status,
        details,
      });
    }
    return { tarefas: { items, page, pageSize, hasMore } };
  },

  'tarefas.minhas_tarefas.qryTarefa': async function (input, ctx) {
    const ator = sessao(ctx);
    const t = await getTarefa({ id: String(input.tarefaId) }, ctx);
    garantirVisivel(t, ator);
    return { tarefa: await montarDetalhe(t, ctx) };
  },

  'tarefas.minhas_tarefas.qryListasAtivas': async function (_input, ctx) {
    // listaInativaNaoRecebeTarefa: só listas com ativa = true.
    const listas = await lerTodos((page) => listLista({ ativa: true, page, pageSize: 200 }, ctx));
    const ordenadas = [...listas].sort((a, b) => a.nome.localeCompare(b.nome));
    const resultado: ListaOpcao[] = ordenadas.map((l) => ({
      id: l.id,
      nome: l.nome,
      ativa: l.ativa,
      details: { tipo: l.details.tipo as ListaOpcao['details']['tipo'] },
    }));
    return { listas: resultado };
  },

  'tarefas.minhas_tarefas.qryBuscarMembros': async function (input, ctx) {
    const termo = normalizar(String(input.termo ?? '').trim());
    const membros = await lerTodos((page) => listMembroEquipe({ page, pageSize: 200 }, ctx));
    // responsavelDeveSerMembroAtivo: somente situação Active.
    const encontrados = membros
      .filter((m) => m.details.identification.status === 'Active')
      .filter((m) => normalizar(m.details.identification.name).includes(termo))
      .sort((a, b) => a.details.identification.name.localeCompare(b.details.identification.name))
      .slice(0, 20);
    const resultado: MembroOpcao[] = encontrados.map((m) => ({
      id: m.id,
      details: {
        identification: {
          name: m.details.identification.name,
          status: m.details.identification.status as MembroOpcao['details']['identification']['status'],
        },
      },
    }));
    return { membros: resultado };
  },

  'tarefas.minhas_tarefas.cmdCriarTarefa': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const ator = sessao(bound);
      if (input.criadorId != null && input.criadorId !== ator) {
        throw new AppError('FORBIDDEN', 'O criador da tarefa deve ser a pessoa da sessão', 403);
      }

      const lista = await getLista({ id: String(input.listaId) }, bound);
      garantirListaAtiva(lista); // listaInativaNaoRecebeTarefa
      const responsavel = await getMembroEquipe({ id: String(input.responsavelId) }, bound);
      garantirMembroAtivo(responsavel); // responsavelDeveSerMembroAtivo

      // criacaoIdempotente: a mesma chaveCriacao devolve a tarefa já criada.
      const existentes = await listTarefa({ chaveCriacao: input.chaveCriacao, page: 1, pageSize: 1 }, bound);
      if (existentes.items.length > 0) {
        return { tarefa: await montarDetalhe(existentes.items[0], bound) };
      }

      const aberta = input.details.descricao != null
        ? await abrirOcorrenciaTarefa(
            {
              chaveCriacao: input.chaveCriacao,
              titulo: input.titulo,
              prioridade: input.prioridade,
              prazo: input.prazo,
              listaId: input.listaId,
              responsavelId: input.responsavelId,
              descricao: input.details.descricao,
            },
            bound,
          )
        : await abrirOcorrenciaTarefa(
            {
              chaveCriacao: input.chaveCriacao,
              titulo: input.titulo,
              prioridade: input.prioridade,
              prazo: input.prazo,
              listaId: input.listaId,
              responsavelId: input.responsavelId,
            },
            bound,
          );

      const itens = input.checklist ?? [];
      if (itens.length > 0) {
        const repo = resolveRepository<ItemChecklistRepository>(bound, 'ItemChecklistRepository');
        for (const item of itens) {
          const novo: NovoItemChecklist = {
            id: bound.idGenerator.newId(),
            version: 1,
            tarefaId: aberta.tarefa.id,
            ordem: item.ordem,
            feito: item.feito,
            details: item.feito
              ? { descricao: item.details.descricao, marcadoEm: bound.clock.nowIso() }
              : { descricao: item.details.descricao },
          };
          await repo.create(novo);
        }
      }
      return { tarefa: await montarDetalhe(aberta.tarefa, bound) };
    });
  },

  'tarefas.minhas_tarefas.cmdSalvarEdicao': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const ator = sessao(bound);
      const t = await getTarefa({ id: String(input.id) }, bound);
      garantirVisivel(t, ator); // editarSomenteTarefaVisivel
      garantirVersao(t, input.version);

      if (input.listaId !== t.listaId) {
        const lista = await getLista({ id: String(input.listaId) }, bound);
        garantirListaAtiva(lista); // listaInativaNaoRecebeTarefa
      }

      const trocouResponsavel = input.responsavelId !== t.responsavelId;
      if (trocouResponsavel) {
        if (t.criadorId !== ator) {
          throw new AppError('FORBIDDEN', 'Somente quem criou a tarefa pode trocar o responsável', 403, {
            ruleId: 'reatribuicaoPorCriadorOuGestor',
          });
        }
        const novo = await getMembroEquipe({ id: String(input.responsavelId) }, bound);
        garantirMembroAtivo(novo); // responsavelDeveSerMembroAtivo
      }

      const details: { descricao?: string; motivoDevolucao?: string; devolvidaEm?: string; concluidaEm?: string; canceladaEm?: string } = {};
      if (input.details.descricao != null) details.descricao = input.details.descricao;
      if (t.details.motivoDevolucao != null) details.motivoDevolucao = t.details.motivoDevolucao;
      if (t.details.devolvidaEm != null) details.devolvidaEm = t.details.devolvidaEm;
      if (t.details.concluidaEm != null) details.concluidaEm = t.details.concluidaEm;
      if (t.details.canceladaEm != null) details.canceladaEm = t.details.canceladaEm;

      // edicaoNaoMudaSituacao: a situação gravada é sempre a atual; o responsável só muda pela reatribuição abaixo.
      const atualizada = t.tarefaPaiId != null
        ? await updateTarefa(
            {
              id: t.id,
              version: Number(input.version),
              titulo: input.titulo,
              status: t.status,
              prioridade: input.prioridade,
              prazo: input.prazo,
              listaId: input.listaId,
              responsavelId: t.responsavelId,
              criadorId: t.criadorId,
              tarefaPaiId: t.tarefaPaiId,
              chaveCriacao: t.chaveCriacao,
              details,
            },
            bound,
          )
        : await updateTarefa(
            {
              id: t.id,
              version: Number(input.version),
              titulo: input.titulo,
              status: t.status,
              prioridade: input.prioridade,
              prazo: input.prazo,
              listaId: input.listaId,
              responsavelId: t.responsavelId,
              criadorId: t.criadorId,
              chaveCriacao: t.chaveCriacao,
              details,
            },
            bound,
          );

      if (trocouResponsavel) {
        const reatribuida = await reatribuirQuemAge(
          { id: atualizada.id, novoResponsavelId: String(input.responsavelId) },
          bound,
        );
        return { tarefa: await montarDetalhe(reatribuida.tarefa, bound) };
      }
      return { tarefa: await montarDetalhe(atualizada, bound) };
    });
  },

  'tarefas.minhas_tarefas.cmdSalvarChecklist': async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const ator = sessao(bound);
      const t = await getTarefa({ id: String(input.tarefaId) }, bound);
      garantirVisivel(t, ator); // editarSomenteTarefaVisivel

      const existentes = await lerChecklist(t.id, bound);

      // Valida todos os itens antes de gravar: a versão de cada item existente deve ser a atual.
      for (const item of input.itens) {
        if (item.id == null) continue;
        const atual = existentes.find((e) => e.id === item.id);
        if (atual === undefined) {
          throw new AppError('NOT_FOUND', `Item da checklist ${item.id} não encontrado na tarefa`, 404);
        }
        if (item.version == null) {
          throw new AppError('VALIDATION_ERROR', `O item ${item.id} da checklist exige a versão lida`, 422);
        }
        if (Number(item.version) !== atual.version) {
          throw new AppError('VERSION_CONFLICT', `O item ${item.id} da checklist foi alterado: versão desatualizada`, 409);
        }
      }

      const repo = resolveRepository<ItemChecklistRepository>(bound, 'ItemChecklistRepository');
      const agora = bound.clock.nowIso();
      // checklistNaoMudaSituacao: só itens são gravados; a tarefa não é tocada.
      for (const item of input.itens) {
        if (item.id != null) {
          const atual = existentes.find((e) => e.id === item.id);
          if (atual === undefined || item.version == null) continue;
          let marcadoEm: string | undefined;
          if (item.feito) {
            marcadoEm = atual.feito && atual.details.marcadoEm != null ? atual.details.marcadoEm : agora;
          }
          await updateItemChecklist(
            {
              id: item.id,
              version: Number(item.version),
              tarefaId: t.id,
              ordem: item.ordem,
              feito: item.feito,
              details: marcadoEm !== undefined
                ? { descricao: item.details.descricao, marcadoEm }
                : { descricao: item.details.descricao },
            },
            bound,
          );
        } else {
          const novo: NovoItemChecklist = {
            id: bound.idGenerator.newId(),
            version: 1,
            tarefaId: t.id,
            ordem: item.ordem,
            feito: item.feito,
            details: item.feito
              ? { descricao: item.details.descricao, marcadoEm: agora }
              : { descricao: item.details.descricao },
          };
          await repo.create(novo);
        }
      }
      return { tarefa: await montarDetalhe(t, bound) };
    });
  },

  'tarefas.minhas_tarefas.cmdIniciar': async function (input, ctx) {
    return transicionar(input, ctx, {
      transicao: 'iniciar',
      papel: 'responsavel',
      regraPapel: 'somenteResponsavelExecuta',
      estados: ['aFazer'],
    });
  },

  'tarefas.minhas_tarefas.cmdEnviarRevisao': async function (input, ctx) {
    return transicionar(input, ctx, {
      transicao: 'enviarParaRevisao',
      papel: 'responsavel',
      regraPapel: 'somenteResponsavelExecuta',
      estados: ['emAndamento'],
    });
  },

  'tarefas.minhas_tarefas.cmdAceitar': async function (input, ctx) {
    return transicionar(input, ctx, {
      transicao: 'aceitar',
      papel: 'criador',
      regraPapel: 'somenteCriadorRevisa',
      estados: ['emRevisao'],
    });
  },

  'tarefas.minhas_tarefas.cmdDevolver': async function (input, ctx) {
    const motivo = input.details.motivoDevolucao;
    if (motivo == null || String(motivo).trim() === '') {
      throw new AppError('VALIDATION_ERROR', 'Devolver uma tarefa exige informar o motivo', 422, {
        ruleId: 'devolucaoExigeMotivo',
      });
    }
    return transicionar(input, ctx, {
      transicao: 'devolver',
      papel: 'criador',
      regraPapel: 'somenteCriadorRevisa',
      estados: ['emRevisao'],
      motivoDevolucao: String(motivo).trim(),
    });
  },

  'tarefas.minhas_tarefas.cmdCancelar': async function (input, ctx) {
    return transicionar(input, ctx, {
      transicao: 'cancelar',
      papel: 'criador',
      regraPapel: 'cancelamentoPorCriadorOuGestor',
      estados: ['aFazer', 'emAndamento', 'emRevisao'],
    });
  },
};
