/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { TarefaPendencia, TarefaResumo, DevolverComMotivoDraft } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início',
  headlineCounts: 'Hoje: {atrasadas} em atraso e {hoje} com prazo para hoje.',
  headlineGood: 'Nada precisa de atenção agora.',
  loading: 'Carregando o seu dia…',
  errorTitle: 'Não foi possível carregar o seu Início.',
  errorHelp: 'Verifique a conexão e tente de novo.',
  retry: 'Tentar de novo',
  preconditionTitle: 'Falta indicar a tarefa a abrir.',
  preconditionHelp: 'A tarefa foi pedida sem estar escolhida. Volte para as suas tarefas e escolha uma delas.',
  goTasks: 'Ir para minhas tarefas',
  waitingHeading: 'Espera por você',
  laneReturned: 'Devolvidas para ajustar',
  laneReview: 'Entregas para revisar',
  laneSend: 'Em andamento, prontas para enviar',
  laneStart: 'Para iniciar',
  laneAllClear: 'Nenhuma tarefa espera por você agora.',
  deadline: 'Prazo',
  priorityLow: 'Prioridade baixa',
  priorityMedium: 'Prioridade média',
  priorityHigh: 'Prioridade alta',
  checklist: 'Checklist {valor}',
  createdBy: 'Criada por {nome}',
  deliveredBy: 'Entregue por {nome}',
  returnReason: 'Motivo da devolução',
  returnedOn: 'Devolvida em {data}',
  actionAdjust: 'Ajustar tarefa',
  actionResend: 'Reenviar para revisão',
  actionAccept: 'Aceitar entrega',
  actionReturn: 'Devolver com motivo',
  actionSend: 'Enviar para revisão',
  actionStart: 'Iniciar tarefa',
  reasonHelp: 'O responsável vai ler este motivo ao retomar a tarefa.',
  reasonPlaceholder: 'Explique o que precisa ser ajustado',
  confirmReturn: 'Devolver tarefa',
  cancel: 'Cancelar',
  okStart: 'Tarefa iniciada.',
  okSend: 'Tarefa enviada para revisão.',
  okAccept: 'Entrega aceita. A tarefa foi concluída.',
  okReturn: 'Tarefa devolvida com o motivo informado.',
  commandError: 'Não foi possível concluir a ação. A tarefa pode ter mudado; atualize o Início e tente de novo.',
  refresh: 'Atualizar',
  urgentHeading: 'Mais urgentes',
  urgentEmpty: 'Você não tem tarefas abertas.',
  overdue: 'Atrasada',
  dueToday: 'Vence hoje',
  inList: 'Lista {nome}',
  seeAll: 'Ver todas as minhas tarefas',
  stripLabel: 'Resumo da sua carga',
  stripOpen: 'Abertas',
  stripToday: 'Vencem hoje',
  stripLate: 'Atrasadas',
  avisoTitle: 'Aviso diário das 8h',
  avisoMessage: '{data} · Tarefas no aviso: {total}, em atraso: {atrasadas}. {situacao}.',
  avisoPending: 'Aguardando envio',
  avisoCompleted: 'Enviado',
  avisoFailed: 'Falha no envio',
  avisoOpen: 'Abrir aviso',
  avisoNone: 'O aviso de hoje ainda não foi gerado.',
  avisoSeeAll: 'Ver meus avisos'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

const rascunhoVazio: DevolverComMotivoDraft = { id: null, version: null, details: { motivoDevolucao: null } };

type LaneKind = 'devolvidas' | 'paraRevisar' | 'paraEnviarRevisao' | 'paraIniciar';

function lang() {
  return document.documentElement.lang || undefined;
}

function fill(t: string, v: Record<string, string | number>) {
  return t.replace(/\{(\w+)\}/g, (_m, k: string) => String(v[k] ?? ''));
}

function parseDate(v: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
}

function formatDate(v: string | undefined) {
  if (!v) return '';
  const d = parseDate(v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function formatNumber(n: number) {
  return new Intl.NumberFormat(lang()).format(n);
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('tarefas--web--desktop--page11--inicio_membro-102047')
export class TarefasDesktopPage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const m = this.msg;
    const carregando = this.pageStatus === 'idle' || this.pageStatus === 'loading';
    const falhou = this.pageStatus === 'error';

    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <div class="mx-auto max-w-6xl px-8 py-8 flex flex-col gap-6">
          <header class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${m.pageTitle}</h1>
            ${this.renderHeadline(carregando, falhou)}
          </header>
          ${this.renderFeedback()}
          ${falhou
            ? this.renderLoadError()
            : html`
                ${this.carregarInicioError ? this.renderNavError() : nothing}
                <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-start">
                  <div class="flex flex-col gap-6">${this.renderEspera(carregando)}</div>
                  <div class="flex flex-col gap-8">
                    ${this.renderResumo(carregando)}
                    ${this.renderAviso(carregando)}
                  </div>
                </div>`}
        </div>
      </div>
    `;
  }

  private renderHeadline(carregando: boolean, falhou: boolean) {
    const m = this.msg;
    if (falhou) return nothing;
    if (carregando || !this.resumo) {
      return html`<div class="h-7 w-80 rounded bg-[var(--surface-alt-bg,transparent)] animate-pulse" aria-busy="true"><span class="sr-only">${m.loading}</span></div>`;
    }
    const texto = this.pageStatus === 'empty'
      ? m.headlineGood
      : fill(m.headlineCounts, {
          atrasadas: formatNumber(this.resumo.quantidadeAtrasadas),
          hoje: formatNumber(this.resumo.quantidadeVencemHoje)
        });
    return html`<p class="text-lg text-[var(--text-strong,currentColor)]" aria-live="polite">${texto}</p>`;
  }

  private renderFeedback() {
    const m = this.msg;
    const erro = [this.iniciarTarefaError, this.enviarParaRevisaoError, this.aceitarEntregaError, this.devolverComMotivoError].find((e) => e);
    let ok = '';
    if (this.iniciarTarefaStatus === 'success') ok = m.okStart;
    else if (this.enviarParaRevisaoStatus === 'success') ok = m.okSend;
    else if (this.aceitarEntregaStatus === 'success') ok = m.okAccept;
    else if (this.devolverComMotivoStatus === 'success') ok = m.okReturn;
    return html`
      <div aria-live="polite">
        ${erro
          ? html`<div class="flex items-center justify-between gap-4 rounded px-4 py-3 text-sm bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]" role="alert">
              <span>${m.commandError}</span>
              <grouptriggeraction--ml-button-standard size="sm" data-variant="secondary" @action=${() => { void this.carregarInicio(); }}><Label>${m.refresh}</Label></grouptriggeraction--ml-button-standard>
            </div>`
          : ok
            ? html`<div class="rounded px-4 py-3 text-sm bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]" role="status">${ok}</div>`
            : nothing}
      </div>
    `;
  }

  private renderLoadError() {
    const m = this.msg;
    const precondicao = this.carregarInicioError?.code === 'client.preconditionMissing';
    return html`
      <section class="rounded border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 flex flex-col gap-3 items-start" role="alert">
        <p class="font-medium text-[var(--text-strong,currentColor)]">${precondicao ? m.preconditionTitle : m.errorTitle}</p>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${precondicao ? m.preconditionHelp : m.errorHelp}</p>
        <div class="flex gap-3">
          ${precondicao ? nothing : html`<grouptriggeraction--ml-button-standard data-variant="primary" .loading=${this.carregarInicioStatus === 'loading'} @action=${() => { void this.carregarInicio(); }}><Label>${m.retry}</Label></grouptriggeraction--ml-button-standard>`}
          <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.abrirMinhasTarefas()}><Label>${m.goTasks}</Label></grouptriggeraction--ml-button-standard>
        </div>
      </section>
    `;
  }

  private renderNavError() {
    const m = this.msg;
    const precondicao = this.carregarInicioError?.code === 'client.preconditionMissing';
    return html`
      <div class="rounded px-4 py-3 text-sm bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]" role="alert">
        ${precondicao ? m.preconditionTitle : m.errorTitle}
      </div>
    `;
  }

  private renderSkeleton() {
    return html`
      <div class="flex flex-col gap-3" aria-busy="true">
        ${[0, 1, 2].map(() => html`<div class="h-16 rounded bg-[var(--surface-alt-bg,transparent)] animate-pulse"></div>`)}
      </div>
    `;
  }

  /* ---------- esperaPorMim ---------- */

  private renderEspera(carregando: boolean) {
    const m = this.msg;
    const e = this.esperaPorMim;
    const lanes: { id: LaneKind; title: string; rows: TarefaPendencia[] }[] = e
      ? [
          { id: 'devolvidas', title: m.laneReturned, rows: e.devolvidas },
          { id: 'paraRevisar', title: m.laneReview, rows: e.paraRevisar },
          { id: 'paraEnviarRevisao', title: m.laneSend, rows: e.paraEnviarRevisao },
          { id: 'paraIniciar', title: m.laneStart, rows: e.paraIniciar }
        ]
      : [];
    const comItens = lanes.filter((l) => l.rows.length > 0);
    return html`
      <section data-organism-id="esperaPorMim" class="flex flex-col gap-6" aria-label=${m.waitingHeading}>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${m.waitingHeading}</h2>
        ${carregando || !e
          ? this.renderSkeleton()
          : comItens.length === 0
            ? html`<p class="rounded border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-6 text-[var(--text-muted,currentColor)]">${m.laneAllClear}</p>`
            : comItens.map((l) => html`
                <div class="flex flex-col" data-lane=${l.id}>
                  <h3 class="text-base font-semibold text-[var(--text-strong,currentColor)] pb-1 border-b border-[var(--border-default,currentColor)]">${l.title}</h3>
                  <ul class="flex flex-col">${l.rows.map((t) => this.renderPendencia(l.id, t))}</ul>
                </div>`)}
      </section>
    `;
  }

  private priorityLabel(p: TarefaPendencia['prioridade']) {
    const m = this.msg;
    return p === 'high' ? m.priorityHigh : p === 'medium' ? m.priorityMedium : m.priorityLow;
  }

  private actionButton(label: string, variant: 'primary' | 'secondary', status: string, fn: () => void) {
    return html`<grouptriggeraction--ml-button-standard size="sm" data-variant=${variant} .loading=${status === 'loading'} @action=${fn}><Label>${label}</Label></grouptriggeraction--ml-button-standard>`;
  }

  private renderPendencia(kind: LaneKind, t: TarefaPendencia) {
    const m = this.msg;
    const draft = this.devolverComMotivoDraft;
    const devolvendo = kind === 'paraRevisar' && draft.id === t.id;
    const pessoa = kind === 'paraRevisar'
      ? fill(m.deliveredBy, { nome: t.responsavel.details.identification.name })
      : fill(m.createdBy, { nome: t.criador.details.identification.name });
    const meta = [this.priorityLabel(t.prioridade), fill(m.checklist, { valor: t.details.progressoChecklist }), pessoa].join(' · ');

    let acoes;
    if (kind === 'devolvidas') {
      acoes = html`
        ${this.actionButton(m.actionAdjust, 'primary', 'idle', () => this.abrirTarefaParaAjustar(t.id))}
        ${this.actionButton(m.actionResend, 'secondary', this.enviarParaRevisaoStatus, () => { void this.enviarParaRevisao(t.id, t.version); })}`;
    } else if (kind === 'paraRevisar') {
      acoes = html`
        ${this.actionButton(m.actionAccept, 'primary', this.aceitarEntregaStatus, () => { void this.aceitarEntrega(t.id, t.version); })}
        ${devolvendo ? nothing : this.actionButton(m.actionReturn, 'secondary', 'idle', () => this.setDevolverComMotivoDraft({ id: t.id, version: t.version, details: { motivoDevolucao: null } }))}`;
    } else if (kind === 'paraEnviarRevisao') {
      acoes = this.actionButton(m.actionSend, 'primary', this.enviarParaRevisaoStatus, () => { void this.enviarParaRevisao(t.id, t.version); });
    } else {
      acoes = this.actionButton(m.actionStart, 'primary', this.iniciarTarefaStatus, () => { void this.iniciarTarefa(t.id, t.version); });
    }

    const motivo = draft.details.motivoDevolucao ?? '';
    return html`
      <li class="flex flex-col gap-2 py-3 border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex flex-col">
            <button type="button" class="text-left font-medium text-[var(--link-text,currentColor)] hover:underline rounded ${focusRing}" @click=${() => this.abrirTarefaParaAjustar(t.id)}>${t.titulo}</button>
            <p class="text-sm text-[var(--text-muted,currentColor)]">${meta}</p>
          </div>
          <div class="shrink-0 text-right tabular-nums">
            <p class="text-xs text-[var(--text-muted,currentColor)]">${m.deadline}</p>
            <p class="font-medium text-[var(--text-strong,currentColor)]">${formatDate(t.prazo)}</p>
          </div>
        </div>
        ${kind === 'devolvidas' && t.details.motivoDevolucao
          ? html`<div class="rounded border-l-4 border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-3 py-2 text-sm">
              <p class="text-xs text-[var(--text-muted,currentColor)]">${m.returnReason}${t.details.devolvidaEm ? html` · ${fill(m.returnedOn, { data: formatDate(t.details.devolvidaEm) })}` : nothing}</p>
              <p class="text-[var(--text-default,currentColor)]">${t.details.motivoDevolucao}</p>
            </div>`
          : nothing}
        <div class="flex flex-wrap gap-2">${acoes}</div>
        ${devolvendo
          ? html`<form class="flex flex-col gap-2 rounded border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3"
              @submit=${(ev: Event) => { ev.preventDefault(); if (motivo.trim()) void this.devolverComMotivo(t.id, t.version); }}>
              <label class="text-sm font-medium text-[var(--text-strong,currentColor)]" for="motivo-${t.id}">${m.returnReason}</label>
              <textarea id="motivo-${t.id}" rows="3" autofocus
                class="w-full rounded border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 py-2 text-sm text-[var(--text-default,currentColor)] ${focusRing}"
                placeholder=${m.reasonPlaceholder}
                .value=${motivo}
                @input=${(ev: Event) => this.setDevolverComMotivoDraft({ ...draft, details: { ...draft.details, motivoDevolucao: (ev.target as HTMLTextAreaElement).value } })}></textarea>
              <p class="text-xs text-[var(--text-muted,currentColor)]">${m.reasonHelp}</p>
              <div class="flex gap-2">
                <grouptriggeraction--ml-button-standard size="sm" data-variant="primary" .loading=${this.devolverComMotivoStatus === 'loading'} .disabled=${!motivo.trim()} @action=${() => { if (motivo.trim()) void this.devolverComMotivo(t.id, t.version); }}><Label>${m.confirmReturn}</Label></grouptriggeraction--ml-button-standard>
                <grouptriggeraction--ml-button-standard size="sm" data-variant="ghost" @action=${() => this.setDevolverComMotivoDraft(rascunhoVazio)}><Label>${m.cancel}</Label></grouptriggeraction--ml-button-standard>
              </div>
            </form>`
          : nothing}
      </li>
    `;
  }

  /* ---------- resumoMinhasTarefas ---------- */

  private renderResumo(carregando: boolean) {
    const m = this.msg;
    const r = this.resumo;
    return html`
      <section data-organism-id="resumoMinhasTarefas" class="flex flex-col gap-4">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${m.urgentHeading}</h2>
        ${carregando || !r
          ? this.renderSkeleton()
          : html`
            ${r.tarefas.length === 0
              ? html`<p class="text-[var(--text-muted,currentColor)]">${m.urgentEmpty}</p>`
              : html`<ul class="flex flex-col rounded border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
                  ${r.tarefas.map((t) => this.renderUrgente(t))}
                </ul>`}
            <div>
              <grouptriggeraction--ml-button-standard size="sm" data-variant="link" @action=${() => this.abrirMinhasTarefas()}><Label>${m.seeAll}</Label></grouptriggeraction--ml-button-standard>
            </div>
            <dl class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--text-muted,currentColor)]" aria-label=${m.stripLabel}>
              <div class="flex items-baseline gap-1.5"><dd class="order-1 font-semibold tabular-nums text-[var(--text-default,currentColor)]">${formatNumber(r.quantidadeAbertas)}</dd><dt class="order-2">${m.stripOpen}</dt></div>
              <div class="flex items-baseline gap-1.5"><dd class="order-1 font-semibold tabular-nums text-[var(--text-default,currentColor)]">${formatNumber(r.quantidadeVencemHoje)}</dd><dt class="order-2">${m.stripToday}</dt></div>
              <div class="flex items-baseline gap-1.5"><dd class="order-1 font-semibold tabular-nums text-[var(--text-default,currentColor)]">${formatNumber(r.quantidadeAtrasadas)}</dd><dt class="order-2">${m.stripLate}</dt></div>
            </dl>`}
      </section>
    `;
  }

  private renderUrgente(t: TarefaResumo) {
    const m = this.msg;
    const sinal = t.details.atrasada
      ? html`<p class="text-xs font-semibold text-[var(--status-error-text,currentColor)]">${m.overdue}</p>`
      : t.details.venceHoje
        ? html`<p class="text-xs font-medium text-[var(--text-strong,currentColor)]">${m.dueToday}</p>`
        : nothing;
    return html`
      <li class="border-b border-[var(--border-subtle,currentColor)] last:border-b-0">
        <button type="button" class="w-full min-h-[44px] flex items-start justify-between gap-4 px-4 py-3 text-left hover:bg-[var(--surface-alt-bg,transparent)] ${focusRing}" @click=${() => this.abrirTarefaParaAjustar(t.id)}>
          <span class="min-w-0 flex flex-col">
            <span class="font-medium text-[var(--link-text,currentColor)]">${t.titulo}</span>
            <span class="text-sm text-[var(--text-muted,currentColor)]">${fill(m.inList, { nome: t.lista.nome })} · ${fill(m.checklist, { valor: t.details.progressoChecklist })}</span>
          </span>
          <span class="shrink-0 text-right tabular-nums">
            ${sinal}
            <span class="text-sm text-[var(--text-default,currentColor)]">${formatDate(t.prazo)}</span>
          </span>
        </button>
      </li>
    `;
  }

  /* ---------- avisoDoDia ---------- */

  private renderAviso(carregando: boolean) {
    const m = this.msg;
    const a = this.avisoDoDia;
    let corpo;
    if (carregando) {
      corpo = html`<div class="h-14 rounded bg-[var(--surface-alt-bg,transparent)] animate-pulse" aria-busy="true"></div>`;
    } else if (!a) {
      corpo = html`
        <div class="flex flex-col items-start gap-1">
          <p class="text-sm text-[var(--text-muted,currentColor)]">${m.avisoNone}</p>
          <grouptriggeraction--ml-button-standard size="sm" data-variant="link" @action=${() => this.abrirMeusAvisos()}><Label>${m.avisoSeeAll}</Label></grouptriggeraction--ml-button-standard>
        </div>`;
    } else {
      const situacao = a.status === 'completed' ? m.avisoCompleted : a.status === 'failed' ? m.avisoFailed : m.avisoPending;
      const texto = fill(m.avisoMessage, {
        data: formatDate(a.dataReferencia),
        total: formatNumber(a.details.quantidadeTarefas),
        atrasadas: formatNumber(a.details.quantidadeAtrasadas),
        situacao
      });
      corpo = html`
        <groupnotifyuser--ml-notify-banner type=${a.status === 'failed' ? 'warning' : 'info'} .visible=${true} .dismissible=${false} @action=${() => this.abrirMeusAvisos()}>
          <Title>${m.avisoTitle}</Title>
          <Message>${texto}</Message>
          <Action><button type="button" class="underline font-medium">${m.avisoOpen}</button></Action>
        </groupnotifyuser--ml-notify-banner>`;
    }
    return html`<section data-organism-id="avisoDoDia" class="flex flex-col gap-2">${corpo}</section>`;
  }
}
