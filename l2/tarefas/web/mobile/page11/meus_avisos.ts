/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import type { AvisoResumo, AvisoLinhaTarefa, ErrorState } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-interval-presets.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  listTitle: 'Meus avisos',
  detailTitle: 'Aviso do dia',
  back: 'Voltar para os avisos',
  openCurrent: 'Abrir o aviso de',
  filterSummary: 'Filtrar por período',
  filterLabel: 'Data de referência',
  filterFrom: 'De',
  filterTo: 'Até',
  filterClear: 'Limpar período',
  filterHelper: 'Escolha as duas datas para filtrar os avisos.',
  listDateHeader: 'Data de referência',
  listCountsHeader: 'Tarefas',
  listEmpty: 'Nenhum aviso encontrado para este período.',
  tasksCount: 'tarefas',
  overdueCount: 'atrasadas',
  loadMore: 'Carregar mais avisos',
  loading: 'Carregando seus avisos…',
  loadingOne: 'Abrindo o aviso…',
  retry: 'Tentar novamente',
  errorTitle: 'Não foi possível carregar os avisos.',
  errorOne: 'Não foi possível abrir este aviso.',
  errorList: 'Não foi possível aplicar o período.',
  preconditionTitle: 'Esta tela foi aberta sem o que ela precisa.',
  preconditionText: 'Volte para a página de onde você veio e abra os avisos novamente.',
  goBack: 'Voltar',
  emptyAll: 'Você ainda não recebeu nenhum aviso diário. O aviso chega todos os dias às 8h.',
  noneSelected: 'Escolha um aviso na lista para ver as tarefas que vencem hoje ou estão atrasadas.',
  metricTasks: 'Tarefas no aviso',
  metricOverdue: 'Atrasadas',
  tasksCaption: 'Tarefas que vencem hoje ou estão atrasadas',
  colTask: 'Tarefa',
  colDeadline: 'Prazo',
  colDeadlineState: 'Situação do prazo',
  colStatus: 'Situação',
  tasksEmpty: 'Este aviso não tem tarefas.',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  taskTodo: 'A fazer',
  taskDoing: 'Em andamento',
  taskReview: 'Em revisão',
  taskDone: 'Concluída',
  taskCancelled: 'Cancelada',
  avisoPending: 'Aguardando envio',
  avisoCompleted: 'Enviado',
  avisoFailed: 'Falhou',
  logTitle: 'Registro de envio',
  logWhen: 'Aviso',
  logDetail: 'Geração e finalização',
  logEmpty: 'Sem registros de envio.',
  generatedAt: 'Gerado em',
  finishedAt: 'Finalizado em',
  failureReason: 'Motivo da falha',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const PRECONDITION = 'client.preconditionMissing';

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function toDate(value: string): Date {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + 'T12:00:00') : new Date(value);
}

function fmtDate(value: string | undefined): string {
  if (!value) return '';
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium' }).format(d);
}

function fmtDateTime(value: string | undefined): string {
  if (!value) return '';
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function avisoStatusLabel(msg: PageMessageType, status: AvisoResumo['status']): string {
  if (status === 'completed') return msg.avisoCompleted;
  if (status === 'failed') return msg.avisoFailed;
  return msg.avisoPending;
}

function avisoStatusClass(status: AvisoResumo['status']): string {
  if (status === 'completed') return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
  if (status === 'failed') return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
  return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
}

function taskStatusLabel(msg: PageMessageType, status: AvisoLinhaTarefa['tarefa']['status']): string {
  switch (status) {
    case 'aFazer': return msg.taskTodo;
    case 'emAndamento': return msg.taskDoing;
    case 'emRevisao': return msg.taskReview;
    case 'concluida': return msg.taskDone;
    default: return msg.taskCancelled;
  }
}

const BADGE = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';
const BTN_SECONDARY = 'inline-flex min-h-11 items-center justify-center rounded-lg border px-4 text-sm font-medium bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border-[var(--button-secondary-border,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('tarefas--web--mobile--page11--meus_avisos-102047')
export class TarefasMobilePage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg!: PageMessageType;

  private renderError(title: string, err: ErrorState, retry: () => void) {
    if (err && err.code === PRECONDITION) {
      return html`<div class="rounded-lg border p-4 border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]" aria-live="polite">
        <p class="font-semibold text-[var(--text-strong,currentColor)]">${this.msg['preconditionTitle']}</p>
        <p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${this.msg['preconditionText']}</p>
        <button type="button" class="${BTN_SECONDARY} mt-3" @click=${() => history.back()}>${this.msg['goBack']}</button>
      </div>`;
    }
    return html`<div class="rounded-lg border p-4 border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]" role="alert" aria-live="polite">
      <p class="font-semibold text-[var(--text-strong,currentColor)]">${title}</p>
      ${err?.message ? html`<p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${err.message}</p>` : nothing}
      <button type="button" class="${BTN_SECONDARY} mt-3" @click=${retry}>${this.msg['retry']}</button>
    </div>`;
  }

  private renderFilter() {
    const hasFilter = !!(this.filtroDataInicio || this.filtroDataFim);
    return html`<details class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]" ?open=${hasFilter}>
      <summary class="flex min-h-11 cursor-pointer items-center px-3 text-sm font-medium text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['filterSummary']}</summary>
      <div class="px-3 pb-3">
        <groupenterdateinterval--ml-date-interval-presets
          .startDate=${this.filtroDataInicio}
          .endDate=${this.filtroDataFim}
          .loading=${this.qryListarMeusAvisosStatus === 'loading'}
          locale=${document.documentElement.lang || ''}
          @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => {
            this.setFiltroDataInicio(e.detail.startDate);
            this.setFiltroDataFim(e.detail.endDate);
            void this.qryListarMeusAvisos(1);
          }}>
          <Label>${this.msg['filterLabel']}</Label>
          <LabelStart>${this.msg['filterFrom']}</LabelStart>
          <LabelEnd>${this.msg['filterTo']}</LabelEnd>
          <Helper>${this.msg['filterHelper']}</Helper>
        </groupenterdateinterval--ml-date-interval-presets>
        ${hasFilter
          ? html`<button type="button" class="${BTN_SECONDARY} mt-3 w-full" @click=${() => {
              this.setFiltroDataInicio(null);
              this.setFiltroDataFim(null);
              void this.qryListarMeusAvisos(1);
            }}>${this.msg['filterClear']}</button>`
          : nothing}
      </div>
    </details>`;
  }

  private renderList() {
    const items = this.avisos.items;
    const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
    const emptyText = this.pageStatus === 'empty' ? this.msg['emptyAll'] : this.msg['listEmpty'];
    return html`<groupviewdata--ml-vertical-record-list
      .hoverable=${true}
      .loading=${loading}
      @row-click=${(e: CustomEvent<{ index: number }>) => {
        const aviso = items[e.detail.index];
        if (aviso) {
          this.selectAvisoVencimento(aviso.id);
          this.setScenario('aviso');
        }
      }}>
      <Columns>
        <Column field="dataReferencia" header=${this.msg['listDateHeader']} />
        <Column field="quantidades" header=${this.msg['listCountsHeader']} align="right" />
      </Columns>
      <Rows>
        ${items.map((a: AvisoResumo) => html`
          <Row ?selected=${a.id === this.selectedAvisoVencimento}>
            <Cell>
              <div class="py-1">
                <div class="font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</div>
                <span class="${BADGE} mt-1 ${avisoStatusClass(a.status)}">${avisoStatusLabel(this.msg, a.status)}</span>
              </div>
            </Cell>
            <Cell>
              <div class="text-right text-sm text-[var(--text-default,currentColor)]">
                <div><span class="font-semibold text-[var(--text-strong,currentColor)]">${a.details.quantidadeTarefas}</span> ${this.msg['tasksCount']}</div>
                <div class="text-[var(--text-muted,currentColor)]"><span class="font-semibold">${a.details.quantidadeAtrasadas}</span> ${this.msg['overdueCount']}</div>
              </div>
            </Cell>
          </Row>`)}
      </Rows>
      <Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['loading']}</div></Loading>
      <Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${emptyText}</div></Empty>
    </groupviewdata--ml-vertical-record-list>`;
  }

  private renderListScene() {
    if (this.pageStatus === 'error') {
      return this.renderError(this.msg['errorTitle'], this.qryPaginaMeusAvisosError, () => { void this.qryPaginaMeusAvisos(); });
    }
    const atual = this.avisoAtual;
    return html`<div class="flex flex-col gap-3">
      ${atual
        ? html`<button type="button" class="${BTN_SECONDARY} w-full justify-between gap-2" @click=${() => this.setScenario('aviso')}>
            <span>${this.msg['openCurrent']}</span>
            <span class="font-semibold">${fmtDate(atual.dataReferencia)}</span>
          </button>`
        : nothing}
      ${this.renderFilter()}
      ${this.qryListarMeusAvisosError
        ? html`<p class="text-sm text-[var(--text-default,currentColor)]" role="alert" aria-live="polite">${this.msg['errorList']} ${this.qryListarMeusAvisosError.message}</p>`
        : nothing}
      <div class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]" aria-busy=${this.qryListarMeusAvisosStatus === 'loading' ? 'true' : 'false'}>
        ${this.renderList()}
      </div>
      ${this.avisos.hasMore
        ? html`<button type="button" class="${BTN_SECONDARY} w-full" ?disabled=${this.qryListarMeusAvisosStatus === 'loading'}
            @click=${() => { void this.qryListarMeusAvisos((this.avisos.page ?? 1) + 1, true); }}>${this.msg['loadMore']}</button>`
        : nothing}
    </div>`;
  }

  private renderTasks(linhas: AvisoLinhaTarefa[]) {
    return html`<groupviewtable--ml-responsive-table>
      <TableCaption>${this.msg['tasksCaption']}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead key="titulo">${this.msg['colTask']}</TableHead>
          <TableHead key="prazo">${this.msg['colDeadline']}</TableHead>
          <TableHead key="situacaoPrazo">${this.msg['colDeadlineState']}</TableHead>
          <TableHead key="status">${this.msg['colStatus']}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        ${linhas.map((l) => html`
          <TableRow key=${l.tarefaId}>
            <TableCell><span class="font-medium text-[var(--text-strong,currentColor)]">${l.tarefa.titulo}</span></TableCell>
            <TableCell>${fmtDate(l.prazo)}</TableCell>
            <TableCell>
              <span class="${BADGE} ${l.situacaoPrazo === 'overdue'
                ? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
                : 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'}">${l.situacaoPrazo === 'overdue' ? this.msg['overdue'] : this.msg['dueToday']}</span>
            </TableCell>
            <TableCell>${taskStatusLabel(this.msg, l.tarefa.status)}</TableCell>
          </TableRow>`)}
      </TableBody>
      <Empty>${this.msg['tasksEmpty']}</Empty>
    </groupviewtable--ml-responsive-table>`;
  }

  private renderAvisoBody() {
    if (this.qryAvisoPorIdStatus === 'loading') {
      return html`<p class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg['loadingOne']}</p>`;
    }
    if (this.qryAvisoPorIdError) {
      return this.renderError(this.msg['errorOne'], this.qryAvisoPorIdError, () => { void this.qryAvisoPorId(); });
    }
    const a = this.avisoAtual;
    if (!a) {
      return html`<p class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['noneSelected']}</p>`;
    }
    return html`<div class="flex flex-col gap-4">
      <div class="flex items-center justify-between gap-2">
        <span class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</span>
        <span class="${BADGE} ${avisoStatusClass(a.status)}">${avisoStatusLabel(this.msg, a.status)}</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border p-3 border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewmetric--ml-metric-big-number>
            <Label>${this.msg['metricTasks']}</Label>
            <Value>${a.details.quantidadeTarefas}</Value>
          </groupviewmetric--ml-metric-big-number>
        </div>
        <div class="rounded-lg border p-3 border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewmetric--ml-metric-big-number>
            <Label>${this.msg['metricOverdue']}</Label>
            <Value>${a.details.quantidadeAtrasadas}</Value>
          </groupviewmetric--ml-metric-big-number>
        </div>
      </div>
      ${this.renderTasks(a.details.tarefas)}
    </div>`;
  }

  private renderLog() {
    const items = this.avisos.items;
    return html`<section class="mt-6 border-t pt-4 border-[var(--border-subtle,currentColor)]">
      <h3 class="mb-2 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['logTitle']}</h3>
      <groupviewdata--ml-timeline-view>
        <Columns>
          <Column field="aviso" header=${this.msg['logWhen']} />
          <Column field="registro" header=${this.msg['logDetail']} />
        </Columns>
        <Rows>
          ${items.map((a: AvisoResumo) => html`
            <Row ?selected=${a.id === this.selectedAvisoVencimento}>
              <Cell>
                <div class="text-sm font-medium text-[var(--text-strong,currentColor)]">${fmtDate(a.dataReferencia)}</div>
                <span class="${BADGE} mt-1 ${avisoStatusClass(a.status)}">${avisoStatusLabel(this.msg, a.status)}</span>
              </Cell>
              <Cell>
                <div class="text-xs text-[var(--text-default,currentColor)]">
                  <div>${this.msg['generatedAt']}: ${fmtDateTime(a.details.geradoEm)}</div>
                  ${a.details.finalizadoEm ? html`<div>${this.msg['finishedAt']}: ${fmtDateTime(a.details.finalizadoEm)}</div>` : nothing}
                  ${a.details.motivoFalha ? html`<div class="text-[var(--status-error-text,currentColor)]">${this.msg['failureReason']}: ${a.details.motivoFalha}</div>` : nothing}
                </div>
              </Cell>
            </Row>`)}
        </Rows>
        <Empty><div class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['logEmpty']}</div></Empty>
      </groupviewdata--ml-timeline-view>
    </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`<main class="min-h-full px-4 py-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
      <molecules--ml-scenary-102020
        mode="scenary"
        backLabel=${this.msg['back']}
        .value=${this.scenary || 'lista'}
        @change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
        <Scene value="lista" title=${this.msg['listTitle']}>
          <div data-organism-id="listaAvisos">${this.renderListScene()}</div>
        </Scene>
        <Scene value="aviso" title=${this.msg['detailTitle']} nav="back" backTo="lista">
          <div data-organism-id="avisoDoDia">${this.renderAvisoBody()}</div>
          <div data-organism-id="historicoAvisos">${this.renderLog()}</div>
        </Scene>
      </molecules--ml-scenary-102020>
    </main>`;
  }
}
