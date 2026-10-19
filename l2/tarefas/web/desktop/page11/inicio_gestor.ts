/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import type { TarefaAcao } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início do gestor',
  atrasadasUma: '1 tarefa atrasada',
  atrasadasVarias: '{n} tarefas atrasadas',
  venceUma: '1 vence hoje',
  venceVarias: '{n} vencem hoje',
  headlineJoin: ' e ',
  headlineSuffix: ' na equipe',
  headlineGeneric: 'Há tarefas esperando a sua decisão',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHelper: 'Nenhuma tarefa da equipe está atrasada ou vence hoje.',
  laneTitle: 'Tarefas para decidir',
  laneHelper: 'As atrasadas vêm primeiro. Abra uma tarefa para trocar o responsável ou cancelar.',
  colTarefa: 'Tarefa',
  colContexto: 'Lista e responsável',
  colPrioridade: 'Prioridade',
  colSituacao: 'Situação',
  colPrazo: 'Prazo',
  prazoAtrasada: 'Atrasada',
  prazoVenceHoje: 'Vence hoje',
  checklistLabel: 'Checklist',
  openAction: 'Tratar',
  loadMore: 'Carregar mais tarefas',
  retry: 'Tentar de novo',
  laneErrorTitle: 'Não foi possível carregar as tarefas para decidir',
  stripErrorTitle: 'Não foi possível carregar o resumo da equipe',
  preconditionTitle: 'Falta indicar qual tarefa abrir',
  preconditionText: 'Escolha uma tarefa da fila para continuar em Tarefas da equipe.',
  stripLabel: 'Resumo da equipe',
  stripAbertas: 'Abertas na equipe',
  stripChecklists: 'Checklists feitas',
  stripPorLista: 'Abertas por lista',
  stripNoLists: 'Nenhuma lista com tarefas abertas',
  loadingLane: 'Carregando tarefas…',
  statusAFazer: 'A fazer',
  statusEmAndamento: 'Em andamento',
  statusEmRevisao: 'Em revisão',
  statusConcluida: 'Concluída',
  statusCancelada: 'Cancelada',
  prioLow: 'Baixa',
  prioMedium: 'Média',
  prioHigh: 'Alta',
  sep: ' · ',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

function fill(text: string, n: number): string {
  return text.replace('{n}', new Intl.NumberFormat(document.documentElement.lang || undefined).format(n));
}

function formatPrazo(prazo: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(prazo) ? new Date(prazo + 'T00:00:00') : new Date(prazo);
  if (Number.isNaN(d.getTime())) return prazo;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { day: '2-digit', month: 'short' }).format(d);
}

@customElement('tarefas--web--desktop--page11--inicio_gestor-102047')
export class TarefasDesktopPage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: TarefaAcao['status']) {
    const m = this.msg;
    const map: Record<TarefaAcao['status'], string> = {
      aFazer: m.statusAFazer,
      emAndamento: m.statusEmAndamento,
      emRevisao: m.statusEmRevisao,
      concluida: m.statusConcluida,
      cancelada: m.statusCancelada,
    };
    return map[s];
  }

  private prioLabel(p: TarefaAcao['prioridade']) {
    const m = this.msg;
    const map: Record<TarefaAcao['prioridade'], string> = { low: m.prioLow, medium: m.prioMedium, high: m.prioHigh };
    return map[p];
  }

  private headline() {
    const m = this.msg;
    const parts: string[] = [];
    if (this.totalAtrasadas > 0) parts.push(this.totalAtrasadas === 1 ? m.atrasadasUma : fill(m.atrasadasVarias, this.totalAtrasadas));
    if (this.totalVenceHoje > 0) parts.push(this.totalVenceHoje === 1 ? m.venceUma : fill(m.venceVarias, this.totalVenceHoje));
    if (parts.length === 0) return m.headlineGeneric;
    return parts.join(m.headlineJoin) + m.headlineSuffix;
  }

  private renderSkeletonRows() {
    return html`<div class="flex flex-col gap-3" aria-busy="true" aria-label=${this.msg['loadingLane']}>
      ${[0, 1, 2, 3].map(() => html`<div class="h-14 animate-pulse rounded-md bg-[var(--surface-alt-bg,transparent)]"></div>`)}
    </div>`;
  }

  private renderError(title: string, onRetry: () => void) {
    return html`<div role="alert" aria-live="polite" class="flex items-center justify-between gap-4 rounded-md border border-[var(--status-error-text,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
      <p class="text-[var(--text-default,currentColor)]">${title}</p>
      <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${onRetry}>
        <Label>${this.msg['retry']}</Label>
      </grouptriggeraction--ml-button-standard>
    </div>`;
  }

  private renderPrazo(t: TarefaAcao) {
    const m = this.msg;
    const tone = t.details.atrasada
      ? 'text-[var(--status-error-text,currentColor)] font-semibold'
      : t.details.venceHoje
        ? 'text-[var(--status-warning-text,currentColor)] font-semibold'
        : 'text-[var(--text-muted,currentColor)]';
    const tag = t.details.atrasada ? m.prazoAtrasada : t.details.venceHoje ? m.prazoVenceHoje : '';
    return html`<div class="text-right tabular-nums ${tone}">
      <div>${formatPrazo(t.prazo)}</div>
      ${tag ? html`<div class="text-xs">${tag}</div>` : nothing}
    </div>`;
  }

  private renderLane() {
    const m = this.msg;
    const loading = this.listarTarefasParaAcaoStatus === 'loading' || this.listarTarefasParaAcaoStatus === 'idle';
    const err = this.listarTarefasParaAcaoError;
    const page = this.tarefas;
    const items = page ? page.items : [];

    let body;
    if (err && err.code === 'client.preconditionMissing') {
      body = html`<div role="alert" aria-live="polite" class="rounded-md border border-[var(--border-default,currentColor)] p-4">
        <p class="font-medium text-[var(--text-strong,currentColor)]">${m.preconditionTitle}</p>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${m.preconditionText}</p>
      </div>`;
    } else if (err && !page) {
      body = this.renderError(m.laneErrorTitle, () => { void this.listarTarefasParaAcao(1); });
    } else if (loading && !page) {
      body = this.renderSkeletonRows();
    } else if (page && items.length === 0) {
      body = html`<div class="rounded-md border border-[var(--status-success-text,currentColor)] bg-[var(--status-success-bg,transparent)] p-6" aria-live="polite">
        <p class="text-lg font-medium text-[var(--status-success-text,currentColor)]">${m.goodNews}</p>
        <p class="text-sm text-[var(--text-default,currentColor)]">${m.goodNewsHelper}</p>
      </div>`;
    } else if (page) {
      body = html`
        <groupviewdata--ml-vertical-record-list
          .hoverable=${true}
          .loading=${loading}
          @row-click=${(e: CustomEvent<{ index: number }>) => {
            const t = items[e.detail.index];
            if (t) this.abrirTarefasEquipe(t.id);
          }}>
          <Columns>
            <Column field="titulo" header=${m.colTarefa} />
            <Column field="contexto" header=${m.colContexto} />
            <Column field="prioridade" header=${m.colPrioridade} width="110px" />
            <Column field="situacao" header=${m.colSituacao} width="140px" />
            <Column field="prazo" header=${m.colPrazo} width="120px" align="right" />
            <Column field="acao" header=${m.openAction} width="80px" align="right" />
          </Columns>
          <Rows>
            ${items.map((t) => html`
              <Row ?selected=${t.id === this.selectedTarefa}>
                <Cell>
                  <div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
                  <div class="text-xs text-[var(--text-muted,currentColor)]">${m.checklistLabel}${m.sep}${t.details.progressoChecklist}</div>
                </Cell>
                <Cell><span class="text-[var(--text-default,currentColor)]">${t.lista.nome}${m.sep}${t.membroEquipe.details.identification.name}</span></Cell>
                <Cell><span class="text-[var(--text-muted,currentColor)]">${this.prioLabel(t.prioridade)}</span></Cell>
                <Cell><span class="text-[var(--text-muted,currentColor)]">${this.statusLabel(t.status)}</span></Cell>
                <Cell>${this.renderPrazo(t)}</Cell>
                <Cell><span class="text-[var(--link-text,currentColor)] font-medium">${m.openAction} ›</span></Cell>
              </Row>`)}
          </Rows>
          <Loading>${this.renderSkeletonRows()}</Loading>
        </groupviewdata--ml-vertical-record-list>
        ${err ? html`<div class="mt-3">${this.renderError(m.laneErrorTitle, () => { void this.listarTarefasParaAcao(1); })}</div>` : nothing}
        ${page.hasMore ? html`<div class="mt-4 flex justify-center">
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="md"
            ?loading=${this.listarTarefasParaAcaoStatus === 'loading'}
            @action=${() => { void this.listarTarefasParaAcao(page.page + 1, true); }}>
            <Label>${m.loadMore}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>` : nothing}`;
    } else {
      body = nothing;
    }

    return html`<section data-organism-id="tarefasParaAcao" class="flex flex-col gap-3" aria-busy=${loading ? 'true' : 'false'}>
      <div>
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${m.laneTitle}</h2>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${m.laneHelper}</p>
      </div>
      <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-2">${body}</div>
    </section>`;
  }

  private renderStrip() {
    const m = this.msg;
    const nf = new Intl.NumberFormat(document.documentElement.lang || undefined);
    const status = this.obterPanoramaEquipeStatus;
    let body;
    if (this.obterPanoramaEquipeError) {
      body = this.renderError(m.stripErrorTitle, () => { void this.obterPanoramaEquipe(); });
    } else if (status === 'loading' || status === 'idle') {
      body = html`<div class="h-10 w-full animate-pulse rounded-md bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`;
    } else {
      body = html`<dl class="flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm">
        <div class="flex items-baseline gap-2">
          <dd class="font-semibold tabular-nums text-[var(--text-default,currentColor)]">${nf.format(this.totalAbertas)}</dd>
          <dt class="text-[var(--text-muted,currentColor)]">${m.stripAbertas}</dt>
        </div>
        <div class="flex items-baseline gap-2">
          <dd class="font-semibold tabular-nums text-[var(--text-default,currentColor)]">${this.progressoChecklist}</dd>
          <dt class="text-[var(--text-muted,currentColor)]">${m.stripChecklists}</dt>
        </div>
      </dl>
      <div class="mt-3">
        <p class="mb-1 text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${m.stripPorLista}</p>
        ${this.listas.length === 0
          ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${m.stripNoLists}</p>`
          : html`<ul class="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              ${this.listas.map((l) => html`<li class="flex items-baseline gap-2">
                <span class="font-semibold tabular-nums text-[var(--text-default,currentColor)]">${nf.format(l.details.quantidadeTarefasAbertas)}</span>
                <span class="text-[var(--text-muted,currentColor)]">${l.nome}</span>
              </li>`)}
            </ul>`}
      </div>`;
    }
    return html`<section data-organism-id="destaquesEquipe" aria-label=${m.stripLabel} class="border-t border-[var(--border-subtle,currentColor)] pt-4">
      ${body}
    </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    const laneLoaded = this.listarTarefasParaAcaoStatus === 'success' || this.tarefas !== null;
    const noItems = laneLoaded && this.tarefas !== null && this.tarefas.items.length === 0;
    const panoramaLoaded = this.obterPanoramaEquipeStatus === 'success';

    let headline;
    if (noItems && !this.listarTarefasParaAcaoError) headline = m.goodNews;
    else if (panoramaLoaded) headline = this.headline();
    else headline = '';

    return html`
      <div class="mx-auto flex max-w-6xl flex-col gap-6 bg-[var(--page-bg,transparent)] p-6 text-[var(--text-default,currentColor)]">
        <header class="flex flex-col gap-1">
          <p class="text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${m.pageTitle}</p>
          <div aria-live="polite" class="min-h-[2.5rem]">
            ${headline
              ? html`<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${headline}</h1>`
              : html`<div class="h-8 w-80 animate-pulse rounded-md bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`}
          </div>
        </header>
        ${this.renderLane()}
        ${this.renderStrip()}
      </div>`;
  }
}
