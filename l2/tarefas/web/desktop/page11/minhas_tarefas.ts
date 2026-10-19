/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/minhas_tarefas.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMinhas_tarefasShared } from '/_102047_/l2/tarefas/web/shared/minhas_tarefas.js';
import type {
  ErrorState,
  Filtro,
  ItemChecklistDraft,
  MembroOpcao,
  Prioridade,
  RequestStatus,
  SalvarEdicaoDraft,
  TarefaDetalhe,
  TarefasPage,
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
  novaTarefa: 'Nova tarefa',
  filtroTodas: 'Todas',
  filtroCriadas: 'Criadas por mim',
  filtroAtribuidas: 'Atribuídas a mim',
  filtroRevisao: 'Em revisão',
  filtroDevolvidas: 'Devolvidas',
  colTarefa: 'Tarefa',
  colResponsavel: 'Responsável',
  colPrazo: 'Prazo',
  colSituacao: 'Situação',
  colPrioridade: 'Prioridade',
  checklistAbrev: 'Checklist',
  subtarefas: 'subtarefas',
  venceHoje: 'Vence hoje',
  atrasada: 'Atrasada',
  devolvida: 'Devolvida',
  vazioTodas: 'Você ainda não tem tarefas por aqui.',
  vazioFiltro: 'Nenhuma tarefa neste filtro.',
  carregando: 'Carregando suas tarefas…',
  carregarMais: 'Carregar mais tarefas',
  erroLista: 'Não foi possível carregar suas tarefas.',
  tentarNovamente: 'Tentar de novo',
  voltar: 'Voltar',
  semPrecondicao: 'Esta página foi aberta sem o que precisa para listar suas tarefas. Volte para a página anterior e abra as tarefas de novo.',
  voltarPaginaAnterior: 'Voltar à página anterior',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prioBaixa: 'Baixa',
  prioMedia: 'Média',
  prioAlta: 'Alta',
  cenaDetalhe: 'Tarefa aberta',
  cenaCriar: 'Dados da nova tarefa',
  cenaEditar: 'Ajustar tarefa',
  detalheVazio: 'Escolha uma tarefa na lista para ver o que falta e quem age agora.',
  carregandoTarefa: 'Abrindo a tarefa…',
  erroTarefa: 'Não foi possível abrir a tarefa.',
  lblLista: 'Lista',
  lblCriador: 'Criada por',
  lblResponsavel: 'Responsável',
  lblPrazo: 'Prazo',
  lblPrioridade: 'Prioridade',
  lblSituacao: 'Situação',
  lblCriadaEm: 'Criada em',
  lblDescricao: 'Descrição',
  semDescricao: 'Sem descrição.',
  lblChecklist: 'Checklist',
  semChecklist: 'Nenhum item na checklist.',
  itemFeito: 'Feito',
  itemPendente: 'Pendente',
  motivoDevolucao: 'Motivo da devolução',
  editarTarefa: 'Editar tarefa',
  iniciar: 'Iniciar tarefa',
  enviarRevisao: 'Enviar para revisão',
  reenviarRevisao: 'Reenviar para revisão',
  aceitar: 'Aceitar entrega',
  devolverAbrir: 'Devolver para ajuste…',
  devolverConfirmar: 'Devolver com este motivo',
  motivoAjuda: 'Explique o que precisa ser ajustado.',
  cancelarAbrir: 'Cancelar tarefa…',
  cancelarPergunta: 'Cancelar a tarefa',
  cancelarAviso: 'Ela deixa de andar e não muda mais de situação.',
  cancelarConfirmar: 'Sim, cancelar a tarefa',
  encerrada: 'Tarefa encerrada: a situação não muda mais.',
  iniciando: 'Iniciando…',
  enviando: 'Enviando…',
  aceitando: 'Aceitando…',
  devolvendo: 'Devolvendo…',
  cancelando: 'Cancelando…',
  okIniciar: 'Tarefa iniciada.',
  okEnviar: 'Tarefa enviada para revisão.',
  okAceitar: 'Entrega aceita: tarefa concluída.',
  okDevolver: 'Tarefa devolvida para ajuste.',
  okCancelar: 'Tarefa cancelada.',
  historico: 'Histórico',
  hCriada: 'Tarefa criada',
  hPor: 'Por',
  hDevolvida: 'Devolvida para ajuste',
  hConcluida: 'Entrega aceita e tarefa concluída',
  hCancelada: 'Tarefa cancelada',
  colMarcador: 'Marco',
  colEvento: 'Evento',
  fDados: 'Dados da tarefa',
  fLista: 'Lista',
  fListaPlaceholder: 'Escolha a lista',
  fTitulo: 'Título',
  fDescricao: 'Descrição',
  fPrioridade: 'Prioridade',
  fPrazo: 'Prazo',
  fPrazoPlaceholder: 'Escolha o prazo',
  fResponsavel: 'Responsável',
  fResponsavelPlaceholder: 'Busque pelo nome',
  fResponsavelAjuda: 'Digite o nome para buscar na equipe.',
  fResponsavelTravado: 'Só quem criou a tarefa troca o responsável.',
  fChecklistTitulo: 'Itens da checklist',
  fItem: 'Item',
  fFeito: 'Feito',
  fAdicionarItem: 'Adicionar item',
  fSubir: 'Mover para cima',
  fDescer: 'Mover para baixo',
  fRemover: 'Remover item',
  fObrigatorios: 'Preencha lista, título, prioridade, prazo e responsável para continuar.',
  criarTarefaBtn: 'Registrar tarefa',
  criando: 'Registrando…',
  descartar: 'Descartar',
  salvarEdicao: 'Salvar alterações',
  salvando: 'Salvando…',
  salvarChecklist: 'Salvar checklist',
  okChecklist: 'Checklist salva.',
  semItens: 'Nenhum item ainda.',
};

type PageMessageType = typeof pageMessage_pt_br;

const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
};
/// **collab_i18n_end**

type Linha = NonNullable<TarefasPage>['items'][number];
type StatusTarefa = TarefaDetalhe['status'];

const BTN =
  'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50 disabled:cursor-not-allowed';
const BTN_PRIMARY = `${BTN} bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)]`;
const BTN_SECONDARY = `${BTN} bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border border-[var(--button-secondary-border,currentColor)]`;
const BTN_DANGER = `${BTN} bg-[var(--button-danger-bg,transparent)] text-[var(--button-danger-text,currentColor)]`;

const CHIP: Record<StatusTarefa, string> = {
  aFazer: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  emAndamento: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
  emRevisao: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  concluida: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  cancelada: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
};

function docLang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtDate(v?: string | null): string {
  if (!v) return '';
  const d = new Date(v.length <= 10 ? `${v}T00:00:00` : v);
  return Number.isNaN(d.getTime()) ? v : new Intl.DateTimeFormat(docLang(), { dateStyle: 'medium' }).format(d);
}

function fmtDateTime(v?: string | null): string {
  if (!v) return '';
  const d = new Date(v);
  return Number.isNaN(d.getTime())
    ? v
    : new Intl.DateTimeFormat(docLang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function statusLabel(msg: PageMessageType, s: StatusTarefa): string {
  const m: Record<StatusTarefa, string> = {
    aFazer: msg.stAFazer,
    emAndamento: msg.stEmAndamento,
    emRevisao: msg.stEmRevisao,
    concluida: msg.stConcluida,
    cancelada: msg.stCancelada,
  };
  return m[s];
}

function prioLabel(msg: PageMessageType, p: Prioridade): string {
  const m: Record<Prioridade, string> = { low: msg.prioBaixa, medium: msg.prioMedia, high: msg.prioAlta };
  return m[p];
}

function chip(msg: PageMessageType, s: StatusTarefa) {
  return html`<span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CHIP[s]}">${statusLabel(msg, s)}</span>`;
}

function campo(rotulo: string, valor: unknown) {
  return html`<div class="flex flex-col gap-0.5">
    <dt class="text-xs text-[var(--text-muted,currentColor)]">${rotulo}</dt>
    <dd class="text-sm text-[var(--text-default,currentColor)]">${valor}</dd>
  </div>`;
}

function erroBox(e: ErrorState) {
  return html`<div aria-live="polite">
    ${e
      ? html`<p class="rounded-md px-3 py-2 text-sm bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${e.message}</p>`
      : nothing}
  </div>`;
}

function opcoesMembros(membros: MembroOpcao[], atualId: string | null, atualNome: string | null) {
  const base = membros.map((m) => ({ id: m.id, nome: m.details.identification.name }));
  if (atualId && atualNome && !base.some((b) => b.id === atualId)) base.unshift({ id: atualId, nome: atualNome });
  return base;
}

function camposValidos(d: SalvarEdicaoDraft): boolean {
  return Boolean(d.listaId && d.titulo && d.titulo.trim() && d.prioridade && d.prazo && d.responsavelId);
}

@customElement('tarefas--web--desktop--page11--minhas_tarefas-102047')
export class TarefasDesktopPage11Minhas_tarefasPage extends TarefasMinhas_tarefasShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-screen p-6 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="mb-5 flex items-center justify-between gap-4">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <button type="button" class=${BTN_PRIMARY} @click=${() => this.setScenario('criar')}>${this.msg['novaTarefa']}</button>
        </header>
        <div class="grid items-start gap-6 grid-cols-[minmax(0,1fr)_30rem]">
          <section class="min-w-0">${this.renderLista()}</section>
          <aside class="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
            ${this.renderPainel()}
          </aside>
        </div>
      </div>
    `;
  }

  /* ───────────── list ───────────── */

  private renderLista() {
    const t = this.tarefas;
    const items: Linha[] = t?.items ?? [];
    const idx = items.findIndex((r) => r.id === this.selectedTarefa);
    const loading = this.pageStatus === 'loading';
    const precondicao = this.qryMinhasTarefasError?.code === 'client.preconditionMissing';

    return html`
      <div data-organism-id="listaTarefas" class="flex flex-col gap-4">
        <groupnavigatesection--ml-navigate-pills
          .value=${this.filtro ?? 'todas'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            void this.qryMinhasTarefas(e.detail.value === 'todas' ? null : (e.detail.value as Filtro));
          }}
        >
          <Tab value="todas" title=${this.msg['filtroTodas']}></Tab>
          <Tab value="criadasPorMim" title=${this.msg['filtroCriadas']}></Tab>
          <Tab value="atribuidasAMim" title=${this.msg['filtroAtribuidas']}></Tab>
          <Tab value="emRevisao" title=${this.msg['filtroRevisao']}></Tab>
          <Tab value="devolvidas" title=${this.msg['filtroDevolvidas']}></Tab>
        </groupnavigatesection--ml-navigate-pills>

        ${this.pageStatus === 'error'
          ? html`<div class="flex flex-col items-start gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-live="polite">
              <p class="text-sm">${precondicao ? this.msg['semPrecondicao'] : this.msg['erroLista']}</p>
              ${precondicao
                ? html`<button type="button" class=${BTN_SECONDARY} @click=${() => history.back()}>${this.msg['voltarPaginaAnterior']}</button>`
                : html`<button type="button" class=${BTN_SECONDARY} @click=${() => { void this.qryMinhasTarefas(); }}>${this.msg['tentarNovamente']}</button>`}
            </div>`
          : html`
              <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
                <groupviewtable--ml-data-table
                  .value=${idx >= 0 ? String(idx) : ''}
                  .loading=${loading}
                  @rowClick=${(e: CustomEvent<{ index: number }>) => {
                    const r = items[e.detail.index];
                    if (r) {
                      this.setScenario('detalhe');
                      void this.qryTarefa(r.id);
                    }
                  }}
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead key="titulo">${this.msg['colTarefa']}</TableHead>
                      <TableHead key="prazo">${this.msg['colPrazo']}</TableHead>
                      <TableHead key="responsavel">${this.msg['colResponsavel']}</TableHead>
                      <TableHead key="situacao">${this.msg['colSituacao']}</TableHead>
                      <TableHead key="prioridade">${this.msg['colPrioridade']}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    ${items.map((r) => this.renderLinha(r))}
                  </TableBody>
                  <Empty>
                    <div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">
                      ${this.filtro === null ? this.msg['vazioTodas'] : this.msg['vazioFiltro']}
                    </div>
                  </Empty>
                  <Loading>
                    <div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['carregando']}</div>
                  </Loading>
                </groupviewtable--ml-data-table>
              </div>
              ${t?.hasMore
                ? html`<div class="flex justify-center">
                    <button type="button" class=${BTN_SECONDARY} ?disabled=${this.qryMinhasTarefasStatus === 'loading'} aria-busy=${this.qryMinhasTarefasStatus === 'loading'}
                      @click=${() => { void this.qryMinhasTarefas(undefined, t.page + 1, true); }}>${this.msg['carregarMais']}</button>
                  </div>`
                : nothing}
            `}
      </div>
    `;
  }

  private renderLinha(r: Linha) {
    return html`
      <TableRow key=${r.id}>
        <TableCell>
          <div class="font-medium text-[var(--text-strong,currentColor)]">${r.titulo}</div>
          <div class="text-xs text-[var(--text-muted,currentColor)]">
            ${r.lista.nome} · ${this.msg['checklistAbrev']} ${r.details.progressoChecklist} · ${r.details.quantidadeSubtarefas} ${this.msg['subtarefas']}
          </div>
        </TableCell>
        <TableCell>
          <div class="text-right">
            <span class=${r.details.atrasada ? 'font-semibold text-[var(--status-error-text,currentColor)]' : ''}>${fmtDate(r.prazo)}</span>
            ${r.details.venceHoje ? html`<div class="text-xs">${this.msg['venceHoje']}</div>` : nothing}
            ${r.details.atrasada ? html`<div class="text-xs">${this.msg['atrasada']}</div>` : nothing}
          </div>
        </TableCell>
        <TableCell>${r.responsavel.details.identification.name}</TableCell>
        <TableCell>
          <div class="flex flex-col items-start gap-1">
            ${chip(this.msg, r.status)}
            ${r.details.devolvidaEm ? html`<span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['devolvida']}</span>` : nothing}
          </div>
        </TableCell>
        <TableCell>${prioLabel(this.msg, r.prioridade)}</TableCell>
      </TableRow>
    `;
  }

  /* ───────────── working panel (scene host) ───────────── */

  private renderPainel() {
    return html`
      <molecules--ml-scenary-102020
        mode="scenary"
        .value=${this.scenary || 'detalhe'}
        .backLabel=${this.msg['voltar']}
        @change=${(e: CustomEvent<{ value: string }>) => {
          if (e.target === e.currentTarget) this.setScenario(e.detail.value);
        }}
      >
        <Scene value="detalhe" title=${this.msg['cenaDetalhe']}>${this.renderDetalheScene()}</Scene>
        <Scene value="criar" title=${this.msg['cenaCriar']} nav="back" backTo="detalhe">${this.renderCriar()}</Scene>
        <Scene value="editar" title=${this.msg['cenaEditar']} nav="back" backTo="detalhe">${this.renderEditar()}</Scene>
      </molecules--ml-scenary-102020>
    `;
  }

  private renderDetalheScene() {
    if (this.qryTarefaStatus === 'loading') {
      return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]" aria-busy="true" aria-live="polite">${this.msg['carregandoTarefa']}</p>`;
    }
    if (this.qryTarefaStatus === 'error') {
      return html`<div class="flex flex-col items-start gap-3" aria-live="polite">
        <p class="text-sm">${this.msg['erroTarefa']}</p>
        <button type="button" class=${BTN_SECONDARY} @click=${() => { void this.qryTarefa(this.selectedTarefa); }}>${this.msg['tentarNovamente']}</button>
      </div>`;
    }
    const t = this.tarefa;
    if (!t) {
      return html`<p class="py-6 text-sm text-[var(--text-muted,currentColor)]">${this.msg['detalheVazio']}</p>`;
    }
    return html`
      <div class="flex flex-col gap-4">
        ${this.renderDetalhe(t)}
        ${this.renderAcoes(t)}
        ${this.renderHistorico(t)}
      </div>
    `;
  }

  /* ───────────── detail ───────────── */

  private renderDetalhe(t: TarefaDetalhe) {
    return html`
      <div data-organism-id="detalheTarefa" class="flex flex-col gap-3">
        ${t.details.motivoDevolucao
          ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}>
              <Title>${this.msg['motivoDevolucao']}</Title>
              <Message>${t.details.motivoDevolucao}</Message>
            </groupnotifyuser--ml-contextual-feedback>`
          : nothing}
        <groupviewcard--ml-vertical-card>
          <CardHeader>
            <CardTitle>${t.titulo}</CardTitle>
            <CardDescription>${statusLabel(this.msg, t.status)} · ${t.lista.nome}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="grid grid-cols-2 gap-3">
              ${campo(this.msg['lblSituacao'], statusLabel(this.msg, t.status))}
              ${campo(this.msg['lblPrioridade'], prioLabel(this.msg, t.prioridade))}
              ${campo(this.msg['lblPrazo'], fmtDate(t.prazo))}
              ${campo(this.msg['lblLista'], t.lista.nome)}
              ${campo(this.msg['lblResponsavel'], t.responsavel.details.identification.name)}
              ${campo(this.msg['lblCriador'], t.criador.details.identification.name)}
              ${campo(this.msg['lblCriadaEm'], fmtDateTime(t.criadaEm))}
            </dl>
            <div class="mt-3">
              <div class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['lblDescricao']}</div>
              <p class="whitespace-pre-line text-sm">${t.details.descricao ?? this.msg['semDescricao']}</p>
            </div>
            <div class="mt-3">
              <div class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['lblChecklist']}</div>
              ${t.checklist.length === 0
                ? html`<p class="text-sm">${this.msg['semChecklist']}</p>`
                : html`<ul class="mt-1 flex flex-col gap-1">
                    ${t.checklist.map(
                      (it) => html`<li class="flex items-start gap-2 text-sm">
                        <span aria-hidden="true">${it.feito ? '☑' : '☐'}</span>
                        <span class="sr-only">${it.feito ? this.msg['itemFeito'] : this.msg['itemPendente']}</span>
                        <span>${it.details.descricao}</span>
                      </li>`,
                    )}
                  </ul>`}
            </div>
          </CardContent>
        </groupviewcard--ml-vertical-card>
        <div>
          <button type="button" class=${BTN_SECONDARY} @click=${() => { this.resetEdicaoDrafts(); this.setScenario('editar'); }}>${this.msg['editarTarefa']}</button>
        </div>
      </div>
    `;
  }

  /* ───────────── actions ───────────── */

  private renderAcoes(t: TarefaDetalhe) {
    const m = this.msg;
    const aberta = t.status === 'aFazer' || t.status === 'emAndamento' || t.status === 'emRevisao';
    const motivo = this.cmdDevolverDraft.motivoDevolucao ?? '';
    const feedbacks: [RequestStatus, ErrorState, string][] = [
      [this.cmdIniciarStatus, this.cmdIniciarError, m.okIniciar],
      [this.cmdEnviarRevisaoStatus, this.cmdEnviarRevisaoError, m.okEnviar],
      [this.cmdAceitarStatus, this.cmdAceitarError, m.okAceitar],
      [this.cmdDevolverStatus, this.cmdDevolverError, m.okDevolver],
      [this.cmdCancelarStatus, this.cmdCancelarError, m.okCancelar],
    ];
    const busyIniciar = this.cmdIniciarStatus === 'loading';
    const busyEnviar = this.cmdEnviarRevisaoStatus === 'loading';
    const busyAceitar = this.cmdAceitarStatus === 'loading';
    const busyDevolver = this.cmdDevolverStatus === 'loading';
    const busyCancelar = this.cmdCancelarStatus === 'loading';

    return html`
      <div data-organism-id="acoesTarefa" class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
        <div class="flex flex-wrap items-center gap-2">
          ${t.souResponsavel && t.status === 'aFazer'
            ? html`<button type="button" class=${BTN_PRIMARY} ?disabled=${busyIniciar} aria-busy=${busyIniciar}
                @click=${() => { void this.cmdIniciar(); }}>${busyIniciar ? m.iniciando : m.iniciar}</button>`
            : nothing}
          ${t.souResponsavel && t.status === 'emAndamento'
            ? html`<button type="button" class=${BTN_PRIMARY} ?disabled=${busyEnviar} aria-busy=${busyEnviar}
                @click=${() => { void this.cmdEnviarRevisao(); }}>${busyEnviar ? m.enviando : t.details.devolvidaEm ? m.reenviarRevisao : m.enviarRevisao}</button>`
            : nothing}
          ${t.souCriador && t.status === 'emRevisao'
            ? html`<button type="button" class=${BTN_PRIMARY} ?disabled=${busyAceitar} aria-busy=${busyAceitar}
                @click=${() => { void this.cmdAceitar(); }}>${busyAceitar ? m.aceitando : m.aceitar}</button>`
            : nothing}
        </div>

        ${t.souCriador && t.status === 'emRevisao'
          ? html`<details class="rounded-md border border-[var(--border-default,currentColor)] p-3">
              <summary class="cursor-pointer text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${m.devolverAbrir}</summary>
              <div class="mt-3 flex flex-col gap-3">
                <groupentertext--ml-multiline-text
                  .rows=${3}
                  .required=${true}
                  .value=${motivo}
                  @change=${(e: CustomEvent<{ value: string }>) => this.setCmdDevolverDraft({ motivoDevolucao: e.detail.value })}
                >
                  <Label>${m.motivoDevolucao}</Label>
                  <Helper>${m.motivoAjuda}</Helper>
                </groupentertext--ml-multiline-text>
                <div>
                  <button type="button" class=${BTN_SECONDARY} ?disabled=${busyDevolver || !motivo.trim()} aria-busy=${busyDevolver}
                    @click=${() => { void this.cmdDevolver(); }}>${busyDevolver ? m.devolvendo : m.devolverConfirmar}</button>
                </div>
              </div>
            </details>`
          : nothing}

        ${t.souCriador && aberta
          ? html`<details class="rounded-md border border-[var(--border-default,currentColor)] p-3">
              <summary class="cursor-pointer text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${m.cancelarAbrir}</summary>
              <div class="mt-3 flex flex-col gap-3">
                <p class="text-sm">${m.cancelarPergunta} “${t.titulo}”? ${m.cancelarAviso}</p>
                <div>
                  <button type="button" class=${BTN_DANGER} ?disabled=${busyCancelar} aria-busy=${busyCancelar}
                    @click=${() => { void this.cmdCancelar(); }}>${busyCancelar ? m.cancelando : m.cancelarConfirmar}</button>
                </div>
              </div>
            </details>`
          : nothing}

        ${!aberta ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.encerrada}</p>` : nothing}

        <div aria-live="polite" class="flex flex-col gap-2">
          ${feedbacks.map(([st, err, ok]) =>
            st === 'error' && err
              ? erroBox(err)
              : st === 'success'
                ? html`<p class="text-sm text-[var(--status-success-text,currentColor)]">${ok}</p>`
                : nothing,
          )}
        </div>
      </div>
    `;
  }

  /* ───────────── history ───────────── */

  private renderHistorico(t: TarefaDetalhe) {
    const m = this.msg;
    const eventos: { titulo: string; quando: string; texto: string | null }[] = [
      { titulo: m.hCriada, quando: t.criadaEm, texto: `${m.hPor} ${t.criador.details.identification.name}` },
    ];
    if (t.details.devolvidaEm) {
      eventos.push({ titulo: m.hDevolvida, quando: t.details.devolvidaEm, texto: t.details.motivoDevolucao ?? null });
    }
    if (t.details.concluidaEm) eventos.push({ titulo: m.hConcluida, quando: t.details.concluidaEm, texto: null });
    if (t.details.canceladaEm) eventos.push({ titulo: m.hCancelada, quando: t.details.canceladaEm, texto: null });

    return html`
      <div data-organism-id="historicoTarefa" class="border-t border-[var(--border-subtle,currentColor)] pt-4">
        <details open>
          <summary class="cursor-pointer text-sm font-semibold text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${m.historico}</summary>
          <div class="mt-3">
            <groupviewdata--ml-timeline-view>
              <Columns>
                <Column field="marco" header=${m.colMarcador} width="28px"></Column>
                <Column field="evento" header=${m.colEvento}></Column>
              </Columns>
              <Rows>
                ${eventos.map(
                  (ev) => html`<Row>
                    <Cell><span class="inline-block size-3 rounded-full bg-[var(--selected-border,currentColor)]"></span></Cell>
                    <Cell>
                      <div class="text-sm font-medium text-[var(--text-strong,currentColor)]">${ev.titulo}</div>
                      <div class="text-xs text-[var(--text-muted,currentColor)]">${fmtDateTime(ev.quando)}</div>
                      ${ev.texto ? html`<div class="text-sm">${ev.texto}</div>` : nothing}
                    </Cell>
                  </Row>`,
                )}
              </Rows>
            </groupviewdata--ml-timeline-view>
          </div>
        </details>
      </div>
    `;
  }

  /* ───────────── form: create ───────────── */

  private renderCriar() {
    const m = this.msg;
    const d = this.cmdCriarTarefaDraft;
    const busy = this.cmdCriarTarefaStatus === 'loading';
    const valido = camposValidos(d);
    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-4">
        <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
          ${this.renderCampos(d, (v) => this.setCmdCriarTarefaDraft(v), false, null)}
          <div class="flex flex-col gap-2">
            <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.fChecklistTitulo}</h3>
            ${this.renderChecklist(d.checklist, (itens) => this.setCmdCriarTarefaDraft({ ...d, checklist: itens }))}
          </div>
          ${valido ? nothing : html`<p class="text-xs text-[var(--text-muted,currentColor)]">${m.fObrigatorios}</p>`}
          ${erroBox(this.cmdCriarTarefaError)}
          <div class="flex gap-2">
            <button type="button" class=${BTN_PRIMARY} ?disabled=${busy || !valido} aria-busy=${busy}
              @click=${() => {
                void this.cmdCriarTarefa().then(() => {
                  if (this.cmdCriarTarefaStatus === 'success') {
                    this.setScenario('detalhe');
                    void this.qryMinhasTarefas();
                  }
                });
              }}>${busy ? m.criando : m.criarTarefaBtn}</button>
            <button type="button" class=${BTN_SECONDARY} ?disabled=${busy}
              @click=${() => { this.clearCmdCriarTarefaDraft(); this.setScenario('detalhe'); }}>${m.descartar}</button>
          </div>
        </form>
      </div>
    `;
  }

  /* ───────────── form: edit ───────────── */

  private renderEditar() {
    const m = this.msg;
    const t = this.tarefa;
    const d = this.cmdSalvarEdicaoDraft;
    const busy = this.cmdSalvarEdicaoStatus === 'loading';
    const busyCheck = this.cmdSalvarChecklistStatus === 'loading';
    const valido = camposValidos(d);
    const itens = this.cmdSalvarChecklistDraft.itens;
    const checkValido = !itens.some((it) => !it.descricao || !it.descricao.trim());
    const nomeAtual = t && t.responsavelId === d.responsavelId ? t.responsavel.details.identification.name : null;

    return html`
      <div data-organism-id="formTarefa" class="flex flex-col gap-6">
        <form class="flex flex-col gap-4" @submit=${(e: Event) => e.preventDefault()}>
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.fDados}</h3>
          ${this.renderCampos(d, (v) => this.setCmdSalvarEdicaoDraft(v), !(t?.souCriador ?? false), nomeAtual)}
          ${valido ? nothing : html`<p class="text-xs text-[var(--text-muted,currentColor)]">${m.fObrigatorios}</p>`}
          ${erroBox(this.cmdSalvarEdicaoError)}
          <div>
            <button type="button" class=${BTN_PRIMARY} ?disabled=${busy || !valido} aria-busy=${busy}
              @click=${() => {
                void this.cmdSalvarEdicao().then(() => {
                  if (this.cmdSalvarEdicaoStatus === 'success') this.setScenario('detalhe');
                });
              }}>${busy ? m.salvando : m.salvarEdicao}</button>
          </div>
        </form>

        <section class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
          <h3 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${m.fChecklistTitulo}</h3>
          ${this.renderChecklist(itens, (novos) => this.setCmdSalvarChecklistDraft({ itens: novos }))}
          ${erroBox(this.cmdSalvarChecklistError)}
          <div aria-live="polite">
            ${this.cmdSalvarChecklistStatus === 'success'
              ? html`<p class="text-sm text-[var(--status-success-text,currentColor)]">${m.okChecklist}</p>`
              : nothing}
          </div>
          <div>
            <button type="button" class=${BTN_PRIMARY} ?disabled=${busyCheck || !checkValido} aria-busy=${busyCheck}
              @click=${() => { void this.cmdSalvarChecklist(); }}>${busyCheck ? m.salvando : m.salvarChecklist}</button>
          </div>
        </section>
      </div>
    `;
  }

  /* ───────────── form pieces ───────────── */

  private renderCampos<T extends SalvarEdicaoDraft>(
    d: T,
    set: (v: T) => void,
    travarResponsavel: boolean,
    nomeAtual: string | null,
  ) {
    const m = this.msg;
    const membros = opcoesMembros(this.membros, d.responsavelId, nomeAtual);
    return html`
      <groupselectone--ml-select-one-autocomplete
        .value=${d.listaId}
        .required=${true}
        .loading=${this.qryListasAtivasStatus === 'loading'}
        placeholder=${m.fListaPlaceholder}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ ...d, listaId: e.detail.value })}
      >
        <Label>${m.fLista}</Label>
        ${this.listas.map((l) => html`<Item value=${l.id}>${l.nome}</Item>`)}
      </groupselectone--ml-select-one-autocomplete>

      <groupentertext--ml-enter-text
        .value=${d.titulo ?? ''}
        .required=${true}
        @change=${(e: CustomEvent<{ value: string }>) => set({ ...d, titulo: e.detail.value })}
      >
        <Label>${m.fTitulo}</Label>
      </groupentertext--ml-enter-text>

      <groupentertext--ml-multiline-text
        .rows=${4}
        .value=${d.descricao ?? ''}
        @change=${(e: CustomEvent<{ value: string }>) => set({ ...d, descricao: e.detail.value })}
      >
        <Label>${m.fDescricao}</Label>
      </groupentertext--ml-multiline-text>

      <div class="grid grid-cols-2 gap-4">
        <groupselectone--ml-segmented-control
          .value=${d.prioridade}
          .required=${true}
          @change=${(e: CustomEvent<{ value: string | null }>) => set({ ...d, prioridade: e.detail.value as Prioridade | null })}
        >
          <Label>${m.fPrioridade}</Label>
          <Item value="low">${m.prioBaixa}</Item>
          <Item value="medium">${m.prioMedia}</Item>
          <Item value="high">${m.prioAlta}</Item>
        </groupselectone--ml-segmented-control>

        <groupenterdate--ml-date-picker
          .value=${d.prazo}
          .required=${true}
          .locale=${docLang() ?? ''}
          placeholder=${m.fPrazoPlaceholder}
          @change=${(e: CustomEvent<{ value: string | null }>) => set({ ...d, prazo: e.detail.value })}
        >
          <Label>${m.fPrazo}</Label>
        </groupenterdate--ml-date-picker>
      </div>

      <groupselectone--ml-combobox
        .value=${d.responsavelId}
        .required=${true}
        .disabled=${travarResponsavel}
        .loading=${this.qryBuscarMembrosStatus === 'loading'}
        placeholder=${m.fResponsavelPlaceholder}
        @input=${(e: Event) => {
          const v = (e as CustomEvent<{ value?: string }>).detail?.value;
          if (typeof v === 'string') void this.qryBuscarMembros(v);
        }}
        @change=${(e: CustomEvent<{ value: string | null }>) => set({ ...d, responsavelId: e.detail.value })}
      >
        <Label>${m.fResponsavel}</Label>
        <Helper>${travarResponsavel ? m.fResponsavelTravado : m.fResponsavelAjuda}</Helper>
        ${membros.map((o) => html`<Item value=${o.id}>${o.nome}</Item>`)}
      </groupselectone--ml-combobox>
    `;
  }

  private renderChecklist(itens: ItemChecklistDraft[], set: (v: ItemChecklistDraft[]) => void) {
    const m = this.msg;
    const patch = (i: number, p: Partial<ItemChecklistDraft>) =>
      set(itens.map((it, k) => (k === i ? { ...it, ...p } : it)));
    const move = (i: number, dir: number) => {
      const j = i + dir;
      if (j < 0 || j >= itens.length) return;
      const c = [...itens];
      [c[i], c[j]] = [c[j], c[i]];
      set(c.map((it, k) => ({ ...it, ordem: k + 1 })));
    };
    const remove = (i: number) =>
      set(itens.filter((_, k) => k !== i).map((it, k) => ({ ...it, ordem: k + 1 })));
    const add = () =>
      set([...itens, { id: null, version: null, descricao: '', ordem: itens.length + 1, feito: false }]);

    return html`
      <div class="flex flex-col gap-3">
        ${itens.length === 0 ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.semItens}</p>` : nothing}
        <ul class="flex flex-col gap-3">
          ${itens.map(
            (it, i) => html`<li class="flex items-start gap-2">
              <groupenterboolean--ml-checkbox-preference
                .value=${it.feito ?? false}
                @change=${(e: CustomEvent<{ value: boolean }>) => patch(i, { feito: e.detail.value })}
              >
                <Label>${m.fFeito}</Label>
              </groupenterboolean--ml-checkbox-preference>
              <div class="min-w-0 flex-1">
                <groupentertext--ml-enter-text
                  .value=${it.descricao ?? ''}
                  @change=${(e: CustomEvent<{ value: string }>) => patch(i, { descricao: e.detail.value })}
                >
                  <Label>${m.fItem} ${i + 1}</Label>
                </groupentertext--ml-enter-text>
              </div>
              <div class="flex gap-1 pt-6">
                <button type="button" class=${BTN_SECONDARY} aria-label=${m.fSubir} ?disabled=${i === 0} @click=${() => move(i, -1)}><span aria-hidden="true">↑</span></button>
                <button type="button" class=${BTN_SECONDARY} aria-label=${m.fDescer} ?disabled=${i === itens.length - 1} @click=${() => move(i, 1)}><span aria-hidden="true">↓</span></button>
                ${it.id === null
                  ? html`<button type="button" class=${BTN_SECONDARY} aria-label=${m.fRemover} @click=${() => remove(i)}><span aria-hidden="true">✕</span></button>`
                  : nothing}
              </div>
            </li>`,
          )}
        </ul>
        <div>
          <button type="button" class=${BTN_SECONDARY} @click=${add}>${m.fAdicionarItem}</button>
        </div>
      </div>
    `;
  }
}
