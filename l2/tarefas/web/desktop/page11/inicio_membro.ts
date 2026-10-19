/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { TarefaPendencia, TarefaResumo } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início',
  reload: 'Atualizar',
  headlineYouHave: 'Você tem',
  headlineAnd: 'e',
  lateOne: 'tarefa atrasada',
  lateMany: 'tarefas atrasadas',
  dueTodayOne: 'tarefa que vence hoje',
  dueTodayMany: 'tarefas que vencem hoje',
  headlineCalm: 'Nada atrasado nem vencendo hoje. Veja o que espera por você.',
  headlineGood: 'Nada precisa de atenção agora.',
  goodNewsDetail: 'Sua fila está vazia: nenhuma tarefa para iniciar, revisar ou ajustar.',
  loading: 'Carregando o seu dia…',
  errorTitle: 'Não foi possível carregar o seu início',
  errorMissing: 'Esta página foi aberta sem as informações de que precisa. Volte ao menu do módulo e abra o Início de novo.',
  errorRetry: 'Tentar de novo',
  goToTasks: 'Ir para minhas tarefas',
  laneReturned: 'Devolvidas para ajustar',
  laneReview: 'Entregas para revisar',
  laneSend: 'Em andamento, prontas para a revisão',
  laneStart: 'Aguardando início',
  deadline: 'Prazo',
  createdBy: 'Criada por',
  deliveredBy: 'Entregue por',
  checklist: 'Checklist',
  reasonPrefix: 'Motivo',
  returnedOn: 'devolvida em',
  startTask: 'Iniciar tarefa',
  sendReview: 'Enviar para revisão',
  resendReview: 'Reenviar para revisão',
  adjustTask: 'Ajustar tarefa',
  acceptDelivery: 'Aceitar entrega',
  returnWithReason: 'Devolver com motivo',
  confirmReturn: 'Confirmar devolução',
  cancel: 'Cancelar',
  reasonLabel: 'Motivo da devolução',
  reasonHint: 'O motivo fica registrado na tarefa e o responsável o lê ao retomar.',
  reasonPlaceholder: 'Explique o que precisa ser ajustado',
  actionFailed: 'Não foi possível concluir a ação',
  okStart: 'Tarefa iniciada. Ela agora está em andamento.',
  okSend: 'Tarefa enviada para a revisão do criador.',
  okAccept: 'Entrega aceita. A tarefa foi concluída.',
  okReturn: 'Tarefa devolvida com o motivo informado.',
  urgentTitle: 'Mais urgentes',
  urgentEmpty: 'Nenhuma tarefa aberta no momento.',
  badgeLate: 'Atrasada',
  badgeToday: 'Vence hoje',
  statusTodo: 'A fazer',
  statusDoing: 'Em andamento',
  statusReview: 'Em revisão',
  statusDone: 'Concluída',
  statusCanceled: 'Cancelada',
  priorityLow: 'Prioridade baixa',
  priorityMedium: 'Prioridade média',
  priorityHigh: 'Prioridade alta',
  statOpen: 'abertas',
  statDueToday: 'vencem hoje',
  statLate: 'atrasadas',
  seeAllTasks: 'Ver todas as minhas tarefas',
  noticeTitle: 'Aviso das 8h',
  noticeNone: 'O aviso de hoje ainda não foi gerado.',
  noticePending: 'Aviso aguardando envio',
  noticeCompleted: 'Aviso enviado',
  noticeFailed: 'Falha no envio do aviso',
  noticeTasksOne: 'tarefa no aviso de',
  noticeTasksMany: 'tarefas no aviso de',
  noticeLateOne: 'atrasada',
  noticeLateMany: 'atrasadas',
  openNotice: 'Abrir aviso completo',
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };

type LaneKind = 'returned' | 'review' | 'send' | 'start';

const currentLang = () => document.documentElement.lang || undefined;

function parseDate(v: string | undefined): Date | null {
  if (!v) return null;
  const d = new Date(v.length === 10 ? `${v}T00:00:00` : v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtDate(v: string | undefined): string {
  const d = parseDate(v);
  if (!d) return v ?? '';
  return new Intl.DateTimeFormat(currentLang(), { day: '2-digit', month: 'short' }).format(d);
}

function fmtDateTime(v: string | undefined): string {
  const d = parseDate(v);
  if (!d) return v ?? '';
  return new Intl.DateTimeFormat(currentLang(), { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat(currentLang()).format(n);
}

function plural(n: number, one: string, many: string): string {
  return new Intl.PluralRules(currentLang()).select(n) === 'one' ? one : many;
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('tarefas--web--desktop--page11--inicio_membro-102047')
export class TarefasDesktopPage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.carregarInicioStatus === 'loading';
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-8 py-8">
        <div class="mx-auto flex max-w-6xl flex-col gap-6">
          <header class="flex items-start justify-between gap-6">
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
              ${this.renderHeadline()}
            </div>
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              size="sm"
              .loading=${loading}
              @action=${() => { void this.carregarInicio(); }}>
              <Label>${this.msg['reload']}</Label>
            </grouptriggeraction--ml-button-standard>
          </header>
          ${this.renderBody()}
        </div>
      </div>
    `;
  }

  private renderHeadline() {
    if (this.pageStatus === 'empty') {
      return html`<p class="text-lg text-[var(--text-strong,currentColor)]" aria-live="polite">${this.msg['headlineGood']}</p>`;
    }
    const r = this.resumo;
    if (this.pageStatus !== 'success' || !r) return nothing;
    const late = r.quantidadeAtrasadas;
    const today = r.quantidadeVencemHoje;
    if (late <= 0 && today <= 0) {
      return html`<p class="text-lg text-[var(--text-strong,currentColor)]" aria-live="polite">${this.msg['headlineCalm']}</p>`;
    }
    return html`
      <p class="text-lg text-[var(--text-strong,currentColor)]" aria-live="polite">
        ${this.msg['headlineYouHave']}
        ${late > 0
          ? html`<strong class="font-semibold text-[var(--status-error-text,currentColor)] tabular-nums">${fmtNumber(late)}</strong> ${plural(late, this.msg['lateOne'], this.msg['lateMany'])}`
          : nothing}
        ${late > 0 && today > 0 ? this.msg['headlineAnd'] : nothing}
        ${today > 0
          ? html`<strong class="font-semibold tabular-nums">${fmtNumber(today)}</strong> ${plural(today, this.msg['dueTodayOne'], this.msg['dueTodayMany'])}`
          : nothing}.
      </p>`;
  }

  private renderBody() {
    if (this.pageStatus === 'idle' || this.pageStatus === 'loading') return this.renderSkeleton();
    if (this.pageStatus === 'error') return this.renderError();
    return html`
      <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-8">
        ${this.renderEspera()}
        <div class="flex flex-col gap-8">
          ${this.renderResumo()}
          ${this.renderAviso()}
        </div>
      </div>`;
  }

  private renderSkeleton() {
    return html`
      <div class="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        <span class="sr-only">${this.msg['loading']}</span>
        ${[0, 1, 2].map(() => html`
          <div class="animate-pulse rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
            <div class="h-4 w-1/3 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            <div class="mt-3 h-3 w-2/3 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            <div class="mt-2 h-3 w-1/2 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
          </div>`)}
      </div>`;
  }

  private renderError() {
    const err = this.carregarInicioError;
    const missing = err?.code === 'client.preconditionMissing';
    return html`
      <div class="flex flex-col items-start gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" role="alert">
        <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['errorTitle']}</h2>
        <p class="text-sm text-[var(--text-default,currentColor)]">${missing ? this.msg['errorMissing'] : (err?.message ?? '')}</p>
        <div class="flex gap-3">
          ${missing ? nothing : html`
            <grouptriggeraction--ml-button-standard size="md" @action=${() => { void this.carregarInicio(); }}>
              <Label>${this.msg['errorRetry']}</Label>
            </grouptriggeraction--ml-button-standard>`}
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.abrirMinhasTarefas()}>
            <Label>${this.msg['goToTasks']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  private renderFeedback() {
    const error = [this.iniciarTarefaError, this.enviarParaRevisaoError, this.aceitarEntregaError, this.devolverComMotivoError].find((e) => e !== null);
    if (error) {
      return html`
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
          <Title>${this.msg['actionFailed']}</Title>
          <Message>${error.message}</Message>
        </groupnotifyuser--ml-contextual-feedback>`;
    }
    let ok = '';
    if (this.iniciarTarefaStatus === 'success') ok = this.msg['okStart'];
    else if (this.enviarParaRevisaoStatus === 'success') ok = this.msg['okSend'];
    else if (this.aceitarEntregaStatus === 'success') ok = this.msg['okAccept'];
    else if (this.devolverComMotivoStatus === 'success') ok = this.msg['okReturn'];
    if (!ok) return nothing;
    return html`
      <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
        <Message>${ok}</Message>
      </groupnotifyuser--ml-contextual-feedback>`;
  }

  private renderEspera() {
    const e = this.esperaPorMim;
    return html`
      <section data-organism-id="esperaPorMim" class="flex flex-col gap-5">
        <div aria-live="polite">${this.renderFeedback()}</div>
        ${this.pageStatus === 'empty' || !e
          ? html`<p class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-[var(--text-muted,currentColor)]">${this.msg['goodNewsDetail']}</p>`
          : html`
            ${this.renderLane(this.msg['laneReturned'], e.devolvidas, 'returned')}
            ${this.renderLane(this.msg['laneReview'], e.paraRevisar, 'review')}
            ${this.renderLane(this.msg['laneSend'], e.paraEnviarRevisao, 'send')}
            ${this.renderLane(this.msg['laneStart'], e.paraIniciar, 'start')}`}
      </section>`;
  }

  private renderLane(title: string, items: TarefaPendencia[], kind: LaneKind) {
    if (!items || items.length === 0) return nothing;
    return html`
      <section class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
        <h2 class="border-b border-[var(--border-subtle,currentColor)] px-4 py-3 text-sm font-semibold text-[var(--text-strong,currentColor)]">${title}</h2>
        <ul class="divide-y divide-[var(--border-subtle,currentColor)]">
          ${items.map((t) => this.renderPendencia(t, kind))}
        </ul>
      </section>`;
  }

  private priorityLabel(p: TarefaPendencia['prioridade']) {
    if (p === 'high') return this.msg['priorityHigh'];
    if (p === 'medium') return this.msg['priorityMedium'];
    return this.msg['priorityLow'];
  }

  private statusLabel(s: TarefaResumo['status']) {
    switch (s) {
      case 'aFazer': return this.msg['statusTodo'];
      case 'emAndamento': return this.msg['statusDoing'];
      case 'emRevisao': return this.msg['statusReview'];
      case 'concluida': return this.msg['statusDone'];
      default: return this.msg['statusCanceled'];
    }
  }

  private renderPendencia(t: TarefaPendencia, kind: LaneKind) {
    const draft = this.devolverComMotivoDraft;
    const formOpen = kind === 'review' && draft.id === t.id;
    const person = kind === 'review'
      ? `${this.msg['deliveredBy']} ${t.responsavel.details.identification.name}`
      : `${this.msg['createdBy']} ${t.criador.details.identification.name}`;
    const motivo = t.details.motivoDevolucao;
    return html`
      <li class="flex flex-col gap-3 px-4 py-3">
        <div class="flex items-start gap-4">
          <div class="min-w-0 flex-1">
            <button type="button"
              class="rounded text-left font-medium text-[var(--link-text,currentColor)] hover:underline ${focusRing}"
              @click=${() => this.abrirTarefaParaAjustar(t.id)}>${t.titulo}</button>
            <p class="mt-1 text-xs text-[var(--text-muted,currentColor)]">
              ${person} · ${this.msg['checklist']} ${t.details.progressoChecklist} · ${this.priorityLabel(t.prioridade)}
            </p>
            ${kind === 'returned' && motivo
              ? html`<p class="mt-2 text-sm text-[var(--text-default,currentColor)]"><span class="text-[var(--text-muted,currentColor)]">${this.msg['reasonPrefix']}${t.details.devolvidaEm ? html` (${this.msg['returnedOn']} ${fmtDateTime(t.details.devolvidaEm)})` : nothing}:</span> ${motivo}</p>`
              : nothing}
          </div>
          <div class="shrink-0 text-right tabular-nums">
            <div class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${fmtDate(t.prazo)}</div>
            <div class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['deadline']}</div>
          </div>
          <div class="flex shrink-0 items-center gap-2">${this.renderActions(t, kind, formOpen)}</div>
        </div>
        ${formOpen ? this.renderReasonForm(t) : nothing}
      </li>`;
  }

  private renderActions(t: TarefaPendencia, kind: LaneKind, formOpen: boolean) {
    if (kind === 'start') {
      return html`
        <grouptriggeraction--ml-button-standard size="sm" .loading=${this.iniciarTarefaStatus === 'loading'} @action=${() => { void this.iniciarTarefa(t.id); }}>
          <Label>${this.msg['startTask']}</Label>
        </grouptriggeraction--ml-button-standard>`;
    }
    if (kind === 'send') {
      return html`
        <grouptriggeraction--ml-button-standard size="sm" .loading=${this.enviarParaRevisaoStatus === 'loading'} @action=${() => { void this.enviarParaRevisao(t.id); }}>
          <Label>${this.msg['sendReview']}</Label>
        </grouptriggeraction--ml-button-standard>`;
    }
    if (kind === 'returned') {
      return html`
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" @action=${() => this.abrirTarefaParaAjustar(t.id)}>
          <Label>${this.msg['adjustTask']}</Label>
        </grouptriggeraction--ml-button-standard>
        <grouptriggeraction--ml-button-standard size="sm" .loading=${this.enviarParaRevisaoStatus === 'loading'} @action=${() => { void this.enviarParaRevisao(t.id); }}>
          <Label>${this.msg['resendReview']}</Label>
        </grouptriggeraction--ml-button-standard>`;
    }
    return html`
      ${formOpen ? nothing : html`
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="sm"
          @action=${() => this.setDevolverComMotivoDraft({ id: t.id, version: t.version, details: { motivoDevolucao: '' } })}>
          <Label>${this.msg['returnWithReason']}</Label>
        </grouptriggeraction--ml-button-standard>`}
      <grouptriggeraction--ml-button-standard size="sm" .loading=${this.aceitarEntregaStatus === 'loading'} @action=${() => { void this.aceitarEntrega(t.id); }}>
        <Label>${this.msg['acceptDelivery']}</Label>
      </grouptriggeraction--ml-button-standard>`;
  }

  private renderReasonForm(t: TarefaPendencia) {
    const draft = this.devolverComMotivoDraft;
    const text = draft.details.motivoDevolucao ?? '';
    const inputId = `motivo-${t.id}`;
    return html`
      <div class="flex flex-col gap-2 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3">
        <label for=${inputId} class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg['reasonLabel']}</label>
        <textarea id=${inputId} rows="3"
          class="w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] p-2 text-sm text-[var(--text-default,currentColor)] ${focusRing}"
          placeholder=${this.msg['reasonPlaceholder']}
          .value=${text}
          @input=${(ev: Event) => this.setDevolverComMotivoDraft({
            ...draft,
            details: { ...draft.details, motivoDevolucao: (ev.target as HTMLTextAreaElement).value },
          })}></textarea>
        <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['reasonHint']}</p>
        <div class="flex justify-end gap-2">
          <grouptriggeraction--ml-button-standard data-variant="ghost" size="sm"
            @action=${() => this.setDevolverComMotivoDraft({ id: null, version: null, details: { motivoDevolucao: null } })}>
            <Label>${this.msg['cancel']}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard size="sm"
            .disabled=${text.trim() === ''}
            .loading=${this.devolverComMotivoStatus === 'loading'}
            @action=${() => { void this.devolverComMotivo(t.id); }}>
            <Label>${this.msg['confirmReturn']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </div>`;
  }

  private renderResumo() {
    const r = this.resumo;
    if (!r) return html`<section data-organism-id="resumoMinhasTarefas"></section>`;
    return html`
      <section data-organism-id="resumoMinhasTarefas" class="flex flex-col gap-4">
        <div class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
          <h2 class="border-b border-[var(--border-subtle,currentColor)] px-4 py-3 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['urgentTitle']}</h2>
          ${r.tarefas.length === 0
            ? html`<p class="px-4 py-4 text-sm text-[var(--text-muted,currentColor)]">${this.msg['urgentEmpty']}</p>`
            : html`<ul class="divide-y divide-[var(--border-subtle,currentColor)]">
                ${r.tarefas.map((t) => this.renderUrgente(t))}
              </ul>`}
        </div>
        <dl class="flex flex-wrap gap-x-6 gap-y-1 px-1 text-sm text-[var(--text-muted,currentColor)]">
          <div class="flex flex-row-reverse justify-end gap-1">
            <dt>${this.msg['statOpen']}</dt>
            <dd class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtNumber(r.quantidadeAbertas)}</dd>
          </div>
          <div class="flex flex-row-reverse justify-end gap-1">
            <dt>${this.msg['statDueToday']}</dt>
            <dd class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtNumber(r.quantidadeVencemHoje)}</dd>
          </div>
          <div class="flex flex-row-reverse justify-end gap-1">
            <dt>${this.msg['statLate']}</dt>
            <dd class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtNumber(r.quantidadeAtrasadas)}</dd>
          </div>
        </dl>
        <div>
          <button type="button"
            class="rounded px-1 py-2 text-sm text-[var(--link-text,currentColor)] hover:underline ${focusRing}"
            @click=${() => this.abrirMinhasTarefas()}>${this.msg['seeAllTasks']}</button>
        </div>
      </section>`;
  }

  private renderUrgente(t: TarefaResumo) {
    return html`
      <li>
        <button type="button"
          class="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[var(--surface-alt-bg,transparent)] ${focusRing}"
          @click=${() => this.abrirMinhasTarefas()}>
          <span class="min-w-0 flex-1">
            <span class="block font-medium text-[var(--text-strong,currentColor)]">${t.titulo}</span>
            <span class="mt-1 block text-xs text-[var(--text-muted,currentColor)]">
              ${t.lista.nome} · ${this.statusLabel(t.status)} · ${this.msg['checklist']} ${t.details.progressoChecklist}
            </span>
          </span>
          <span class="shrink-0 text-right tabular-nums">
            <span class="block text-sm font-semibold ${t.details.atrasada ? 'text-[var(--status-error-text,currentColor)]' : 'text-[var(--text-strong,currentColor)]'}">${fmtDate(t.prazo)}</span>
            ${t.details.atrasada
              ? html`<span class="mt-1 inline-block rounded-full bg-[var(--status-error-bg,transparent)] px-2 py-0.5 text-xs text-[var(--status-error-text,currentColor)]">${this.msg['badgeLate']}</span>`
              : t.details.venceHoje
                ? html`<span class="mt-1 inline-block rounded-full bg-[var(--status-warning-bg,transparent)] px-2 py-0.5 text-xs text-[var(--status-warning-text,currentColor)]">${this.msg['badgeToday']}</span>`
                : nothing}
          </span>
        </button>
      </li>`;
  }

  private renderAviso() {
    const a = this.avisoDoDia;
    return html`
      <section data-organism-id="avisoDoDia" class="flex flex-col gap-3">
        <h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg['noticeTitle']}</h2>
        ${!a
          ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['noticeNone']}</p>`
          : html`
            <groupnotifyuser--ml-notify-banner
              type=${a.status === 'failed' ? 'warning' : 'info'}
              .visible=${true}
              .dismissible=${false}
              @action=${() => this.abrirMeusAvisos()}>
              <Title>${a.status === 'failed' ? this.msg['noticeFailed'] : a.status === 'completed' ? this.msg['noticeCompleted'] : this.msg['noticePending']}</Title>
              <Message>${fmtNumber(a.details.quantidadeTarefas)} ${plural(a.details.quantidadeTarefas, this.msg['noticeTasksOne'], this.msg['noticeTasksMany'])} ${fmtDate(a.dataReferencia)}, ${fmtNumber(a.details.quantidadeAtrasadas)} ${plural(a.details.quantidadeAtrasadas, this.msg['noticeLateOne'], this.msg['noticeLateMany'])}.</Message>
              <Action><button type="button">${this.msg['openNotice']}</button></Action>
            </groupnotifyuser--ml-notify-banner>`}
      </section>`;
  }
}
