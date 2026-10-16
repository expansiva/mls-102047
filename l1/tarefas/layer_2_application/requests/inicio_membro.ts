/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_membro.ts" enhancement="_blank"/>
import type { Inicio_membroContracts } from '/_102047_/l2/tarefas/web/contracts/inicio_membro.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.js';
import { getTarefa } from '/_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.js';
import { getLista } from '/_102047_/l1/tarefas/layer_2_application/usecases/getLista.js';
import { getMembroEquipe } from '/_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.js';
import { listAvisoVencimento } from '/_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.js';
import { listItemChecklist } from '/_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.js';
import { avancarEtapaTarefa } from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';
import type { TransicaoTarefa } from '/_102047_/l1/tarefas/layer_2_application/workflows/cicloTarefa.js';

type QryOutput = Inicio_membroContracts['tarefas.inicio_membro.qryInicioMembro']['output'];
type Resumo = QryOutput['resumo'];
type TarefaResumo = Resumo['tarefas'][number];
type Pendencia = QryOutput['pendencias'][number];
type AvisoDoDia = NonNullable<QryOutput['avisoHoje']>;
type AvisoTarefa = AvisoDoDia['details']['tarefas'][number];
type StatusTarefa = TarefaResumo['status'];
type Prioridade = TarefaResumo['prioridade'];
type SituacaoPrazo = AvisoTarefa['details']['tarefas']['situacaoPrazo'];
type StatusAviso = AvisoDoDia['status'];
type TarefaItem = Awaited<ReturnType<typeof listTarefa>>['items'][number];
type ResumoEPendencias = { resumo: Resumo; pendencias: Pendencia[] };

const PAGE_SIZE_MAX = 200;

function asStatus(value: string): StatusTarefa {
  switch (value) {
    case 'aFazer':
    case 'emAndamento':
    case 'emRevisao':
    case 'concluida':
    case 'cancelada':
      return value;
    default:
      throw new AppError('INVALID_DATA', `Tarefa com situação desconhecida: ${value}`, 500);
  }
}

function asPrioridade(value: string): Prioridade {
  switch (value) {
    case 'low':
    case 'medium':
    case 'high':
      return value;
    default:
      throw new AppError('INVALID_DATA', `Tarefa com prioridade desconhecida: ${value}`, 500);
  }
}

function asStatusAviso(value: string): StatusAviso {
  switch (value) {
    case 'pending':
    case 'completed':
    case 'failed':
      return value;
    default:
      throw new AppError('INVALID_DATA', `Aviso com situação desconhecida: ${value}`, 500);
  }
}

function asSituacaoPrazo(value: unknown): SituacaoPrazo {
  if (value === 'dueToday' || value === 'overdue') return value;
  throw new AppError('INVALID_DATA', `Tarefa do aviso com situação de prazo desconhecida: ${String(value)}`, 500);
}

function prioridadePeso(p: string): number {
  if (p === 'high') return 0;
  if (p === 'medium') return 1;
  return 2;
}

function diaDe(valor: string): string {
  return valor.slice(0, 10);
}

function hojeIso(ctx: RequestContext): string {
  const agora = ctx.clock.nowIso();
  const tz = ctx.organization.timezone;
  if (tz) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(agora));
  }
  return diaDe(agora);
}

function membroDaSessao(ctx: RequestContext): string {
  const id = ctx.sessionContext.actorId;
  if (!id) throw new AppError('UNAUTHORIZED', 'Membro da sessão não identificado', 401);
  return id;
}

function ehAberta(status: string): boolean {
  return status === 'aFazer' || status === 'emAndamento' || status === 'emRevisao';
}

async function listarTodasTarefas(ctx: RequestContext, filtro: { responsavelId?: string; criadorId?: string }): Promise<TarefaItem[]> {
  const todas: TarefaItem[] = [];
  let page = 1;
  for (;;) {
    const res = await listTarefa({ ...filtro, page, pageSize: PAGE_SIZE_MAX }, ctx);
    todas.push(...res.items);
    if (!res.hasMore) break;
    page += 1;
  }
  return todas;
}

async function progressoChecklist(ctx: RequestContext, cache: Map<string, string>, tarefaId: string): Promise<string> {
  const cached = cache.get(tarefaId);
  if (cached !== undefined) return cached;
  let total = 0;
  let feitos = 0;
  let page = 1;
  for (;;) {
    const res = await listItemChecklist({ tarefaId, page, pageSize: PAGE_SIZE_MAX }, ctx);
    for (const item of res.items) {
      total += 1;
      if (item.feito) feitos += 1;
    }
    if (!res.hasMore) break;
    page += 1;
  }
  const texto = `${feitos}/${total}`;
  cache.set(tarefaId, texto);
  return texto;
}

async function nomeMembro(ctx: RequestContext, cache: Map<string, string>, id: string): Promise<string> {
  const cached = cache.get(id);
  if (cached !== undefined) return cached;
  const membro = await getMembroEquipe({ id }, ctx);
  const nome = membro.details.identification.name;
  cache.set(id, nome);
  return nome;
}

function montarResumoPessoa(name: string): Pendencia['responsavel'] {
  return { details: { identification: { details: { identification: { name } } } } };
}

function lerTarefasDoAviso(raw: unknown): AvisoTarefa[] {
  const lista: unknown[] = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
  return lista.map((item) => {
    if (typeof item !== 'object' || item === null) {
      throw new AppError('INVALID_DATA', 'Tarefa do aviso em formato inválido', 500);
    }
    const r = item as { tarefaId?: unknown; prazo?: unknown; situacaoPrazo?: unknown };
    if (typeof r.tarefaId !== 'string' || typeof r.prazo !== 'string') {
      throw new AppError('INVALID_DATA', 'Tarefa do aviso sem tarefaId ou prazo', 500);
    }
    return {
      details: {
        tarefas: {
          tarefaId: r.tarefaId,
          prazo: r.prazo,
          situacaoPrazo: asSituacaoPrazo(r.situacaoPrazo),
        },
      },
    };
  });
}

async function comporResumoEPendencias(ctx: RequestContext, membroId: string): Promise<ResumoEPendencias> {
  const hoje = hojeIso(ctx);
  const checklistCache = new Map<string, string>();
  const nomesCache = new Map<string, string>();
  const listasCache = new Map<string, string>();

  const comoResponsavel = await listarTodasTarefas(ctx, { responsavelId: membroId });
  const comoCriador = await listarTodasTarefas(ctx, { criadorId: membroId });

  // Resumo: tarefas abertas do membro (details.aberta, venceHoje, atrasada calculados, nunca lidos).
  const abertas = comoResponsavel
    .filter((t) => ehAberta(t.status))
    .sort((a, b) => (diaDe(a.prazo) < diaDe(b.prazo) ? -1 : diaDe(a.prazo) > diaDe(b.prazo) ? 1 : 0));

  let quantidadeVencemHoje = 0;
  let quantidadeAtrasadas = 0;
  const tarefasResumo: TarefaResumo[] = [];
  for (const t of abertas) {
    const prazo = diaDe(t.prazo);
    const venceHoje = prazo === hoje;
    const atrasada = prazo < hoje;
    if (venceHoje) quantidadeVencemHoje += 1;
    if (atrasada) quantidadeAtrasadas += 1;
    let nomeLista = listasCache.get(t.listaId);
    if (nomeLista === undefined) {
      const lista = await getLista({ id: t.listaId }, ctx);
      nomeLista = lista.nome;
      listasCache.set(t.listaId, nomeLista);
    }
    tarefasResumo.push({
      id: t.id,
      titulo: t.titulo,
      status: asStatus(t.status),
      prazo: t.prazo,
      prioridade: asPrioridade(t.prioridade),
      listaId: t.listaId,
      lista: { nome: nomeLista },
      details: {
        details: {
          aberta: true,
          venceHoje,
          atrasada,
          progressoChecklist: await progressoChecklist(ctx, checklistCache, t.id),
        },
      },
    });
  }

  const resumo: Resumo = {
    quantidadeAbertas: abertas.length,
    quantidadeVencemHoje,
    quantidadeAtrasadas,
    tarefas: tarefasResumo,
  };

  // Pendências: somenteResponsavelExecuta (responsável em aFazer/emAndamento) e somenteCriadorRevisa (criador em emRevisao).
  const candidatas: { tarefa: TarefaItem; acao: string }[] = [];
  for (const t of comoResponsavel) {
    if (t.status === 'aFazer') {
      candidatas.push({ tarefa: t, acao: 'iniciar' });
    } else if (t.status === 'emAndamento') {
      candidatas.push({ tarefa: t, acao: t.details.devolvidaEm ? 'ajustar' : 'enviarParaRevisao' });
    }
  }
  for (const t of comoCriador) {
    if (t.status === 'emRevisao') {
      candidatas.push({ tarefa: t, acao: 'revisar' });
    }
  }
  candidatas.sort((a, b) => {
    const pa = diaDe(a.tarefa.prazo);
    const pb = diaDe(b.tarefa.prazo);
    if (pa !== pb) return pa < pb ? -1 : 1;
    return prioridadePeso(a.tarefa.prioridade) - prioridadePeso(b.tarefa.prioridade);
  });

  const pendencias: Pendencia[] = [];
  for (const c of candidatas) {
    const t = c.tarefa;
    const detalhes: Pendencia['details']['details'] = {
      progressoChecklist: await progressoChecklist(ctx, checklistCache, t.id),
    };
    if (t.details.motivoDevolucao != null) detalhes.motivoDevolucao = t.details.motivoDevolucao;
    if (t.details.devolvidaEm != null) detalhes.devolvidaEm = t.details.devolvidaEm;
    pendencias.push({
      id: t.id,
      version: t.version,
      titulo: t.titulo,
      status: asStatus(t.status),
      prazo: t.prazo,
      prioridade: asPrioridade(t.prioridade),
      responsavelId: t.responsavelId,
      criadorId: t.criadorId,
      responsavel: montarResumoPessoa(await nomeMembro(ctx, nomesCache, t.responsavelId)),
      criador: montarResumoPessoa(await nomeMembro(ctx, nomesCache, t.criadorId)),
      acaoEsperada: c.acao,
      details: { details: detalhes },
    });
  }

  return { resumo, pendencias };
}

async function executarTransicao(
  ctx: RequestContext,
  entrada: { id: string; version: number },
  transicao: TransicaoTarefa,
  quem: 'responsavel' | 'criador',
  motivoDevolucao?: string,
): Promise<ResumoEPendencias> {
  const membroId = membroDaSessao(ctx);
  return ctx.data.moduleData.runInTransaction(async (tx) => {
    const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
    const tarefa = await getTarefa({ id: String(entrada.id) }, bound);

    // tarefaEncerradaNaoTransiciona
    if (tarefa.status === 'concluida' || tarefa.status === 'cancelada') {
      throw new AppError('TAREFA_ENCERRADA', 'Uma tarefa concluída ou cancelada não muda mais de situação', 409, { ruleId: 'tarefaEncerradaNaoTransiciona' });
    }
    if (quem === 'responsavel') {
      // somenteResponsavelExecuta
      if (tarefa.responsavelId !== membroId) {
        throw new AppError('FORBIDDEN', 'Somente o responsável da tarefa pode executar esta transição', 403, { ruleId: 'somenteResponsavelExecuta' });
      }
    } else {
      // somenteCriadorRevisa
      if (tarefa.criadorId !== membroId) {
        throw new AppError('FORBIDDEN', 'Somente quem criou a tarefa pode aceitá-la ou devolvê-la', 403, { ruleId: 'somenteCriadorRevisa' });
      }
    }
    if (tarefa.version !== Number(entrada.version)) {
      throw new AppError('VERSION_CONFLICT', 'A tarefa foi alterada: versão desatualizada', 409);
    }

    if (motivoDevolucao !== undefined) {
      await avancarEtapaTarefa({ tarefaId: tarefa.id, transicao, motivoDevolucao }, bound);
    } else {
      await avancarEtapaTarefa({ tarefaId: tarefa.id, transicao }, bound);
    }
    return comporResumoEPendencias(bound, membroId);
  });
}

export const requests: { [K in keyof Inicio_membroContracts]: (input: Inicio_membroContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_membroContracts[K]['output']> } = {
  'tarefas.inicio_membro.qryInicioMembro': async function (input, ctx) {
    const membroId = membroDaSessao(ctx);
    const hoje = hojeIso(ctx);
    const { resumo, pendencias } = await comporResumoEPendencias(ctx, membroId);

    // avisoUnicoPorResponsavelEDia: no máximo um aviso por responsável e dia; lê o do membro com dataReferencia = hoje.
    const avisos = await listAvisoVencimento({ responsavelId: membroId, dataReferencia: hoje, page: 1, pageSize: 1 }, ctx);
    const aviso = avisos.items.length > 0 ? avisos.items[0] : undefined;

    const saida: QryOutput = { resumo, pendencias };
    if (aviso !== undefined) {
      // avisoSomenteTarefasAbertasVencendo: o aviso guarda só tarefas abertas que vencem hoje ou atrasadas, como no momento da geração.
      const tarefasAviso = lerTarefasDoAviso(aviso.details.tarefas);
      const atrasadas = tarefasAviso.filter((t) => t.details.tarefas.situacaoPrazo === 'overdue').length;
      saida.avisoHoje = {
        id: aviso.id,
        dataReferencia: aviso.dataReferencia,
        status: asStatusAviso(aviso.status),
        details: {
          details: {
            geradoEm: aviso.details.geradoEm,
            quantidadeTarefas: tarefasAviso.length,
            quantidadeAtrasadas: atrasadas,
          },
          tarefas: tarefasAviso,
        },
      };
    }
    return saida;
  },

  'tarefas.inicio_membro.cmdIniciarTarefa': async function (input, ctx) {
    return executarTransicao(ctx, { id: input.id, version: input.version }, 'iniciar', 'responsavel');
  },

  'tarefas.inicio_membro.cmdEnviarParaRevisao': async function (input, ctx) {
    return executarTransicao(ctx, { id: input.id, version: input.version }, 'enviarParaRevisao', 'responsavel');
  },

  'tarefas.inicio_membro.cmdAceitarEntrega': async function (input, ctx) {
    return executarTransicao(ctx, { id: input.id, version: input.version }, 'aceitar', 'criador');
  },

  'tarefas.inicio_membro.cmdDevolverComMotivo': async function (input, ctx) {
    const motivo = typeof input.details.motivoDevolucao === 'string' ? input.details.motivoDevolucao.trim() : '';
    // devolucaoExigeMotivo
    if (motivo === '') {
      throw new AppError('MOTIVO_OBRIGATORIO', 'Devolver uma tarefa para ajuste exige informar o motivo', 400, { ruleId: 'devolucaoExigeMotivo' });
    }
    return executarTransicao(ctx, { id: input.id, version: input.version }, 'devolver', 'criador', motivo);
  },
};
