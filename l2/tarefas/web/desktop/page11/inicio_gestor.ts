/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início do gestor',
  atrasadasUma: '1 tarefa atrasada',
  atrasadasVarias: 'tarefas atrasadas',
  venceUma: '1 vence hoje',
  venceVarias: 'vencem hoje',
  headlineConnector: 'e',
  headlineSuffix: 'pedem a sua atenção.',
  headlineSuffixOne: 'pede a sua atenção.',
  goodNews: 'Nada precisa de atenção agora.',
  goodNewsHint: 'Nenhuma tarefa da equipe está atrasada ou vence hoje.',
  headlineLoading: 'Verificando o que precisa de você…',
  laneTitle: 'Tarefas para decidir',
  colTarefa: 'Tarefa',
  colSituacao: 'Situação',
  colPrazo: 'Prazo',
  colAbrir: 'Abrir',
  openHint: 'Abrir ›',
  listaLabel: 'Lista',
  responsavelLabel: 'Responsável',
  prioridadeLabel: 'Prioridade',
  checklistLabel: 'Checklist',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  prioLow: 'Baixa',
  prioMedium: 'Média',
  prioHigh: 'Alta',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  loadMore: 'Ver mais tarefas',
  retry: 'Tentar de novo',
  laneError: 'Não foi possível carregar as tarefas que pedem ação.',
  preconditionError: 'Não foi possível abrir esta tarefa em Tarefas da equipe. Escolha a tarefa de novo.',
  selectionError: 'Esta tarefa não está mais na fila. Atualize a lista e tente de novo.',
  stripError: 'Não foi possível carregar o panorama da equipe.',
  stripTitle: 'Panorama da equipe',
  stripAbertas: 'Tarefas abertas',
  stripVenceHoje: 'Vencem hoje',
  stripAtrasadas: 'Atrasadas',
  stripChecklist: 'Checklists feitos',
  stripPorLista: 'Abertas por lista',
  stripNoLists: 'Nenhuma lista com tarefas abertas.',
  loadingRows: 'Carregando tarefas…',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

const lang = () => document.documentElement.lang || undefined;

function formatNumber(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

function formatDate(value: string) {
  const d = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

@customElement('tarefas--web--desktop--page11--inicio_gestor-102047')
export class TarefasDesktopPage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private prioLabel(p: 'low' | 'medium' | 'high') {
    if (p === 'high') return this.msg['prioHigh'];
    if (p === 'medium') return this.msg['prioMedium'];
    return this.msg['prioLow'];
  }

  private statusLabel(s: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada') {
    switch (s) {
      case 'aFazer': return this.msg['stAFazer'];
      case 'emAndamento': return this.msg['stEmAndamento'];
      case 'emRevisao': return this.msg['stEmRevisao'];
      case 'concluida': return this.msg['stConcluida'];
      default: return this.msg['stCancelada'];
    }
  }

  private renderHeadline() {
    const loading = this.obterPanoramaEquipeStatus === 'loading' || this.obterPanoramaEquipeStatus === 'idle';
    if (loading) {
      return html`<p class="text-xl text-[var(--text-muted,currentColor)]" aria-busy="true">${this.msg['headlineLoading']}</p>`;
    }
    if (this.obterPanoramaEquipeStatus === 'error') return nothing;
    const a = this.totalAtrasadas;
    const h = this.totalVenceHoje;
    if (a <= 0 && h <= 0) {
      return html`<div>
        <p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</p>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHint']}</p>
      </div>`;
    }
    const p1 = a === 1 ? this.msg['atrasadasUma'] : `${formatNumber(a)} ${this.msg['atrasadasVarias']}`;
    const p2 = h === 1 ? this.msg['venceUma'] : `${formatNumber(h)} ${this.msg['venceVarias']}`;
    let text = '';
    if (a > 0 && h > 0) text = `${p1} ${this.msg['headlineConnector']} ${p2}`;
    else if (a > 0) text = p1;
    else text = p2;
    const single = (a > 0 && h > 0) ? false : (a > 0 ? a === 1 : h === 1);
    const suffix = single ? this.msg['headlineSuffixOne'] : this.msg['headlineSuffix'];
    return html`<p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]" aria-live="polite">${text} ${suffix}</p>`;
  }

  private renderLaneError() {
    const err = this.listarTarefasParaAcaoError;
    if (!err) return nothing;
    let text = this.msg['laneError'];
    if (err.code === 'client.preconditionMissing') text = this.msg['preconditionError'];
    else if (err.code === 'client.selectionInvalid') text = this.msg['selectionError'];
    return html`<div role="alert" aria-live="polite" class="mb-3 flex items-center justify-between gap-3 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] px-4 py-3 text-sm text-[var(--status-error-text,currentColor)]">
      <span>${text}</span>
      <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.listarTarefasParaAcao()}>
        <Label>${this.msg['retry']}</Label>
      </grouptriggeraction--ml-button-standard>
    </div>`;
  }

  private renderLane() {
    const items = this.tarefas?.items ?? [];
    const loading = this.listarTarefasParaAcaoStatus === 'loading' && items.length === 0;
    const hasMore = !!this.tarefas?.hasMore;
    const page = this.tarefas?.page ?? 1;
    const moreLoading = this.listarTarefasParaAcaoStatus === 'loading' && items.length > 0;
    return html`
      <section data-organism-id="tarefasParaAcao" class="mt-8" aria-labelledby="lane-title" aria-busy=${loading ? 'true' : 'false'}>
        <h2 id="lane-title" class="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['laneTitle']}</h2>
        ${this.renderLaneError()}
        ${this.listarTarefasParaAcaoStatus === 'error' && items.length === 0 ? nothing : html`
        <div class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewdata--ml-vertical-record-list
            .hoverable=${true}
            .loading=${loading}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const t = items[e.detail.index];
              if (t) this.abrirTarefasEquipe(t.id);
            }}>
            <Columns>
              <Column field="tarefa" header=${this.msg['colTarefa']} />
              <Column field="situacao" header=${this.msg['colSituacao']} width="200px" />
              <Column field="prazo" header=${this.msg['colPrazo']} width="200px" align="right" />
              <Column field="abrir" header=${this.msg['colAbrir']} width="90px" align="right" />
            </Columns>
            <Rows>
              ${items.map(t => html`
                <Row ?selected=${t.id === this.selectedTarefa}>
                  <Cell>
                    <div class="font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</div>
                    <div class="mt-0.5 text-sm text-[var(--text-muted,currentColor)]">
                      ${t.lista.nome} · ${t.membroEquipe.details.identification.name}
                    </div>
                  </Cell>
                  <Cell>
                    <div class="text-sm text-[var(--text-default,currentColor)]">${this.statusLabel(t.status)}</div>
                    <div class="mt-0.5 text-xs text-[var(--text-muted,currentColor)]">
                      ${this.msg['prioridadeLabel']}: ${this.prioLabel(t.prioridade)} · ${this.msg['checklistLabel']} ${t.details.progressoChecklist}
                    </div>
                  </Cell>
                  <Cell>
                    <div class="flex flex-col items-end gap-1">
                      <span class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatDate(t.prazo)}</span>
                      ${t.details.atrasada
                        ? html`<span class="rounded-full bg-[var(--status-error-bg,transparent)] px-2 py-0.5 text-xs font-semibold text-[var(--status-error-text,currentColor)]">${this.msg['atrasada']}</span>`
                        : t.details.venceHoje
                          ? html`<span class="rounded-full bg-[var(--status-warning-bg,transparent)] px-2 py-0.5 text-xs font-semibold text-[var(--status-warning-text,currentColor)]">${this.msg['venceHoje']}</span>`
                          : nothing}
                    </div>
                  </Cell>
                  <Cell>
                    <span class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['openHint']}</span>
                  </Cell>
                </Row>`)}
            </Rows>
            <Loading>
              <div class="animate-pulse space-y-3 p-4" aria-live="polite">
                <div class="h-10 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
                <div class="h-10 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
                <div class="h-10 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
                <span class="sr-only">${this.msg['loadingRows']}</span>
              </div>
            </Loading>
            <Empty>
              <div class="px-4 py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHint']}</div>
            </Empty>
          </groupviewdata--ml-vertical-record-list>
        </div>
        ${hasMore ? html`
          <div class="mt-3 flex justify-center">
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" ?loading=${moreLoading}
              @action=${() => this.listarTarefasParaAcao(page + 1, true)}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>` : nothing}`}
      </section>`;
  }

  private pair(label: string, value: string) {
    return html`<div class="flex items-baseline gap-2">
      <dd class="order-1 text-base font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${value}</dd>
      <dt class="order-2 text-sm text-[var(--text-muted,currentColor)]">${label}</dt>
    </div>`;
  }

  private renderStrip() {
    const st = this.obterPanoramaEquipeStatus;
    return html`
      <section data-organism-id="destaquesEquipe" class="mt-10 border-t border-[var(--border-subtle,currentColor)] pt-5" aria-labelledby="strip-title" aria-busy=${st === 'loading' ? 'true' : 'false'}>
        <h2 id="strip-title" class="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['stripTitle']}</h2>
        ${st === 'error' ? html`
          <div role="alert" aria-live="polite" class="flex items-center gap-3 text-sm text-[var(--text-default,currentColor)]">
            <span>${this.msg['stripError']}</span>
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.obterPanoramaEquipe()}>
              <Label>${this.msg['retry']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`
        : st === 'loading' || st === 'idle' ? html`
          <div class="flex animate-pulse gap-6" aria-live="polite">
            <div class="h-6 w-28 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            <div class="h-6 w-28 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            <div class="h-6 w-28 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
          </div>`
        : html`
          <dl class="flex flex-wrap gap-x-8 gap-y-3">
            ${this.pair(this.msg['stripAbertas'], formatNumber(this.totalAbertas))}
            ${this.pair(this.msg['stripVenceHoje'], formatNumber(this.totalVenceHoje))}
            ${this.pair(this.msg['stripAtrasadas'], formatNumber(this.totalAtrasadas))}
            ${this.pair(this.msg['stripChecklist'], this.progressoChecklist)}
          </dl>
          <div class="mt-4">
            <p class="mb-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg['stripPorLista']}</p>
            ${this.listas.length === 0
              ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['stripNoLists']}</p>`
              : html`<ul class="flex flex-wrap gap-x-8 gap-y-2">
                  ${this.listas.map(l => html`
                    <li class="flex items-baseline gap-2 text-sm">
                      <span class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatNumber(l.details.quantidadeTarefasAbertas)}</span>
                      <span class="text-[var(--text-default,currentColor)]">${l.nome}</span>
                    </li>`)}
                </ul>`}
          </div>`}
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto min-h-full max-w-5xl bg-[var(--page-bg,transparent)] px-8 py-8 text-[var(--text-default,currentColor)]">
        <header class="mb-5">
          <h1 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
        </header>
        ${this.renderHeadline()}
        ${this.renderLane()}
        ${this.renderStrip()}
      </div>`;
  }
}
