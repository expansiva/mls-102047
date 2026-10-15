/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Despesas da equipe',
  boardHint: 'Toque em uma despesa para decidir.',
  analyseTitle: 'Analisar despesa',
  back: 'Voltar à fila',
  loadingQueue: 'Carregando despesas…',
  loadingDetail: 'Carregando a despesa…',
  emptyTitle: 'Nenhuma despesa aguardando a sua decisão.',
  emptyAction: 'Atualizar a fila',
  errorQueue: 'Não foi possível carregar as despesas.',
  errorDetail: 'Não foi possível abrir a despesa.',
  retry: 'Tentar novamente',
  loadMore: 'Ver mais despesas',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  approve: 'Aprovar',
  reject: 'Rejeitar',
  reasonLabel: 'Motivo da rejeição',
  reasonHelper: 'Obrigatório para rejeitar.',
  reasonPlaceholder: 'Explique o que precisa ser corrigido',
  reasonRequired: 'Informe o motivo para rejeitar a despesa.',
  decisionFailed: 'Não foi possível registrar a decisão. Toque novamente para tentar.',
  approvedDone: 'Despesa aprovada. Ela segue para o financeiro.',
  rejectedDone: 'Despesa rejeitada com o motivo informado.',
  notPending: 'Esta despesa não está mais aguardando decisão.',
  noSelection: 'Escolha uma despesa na fila para analisar.',
  collaborator: 'Colaborador',
  amount: 'Valor',
  date: 'Data da despesa',
  category: 'Categoria',
  description: 'Descrição',
  resubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  previousReason: 'Motivo da rejeição anterior',
};
const pageMessage_en_us: PageMessageType = {
  pageTitle: 'Team expenses',
  boardHint: 'Tap an expense to decide.',
  analyseTitle: 'Review expense',
  back: 'Back to the queue',
  loadingQueue: 'Loading expenses…',
  loadingDetail: 'Loading the expense…',
  emptyTitle: 'No expenses are waiting for your decision.',
  emptyAction: 'Refresh the queue',
  errorQueue: 'The expenses could not be loaded.',
  errorDetail: 'The expense could not be opened.',
  retry: 'Try again',
  loadMore: 'Show more expenses',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  approve: 'Approve',
  reject: 'Reject',
  reasonLabel: 'Rejection reason',
  reasonHelper: 'Required to reject.',
  reasonPlaceholder: 'Explain what needs to be corrected',
  reasonRequired: 'Enter the reason to reject the expense.',
  decisionFailed: 'The decision could not be recorded. Tap again to retry.',
  approvedDone: 'Expense approved. It moves on to finance.',
  rejectedDone: 'Expense rejected with the reason given.',
  notPending: 'This expense is no longer waiting for a decision.',
  noSelection: 'Choose an expense in the queue to review.',
  collaborator: 'Employee',
  amount: 'Amount',
  date: 'Expense date',
  category: 'Category',
  description: 'Description',
  resubmitted: 'Resubmitted',
  yes: 'Yes',
  no: 'No',
  previousReason: 'Previous rejection reason',
};
const pageMessage_es_es: PageMessageType = {
  pageTitle: 'Gastos del equipo',
  boardHint: 'Toca un gasto para decidir.',
  analyseTitle: 'Revisar gasto',
  back: 'Volver a la cola',
  loadingQueue: 'Cargando gastos…',
  loadingDetail: 'Cargando el gasto…',
  emptyTitle: 'Ningún gasto espera tu decisión.',
  emptyAction: 'Actualizar la cola',
  errorQueue: 'No se pudieron cargar los gastos.',
  errorDetail: 'No se pudo abrir el gasto.',
  retry: 'Intentar de nuevo',
  loadMore: 'Ver más gastos',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  approve: 'Aprobar',
  reject: 'Rechazar',
  reasonLabel: 'Motivo del rechazo',
  reasonHelper: 'Obligatorio para rechazar.',
  reasonPlaceholder: 'Explica qué hay que corregir',
  reasonRequired: 'Indica el motivo para rechazar el gasto.',
  decisionFailed: 'No se pudo registrar la decisión. Toca de nuevo para reintentar.',
  approvedDone: 'Gasto aprobado. Pasa a finanzas.',
  rejectedDone: 'Gasto rechazado con el motivo indicado.',
  notPending: 'Este gasto ya no espera una decisión.',
  noSelection: 'Elige un gasto de la cola para revisar.',
  collaborator: 'Colaborador',
  amount: 'Importe',
  date: 'Fecha del gasto',
  category: 'Categoría',
  description: 'Descripción',
  resubmitted: 'Reenvío realizado',
  yes: 'Sí',
  no: 'No',
  previousReason: 'Motivo del rechazo anterior',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

function statusClasses(status: string): string {
  switch (status) {
    case 'awaitingApproval':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'rejected':
      return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'approved':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'paid':
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function statusLabel(msg: PageMessageType, status: string): string {
  switch (status) {
    case 'awaitingApproval': return msg.statusAwaiting;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
    default: return msg.statusDraft;
  }
}

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function fmtMoney(value: string): string {
  const n = Number(value);
  if (value === '' || !Number.isFinite(n)) return value;
  return new Intl.NumberFormat(lang(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function fmtDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { dateStyle: 'medium', timeZone: value.length === 10 ? 'UTC' : undefined }).format(d);
}

@customElement('reembolso-despesas--web--mobile--page31--despesas_da_equipe-102047')
export class ReembolsoDespesasMobilePage31Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private renderSkeleton(label: string) {
    return html`
      <div aria-busy="true" aria-live="polite" class="flex flex-col gap-3">
        <span class="sr-only">${label}</span>
        ${[0, 1, 2].map(() => html`
          <div class="animate-pulse overflow-hidden rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
            <div class="h-7 w-full bg-[var(--surface-alt-bg,transparent)]"></div>
            <div class="flex flex-col gap-2 p-4">
              <div class="h-4 w-2/3 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
              <div class="h-7 w-1/3 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            </div>
          </div>`)}
      </div>`;
  }

  private renderBoard() {
    const items = this.despesas?.items ?? [];
    const hasMore = this.despesas?.hasMore ?? false;
    const loadingMore = this.listarDespesasPendentesEquipeStatus === 'loading';

    if (this.pageStatus === 'loading' || this.pageStatus === 'idle') {
      return this.renderSkeleton(this.msg.loadingQueue);
    }
    if (this.pageStatus === 'error') {
      return html`
        <div role="alert" class="flex flex-col items-start gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
          <p>${this.msg.errorQueue}</p>
          ${this.listarDespesasPendentesEquipeError ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.listarDespesasPendentesEquipeError.message}</p>` : nothing}
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" .loading=${loadingMore}
            @action=${() => this.listarDespesasPendentesEquipe()}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    if (this.pageStatus === 'empty' || items.length === 0) {
      return html`
        <div class="flex flex-col items-center gap-4 px-4 py-16 text-center">
          <svg class="h-20 w-20 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M8 12.5l2.7 2.7L16 9.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <p class="text-lg text-[var(--text-strong,currentColor)]">${this.msg.emptyTitle}</p>
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .loading=${loadingMore}
            @action=${() => this.listarDespesasPendentesEquipe()}>
            <Label>${this.msg.emptyAction}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    return html`
      <ul class="flex flex-col gap-3">
        ${items.map((d) => html`
          <li class="overflow-hidden rounded-xl border ${d.id === this.selectedDespesa ? 'border-[var(--selected-border,currentColor)]' : 'border-[var(--border-default,currentColor)]'} bg-[var(--surface-bg,transparent)]">
            <div class="w-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${statusClasses(d.status)}">${statusLabel(this.msg, d.status)}</div>
            <button type="button"
              class="flex min-h-[44px] w-full flex-col gap-2 p-4 text-left text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
              @click=${() => { this.selectDespesa(d.id); this.setScenario('analise'); }}>
              <span class="flex items-center justify-between gap-2">
                <span class="truncate text-base font-semibold text-[var(--text-strong,currentColor)]">${d.colaborador.details.identification.details.identification.name}</span>
                <span aria-hidden="true" class="text-xl text-[var(--text-muted,currentColor)]">›</span>
              </span>
              <span class="flex items-end justify-between gap-3">
                <span class="text-2xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(d.details.details.valor)}</span>
                <span class="text-right text-sm text-[var(--text-muted,currentColor)]">
                  <span class="block">${d.details.details.categoria}</span>
                  <span class="block">${fmtDate(d.details.details.dataDespesa)}</span>
                </span>
              </span>
            </button>
          </li>`)}
      </ul>
      ${hasMore ? html`
        <div class="mt-4 flex justify-center">
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" .loading=${loadingMore}
            @action=${() => this.listarDespesasPendentesEquipe(undefined, true)}>
            <Label>${this.msg.loadMore}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>` : nothing}`;
  }

  private renderDecision() {
    const d = this.despesa;
    if (!d) return nothing;
    const approving = this.aprovarDespesaStatus === 'loading';
    const rejecting = this.rejeitarDespesaStatus === 'loading';
    const busy = approving || rejecting;
    const done = this.aprovarDespesaStatus === 'success' ? this.msg.approvedDone
      : this.rejeitarDespesaStatus === 'success' ? this.msg.rejectedDone : '';
    const error = this.aprovarDespesaError ?? this.rejeitarDespesaError;
    const requiredMissing = this.rejeitarDespesaError?.code === 'client.requiredMissing';

    if (done) {
      return html`
        <groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
          <Message>${done}</Message>
        </groupnotifyuser--ml-contextual-feedback>`;
    }
    if (d.status !== 'awaitingApproval') {
      return html`
        <groupnotifyuser--ml-contextual-feedback type="info" .visible=${true} .dismissible=${false}>
          <Message>${this.msg.notPending}</Message>
        </groupnotifyuser--ml-contextual-feedback>`;
    }
    return html`
      <div class="flex flex-col gap-3">
        ${error ? html`
          <p role="alert" aria-live="polite" class="text-[var(--text-default,currentColor)]">
            ${requiredMissing ? this.msg.reasonRequired : this.msg.decisionFailed}
          </p>` : nothing}
        <div class="grid grid-cols-2 gap-3">
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full"
            .loading=${approving} .disabled=${busy}
            @action=${() => this.aprovarDespesa()}>
            <Label>${this.msg.approve}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="danger" size="lg" data-class="w-full"
            .loading=${rejecting} .disabled=${busy}
            @action=${() => this.rejeitarDespesa()}>
            <Label>${this.msg.reject}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
        <groupentertext--ml-multiline-text
          .rows=${3}
          .value=${this.rejeitarDespesaDraft.motivoRejeicao ?? ''}
          .error=${requiredMissing ? this.msg.reasonRequired : ''}
          .disabled=${busy}
          placeholder=${this.msg.reasonPlaceholder}
          @input=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget && e.detail) this.setRejeitarDespesaDraft({ motivoRejeicao: e.detail.value });
          }}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget && e.detail) this.setRejeitarDespesaDraft({ motivoRejeicao: e.detail.value });
          }}>
          <Label>${this.msg.reasonLabel}</Label>
          <Helper>${this.msg.reasonHelper}</Helper>
        </groupentertext--ml-multiline-text>
      </div>`;
  }

  private renderAnalysis() {
    const d = this.despesa;
    if (this.obterDespesaParaAnaliseStatus === 'loading') {
      return this.renderSkeleton(this.msg.loadingDetail);
    }
    if (this.obterDespesaParaAnaliseStatus === 'error') {
      return html`
        <div role="alert" class="flex flex-col items-start gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
          <p>${this.msg.errorDetail}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg"
            @action=${() => { if (this.selectedDespesa) void this.obterDespesaParaAnalise(this.selectedDespesa); }}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    if (!d) {
      return html`<p class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg.noSelection}</p>`;
    }
    const x = d.details.details;
    return html`
      <div class="flex flex-col gap-4">
        <div class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <div class="w-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${statusClasses(d.status)}">${statusLabel(this.msg, d.status)}</div>
          <div class="p-4">
            <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.collaborator}</p>
            <p class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${d.colaborador.details.identification.details.identification.name}</p>
          </div>
        </div>

        <div data-organism-id="decisaoDespesa">${this.renderDecision()}</div>

        <div data-organism-id="analiseDespesa" class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4 text-[var(--text-default,currentColor)]">
          <dl class="flex flex-col gap-4">
            <div>
              <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.amount}</dt>
              <dd class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${fmtMoney(x.valor)}</dd>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.date}</dt>
                <dd>${fmtDate(x.dataDespesa)}</dd>
              </div>
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.category}</dt>
                <dd>${x.categoria}</dd>
              </div>
            </div>
            <div>
              <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.description}</dt>
              <dd class="whitespace-pre-line break-words">${x.descricao}</dd>
            </div>
            <div>
              <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.resubmitted}</dt>
              <dd>${x.reenvioRealizado ? this.msg.yes : this.msg.no}</dd>
            </div>
            ${x.motivoRejeicao ? html`
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.previousReason}</dt>
                <dd class="whitespace-pre-line break-words">${x.motivoRejeicao}</dd>
              </div>` : nothing}
          </dl>
        </div>
      </div>`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <molecules--ml-scenary-102020
          mode="scenary"
          .value=${this.scenary || 'board'}
          .backLabel=${this.msg.back}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'board') this.selectDespesa(null);
            }
          }}>
          <Scene value="board" title=${this.msg.pageTitle}>
            <div class="mx-auto flex w-full max-w-[430px] flex-col gap-3 px-4 pb-8 pt-2">
              <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.boardHint}</p>
              <div data-organism-id="despesasPendentes">${this.renderBoard()}</div>
            </div>
          </Scene>
          <Scene value="analise" title=${this.msg.analyseTitle} nav="back" backTo="board">
            <div class="mx-auto w-full max-w-[430px] px-4 pb-8 pt-2">
              ${this.renderAnalysis()}
            </div>
          </Scene>
        </molecules--ml-scenary-102020>
      </div>`;
  }
}
