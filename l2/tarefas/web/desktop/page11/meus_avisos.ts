/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-view-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meus avisos',
  pageSubtitle: 'Veja quais tarefas abertas vencem hoje ou estão atrasadas e acompanhe o envio de cada aviso diário.',
  tabNotices: 'Avisos recebidos',
  tabSending: 'Envio das 8h',
  colReferenceDate: 'Data de referência',
  colTotals: 'Tarefas',
  colStatus: 'Envio',
  tasksLabel: 'Tarefas',
  overdueLabel: 'Atrasadas',
  noticesEmpty: 'Você ainda não recebeu nenhum aviso diário.',
  noticesLoading: 'Carregando seus avisos…',
  loadMore: 'Ver avisos mais antigos',
  loadingMore: 'Carregando…',
  statusPending: 'Pendente',
  statusCompleted: 'Enviado',
  statusFailed: 'Falhou',
  noticeOf: 'Aviso de',
  panelHint: 'Escolha um aviso na lista para ver as tarefas que vencem hoje ou estão atrasadas.',
  metricTasks: 'Tarefas no aviso',
  metricOverdue: 'Atrasadas',
  colTaskTitle: 'Tarefa',
  colDueDate: 'Prazo',
  colDueSituation: 'Situação do prazo',
  colTaskStatus: 'Situação',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  taskTodo: 'A fazer',
  taskDoing: 'Em andamento',
  taskReview: 'Em revisão',
  taskDone: 'Concluída',
  taskCanceled: 'Cancelada',
  noTasks: 'Nenhuma tarefa neste aviso.',
  loadingTasks: 'Carregando as tarefas do aviso…',
  generatedAt: 'Gerado em',
  finishedAt: 'Finalizado em',
  notFinished: 'Ainda não finalizado',
  failureReason: 'Motivo da falha',
  sendingEmpty: 'Nenhum envio registrado ainda.',
  errorLoad: 'Não foi possível carregar seus avisos.',
  errorOpen: 'Não foi possível abrir este aviso.',
  retry: 'Tentar novamente',
  preconditionTitle: 'Faltam informações para abrir seus avisos',
  preconditionBody: 'Esta tela foi aberta sem a identificação necessária. Volte à página anterior e abra os avisos novamente.',
  back: 'Voltar à página anterior',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

type NoticeStatus = 'pending' | 'completed' | 'failed';
type TaskStatus = 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';

const lang = () => document.documentElement.lang || undefined;

function parseDate(value: string): Date {
  return value.length <= 10 ? new Date(value + 'T00:00:00') : new Date(value);
}
function fmtDate(value: string | undefined): string {
  if (!value) return '';
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}
function fmtDateTime(value: string | undefined): string {
  if (!value) return '';
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}
function fmtNumber(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}
function noticeStatusLabel(m: PageMessageType, s: NoticeStatus): string {
  if (s === 'completed') return m.statusCompleted;
  if (s === 'failed') return m.statusFailed;
  return m.statusPending;
}
function noticeStatusClass(s: NoticeStatus): string {
  if (s === 'completed') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
  if (s === 'failed') return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
  return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}
function taskStatusLabel(m: PageMessageType, s: TaskStatus): string {
  switch (s) {
    case 'emAndamento': return m.taskDoing;
    case 'emRevisao': return m.taskReview;
    case 'concluida': return m.taskDone;
    case 'cancelada': return m.taskCanceled;
    default: return m.taskTodo;
  }
}
function dueClass(s: 'dueToday' | 'overdue'): string {
  return s === 'overdue'
    ? 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'
    : 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
}

@customElement('tarefas--web--desktop--page11--meus_avisos-102047')
export class TarefasDesktopPage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const precondition = this.carregarMeusAvisosError?.code === 'client.preconditionMissing';
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6">
        <header class="mb-5">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
        </header>
        ${precondition ? this.renderPrecondition() : this.renderDesk()}
      </div>
    `;
  }

  private renderPrecondition() {
    return html`
      <div role="alert" class="max-w-xl rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['preconditionTitle']}</h2>
        <p class="mt-2 text-sm text-[var(--text-default,currentColor)]">${this.msg['preconditionBody']}</p>
        <button type="button"
          class="mt-4 min-h-10 rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-sm font-medium text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          @click=${() => window.history.back()}>${this.msg['back']}</button>
      </div>
    `;
  }

  private renderDesk() {
    const failed = this.carregarMeusAvisosStatus === 'error' || this.pageStatus === 'error';
    return html`
      ${failed ? html`
        <div role="alert" aria-live="polite" class="mb-4 flex items-center justify-between gap-4 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] px-4 py-3 text-sm text-[var(--status-error-text,currentColor)]">
          <span>${this.msg['errorLoad']}</span>
          <button type="button"
            class="min-h-9 rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-3 text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => this.carregarMeusAvisos()}>${this.msg['retry']}</button>
        </div>` : nothing}
      <div class="grid grid-cols-[minmax(340px,420px)_minmax(0,1fr)] gap-6 items-start">
        <section class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3 min-w-0">
          <molecules--ml-scenary-102020 mode="tabs" .value=${this.scenary || 'avisos'}
            @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
            <Scene value="avisos" title=${this.msg['tabNotices']}>
              ${this.renderList()}
            </Scene>
            <Scene value="envio" title=${this.msg['tabSending']}>
              ${this.renderHistory()}
            </Scene>
          </molecules--ml-scenary-102020>
        </section>
        ${this.renderDetail()}
      </div>
    `;
  }

  private renderList() {
    const items = this.avisos?.items ?? [];
    const openId = this.avisoAberto?.id ?? this.selectedAvisoVencimento;
    const loading = this.pageStatus === 'loading' || this.carregarMeusAvisosStatus === 'loading';
    return html`
      <div data-organism-id="listaAvisos" class="pt-2">
        <groupviewdata--ml-vertical-record-list .hoverable=${true} .loading=${this.pageStatus === 'loading'}
          @row-click=${(e: CustomEvent<{ index: number }>) => {
            const aviso = items[e.detail.index];
            if (aviso) this.abrirAviso(aviso.id);
          }}>
          <Columns>
            <Column field="data" header=${this.msg['colReferenceDate']} />
            <Column field="totais" header=${this.msg['colTotals']} />
            <Column field="envio" header=${this.msg['colStatus']} align="right" />
          </Columns>
          <Rows>
            ${items.map(a => html`
              <Row ?selected=${a.id === openId}>
                <Cell><span class="font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</span></Cell>
                <Cell>
                  <div class="text-sm text-[var(--text-default,currentColor)]">${this.msg['tasksLabel']}: ${fmtNumber(a.details.details.quantidadeTarefas)}</div>
                  <div class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['overdueLabel']}: ${fmtNumber(a.details.details.quantidadeAtrasadas)}</div>
                </Cell>
                <Cell><span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${noticeStatusClass(a.status)}">${noticeStatusLabel(this.msg, a.status)}</span></Cell>
              </Row>`)}
          </Rows>
          <Empty><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['noticesEmpty']}</div></Empty>
          <Loading><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['noticesLoading']}</div></Loading>
        </groupviewdata--ml-vertical-record-list>
        ${this.avisos?.hasMore ? html`
          <div class="mt-2 flex justify-center">
            <button type="button" ?disabled=${loading} aria-busy=${loading ? 'true' : 'false'}
              class="min-h-9 rounded-md px-3 text-sm text-[var(--text-muted,currentColor)] hover:text-[var(--text-strong,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-60"
              @click=${() => this.carregarMeusAvisos((this.avisos?.page ?? 1) + 1, true)}>
              ${loading ? this.msg['loadingMore'] : this.msg['loadMore']}
            </button>
          </div>` : nothing}
      </div>
    `;
  }

  private renderHistory() {
    const items = this.avisos?.items ?? [];
    return html`
      <div data-organism-id="historicoAvisos" class="pt-2">
        <groupviewdata--ml-timeline-view .loading=${this.pageStatus === 'loading'}>
          <Columns>
            <Column field="data" header=${this.msg['colReferenceDate']} />
            <Column field="envio" header=${this.msg['colStatus']} />
          </Columns>
          <Rows>
            ${items.map(a => html`
              <Row>
                <Cell>
                  <div class="font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</div>
                  <span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${noticeStatusClass(a.status)}">${noticeStatusLabel(this.msg, a.status)}</span>
                </Cell>
                <Cell>
                  <div class="text-sm text-[var(--text-default,currentColor)]">${this.msg['generatedAt']}: ${fmtDateTime(a.details.details.geradoEm)}</div>
                  <div class="text-sm text-[var(--text-default,currentColor)]">${a.details.details.finalizadoEm
                    ? html`${this.msg['finishedAt']}: ${fmtDateTime(a.details.details.finalizadoEm)}`
                    : this.msg['notFinished']}</div>
                  ${a.details.details.motivoFalha ? html`
                    <div class="mt-1 text-sm text-[var(--status-error-text,currentColor)]">${this.msg['failureReason']}: ${a.details.details.motivoFalha}</div>` : nothing}
                </Cell>
              </Row>`)}
          </Rows>
          <Empty><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['sendingEmpty']}</div></Empty>
          <Loading><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['noticesLoading']}</div></Loading>
        </groupviewdata--ml-timeline-view>
      </div>
    `;
  }

  private renderDetail() {
    const aviso = this.avisoAberto;
    const opening = this.abrirAvisoStatus === 'loading';
    const selectedId = this.selectedAvisoVencimento;
    return html`
      <section data-organism-id="detalheAviso" aria-busy=${opening ? 'true' : 'false'}
        class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5 min-w-0">
        ${this.abrirAvisoStatus === 'error' ? html`
          <div role="alert" aria-live="polite" class="mb-4 flex items-center justify-between gap-4 text-sm text-[var(--text-default,currentColor)]">
            <span>${this.msg['errorOpen']}</span>
            <button type="button"
              class="min-h-9 rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-3 text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              @click=${() => this.abrirAviso(selectedId)}>${this.msg['retry']}</button>
          </div>` : nothing}
        ${!aviso ? html`
          <p class="py-16 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['panelHint']}</p>
        ` : html`
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['noticeOf']} ${fmtDate(aviso.dataReferencia)}</h2>
            <span class="rounded-full px-2 py-0.5 text-xs font-medium ${noticeStatusClass(aviso.status)}">${noticeStatusLabel(this.msg, aviso.status)}</span>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <groupviewmetric--ml-metric-card .loading=${opening}>
              <Label>${this.msg['metricTasks']}</Label>
              <Value>${fmtNumber(aviso.details.details.quantidadeTarefas)}</Value>
            </groupviewmetric--ml-metric-card>
            <groupviewmetric--ml-metric-card .loading=${opening}>
              <Label>${this.msg['metricOverdue']}</Label>
              <Value>${fmtNumber(aviso.details.details.quantidadeAtrasadas)}</Value>
            </groupviewmetric--ml-metric-card>
          </div>
          <div class="mt-5">
            <groupviewtable--ml-view-table .loading=${opening}>
              <TableHeader>
                <TableRow>
                  <TableHead key="titulo">${this.msg['colTaskTitle']}</TableHead>
                  <TableHead key="prazo">${this.msg['colDueDate']}</TableHead>
                  <TableHead key="situacaoPrazo">${this.msg['colDueSituation']}</TableHead>
                  <TableHead key="status">${this.msg['colTaskStatus']}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                ${aviso.details.tarefas.map(t => html`
                  <TableRow key=${t.tarefa.id}>
                    <TableCell><span class="font-medium text-[var(--text-strong,currentColor)]">${t.tarefa.titulo}</span></TableCell>
                    <TableCell>${fmtDate(t.details.tarefas.prazo)}</TableCell>
                    <TableCell><span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium ${dueClass(t.details.tarefas.situacaoPrazo)}">${t.details.tarefas.situacaoPrazo === 'overdue' ? this.msg['overdue'] : this.msg['dueToday']}</span></TableCell>
                    <TableCell>${taskStatusLabel(this.msg, t.tarefa.status)}</TableCell>
                  </TableRow>`)}
              </TableBody>
              <Empty>${this.msg['noTasks']}</Empty>
              <Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['loadingTasks']}</div></Loading>
            </groupviewtable--ml-view-table>
          </div>
        `}
      </section>
    `;
  }
}
