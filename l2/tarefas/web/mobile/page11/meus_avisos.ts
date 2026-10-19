/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-interval-presets.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meus avisos',
  back: 'Voltar à lista',
  sceneNotice: 'Aviso do dia',
  filterSummary: 'Filtrar por período',
  filterLabel: 'Período de referência',
  filterFrom: 'De',
  filterTo: 'Até',
  filterHelper: 'Mostra os avisos cuja data de referência está no período.',
  filterClear: 'Limpar período',
  listLoading: 'Carregando seus avisos…',
  listEmpty: 'Nenhum aviso por aqui ainda. O aviso diário chega às 8h quando há tarefas vencendo ou atrasadas.',
  tasksLabel: 'Tarefas',
  overdueLabel: 'Atrasadas',
  statusPending: 'Aguardando envio',
  statusCompleted: 'Enviado',
  statusFailed: 'Falhou',
  metricTasks: 'Tarefas no aviso',
  metricOverdue: 'Atrasadas',
  tasksHeading: 'Tarefas do aviso',
  colTask: 'Tarefa',
  colDeadline: 'Prazo',
  colSituation: 'Vencimento',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  taskStatusTodo: 'A fazer',
  taskStatusDoing: 'Em andamento',
  taskStatusReview: 'Em revisão',
  taskStatusDone: 'Concluída',
  taskStatusCanceled: 'Cancelada',
  noTasks: 'Este aviso não tem tarefas listadas.',
  noticeLoading: 'Abrindo o aviso…',
  noticeError: 'Não foi possível abrir este aviso. Tente de novo.',
  noticeNone: 'Nenhum aviso aberto. Volte à lista e toque em um aviso.',
  retry: 'Tentar de novo',
  listError: 'Não foi possível atualizar a lista por período. Tente de novo.',
  logHeading: 'Registro de envio',
  logWhen: 'Aviso',
  logRecord: 'Registro',
  generatedAt: 'Gerado em',
  finishedAt: 'Finalizado em',
  notFinished: 'Ainda não finalizado',
  failReason: 'Motivo da falha',
  logEmpty: 'Sem registros de envio.',
  missingTitle: 'Falta de onde abrir',
  missingText: 'Esta tela precisa ser aberta a partir do seu acesso às tarefas, para saber de quem são os avisos. Volte e abra de novo.',
  goBack: 'Voltar',
  loadErrorTitle: 'Não foi possível carregar seus avisos',
  loadErrorText: 'Houve um problema ao buscar os avisos. Tente de novo em instantes.'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function fmtDate(value: string | undefined | null): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function fmtDateTime(value: string | undefined | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}

const badgeBase = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap';

@customElement('tarefas--web--mobile--page11--meus_avisos-102047')
export class TarefasMobilePage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: 'pending' | 'completed' | 'failed') {
    return s === 'completed' ? this.msg.statusCompleted : s === 'failed' ? this.msg.statusFailed : this.msg.statusPending;
  }

  private statusClass(s: 'pending' | 'completed' | 'failed') {
    return s === 'completed'
      ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
      : s === 'failed'
        ? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
        : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }

  private taskStatusLabel(s: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada') {
    switch (s) {
      case 'aFazer': return this.msg.taskStatusTodo;
      case 'emAndamento': return this.msg.taskStatusDoing;
      case 'emRevisao': return this.msg.taskStatusReview;
      case 'concluida': return this.msg.taskStatusDone;
      default: return this.msg.taskStatusCanceled;
    }
  }

  private renderLoadError() {
    const missing = this.qryPaginaMeusAvisosError?.code === 'client.preconditionMissing';
    return html`
      <section class="m-4 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5" role="alert" aria-live="polite">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${missing ? this.msg.missingTitle : this.msg.loadErrorTitle}</h2>
        <p class="mt-2 text-sm text-[var(--text-default,currentColor)]">${missing ? this.msg.missingText : this.msg.loadErrorText}</p>
        <div class="mt-4 flex flex-wrap gap-3">
          <button type="button" class="min-h-[44px] rounded-lg px-4 text-sm font-medium bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => history.back()}>${this.msg.goBack}</button>
          ${missing ? nothing : html`<button type="button" class="min-h-[44px] rounded-lg border px-4 text-sm font-medium bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border-[var(--button-secondary-border,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => this.qryPaginaMeusAvisos()}>${this.msg.retry}</button>`}
        </div>
      </section>`;
  }

  private renderFilter() {
    const hasFilter = this.filtroDataInicio !== null || this.filtroDataFim !== null;
    return html`
      <details class="mb-3 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
        <summary class="flex min-h-[44px] cursor-pointer items-center px-4 text-sm text-[var(--text-muted,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg.filterSummary}</summary>
        <div class="px-4 pb-4">
          <groupenterdateinterval--ml-date-interval-presets
            .startDate=${this.filtroDataInicio}
            .endDate=${this.filtroDataFim}
            .locale=${document.documentElement.lang || 'pt-BR'}
            .loading=${this.qryListarMeusAvisosStatus === 'loading'}
            @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => {
              this.setFiltroDataInicio(e.detail.startDate);
              this.setFiltroDataFim(e.detail.endDate);
              void this.qryListarMeusAvisos({ dataInicio: e.detail.startDate, dataFim: e.detail.endDate });
            }}>
            <Label>${this.msg.filterLabel}</Label>
            <LabelStart>${this.msg.filterFrom}</LabelStart>
            <LabelEnd>${this.msg.filterTo}</LabelEnd>
            <Helper>${this.msg.filterHelper}</Helper>
          </groupenterdateinterval--ml-date-interval-presets>
          ${hasFilter ? html`
            <button type="button" class="mt-3 min-h-[44px] rounded-lg border px-4 text-sm font-medium bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border-[var(--button-secondary-border,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              @click=${() => {
                this.setFiltroDataInicio(null);
                this.setFiltroDataFim(null);
                void this.qryListarMeusAvisos({ dataInicio: null, dataFim: null });
              }}>${this.msg.filterClear}</button>` : nothing}
        </div>
      </details>
      ${this.qryListarMeusAvisosError ? html`<p class="mb-3 text-sm text-[var(--text-default,currentColor)]" role="alert" aria-live="polite">${this.msg.listError}</p>` : nothing}`;
  }

  private renderList() {
    const items = this.avisos?.items ?? [];
    const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
    return html`
      <div data-organism-id="listaAvisos">
        ${this.renderFilter()}
        <groupviewdata--ml-vertical-record-list
          .loading=${loading}
          .hoverable=${true}
          @row-click=${(e: CustomEvent<{ index: number }>) => {
            const item = items[e.detail.index];
            if (item) {
              void this.selectAvisoVencimento(item.id);
              this.setScenario('aviso');
            }
          }}>
          <Columns>
            <Column field="data" header=${this.msg.logWhen} />
            <Column field="resumo" header=${this.msg.tasksLabel} />
            <Column field="situacao" header=${this.msg.statusCompleted} align="right" />
          </Columns>
          <Rows>
            ${items.map(a => html`
              <Row ?selected=${a.id === this.selectedAvisoVencimento}>
                <Cell>
                  <div class="min-h-[44px] flex flex-col justify-center">
                    <span class="font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</span>
                    <span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.tasksLabel}: ${fmtNumber(a.details.quantidadeTarefas)} · ${this.msg.overdueLabel}: ${fmtNumber(a.details.quantidadeAtrasadas)}</span>
                  </div>
                </Cell>
                <Cell><span class="${badgeBase} ${this.statusClass(a.status)}">${this.statusLabel(a.status)}</span></Cell>
              </Row>`)}
          </Rows>
          <Loading><div class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.listLoading}</div></Loading>
          <Empty><div class="px-4 py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.listEmpty}</div></Empty>
        </groupviewdata--ml-vertical-record-list>
      </div>`;
  }

  private renderNoticeBody() {
    if (this.qryAvisoPorIdStatus === 'loading') {
      return html`<p class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]" aria-busy="true" aria-live="polite">${this.msg.noticeLoading}</p>`;
    }
    if (this.qryAvisoPorIdError) {
      return html`
        <div class="py-6" role="alert" aria-live="polite">
          <p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.noticeError}</p>
          <button type="button" class="mt-3 min-h-[44px] rounded-lg border px-4 text-sm font-medium bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border-[var(--button-secondary-border,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => this.qryAvisoPorId(this.selectedAvisoVencimento)}>${this.msg.retry}</button>
        </div>`;
    }
    const aviso = this.avisoAtual;
    if (!aviso) {
      return html`<p class="py-10 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.noticeNone}</p>`;
    }
    const linhas = aviso.details.tarefas;
    return html`
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(aviso.dataReferencia)}</p>
        <span class="${badgeBase} ${this.statusClass(aviso.status)}">${this.statusLabel(aviso.status)}</span>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-3">
        <div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
          <groupviewmetric--ml-metric-big-number>
            <Label>${this.msg.metricTasks}</Label>
            <Value>${fmtNumber(aviso.details.quantidadeTarefas)}</Value>
          </groupviewmetric--ml-metric-big-number>
        </div>
        <div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
          <groupviewmetric--ml-metric-big-number>
            <Label>${this.msg.metricOverdue}</Label>
            <Value>${fmtNumber(aviso.details.quantidadeAtrasadas)}</Value>
          </groupviewmetric--ml-metric-big-number>
        </div>
      </div>
      <h2 class="mt-6 mb-2 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.tasksHeading}</h2>
      <groupviewtable--ml-responsive-table>
        <TableHeader>
          <TableRow>
            <TableHead key="tarefa">${this.msg.colTask}</TableHead>
            <TableHead key="prazo">${this.msg.colDeadline}</TableHead>
            <TableHead key="situacao">${this.msg.colSituation}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          ${linhas.map(l => html`
            <TableRow key=${l.tarefaId}>
              <TableCell>
                <span class="font-medium text-[var(--text-strong,currentColor)]">${l.tarefa.titulo}</span>
                <span class="block text-xs text-[var(--text-muted,currentColor)]">${this.taskStatusLabel(l.tarefa.status)}</span>
              </TableCell>
              <TableCell>${fmtDate(l.prazo)}</TableCell>
              <TableCell>
                <span class="${badgeBase} ${l.situacaoPrazo === 'overdue'
                  ? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
                  : 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'}">${l.situacaoPrazo === 'overdue' ? this.msg.overdue : this.msg.dueToday}</span>
              </TableCell>
            </TableRow>`)}
        </TableBody>
        <Empty>${this.msg.noTasks}</Empty>
      </groupviewtable--ml-responsive-table>`;
  }

  private renderLog() {
    const items = this.avisos?.items ?? [];
    const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
    return html`
      <h2 class="mt-8 mb-2 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.logHeading}</h2>
      <groupviewdata--ml-timeline-view .loading=${loading}>
        <Columns>
          <Column field="aviso" header=${this.msg.logWhen} />
          <Column field="registro" header=${this.msg.logRecord} />
        </Columns>
        <Rows>
          ${items.map(a => html`
            <Row ?selected=${a.id === this.selectedAvisoVencimento}>
              <Cell>
                <div class="font-medium text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</div>
                <span class="${badgeBase} ${this.statusClass(a.status)}">${this.statusLabel(a.status)}</span>
              </Cell>
              <Cell>
                <div class="text-sm text-[var(--text-default,currentColor)]">${this.msg.generatedAt}: ${fmtDateTime(a.details.geradoEm)}</div>
                <div class="text-sm text-[var(--text-muted,currentColor)]">${a.details.finalizadoEm ? `${this.msg.finishedAt}: ${fmtDateTime(a.details.finalizadoEm)}` : this.msg.notFinished}</div>
                ${a.details.motivoFalha ? html`<div class="text-sm text-[var(--status-error-text,currentColor)]">${this.msg.failReason}: ${a.details.motivoFalha}</div>` : nothing}
              </Cell>
            </Row>`)}
        </Rows>
        <Loading><div class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.listLoading}</div></Loading>
        <Empty><div class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.logEmpty}</div></Empty>
      </groupviewdata--ml-timeline-view>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    if (this.pageStatus === 'error') {
      return html`<div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">${this.renderLoadError()}</div>`;
    }
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-4 py-3">
        <molecules--ml-scenary-102020
          mode="scenary"
          .backLabel=${this.msg.back}
          .value=${this.scenary || (this.selectedAvisoVencimento !== null ? 'aviso' : 'lista')}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'lista') void this.selectAvisoVencimento(null);
            }
          }}>
          <Scene value="lista" title=${this.msg.pageTitle}>
            ${this.renderList()}
          </Scene>
          <Scene value="aviso" title=${this.msg.sceneNotice} nav="back" backTo="lista">
            <div data-organism-id="avisoDoDia" aria-busy=${this.qryAvisoPorIdStatus === 'loading' ? 'true' : 'false'}>
              ${this.renderNoticeBody()}
            </div>
            <div data-organism-id="historicoAvisos">
              ${this.renderLog()}
            </div>
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
