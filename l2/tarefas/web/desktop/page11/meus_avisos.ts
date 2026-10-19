/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/meus_avisos.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasMeus_avisosShared } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import type { AvisoResumo, AvisoLinhaTarefa } from '/_102047_/l2/tarefas/web/shared/meus_avisos.js';
import '/_102040_/l2/molecules/groupenterdateinterval/ml-date-range-dual-calendar.js';
import '/_102040_/l2/molecules/groupviewdata/ml-timeline-view.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-view-table.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meus avisos',
  pageSubtitle: 'Seus avisos diários das 8h: escolha um dia e veja as tarefas que venciam nele ou já estavam atrasadas.',
  listHeading: 'Avisos recebidos',
  filterLabel: 'Período de referência',
  filterStart: 'De',
  filterEnd: 'Até',
  filterClear: 'Limpar período',
  listEmpty: 'Nenhum aviso encontrado neste período.',
  listMore: 'Mostrar mais avisos',
  listColDate: 'Data de referência',
  listColStatus: 'Envio',
  tasksLabel: 'Tarefas',
  overdueLabel: 'Atrasadas',
  statusPending: 'Aguardando envio',
  statusCompleted: 'Enviado',
  statusFailed: 'Falhou',
  loadingPage: 'Carregando seus avisos…',
  loadingList: 'Carregando avisos…',
  loadingNotice: 'Abrindo o aviso…',
  errorPage: 'Não foi possível carregar seus avisos.',
  errorList: 'Não foi possível atualizar a lista de avisos.',
  errorNotice: 'Não foi possível abrir este aviso.',
  retry: 'Tentar novamente',
  missingTitle: 'Falta informar o que abrir',
  missingBody: 'Esta página foi aberta sem o contexto necessário para carregar seus avisos. Volte à tela anterior e abra os avisos por lá.',
  back: 'Voltar à tela anterior',
  emptyTitle: 'Você ainda não recebeu avisos diários',
  emptyBody: 'Quando o sistema gerar o aviso das 8h, ele aparece aqui com as tarefas que vencem no dia ou estão atrasadas.',
  noticeHeadingPrefix: 'Aviso de',
  noticeTotalTasks: 'Tarefas no aviso',
  noticeTotalOverdue: 'Atrasadas',
  noticePickHint: 'Escolha um aviso na lista para ver as tarefas que venciam naquele dia.',
  taskTitle: 'Tarefa',
  taskDeadline: 'Prazo',
  taskDeadlineState: 'Situação do prazo',
  taskStatus: 'Situação da tarefa',
  taskEmpty: 'Nenhuma tarefa aberta venceu neste dia nem estava atrasada.',
  dueToday: 'Vence hoje',
  overdue: 'Atrasada',
  todo: 'A fazer',
  doing: 'Em andamento',
  review: 'Em revisão',
  done: 'Concluída',
  canceled: 'Cancelada',
  deliveryHeading: 'Registro de envio',
  deliveryWhen: 'Quando',
  deliveryWhat: 'Registro',
  deliveryEmpty: 'Ainda não há registros de envio.',
  generated: 'Aviso gerado',
  finished: 'Aviso finalizado',
  forDay: 'Referência',
  failureReason: 'Motivo da falha'
};

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const lang = (): string | undefined => document.documentElement.lang || undefined;

function parseDate(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Date(value);
}

function formatDay(value: string, style: 'short' | 'long' = 'short'): string {
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: style }).format(d);
}

function formatMoment(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}

function itemsOf(avisos: unknown): AvisoResumo[] {
  const list = avisos as { items?: AvisoResumo[] } | null | undefined;
  return list?.items ?? [];
}

function hasMoreOf(avisos: unknown): boolean {
  const list = avisos as { hasMore?: boolean } | null | undefined;
  return list?.hasMore === true;
}

function pageOf(avisos: unknown): number {
  const list = avisos as { page?: number } | null | undefined;
  return list?.page ?? 1;
}

@customElement('tarefas--web--desktop--page11--meus_avisos-102047')
export class TarefasDesktopPage11Meus_avisosPage extends TarefasMeus_avisosShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private badge(kind: 'success' | 'error' | 'warning' | 'neutral' | 'info', text: string) {
    const cls = {
      success: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
      error: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
      warning: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
      info: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
      neutral: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'
    }[kind];
    return html`<span class="inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${cls}">${text}</span>`;
  }

  private avisoStatusBadge(status: AvisoResumo['status']) {
    if (status === 'completed') return this.badge('success', this.msg.statusCompleted);
    if (status === 'failed') return this.badge('error', this.msg.statusFailed);
    return this.badge('warning', this.msg.statusPending);
  }

  private taskStatusText(status: AvisoLinhaTarefa['tarefa']['status']): string {
    switch (status) {
      case 'aFazer': return this.msg.todo;
      case 'emAndamento': return this.msg.doing;
      case 'emRevisao': return this.msg.review;
      case 'concluida': return this.msg.done;
      default: return this.msg.canceled;
    }
  }

  private retryButton(onClick: () => void) {
    return html`<button type="button"
      class="mt-2 min-h-[36px] rounded-md border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-3 text-sm text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
      @click=${onClick}>${this.msg.retry}</button>`;
  }

  private renderFilter() {
    const hasFilter = !!(this.filtroDataInicio || this.filtroDataFim);
    return html`
      <div class="flex flex-col gap-2">
        <groupenterdateinterval--ml-date-range-dual-calendar
          .startDate=${this.filtroDataInicio}
          .endDate=${this.filtroDataFim}
          .locale=${lang() ?? 'pt-BR'}
          @change=${(e: CustomEvent<{ startDate: string | null; endDate: string | null }>) => {
            this.setFiltroDataInicio(e.detail.startDate);
            this.setFiltroDataFim(e.detail.endDate);
            void this.qryListarMeusAvisos(1);
          }}>
          <Label>${this.msg.filterLabel}</Label>
          <LabelStart>${this.msg.filterStart}</LabelStart>
          <LabelEnd>${this.msg.filterEnd}</LabelEnd>
        </groupenterdateinterval--ml-date-range-dual-calendar>
        ${hasFilter ? html`
          <button type="button"
            class="self-start text-sm text-[var(--link-text,currentColor)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            @click=${() => {
              this.setFiltroDataInicio(null);
              this.setFiltroDataFim(null);
              void this.qryListarMeusAvisos(1);
            }}>${this.msg.filterClear}</button>` : nothing}
      </div>`;
  }

  private renderList() {
    const items = itemsOf(this.avisos);
    const currentId = this.selectedAvisoVencimento ?? this.avisoAtual?.id ?? null;
    const loading = this.qryListarMeusAvisosStatus === 'loading';
    return html`
      <div class="flex flex-col gap-3" data-organism-id="listaAvisos">
        ${this.renderFilter()}
        ${this.qryListarMeusAvisosError ? html`
          <div aria-live="polite" class="text-sm text-[var(--text-default,currentColor)]">
            ${this.msg.errorList}
            <div>${this.retryButton(() => { void this.qryListarMeusAvisos(1); })}</div>
          </div>` : nothing}
        <div class="max-h-[60vh] overflow-auto rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewdata--ml-vertical-record-list
            .hoverable=${true}
            .loading=${loading}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const item = items[e.detail.index];
              if (item) this.selectAvisoVencimento(item.id);
            }}>
            <Columns>
              <Column field="data" header=${this.msg.listColDate} />
              <Column field="envio" header=${this.msg.listColStatus} align="right" width="150px" />
            </Columns>
            <Rows>
              ${items.map(item => html`
                <Row ?selected=${item.id === currentId}>
                  <Cell>
                    <div class="font-medium text-[var(--text-strong,currentColor)]">${formatDay(item.dataReferencia, 'long')}</div>
                    <div class="text-sm text-[var(--text-muted,currentColor)]">
                      ${this.msg.tasksLabel}: ${formatNumber(item.details.quantidadeTarefas)} · ${this.msg.overdueLabel}: ${formatNumber(item.details.quantidadeAtrasadas)}
                    </div>
                  </Cell>
                  <Cell>${this.avisoStatusBadge(item.status)}</Cell>
                </Row>`)}
            </Rows>
            <Empty><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.listEmpty}</div></Empty>
            <Loading><div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.loadingList}</div></Loading>
          </groupviewdata--ml-vertical-record-list>
        </div>
        ${hasMoreOf(this.avisos) ? html`
          <button type="button"
            class="self-center text-sm text-[var(--link-text,currentColor)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            ?disabled=${loading}
            @click=${() => { void this.qryListarMeusAvisos(pageOf(this.avisos) + 1, true); }}>${this.msg.listMore}</button>` : nothing}
      </div>`;
  }

  private renderNotice() {
    const aviso = this.avisoAtual;
    if (this.qryAvisoPorIdStatus === 'loading') {
      return html`<p aria-busy="true" class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.loadingNotice}</p>`;
    }
    if (this.qryAvisoPorIdError) {
      return html`<div aria-live="polite" class="text-sm text-[var(--text-default,currentColor)]">
        ${this.msg.errorNotice}
        <div>${this.retryButton(() => { void this.qryAvisoPorId(); })}</div>
      </div>`;
    }
    if (!aviso) {
      return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.noticePickHint}</p>`;
    }
    return html`
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.noticeHeadingPrefix} ${formatDay(aviso.dataReferencia, 'long')}</h2>
          ${this.avisoStatusBadge(aviso.status)}
        </div>
        <div class="grid grid-cols-2 gap-4">
          <groupviewmetric--ml-metric-card>
            <Label>${this.msg.noticeTotalTasks}</Label>
            <Value>${formatNumber(aviso.details.quantidadeTarefas)}</Value>
          </groupviewmetric--ml-metric-card>
          <groupviewmetric--ml-metric-card>
            <Label>${this.msg.noticeTotalOverdue}</Label>
            <Value>${formatNumber(aviso.details.quantidadeAtrasadas)}</Value>
          </groupviewmetric--ml-metric-card>
        </div>
        <groupviewtable--ml-view-table>
          <TableHeader>
            <TableRow>
              <TableHead key="titulo">${this.msg.taskTitle}</TableHead>
              <TableHead key="prazo">${this.msg.taskDeadline}</TableHead>
              <TableHead key="situacaoPrazo">${this.msg.taskDeadlineState}</TableHead>
              <TableHead key="status">${this.msg.taskStatus}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            ${aviso.details.tarefas.map(linha => html`
              <TableRow key=${linha.tarefaId}>
                <TableCell>${linha.tarefa.titulo}</TableCell>
                <TableCell sort-value=${linha.prazo}>${formatDay(linha.prazo)}</TableCell>
                <TableCell>${linha.situacaoPrazo === 'overdue'
                  ? this.badge('error', this.msg.overdue)
                  : this.badge('warning', this.msg.dueToday)}</TableCell>
                <TableCell>${this.taskStatusText(linha.tarefa.status)}</TableCell>
              </TableRow>`)}
          </TableBody>
          <Empty>${this.msg.taskEmpty}</Empty>
        </groupviewtable--ml-view-table>
      </div>`;
  }

  private renderTimeline() {
    const items = itemsOf(this.avisos);
    return html`
      <groupviewdata--ml-timeline-view>
        <Columns>
          <Column field="quando" header=${this.msg.deliveryWhen} width="160px" />
          <Column field="registro" header=${this.msg.deliveryWhat} />
        </Columns>
        <Rows>
          ${items.map(item => html`
            <Row>
              <Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${formatMoment(item.details.geradoEm)}</span></Cell>
              <Cell>
                <div class="text-sm text-[var(--text-default,currentColor)]">${this.msg.generated} · ${this.msg.forDay} ${formatDay(item.dataReferencia)}</div>
              </Cell>
            </Row>
            ${item.details.finalizadoEm ? html`
              <Row>
                <Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${formatMoment(item.details.finalizadoEm)}</span></Cell>
                <Cell>
                  <div class="flex flex-wrap items-center gap-2 text-sm text-[var(--text-default,currentColor)]">
                    <span>${this.msg.finished} · ${this.msg.forDay} ${formatDay(item.dataReferencia)}</span>
                    ${this.avisoStatusBadge(item.status)}
                  </div>
                  ${item.details.motivoFalha ? html`<div class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.failureReason}: ${item.details.motivoFalha}</div>` : nothing}
                </Cell>
              </Row>` : item.details.motivoFalha ? html`
              <Row>
                <Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${formatMoment(item.details.geradoEm)}</span></Cell>
                <Cell>
                  <div class="text-sm text-[var(--text-default,currentColor)]">${this.msg.failureReason}: ${item.details.motivoFalha}</div>
                </Cell>
              </Row>` : nothing}
          `)}
        </Rows>
        <Empty><div class="py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg.deliveryEmpty}</div></Empty>
      </groupviewdata--ml-timeline-view>`;
  }

  private renderDesk() {
    return html`
      <div class="grid grid-cols-[minmax(320px,400px)_1fr] items-start gap-6">
        <section class="flex flex-col gap-3" aria-labelledby="h-lista">
          <h2 id="h-lista" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.listHeading}</h2>
          ${this.renderList()}
        </section>
        <div class="flex flex-col gap-8">
          <section data-organism-id="avisoDoDia"
            class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5"
            aria-live="polite" aria-busy=${this.qryAvisoPorIdStatus === 'loading' ? 'true' : 'false'}>
            ${this.renderNotice()}
          </section>
          <section data-organism-id="historicoAvisos" class="flex flex-col gap-3" aria-labelledby="h-registro">
            <h2 id="h-registro" class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.deliveryHeading}</h2>
            ${this.renderTimeline()}
          </section>
        </div>
      </div>`;
  }

  private renderBody() {
    if (this.pageStatus === 'loading' || this.pageStatus === 'idle') {
      return html`<p aria-busy="true" class="py-16 text-center text-[var(--text-muted,currentColor)]">${this.msg.loadingPage}</p>`;
    }
    if (this.pageStatus === 'error') {
      if (this.qryPaginaMeusAvisosError?.code === 'client.preconditionMissing') {
        return html`
          <div aria-live="polite" class="mx-auto max-w-md py-16 text-center">
            <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.missingTitle}</h2>
            <p class="mt-2 text-[var(--text-default,currentColor)]">${this.msg.missingBody}</p>
            <button type="button"
              class="mt-4 min-h-[40px] rounded-md bg-[var(--button-primary-bg,transparent)] px-4 text-[var(--button-primary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              @click=${() => window.history.back()}>${this.msg.back}</button>
          </div>`;
      }
      return html`
        <div aria-live="polite" class="mx-auto max-w-md py-16 text-center text-[var(--text-default,currentColor)]">
          ${this.msg.errorPage}
          <div>${this.retryButton(() => { void this.qryPaginaMeusAvisos(); })}</div>
        </div>`;
    }
    if (this.pageStatus === 'empty') {
      return html`
        <div class="mx-auto max-w-md py-16 text-center">
          <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.emptyTitle}</h2>
          <p class="mt-2 text-[var(--text-muted,currentColor)]">${this.msg.emptyBody}</p>
        </div>`;
    }
    return this.renderDesk();
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageSubtitle}</p>
        </header>
        ${this.renderBody()}
      </main>`;
  }
}
