/// <mls fileReference="_102047_/l2/tarefas/web/mobile/page11/inicio_membro.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { TarefasInicio_membroShared } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import type { Pendencia, MembroNome, TarefaResumo, ErrorState } from '/_102047_/l2/tarefas/web/shared/inicio_membro.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Meu início',
  backLabel: 'Voltar',
  headlineAttention: 'Estas tarefas esperam por você',
  headlineClear: 'Nada precisa de atenção agora',
  clearHint: 'Quando algo depender de você, aparece aqui.',
  loading: 'Carregando suas pendências…',
  working: 'Atualizando sua lista…',
  errorTitle: 'Não foi possível carregar a sua página',
  errorGeneric: 'Tente de novo em instantes. Nada foi alterado.',
  errorPrecondition: 'Faltou indicar qual tarefa abrir. Escolha a tarefa de novo a partir desta lista.',
  retry: 'Tentar de novo',
  ariaPendencias: 'Pendências',
  ariaResumo: 'Situação das minhas tarefas',
  actionStart: 'Iniciar tarefa',
  actionSend: 'Enviar para revisão',
  actionResend: 'Reenviar para revisão',
  actionAccept: 'Aceitar entrega',
  actionReturn: 'Devolver com motivo',
  actionAdjust: 'Abrir para ajustar',
  seeRest: 'Ver as demais',
  tagReturned: 'Devolvida para ajuste',
  reasonLabel: 'Motivo',
  deliveryFrom: 'Entrega de',
  createdBy: 'Criada por',
  dueLabel: 'Prazo',
  checklistLabel: 'Checklist',
  statusAFazer: 'A fazer',
  statusEmAndamento: 'Em andamento',
  statusEmRevisao: 'Em revisão',
  statusConcluida: 'Concluída',
  statusCancelada: 'Cancelada',
  priorityLow: 'Prioridade baixa',
  priorityMedium: 'Prioridade média',
  priorityHigh: 'Prioridade alta',
  feedbackSuccess: 'Pronto. Sua lista foi atualizada.',
  feedbackError: 'Não foi possível concluir a ação. Tente de novo.',
  feedbackRequired: 'Informe o motivo da devolução para continuar.',
  avisoLine: 'Aviso das 8h de {data}: {total} tarefas, {atrasadas} atrasadas.',
  avisoOpen: 'Abrir aviso de hoje',
  avisoNone: 'Hoje não há aviso das 8h.',
  seeAvisos: 'Ver todos os avisos',
  stripOpen: 'Abertas',
  stripToday: 'Vencem hoje',
  stripLate: 'Atrasadas',
  openTasksSummary: 'Ver tarefas abertas',
  noOpenTasks: 'Nenhuma tarefa aberta.',
  flagLate: 'Atrasada',
  flagToday: 'Vence hoje',
  openMyTasks: 'Abrir minhas tarefas',
  returnSceneTitle: 'Motivo da devolução',
  returnTaskLabel: 'Tarefa em revisão',
  returnFieldLabel: 'Explique o que precisa ser ajustado',
  returnFieldHint: 'O motivo fica registrado na tarefa e o responsável é avisado para retomar.',
  returnConfirm: 'Devolver tarefa',
  returnConfirming: 'Devolvendo…'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**

function fmtDate(v: string | null | undefined): string {
  if (!v) return '';
  const d = new Date(v.length === 10 ? `${v}T00:00:00` : v);
  if (Number.isNaN(d.getTime())) return v;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { day: '2-digit', month: 'short' }).format(d);
}

function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_m, k: string) => values[k] ?? '');
}

function personName(m: MembroNome | null | undefined): string {
  return m?.details?.identification?.details?.identification?.name ?? '';
}

const BTN_BASE = 'min-h-[44px] flex-1 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50';
const BTN_PRIMARY = `${BTN_BASE} bg-[var(--button-primary-bg,transparent)] text-[var(--button-primary-text,currentColor)]`;
const BTN_SECONDARY = `${BTN_BASE} bg-[var(--button-secondary-bg,transparent)] text-[var(--button-secondary-text,currentColor)] border border-[var(--button-secondary-border,currentColor)]`;

@customElement('tarefas--web--mobile--page11--inicio_membro-102047')
export class TarefasMobilePage11Inicio_membroPage extends TarefasInicio_membroShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-4 py-4 max-w-[430px] mx-auto w-full">
        <molecules--ml-scenary-102020
          mode="scenary"
          .backLabel=${this.msg['backLabel']}
          .value=${this.scenary || 'triagem'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) this.setScenario(e.detail.value);
          }}
        >
          <Scene value="triagem" title=${this.msg['pageTitle']}>${this.renderTriagem()}</Scene>
          <Scene value="devolver" title=${this.msg['returnSceneTitle']} nav="back" backTo="triagem">${this.renderDevolver()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private busy(): boolean {
    return (
      this.cmdIniciarTarefaStatus === 'loading' ||
      this.cmdEnviarParaRevisaoStatus === 'loading' ||
      this.cmdAceitarEntregaStatus === 'loading' ||
      this.cmdDevolverComMotivoStatus === 'loading'
    );
  }

  private firstError(): ErrorState {
    return this.cmdIniciarTarefaError ?? this.cmdEnviarParaRevisaoError ?? this.cmdAceitarEntregaError ?? this.cmdDevolverComMotivoError;
  }

  private anySuccess(): boolean {
    return (
      this.cmdIniciarTarefaStatus === 'success' ||
      this.cmdEnviarParaRevisaoStatus === 'success' ||
      this.cmdAceitarEntregaStatus === 'success' ||
      this.cmdDevolverComMotivoStatus === 'success'
    );
  }

  private statusLabel(s: Pendencia['status']): string {
    switch (s) {
      case 'aFazer': return this.msg['statusAFazer'];
      case 'emAndamento': return this.msg['statusEmAndamento'];
      case 'emRevisao': return this.msg['statusEmRevisao'];
      case 'concluida': return this.msg['statusConcluida'];
      default: return this.msg['statusCancelada'];
    }
  }

  private priorityLabel(p: Pendencia['prioridade']): string {
    switch (p) {
      case 'high': return this.msg['priorityHigh'];
      case 'medium': return this.msg['priorityMedium'];
      default: return this.msg['priorityLow'];
    }
  }

  private renderTriagem() {
    const st = this.pageStatus;
    if (st === 'idle' || st === 'loading') {
      return html`
        <div class="flex flex-col gap-3 pt-2" aria-busy="true" aria-live="polite">
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['loading']}</p>
          <div class="h-8 w-3/4 rounded-lg animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-28 rounded-xl animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-28 rounded-xl animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="h-10 rounded-lg animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>
        </div>
      `;
    }
    if (st === 'error') return this.renderError();

    const empty = this.pendencias.length === 0;
    return html`
      <div class="flex flex-col gap-5 pb-8 pt-1">
        <h2 class="text-xl font-semibold leading-snug text-[var(--text-strong,currentColor)]" aria-live="polite">
          ${empty ? this.msg['headlineClear'] : this.msg['headlineAttention']}
        </h2>
        ${this.renderFeedback()}
        <section data-organism-id="caixaPendencias" aria-label=${this.msg['ariaPendencias']} aria-busy=${this.busy() ? 'true' : 'false'}>
          ${empty
            ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['clearHint']}</p>`
            : this.renderLane()}
        </section>
        <section data-organism-id="alertaAvisoDiario">${this.renderAviso()}</section>
        <section data-organism-id="resumoMinhasTarefas" aria-label=${this.msg['ariaResumo']}>${this.renderResumo()}</section>
      </div>
    `;
  }

  private renderError() {
    const pre = this.qryInicioMembroError?.code === 'client.preconditionMissing';
    return html`
      <div role="alert" class="flex flex-col gap-3 rounded-xl p-4 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
        <h2 class="text-lg font-semibold">${this.msg['errorTitle']}</h2>
        <p class="text-sm">${pre ? this.msg['errorPrecondition'] : this.msg['errorGeneric']}</p>
        <button type="button" class=${BTN_SECONDARY} @click=${() => this.qryInicioMembro()}>${this.msg['retry']}</button>
      </div>
    `;
  }

  private renderFeedback() {
    const err = this.firstError();
    if (err) {
      const text = err.code === 'client.requiredMissing' ? this.msg['feedbackRequired'] : this.msg['feedbackError'];
      return keyed(
        text,
        html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
          <Message>${text}</Message>
        </groupnotifyuser--ml-contextual-feedback>`
      );
    }
    if (this.anySuccess()) {
      return html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
        <Message>${this.msg['feedbackSuccess']}</Message>
      </groupnotifyuser--ml-contextual-feedback>`;
    }
    if (this.busy()) {
      return html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg['working']}</p>`;
    }
    return nothing;
  }

  private renderLane() {
    const first = this.pendencias.slice(0, 3);
    const rest = this.pendencias.slice(3);
    return html`
      <ul class="flex flex-col gap-3">${first.map(p => this.renderPendencia(p))}</ul>
      ${rest.length
        ? html`<details class="mt-3">
            <summary class="min-h-[44px] flex items-center cursor-pointer text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] rounded">
              ${this.msg['seeRest']}
            </summary>
            <ul class="flex flex-col gap-3 mt-2">${rest.map(p => this.renderPendencia(p))}</ul>
          </details>`
        : nothing}
    `;
  }

  private renderPendencia(p: Pendencia) {
    const motivo = p.details?.details?.motivoDevolucao;
    const progresso = p.details?.details?.progressoChecklist;
    const who = p.status === 'emRevisao'
      ? `${this.msg['deliveryFrom']} ${personName(p.responsavel)}`
      : `${this.msg['createdBy']} ${personName(p.criador)}`;
    return html`
      <li class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3 flex flex-col gap-2">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <p class="font-medium leading-snug text-[var(--text-strong,currentColor)] break-words">${p.titulo}</p>
            <p class="text-xs text-[var(--text-muted,currentColor)] mt-0.5">${who}</p>
          </div>
          <div class="shrink-0 text-right">
            <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['dueLabel']}</p>
            <p class="text-sm font-semibold tabular-nums text-[var(--text-strong,currentColor)] whitespace-nowrap">${fmtDate(p.prazo)}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          ${motivo
            ? html`<span class="rounded-full px-2 py-0.5 bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]">${this.msg['tagReturned']}</span>`
            : html`<span class="rounded-full px-2 py-0.5 bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]">${this.statusLabel(p.status)}</span>`}
          <span class="text-[var(--text-muted,currentColor)]">${this.priorityLabel(p.prioridade)}</span>
          ${progresso ? html`<span class="text-[var(--text-muted,currentColor)] tabular-nums">${this.msg['checklistLabel']} ${progresso}</span>` : nothing}
        </div>
        ${motivo
          ? html`<p class="text-sm rounded-lg p-2 bg-[var(--surface-alt-bg,transparent)] text-[var(--text-default,currentColor)] break-words">
              <span class="font-medium">${this.msg['reasonLabel']}:</span> ${motivo}
            </p>`
          : nothing}
        ${this.renderActions(p, !!motivo)}
      </li>
    `;
  }

  private renderActions(p: Pendencia, returned: boolean) {
    const off = this.busy();
    switch (p.status) {
      case 'aFazer':
        return html`<div class="flex gap-2">
          <button type="button" class=${BTN_PRIMARY} ?disabled=${off} @click=${() => this.cmdIniciarTarefa(p.id)}>${this.msg['actionStart']}</button>
        </div>`;
      case 'emAndamento':
        return html`<div class="flex gap-2">
          ${returned
            ? html`<button type="button" class=${BTN_SECONDARY} ?disabled=${off} @click=${() => this.abrirTarefaParaAjustar(p.id)}>${this.msg['actionAdjust']}</button>`
            : nothing}
          <button type="button" class=${BTN_PRIMARY} ?disabled=${off} @click=${() => this.cmdEnviarParaRevisao(p.id)}>
            ${returned ? this.msg['actionResend'] : this.msg['actionSend']}
          </button>
        </div>`;
      case 'emRevisao':
        return html`<div class="flex gap-2">
          <button type="button" class=${BTN_PRIMARY} ?disabled=${off} @click=${() => this.cmdAceitarEntrega(p.id)}>${this.msg['actionAccept']}</button>
          <button
            type="button"
            class=${BTN_SECONDARY}
            ?disabled=${off}
            @click=${() => {
              this.setCmdDevolverComMotivoDraft({ id: p.id, version: p.version, details: { motivoDevolucao: null } });
              this.setScenario('devolver');
            }}
          >${this.msg['actionReturn']}</button>
        </div>`;
      default:
        return nothing;
    }
  }

  private renderAviso() {
    const a = this.avisoHoje;
    if (!a) {
      return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['avisoNone']}</p>`;
    }
    const line = fill(this.msg['avisoLine'], {
      data: fmtDate(a.dataReferencia),
      total: String(a.details?.details?.quantidadeTarefas ?? ''),
      atrasadas: String(a.details?.details?.quantidadeAtrasadas ?? '')
    });
    return html`
      <div class="flex flex-col gap-2">
        ${keyed(
          line,
          html`<groupnotifyuser--ml-notify-banner type="info" .visible=${true} .dismissible=${false}>
            <Message>${line}</Message>
          </groupnotifyuser--ml-notify-banner>`
        )}
        <button type="button" class=${BTN_SECONDARY} @click=${() => this.abrirMeusAvisos()}>${this.msg['avisoOpen']}</button>
      </div>
    `;
  }

  private renderResumo() {
    const r = this.resumo;
    return html`
      <div class="flex flex-col gap-3">
        ${r
          ? html`<dl class="flex flex-wrap gap-x-6 gap-y-2 text-[var(--text-muted,currentColor)]">
              <div class="flex items-baseline gap-1.5">
                <dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${r.quantidadeAbertas}</dd>
                <dt class="text-xs">${this.msg['stripOpen']}</dt>
              </div>
              <div class="flex items-baseline gap-1.5">
                <dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${r.quantidadeVencemHoje}</dd>
                <dt class="text-xs">${this.msg['stripToday']}</dt>
              </div>
              <div class="flex items-baseline gap-1.5">
                <dd class="text-base font-semibold tabular-nums text-[var(--text-default,currentColor)]">${r.quantidadeAtrasadas}</dd>
                <dt class="text-xs">${this.msg['stripLate']}</dt>
              </div>
            </dl>
            <details>
              <summary class="min-h-[44px] flex items-center cursor-pointer text-sm text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] rounded">
                ${this.msg['openTasksSummary']}
              </summary>
              ${r.tarefas.length
                ? html`<ul class="divide-y divide-[var(--border-subtle,currentColor)]">${r.tarefas.map(t => this.renderTarefaAberta(t))}</ul>`
                : html`<p class="text-sm text-[var(--text-muted,currentColor)] py-2">${this.msg['noOpenTasks']}</p>`}
            </details>`
          : nothing}
        <div class="flex flex-col">
          <button type="button" class="min-h-[44px] text-left text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] rounded" @click=${() => this.abrirMinhasTarefas()}>
            ${this.msg['openMyTasks']}
          </button>
          <button type="button" class="min-h-[44px] text-left text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] rounded" @click=${() => this.abrirMeusAvisos()}>
            ${this.msg['seeAvisos']}
          </button>
        </div>
      </div>
    `;
  }

  private renderTarefaAberta(t: TarefaResumo) {
    const late = t.details?.details?.atrasada;
    const today = t.details?.details?.venceHoje;
    const progresso = t.details?.details?.progressoChecklist;
    return html`
      <li class="py-2 flex items-start justify-between gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-sm text-[var(--text-strong,currentColor)] break-words">${t.titulo}</p>
          <p class="text-xs text-[var(--text-muted,currentColor)]">
            ${t.lista?.nome ?? ''}${progresso ? html` · ${this.msg['checklistLabel']} ${progresso}` : nothing}
          </p>
        </div>
        <div class="shrink-0 text-right">
          <p class="text-sm tabular-nums whitespace-nowrap ${late ? 'text-[var(--status-error-text,currentColor)] font-semibold' : 'text-[var(--text-default,currentColor)]'}">${fmtDate(t.prazo)}</p>
          ${late
            ? html`<p class="text-xs text-[var(--status-error-text,currentColor)]">${this.msg['flagLate']}</p>`
            : today
              ? html`<p class="text-xs text-[var(--status-warning-text,currentColor)]">${this.msg['flagToday']}</p>`
              : nothing}
        </div>
      </li>
    `;
  }

  private renderDevolver() {
    const draft = this.cmdDevolverComMotivoDraft;
    const task = draft.id ? this.pendencias.find(p => p.id === draft.id) : undefined;
    const loading = this.cmdDevolverComMotivoStatus === 'loading';
    const err = this.cmdDevolverComMotivoError;
    return html`
      <div class="flex flex-col gap-4 pb-8 pt-2">
        ${task
          ? html`<div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
              <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['returnTaskLabel']}</p>
              <p class="font-medium text-[var(--text-strong,currentColor)] break-words">${task.titulo}</p>
              <p class="text-xs text-[var(--text-muted,currentColor)] mt-0.5">${this.msg['deliveryFrom']} ${personName(task.responsavel)}</p>
            </div>`
          : nothing}
        <div class="flex flex-col gap-1.5">
          <label for="motivo-devolucao" class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg['returnFieldLabel']}</label>
          <textarea
            id="motivo-devolucao"
            rows="5"
            class="w-full rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] text-[var(--text-default,currentColor)] p-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
            .value=${draft.details.motivoDevolucao ?? ''}
            ?disabled=${loading}
            aria-describedby="motivo-ajuda"
            @input=${(e: Event) => {
              const v = (e.target as HTMLTextAreaElement).value;
              this.setCmdDevolverComMotivoDraft({ ...draft, details: { ...draft.details, motivoDevolucao: v } });
            }}
          ></textarea>
          <p id="motivo-ajuda" class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['returnFieldHint']}</p>
        </div>
        <div aria-live="polite">
          ${err
            ? html`<p class="text-sm rounded-lg p-2 bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]">
                ${err.code === 'client.requiredMissing' ? this.msg['feedbackRequired'] : this.msg['feedbackError']}
              </p>`
            : nothing}
        </div>
        <div class="flex">
          <button
            type="button"
            class=${BTN_PRIMARY}
            ?disabled=${loading || !draft.id}
            aria-busy=${loading ? 'true' : 'false'}
            @click=${() => {
              const id = draft.id;
              if (!id) return;
              this.cmdDevolverComMotivo(id).then(() => {
                if (this.cmdDevolverComMotivoStatus === 'success') this.setScenario('triagem');
              });
            }}
          >${loading ? this.msg['returnConfirming'] : this.msg['returnConfirm']}</button>
        </div>
      </div>
    `;
  }
}
