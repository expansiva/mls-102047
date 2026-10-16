/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import type { TarefaAcao } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Panorama da equipe',
  headlineBoth: '{a} atrasadas e {h} vencendo hoje esperam sua decisão',
  headlineGeneric: 'Há tarefas da equipe esperando sua decisão',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHint: 'Quando uma tarefa atrasar ou vencer hoje, ela aparece aqui.',
  laneTitle: 'Tarefas para decidir',
  colTarefa: 'Tarefa',
  colSituacao: 'Situação',
  colPrazo: 'Prazo',
  prazoLabel: 'Prazo',
  listaLabel: 'Lista',
  responsavelLabel: 'Responsável',
  checklistLabel: 'Checklist',
  prioridadeLabel: 'Prioridade',
  atrasada: 'Atrasada',
  venceHoje: 'Vence hoje',
  openRow: 'Abrir e decidir ›',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prLow: 'baixa',
  prMedium: 'média',
  prHigh: 'alta',
  loadMore: 'Carregar mais tarefas',
  loadingLane: 'Carregando tarefas…',
  laneErrorTitle: 'Não foi possível carregar as tarefas',
  stripErrorTitle: 'Não foi possível carregar o panorama da equipe',
  retry: 'Tentar novamente',
  preTitle: 'Falta indicar qual tarefa abrir',
  preText: 'A tarefa escolhida não pôde ser identificada. Abra as tarefas da equipe e escolha de lá.',
  stripAbertas: 'abertas',
  stripHoje: 'vencem hoje',
  stripAtrasadas: 'atrasadas',
  stripChecklist: 'checklists feitas',
  stripListas: 'Abertas por lista',
  noListas: 'Nenhuma lista ativa.',
  openBoard: 'Abrir quadro da equipe',
  openListas: 'Ver listas',
  listaOpenAria: 'tarefas abertas',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function formatDate(value: string): string {
  if (!value) return '';
  const d = new Date(value.length <= 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function statusText(m: PageMessageType, s: TarefaAcao['status']): string {
  const map: Record<TarefaAcao['status'], string> = {
    aFazer: m.stAFazer,
    emAndamento: m.stEmAndamento,
    emRevisao: m.stEmRevisao,
    concluida: m.stConcluida,
    cancelada: m.stCancelada,
  };
  return map[s];
}

function priorityText(m: PageMessageType, p: TarefaAcao['prioridade']): string {
  const map: Record<TarefaAcao['prioridade'], string> = { low: m.prLow, medium: m.prMedium, high: m.prHigh };
  return map[p];
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('tarefas--web--desktop--page11--inicio_gestor-102047')
export class TarefasDesktopPage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <div class="mx-auto flex max-w-5xl flex-col gap-8 px-8 py-8">
          <header class="flex flex-col gap-2">
            <h1 class="text-sm font-medium uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
            ${this.renderHeadline()}
          </header>
          ${this.renderPreconditionNotice()}
          ${this.renderLane()}
          ${this.renderStrip()}
        </div>
      </div>
    `;
  }

  private renderHeadline() {
    const t = this.tarefas;
    if (!t) {
      if (this.qryTarefasPedemAcaoStatus === 'error') return nothing;
      return html`<div class="h-9 w-2/3 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`;
    }
    if (t.items.length === 0) {
      return html`<div aria-live="polite">
        <p class="text-3xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</p>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHint']}</p>
      </div>`;
    }
    const totais = this.totais;
    const text = totais
      ? this.msg['headlineBoth'].replace('{a}', String(totais.atrasadas)).replace('{h}', String(totais.vencemHoje))
      : this.msg['headlineGeneric'];
    return html`<p class="text-3xl font-semibold text-[var(--text-strong,currentColor)]" aria-live="polite">${text}</p>`;
  }

  private renderPreconditionNotice() {
    const err = this.qryTarefasPedemAcaoError;
    if (!err || err.code !== 'client.preconditionMissing' || this.tarefas) return nothing;
    return html`<div role="alert" class="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-warning-bg,transparent)] p-4 text-[var(--status-warning-text,currentColor)]">
      <div>
        <p class="font-medium">${this.msg['preTitle']}</p>
        <p class="text-sm">${this.msg['preText']}</p>
      </div>
      <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.abrirTarefasEquipe()}>
        <Label>${this.msg['openBoard']}</Label>
      </grouptriggeraction--ml-button-standard>
    </div>`;
  }

  private renderLane() {
    const t = this.tarefas;
    return html`
      <section data-organism-id="tarefasPedemAcao" class="flex flex-col gap-3">
        ${t && t.items.length > 0 ? html`<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['laneTitle']}</h2>` : nothing}
        ${this.renderLaneBody()}
      </section>
    `;
  }

  private renderLaneBody() {
    const t = this.tarefas;
    const err = this.qryTarefasPedemAcaoError;
    if (!t) {
      if (this.qryTarefasPedemAcaoStatus === 'error' && err?.code !== 'client.preconditionMissing') {
        return html`<div role="alert" class="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-4 text-[var(--status-error-text,currentColor)]">
          <div>
            <p class="font-medium">${this.msg['laneErrorTitle']}</p>
            ${err?.message ? html`<p class="text-sm">${err.message}</p>` : nothing}
          </div>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.qryTarefasPedemAcao()}>
            <Label>${this.msg['retry']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
      }
      if (err) return nothing;
      return html`<div class="flex flex-col gap-2" aria-busy="true" aria-label=${this.msg['loadingLane']}>
        ${[0, 1, 2].map(() => html`<div class="h-16 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
    }
    if (t.items.length === 0) return nothing;
    const items = t.items;
    return html`
      <div class="overflow-hidden rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <groupviewdata--ml-vertical-record-list
          .hoverable=${true}
          .loading=${this.qryTarefasPedemAcaoStatus === 'loading' && false}
          @row-click=${(e: CustomEvent<{ index: number }>) => this.agirNaTarefa(items[e.detail.index]?.id ?? null)}>
          <Columns>
            <Column field="tarefa" header=${this.msg['colTarefa']} />
            <Column field="situacao" header=${this.msg['colSituacao']} width="220px" />
            <Column field="prazo" header=${this.msg['colPrazo']} width="190px" align="right" />
          </Columns>
          <Rows>
            ${items.map((item) => this.renderRow(item))}
          </Rows>
        </groupviewdata--ml-vertical-record-list>
      </div>
      ${t.hasMore
        ? html`<div class="flex justify-center">
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="md"
              ?loading=${this.qryTarefasPedemAcaoStatus === 'loading'}
              @action=${() => this.qryTarefasPedemAcao(undefined, true)}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`
        : nothing}
      ${err && err.code !== 'client.preconditionMissing'
        ? html`<p role="alert" class="text-sm text-[var(--status-error-text,currentColor)]">${err.message}</p>`
        : nothing}
    `;
  }

  private renderRow(item: TarefaAcao) {
    const d = item.details.details;
    const factClass = d.atrasada
      ? 'text-[var(--status-error-text,currentColor)]'
      : d.venceHoje
        ? 'text-[var(--status-warning-text,currentColor)]'
        : 'text-[var(--text-default,currentColor)]';
    const flag = d.atrasada ? this.msg['atrasada'] : d.venceHoje ? this.msg['venceHoje'] : '';
    const responsavel = item.membroEquipe?.details?.identification?.details?.identification?.name ?? '';
    return html`
      <Row>
        <Cell>
          <div class="flex min-w-0 flex-col gap-0.5 py-1">
            <span class="truncate font-medium text-[var(--text-strong,currentColor)]">${item.titulo}</span>
            <span class="truncate text-sm text-[var(--text-muted,currentColor)]">
              ${item.lista?.nome ?? ''}${responsavel ? html` · ${responsavel}` : nothing}
            </span>
          </div>
        </Cell>
        <Cell>
          <div class="flex flex-col gap-0.5 py-1 text-sm text-[var(--text-muted,currentColor)]">
            <span>${statusText(this.msg, item.status)} · ${this.msg['prioridadeLabel']} ${priorityText(this.msg, item.prioridade)}</span>
            <span>${this.msg['checklistLabel']} ${d.progressoChecklist}</span>
          </div>
        </Cell>
        <Cell>
          <div class="flex flex-col items-end gap-0.5 py-1 text-right">
            <span class="font-semibold tabular-nums ${factClass}">${formatDate(item.prazo)}</span>
            ${flag ? html`<span class="text-xs font-medium ${factClass}">${flag}</span>` : nothing}
            <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['openRow']}</span>
          </div>
        </Cell>
      </Row>
    `;
  }

  private renderStrip() {
    const totais = this.totais;
    const err = this.qryPanoramaEquipeError;
    return html`
      <section data-organism-id="destaquesEquipe" class="flex flex-col gap-4 border-t border-[var(--border-subtle,currentColor)] pt-6">
        ${err && !totais
          ? html`<div role="alert" class="flex items-center justify-between gap-4 text-sm text-[var(--status-error-text,currentColor)]">
              <span>${this.msg['stripErrorTitle']}</span>
              <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.qryPanoramaEquipe()}>
                <Label>${this.msg['retry']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>`
          : totais
            ? html`<dl class="flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm">
                ${this.pair(String(totais.abertas), this.msg['stripAbertas'])}
                ${this.pair(String(totais.vencemHoje), this.msg['stripHoje'])}
                ${this.pair(String(totais.atrasadas), this.msg['stripAtrasadas'])}
                ${this.pair(totais.progressoChecklist, this.msg['stripChecklist'])}
              </dl>`
            : html`<div class="h-5 w-1/2 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]" aria-busy="true"></div>`}
        ${this.listas.length > 0
          ? html`<div class="flex flex-col gap-2">
              <p class="text-xs uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg['stripListas']}</p>
              <ul class="flex flex-wrap gap-2">
                ${this.listas.map((l) => html`
                  <li>
                    <button type="button"
                      class="min-h-[32px] rounded-full border border-[var(--border-subtle,currentColor)] px-3 text-sm text-[var(--text-default,currentColor)] hover:bg-[var(--surface-alt-bg,transparent)] ${focusRing}"
                      aria-label="${l.nome}: ${l.details.details.quantidadeTarefasAbertas} ${this.msg['listaOpenAria']}"
                      @click=${() => this.abrirTarefasEquipe(l.id)}>
                      ${l.nome} <span class="tabular-nums text-[var(--text-muted,currentColor)]">${l.details.details.quantidadeTarefasAbertas}</span>
                    </button>
                  </li>`)}
              </ul>
            </div>`
          : totais
            ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['noListas']}</p>`
            : nothing}
        <div class="flex flex-wrap gap-6 text-sm">
          <button type="button" class="text-[var(--link-text,currentColor)] underline underline-offset-2 ${focusRing} rounded" @click=${() => this.abrirTarefasEquipe()}>${this.msg['openBoard']}</button>
          <button type="button" class="text-[var(--link-text,currentColor)] underline underline-offset-2 ${focusRing} rounded" @click=${() => this.abrirListas()}>${this.msg['openListas']}</button>
        </div>
      </section>
    `;
  }

  private pair(value: string, label: string) {
    return html`<div class="flex items-baseline gap-1.5">
      <dd class="order-1 font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${value}</dd>
      <dt class="order-2 text-[var(--text-muted,currentColor)]">${label}</dt>
    </div>`;
  }
}
