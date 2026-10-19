/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import type { TarefaAcao } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início do gestor',
  headlineLoading: 'Conferindo a equipe…',
  headlineAttention: 'Precisam de você agora',
  headlineLate: 'atrasadas',
  headlineToday: 'vencem hoje',
  goodNews: 'Nada precisa de atenção agora.',
  goodNewsHint: 'Quando algo atrasar ou vencer hoje, aparece aqui.',
  queueLabel: 'Tarefas que podem pedir sua ação',
  colTask: 'Tarefa',
  colDeadline: 'Prazo',
  badgeLate: 'Atrasada',
  badgeToday: 'Vence hoje',
  checklist: 'Checklist',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  emptyQueue: 'Nenhuma tarefa na fila.',
  loadMore: 'Ver mais tarefas',
  retry: 'Tentar de novo',
  queueError: 'Não foi possível carregar as tarefas da equipe.',
  overviewError: 'Não foi possível carregar o panorama da equipe.',
  preconditionTitle: 'Falta indicar o que abrir',
  preconditionText: 'Esta tela foi aberta sem a tarefa ou a equipe que ela precisa. Volte para a tela anterior e tente de novo.',
  back: 'Voltar',
  stripLabel: 'Panorama da equipe',
  stripOpen: 'abertas',
  stripToday: 'vencem hoje',
  stripLate: 'atrasadas',
  stripChecklist: 'checklists feitas',
  byList: 'Tarefas abertas por lista',
  byListEmpty: 'Nenhuma lista com tarefas abertas.',
  openTask: 'Abrir tarefa',
  chevron: '›',
  dash: '—',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

function lang() {
  return document.documentElement.lang || undefined;
}

function formatPrazo(value: string) {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + 'T00:00:00') : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short' }).format(d);
}

function formatNumber(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

@customElement('tarefas--web--mobile--page11--inicio_gestor-102047')
export class TarefasMobilePage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(s: TarefaAcao['status']) {
    switch (s) {
      case 'aFazer': return this.msg['stAFazer'];
      case 'emAndamento': return this.msg['stEmAndamento'];
      case 'emRevisao': return this.msg['stEmRevisao'];
      case 'concluida': return this.msg['stConcluida'];
      default: return this.msg['stCancelada'];
    }
  }

  private retryAll() {
    this.obterPanoramaEquipe();
    this.listarTarefasParaAcao();
  }

  private renderHeadline() {
    if (this.pageStatus === 'idle' || this.pageStatus === 'loading') {
      return html`<div class="h-16 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]" aria-busy="true" aria-label=${this.msg['headlineLoading']}></div>`;
    }
    if (this.pageStatus === 'empty') {
      return html`<div>
        <h2 class="text-xl font-semibold leading-snug text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</h2>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHint']}</p>
      </div>`;
    }
    if (this.obterPanoramaEquipeStatus === 'success') {
      return html`<div>
        <h2 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['headlineAttention']}</h2>
        <p class="mt-1 text-2xl font-semibold leading-snug text-[var(--text-strong,currentColor)]">
          <span class="tabular-nums">${formatNumber(this.totalAtrasadas)}</span> ${this.msg['headlineLate']}
          <span class="text-[var(--text-muted,currentColor)]">·</span>
          <span class="tabular-nums">${formatNumber(this.totalVenceHoje)}</span> ${this.msg['headlineToday']}
        </p>
      </div>`;
    }
    return nothing;
  }

  private renderBadge(t: TarefaAcao) {
    if (t.details.atrasada) {
      return html`<span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${this.msg['badgeLate']}</span>`;
    }
    if (t.details.venceHoje) {
      return html`<span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['badgeToday']}</span>`;
    }
    return nothing;
  }

  private renderQueue() {
    const err = this.listarTarefasParaAcaoError;
    if (err && err.code === 'client.preconditionMissing') {
      return html`<div role="alert" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['preconditionTitle']}</h2>
        <p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${this.msg['preconditionText']}</p>
        <div class="mt-3">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => history.back()}>
            <Label>${this.msg['back']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
    }
    const items = this.tarefas ? this.tarefas.items : [];
    const loading = this.listarTarefasParaAcaoStatus === 'loading' || this.listarTarefasParaAcaoStatus === 'idle';
    const failed = this.listarTarefasParaAcaoStatus === 'error';
    if (failed) {
      return html`<div role="alert" aria-live="polite" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <p class="text-sm text-[var(--status-error-text,currentColor)]">${this.msg['queueError']}</p>
        ${err ? html`<p class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${err.message}</p>` : nothing}
        <div class="mt-3">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.listarTarefasParaAcao()}>
            <Label>${this.msg['retry']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
    }
    return html`<div aria-label=${this.msg['queueLabel']}>
      <div class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <groupviewdata--ml-vertical-record-list
          .hoverable=${true}
          .loading=${loading}
          @row-click=${(e: CustomEvent<{ index: number }>) => {
            const t = items[e.detail.index];
            if (t) this.abrirTarefasEquipe(t.id);
          }}
        >
          <Columns>
            <Column field="tarefa" header=${this.msg['colTask']} />
            <Column field="prazo" header=${this.msg['colDeadline']} align="right" width="116px" />
          </Columns>
          <Rows>
            ${items.map((t) => html`
              <Row ?selected=${t.id === this.selectedTarefa}>
                <Cell>
                  <div class="flex min-h-[44px] flex-col justify-center py-1" aria-label=${this.msg['openTask']}>
                    <span class="text-base font-medium leading-snug text-[var(--text-strong,currentColor)]">${t.titulo}</span>
                    <span class="mt-0.5 text-xs leading-snug text-[var(--text-muted,currentColor)]">
                      ${t.lista.nome} · ${t.membroEquipe.details.identification.name}
                    </span>
                    <span class="text-xs leading-snug text-[var(--text-muted,currentColor)]">
                      ${this.statusLabel(t.status)} · ${this.msg['checklist']} ${t.details.progressoChecklist}
                    </span>
                  </div>
                </Cell>
                <Cell>
                  <div class="flex min-h-[44px] flex-col items-end justify-center py-1 text-right">
                    <span class="whitespace-nowrap text-base font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatPrazo(t.prazo)} <span aria-hidden="true" class="text-[var(--text-muted,currentColor)]">${this.msg['chevron']}</span></span>
                    ${this.renderBadge(t)}
                  </div>
                </Cell>
              </Row>`)}
          </Rows>
          <Empty>
            <div class="px-4 py-6 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyQueue']}</div>
          </Empty>
          <Loading>
            <div class="space-y-3 p-4" aria-busy="true">
              <div class="h-12 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
              <div class="h-12 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
              <div class="h-12 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            </div>
          </Loading>
        </groupviewdata--ml-vertical-record-list>
      </div>
      ${this.tarefas && this.tarefas.hasMore
        ? html`<div class="mt-3">
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="lg"
              data-class="w-full"
              ?loading=${this.listarTarefasParaAcaoStatus === 'loading'}
              @action=${() => this.listarTarefasParaAcao(this.tarefas.page + 1, true)}
            >
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`
        : nothing}
    </div>`;
  }

  private pair(value: string, label: string) {
    return html`<div class="flex min-h-[44px] flex-col justify-center">
      <dd class="order-1 text-lg font-semibold tabular-nums text-[var(--text-default,currentColor)]">${value}</dd>
      <dt class="order-2 text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
    </div>`;
  }

  private renderStrip() {
    const status = this.obterPanoramaEquipeStatus;
    if (status === 'error') {
      const err = this.obterPanoramaEquipeError;
      return html`<div role="alert" aria-live="polite">
        <p class="text-sm text-[var(--status-error-text,currentColor)]">${this.msg['overviewError']}</p>
        ${err ? html`<p class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${err.message}</p>` : nothing}
        <div class="mt-3">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.obterPanoramaEquipe()}>
            <Label>${this.msg['retry']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
    }
    if (status === 'idle' || status === 'loading') {
      return html`<div class="h-12 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`;
    }
    return html`
      <dl class="flex flex-wrap gap-x-6 gap-y-1">
        ${this.pair(formatNumber(this.totalAbertas), this.msg['stripOpen'])}
        ${this.pair(formatNumber(this.totalVenceHoje), this.msg['stripToday'])}
        ${this.pair(formatNumber(this.totalAtrasadas), this.msg['stripLate'])}
        ${this.pair(this.progressoChecklist || this.msg['dash'], this.msg['stripChecklist'])}
      </dl>
      <details class="mt-2 border-t border-[var(--border-subtle,currentColor)]">
        <summary class="flex min-h-[44px] cursor-pointer items-center text-sm text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['byList']}</summary>
        ${this.listas.length
          ? html`<ul class="pb-2">
              ${this.listas.map((l) => html`
                <li class="flex min-h-[44px] items-center justify-between gap-3 border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
                  <span class="text-sm text-[var(--text-default,currentColor)]">${l.nome}</span>
                  <span class="text-sm font-medium tabular-nums text-[var(--text-default,currentColor)]">${formatNumber(l.details.quantidadeTarefasAbertas)}</span>
                </li>`)}
            </ul>`
          : html`<p class="pb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg['byListEmpty']}</p>`}
      </details>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="mx-auto min-h-screen w-full max-w-[430px] bg-[var(--page-bg,transparent)] px-4 pb-10 pt-4 text-[var(--text-default,currentColor)]">
        <h1 class="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>

        <section data-organism-id="tarefasParaAcao" class="space-y-4" aria-live="polite">
          ${this.renderHeadline()}
          ${this.renderQueue()}
        </section>

        <section data-organism-id="destaquesEquipe" class="mt-8 border-t border-[var(--border-subtle,currentColor)] pt-3" aria-label=${this.msg['stripLabel']}>
          <p class="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['stripLabel']}</p>
          ${this.renderStrip()}
        </section>
      </main>
    `;
  }
}
