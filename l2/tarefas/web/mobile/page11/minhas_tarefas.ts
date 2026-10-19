/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
  TarefaResumo,
  TarefaDetalhe,
  ChecklistItemDraft,
  FiltroTarefas,
  TarefasPage,
  Prioridade,
  SalvarEdicaoDraft,
  CriarTarefaDraft,
} from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  voltar: 'Voltar',
  tituloLista: 'Minhas tarefas',
  novaTarefa: 'Nova tarefa',
  fTodas: 'Todas',
  fCriadas: 'Criadas por mim',
  fAtribuidas: 'Atribuídas a mim',
  fRevisao: 'Em revisão',
  fDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colChecklist: 'Checklist',
  prioridade: 'Prioridade',
  pBaixa: 'Baixa',
  pMedia: 'Média',
  pAlta: 'Alta',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  subtarefas: 'subtarefas',
  carregarMais: 'Carregar mais tarefas',
  carregando: 'Carregando…',
  vazioTitulo: 'Nenhuma tarefa por aqui',
  vazioTexto: 'Não há tarefas neste filtro. Escolha outro filtro ou crie uma nova tarefa.',
  erroLista: 'Não foi possível carregar suas tarefas.',
  tentarNovamente: 'Tentar novamente',
  precondicaoTitulo: 'Faltam informações para abrir esta tela',
  precondicaoTexto: 'A tela foi aberta sem o que ela precisa para carregar. Volte para a página anterior e abra de novo.',
  voltarPagina: 'Voltar à página anterior',
  tituloTarefa: 'Tarefa',
  semTarefa: 'Escolha uma tarefa na lista para ver os detalhes.',
  verLista: 'Ver minhas tarefas',
  devolvidaTitulo: 'Devolvida para ajuste',
  campoLista: 'Lista',
  campoCriador: 'Criada por',
  campoResponsavel: 'Responsável',
  campoPrazo: 'Prazo',
  campoDescricao: 'Descrição',
  campoTitulo: 'Título',
  campoSituacao: 'Situação',
  checklistTitulo: 'Checklist',
  checklistVazia: 'Esta tarefa não tem itens na checklist.',
  itemFeito: 'Feito',
  itemPendente: 'Pendente',
  marcarItens: 'Marcar itens',
  editarTarefa: 'Editar tarefa',
  iniciar: 'Iniciar tarefa',
  enviar: 'Enviar para revisão',
  reenviar: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolverMenu: 'Devolver com motivo',
  cancelarMenu: 'Cancelar tarefa',
  maisAcoes: 'Mais ações',
  historico: 'Histórico da tarefa',
  colQuando: 'Quando',
  colAconteceu: 'O que aconteceu',
  hCriada: 'Tarefa criada por',
  hDevolvida: 'Devolvida para ajuste',
  hConcluida: 'Entrega aceita, tarefa concluída',
  hCancelada: 'Tarefa cancelada',
  historicoVazio: 'Sem registros ainda.',
  tituloDevolver: 'Motivo da devolução',
  motivoAjuda: 'Explique o que precisa ser ajustado. O responsável verá este texto ao retomar.',
  btnDevolver: 'Devolver ao responsável',
  tituloCancelar: 'Confirmar cancelamento',
  cancelarPergunta: 'Você vai cancelar a tarefa',
  cancelarAviso: 'Uma tarefa cancelada não muda mais de situação.',
  btnCancelar: 'Cancelar esta tarefa',
  btnManter: 'Manter a tarefa',
  tituloNova: 'Dados da nova tarefa',
  tituloEditar: 'Dados da tarefa',
  escolhaLista: 'Escolha a lista',
  escolhaPrazo: 'Escolha o prazo',
  buscarResponsavel: 'Busque pelo nome',
  ajudaResponsavel: 'Só quem criou a tarefa troca o responsável.',
  checklistInicial: 'Checklist inicial',
  addItem: 'Adicionar item',
  removerItem: 'Remover item',
  itemPlaceholder: 'Descrição do item',
  registrar: 'Registrar tarefa',
  salvarEdicao: 'Salvar alterações',
  ajudaEdicao: 'Editar não muda a situação da tarefa.',
  tituloChecklist: 'Checklist da tarefa',
  salvarChecklist: 'Salvar checklist',
  ajudaChecklist: 'Marcar itens não muda a situação da tarefa.',
  okChecklist: 'Checklist salva.',
  vazio: '—',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

type Status = TarefaResumo['status'];
type Campos = Pick<SalvarEdicaoDraft, 'listaId' | 'titulo' | 'details' | 'prioridade' | 'prazo' | 'responsavelId'>;
type AcaoPrimaria = 'iniciar' | 'enviar' | 'aceitar' | null;

const CHIP: Record<Status, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};

function statusLabel(m: PageMessageType, s: Status) {
  switch (s) {
    case 'aFazer': return m.stAFazer;
    case 'emAndamento': return m.stEmAndamento;
    case 'emRevisao': return m.stEmRevisao;
    case 'concluida': return m.stConcluida;
    default: return m.stCancelada;
  }
}

function prioridadeLabel(m: PageMessageType, p: Prioridade) {
  return p === 'high' ? m.pAlta : p === 'medium' ? m.pMedia : m.pBaixa;
}

function lang() {
  return document.documentElement.lang || undefined;
}

function fmtDate(v: string | null | undefined) {
  if (!v) return '';
  const only = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  const d = only ? new Date(Number(only[1]), Number(only[2]) - 1, Number(only[3])) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtDateTime(v: string | null | undefined) {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function rowsOf(t: TarefasPage | null): TarefaResumo[] {
  if (!t) return [];
  const c = t as unknown as { items?: TarefaResumo[]; rows?: TarefaResumo[]; data?: TarefaResumo[] };
  if (Array.isArray(c)) return c as unknown as TarefaResumo[];
  return c.items ?? c.rows ?? c.data ?? [];
}

function pageInfo(t: TarefasPage | null) {
  const c = (t ?? {}) as unknown as { hasMore?: boolean; page?: number };
  return { hasMore: !!c.hasMore, page: c.page ?? 1 };
}

function withText(e: Event, fn: (v: string) => void) {
  const d = (e as CustomEvent<{ value?: unknown }>).detail;
  if (d && typeof d === 'object' && typeof d.value === 'string') fn(d.value);
}

function acoesDe(t: TarefaDetalhe) {
  const aberta = t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
  let primaria: AcaoPrimaria = null;
  if (t.souResponsavel && t.status === 'aFazer') primaria = 'iniciar';
  else if (t.souResponsavel && t.status === 'emAndamento') primaria = 'enviar';
  else if (t.souCriador && t.status === 'emRevisao') primaria = 'aceitar';
  return { primaria, devolver: t.souCriador && t.status === 'emRevisao', cancelar: t.souCriador && aberta };
}

function camposOk(d: Campos) {
  return !!d.listaId && !!d.titulo?.trim() && !!d.prioridade && !!d.prazo && !!d.responsavelId;
}

function itensOk(itens: ChecklistItemDraft[]) {
  return itens.every((i) => !!i.details.descricao?.trim());
}

function menuClose(e: Event) {
  (e.currentTarget as HTMLElement).closest('details')?.removeAttribute('open');
}

@customElement('tarefas--web--mobile--page11--minhas_tarefas-102047')
export class TarefasMobilePage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    return html`
      <div class="mx-auto w-full max-w-[430px] px-4 py-3 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .backLabel=${m.voltar}
          .value=${this.scenary || (this.selectedTarefa !== null ? 'tarefa' : 'lista')}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'lista') this.selectDetalheTarefa(null);
            }
          }}
        >
          <Scene value="lista" title=${m.tituloLista}>${this.renderLista()}</Scene>
          <Scene value="tarefa" title=${m.tituloTarefa} nav="back" backTo="lista">${this.renderTarefa()}</Scene>
          <Scene value="campos" title=${m.tituloEditar} nav="back" backTo="tarefa">${this.renderEditar()}</Scene>
          <Scene value="checklist" title=${m.tituloChecklist} nav="back" backTo="tarefa">${this.renderChecklistForm()}</Scene>
          <Scene value="devolver" title=${m.tituloDevolver} nav="back" backTo="tarefa">${this.renderDevolver()}</Scene>
          <Scene value="cancelar" title=${m.tituloCancelar} nav="back" backTo="tarefa">${this.renderCancelar()}</Scene>
          <Scene value="nova" title=${m.tituloNova} nav="back" backTo="lista">${this.renderNova()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  /* ---------- small building blocks ---------- */

  private renderBtn(
    label: string,
    run: () => void,
    opts: { variant?: string; loading?: boolean; disabled?: boolean; size?: string } = {},
  ) {
    return html`
      <grouptriggeraction--ml-button-standard
        class="block w-full"
        data-class="w-full"
        data-variant=${opts.variant ?? 'primary'}
        size=${opts.size ?? 'lg'}
        ?loading=${!!opts.loading}
        ?disabled=${!!opts.disabled}
        @action=${() => run()}
      >
        <Label>${label}</Label>
      </grouptriggeraction--ml-button-standard>
    `;
  }

  private renderFeedback(type: string, text: string) {
    return html`
      <groupnotifyuser--ml-contextual-feedback type=${type} visible .dismissible=${false}>
        <Message>${text}</Message>
      </groupnotifyuser--ml-contextual-feedback>
    `;
  }

  private renderErro(code: string | undefined, message: string | undefined, retry: () => void) {
    const m = this.msg;
    if (code === 'client.preconditionMissing') {
      return html`
        <div class="flex flex-col gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-live="polite">
          <p class="font-semibold text-[var(--text-strong,currentColor)]">${m.precondicaoTitulo}</p>
          <p class="text-sm">${m.precondicaoTexto}</p>
          ${this.renderBtn(m.voltarPagina, () => history.back(), { variant: 'secondary' })}
        </div>
      `;
    }
    return html`
      <div class="flex flex-col gap-3" aria-live="polite">
        ${this.renderFeedback('error', message || m.erroLista)} ${this.renderBtn(m.tentarNovamente, retry, { variant: 'secondary' })}
      </div>
    `;
  }

  /* ---------- lista ---------- */

  private renderLista() {
    const m = this.msg;
    const rows = rowsOf(this.tarefas);
    const info = pageInfo(this.tarefas);
    const loading = this.qryMinhasTarefasStatus === 'loading';
    const selIdx = this.selectedTarefa ? rows.findIndex((r) => r.id === this.selectedTarefa) : -1;
    return html`
      <section data-organism-id="listaTarefas" class="flex flex-col gap-3">
        ${this.renderBtn(
          m.novaTarefa,
          () => {
            this.clearCmdCriarTarefaDraft();
            if (this.listas.length === 0) this.qryListasAtivas();
            this.setScenario('nova');
          },
          { size: 'md' },
        )}
        <groupnavigatesection--ml-navigate-pills
          .value=${this.filtro ?? 'todas'}
          ?disabled=${false}
          @change=${(e: CustomEvent<{ value: string }>) => {
            const v = e.detail.value;
            this.qryMinhasTarefas(v === 'todas' ? null : (v as FiltroTarefas));
          }}
        >
          <Tab value="todas" title=${m.fTodas}></Tab>
          <Tab value="criadasPorMim" title=${m.fCriadas}></Tab>
          <Tab value="atribuidasAMim" title=${m.fAtribuidas}></Tab>
          <Tab value="emRevisao" title=${m.fRevisao}></Tab>
          <Tab value="devolvidas" title=${m.fDevolvidas}></Tab>
        </groupnavigatesection--ml-navigate-pills>

        ${this.qryMinhasTarefasError
          ? this.renderErro(this.qryMinhasTarefasError.code, this.qryMinhasTarefasError.message, () => {
              this.qryMinhasTarefas();
            })
          : html`
              <groupviewtable--ml-responsive-table
                .value=${selIdx >= 0 ? String(selIdx) : ''}
                ?loading=${loading && rows.length === 0}
                @rowClick=${(e: CustomEvent<{ index: number }>) => {
                  const r = rows[e.detail.index];
                  if (r) {
                    this.selectDetalheTarefa(r.id);
                    this.setScenario('tarefa');
                  }
                }}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead key="tarefa">${m.colTarefa}</TableHead>
                    <TableHead key="prazo">${m.colPrazo}</TableHead>
                    <TableHead key="situacao">${m.colSituacao}</TableHead>
                    <TableHead key="checklist">${m.colChecklist}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>${rows.map((r) => this.renderLinha(r))}</TableBody>
                <Empty>
                  <div class="flex flex-col gap-1 py-8 text-center">
                    <p class="font-semibold text-[var(--text-strong,currentColor)]">${m.vazioTitulo}</p>
                    <p class="text-sm text-[var(--text-muted,currentColor)]">${m.vazioTexto}</p>
                  </div>
                </Empty>
                <Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.carregando}</div></Loading>
              </groupviewtable--ml-responsive-table>
              ${info.hasMore
                ? this.renderBtn(m.carregarMais, () => this.qryMinhasTarefas(undefined, info.page + 1, true), {
                    variant: 'secondary',
                    loading,
                    size: 'md',
                  })
                : nothing}
            `}
      </section>
    `;
  }

  private renderLinha(r: TarefaResumo) {
    const m = this.msg;
    const prazoCls = r.details.atrasada
      ? 'font-semibold text-[var(--status-error-text,currentColor)]'
      : r.details.venceHoje
        ? 'font-semibold text-[var(--text-strong,currentColor)]'
        : '';
    return html`
      <TableRow key=${r.id}>
        <TableCell>
          <div class="font-medium text-[var(--text-strong,currentColor)]">${r.titulo}</div>
          <div class="text-xs text-[var(--text-muted,currentColor)]">${r.lista.nome} · ${r.responsavel.details.identification.name}</div>
          <div class="text-xs text-[var(--text-muted,currentColor)]">${m.prioridade}: ${prioridadeLabel(m, r.prioridade)}</div>
        </TableCell>
        <TableCell>
          <div class=${prazoCls}>${fmtDate(r.prazo)}</div>
          ${r.details.atrasada
            ? html`<div class="text-xs">${m.atrasada}</div>`
            : r.details.venceHoje
              ? html`<div class="text-xs">${m.venceHoje}</div>`
              : nothing}
        </TableCell>
        <TableCell>
          <span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CHIP[r.status]}">${statusLabel(m, r.status)}</span>
        </TableCell>
        <TableCell>
          <div>${r.details.progressoChecklist}</div>
          ${r.details.quantidadeSubtarefas > 0
            ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${r.details.quantidadeSubtarefas} ${m.subtarefas}</div>`
            : nothing}
        </TableCell>
      </TableRow>
    `;
  }

  /* ---------- tarefa aberta ---------- */

  private renderSemTarefa() {
    const m = this.msg;
    if (this.qryTarefaStatus === 'loading') {
      return html`<p role="status" aria-busy="true" class="py-8 text-center text-[var(--text-muted,currentColor)]">${m.carregando}</p>`;
    }
    if (this.qryTarefaError) {
      return this.renderErro(this.qryTarefaError.code, this.qryTarefaError.message, () => {
        if (this.selectedTarefa) this.qryTarefa(this.selectedTarefa);
      });
    }
    return html`
      <div class="flex flex-col gap-3 py-6 text-center">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${m.semTarefa}</p>
        ${this.renderBtn(m.verLista, () => { this.setScenario('lista'); this.selectDetalheTarefa(null); }, { variant: 'secondary' })}
      </div>
    `;
  }

  private renderTarefa() {
    const m = this.msg;
    const t = this.tarefa;
    if (!t) return this.renderSemTarefa();
    const a = acoesDe(t);
    const progresso = rowsOf(this.tarefas).find((r) => r.id === t.id)?.details.progressoChecklist;
    const eventos: { quando: string; texto: string }[] = [
      { quando: t.criadaEm, texto: `${m.hCriada} ${t.criador.details.identification.name}` },
    ];
    if (t.details.devolvidaEm) {
      eventos.push({
        quando: t.details.devolvidaEm,
        texto: t.details.motivoDevolucao ? `${m.hDevolvida}: ${t.details.motivoDevolucao}` : m.hDevolvida,
      });
    }
    if (t.details.concluidaEm) eventos.push({ quando: t.details.concluidaEm, texto: m.hConcluida });
    if (t.details.canceladaEm) eventos.push({ quando: t.details.canceladaEm, texto: m.hCancelada });

    const prim =
      a.primaria === 'iniciar'
        ? { label: m.iniciar, loading: this.cmdIniciarStatus === 'loading', run: () => this.cmdIniciar() }
        : a.primaria === 'enviar'
          ? {
              label: t.details.devolvidaEm ? m.reenviar : m.enviar,
              loading: this.cmdEnviarRevisaoStatus === 'loading',
              run: () => this.cmdEnviarRevisao(),
            }
          : a.primaria === 'aceitar'
            ? { label: m.aceitar, loading: this.cmdAceitarStatus === 'loading', run: () => this.cmdAceitar() }
            : null;
    const menu = a.devolver || a.cancelar;
    const err = this.cmdIniciarError ?? this.cmdEnviarRevisaoError ?? this.cmdAceitarError;
    const itens = t.checklist;

    return html`
      <div class="flex flex-col gap-4">
        <div data-organism-id="detalheTarefa" class="flex flex-col gap-4">
          ${t.details.motivoDevolucao
            ? html`
                <groupnotifyuser--ml-notify-banner type="warning" visible .dismissible=${false}>
                  <Title>${m.devolvidaTitulo}</Title>
                  <Message>${t.details.motivoDevolucao}</Message>
                </groupnotifyuser--ml-notify-banner>
              `
            : nothing}
          <groupviewcard--ml-vertical-card>
            <CardHeader>
              <CardTitle>${t.titulo}</CardTitle>
              <CardDescription>${t.lista.nome}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt class="text-[var(--text-muted,currentColor)]">${m.campoSituacao}</dt>
                <dd>
                  <span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CHIP[t.status]}">${statusLabel(m, t.status)}</span>
                </dd>
                <dt class="text-[var(--text-muted,currentColor)]">${m.campoPrazo}</dt>
                <dd class="text-[var(--text-strong,currentColor)]">${fmtDate(t.prazo) || m.vazio}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${m.prioridade}</dt>
                <dd>${prioridadeLabel(m, t.prioridade)}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${m.campoResponsavel}</dt>
                <dd>${t.responsavel.details.identification.name}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${m.campoCriador}</dt>
                <dd>${t.criador.details.identification.name}</dd>
                <dt class="text-[var(--text-muted,currentColor)]">${m.campoDescricao}</dt>
                <dd>${t.details.descricao || m.vazio}</dd>
              </dl>
            </CardContent>
          </groupviewcard--ml-vertical-card>

          <section class="flex flex-col gap-2" aria-labelledby="chk-h">
            <div class="flex items-baseline justify-between">
              <h3 id="chk-h" class="font-semibold text-[var(--text-strong,currentColor)]">${m.checklistTitulo}</h3>
              ${progresso ? html`<span class="text-sm text-[var(--text-muted,currentColor)]">${progresso}</span>` : nothing}
            </div>
            ${itens.length === 0
              ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.checklistVazia}</p>`
              : html`
                  <ul class="flex flex-col divide-y divide-[var(--border-subtle,currentColor)] rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
                    ${itens.map(
                      (it) => html`
                        <li class="flex min-h-[44px] items-center gap-3 px-3 py-2 text-sm">
                          <span aria-hidden="true" class="w-5 text-center">${it.feito ? '✓' : '○'}</span>
                          <span class="sr-only">${it.feito ? m.itemFeito : m.itemPendente}</span>
                          <span class=${it.feito ? 'text-[var(--text-muted,currentColor)] line-through' : ''}>${it.details.descricao}</span>
                        </li>
                      `,
                    )}
                  </ul>
                `}
            ${this.renderBtn(m.marcarItens, () => this.setScenario('checklist'), { variant: 'secondary', size: 'md' })}
          </section>
          ${this.renderBtn(m.editarTarefa, () => this.setScenario('campos'), { variant: 'secondary', size: 'md' })}
        </div>

        <details data-organism-id="historicoTarefa" class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
          <summary class="flex min-h-[44px] cursor-pointer items-center px-3 font-medium text-[var(--text-strong,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">
            ${m.historico}
          </summary>
          <div class="px-3 pb-3">
            <groupviewdata--ml-timeline-view>
              <Columns>
                <Column field="quando" header=${m.colQuando}></Column>
                <Column field="evento" header=${m.colAconteceu}></Column>
              </Columns>
              <Rows>
                ${eventos.map((ev) => html`<Row><Cell>${fmtDateTime(ev.quando)}</Cell><Cell>${ev.texto}</Cell></Row>`)}
              </Rows>
              <Empty><div class="py-4 text-center text-sm">${m.historicoVazio}</div></Empty>
            </groupviewdata--ml-timeline-view>
          </div>
        </details>

        ${prim || menu
          ? html`
              <div
                data-organism-id="acoesTarefa"
                class="sticky bottom-0 -mx-4 flex flex-col gap-2 border-t border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-3"
              >
                ${err ? this.renderFeedback('error', err.message) : nothing}
                <div class="flex items-stretch gap-2">
                  <div class="flex-1">
                    ${prim ? this.renderBtn(prim.label, prim.run, { loading: prim.loading }) : nothing}
                  </div>
                  ${menu
                    ? html`
                        <details class="relative">
                          <summary
                            aria-label=${m.maisAcoes}
                            class="flex min-h-[48px] min-w-[48px] cursor-pointer list-none items-center justify-center rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] text-xl text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                          >
                            <span aria-hidden="true">⋯</span>
                          </summary>
                          <div class="absolute bottom-full right-0 z-10 mb-2 flex w-64 flex-col rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-1 shadow-lg">
                            ${a.devolver
                              ? html`<button type="button" class="min-h-[44px] rounded px-3 text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${(e: Event) => { menuClose(e); this.setScenario('devolver'); }}>${m.devolverMenu}</button>`
                              : nothing}
                            ${a.cancelar
                              ? html`<button type="button" class="min-h-[44px] rounded px-3 text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${(e: Event) => { menuClose(e); this.setScenario('cancelar'); }}>${m.cancelarMenu}</button>`
                              : nothing}
                          </div>
                        </details>
                      `
                    : nothing}
                </div>
              </div>
            `
          : html`<div data-organism-id="acoesTarefa"></div>`}
      </div>
    `;
  }

  /* ---------- devolver / cancelar ---------- */

  private renderDevolver() {
    const m = this.msg;
    const motivo = this.cmdDevolverDraft.details.motivoDevolucao ?? '';
    const set = (e: Event) =>
      withText(e, (v) => this.setCmdDevolverDraft({ ...this.cmdDevolverDraft, details: { ...this.cmdDevolverDraft.details, motivoDevolucao: v } }));
    return html`
      <div data-organism-id="acoesTarefa" class="flex flex-col gap-4">
        ${this.tarefa ? html`<p class="font-medium text-[var(--text-strong,currentColor)]">${this.tarefa.titulo}</p>` : nothing}
        <groupentertext--ml-multiline-text .rows=${5} required .value=${motivo} @input=${set} @change=${set}>
          <Label>${m.tituloDevolver}</Label>
          <Helper>${m.motivoAjuda}</Helper>
        </groupentertext--ml-multiline-text>
        ${this.cmdDevolverError ? this.renderFeedback('error', this.cmdDevolverError.message) : nothing}
        ${this.renderBtn(
          m.btnDevolver,
          () => {
            this.cmdDevolver().then(() => {
              if (this.cmdDevolverStatus === 'success') this.setScenario('tarefa');
            });
          },
          { loading: this.cmdDevolverStatus === 'loading', disabled: !motivo.trim() },
        )}
      </div>
    `;
  }

  private renderCancelar() {
    const m = this.msg;
    return html`
      <div data-organism-id="acoesTarefa" class="flex flex-col gap-4">
        <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
          <p class="text-sm">${m.cancelarPergunta}</p>
          <p class="mt-1 font-semibold text-[var(--text-strong,currentColor)]">${this.tarefa ? this.tarefa.titulo : ''}</p>
          <p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${m.cancelarAviso}</p>
        </div>
        ${this.cmdCancelarError ? this.renderFeedback('error', this.cmdCancelarError.message) : nothing}
        ${this.renderBtn(m.btnManter, () => this.setScenario('tarefa'), { variant: 'secondary' })}
        ${this.renderBtn(
          m.btnCancelar,
          () => {
            this.cmdCancelar().then(() => {
              if (this.cmdCancelarStatus === 'success') this.setScenario('tarefa');
            });
          },
          { variant: 'danger', loading: this.cmdCancelarStatus === 'loading' },
        )}
      </div>
    `;
  }

  /* ---------- formulários ---------- */

  private renderCampos(d: Campos, set: (p: Partial<Campos>) => void, ownerFallback: { id: string; name: string } | null) {
    const m = this.msg;
    const owners: { id: string; name: string }[] = this.membros.map((x) => ({ id: x.id, name: x.details.identification.name }));
    if (ownerFallback && d.responsavelId === ownerFallback.id && !owners.some((o) => o.id === ownerFallback.id)) {
      owners.unshift(ownerFallback);
    }
    const prazoLoc = document.documentElement.lang || 'pt-BR';
    return html`
      <groupselectone--ml-select
        required
        .value=${d.listaId}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ listaId: e.detail.value })}
      >
        <Label>${m.campoLista}</Label>
        <Trigger>${m.escolhaLista}</Trigger>
        ${this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
      </groupselectone--ml-select>

      <groupentertext--ml-enter-text
        required
        .value=${d.titulo ?? ''}
        @input=${(e: Event) => withText(e, (v) => set({ titulo: v }))}
        @change=${(e: Event) => withText(e, (v) => set({ titulo: v }))}
      >
        <Label>${m.campoTitulo}</Label>
      </groupentertext--ml-enter-text>

      <groupentertext--ml-multiline-text
        .rows=${4}
        .value=${d.details.descricao ?? ''}
        @input=${(e: Event) => withText(e, (v) => set({ details: { ...d.details, descricao: v } }))}
        @change=${(e: Event) => withText(e, (v) => set({ details: { ...d.details, descricao: v } }))}
      >
        <Label>${m.campoDescricao}</Label>
      </groupentertext--ml-multiline-text>

      <groupselectone--ml-segmented-control
        required
        .value=${d.prioridade}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ prioridade: e.detail.value as Prioridade | null })}
      >
        <Label>${m.prioridade}</Label>
        <Item value="low">${m.pBaixa}</Item>
        <Item value="medium">${m.pMedia}</Item>
        <Item value="high">${m.pAlta}</Item>
      </groupselectone--ml-segmented-control>

      <groupenterdate--ml-date-picker
        required
        locale=${prazoLoc}
        placeholder=${m.escolhaPrazo}
        .value=${d.prazo}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ prazo: e.detail.value })}
      >
        <Label>${m.campoPrazo}</Label>
      </groupenterdate--ml-date-picker>

      <groupselectone--ml-combobox
        required
        placeholder=${m.buscarResponsavel}
        .value=${d.responsavelId}
        @input=${(e: Event) => withText(e, (v) => { this.qryBuscarMembros(v); })}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ responsavelId: e.detail.value })}
      >
        <Label>${m.campoResponsavel}</Label>
        <Helper>${m.ajudaResponsavel}</Helper>
        ${owners.map((o) => html`<Item value=${o.id}>${o.name}</Item>`)}
      </groupselectone--ml-combobox>
    `;
  }

  private renderItens(itens: ChecklistItemDraft[], setItens: (n: ChecklistItemDraft[]) => void, canRemove: boolean) {
    const m = this.msg;
    const patch = (i: number, p: Partial<ChecklistItemDraft>) => setItens(itens.map((it, k) => (k === i ? { ...it, ...p } : it)));
    return html`
      <ul class="flex flex-col gap-2">
        ${itens.map(
          (it, i) => html`
            <li class="flex items-start gap-2">
              <groupenterboolean--ml-checkbox-preference
                class="pt-3"
                .value=${!!it.feito}
                @change=${(e: CustomEvent<{ value: boolean }>) => patch(i, { feito: e.detail.value })}
              >
                <Label><span class="sr-only">${m.itemFeito}</span></Label>
              </groupenterboolean--ml-checkbox-preference>
              <groupentertext--ml-enter-text
                class="min-w-0 flex-1"
                placeholder=${m.itemPlaceholder}
                .value=${it.details.descricao ?? ''}
                @input=${(e: Event) => withText(e, (v) => patch(i, { details: { descricao: v } }))}
                @change=${(e: Event) => withText(e, (v) => patch(i, { details: { descricao: v } }))}
              >
                <Label><span class="sr-only">${m.itemPlaceholder}</span></Label>
              </groupentertext--ml-enter-text>
              ${canRemove
                ? html`<button
                    type="button"
                    aria-label=${m.removerItem}
                    class="min-h-[44px] min-w-[44px] rounded-md text-[var(--text-muted,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                    @click=${() => setItens(itens.filter((_, k) => k !== i).map((x, k) => ({ ...x, ordem: k + 1 })))}
                  >
                    <span aria-hidden="true">✕</span>
                  </button>`
                : nothing}
            </li>
          `,
        )}
      </ul>
      ${this.renderBtn(
        m.addItem,
        () => setItens([...itens, { id: null, version: null, details: { descricao: '' }, ordem: itens.length + 1, feito: false }]),
        { variant: 'secondary', size: 'md' },
      )}
    `;
  }

  private renderNova() {
    const m = this.msg;
    const d: CriarTarefaDraft = this.cmdCriarTarefaDraft;
    const ok = camposOk(d) && itensOk(d.checklist);
    return html`
      <form
        data-organism-id="formTarefa"
        class="flex flex-col gap-4"
        @submit=${(e: Event) => e.preventDefault()}
      >
        ${this.renderCampos(d, (p) => this.setCmdCriarTarefaDraft({ ...d, ...p }), null)}
        <fieldset class="flex flex-col gap-2">
          <legend class="mb-1 font-semibold text-[var(--text-strong,currentColor)]">${m.checklistInicial}</legend>
          ${this.renderItens(d.checklist, (n) => this.setCmdCriarTarefaDraft({ ...d, checklist: n }), true)}
        </fieldset>
        ${this.cmdCriarTarefaError ? this.renderFeedback('error', this.cmdCriarTarefaError.message) : nothing}
        ${this.renderBtn(
          m.registrar,
          () => {
            this.cmdCriarTarefa().then(() => {
              if (this.cmdCriarTarefaStatus === 'success') this.setScenario('tarefa');
            });
          },
          { loading: this.cmdCriarTarefaStatus === 'loading', disabled: !ok },
        )}
      </form>
    `;
  }

  private renderEditar() {
    const m = this.msg;
    const d = this.cmdSalvarEdicaoDraft;
    const t = this.tarefa;
    const fallback = t ? { id: t.responsavelId, name: t.responsavel.details.identification.name } : null;
    return html`
      <form data-organism-id="formTarefa" class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${m.ajudaEdicao}</p>
        ${this.renderCampos(d, (p) => this.setCmdSalvarEdicaoDraft({ ...d, ...p }), fallback)}
        ${this.cmdSalvarEdicaoError ? this.renderFeedback('error', this.cmdSalvarEdicaoError.message) : nothing}
        ${this.renderBtn(
          m.salvarEdicao,
          () => {
            this.cmdSalvarEdicao().then(() => {
              if (this.cmdSalvarEdicaoStatus === 'success') this.setScenario('tarefa');
            });
          },
          { loading: this.cmdSalvarEdicaoStatus === 'loading', disabled: !camposOk(d) },
        )}
      </form>
    `;
  }

  private renderChecklistForm() {
    const m = this.msg;
    const c = this.cmdSalvarChecklistDraft;
    return html`
      <form data-organism-id="formTarefa" class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
        ${this.tarefa ? html`<p class="font-medium text-[var(--text-strong,currentColor)]">${this.tarefa.titulo}</p>` : nothing}
        <p class="text-sm text-[var(--text-muted,currentColor)]">${m.ajudaChecklist}</p>
        ${this.renderItens(c.itens, (n) => this.setCmdSalvarChecklistDraft({ ...c, itens: n }), false)}
        ${this.cmdSalvarChecklistError ? this.renderFeedback('error', this.cmdSalvarChecklistError.message) : nothing}
        ${this.cmdSalvarChecklistStatus === 'success' ? this.renderFeedback('success', m.okChecklist) : nothing}
        ${this.renderBtn(m.salvarChecklist, () => this.cmdSalvarChecklist(), {
          loading: this.cmdSalvarChecklistStatus === 'loading',
          disabled: !itensOk(c.itens),
        })}
      </form>
    `;
  }
}
