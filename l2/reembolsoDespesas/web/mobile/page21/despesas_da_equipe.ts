/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page21/despesas_da_equipe.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasDespesas_da_equipeShared } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import type { DespesaPendenteResumo, DespesaAnalise, ErrorState } from '/_102047_/l2/reembolsoDespesas/web/shared/despesas_da_equipe.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102020_/l2/molecules/ml-scenary.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  queueTitle: 'Despesas da equipe',
  analysisTitle: 'Analisar despesa',
  back: 'Voltar às despesas',
  loading: 'Carregando',
  queueError: 'Não foi possível carregar as despesas pendentes.',
  detailError: 'Não foi possível abrir esta despesa.',
  retry: 'Tentar novamente',
  emptyTitle: 'Nenhuma despesa aguardando sua decisão.',
  reload: 'Atualizar lista',
  loadMore: 'Carregar mais despesas',
  analyze: 'Analisar despesa de',
  approve: 'Aprovar',
  reject: 'Rejeitar',
  decisionGroup: 'Decisão sobre a despesa',
  reasonLabel: 'Motivo da rejeição',
  reasonHelper: 'Obrigatório para rejeitar a despesa.',
  reasonPlaceholder: 'Explique ao colaborador o que precisa ser corrigido',
  reasonRequired: 'Informe o motivo para rejeitar a despesa.',
  decisionError: 'Não foi possível registrar a decisão.',
  approvedLine: 'Despesa aprovada. Ela segue para o financeiro.',
  rejectedLine: 'Despesa rejeitada. O colaborador verá o motivo informado.',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  amount: 'Valor',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  description: 'Descrição',
  resubmitted: 'Reenvio realizado',
  yes: 'Sim',
  no: 'Não',
  previousReason: 'Motivo da rejeição anterior',
  collaborator: 'Colaborador'
};
const pageMessage_en_us = {
  queueTitle: 'Team expenses',
  analysisTitle: 'Review expense',
  back: 'Back to expenses',
  loading: 'Loading',
  queueError: 'Could not load the pending expenses.',
  detailError: 'Could not open this expense.',
  retry: 'Try again',
  emptyTitle: 'No expenses waiting for your decision.',
  reload: 'Refresh list',
  loadMore: 'Load more expenses',
  analyze: 'Review expense from',
  approve: 'Approve',
  reject: 'Reject',
  decisionGroup: 'Decision on the expense',
  reasonLabel: 'Rejection reason',
  reasonHelper: 'Required to reject the expense.',
  reasonPlaceholder: 'Tell the employee what needs to be fixed',
  reasonRequired: 'Enter the reason to reject the expense.',
  decisionError: 'Could not register the decision.',
  approvedLine: 'Expense approved. It moves on to finance.',
  rejectedLine: 'Expense rejected. The employee will see the reason.',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  amount: 'Amount',
  expenseDate: 'Expense date',
  category: 'Category',
  description: 'Description',
  resubmitted: 'Resubmitted',
  yes: 'Yes',
  no: 'No',
  previousReason: 'Previous rejection reason',
  collaborator: 'Employee'
};
const pageMessage_es_es = {
  queueTitle: 'Gastos del equipo',
  analysisTitle: 'Analizar gasto',
  back: 'Volver a los gastos',
  loading: 'Cargando',
  queueError: 'No se pudieron cargar los gastos pendientes.',
  detailError: 'No se pudo abrir este gasto.',
  retry: 'Intentar de nuevo',
  emptyTitle: 'Ningún gasto espera tu decisión.',
  reload: 'Actualizar lista',
  loadMore: 'Cargar más gastos',
  analyze: 'Analizar gasto de',
  approve: 'Aprobar',
  reject: 'Rechazar',
  decisionGroup: 'Decisión sobre el gasto',
  reasonLabel: 'Motivo del rechazo',
  reasonHelper: 'Obligatorio para rechazar el gasto.',
  reasonPlaceholder: 'Explica al colaborador qué debe corregir',
  reasonRequired: 'Indica el motivo para rechazar el gasto.',
  decisionError: 'No se pudo registrar la decisión.',
  approvedLine: 'Gasto aprobado. Pasa a finanzas.',
  rejectedLine: 'Gasto rechazado. El colaborador verá el motivo.',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  amount: 'Importe',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  description: 'Descripción',
  resubmitted: 'Reenvío realizado',
  yes: 'Sí',
  no: 'No',
  previousReason: 'Motivo del rechazo anterior',
  collaborator: 'Colaborador'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

type Status = DespesaPendenteResumo['status'];

function statusLabel(msg: PageMessageType, status: Status) {
  switch (status) {
    case 'draft': return msg.statusDraft;
    case 'awaitingApproval': return msg.statusAwaiting;
    case 'rejected': return msg.statusRejected;
    case 'approved': return msg.statusApproved;
    case 'paid': return msg.statusPaid;
  }
}

function stripClass(status: Status) {
  switch (status) {
    case 'awaitingApproval': return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    case 'approved': return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'rejected': return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'paid': return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    default: return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
  }
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium', timeZone: 'UTC' }).format(d);
}

function personName(c: DespesaPendenteResumo['colaborador']) {
  return c.details.identification.details.identification.name;
}

@customElement('reembolso-despesas--web--mobile--page21--despesas_da_equipe-102047')
export class ReembolsoDespesasMobilePage21Despesas_da_equipePage extends ReembolsoDespesasDespesas_da_equipeShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    return html`
      <div class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <div class="mx-auto w-full max-w-[430px] px-4 py-4">
          <molecules--ml-scenary-102020
            mode="scenary"
            .backLabel=${this.msg.back}
            .value=${this.scenary || 'fila'}
            @change=${(e: CustomEvent<{ value: string }>) => {
              if (e.target === e.currentTarget) this.setScenario(e.detail.value);
            }}
          >
            <Scene value="fila" title=${this.msg.queueTitle}>${this.renderBoard()}</Scene>
            <Scene value="analise" title=${this.msg.analysisTitle} nav="back">${this.renderAnalysis()}</Scene>
          </molecules--ml-scenary-102020>
        </div>
      </div>
    `;
  }

  private renderSkeletonCards() {
    return html`
      <ul class="flex flex-col gap-3" aria-busy="true" aria-label=${this.msg.loading}>
        ${[0, 1, 2].map(() => html`
          <li class="h-32 animate-pulse rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)]"></li>
        `)}
      </ul>
    `;
  }

  private renderCard(d: DespesaPendenteResumo) {
    const name = personName(d.colaborador);
    const selected = this.selectedDespesa === d.id;
    return html`
      <li>
        <button
          type="button"
          aria-label=${`${this.msg.analyze} ${name}`}
          aria-pressed=${selected ? 'true' : 'false'}
          class="block w-full min-h-[44px] overflow-hidden rounded-xl border text-left bg-[var(--surface-bg,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] ${selected ? 'border-[var(--selected-border,currentColor)]' : 'border-[var(--border-default,currentColor)]'}"
          @click=${() => {
            this.selectDespesa(d.id);
            this.setScenario('analise');
          }}
        >
          <span class="block w-full px-4 py-2 text-xs font-semibold uppercase tracking-wide ${stripClass(d.status)}">${statusLabel(this.msg, d.status)}</span>
          <span class="flex items-end justify-between gap-3 px-4 py-3">
            <span class="min-w-0">
              <span class="block truncate text-base font-semibold text-[var(--text-strong,currentColor)]">${name}</span>
              <span class="block truncate text-sm text-[var(--text-muted,currentColor)]">${d.details.details.categoria}</span>
              <span class="block text-sm text-[var(--text-muted,currentColor)]">${formatDate(d.details.details.dataDespesa)}</span>
            </span>
            <span class="shrink-0 text-2xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</span>
          </span>
        </button>
      </li>
    `;
  }

  private renderBoard() {
    const items = this.despesas?.items ?? [];
    let body;
    if (this.pageStatus === 'loading' || this.pageStatus === 'idle') {
      body = this.renderSkeletonCards();
    } else if (this.pageStatus === 'error') {
      body = html`
        <div class="flex flex-col items-center gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-center" aria-live="polite">
          <p>${this.listarDespesasPendentesEquipeError?.message || this.msg.queueError}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" @action=${() => this.listarDespesasPendentesEquipe()}>
            <Label>${this.msg.retry}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    } else if (this.pageStatus === 'empty') {
      body = html`
        <div class="flex flex-col items-center gap-4 px-4 py-16 text-center">
          <svg class="h-24 w-24 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
          </svg>
          <p class="text-lg text-[var(--text-strong,currentColor)]">${this.msg.emptyTitle}</p>
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" @action=${() => this.listarDespesasPendentesEquipe()}>
            <Label>${this.msg.reload}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      `;
    } else {
      const loadingMore = this.listarDespesasPendentesEquipeStatus === 'loading';
      body = html`
        <ul class="flex flex-col gap-3">${items.map((d) => this.renderCard(d))}</ul>
        ${this.despesas?.hasMore
          ? html`
              <button
                type="button"
                class="mt-4 min-h-[48px] w-full rounded-xl border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50"
                ?disabled=${loadingMore}
                aria-busy=${loadingMore ? 'true' : 'false'}
                @click=${() => this.listarDespesasPendentesEquipe(undefined, true)}
              >${loadingMore ? this.msg.loading : this.msg.loadMore}</button>
            `
          : nothing}
      `;
    }
    return html`<div data-organism-id="despesasPendentes">${body}</div>`;
  }

  private errorLine(error: ErrorState, retry: () => void) {
    if (!error) return nothing;
    const text = error.code === 'client.requiredMissing' ? this.msg.reasonRequired : (error.message || this.msg.decisionError);
    return html`
      <div class="mb-3 flex items-center justify-between gap-3 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3 text-sm text-[var(--text-default,currentColor)]" aria-live="polite">
        <span>${text}</span>
        ${error.code === 'client.requiredMissing'
          ? nothing
          : html`<button type="button" class="min-h-[44px] shrink-0 px-2 text-[var(--link-text,currentColor)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${retry}>${this.msg.retry}</button>`}
      </div>
    `;
  }

  private renderDecision(d: DespesaAnalise) {
    const approving = this.aprovarDespesaStatus === 'loading';
    const rejecting = this.rejeitarDespesaStatus === 'loading';
    const busy = approving || rejecting;
    let body;
    if (this.aprovarDespesaStatus === 'success') {
      body = html`<p class="rounded-lg p-4 font-medium bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]" aria-live="polite">${this.msg.approvedLine}</p>`;
    } else if (this.rejeitarDespesaStatus === 'success') {
      body = html`<p class="rounded-lg p-4 font-medium bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]" aria-live="polite">${this.msg.rejectedLine}</p>`;
    } else {
      body = html`
        ${this.errorLine(this.aprovarDespesaError, () => this.aprovarDespesa())}
        ${this.errorLine(this.rejeitarDespesaError, () => this.rejeitarDespesa())}
        <div class="grid grid-cols-2 gap-3" role="group" aria-label=${this.msg.decisionGroup}>
          <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full min-h-[56px]" ?loading=${approving} ?disabled=${busy} @action=${() => this.aprovarDespesa()}>
            <Label>${this.msg.approve}</Label>
          </grouptriggeraction--ml-button-standard>
          <grouptriggeraction--ml-button-standard data-variant="danger" size="lg" data-class="w-full min-h-[56px]" ?loading=${rejecting} ?disabled=${busy} @action=${() => this.rejeitarDespesa()}>
            <Label>${this.msg.reject}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
        <div class="mt-3">
          <groupentertext--ml-multiline-text
            rows="3"
            .value=${this.rejeitarDespesaDraft.motivoRejeicao ?? ''}
            placeholder=${this.msg.reasonPlaceholder}
            ?disabled=${busy}
            @input=${(e: CustomEvent<{ value: string }>) => this.setRejeitarDespesaDraft({ motivoRejeicao: e.detail.value })}
          >
            <Label>${this.msg.reasonLabel}</Label>
            <Helper>${this.msg.reasonHelper}</Helper>
          </groupentertext--ml-multiline-text>
        </div>
      `;
    }
    return html`
      <div data-organism-id="decisaoDespesa" class="mb-6">
        <div class="mb-4 overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <p class="px-4 py-2 text-xs font-semibold uppercase tracking-wide ${stripClass(d.status)}">${statusLabel(this.msg, d.status)}</p>
          <div class="flex items-end justify-between gap-3 px-4 py-3">
            <div class="min-w-0">
              <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.collaborator}</p>
              <p class="truncate text-lg font-semibold text-[var(--text-strong,currentColor)]">${personName(d.colaborador)}</p>
            </div>
            <p class="shrink-0 text-3xl font-bold text-[var(--text-strong,currentColor)]">${d.details.details.valor}</p>
          </div>
        </div>
        ${body}
      </div>
    `;
  }

  private renderFacts(d: DespesaAnalise) {
    const f = d.details.details;
    const row = (label: string, value: unknown) => html`
      <div class="border-b border-[var(--border-subtle,currentColor)] py-3 last:border-b-0">
        <dt class="text-xs text-[var(--text-muted,currentColor)]">${label}</dt>
        <dd class="mt-1 whitespace-pre-line text-base text-[var(--text-strong,currentColor)]">${value}</dd>
      </div>
    `;
    return html`
      <div data-organism-id="analiseDespesa">
        <dl class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-4">
          ${row(this.msg.amount, f.valor)}
          ${row(this.msg.expenseDate, formatDate(f.dataDespesa))}
          ${row(this.msg.category, f.categoria)}
          ${row(this.msg.description, f.descricao)}
          ${row(this.msg.resubmitted, f.reenvioRealizado ? this.msg.yes : this.msg.no)}
          ${f.motivoRejeicao ? row(this.msg.previousReason, f.motivoRejeicao) : nothing}
        </dl>
      </div>
    `;
  }

  private renderAnalysis() {
    if (this.obterDespesaParaAnaliseStatus === 'loading') {
      return html`
        <div data-organism-id="decisaoDespesa" aria-busy="true" aria-label=${this.msg.loading}>
          <div class="h-28 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
          <div class="mt-4 h-14 animate-pulse rounded-xl bg-[var(--surface-alt-bg,transparent)]"></div>
        </div>
        <div data-organism-id="analiseDespesa"></div>
      `;
    }
    if (this.obterDespesaParaAnaliseStatus === 'error') {
      const id = this.selectedDespesa;
      return html`
        <div data-organism-id="decisaoDespesa" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-center" aria-live="polite">
          <p class="mb-3">${this.obterDespesaParaAnaliseError?.message || this.msg.detailError}</p>
          ${id
            ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" @action=${() => this.obterDespesaParaAnalise(id)}>
                <Label>${this.msg.retry}</Label>
              </grouptriggeraction--ml-button-standard>`
            : nothing}
        </div>
        <div data-organism-id="analiseDespesa"></div>
      `;
    }
    const d = this.despesa;
    if (!d) {
      return html`<div data-organism-id="decisaoDespesa"></div><div data-organism-id="analiseDespesa"></div>`;
    }
    return html`${this.renderDecision(d)}${this.renderFacts(d)}`;
  }
}
