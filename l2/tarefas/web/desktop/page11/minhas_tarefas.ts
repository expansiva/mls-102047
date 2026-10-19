/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
  ChecklistItemDraft,
  CriarTarefaDraft,
  ErrorState,
  FiltroTarefas,
  Prioridade,
  RequestStatus,
  SalvarEdicaoDraft,
  TarefaDetalhe,
  TarefaResumo,
} from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-combobox.js';
import '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Minhas tarefas',
  pageSubtitle: 'Acompanhe prazo, situação e checklist do que você criou ou executa.',
  novaTarefa: 'Nova tarefa',
  filtroTodas: 'Todas',
  filtroCriadas: 'Criadas por mim',
  filtroAtribuidas: 'Atribuídas a mim',
  filtroRevisao: 'Em revisão',
  filtroDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colResponsavel: 'Responsável',
  colPrioridade: 'Prioridade',
  colSituacao: 'Situação',
  colPrazo: 'Prazo',
  carregandoTarefas: 'Carregando suas tarefas…',
  listaVaziaTitulo: 'Nenhuma tarefa nesta visão',
  listaVaziaDica: 'Troque o filtro ou crie uma nova tarefa.',
  carregarMais: 'Carregar mais tarefas',
  processando: 'Aguarde…',
  subtarefas: 'subtarefas',
  checklist: 'Checklist',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  devolvidaEm: 'Devolvida em',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prBaixa: 'Baixa',
  prMedia: 'Média',
  prAlta: 'Alta',
  erroPaginaTitulo: 'Não foi possível carregar suas tarefas',
  tentarNovamente: 'Tentar novamente',
  semContextoTitulo: 'Faltam informações para abrir esta página',
  semContextoMsg: 'A página foi aberta sem o contexto de que precisa. Volte para onde você estava e abra Minhas tarefas de lá.',
  voltarPagina: 'Voltar para a página anterior',
  tituloInicio: 'Painel da tarefa',
  inicioMsg: 'Escolha uma tarefa na lista para ver os detalhes e agir sobre ela.',
  inicioDica: 'Para registrar algo novo, use o botão acima da lista.',
  tituloDetalhe: 'Tarefa aberta',
  tituloNova: 'Dados da nova tarefa',
  tituloEditar: 'Ajustar tarefa',
  voltar: 'Voltar',
  carregandoDetalhe: 'Carregando a tarefa…',
  erroDetalhe: 'Não foi possível abrir a tarefa.',
  papelCriador: 'Você criou esta tarefa',
  papelResponsavel: 'Você é o responsável',
  lista: 'Lista',
  criadaPor: 'Criada por',
  responsavel: 'Responsável',
  prazo: 'Prazo',
  prioridade: 'Prioridade',
  situacao: 'Situação',
  criadaEm: 'Criada em',
  descricao: 'Descrição',
  semDescricao: 'Sem descrição.',
  motivoTitulo: 'Motivo da devolução',
  editarTarefa: 'Editar tarefa',
  semChecklist: 'Esta tarefa não tem itens na checklist.',
  salvarChecklist: 'Salvar checklist',
  checklistSalva: 'Checklist salva.',
  erroAcao: 'Não foi possível concluir:',
  iniciar: 'Iniciar tarefa',
  enviarRevisao: 'Enviar para revisão',
  reenviarRevisao: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolver: 'Devolver para ajuste',
  devolverConfirmar: 'Devolver com este motivo',
  motivoLabel: 'Motivo da devolução (obrigatório)',
  motivoPh: 'Explique o que precisa ser ajustado',
  cancelarTarefa: 'Cancelar tarefa',
  cancelarConfirma: 'Confirma o cancelamento da tarefa',
  cancelarSim: 'Sim, cancelar esta tarefa',
  semAcoes: 'Nenhuma ação sua nesta etapa da tarefa.',
  historico: 'Histórico da tarefa',
  colQuando: 'Quando',
  colEvento: 'O que aconteceu',
  hCriada: 'Tarefa criada por',
  hAtribuida: 'Atribuída a',
  hDevolvida: 'Devolvida para ajuste',
  hConcluida: 'Entrega aceita, tarefa concluída',
  hCancelada: 'Tarefa cancelada',
  semHistorico: 'Sem registros ainda.',
  dadosTarefa: 'Dados da tarefa',
  titulo: 'Título',
  phTitulo: 'Resuma a tarefa em poucas palavras',
  phLista: 'Escolha a lista',
  semListas: 'Nenhuma lista ativa disponível',
  phResponsavel: 'Busque o responsável pelo nome',
  dicaResponsavel: 'Digite o nome para buscar. Só quem criou a tarefa troca o responsável.',
  phPrazo: 'Escolha a data limite',
  feito: 'Marcar como feito',
  subir: 'Subir item',
  descer: 'Descer item',
  remover: 'Remover item',
  adicionarItem: 'Adicionar item',
  phItem: 'O que precisa ser feito',
  registrarTarefa: 'Registrar tarefa',
  salvarTarefa: 'Salvar tarefa',
  erroSalvar: 'Não foi possível salvar:',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
};
/// **collab_i18n_end**

type Campos = {
  listaId: string | null;
  titulo: string | null;
  descricao: string | null;
  prioridade: Prioridade | null;
  prazo: string | null;
  responsavelId: string | null;
};

type Variante = 'primary' | 'secondary' | 'danger' | 'ghost';

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50 disabled:cursor-not-allowed';

function btnClass(v: Variante): string {
  switch (v) {
    case 'primary':
      return `${BTN_BASE} bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)] border border-transparent`;
    case 'secondary':
      return `${BTN_BASE} bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border border-[var(--button-secondary-border,currentColor)]`;
    case 'danger':
      return `${BTN_BASE} bg-[var(--button-danger-bg,transparent)] text-[var(--button-danger-text,currentColor)] border border-transparent`;
    default:
      return `${BTN_BASE} bg-transparent text-[var(--text-default,currentColor)] border border-[var(--border-default,currentColor)]`;
  }
}

function btn(v: Variante, label: string, onClick: () => void, disabled = false) {
  return html`<button type="button" class=${btnClass(v)} ?disabled=${disabled} @click=${onClick}>${label}</button>`;
}

function statusClass(s: TarefaResumo['status']): string {
  switch (s) {
    case 'emAndamento':
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'emRevisao':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'concluida':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function prioClass(p: TarefaResumo['prioridade']): string {
  if (p === 'high') return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)] font-semibold';
  if (p === 'medium') return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  return 'text-[var(--text-muted,currentColor)]';
}

const CHIP = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs';

function pick(e: Event): string | null | undefined {
  const d = (e as CustomEvent<{ value?: string | null }>).detail;
  if (!d || typeof d !== 'object' || !('value' in d)) return undefined;
  return d.value ?? null;
}

function pickBool(e: Event): boolean | undefined {
  const d = (e as CustomEvent<{ value?: boolean }>).detail;
  if (!d || typeof d !== 'object' || typeof d.value !== 'boolean') return undefined;
  return d.value;
}

function fmtDate(v: string | null | undefined): string {
  if (!v) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium' }).format(d);
}

function fmtDateTime(v: string | null | undefined): string {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function camposDe(d: CriarTarefaDraft | SalvarEdicaoDraft): Campos {
  return {
    listaId: d.listaId,
    titulo: d.titulo,
    descricao: d.details.descricao,
    prioridade: d.prioridade,
    prazo: d.prazo,
    responsavelId: d.responsavelId,
  };
}

function aplicar<T extends CriarTarefaDraft | SalvarEdicaoDraft>(d: T, p: Partial<Campos>): T {
  const { descricao, ...rest } = p;
  return { ...d, ...rest, details: descricao !== undefined ? { ...d.details, descricao } : d.details } as T;
}

function camposValidos(c: Campos): boolean {
  return Boolean(c.listaId && c.titulo && c.titulo.trim() && c.prioridade && c.prazo && c.responsavelId);
}

function itensValidos(itens: ChecklistItemDraft[]): boolean {
  return itens.every((i) => (i.details.descricao ?? '').trim() !== '');
}

function reordenar(itens: ChecklistItemDraft[], de: number, para: number): ChecklistItemDraft[] {
  if (para < 0 || para >= itens.length) return itens;
  const next = itens.slice();
  const [it] = next.splice(de, 1);
  next.splice(para, 0, it);
  return next.map((x, i) => ({ ...x, ordem: i + 1 }));
}

function novoItem(ordem: number): ChecklistItemDraft {
  return { id: null, version: null, details: { descricao: '' }, ordem, feito: false };
}

@customElement('tarefas--web--desktop--page11--minhas_tarefas-102047')
export class TarefasDesktopPage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    const semContexto = this.pageStatus === 'error' && this.qryMinhasTarefasError?.code === 'client.preconditionMissing';
    return html`
      <div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6">
        <header class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${m.pageTitle}</h1>
            <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${m.pageSubtitle}</p>
          </div>
          ${semContexto
            ? nothing
            : btn('primary', m.novaTarefa, () => {
                this.clearCmdCriarTarefaDraft();
                this.selectDetalheTarefa(null);
                this.setScenario('nova');
                if (this.listas.length === 0) this.qryListasAtivas();
              })}
        </header>
        ${semContexto ? this.renderSemContexto() : this.renderCorpo()}
      </div>
    `;
  }

  private renderSemContexto() {
    const m = this.msg;
    return html`
      <div role="alert" class="mx-auto max-w-xl rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${m.semContextoTitulo}</h2>
        <p class="mt-2 text-sm">${m.semContextoMsg}</p>
        <div class="mt-4">${btn('secondary', m.voltarPagina, () => history.back())}</div>
      </div>
    `;
  }

  private renderCorpo() {
    return html`
      <div class="grid grid-cols-[minmax(0,1fr)_minmax(420px,34rem)] items-start gap-6">
        <section data-organism-id="listaTarefas" class="min-w-0" aria-busy=${this.qryMinhasTarefasStatus === 'loading' ? 'true' : 'false'}>
          ${this.renderLista()}
        </section>
        <aside class="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          ${this.renderPainel()}
        </aside>
      </div>
    `;
  }

  /* ---------------- list ---------------- */

  private renderLista() {
    const m = this.msg;
    const pg = this.tarefas;
    const rows = pg ? pg.items : [];
    const sel = rows.findIndex((r) => r.id === this.selectedTarefa);
    const loading = this.pageStatus === 'loading' || (this.qryMinhasTarefasStatus === 'loading' && rows.length === 0);
    return html`
      <div class="mb-3">
        <groupnavigatesection--ml-navigate-pills
          .value=${this.filtro ?? 'todas'}
          @change=${(e: Event) => {
            const v = pick(e);
            if (typeof v !== 'string') return;
            this.qryMinhasTarefas(v === 'todas' ? null : (v as FiltroTarefas));
          }}
        >
          <Tab value="todas" title=${m.filtroTodas}></Tab>
          <Tab value="criadasPorMim" title=${m.filtroCriadas}></Tab>
          <Tab value="atribuidasAMim" title=${m.filtroAtribuidas}></Tab>
          <Tab value="emRevisao" title=${m.filtroRevisao}></Tab>
          <Tab value="devolvidas" title=${m.filtroDevolvidas}></Tab>
        </groupnavigatesection--ml-navigate-pills>
      </div>
      ${this.pageStatus === 'error'
        ? html`
            <div class="mb-3 flex items-center gap-3 rounded-md border border-[var(--border-default,currentColor)] p-3" role="alert">
              <div class="flex-1 text-sm">
                <p class="font-medium text-[var(--text-strong,currentColor)]">${m.erroPaginaTitulo}</p>
                <p>${this.qryMinhasTarefasError?.message ?? ''}</p>
              </div>
              ${btn('secondary', m.tentarNovamente, () => this.qryMinhasTarefas())}
            </div>
          `
        : nothing}
      <groupviewtable--ml-data-table
        .loading=${loading}
        .value=${sel >= 0 ? String(sel) : ''}
        @rowClick=${(e: CustomEvent<{ index: number }>) => {
          const row = rows[e.detail.index];
          if (!row) return;
          this.setScenario('detalhe');
          this.selectDetalheTarefa(row.id);
        }}
      >
        <TableHeader>
          <TableRow>
            <TableHead key="tarefa">${m.colTarefa}</TableHead>
            <TableHead key="responsavel">${m.colResponsavel}</TableHead>
            <TableHead key="prioridade">${m.colPrioridade}</TableHead>
            <TableHead key="situacao">${m.colSituacao}</TableHead>
            <TableHead key="prazo" align="right">${m.colPrazo}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>${rows.map((t) => this.renderLinha(t))}</TableBody>
        <Empty>
          <div class="py-10 text-center">
            <p class="font-medium text-[var(--text-strong,currentColor)]">${m.listaVaziaTitulo}</p>
            <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${m.listaVaziaDica}</p>
          </div>
        </Empty>
        <Loading><div class="py-10 text-center text-[var(--text-muted,currentColor)]">${m.carregandoTarefas}</div></Loading>
      </groupviewtable--ml-data-table>
      ${pg && pg.hasMore
        ? html`<div class="mt-3 flex justify-center">
            <button
              type="button"
              class=${btnClass('secondary')}
              ?disabled=${this.qryMinhasTarefasStatus === 'loading'}
              @click=${() => this.qryMinhasTarefas(undefined, pg.page + 1, true)}
            >
              ${this.qryMinhasTarefasStatus === 'loading' ? m.processando : m.carregarMais}
            </button>
          </div>`
        : nothing}
    `;
  }

  private statusLabel(s: TarefaResumo['status']) {
    const m = this.msg;
    switch (s) {
      case 'aFazer':
        return m.stAFazer;
      case 'emAndamento':
        return m.stEmAndamento;
      case 'emRevisao':
        return m.stEmRevisao;
      case 'concluida':
        return m.stConcluida;
      default:
        return m.stCancelada;
    }
  }

  private prioLabel(p: TarefaResumo['prioridade']) {
    const m = this.msg;
    if (p === 'high') return m.prAlta;
    if (p === 'medium') return m.prMedia;
    return m.prBaixa;
  }

  private renderLinha(t: TarefaResumo) {
    const m = this.msg;
    const dataClass = t.details.atrasada
      ? 'font-semibold text-[var(--status-error-text,currentColor)]'
      : t.details.venceHoje
        ? 'font-semibold text-[var(--text-strong,currentColor)]'
        : '';
    return html`
      <TableRow key=${t.id}>
        <TableCell>
          <div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
          <div class="text-xs text-[var(--text-muted,currentColor)]">
            ${t.lista.nome}${t.details.quantidadeSubtarefas ? html` · ${t.details.quantidadeSubtarefas} ${m.subtarefas}` : nothing}${t.details.progressoChecklist
              ? html` · ${m.checklist} ${t.details.progressoChecklist}`
              : nothing}
          </div>
        </TableCell>
        <TableCell>${t.responsavel.details.identification.name}</TableCell>
        <TableCell><span class="${CHIP} ${prioClass(t.prioridade)}">${this.prioLabel(t.prioridade)}</span></TableCell>
        <TableCell>
          <span class="${CHIP} ${statusClass(t.status)}">${this.statusLabel(t.status)}</span>
          ${t.details.devolvidaEm
            ? html`<div class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${m.devolvidaEm} ${fmtDate(t.details.devolvidaEm)}</div>`
            : nothing}
        </TableCell>
        <TableCell>
          <div class="whitespace-nowrap text-right">
            <div class=${dataClass}>${fmtDate(t.prazo)}</div>
            ${t.details.atrasada
              ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${m.atrasada}</div>`
              : t.details.venceHoje
                ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${m.venceHoje}</div>`
                : nothing}
          </div>
        </TableCell>
      </TableRow>
    `;
  }

  /* ---------------- panel (scene host) ---------------- */

  private renderPainel() {
    const m = this.msg;
    return html`
      <molecules--ml-scenary-102020
        mode="scenary"
        backLabel=${m.voltar}
        .value=${this.scenary || (this.selectedTarefa !== null ? 'detalhe' : 'inicio')}
        @change=${(e: CustomEvent<{ value: string }>) => {
          if (e.target === e.currentTarget) {
            this.setScenario(e.detail.value);
            if (e.detail.value === 'inicio' || e.detail.value === 'nova') this.selectDetalheTarefa(null);
          }
        }}
      >
        <Scene value="inicio" title=${m.tituloInicio}>
          <div class="p-4 text-sm">
            <p class="text-[var(--text-strong,currentColor)]">${m.inicioMsg}</p>
            <p class="mt-2 text-[var(--text-muted,currentColor)]">${m.inicioDica}</p>
          </div>
        </Scene>
        <Scene value="detalhe" title=${m.tituloDetalhe} nav="back" backTo="inicio">
          <div class="p-4">${this.renderDetalheEstado()}</div>
        </Scene>
        <Scene value="nova" title=${m.tituloNova} nav="back" backTo="inicio">
          <div class="p-4">${this.renderNova()}</div>
        </Scene>
        <Scene value="editar" title=${m.tituloEditar} nav="back" backTo="detalhe">
          <div class="p-4">${this.tarefa ? this.renderEditar(this.tarefa) : nothing}</div>
        </Scene>
      </molecules--ml-scenary-102020>
    `;
  }

  private renderErro(prefix: string, err: ErrorState) {
    if (!err) return nothing;
    return html`<p role="alert" class="text-sm text-[var(--text-default,currentColor)]">${prefix} ${err.message}</p>`;
  }

  private renderDetalheEstado() {
    const m = this.msg;
    if (this.qryTarefaStatus === 'loading') {
      return html`<p aria-busy="true" class="text-sm text-[var(--text-muted,currentColor)]">${m.carregandoDetalhe}</p>`;
    }
    if (this.qryTarefaStatus === 'error') {
      const id = this.selectedTarefa;
      return html`
        <div class="flex flex-col gap-3">
          ${this.renderErro(m.erroDetalhe, this.qryTarefaError)}
          ${id !== null ? btn('secondary', m.tentarNovamente, () => this.selectDetalheTarefa(id)) : nothing}
        </div>
      `;
    }
    return this.tarefa ? this.renderDetalhe(this.tarefa) : nothing;
  }

  /* ---------------- detail ---------------- */

  private renderDetalhe(t: TarefaDetalhe) {
    const m = this.msg;
    const encerrada = t.status === 'concluida' || t.status === 'cancelada';
    const d = this.cmdSalvarChecklistDraft;
    return html`
      <div class="flex flex-col gap-5">
        <div data-organism-id="detalheTarefa" class="flex flex-col gap-4">
          <div>
            <h3 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${t.titulo}</h3>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span class="${CHIP} ${statusClass(t.status)}">${this.statusLabel(t.status)}</span>
              <span class="${CHIP} ${prioClass(t.prioridade)}">${this.prioLabel(t.prioridade)}</span>
              ${t.souCriador ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${m.papelCriador}</span>` : nothing}
              ${t.souResponsavel ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${m.papelResponsavel}</span>` : nothing}
            </div>
          </div>
          ${t.details.motivoDevolucao
            ? html`
                <groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}>
                  <Title>${m.motivoTitulo}</Title>
                  <Message>${t.details.motivoDevolucao}</Message>
                </groupnotifyuser--ml-contextual-feedback>
              `
            : nothing}
          <groupviewcard--ml-vertical-card>
            <CardContent>
              <p class="mb-4 whitespace-pre-wrap text-sm">${t.details.descricao ? t.details.descricao : m.semDescricao}</p>
              <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.lista}</dt><dd>${t.lista.nome}</dd></div>
                <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.prazo}</dt><dd>${fmtDate(t.prazo)}</dd></div>
                <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.responsavel}</dt><dd>${t.responsavel.details.identification.name}</dd></div>
                <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.criadaPor}</dt><dd>${t.criador.details.identification.name}</dd></div>
                <div><dt class="text-xs text-[var(--text-muted,currentColor)]">${m.criadaEm}</dt><dd>${fmtDateTime(t.criadaEm)}</dd></div>
              </dl>
            </CardContent>
          </groupviewcard--ml-vertical-card>
          <div>
            <h4 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.checklist}</h4>
            ${d.itens.length === 0
              ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.semChecklist}</p>`
              : html`
                  <ul class="flex flex-col gap-1">
                    ${d.itens.map(
                      (it, i) => html`
                        <li>
                          <groupenterboolean--ml-checkbox-preference
                            .value=${Boolean(it.feito)}
                            ?disabled=${encerrada}
                            @change=${(e: Event) => {
                              const v = pickBool(e);
                              if (v === undefined) return;
                              this.setCmdSalvarChecklistDraft({
                                ...d,
                                itens: d.itens.map((x, j) => (j === i ? { ...x, feito: v } : x)),
                              });
                            }}
                          >
                            <Label>${it.details.descricao}</Label>
                          </groupenterboolean--ml-checkbox-preference>
                        </li>
                      `,
                    )}
                  </ul>
                  ${encerrada
                    ? nothing
                    : html`
                        <div class="mt-3 flex flex-col gap-2">
                          ${this.renderErro(m.erroSalvar, this.cmdSalvarChecklistError)}
                          <div class="flex items-center gap-3">
                            ${this.cmdBtn('secondary', m.salvarChecklist, this.cmdSalvarChecklistStatus, () => this.cmdSalvarChecklist())}
                            <span aria-live="polite" class="text-xs text-[var(--text-muted,currentColor)]">
                              ${this.cmdSalvarChecklistStatus === 'success' ? m.checklistSalva : ''}
                            </span>
                          </div>
                        </div>
                      `}
                `}
          </div>
          <div>
            ${btn('ghost', m.editarTarefa, () => {
              this.setScenario('editar');
              if (this.listas.length === 0) this.qryListasAtivas();
            })}
          </div>
        </div>
        ${this.renderHistorico(t)}
        ${this.renderAcoes(t)}
      </div>
    `;
  }

  private cmdBtn(v: Variante, label: string, status: RequestStatus, onClick: () => void, disabled = false) {
    const busy = status === 'loading';
    return html`<button type="button" class=${btnClass(v)} aria-busy=${busy ? 'true' : 'false'} ?disabled=${busy || disabled} @click=${onClick}>
      ${busy ? this.msg.processando : label}
    </button>`;
  }

  private renderHistorico(t: TarefaDetalhe) {
    const m = this.msg;
    return html`
      <details data-organism-id="historicoTarefa" class="rounded-md border border-[var(--border-subtle,currentColor)] p-3">
        <summary class="cursor-pointer text-sm font-semibold text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">
          ${m.historico}
        </summary>
        <div class="mt-3">
          <groupviewdata--ml-timeline-view>
            <Columns>
              <Column field="quando" header=${m.colQuando}></Column>
              <Column field="evento" header=${m.colEvento}></Column>
            </Columns>
            <Rows>
              <Row>
                <Cell>${fmtDateTime(t.criadaEm)}</Cell>
                <Cell>
                  <div>${m.hCriada} ${t.criador.details.identification.name}</div>
                  <div class="text-xs text-[var(--text-muted,currentColor)]">${m.hAtribuida} ${t.responsavel.details.identification.name}</div>
                </Cell>
              </Row>
              ${t.details.devolvidaEm
                ? html`<Row>
                    <Cell>${fmtDateTime(t.details.devolvidaEm)}</Cell>
                    <Cell>
                      <div>${m.hDevolvida}</div>
                      ${t.details.motivoDevolucao ? html`<div class="text-xs text-[var(--text-muted,currentColor)]">${t.details.motivoDevolucao}</div>` : nothing}
                    </Cell>
                  </Row>`
                : nothing}
              ${t.details.concluidaEm
                ? html`<Row><Cell>${fmtDateTime(t.details.concluidaEm)}</Cell><Cell>${m.hConcluida}</Cell></Row>`
                : nothing}
              ${t.details.canceladaEm
                ? html`<Row><Cell>${fmtDateTime(t.details.canceladaEm)}</Cell><Cell>${m.hCancelada}</Cell></Row>`
                : nothing}
            </Rows>
            <Empty>${m.semHistorico}</Empty>
          </groupviewdata--ml-timeline-view>
        </div>
      </details>
    `;
  }

  private renderAcoes(t: TarefaDetalhe) {
    const m = this.msg;
    const aberta = t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
    const podeIniciar = t.souResponsavel && t.status === 'aFazer';
    const podeEnviar = t.souResponsavel && t.status === 'emAndamento';
    const podeRevisar = t.souCriador && t.status === 'emRevisao';
    const podeCancelar = t.souCriador && aberta;
    const temAcao = podeIniciar || podeEnviar || podeRevisar || podeCancelar;
    const err =
      this.cmdIniciarError ?? this.cmdEnviarRevisaoError ?? this.cmdAceitarError ?? this.cmdDevolverError ?? this.cmdCancelarError;
    const motivo = this.cmdDevolverDraft.details.motivoDevolucao ?? '';
    return html`
      <div
        data-organism-id="acoesTarefa"
        class="sticky bottom-0 flex flex-col gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3"
      >
        ${temAcao ? nothing : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.semAcoes}</p>`}
        ${this.renderErro(m.erroAcao, err)}
        <div class="flex flex-wrap items-start gap-2">
          ${podeIniciar ? this.cmdBtn('primary', m.iniciar, this.cmdIniciarStatus, () => this.cmdIniciar()) : nothing}
          ${podeEnviar
            ? this.cmdBtn('primary', t.details.devolvidaEm ? m.reenviarRevisao : m.enviarRevisao, this.cmdEnviarRevisaoStatus, () => this.cmdEnviarRevisao())
            : nothing}
          ${podeRevisar ? this.cmdBtn('primary', m.aceitar, this.cmdAceitarStatus, () => this.cmdAceitar()) : nothing}
        </div>
        ${podeRevisar
          ? html`
              <details class="rounded-md border border-[var(--border-subtle,currentColor)] p-3">
                <summary class="${btnClass('ghost')} w-fit cursor-pointer list-none">${m.devolver}</summary>
                <div class="mt-3 flex flex-col gap-3">
                  <groupentertext--ml-multiline-text
                    .rows=${3}
                    .value=${motivo}
                    placeholder=${m.motivoPh}
                    required
                    @input=${(e: Event) => this.setMotivo(e)}
                    @change=${(e: Event) => this.setMotivo(e)}
                  >
                    <Label>${m.motivoLabel}</Label>
                  </groupentertext--ml-multiline-text>
                  <div>
                    ${this.cmdBtn('secondary', m.devolverConfirmar, this.cmdDevolverStatus, () => this.cmdDevolver(), motivo.trim() === '')}
                  </div>
                </div>
              </details>
            `
          : nothing}
        ${podeCancelar
          ? html`
              <details class="rounded-md border border-[var(--border-subtle,currentColor)] p-3">
                <summary class="${btnClass('ghost')} w-fit cursor-pointer list-none">${m.cancelarTarefa}</summary>
                <div class="mt-3 flex flex-col gap-3">
                  <p class="text-sm">${m.cancelarConfirma} «${t.titulo}»?</p>
                  <div>${this.cmdBtn('danger', m.cancelarSim, this.cmdCancelarStatus, () => this.cmdCancelar())}</div>
                </div>
              </details>
            `
          : nothing}
      </div>
    `;
  }

  private setMotivo(e: Event) {
    const v = pick(e);
    if (typeof v === 'string') this.setCmdDevolverDraft({ details: { motivoDevolucao: v } });
  }

  /* ---------------- forms ---------------- */

  private renderNova() {
    const m = this.msg;
    const d = this.cmdCriarTarefaDraft;
    const valido = camposValidos(camposDe(d)) && itensValidos(d.checklist);
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-5">
        ${this.renderCampos(camposDe(d), (p) => this.setCmdCriarTarefaDraft(aplicar(d, p)), null)}
        <div>
          <h4 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.checklist}</h4>
          ${this.renderChecklistEditor(d.checklist, (itens) => this.setCmdCriarTarefaDraft({ ...d, checklist: itens }), false)}
        </div>
        ${this.renderErro(m.erroSalvar, this.cmdCriarTarefaError)}
        <div>
          ${this.cmdBtn('primary', m.registrarTarefa, this.cmdCriarTarefaStatus, () => {
            this.cmdCriarTarefa().then(() => {
              if (this.cmdCriarTarefaStatus === 'success') this.setScenario('detalhe');
            });
          }, !valido)}
        </div>
      </div>
    `;
  }

  private renderEditar(t: TarefaDetalhe) {
    const m = this.msg;
    const d = this.cmdSalvarEdicaoDraft;
    const c = this.cmdSalvarChecklistDraft;
    const valido = camposValidos(camposDe(d));
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-6">
        <section class="flex flex-col gap-4">
          <h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.dadosTarefa}</h4>
          ${this.renderCampos(
            camposDe(d),
            (p) => this.setCmdSalvarEdicaoDraft(aplicar(d, p)),
            { id: t.responsavelId, nome: t.responsavel.details.identification.name },
          )}
          ${this.renderErro(m.erroSalvar, this.cmdSalvarEdicaoError)}
          <div>
            ${this.cmdBtn('primary', m.salvarTarefa, this.cmdSalvarEdicaoStatus, () => {
              this.cmdSalvarEdicao().then(() => {
                if (this.cmdSalvarEdicaoStatus === 'success') this.setScenario('detalhe');
              });
            }, !valido)}
          </div>
        </section>
        <section class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-5">
          <h4 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.checklist}</h4>
          ${this.renderChecklistEditor(c.itens, (itens) => this.setCmdSalvarChecklistDraft({ ...c, itens }), true)}
          ${this.renderErro(m.erroSalvar, this.cmdSalvarChecklistError)}
          <div class="flex items-center gap-3">
            ${this.cmdBtn('secondary', m.salvarChecklist, this.cmdSalvarChecklistStatus, () => this.cmdSalvarChecklist(), !itensValidos(c.itens))}
            <span aria-live="polite" class="text-xs text-[var(--text-muted,currentColor)]">
              ${this.cmdSalvarChecklistStatus === 'success' ? m.checklistSalva : ''}
            </span>
          </div>
        </section>
      </div>
    `;
  }

  private renderCampos(v: Campos, set: (p: Partial<Campos>) => void, atual: { id: string; nome: string } | null) {
    const m = this.msg;
    const lang = document.documentElement.lang || 'pt-BR';
    const onText = (apply: (s: string) => void) => (e: Event) => {
      const x = pick(e);
      if (typeof x === 'string') apply(x);
    };
    const tituloH = onText((s) => set({ titulo: s }));
    const descH = onText((s) => set({ descricao: s }));
    const extra =
      atual && !this.membros.some((x) => x.id === atual.id) ? html`<Item value=${atual.id}>${atual.nome}</Item>` : nothing;
    return html`
      <div class="flex flex-col gap-4">
        <groupselectone--ml-select-one-autocomplete
          .value=${v.listaId}
          placeholder=${m.phLista}
          required
          ?loading=${this.qryListasAtivasStatus === 'loading'}
          @change=${(e: Event) => {
            const x = pick(e);
            if (x !== undefined) set({ listaId: x });
          }}
        >
          <Label>${m.lista}</Label>
          ${this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
          <Empty>${m.semListas}</Empty>
        </groupselectone--ml-select-one-autocomplete>
        <groupentertext--ml-enter-text .value=${v.titulo ?? ''} placeholder=${m.phTitulo} required @input=${tituloH} @change=${tituloH}>
          <Label>${m.titulo}</Label>
        </groupentertext--ml-enter-text>
        <groupentertext--ml-multiline-text .rows=${4} .value=${v.descricao ?? ''} @input=${descH} @change=${descH}>
          <Label>${m.descricao}</Label>
        </groupentertext--ml-multiline-text>
        <div class="grid grid-cols-2 items-start gap-4">
          <groupselectone--ml-segmented-control
            .value=${v.prioridade}
            required
            @change=${(e: Event) => {
              const x = pick(e);
              if (x !== undefined) set({ prioridade: x as Prioridade | null });
            }}
          >
            <Label>${m.prioridade}</Label>
            <Item value="low">${m.prBaixa}</Item>
            <Item value="medium">${m.prMedia}</Item>
            <Item value="high">${m.prAlta}</Item>
          </groupselectone--ml-segmented-control>
          <groupenterdate--ml-date-picker
            .value=${v.prazo}
            locale=${lang}
            placeholder=${m.phPrazo}
            required
            @change=${(e: Event) => {
              const x = pick(e);
              if (x !== undefined) set({ prazo: x });
            }}
          >
            <Label>${m.prazo}</Label>
          </groupenterdate--ml-date-picker>
        </div>
        <groupselectone--ml-combobox
          .value=${v.responsavelId}
          placeholder=${m.phResponsavel}
          required
          ?loading=${this.qryBuscarMembrosStatus === 'loading'}
          @input=${(e: Event) => {
            const q = pick(e);
            if (typeof q === 'string') this.qryBuscarMembros(q);
          }}
          @change=${(e: Event) => {
            const x = pick(e);
            if (x !== undefined) set({ responsavelId: x });
          }}
        >
          <Label>${m.responsavel}</Label>
          <Helper>${m.dicaResponsavel}</Helper>
          ${extra}
          ${this.membros.map((mb) => html`<Item value=${mb.id}>${mb.details.identification.name}</Item>`)}
        </groupselectone--ml-combobox>
      </div>
    `;
  }

  private renderChecklistEditor(itens: ChecklistItemDraft[], onChange: (itens: ChecklistItemDraft[]) => void, comFeito: boolean) {
    const m = this.msg;
    const small =
      'inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border-default,currentColor)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-40';
    return html`
      <div class="flex flex-col gap-2">
        ${itens.map((it, i) => {
          const h = (e: Event) => {
            const x = pick(e);
            if (typeof x === 'string') onChange(itens.map((y, j) => (j === i ? { ...y, details: { ...y.details, descricao: x } } : y)));
          };
          return html`
            <div class="flex items-center gap-2">
              ${comFeito
                ? html`<groupenterboolean--ml-checkbox-preference
                    .value=${Boolean(it.feito)}
                    @change=${(e: Event) => {
                      const x = pickBool(e);
                      if (x !== undefined) onChange(itens.map((y, j) => (j === i ? { ...y, feito: x } : y)));
                    }}
                  >
                    <Label><span class="sr-only">${m.feito}</span></Label>
                  </groupenterboolean--ml-checkbox-preference>`
                : nothing}
              <div class="min-w-0 flex-1">
                <groupentertext--ml-enter-text .value=${it.details.descricao ?? ''} placeholder=${m.phItem} @input=${h} @change=${h}>
                  <Label><span class="sr-only">${m.phItem}</span></Label>
                </groupentertext--ml-enter-text>
              </div>
              <button type="button" class=${small} aria-label=${m.subir} ?disabled=${i === 0} @click=${() => onChange(reordenar(itens, i, i - 1))}>▲</button>
              <button type="button" class=${small} aria-label=${m.descer} ?disabled=${i === itens.length - 1} @click=${() => onChange(reordenar(itens, i, i + 1))}>▼</button>
              ${it.id === null
                ? html`<button
                    type="button"
                    class=${small}
                    aria-label=${m.remover}
                    @click=${() => onChange(itens.filter((_, j) => j !== i).map((y, j) => ({ ...y, ordem: j + 1 })))}
                  >✕</button>`
                : nothing}
            </div>
          `;
        })}
        <div>${btn('ghost', m.adicionarItem, () => onChange([...itens, novoItem(itens.length + 1)]))}</div>
      </div>
    `;
  }
}
