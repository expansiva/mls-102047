/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import type { TarefaAcao } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewchart/ml-bar-chart.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Visão do gestor',
  refresh: 'Atualizar painel',
  headlineLate: '{n} atrasadas na equipe',
  headlineLateOne: '{n} atrasada na equipe',
  headlineToday: '{n} vencem hoje',
  headlineTodayOne: '{n} vence hoje',
  headlineJoin: ' e ',
  headlineTail: ' — veja abaixo o que pede sua decisão.',
  headlineLeadOnly: 'Há tarefas da equipe pedindo sua atenção: ',
  goodNews: 'Nada precisa de atenção agora.',
  goodNewsHint: 'Nenhuma tarefa da equipe está atrasada ou vence hoje.',
  laneTitle: 'Tarefas que pedem sua decisão',
  colTask: 'Tarefa',
  colPriority: 'Prioridade',
  colDeadline: 'Prazo',
  colStatus: 'Situação',
  colAction: 'Ação',
  act: 'Tratar na equipe',
  flagLate: 'Atrasada',
  flagToday: 'Vence hoje',
  loadMore: 'Ver mais tarefas',
  prioLow: 'Baixa',
  prioMedium: 'Média',
  prioHigh: 'Alta',
  stTodo: 'A fazer',
  stDoing: 'Em andamento',
  stReview: 'Em revisão',
  stDone: 'Concluída',
  stCancelled: 'Cancelada',
  laneError: 'Não foi possível carregar as tarefas que pedem sua decisão.',
  laneMissing: 'Escolha uma tarefa da fila para abrir em Tarefas da equipe.',
  retry: 'Tentar novamente',
  stripError: 'Não foi possível carregar os totais da equipe.',
  stripOpen: 'Tarefas abertas',
  stripToday: 'Vencem hoje',
  stripLate: 'Atrasadas',
  stripChecklist: 'Itens de checklist feitos',
  byListSummary: 'Tarefas abertas em cada lista',
  byListEmpty: 'Nenhuma lista com tarefas abertas.',
  stripAria: 'Resumo da equipe',
  loading: 'Carregando',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

function fmt(template: string, n: number): string {
  return template.replace('{n}', new Intl.NumberFormat(document.documentElement.lang || undefined).format(n));
}

function fmtDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

@customElement('tarefas--web--desktop--page11--inicio_gestor-102047')
export class TarefasDesktopPage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: TarefaAcao['status']) {
    const map: Record<TarefaAcao['status'], string> = {
      aFazer: this.msg.stTodo,
      emAndamento: this.msg.stDoing,
      emRevisao: this.msg.stReview,
      concluida: this.msg.stDone,
      cancelada: this.msg.stCancelled,
    };
    return map[s];
  }

  private prioLabel(p: TarefaAcao['prioridade']) {
    const map: Record<TarefaAcao['prioridade'], string> = {
      low: this.msg.prioLow,
      medium: this.msg.prioMedium,
      high: this.msg.prioHigh,
    };
    return map[p];
  }

  private refreshAll() {
    void this.obterPanoramaEquipe();
    void this.listarTarefasParaAcao(1);
  }

  private renderHeadline() {
    if (this.listarTarefasParaAcaoStatus === 'loading' && this.tarefas.items.length === 0) {
      return html`<div class="h-8 w-2/3 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`;
    }
    if (this.listarTarefasParaAcaoStatus === 'error' && this.tarefas.items.length === 0) return nothing;
    if (this.tarefas.items.length === 0) {
      return html`<div>
        <p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.goodNews}</p>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.goodNewsHint}</p>
      </div>`;
    }
    const late = this.totalAtrasadas;
    const today = this.totalVenceHoje;
    const lateText = fmt(late === 1 ? this.msg.headlineLateOne : this.msg.headlineLate, late);
    const todayText = fmt(today === 1 ? this.msg.headlineTodayOne : this.msg.headlineToday, today);
    return html`<p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">
      ${lateText}${this.msg.headlineJoin}${todayText}${this.msg.headlineTail}
    </p>`;
  }

  private renderRow(t: TarefaAcao) {
    const flagged = t.details.atrasada || t.details.venceHoje;
    const deadlineCls = t.details.atrasada
      ? 'text-[var(--status-error-text,currentColor)] font-semibold'
      : t.details.venceHoje
        ? 'text-[var(--status-warning-text,currentColor)] font-semibold'
        : 'text-[var(--text-default,currentColor)]';
    const flagCls = t.details.atrasada
      ? 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'
      : 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    return html`
      <Row ?selected=${t.id === this.selectedTarefa}>
        <Cell>
          <div class="flex flex-col gap-0.5 py-1">
            <span class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
            <span class="text-sm text-[var(--text-muted,currentColor)]">
              ${t.lista?.nome} · ${t.membroEquipe?.details?.identification?.name}
            </span>
          </div>
        </Cell>
        <Cell><span class="text-sm text-[var(--text-default,currentColor)]">${this.prioLabel(t.prioridade)}</span></Cell>
        <Cell>
          <div class="flex flex-col items-end gap-1 tabular-nums">
            <span class="${deadlineCls}">${fmtDate(t.prazo)}</span>
            ${flagged
              ? html`<span class="rounded-full px-2 py-0.5 text-xs font-medium ${flagCls}">
                  ${t.details.atrasada ? this.msg.flagLate : this.msg.flagToday}
                </span>`
              : nothing}
          </div>
        </Cell>
        <Cell><span class="text-sm text-[var(--text-muted,currentColor)]">${this.statusLabel(t.status)}</span></Cell>
        <Cell>
          <div class="flex justify-end" @click=${(e: Event) => e.stopPropagation()}>
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="sm"
              @action=${() => this.abrirTarefasEquipe(t.id)}
            >
              <Label>${this.msg.act}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </Cell>
      </Row>
    `;
  }

  private renderLane() {
    const status = this.listarTarefasParaAcaoStatus;
    const items = this.tarefas.items;
    const err = this.listarTarefasParaAcaoError;
    const missing = err?.code === 'client.preconditionMissing';

    return html`
      <section data-organism-id="tarefasParaAcao" class="flex flex-col gap-3" aria-busy=${status === 'loading' ? 'true' : 'false'}>
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.laneTitle}</h2>
        <div aria-live="polite">
          ${missing
            ? html`<p class="rounded-md border border-[var(--border-default,currentColor)] px-4 py-3 text-sm text-[var(--text-default,currentColor)]">${this.msg.laneMissing}</p>`
            : nothing}
        </div>
        ${status === 'error' && items.length === 0 && !missing
          ? html`<div class="flex items-center justify-between gap-4 rounded-md bg-[var(--status-error-bg,transparent)] px-4 py-3" role="alert">
              <span class="text-sm text-[var(--status-error-text,currentColor)]">${this.msg.laneError}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => void this.listarTarefasParaAcao(1)}>
                <Label>${this.msg.retry}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : status === 'loading' && items.length === 0
            ? html`<div class="flex flex-col gap-2" aria-label=${this.msg.loading}>
                ${[0, 1, 2].map(() => html`<div class="h-14 animate-pulse rounded-md bg-[var(--surface-alt-bg,transparent)]"></div>`)}
              </div>`
            : items.length === 0
              ? nothing
              : html`
                  <div class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
                    <groupviewdata--ml-vertical-record-list
                      .hoverable=${true}
                      @row-click=${(e: CustomEvent<{ index: number }>) => {
                        const row = this.tarefas.items[e.detail.index];
                        if (row) this.abrirTarefasEquipe(row.id);
                      }}
                    >
                      <Columns>
                        <Column field="titulo" header=${this.msg.colTask} />
                        <Column field="prioridade" header=${this.msg.colPriority} width="110px" />
                        <Column field="prazo" header=${this.msg.colDeadline} width="150px" align="right" />
                        <Column field="status" header=${this.msg.colStatus} width="140px" />
                        <Column field="acao" header=${this.msg.colAction} width="170px" align="right" />
                      </Columns>
                      <Rows>${items.map((t) => this.renderRow(t))}</Rows>
                    </groupviewdata--ml-vertical-record-list>
                  </div>
                  ${this.tarefas.hasMore
                    ? html`<div class="flex justify-center">
                        <grouptriggeraction--ml-button-standard
                          data-variant="ghost"
                          size="md"
                          ?loading=${status === 'loading'}
                          @action=${() => void this.listarTarefasParaAcao(this.tarefas.page + 1, true)}
                        >
                          <Label>${this.msg.loadMore}</Label>
                        </grouptriggeraction--ml-button-standard>
                      </div>`
                    : nothing}
                `}
      </section>
    `;
  }

  private pair(value: string | number, label: string) {
    return html`
      <div class="flex items-baseline gap-2">
        <dd class="order-first text-lg font-semibold tabular-nums text-[var(--text-default,currentColor)]">${value}</dd>
        <dt class="text-sm text-[var(--text-muted,currentColor)]">${label}</dt>
      </div>
    `;
  }

  private renderStrip() {
    const status = this.obterPanoramaEquipeStatus;
    const nf = new Intl.NumberFormat(document.documentElement.lang || undefined);
    return html`
      <section data-organism-id="destaquesEquipe" class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-5" aria-busy=${status === 'loading' ? 'true' : 'false'}>
        ${status === 'error'
          ? html`<div class="flex items-center justify-between gap-4 rounded-md bg-[var(--status-error-bg,transparent)] px-4 py-3" role="alert">
              <span class="text-sm text-[var(--status-error-text,currentColor)]">${this.msg.stripError}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => void this.obterPanoramaEquipe()}>
                <Label>${this.msg.retry}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : status === 'loading' && this.listas.length === 0
            ? html`<div class="h-8 w-3/4 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-label=${this.msg.loading}></div>`
            : html`
                <dl class="flex flex-wrap gap-x-10 gap-y-2" aria-label=${this.msg.stripAria}>
                  ${this.pair(nf.format(this.totalAbertas), this.msg.stripOpen)}
                  ${this.pair(nf.format(this.totalVenceHoje), this.msg.stripToday)}
                  ${this.pair(nf.format(this.totalAtrasadas), this.msg.stripLate)}
                  ${this.pair(this.progressoChecklist || '—', this.msg.stripChecklist)}
                </dl>
                <details class="group">
                  <summary class="inline-flex min-h-[36px] cursor-pointer items-center text-sm text-[var(--text-muted,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">
                    ${this.msg.byListSummary}
                  </summary>
                  <div class="mt-2 max-w-2xl">
                    <groupviewchart--ml-bar-chart show-values="true" .showLegend=${false}>
                      ${this.listas.map(
                        (l) => html`<Point label=${l.nome} value=${String(l.details.quantidadeTarefasAbertas)}></Point>`,
                      )}
                      <Empty><span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.byListEmpty}</span></Empty>
                    </groupviewchart--ml-bar-chart>
                  </div>
                </details>
              `}
      </section>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <div class="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
          <header class="flex items-center justify-between gap-4">
            <h1 class="text-sm font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.pageTitle}</h1>
            <grouptriggeraction--ml-button-standard data-variant="ghost" size="sm" @action=${() => this.refreshAll()}>
              <Label>${this.msg.refresh}</Label>
            </grouptriggeraction--ml-button-standard>
          </header>
          <div aria-live="polite">${this.renderHeadline()}</div>
          ${this.renderLane()} ${this.renderStrip()}
        </div>
      </main>
    `;
  }
}
