/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared, type TarefaAcao, type ErrorState } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/groupshowprogress/ml-linear-progress.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewchart/ml-bar-chart.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageName: 'Visão da equipe',
  headline: '{a} atrasadas e {b} vencem hoje',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHint: 'Nenhuma tarefa da equipe está esperando uma decisão sua.',
  laneAria: 'Tarefas que pedem ação do gestor',
  colTask: 'Tarefa',
  colDeadline: 'Prazo',
  late: 'Atrasada',
  dueToday: 'Vence hoje',
  statusAFazer: 'A fazer',
  statusEmAndamento: 'Em andamento',
  statusEmRevisao: 'Em revisão',
  statusConcluida: 'Concluída',
  statusCancelada: 'Cancelada',
  withoutOwner: 'Sem responsável',
  seeRest: 'Ver as demais tarefas',
  loadMore: 'Carregar mais tarefas',
  retry: 'Tentar de novo',
  loadingLane: 'Carregando as tarefas que pedem ação',
  laneError: 'Não foi possível carregar as tarefas que pedem ação.',
  stripError: 'Não foi possível carregar os totais da equipe.',
  missingTitle: 'Falta indicar o que abrir',
  missingText: 'Esta tarefa não pôde ser aberta porque nenhuma tarefa foi escolhida. Volte para a lista e toque numa tarefa.',
  selectionInvalid: 'Essa tarefa não está mais na lista. Atualize a lista e tente de novo.',
  stripAria: 'Totais da equipe',
  open: 'Abertas',
  dueTodayTotal: 'Vencem hoje',
  lateTotal: 'Atrasadas',
  checklists: 'Checklists das tarefas abertas',
  checklistsDone: 'itens feitos',
  byList: 'Tarefas abertas por lista',
  openTasks: 'Tarefas abertas',
  noLists: 'Nenhuma lista com tarefas abertas.',
  loadingStrip: 'Carregando os totais da equipe'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const VISIBLE_ROWS = 5;

function lang() {
  return document.documentElement.lang || undefined;
}

function formatInt(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

function formatDate(value: string) {
  if (!value) return '';
  const d = new Date(value.length === 10 ? value + 'T00:00:00' : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short' }).format(d);
}

function progressValue(text: string) {
  const parts = (text || '').split('/');
  const done = Number(parts[0]);
  const total = Number(parts[1]);
  if (Number.isNaN(done) || Number.isNaN(total) || total <= 0) return 0;
  return Math.max(0, Math.min(100, (done / total) * 100));
}

@customElement('tarefas--web--mobile--page11--inicio_gestor-102047')
export class TarefasMobilePage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(t: TarefaAcao) {
    switch (t.status) {
      case 'aFazer': return this.msg.statusAFazer;
      case 'emAndamento': return this.msg.statusEmAndamento;
      case 'emRevisao': return this.msg.statusEmRevisao;
      case 'concluida': return this.msg.statusConcluida;
      default: return this.msg.statusCancelada;
    }
  }

  private renderSkeletonRows() {
    return html`
      <div role="status" aria-busy="true" aria-label=${this.msg.loadingLane} class="flex flex-col">
        ${[0, 1, 2].map(() => html`
          <div class="flex min-h-[64px] items-center justify-between gap-4 border-b border-[var(--border-subtle,currentColor)] py-3 animate-pulse">
            <div class="flex flex-1 flex-col gap-2">
              <div class="h-4 w-3/4 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
              <div class="h-3 w-1/2 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            </div>
            <div class="h-4 w-16 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
          </div>`)}
      </div>`;
  }

  private renderRetry(text: string, onRetry: () => void) {
    return html`
      <div role="alert" aria-live="polite" class="flex flex-col items-start gap-3 rounded-lg bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]">
        <p class="text-sm">${text}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${onRetry}>
          <Label>${this.msg.retry}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>`;
  }

  private renderLaneError(error: ErrorState) {
    if (error && error.code === 'client.preconditionMissing') {
      return html`
        <div role="alert" aria-live="polite" class="rounded-lg bg-[var(--status-warning-bg,transparent)] p-4 text-[var(--status-warning-text,currentColor)]">
          <p class="text-sm font-semibold">${this.msg.missingTitle}</p>
          <p class="mt-1 text-sm">${this.msg.missingText}</p>
        </div>`;
    }
    if (error && error.code === 'client.selectionInvalid') {
      return html`
        <div role="alert" aria-live="polite" class="flex flex-col items-start gap-3 rounded-lg bg-[var(--status-warning-bg,transparent)] p-4 text-[var(--status-warning-text,currentColor)]">
          <p class="text-sm">${this.msg.selectionInvalid}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.listarTarefasParaAcao()}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    return this.renderRetry(this.msg.laneError, () => this.listarTarefasParaAcao());
  }

  private renderFact(t: TarefaAcao) {
    const flag = t.details.atrasada
      ? html`<span class="text-xs font-semibold text-[var(--status-error-text,currentColor)]">${this.msg.late}</span>`
      : t.details.venceHoje
        ? html`<span class="text-xs font-semibold text-[var(--status-warning-text,currentColor)]">${this.msg.dueToday}</span>`
        : nothing;
    return html`
      <div class="flex flex-col items-end gap-0.5 whitespace-nowrap text-right">
        <span class="text-sm font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatDate(t.prazo)}</span>
        ${flag}
      </div>`;
  }

  private renderRows(items: TarefaAcao[], offset: number, all: TarefaAcao[]) {
    return html`
      <groupviewdata--ml-vertical-record-list
        .hoverable=${true}
        @row-click=${(e: CustomEvent<{ index: number }>) => {
          const t = all[e.detail.index + offset];
          if (t) this.abrirTarefasEquipe(t.id);
        }}>
        <Columns>
          <Column field="tarefa" header=${this.msg.colTask} />
          <Column field="prazo" header=${this.msg.colDeadline} align="right" width="104px" />
        </Columns>
        <Rows>
          ${items.map(t => html`
            <Row ?selected=${t.id === this.selectedTarefa}>
              <Cell>
                <div class="flex min-h-[44px] min-w-0 flex-col justify-center gap-0.5 py-1">
                  <span class="break-words text-sm font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
                  <span class="break-words text-xs text-[var(--text-muted,currentColor)]">${t.membroEquipe?.details?.identification?.name || this.msg.withoutOwner} · ${t.lista?.nome} · ${this.statusLabel(t)}</span>
                </div>
              </Cell>
              <Cell>${this.renderFact(t)}</Cell>
            </Row>`)}
        </Rows>
      </groupviewdata--ml-vertical-record-list>`;
  }

  private renderHeadline() {
    const items = this.tarefas ? this.tarefas.items : null;
    if (items && items.length === 0) {
      return html`
        <div aria-live="polite">
          <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.goodNews}</h1>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.goodNewsHint}</p>
        </div>`;
    }
    if (this.obterPanoramaEquipeStatus === 'loading' && this.pageStatus !== 'success') {
      return html`<div class="h-7 w-3/4 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`;
    }
    const text = this.msg.headline
      .replace('{a}', formatInt(this.totalAtrasadas))
      .replace('{b}', formatInt(this.totalVenceHoje));
    return html`<h1 aria-live="polite" class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${text}</h1>`;
  }

  private renderLane() {
    const page = this.tarefas;
    const error = this.listarTarefasParaAcaoError;
    const loading = this.listarTarefasParaAcaoStatus === 'loading';
    let body;
    if (!page && loading) {
      body = this.renderSkeletonRows();
    } else if (!page && this.listarTarefasParaAcaoStatus === 'error') {
      body = this.renderLaneError(error);
    } else if (!page || page.items.length === 0) {
      body = error ? this.renderLaneError(error) : nothing;
    } else {
      const items = page.items;
      const first = items.slice(0, VISIBLE_ROWS);
      const rest = items.slice(VISIBLE_ROWS);
      body = html`
        ${error ? html`<div class="mb-3">${this.renderLaneError(error)}</div>` : nothing}
        <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          ${this.renderRows(first, 0, items)}
        </div>
        ${rest.length > 0 ? html`
          <details class="mt-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
            <summary class="flex min-h-[44px] cursor-pointer items-center px-4 text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg.seeRest}</summary>
            ${this.renderRows(rest, VISIBLE_ROWS, items)}
          </details>` : nothing}
        ${page.hasMore ? html`
          <div class="mt-3">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full" ?loading=${loading}
              @action=${() => this.listarTarefasParaAcao(page.page + 1, true)}>
              <Label>${this.msg.loadMore}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}`;
    }
    return html`
      <section data-organism-id="tarefasParaAcao" aria-label=${this.msg.laneAria} aria-busy=${loading ? 'true' : 'false'}>
        ${body}
      </section>`;
  }

  private renderStrip() {
    const status = this.obterPanoramaEquipeStatus;
    let strip;
    if (status === 'error') {
      strip = this.renderRetry(this.msg.stripError, () => this.obterPanoramaEquipe());
    } else if (status === 'loading' && this.pageStatus !== 'success') {
      strip = html`<div role="status" aria-busy="true" aria-label=${this.msg.loadingStrip} class="flex animate-pulse gap-6">
        ${[0, 1, 2].map(() => html`<div class="h-10 w-16 rounded bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
    } else {
      strip = html`
        <dl aria-label=${this.msg.stripAria} class="flex flex-wrap gap-x-6 gap-y-3">
          <div><dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${formatInt(this.totalAbertas)}</dd><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.open}</dt></div>
          <div><dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${formatInt(this.totalVenceHoje)}</dd><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.dueTodayTotal}</dt></div>
          <div><dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${formatInt(this.totalAtrasadas)}</dd><dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.lateTotal}</dt></div>
        </dl>
        <div class="mt-4">
          <div class="mb-1 flex items-baseline justify-between gap-3 text-xs text-[var(--text-muted,currentColor)]">
            <span>${this.msg.checklists}</span>
            <span class="tabular-nums">${this.progressoChecklist || '0/0'} ${this.msg.checklistsDone}</span>
          </div>
          <groupshowprogress--ml-linear-progress size="xs" label=${this.msg.checklists} .value=${progressValue(this.progressoChecklist)}></groupshowprogress--ml-linear-progress>
        </div>
        <details class="mt-4 border-t border-[var(--border-subtle,currentColor)]">
          <summary class="flex min-h-[44px] cursor-pointer items-center text-sm font-medium text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg.byList}</summary>
          <div class="pb-2">
            <groupviewchart--ml-bar-chart .showValues=${true} .showLegend=${false}>
              <Series name=${this.msg.openTasks}>
                ${this.listas.map(l => html`<Point label=${l.nome} value=${String(l.details.quantidadeTarefasAbertas)} />`)}
              </Series>
              <Empty>${this.msg.noLists}</Empty>
            </groupviewchart--ml-bar-chart>
          </div>
        </details>`;
    }
    return html`
      <section data-organism-id="destaquesEquipe" class="border-t border-[var(--border-subtle,currentColor)] pt-4">
        ${strip}
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-5 bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
        <header class="flex flex-col gap-2">
          <p class="text-xs font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.pageName}</p>
          ${this.renderHeadline()}
        </header>
        ${this.renderLane()}
        ${this.renderStrip()}
      </main>`;
  }
}
