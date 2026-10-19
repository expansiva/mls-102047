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
  headlineBoth: '{a} atrasadas e {h} vencem hoje',
  headlineLate: '{a} atrasadas',
  headlineToday: '{h} vencem hoje',
  headlineLoading: 'Conferindo a equipe…',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHelper: 'Nenhuma tarefa da equipe está atrasada ou vence hoje.',
  laneTitle: 'Para você decidir',
  lateBadge: 'Atrasada',
  todayBadge: 'Vence hoje',
  dueOn: 'Prazo {d}',
  statusAFazer: 'A fazer',
  statusEmAndamento: 'Em andamento',
  statusEmRevisao: 'Em revisão',
  statusConcluida: 'Concluída',
  statusCancelada: 'Cancelada',
  seeMore: 'Ver as demais tarefas',
  loadMore: 'Carregar mais tarefas',
  retry: 'Tentar de novo',
  laneError: 'Não foi possível carregar as tarefas que pedem ação.',
  stripError: 'Não foi possível carregar os totais da equipe.',
  preconditionMissing: 'Não foi possível abrir a tarefa: falta saber qual tarefa foi escolhida. Toque de novo em uma tarefa da fila.',
  selectionInvalid: 'A tarefa escolhida não está mais na fila. Atualize a lista para ver as tarefas atuais.',
  colTask: 'Tarefa',
  colDue: 'Prazo',
  openTask: 'Abrir {t} em Tarefas da equipe',
  stripLabel: 'Panorama da equipe',
  stripOpen: 'Abertas',
  stripToday: 'Vencem hoje',
  stripLate: 'Atrasadas',
  stripChecklist: 'Itens de checklist feitos',
  byList: 'Tarefas abertas por lista',
  noLists: 'Nenhuma lista com tarefas abertas.',
  unknownOwner: 'Sem responsável',
  loadingList: 'Carregando tarefas…'
};

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const statusKey: Record<TarefaAcao['status'], keyof PageMessageType> = {
  aFazer: 'statusAFazer',
  emAndamento: 'statusEmAndamento',
  emRevisao: 'statusEmRevisao',
  concluida: 'statusConcluida',
  cancelada: 'statusCancelada'
};

const VISIBLE_ROWS = 5;

function fmtDate(value: string): string {
  const lang = document.documentElement.lang || undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang, { day: '2-digit', month: 'short' }).format(d);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat(document.documentElement.lang || undefined).format(n);
}

@customElement('tarefas--web--mobile--page11--inicio_gestor-102047')
export class TarefasMobilePage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private fill(text: string, values: Record<string, string>) {
    return text.replace(/\{(\w+)\}/g, (_m, k: string) => values[k] ?? '');
  }

  private headline() {
    const loading = this.listarTarefasParaAcaoStatus === 'loading' || this.obterPanoramaEquipeStatus === 'loading' || this.pageStatus === 'loading' || this.pageStatus === 'idle';
    if (loading) {
      return html`<div class="h-7 w-3/4 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>
        <span class="sr-only">${this.msg['headlineLoading']}</span>`;
    }
    if (this.listarTarefasParaAcaoStatus === 'success' && this.tarefas && this.tarefas.items.length === 0) {
      return html`<h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</h2>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHelper']}</p>`;
    }
    if (this.obterPanoramaEquipeStatus !== 'success') return nothing;
    const a = fmtNumber(this.totalAtrasadas);
    const h = fmtNumber(this.totalVenceHoje);
    const text = this.totalAtrasadas > 0 && this.totalVenceHoje > 0
      ? this.msg['headlineBoth']
      : this.totalAtrasadas > 0 ? this.msg['headlineLate'] : this.msg['headlineToday'];
    return html`<h2 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.fill(text, { a, h })}</h2>`;
  }

  private errorText() {
    const code = this.listarTarefasParaAcaoError?.code;
    if (code === 'client.preconditionMissing') return this.msg['preconditionMissing'];
    if (code === 'client.selectionInvalid') return this.msg['selectionInvalid'];
    return this.msg['laneError'];
  }

  private retryButton(onAction: () => void) {
    return html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="min-h-11" @action=${onAction}>
      <Label>${this.msg['retry']}</Label>
    </grouptriggeraction--ml-button-standard>`;
  }

  private rowList(items: TarefaAcao[], offset: number) {
    const all = this.tarefas?.items ?? [];
    return html`<groupviewdata--ml-vertical-record-list
      .hoverable=${true}
      @row-click=${(e: CustomEvent<{ index: number }>) => {
        const t = all[offset + e.detail.index];
        if (t) this.abrirTarefasEquipe(t.id);
      }}>
      <Columns>
        <Column field="titulo" header=${this.msg['colTask']} />
        <Column field="prazo" header=${this.msg['colDue']} align="right" />
      </Columns>
      <Rows>
        ${items.map(t => html`
          <Row ?selected=${t.id === this.selectedTarefa}>
            <Cell>
              <div class="flex min-h-11 flex-col justify-center py-1" aria-label=${this.fill(this.msg['openTask'], { t: t.titulo })}>
                <span class="text-base font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
                <span class="text-sm text-[var(--text-muted,currentColor)]">${t.membroEquipe?.details?.identification?.name ?? this.msg['unknownOwner']} · ${t.lista?.nome ?? ''} · ${this.msg[statusKey[t.status]]}</span>
              </div>
            </Cell>
            <Cell>
              <div class="flex min-h-11 flex-col items-end justify-center py-1 whitespace-nowrap">
                <span class="text-sm tabular-nums text-[var(--text-default,currentColor)]">${fmtDate(t.prazo)}</span>
                ${t.details.atrasada
                  ? html`<span class="rounded px-2 py-0.5 text-xs font-semibold bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">${this.msg['lateBadge']}</span>`
                  : t.details.venceHoje
                    ? html`<span class="rounded px-2 py-0.5 text-xs font-semibold bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['todayBadge']}</span>`
                    : nothing}
              </div>
            </Cell>
          </Row>`)}
      </Rows>
    </groupviewdata--ml-vertical-record-list>`;
  }

  private lane() {
    const status = this.listarTarefasParaAcaoStatus;
    const loading = status === 'loading' || status === 'idle';
    let body;
    if (loading && !this.tarefas) {
      body = html`<div class="space-y-2 p-4" aria-busy="true">
        <span class="sr-only">${this.msg['loadingList']}</span>
        ${[0, 1, 2].map(() => html`<div class="h-12 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
    } else if (this.listarTarefasParaAcaoError && !(this.tarefas && this.tarefas.items.length > 0 && this.listarTarefasParaAcaoError.code === 'client.preconditionMissing' && false)) {
      body = html`<div class="space-y-3 p-4" role="alert" aria-live="polite">
        <p class="text-sm text-[var(--text-default,currentColor)]">${this.errorText()}</p>
        ${this.retryButton(() => { void this.listarTarefasParaAcao(); })}
      </div>`;
      if (this.tarefas && this.tarefas.items.length > 0) {
        body = html`${body}${this.laneRows()}`;
      }
    } else if (this.tarefas && this.tarefas.items.length > 0) {
      body = this.laneRows();
    } else {
      body = nothing;
    }
    if (status === 'success' && this.tarefas && this.tarefas.items.length === 0 && !this.listarTarefasParaAcaoError) return nothing;
    return html`<section class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]" aria-label=${this.msg['laneTitle']}>
      <h3 class="px-4 pt-3 pb-1 text-sm font-semibold text-[var(--text-muted,currentColor)]">${this.msg['laneTitle']}</h3>
      ${body}
    </section>`;
  }

  private laneRows() {
    const items = this.tarefas?.items ?? [];
    const first = items.slice(0, VISIBLE_ROWS);
    const rest = items.slice(VISIBLE_ROWS);
    return html`
      ${this.rowList(first, 0)}
      ${rest.length > 0 ? html`
        <details class="border-t border-[var(--border-subtle,currentColor)]">
          <summary class="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['seeMore']}</summary>
          ${this.rowList(rest, VISIBLE_ROWS)}
        </details>` : nothing}
      ${this.tarefas?.hasMore ? html`
        <div class="border-t border-[var(--border-subtle,currentColor)] p-3">
          <grouptriggeraction--ml-button-standard
            data-variant="secondary" size="md" data-class="w-full min-h-11"
            ?loading=${this.listarTarefasParaAcaoStatus === 'loading'}
            @action=${() => { void this.listarTarefasParaAcao((this.tarefas?.page ?? 1) + 1, true); }}>
            <Label>${this.msg['loadMore']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>` : nothing}`;
  }

  private strip() {
    const status = this.obterPanoramaEquipeStatus;
    if (status === 'loading' || status === 'idle') {
      return html`<div class="flex flex-wrap gap-4" aria-busy="true">
        ${[0, 1, 2, 3].map(() => html`<div class="h-10 w-24 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
    }
    if (status === 'error' || this.obterPanoramaEquipeError) {
      return html`<div class="space-y-3" role="alert" aria-live="polite">
        <p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['stripError']}</p>
        ${this.retryButton(() => { void this.obterPanoramaEquipe(); })}
      </div>`;
    }
    const pair = (value: string, label: string) => html`
      <div class="min-w-[40%] flex-1">
        <dd class="text-lg font-semibold tabular-nums text-[var(--text-default,currentColor)]">${value}</dd>
        <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
      </div>`;
    return html`
      <dl class="flex flex-wrap gap-x-4 gap-y-3" aria-label=${this.msg['stripLabel']}>
        ${pair(fmtNumber(this.totalAbertas), this.msg['stripOpen'])}
        ${pair(fmtNumber(this.totalVenceHoje), this.msg['stripToday'])}
        ${pair(fmtNumber(this.totalAtrasadas), this.msg['stripLate'])}
        ${pair(this.progressoChecklist, this.msg['stripChecklist'])}
      </dl>
      <details class="mt-3 border-t border-[var(--border-subtle,currentColor)]">
        <summary class="flex min-h-11 cursor-pointer items-center text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg['byList']}</summary>
        ${this.listas.length === 0
          ? html`<p class="pb-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg['noLists']}</p>`
          : html`<ul class="pb-2">
              ${this.listas.map(l => html`
                <li class="flex min-h-11 items-center justify-between gap-3 border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
                  <span class="text-sm text-[var(--text-default,currentColor)]">${l.nome}</span>
                  <span class="text-sm font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtNumber(l.details.quantidadeTarefasAbertas)}</span>
                </li>`)}
            </ul>`}
      </details>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-5 bg-[var(--page-bg,transparent)] px-4 py-4 text-[var(--text-default,currentColor)]">
        <header>
          <h1 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
        </header>

        <div data-organism-id="tarefasParaAcao" class="flex flex-col gap-4">
          <div aria-live="polite">${this.headline()}</div>
          ${this.lane()}
        </div>

        <div data-organism-id="destaquesEquipe" class="rounded-lg bg-[var(--surface-alt-bg,transparent)] p-4">
          ${this.strip()}
        </div>
      </div>`;
  }
}
