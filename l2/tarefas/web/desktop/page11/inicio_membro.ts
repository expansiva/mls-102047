/// <mls fileReference="_102047_/l2/tarefas/web/desktop/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TarefasInicio_membroShared } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { Pendencia, TarefaResumo, ErrorState } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Início',
  headlinePrefix: 'Você tem',
  atrasadaOne: 'tarefa atrasada',
  atrasadaMany: 'tarefas atrasadas',
  andHoje: 'e',
  venceHoje: 'vencendo hoje.',
  goodNews: 'Nada precisa de atenção agora.',
  goodNewsHint: 'Nenhuma tarefa aberta espera por você neste momento.',
  laneTitle: 'Esperando por você',
  laneEmpty: 'Nenhuma tarefa espera por uma ação sua.',
  prazo: 'Prazo',
  prioridade: 'Prioridade',
  checklist: 'Checklist',
  criadaPor: 'Criada por',
  responsavel: 'Responsável',
  motivoLabel: 'Motivo da devolução',
  devolvidaEm: 'devolvida em',
  btnIniciar: 'Iniciar tarefa',
  btnEnviar: 'Enviar para revisão',
  btnReenviar: 'Reenviar para revisão',
  btnAceitar: 'Aceitar entrega',
  btnDevolver: 'Devolver com motivo',
  btnAjustar: 'Abrir para ajustar',
  btnConfirmarDevolucao: 'Confirmar devolução',
  btnCancelar: 'Cancelar',
  motivoFieldLabel: 'Motivo da devolução',
  motivoPlaceholder: 'Explique o que precisa ser ajustado',
  openTaskAria: 'Abrir a tarefa',
  avisoTitle: 'Aviso diário das 8h',
  avisoReferente: 'Referente a',
  avisoTarefas: 'tarefas no aviso',
  avisoAtrasadas: 'atrasadas',
  avisoFalhou: 'O aviso de hoje não pôde ser gerado.',
  avisoAbrir: 'Abrir aviso de hoje',
  avisoVazio: 'O aviso diário de hoje ainda não foi gerado.',
  avisoVerMeus: 'Ver meus avisos',
  stripAbertas: 'abertas',
  stripHoje: 'vencem hoje',
  stripAtrasadas: 'atrasadas',
  browseSummary: 'Minhas tarefas abertas',
  browseAll: 'Ver todas as minhas tarefas',
  browseEmpty: 'Você não tem tarefas abertas.',
  flagAtrasada: 'Atrasada',
  flagHoje: 'Vence hoje',
  stAFazer: 'A fazer',
  stEmAndamento: 'Em andamento',
  stEmRevisao: 'Em revisão',
  stConcluida: 'Concluída',
  stCancelada: 'Cancelada',
  prLow: 'Baixa',
  prMedium: 'Média',
  prHigh: 'Alta',
  loading: 'Carregando seu dia…',
  errorTitle: 'Não foi possível carregar seu início.',
  errorPrecondition: 'Esta página foi aberta sem o que ela precisa para carregar.',
  errorRetry: 'Tentar de novo',
  errNavPrecondition: 'Não foi possível abrir a tarefa: faltou indicar qual tarefa.',
  errCmd: 'Não foi possível concluir a ação. Tente novamente.',
  errMotivo: 'Informe o motivo da devolução para devolver a tarefa.',
  okIniciar: 'Tarefa iniciada.',
  okEnviar: 'Tarefa enviada para revisão.',
  okAceitar: 'Entrega aceita. A tarefa foi concluída.',
  okDevolver: 'Tarefa devolvida para ajuste.',
  working: 'Executando…',
} as const;

type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
};
/// **collab_i18n_end**

type Msg = PageMessageType;

const BTN_BASE =
  'inline-flex min-h-9 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)] disabled:opacity-50 disabled:cursor-not-allowed';
const BTN_PRIMARY = `${BTN_BASE} bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)]`;
const BTN_SECONDARY = `${BTN_BASE} bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border border-[var(--button-secondary-border,currentColor)]`;
const TITLE_LINK =
  'text-left font-medium text-[var(--link-text,currentColor)] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]';

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtDate(v: string | null | undefined): string {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  const dateOnly = v.length <= 10;
  return new Intl.DateTimeFormat(lang(), dateOnly ? { dateStyle: 'medium', timeZone: 'UTC' } : { dateStyle: 'medium' }).format(d);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}

function statusLabel(m: Msg, s: Pendencia['status']): string {
  switch (s) {
    case 'aFazer': return m.stAFazer;
    case 'emAndamento': return m.stEmAndamento;
    case 'emRevisao': return m.stEmRevisao;
    case 'concluida': return m.stConcluida;
    case 'cancelada': return m.stCancelada;
  }
}

function prioLabel(m: Msg, p: Pendencia['prioridade']): string {
  switch (p) {
    case 'low': return m.prLow;
    case 'medium': return m.prMedium;
    case 'high': return m.prHigh;
  }
}

function errorText(m: Msg, e: ErrorState): string {
  if (e && e.code === 'client.requiredMissing') return m.errMotivo;
  return m.errCmd;
}

@customElement('tarefas--web--desktop--page11--inicio_membro-102047')
export class TarefasDesktopPage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.pageStatus === 'idle' || this.pageStatus === 'loading';
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-8 py-6">
        <div class="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['pageTitle']}</h1>
          ${this.renderNavError()}
          ${loading
            ? this.renderSkeleton()
            : this.pageStatus === 'error'
              ? this.renderLoadError()
              : this.renderContent()}
        </div>
      </div>
    `;
  }

  private renderNavError() {
    const e = this.qryInicioMembroError;
    if (!e || this.pageStatus === 'error') return nothing;
    return html`
      <div role="alert" aria-live="polite" class="rounded-md bg-[var(--status-warning-bg,transparent)] px-4 py-3 text-sm text-[var(--status-warning-text,currentColor)]">
        ${e.code === 'client.preconditionMissing' ? this.msg['errNavPrecondition'] : this.msg['errorTitle']}
      </div>
    `;
  }

  private renderSkeleton() {
    return html`
      <div aria-busy="true" aria-live="polite" class="flex flex-col gap-6">
        <span class="sr-only">${this.msg['loading']}</span>
        <div class="h-9 w-2/3 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
        <div class="grid grid-cols-[1fr_20rem] gap-6">
          <div class="flex flex-col gap-3">
            ${[0, 1, 2].map(() => html`<div class="h-24 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>`)}
          </div>
          <div class="h-32 animate-pulse rounded-lg bg-[var(--surface-alt-bg,transparent)]"></div>
        </div>
        <div class="h-5 w-1/2 animate-pulse rounded bg-[var(--surface-alt-bg,transparent)]"></div>
      </div>
    `;
  }

  private renderLoadError() {
    const e = this.qryInicioMembroError;
    return html`
      <div role="alert" aria-live="polite" class="flex flex-col items-start gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] p-5 text-[var(--status-error-text,currentColor)]">
        <p class="font-medium">${this.msg['errorTitle']}</p>
        ${e && e.code === 'client.preconditionMissing' ? html`<p class="text-sm">${this.msg['errorPrecondition']}</p>` : nothing}
        <button type="button" class="${BTN_SECONDARY}" @click=${() => { void this.qryInicioMembro(); }}>${this.msg['errorRetry']}</button>
      </div>
    `;
  }

  private renderContent() {
    const busy = this.cmdIniciarTarefaStatus === 'loading'
      || this.cmdEnviarParaRevisaoStatus === 'loading'
      || this.cmdAceitarEntregaStatus === 'loading'
      || this.cmdDevolverComMotivoStatus === 'loading';
    return html`
      ${this.renderHeadline()}
      ${this.renderFeedback()}
      <div class="grid grid-cols-[minmax(0,1fr)_20rem] items-start gap-6">
        ${this.renderPendencias(busy)}
        ${this.renderAviso()}
      </div>
      ${this.renderStrip()}
      ${this.renderBrowse()}
    `;
  }

  private renderHeadline() {
    const m = this.msg;
    if (this.pageStatus === 'empty' || !this.resumo) {
      return html`
        <header>
          <p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${m['goodNews']}</p>
          <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${m['goodNewsHint']}</p>
        </header>
      `;
    }
    const r = this.resumo;
    return html`
      <header>
        <p class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">
          ${m['headlinePrefix']} ${fmtNumber(r.quantidadeAtrasadas)} ${r.quantidadeAtrasadas === 1 ? m['atrasadaOne'] : m['atrasadaMany']}
          ${m['andHoje']} ${fmtNumber(r.quantidadeVencemHoje)} ${m['venceHoje']}
        </p>
      </header>
    `;
  }

  private renderFeedback() {
    const m = this.msg;
    const items: { ok: boolean; text: string }[] = [];
    const add = (status: string, err: ErrorState, okText: string) => {
      if (status === 'success') items.push({ ok: true, text: okText });
      if (status === 'error') items.push({ ok: false, text: errorText(m, err) });
    };
    add(this.cmdIniciarTarefaStatus, this.cmdIniciarTarefaError, m['okIniciar']);
    add(this.cmdEnviarParaRevisaoStatus, this.cmdEnviarParaRevisaoError, m['okEnviar']);
    add(this.cmdAceitarEntregaStatus, this.cmdAceitarEntregaError, m['okAceitar']);
    add(this.cmdDevolverComMotivoStatus, this.cmdDevolverComMotivoError, m['okDevolver']);
    return html`
      <div aria-live="polite" class="flex flex-col gap-2">
        ${items.map(i => html`
          <div role=${i.ok ? 'status' : 'alert'} class="rounded-md px-4 py-2 text-sm ${i.ok
            ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]'
            : 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]'}">${i.text}</div>
        `)}
      </div>
    `;
  }

  private renderPendencias(busy: boolean) {
    const m = this.msg;
    return html`
      <section data-organism-id="caixaPendencias" class="flex flex-col gap-3" aria-busy=${busy ? 'true' : 'false'}>
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${m['laneTitle']}</h2>
        ${this.pendencias.length === 0
          ? html`<p class="rounded-lg border border-dashed border-[var(--border-subtle,currentColor)] px-4 py-6 text-sm text-[var(--text-muted,currentColor)]">${m['laneEmpty']}</p>`
          : html`<ul class="flex flex-col gap-3">${this.pendencias.map(p => this.renderPendencia(p, busy))}</ul>`}
      </section>
    `;
  }

  private renderPendencia(p: Pendencia, busy: boolean) {
    const m = this.msg;
    const motivo = p.details.details.motivoDevolucao;
    const devolvidaEm = p.details.details.devolvidaEm;
    const returning = this.cmdDevolverComMotivoDraft.id === p.id;
    const criador = p.criador.details.identification.details.identification.name;
    const responsavel = p.responsavel.details.identification.details.identification.name;
    const draft = this.cmdDevolverComMotivoDraft;

    let actions;
    if (p.status === 'aFazer') {
      actions = html`<button type="button" class="${BTN_PRIMARY}" ?disabled=${busy} @click=${() => { void this.cmdIniciarTarefa(p.id); }}>${m['btnIniciar']}</button>`;
    } else if (p.status === 'emAndamento') {
      actions = motivo
        ? html`
            <button type="button" class="${BTN_SECONDARY}" ?disabled=${busy} @click=${() => this.abrirTarefaParaAjustar(p.id)}>${m['btnAjustar']}</button>
            <button type="button" class="${BTN_PRIMARY}" ?disabled=${busy} @click=${() => { void this.cmdEnviarParaRevisao(p.id); }}>${m['btnReenviar']}</button>`
        : html`<button type="button" class="${BTN_PRIMARY}" ?disabled=${busy} @click=${() => { void this.cmdEnviarParaRevisao(p.id); }}>${m['btnEnviar']}</button>`;
    } else if (p.status === 'emRevisao') {
      actions = html`
        <button type="button" class="${BTN_SECONDARY}" ?disabled=${busy} aria-expanded=${returning ? 'true' : 'false'}
          @click=${() => this.setCmdDevolverComMotivoDraft({ id: p.id, version: p.version, details: { motivoDevolucao: '' } })}>${m['btnDevolver']}</button>
        <button type="button" class="${BTN_PRIMARY}" ?disabled=${busy} @click=${() => { void this.cmdAceitarEntrega(p.id); }}>${m['btnAceitar']}</button>`;
    } else {
      actions = nothing;
    }

    return html`
      <li class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <button type="button" class="${TITLE_LINK}" aria-label="${m['openTaskAria']} ${p.titulo}" @click=${() => this.abrirTarefaParaAjustar(p.id)}>${p.titulo}</button>
            <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">
              ${m['prazo']} ${fmtDate(p.prazo)} · ${m['prioridade']} ${prioLabel(m, p.prioridade)} · ${statusLabel(m, p.status)}
              ${p.details.details.progressoChecklist ? html` · ${m['checklist']} ${p.details.details.progressoChecklist}` : nothing}
            </p>
            <p class="text-sm text-[var(--text-muted,currentColor)]">
              ${m['responsavel']}: ${responsavel} · ${m['criadaPor']}: ${criador}
            </p>
          </div>
          <p class="shrink-0 text-right text-sm font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${p.acaoEsperada}</p>
        </div>
        ${motivo
          ? html`
              <div class="mt-3 rounded-md bg-[var(--status-warning-bg,transparent)] px-3 py-2 text-sm text-[var(--status-warning-text,currentColor)]">
                <p class="font-medium">${m['motivoLabel']}${devolvidaEm ? html` · ${m['devolvidaEm']} ${fmtDate(devolvidaEm)}` : nothing}</p>
                <p class="mt-0.5">${motivo}</p>
              </div>`
          : nothing}
        ${returning
          ? html`
              <div class="mt-3 flex flex-col gap-2">
                <label class="flex flex-col gap-1 text-sm font-medium text-[var(--text-strong,currentColor)]">
                  ${m['motivoFieldLabel']}
                  <textarea rows="3" placeholder="${m['motivoPlaceholder']}"
                    class="rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 py-2 text-sm font-normal text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]"
                    .value=${draft.details.motivoDevolucao ?? ''}
                    @input=${(e: Event) => this.setCmdDevolverComMotivoDraft({ ...draft, details: { motivoDevolucao: (e.target as HTMLTextAreaElement).value } })}></textarea>
                </label>
                <div class="flex justify-end gap-2">
                  <button type="button" class="${BTN_SECONDARY}" ?disabled=${busy}
                    @click=${() => this.setCmdDevolverComMotivoDraft({ id: null, version: null, details: { motivoDevolucao: null } })}>${m['btnCancelar']}</button>
                  <button type="button" class="${BTN_PRIMARY}" ?disabled=${busy} aria-busy=${this.cmdDevolverComMotivoStatus === 'loading' ? 'true' : 'false'}
                    @click=${() => { void this.cmdDevolverComMotivo(p.id); }}>${this.cmdDevolverComMotivoStatus === 'loading' ? m['working'] : m['btnConfirmarDevolucao']}</button>
                </div>
              </div>`
          : html`<div class="mt-3 flex flex-wrap justify-end gap-2">${actions}</div>`}
      </li>
    `;
  }

  private renderAviso() {
    const m = this.msg;
    const a = this.avisoHoje;
    return html`
      <aside data-organism-id="alertaAvisoDiario" class="flex flex-col gap-3">
        ${a
          ? html`
              <groupnotifyuser--ml-notify-banner
                .type=${a.status === 'failed' ? 'warning' : 'info'}
                .visible=${true}
                .dismissible=${false}
                @action=${() => this.abrirMeusAvisos()}>
                <Title>${m['avisoTitle']}</Title>
                <Message>${a.status === 'failed'
                  ? m['avisoFalhou']
                  : `${m['avisoReferente']} ${fmtDate(a.dataReferencia)}: ${fmtNumber(a.details.details.quantidadeTarefas)} ${m['avisoTarefas']}, ${fmtNumber(a.details.details.quantidadeAtrasadas)} ${m['avisoAtrasadas']}.`}</Message>
                <Action><button type="button">${m['avisoAbrir']}</button></Action>
              </groupnotifyuser--ml-notify-banner>`
          : html`
              <div class="rounded-lg border border-[var(--border-subtle,currentColor)] p-4 text-sm">
                <p class="text-[var(--text-muted,currentColor)]">${m['avisoVazio']}</p>
                <button type="button" class="mt-3 ${BTN_SECONDARY}" @click=${() => this.abrirMeusAvisos()}>${m['avisoVerMeus']}</button>
              </div>`}
      </aside>
    `;
  }

  private renderStrip() {
    const m = this.msg;
    const r = this.resumo;
    if (!r) return nothing;
    const pair = (n: number, label: string) => html`
      <div class="flex flex-row-reverse items-baseline justify-end gap-1.5">
        <dt class="text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="font-medium tabular-nums text-[var(--text-default,currentColor)]">${fmtNumber(n)}</dd>
      </div>`;
    return html`
      <div data-organism-id="resumoMinhasTarefas" class="flex flex-col gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4">
        <dl class="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          ${pair(r.quantidadeAbertas, m['stripAbertas'])}
          ${pair(r.quantidadeVencemHoje, m['stripHoje'])}
          ${pair(r.quantidadeAtrasadas, m['stripAtrasadas'])}
        </dl>
        ${this.renderBrowseList(r.tarefas)}
      </div>
    `;
  }

  private renderBrowse() {
    return nothing;
  }

  private renderBrowseList(tarefas: TarefaResumo[]) {
    const m = this.msg;
    return html`
      <details class="group text-sm">
        <summary class="cursor-pointer rounded py-1 font-medium text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring,currentColor)]">${m['browseSummary']}</summary>
        <div class="mt-2 flex flex-col gap-2">
          ${tarefas.length === 0
            ? html`<p class="text-[var(--text-muted,currentColor)]">${m['browseEmpty']}</p>`
            : html`<ul class="divide-y divide-[var(--border-subtle,currentColor)]">
                ${tarefas.map(t => html`
                  <li class="flex items-center justify-between gap-4 py-2">
                    <div class="min-w-0">
                      <button type="button" class="${TITLE_LINK}" @click=${() => this.abrirTarefaParaAjustar(t.id)}>${t.titulo}</button>
                      <p class="text-[var(--text-muted,currentColor)]">
                        ${t.lista.nome} · ${m['prazo']} ${fmtDate(t.prazo)} · ${statusLabel(m, t.status)}
                        ${t.details.details.progressoChecklist ? html` · ${m['checklist']} ${t.details.details.progressoChecklist}` : nothing}
                      </p>
                    </div>
                    ${t.details.details.atrasada
                      ? html`<span class="shrink-0 font-semibold text-[var(--status-error-text,currentColor)]">${m['flagAtrasada']}</span>`
                      : t.details.details.venceHoje
                        ? html`<span class="shrink-0 font-semibold text-[var(--status-warning-text,currentColor)]">${m['flagHoje']}</span>`
                        : nothing}
                  </li>`)}
              </ul>`}
          <div>
            <button type="button" class="${BTN_SECONDARY}" @click=${() => this.abrirMinhasTarefas()}>${m['browseAll']}</button>
          </div>
        </div>
      </details>
    `;
  }
}
