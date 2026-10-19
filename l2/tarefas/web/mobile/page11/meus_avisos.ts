/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import type { AvisoResumo, AvisoLinhaTarefa } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-interval-presets.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meus avisos',
  sceneList: 'Avisos por data',
  sceneNotice: 'Aviso do dia',
  back: 'Voltar para os avisos',
  openLatest: 'Abrir o aviso mais recente',
  filterSummary: 'Filtrar por período',
  filterFrom: 'De',
  filterTo: 'Até',
  filterClear: 'Mostrar todos os períodos',
  filterError: 'Não foi possível filtrar os avisos. Tente novamente.',
  filterRetry: 'Tentar novamente',
  tasksLabel: 'Tarefas',
  overdueLabel: 'Atrasadas',
  listTasksOverdue: 'Tarefas',
  listOverdue: 'atrasadas',
  statusPending: 'Aguardando envio',
  statusCompleted: 'Enviado',
  statusFailed: 'Falhou',
  colDate: 'Data',
  colSummary: 'Resumo',
  colStatus: 'Envio',
  listEmpty: 'Nenhum aviso encontrado neste período.',
  loading: 'Carregando seus avisos…',
  loadingNotice: 'Abrindo o aviso…',
  errorTitle: 'Não foi possível carregar seus avisos.',
  retry: 'Tentar novamente',
  missingTitle: 'Esta tela foi aberta sem o que ela precisa para mostrar seus avisos.',
  missingHint: 'Volte à tela anterior e abra os avisos a partir dela.',
  goBack: 'Voltar à tela anterior',
  emptyPage: 'Você ainda não recebeu nenhum aviso diário. O aviso chega todos os dias às 8h.',
  noticeNone: 'Escolha um aviso na lista para ver as tarefas que vencem hoje ou estão atrasadas.',
  noticeError: 'Não foi possível abrir este aviso.',
  referenceOf: 'Aviso de',
  tasksHeading: 'Vencendo hoje e atrasadas',
  tasksEmpty: 'Nenhuma tarefa neste aviso.',
  thTask: 'Tarefa',
  thDue: 'Prazo',
  thDeadlineState: 'Situação do prazo',
  thProgress: 'Andamento',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  taskTodo: 'A fazer',
  taskDoing: 'Em andamento',
  taskReview: 'Em revisão',
  taskDone: 'Concluída',
  taskCanceled: 'Cancelada',
  historyHeading: 'Registro de envio',
  historyEmpty: 'Nenhum envio registrado.',
  historyWhen: 'Quando',
  historyResult: 'Resultado',
  generatedAt: 'Gerado em',
  finishedAt: 'Finalizado em',
  failureReason: 'Motivo da falha',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function rowsOf(src: unknown): AvisoResumo[] {
  if (Array.isArray(src)) return src as AvisoResumo[];
  if (src && typeof src === 'object') {
    const items = (src as Record<string, unknown>)['items'];
    if (Array.isArray(items)) return items as AvisoResumo[];
  }
  return [];
}

function parseDay(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDay(value: string | undefined, withWeekday = false): string {
  if (!value) return '';
  const d = parseDay(value);
  if (!d) return value;
  return new Intl.DateTimeFormat(lang(), {
    weekday: withWeekday ? 'short' : undefined,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

function formatMoment(value: string | undefined): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function noticeStatusLabel(msg: PageMessageType, status: AvisoResumo['status']): string {
  if (status === 'completed') return msg.statusCompleted;
  if (status === 'failed') return msg.statusFailed;
  return msg.statusPending;
}

function noticeStatusClass(status: AvisoResumo['status']): string {
  if (status === 'completed') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
  if (status === 'failed') return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
  return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
}

function taskStatusLabel(msg: PageMessageType, status: AvisoLinhaTarefa['tarefa']['status']): string {
  switch (status) {
    case 'aFazer': return msg.taskTodo;
    case 'emAndamento': return msg.taskDoing;
    case 'emRevisao': return msg.taskReview;
    case 'concluida': return msg.taskDone;
    default: return msg.taskCanceled;
  }
}

const chip = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap';

@customElement('tarefas--web--mobile--page11--meus_avisos-102047')
export class TarefasMobilePage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto min-h-screen w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]">
        <h1 class="mb-3 text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'lista'}
          backLabel=${this.msg['back']}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="lista" title=${this.msg['sceneList']}>${this.renderListScene()}</Scene>
          <Scene value="aviso" title=${this.msg['sceneNotice']} nav="back" backTo="lista">${this.renderNoticeScene()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private renderListScene() {
    const rows = rowsOf(this.avisos);
    const err = this.qryPaginaMeusAvisosError;
    let body;
    if (this.pageStatus === 'loading' || this.pageStatus === 'idle') {
      body = html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]" role="status" aria-busy="true">${this.msg['loading']}</p>`;
    } else if (this.pageStatus === 'error' && err && err.code === 'client.preconditionMissing') {
      body = html`
        <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" aria-live="polite">
          <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['missingTitle']}</p>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['missingHint']}</p>
          <button type="button" class="mt-3 min-h-[44px] rounded-lg border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => history.back()}>${this.msg['goBack']}</button>
        </div>`;
    } else if (this.pageStatus === 'error') {
      body = html`
        <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]" aria-live="polite">
          <p>${this.msg['errorTitle']}</p>
          <button type="button" class="mt-3 min-h-[44px] rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 text-[var(--button-primary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => this.qryPaginaMeusAvisos()}>${this.msg['retry']}</button>
        </div>`;
    } else if (this.pageStatus === 'empty' && rows.length === 0 && !this.filtroDataInicio && !this.filtroDataFim) {
      body = html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['emptyPage']}</p>`;
    } else {
      body = html`
        ${rows.length > 0
          ? html`<button type="button"
              class="mb-3 min-h-[44px] w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 font-medium text-[var(--button-primary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              @click=${() => {
                void this.selectAvisoVencimento(null);
                this.setScenario('aviso');
              }}>${this.msg['openLatest']}</button>`
          : nothing}
        ${this.renderFilter()}
        <div data-organism-id="listaAvisos" aria-busy=${this.qryListarMeusAvisosStatus === 'loading' ? 'true' : 'false'}>
          <groupviewdata--ml-vertical-record-list
            .hoverable=${true}
            .loading=${this.qryListarMeusAvisosStatus === 'loading'}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const row = rows[e.detail.index];
              if (!row) return;
              void this.selectAvisoVencimento(row.id);
              this.setScenario('aviso');
            }}
          >
            <Columns>
              <Column field="resumo" header=${this.msg['colSummary']} />
              <Column field="status" header=${this.msg['colStatus']} width="120px" align="right" />
            </Columns>
            <Rows>
              ${rows.map(
                (row) => html`
                  <Row ?selected=${row.id === this.selectedAvisoVencimento}>
                    <Cell>
                      <div class="min-h-[44px] py-1">
                        <div class="font-semibold text-[var(--text-strong,currentColor)]">${formatDay(row.dataReferencia, true)}</div>
                        <div class="text-sm text-[var(--text-muted,currentColor)]">
                          ${this.msg['listTasksOverdue']}: ${row.details.quantidadeTarefas} · ${row.details.quantidadeAtrasadas} ${this.msg['listOverdue']}
                        </div>
                      </div>
                    </Cell>
                    <Cell>
                      <span class="${chip} ${noticeStatusClass(row.status)}">${noticeStatusLabel(this.msg, row.status)}</span>
                    </Cell>
                  </Row>`,
              )}
            </Rows>
            <Empty><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['listEmpty']}</div></Empty>
            <Loading><div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['loading']}</div></Loading>
          </groupviewdata--ml-vertical-record-list>
        </div>`;
    }
    return html`<section class="flex flex-col" data-section-id="avisosRecebidos">${body}</section>`;
  }

  private renderFilter() {
    const hasFilter = !!(this.filtroDataInicio || this.filtroDataFim);
    return html`
      <details class="mb-3 rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]" ?open=${hasFilter}>
        <summary class="flex min-h-[44px] cursor-pointer items-center px-3 text-sm text-[var(--text-muted,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['filterSummary']}</summary>
        <div class="px-3 pb-3">
          <groupenterdateinterval--ml-date-interval-presets
            .startDate=${this.filtroDataInicio}
            .endDate=${this.filtroDataFim}
            .loading=${this.qryListarMeusAvisosStatus === 'loading'}
            locale="pt-BR"
            data-class="w-full"
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => {
              this.setFiltroDataInicio(e.detail.startDate);
              this.setFiltroDataFim(e.detail.endDate);
              void this.qryListarMeusAvisos(1);
            }}
          >
            <LabelStart>${this.msg['filterFrom']}</LabelStart>
            <LabelEnd>${this.msg['filterTo']}</LabelEnd>
          </groupenterdateinterval--ml-date-interval-presets>
          ${hasFilter
            ? html`<button type="button" class="mt-2 min-h-[44px] rounded-lg px-2 text-sm text-[var(--link-text,currentColor)] underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                @click=${() => {
                  this.setFiltroDataInicio(null);
                  this.setFiltroDataFim(null);
                  void this.qryListarMeusAvisos(1);
                }}>${this.msg['filterClear']}</button>`
            : nothing}
          ${this.qryListarMeusAvisosError
            ? html`<div class="mt-2 text-sm" aria-live="polite">
                <p>${this.msg['filterError']}</p>
                <button type="button" class="min-h-[44px] rounded-lg px-2 text-[var(--link-text,currentColor)] underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                  @click=${() => this.qryListarMeusAvisos(1)}>${this.msg['filterRetry']}</button>
              </div>`
            : nothing}
        </div>
      </details>`;
  }

  private renderNoticeScene() {
    return html`
      <div class="flex flex-col gap-6">
        <section data-section-id="conteudoAviso" data-organism-id="avisoDoDia">${this.renderNotice()}</section>
        <section data-section-id="registroEnvio" data-organism-id="historicoAvisos">${this.renderHistory()}</section>
      </div>`;
  }

  private renderNotice() {
    const a = this.avisoAtual;
    if (this.qryAvisoPorIdStatus === 'loading') {
      return html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]" role="status" aria-busy="true">${this.msg['loadingNotice']}</p>`;
    }
    if (this.qryAvisoPorIdError) {
      const id = this.selectedAvisoVencimento;
      return html`
        <div class="rounded-lg bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]" aria-live="polite">
          <p>${this.msg['noticeError']}</p>
          ${id
            ? html`<button type="button" class="mt-3 min-h-[44px] rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 text-[var(--button-primary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                @click=${() => this.qryAvisoPorId(id)}>${this.msg['retry']}</button>`
            : nothing}
        </div>`;
    }
    if (!a) {
      return html`<p class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['noticeNone']}</p>`;
    }
    const tarefas = a.details.tarefas;
    return html`
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['referenceOf']} ${formatDay(a.dataReferencia, true)}</p>
          <span class="${chip} ${noticeStatusClass(a.status)}">${noticeStatusLabel(this.msg, a.status)}</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
            <groupviewmetric--ml-metric-big-number>
              <Label>${this.msg['tasksLabel']}</Label>
              <Value>${a.details.quantidadeTarefas}</Value>
            </groupviewmetric--ml-metric-big-number>
          </div>
          <div class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
            <groupviewmetric--ml-metric-big-number>
              <Label>${this.msg['overdueLabel']}</Label>
              <Value>${a.details.quantidadeAtrasadas}</Value>
            </groupviewmetric--ml-metric-big-number>
          </div>
        </div>
        <div>
          <h3 class="mb-2 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['tasksHeading']}</h3>
          <groupviewtable--ml-responsive-table>
            <TableHeader>
              <TableRow>
                <TableHead key="titulo">${this.msg['thTask']}</TableHead>
                <TableHead key="prazo">${this.msg['thDue']}</TableHead>
                <TableHead key="situacaoPrazo">${this.msg['thDeadlineState']}</TableHead>
                <TableHead key="status">${this.msg['thProgress']}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              ${tarefas.map(
                (t) => html`
                  <TableRow key=${t.tarefaId}>
                    <TableCell><span class="font-medium text-[var(--text-strong,currentColor)]">${t.tarefa.titulo}</span></TableCell>
                    <TableCell>${formatDay(t.prazo, true)}</TableCell>
                    <TableCell>
                      <span class="${chip} ${t.situacaoPrazo === 'overdue'
                        ? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
                        : 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'}">${t.situacaoPrazo === 'overdue' ? this.msg['overdue'] : this.msg['dueToday']}</span>
                    </TableCell>
                    <TableCell>${taskStatusLabel(this.msg, t.tarefa.status)}</TableCell>
                  </TableRow>`,
              )}
            </TableBody>
            <Empty><div class="py-6 text-center text-[var(--text-muted,currentColor)]">${this.msg['tasksEmpty']}</div></Empty>
          </groupviewtable--ml-responsive-table>
        </div>
      </div>`;
  }

  private renderHistory() {
    const rows = rowsOf(this.avisos);
    return html`
      <h3 class="mb-2 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['historyHeading']}</h3>
      <groupviewdata--ml-timeline-view .hoverable=${false}>
        <Columns>
          <Column field="quando" header=${this.msg['historyWhen']} />
          <Column field="resultado" header=${this.msg['historyResult']} width="120px" align="right" />
        </Columns>
        <Rows>
          ${rows.map(
            (row) => html`
              <Row>
                <Cell>
                  <div class="py-1 text-sm">
                    <div class="font-medium text-[var(--text-strong,currentColor)]">${formatDay(row.dataReferencia)}</div>
                    <div class="text-[var(--text-muted,currentColor)]">${this.msg['generatedAt']} ${formatMoment(row.details.geradoEm)}</div>
                    ${row.details.finalizadoEm
                      ? html`<div class="text-[var(--text-muted,currentColor)]">${this.msg['finishedAt']} ${formatMoment(row.details.finalizadoEm)}</div>`
                      : nothing}
                    ${row.status === 'failed' && row.details.motivoFalha
                      ? html`<div class="mt-1">${this.msg['failureReason']}: ${row.details.motivoFalha}</div>`
                      : nothing}
                  </div>
                </Cell>
                <Cell>
                  <span class="${chip} ${noticeStatusClass(row.status)}">${noticeStatusLabel(this.msg, row.status)}</span>
                </Cell>
              </Row>`,
          )}
        </Rows>
        <Empty><div class="py-6 text-center text-[var(--text-muted,currentColor)]">${this.msg['historyEmpty']}</div></Empty>
      </groupviewdata--ml-timeline-view>`;
  }
}
