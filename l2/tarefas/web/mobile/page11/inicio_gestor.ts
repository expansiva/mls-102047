/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_gestor.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_gestorShared } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import type { ErrorState, TarefaAcao } from '/_102047_/l2/tarefas/web/shared/inicio_gestor.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Visão da equipe',
  headline: '{atrasadas} atrasadas e {hoje} vencendo hoje na equipe',
  goodNews: 'Nada precisa de atenção agora',
  goodNewsHelp: 'Nenhuma tarefa aberta está atrasada ou vence hoje.',
  laneTitle: 'Tarefas que pedem sua ação',
  laneHint: 'Toque em uma tarefa para trocar o responsável ou cancelar.',
  overdue: 'Atrasada',
  dueToday: 'Vence hoje',
  assignee: 'Responsável',
  deadline: 'Prazo',
  noAssignee: 'Sem responsável',
  statusaFazer: 'A fazer',
  statusemAndamento: 'Em andamento',
  statusemRevisao: 'Em revisão',
  statusconcluida: 'Concluída',
  statuscancelada: 'Cancelada',
  loadMore: 'Ver mais tarefas',
  stripTitle: 'Situação da equipe',
  open: 'Abertas',
  dueTodayLabel: 'Vencem hoje',
  overdueLabel: 'Atrasadas',
  checklists: 'Checklists',
  perListTitle: 'Tarefas abertas por lista',
  perListOpen: 'abertas',
  noLists: 'Nenhuma lista ativa.',
  openTeamTasks: 'Abrir tarefas da equipe',
  openLists: 'Ver listas',
  retry: 'Tentar de novo',
  errorInbox: 'Não foi possível carregar as tarefas que pedem ação.',
  errorOverview: 'Não foi possível carregar os números da equipe.',
  errorPrecondition: 'Esta tela foi aberta sem as informações de que precisa. Volte para as tarefas da equipe e abra a tarefa de lá.',
  loadingTasks: 'Carregando tarefas…',
  loadingStrip: 'Carregando números da equipe…',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

function lang() {
  return document.documentElement.lang || undefined;
}

function fmtNumber(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

function fmtDate(value: string) {
  if (!value) return '';
  const d = new Date(value.length === 10 ? value + 'T00:00:00' : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short' }).format(d);
}

@customElement('tarefas--web--mobile--page11--inicio_gestor-102047')
export class TarefasMobilePage11Inicio_gestorPage extends TarefasInicio_gestorShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: TarefaAcao['status']) {
    const map: Record<TarefaAcao['status'], string> = {
      aFazer: this.msg['statusaFazer'],
      emAndamento: this.msg['statusemAndamento'],
      emRevisao: this.msg['statusemRevisao'],
      concluida: this.msg['statusconcluida'],
      cancelada: this.msg['statuscancelada'],
    };
    return map[status] ?? status;
  }

  private renderError(error: ErrorState, text: string, retry: () => void) {
    const missing = error?.code === 'client.preconditionMissing';
    return html`
      <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4 flex flex-col gap-3" role="alert" aria-live="polite">
        <p class="text-sm text-[var(--text-default,currentColor)]">${missing ? this.msg['errorPrecondition'] : text}</p>
        ${missing
          ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full" @action=${() => this.abrirTarefasEquipe(null)}>
              <Label>${this.msg['openTeamTasks']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full" @action=${retry}>
              <Label>${this.msg['retry']}</Label>
            </grouptriggeraction--ml-button-standard>`}
      </div>`;
  }

  private renderSkeleton(label: string, rows: number) {
    return html`
      <div class="flex flex-col gap-2" aria-busy="true" aria-live="polite">
        <span class="sr-only">${label}</span>
        ${Array.from({ length: rows }).map(() => html`<div class="h-14 rounded-lg animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>`)}
      </div>`;
  }

  private renderHeadline() {
    const t = this.totais;
    if (this.pageStatus === 'empty') {
      return html`
        <div>
          <p class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['goodNews']}</p>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['goodNewsHelp']}</p>
        </div>`;
    }
    if (!t) {
      return html`<div class="h-7 w-3/4 rounded animate-pulse bg-[var(--surface-alt-bg,transparent)]" aria-hidden="true"></div>`;
    }
    const text = this.msg['headline']
      .replace('{atrasadas}', fmtNumber(t.atrasadas))
      .replace('{hoje}', fmtNumber(t.vencemHoje));
    return html`<p class="text-xl font-semibold leading-snug text-[var(--text-strong,currentColor)]">${text}</p>`;
  }

  private renderRow(t: TarefaAcao) {
    const name = t.membroEquipe?.details?.identification?.details?.identification?.name || this.msg['noAssignee'];
    const late = t.details?.details?.atrasada;
    const today = t.details?.details?.venceHoje;
    const factClass = late
      ? 'text-[var(--status-error-text,currentColor)]'
      : today
        ? 'text-[var(--status-warning-text,currentColor)]'
        : 'text-[var(--text-default,currentColor)]';
    return html`
      <li class="border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
        <button type="button"
          class="w-full min-h-[56px] flex items-start justify-between gap-3 px-3 py-3 text-left bg-[var(--surface-bg,transparent)] active:bg-[var(--selected-bg,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
          @click=${() => this.agirNaTarefa(t.id)}>
          <span class="min-w-0 flex-1">
            <span class="block text-base font-medium text-[var(--text-strong,currentColor)] break-words">${t.titulo}</span>
            <span class="block text-sm text-[var(--text-muted,currentColor)] break-words">${name} · ${t.lista?.nome ?? ''}</span>
            <span class="block text-xs text-[var(--text-muted,currentColor)]">${this.statusLabel(t.status)}${t.details?.details?.progressoChecklist ? html` · ${t.details.details.progressoChecklist}` : nothing}</span>
          </span>
          <span class="shrink-0 text-right whitespace-nowrap tabular-nums">
            <span class="block text-sm font-semibold ${factClass}">${fmtDate(t.prazo)}</span>
            ${late
              ? html`<span class="block text-xs font-medium ${factClass}">${this.msg['overdue']}</span>`
              : today
                ? html`<span class="block text-xs font-medium ${factClass}">${this.msg['dueToday']}</span>`
                : nothing}
          </span>
        </button>
      </li>`;
  }

  private renderLane() {
    const loading = this.pageStatus === 'loading' || (this.qryTarefasPedemAcaoStatus === 'loading' && !this.tarefas);
    const items = this.tarefas?.items ?? [];
    let body;
    if (this.qryTarefasPedemAcaoError) {
      body = this.renderError(this.qryTarefasPedemAcaoError, this.msg['errorInbox'], () => { void this.qryTarefasPedemAcao(); });
    } else if (loading && !this.tarefas) {
      body = this.renderSkeleton(this.msg['loadingTasks'], 3);
    } else if (this.pageStatus === 'empty') {
      body = nothing;
    } else {
      body = html`
        <ul class="rounded-lg border border-[var(--border-default,currentColor)] overflow-hidden">
          ${items.map((t) => this.renderRow(t))}
        </ul>
        ${this.tarefas?.hasMore
          ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full mt-3"
              ?loading=${this.qryTarefasPedemAcaoStatus === 'loading'}
              @action=${() => { void this.qryTarefasPedemAcao(undefined, true); }}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}`;
    }
    if (this.pageStatus === 'empty' && !this.qryTarefasPedemAcaoError) return nothing;
    return html`
      <section data-organism-id="tarefasPedemAcao" class="flex flex-col gap-2" aria-busy=${loading ? 'true' : 'false'}>
        <div>
          <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['laneTitle']}</h2>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['laneHint']}</p>
        </div>
        ${body}
      </section>`;
  }

  private renderStrip() {
    const t = this.totais;
    const pair = (label: string, value: string) => html`
      <div class="flex flex-col">
        <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="text-lg font-semibold tabular-nums text-[var(--text-default,currentColor)]">${value}</dd>
      </div>`;
    let strip;
    if (this.qryPanoramaEquipeError) {
      strip = this.renderError(this.qryPanoramaEquipeError, this.msg['errorOverview'], () => { void this.qryPanoramaEquipe(); });
    } else if (!t) {
      strip = this.renderSkeleton(this.msg['loadingStrip'], 1);
    } else {
      strip = html`
        <dl class="grid grid-cols-2 gap-x-4 gap-y-3">
          ${pair(this.msg['open'], fmtNumber(t.abertas))}
          ${pair(this.msg['dueTodayLabel'], fmtNumber(t.vencemHoje))}
          ${pair(this.msg['overdueLabel'], fmtNumber(t.atrasadas))}
          ${pair(this.msg['checklists'], t.progressoChecklist)}
        </dl>`;
    }
    return html`
      <section data-organism-id="destaquesEquipe" class="flex flex-col gap-4 border-t border-[var(--border-subtle,currentColor)] pt-5">
        <div class="flex flex-col gap-2">
          <h2 class="text-sm font-semibold text-[var(--text-muted,currentColor)]">${this.msg['stripTitle']}</h2>
          ${strip}
        </div>
        <div class="flex flex-col gap-1">
          <h3 class="text-sm font-semibold text-[var(--text-muted,currentColor)]">${this.msg['perListTitle']}</h3>
          ${this.listas.length
            ? html`<ul>
                ${this.listas.map((l) => html`
                  <li>
                    <button type="button"
                      class="w-full min-h-[44px] flex items-center justify-between gap-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                      @click=${() => this.abrirTarefasEquipe(l.id)}>
                      <span class="min-w-0 break-words text-sm text-[var(--text-default,currentColor)]">${l.nome}</span>
                      <span class="shrink-0 text-sm tabular-nums text-[var(--text-muted,currentColor)]">${fmtNumber(l.details.details.quantidadeTarefasAbertas)} ${this.msg['perListOpen']}</span>
                    </button>
                  </li>`)}
              </ul>`
            : this.qryPanoramaEquipeStatus === 'success'
              ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['noLists']}</p>`
              : nothing}
        </div>
        <div class="flex flex-col gap-2">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.abrirTarefasEquipe(null)}>
            <Label>${this.msg['openTeamTasks']}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="ghost" size="lg" data-class="w-full" @action=${() => this.abrirListas(null)}>
            <Label>${this.msg['openLists']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </section>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <main class="mx-auto w-full max-w-[430px] min-h-screen flex flex-col gap-5 px-4 py-5 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <header class="flex flex-col gap-3">
          <h1 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
          <div aria-live="polite">${this.renderHeadline()}</div>
        </header>
        ${this.renderLane()}
        ${this.renderStrip()}
      </main>`;
  }
}
