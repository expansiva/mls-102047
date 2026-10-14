/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page21/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { DespesaPendenteResumo } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  boardTitle: 'Despesas da equipe',
  boardHint: 'Escolha uma despesa para aprovar ou rejeitar.',
  analyseTitle: 'Analisar despesa',
  backLabel: 'Voltar às despesas',
  loadingQueue: 'Carregando as despesas pendentes…',
  queueError: 'Não foi possível carregar as despesas da equipe.',
  retry: 'Tentar novamente',
  emptyTitle: 'Nenhuma despesa da equipe aguarda a sua aprovação.',
  reload: 'Atualizar despesas',
  loadMore: 'Carregar mais despesas',
  statusDraft: 'Rascunho',
  statusAwaitingApproval: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  amount: 'Valor',
  description: 'Descrição',
  resubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  previousReason: 'Motivo da rejeição anterior',
  factsHeading: 'Dados da despesa',
  approve: 'Aprovar despesa',
  reject: 'Rejeitar despesa',
  reasonLabel: 'Motivo da rejeição',
  reasonHelper: 'Obrigatório para rejeitar a despesa.',
  reasonPlaceholder: 'Explique ao colaborador por que a despesa foi rejeitada',
  reasonRequired: 'Informe o motivo para rejeitar a despesa.',
  decisionFailed: 'Não foi possível registrar a decisão. Tente novamente.',
  approvedLine: 'Despesa aprovada. Ela segue para o financeiro.',
  rejectedLine: 'Despesa rejeitada com o motivo registrado.',
  otherLine: 'Esta despesa não está mais aguardando decisão.',
  loadingExpense: 'Carregando a despesa…',
  expenseError: 'Não foi possível carregar a despesa.',
};
const pageMessage_en_us = {
  boardTitle: 'Team expenses',
  boardHint: 'Pick an expense to approve or reject.',
  analyseTitle: 'Review expense',
  backLabel: 'Back to expenses',
  loadingQueue: 'Loading pending expenses…',
  queueError: 'The team expenses could not be loaded.',
  retry: 'Try again',
  emptyTitle: 'No team expense is waiting for your approval.',
  reload: 'Refresh expenses',
  loadMore: 'Load more expenses',
  statusDraft: 'Draft',
  statusAwaitingApproval: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  expenseDate: 'Expense date',
  category: 'Category',
  amount: 'Amount',
  description: 'Description',
  resubmitted: 'Resubmitted',
  yes: 'Yes',
  no: 'No',
  previousReason: 'Previous rejection reason',
  factsHeading: 'Expense details',
  approve: 'Approve expense',
  reject: 'Reject expense',
  reasonLabel: 'Rejection reason',
  reasonHelper: 'Required to reject the expense.',
  reasonPlaceholder: 'Tell the employee why the expense was rejected',
  reasonRequired: 'Enter the reason to reject the expense.',
  decisionFailed: 'The decision could not be recorded. Try again.',
  approvedLine: 'Expense approved. It now goes on to finance.',
  rejectedLine: 'Expense rejected with the reason recorded.',
  otherLine: 'This expense is no longer awaiting a decision.',
  loadingExpense: 'Loading the expense…',
  expenseError: 'The expense could not be loaded.',
};
const pageMessage_es_es = {
  boardTitle: 'Gastos del equipo',
  boardHint: 'Elige un gasto para aprobarlo o rechazarlo.',
  analyseTitle: 'Analizar gasto',
  backLabel: 'Volver a los gastos',
  loadingQueue: 'Cargando los gastos pendientes…',
  queueError: 'No se pudieron cargar los gastos del equipo.',
  retry: 'Intentar de nuevo',
  emptyTitle: 'Ningún gasto del equipo espera tu aprobación.',
  reload: 'Actualizar gastos',
  loadMore: 'Cargar más gastos',
  statusDraft: 'Borrador',
  statusAwaitingApproval: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  amount: 'Importe',
  description: 'Descripción',
  resubmitted: 'Reenvío realizado',
  yes: 'Sí',
  no: 'No',
  previousReason: 'Motivo del rechazo anterior',
  factsHeading: 'Datos del gasto',
  approve: 'Aprobar gasto',
  reject: 'Rechazar gasto',
  reasonLabel: 'Motivo del rechazo',
  reasonHelper: 'Obligatorio para rechazar el gasto.',
  reasonPlaceholder: 'Explica al colaborador por qué se rechazó el gasto',
  reasonRequired: 'Indica el motivo para rechazar el gasto.',
  decisionFailed: 'No se pudo registrar la decisión. Inténtalo de nuevo.',
  approvedLine: 'Gasto aprobado. Pasa ahora a finanzas.',
  rejectedLine: 'Gasto rechazado con el motivo registrado.',
  otherLine: 'Este gasto ya no espera una decisión.',
  loadingExpense: 'Cargando el gasto…',
  expenseError: 'No se pudo cargar el gasto.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

type ExpenseStatus = DespesaPendenteResumo['status'];

function statusClass(status: ExpenseStatus): string {
  switch (status) {
    case 'awaitingApproval':
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'approved':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'rejected':
      return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'paid':
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    default:
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function statusLabel(msg: PageMessageType, status: ExpenseStatus): string {
  switch (status) {
    case 'awaitingApproval':
      return msg.statusAwaitingApproval;
    case 'approved':
      return msg.statusApproved;
    case 'rejected':
      return msg.statusRejected;
    case 'paid':
      return msg.statusPaid;
    default:
      return msg.statusDraft;
  }
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const opts: Intl.DateTimeFormatOptions = { dateStyle: 'medium' };
  if (value.length === 10) opts.timeZone = 'UTC';
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, opts).format(d);
}

function textFromEvent(e: Event): string | null {
  const detail = (e as CustomEvent<{ value?: string }>).detail;
  if (detail && typeof detail.value === 'string') return detail.value;
  return null;
}

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]';

@customElement('reembolso-despesas--web--desktop--page21--despesas_da_equipe-102047')
export class ReembolsoDespesasDesktopPage21Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] p-6">
        <molecules--ml-scenary-102020
          mode="scenary"
          backLabel=${this.msg['backLabel']}
          .value=${this.scenary || 'board'}
          @change=${(e: CustomEvent<{ value: string }>) => {
            if (e.target === e.currentTarget) {
              this.setScenario(e.detail.value);
              if (e.detail.value === 'board') this.selectDespesa(null);
            }
          }}
        >
          <Scene value="board" title=${this.msg['boardTitle']}>${this.renderBoard()}</Scene>
          <Scene value="analise" title=${this.msg['analyseTitle']} nav="back" backTo="board">${this.renderPanel()}</Scene>
        </molecules--ml-scenary-102020>
      </div>
    `;
  }

  private renderBoard() {
    return html`
      <section data-organism-id="despesasPendentes" class="flex flex-col gap-5 pt-2">
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['boardHint']}</p>
        ${this.renderBoardBody()}
      </section>
    `;
  }

  private renderBoardBody() {
    const status = this.pageStatus;
    if (status === 'error') {
      return html`
        <div role="alert" class="flex flex-col items-start gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
          <p class="text-[var(--text-default,currentColor)]">${this.msg['queueError']}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.listarDespesasPendentesEquipe()}>
            <Label>${this.msg['retry']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    if (status === 'loading' || status === 'idle') {
      return html`
        <div aria-busy="true" aria-live="polite">
          <span class="sr-only">${this.msg['loadingQueue']}</span>
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-4">
            ${[0, 1, 2, 3, 4, 5].map(
              () => html`<div class="h-44 animate-pulse rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)]"></div>`,
            )}
          </div>
        </div>
      `;
    }
    const items = this.despesas?.items ?? [];
    if (status === 'empty' || items.length === 0) {
      return html`
        <div class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-6 py-16 text-center">
          <svg class="h-20 w-20 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M8 12.5l2.7 2.7L16 9.5"></path>
          </svg>
          <p class="text-lg text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</p>
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="lg"
            .loading=${this.listarDespesasPendentesEquipeStatus === 'loading'}
            @action=${() => this.listarDespesasPendentesEquipe()}
          >
            <Label>${this.msg['reload']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    return html`
      <div class="grid grid-cols-2 xl:grid-cols-3 gap-4">${items.map((d) => this.renderCard(d))}</div>
      ${this.despesas?.hasMore
        ? html`
            <div class="flex justify-center">
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                size="md"
                .loading=${this.listarDespesasPendentesEquipeStatus === 'loading'}
                @action=${() => this.listarDespesasPendentesEquipe(undefined, true)}
              >
                <Label>${this.msg['loadMore']}</Label>
              </grouptriggeraction--ml-button-standard>
            </div>
          `
        : nothing}
    `;
  }

  private renderCard(d: DespesaPendenteResumo) {
    const selected = this.selectedDespesa === d.id;
    const name = d.colaborador.details.identification.details.identification.name;
    return html`
      <button
        type="button"
        aria-pressed=${selected ? 'true' : 'false'}
        class="flex flex-col overflow-hidden rounded-xl border text-left transition hover:shadow-md ${FOCUS} ${selected
          ? 'border-[var(--selected-border,currentColor)] bg-[var(--selected-bg,transparent)] text-[var(--selected-text,currentColor)]'
          : 'border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] text-[var(--text-default,currentColor)]'}"
        @click=${() => {
          this.selectDespesa(d.id);
          this.setScenario('analise');
        }}
      >
        <span class="block w-full px-4 py-2 text-sm font-semibold uppercase tracking-wide ${statusClass(d.status)}">${statusLabel(this.msg, d.status)}</span>
        <span class="flex flex-col gap-1 p-4">
          <span class="text-base font-medium text-[var(--text-strong,currentColor)]">${name}</span>
          <span class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span>
          <span class="mt-2 flex flex-wrap items-center gap-x-3 text-sm text-[var(--text-muted,currentColor)]">
            <span>${formatDate(d.details.details.dataDespesa)}</span>
            <span>${d.details.details.categoria}</span>
          </span>
        </span>
      </button>
    `;
  }

  private renderPanel() {
    const d = this.despesa;
    if (this.obterDespesaParaAnaliseStatus === 'error') {
      return html`
        <div role="alert" class="flex flex-col items-start gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
          <p>${this.msg['expenseError']}</p>
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="md"
            @action=${() => this.selectDespesa(this.selectedDespesa)}
          >
            <Label>${this.msg['retry']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    }
    if (!d || this.obterDespesaParaAnaliseStatus === 'loading') {
      return html`
        <div aria-busy="true" aria-live="polite" class="max-w-3xl">
          <p class="text-[var(--text-muted,currentColor)]">${this.msg['loadingExpense']}</p>
          <div class="mt-3 h-40 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
        </div>
      `;
    }
    return html`
      <div class="flex max-w-3xl flex-col gap-6 pt-2">
        ${this.renderDecision()} ${this.renderFacts()}
      </div>
    `;
  }

  private renderDecision() {
    const d = this.despesa;
    if (!d) return nothing;
    const name = d.colaborador.details.identification.details.identification.name;
    const busy = this.aprovarDespesaStatus === 'loading' || this.rejeitarDespesaStatus === 'loading';
    const failed = this.aprovarDespesaError || this.rejeitarDespesaError;
    const reasonMissing = this.rejeitarDespesaError?.code === 'client.requiredMissing';
    const pending = d.status === 'awaitingApproval';
    return html`
      <section data-organism-id="decisaoDespesa" class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <div class="px-5 py-2 text-sm font-semibold uppercase tracking-wide ${statusClass(d.status)}">${statusLabel(this.msg, d.status)}</div>
        <div class="flex flex-col gap-4 p-5">
          <div class="flex items-baseline justify-between gap-4">
            <span class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${name}</span>
            <span class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span>
          </div>
          ${pending
            ? html`
                <div aria-live="polite">
                  ${failed && !reasonMissing
                    ? html`<p role="alert" class="rounded-lg border border-[var(--border-default,currentColor)] p-3 text-[var(--text-default,currentColor)]">${this.msg['decisionFailed']}</p>`
                    : nothing}
                </div>
                <div class="flex gap-3">
                  <div class="flex-1">
                    <grouptriggeraction--ml-button-standard
                      data-variant="primary"
                      size="lg"
                      data-class="w-full"
                      .loading=${this.aprovarDespesaStatus === 'loading'}
                      .disabled=${busy}
                      @action=${() => this.aprovarDespesa()}
                    >
                      <Label>${this.msg['approve']}</Label>
                    </grouptriggeraction--ml-button-standard>
                  </div>
                  <div class="flex-1">
                    <grouptriggeraction--ml-button-standard
                      data-variant="danger"
                      size="lg"
                      data-class="w-full"
                      .loading=${this.rejeitarDespesaStatus === 'loading'}
                      .disabled=${busy}
                      @action=${() => this.rejeitarDespesa()}
                    >
                      <Label>${this.msg['reject']}</Label>
                    </grouptriggeraction--ml-button-standard>
                  </div>
                </div>
                <groupentertext--ml-multiline-text
                  rows="3"
                  required
                  .value=${this.rejeitarDespesaDraft.motivoRejeicao ?? ''}
                  .error=${reasonMissing ? this.msg['reasonRequired'] : ''}
                  .disabled=${busy}
                  placeholder=${this.msg['reasonPlaceholder']}
                  @input=${(e: Event) => {
                    const v = textFromEvent(e);
                    if (v !== null) this.setRejeitarDespesaDraft({ motivoRejeicao: v });
                  }}
                  @change=${(e: Event) => {
                    const v = textFromEvent(e);
                    if (v !== null) this.setRejeitarDespesaDraft({ motivoRejeicao: v });
                  }}
                >
                  <Label>${this.msg['reasonLabel']}</Label>
                  <Helper>${this.msg['reasonHelper']}</Helper>
                </groupentertext--ml-multiline-text>
              `
            : html`
                <groupnotifyuser--ml-contextual-feedback
                  .type=${d.status === 'approved' ? 'success' : d.status === 'rejected' ? 'warning' : 'info'}
                  .visible=${true}
                  .dismissible=${false}
                >
                  <Message>${d.status === 'approved' ? this.msg['approvedLine'] : d.status === 'rejected' ? this.msg['rejectedLine'] : this.msg['otherLine']}</Message>
                </groupnotifyuser--ml-contextual-feedback>
              `}
        </div>
      </section>
    `;
  }

  private renderFacts() {
    const d = this.despesa;
    if (!d) return nothing;
    const f = d.details.details;
    return html`
      <section data-organism-id="analiseDespesa" class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
        <h3 class="mb-4 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['factsHeading']}</h3>
        <dl class="grid grid-cols-3 gap-x-6 gap-y-4">
          <div>
            <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['expenseDate']}</dt>
            <dd class="text-[var(--text-strong,currentColor)]">${formatDate(f.dataDespesa)}</dd>
          </div>
          <div>
            <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['category']}</dt>
            <dd class="text-[var(--text-strong,currentColor)]">${f.categoria}</dd>
          </div>
          <div>
            <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['resubmitted']}</dt>
            <dd class="text-[var(--text-strong,currentColor)]">${f.reenvioRealizado ? this.msg['yes'] : this.msg['no']}</dd>
          </div>
          <div class="col-span-3">
            <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['description']}</dt>
            <dd class="whitespace-pre-line text-[var(--text-strong,currentColor)]">${f.descricao}</dd>
          </div>
          ${f.motivoRejeicao
            ? html`
                <div class="col-span-3">
                  <dt class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['previousReason']}</dt>
                  <dd class="whitespace-pre-line text-[var(--text-strong,currentColor)]">${f.motivoRejeicao}</dd>
                </div>
              `
            : nothing}
        </dl>
      </section>
    `;
  }
}
