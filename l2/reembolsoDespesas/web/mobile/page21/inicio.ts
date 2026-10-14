/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page21/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Decisões pendentes',
  metricLabel: 'Despesas aguardando decisão',
  metricHelper: 'Despesas da sua equipe',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando decisão',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  resubmitted: 'Reenvio',
  registeredBy: 'Registrada por',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  amount: 'Valor',
  analyse: 'Analisar e decidir',
  loadMore: 'Carregar mais despesas',
  loading: 'Carregando despesas…',
  emptyText: 'Nenhuma despesa da equipe espera sua decisão.',
  refresh: 'Atualizar',
  errorText: 'Não foi possível carregar as despesas.',
  retry: 'Tentar novamente'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessage_en_us: PageMessageType = {
  pageTitle: 'Pending decisions',
  metricLabel: 'Expenses awaiting decision',
  metricHelper: 'Your team expenses',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting decision',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  resubmitted: 'Resubmitted',
  registeredBy: 'Registered by',
  expenseDate: 'Expense date',
  category: 'Category',
  amount: 'Amount',
  analyse: 'Review and decide',
  loadMore: 'Load more expenses',
  loading: 'Loading expenses…',
  emptyText: 'No team expense is waiting for your decision.',
  refresh: 'Refresh',
  errorText: 'The expenses could not be loaded.',
  retry: 'Try again'
};
const pageMessage_es_es: PageMessageType = {
  pageTitle: 'Decisiones pendientes',
  metricLabel: 'Gastos pendientes de decisión',
  metricHelper: 'Gastos de tu equipo',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de decisión',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  resubmitted: 'Reenvío',
  registeredBy: 'Registrado por',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  amount: 'Importe',
  analyse: 'Analizar y decidir',
  loadMore: 'Cargar más gastos',
  loading: 'Cargando gastos…',
  emptyText: 'Ningún gasto del equipo espera tu decisión.',
  refresh: 'Actualizar',
  errorText: 'No se pudieron cargar los gastos.',
  retry: 'Intentar de nuevo'
};
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es
};
/// **collab_i18n_end**

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function formatDate(value: string): string {
  if (!value) return '';
  const d = new Date(value.length === 10 ? value + 'T00:00:00' : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

@customElement('reembolso-despesas--web--mobile--page21--inicio-102047')
export class ReembolsoDespesasMobilePage21InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(item: DespesaPendente) {
    switch (item.status) {
      case 'draft': return this.msg['statusDraft'];
      case 'awaitingApproval': return this.msg['statusAwaiting'];
      case 'rejected': return this.msg['statusRejected'];
      case 'approved': return this.msg['statusApproved'];
      case 'paid': return this.msg['statusPaid'];
      default: return '';
    }
  }

  private stripClass(item: DespesaPendente) {
    if (item.details.details.reenvioRealizado) {
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    }
    switch (item.status) {
      case 'approved':
      case 'paid':
        return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
      case 'rejected':
        return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
      case 'draft':
        return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
      default:
        return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
    }
  }

  private renderCard(item: DespesaPendente) {
    const d = item.details.details;
    const who = item.colaborador?.details?.identification?.details?.identification?.name ?? '';
    return html`
      <li>
        <article class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
          <div class="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm font-semibold ${this.stripClass(item)}">
            <span>${this.statusLabel(item)}</span>
            ${d.reenvioRealizado ? html`<span>${this.msg['resubmitted']}</span>` : nothing}
          </div>
          <div class="flex flex-col gap-3 px-4 pt-3 pb-4">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['registeredBy']}</p>
                <p class="truncate text-base font-semibold text-[var(--text-strong,currentColor)]">${who}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['amount']}</p>
                <p class="text-2xl font-bold leading-tight text-[var(--text-strong,currentColor)]">${d.valor}</p>
              </div>
            </div>
            <dl class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--text-default,currentColor)]">
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['expenseDate']}</dt>
                <dd class="font-medium">${formatDate(d.dataDespesa)}</dd>
              </div>
              <div>
                <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['category']}</dt>
                <dd class="font-medium">${d.categoria}</dd>
              </div>
            </dl>
            <grouptriggeraction--ml-button-standard
              size="lg"
              data-variant="primary"
              data-class="w-full"
              @action=${() => this.abrirAnaliseDespesas(item.id)}
            >
              <Label>${this.msg['analyse']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </article>
      </li>
    `;
  }

  private renderSkeleton() {
    return html`
      <div role="status" aria-live="polite" aria-busy="true" class="flex flex-col gap-3">
        <span class="sr-only">${this.msg['loading']}</span>
        ${[0, 1, 2].map(() => html`
          <div class="animate-pulse overflow-hidden rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
            <div class="h-9 w-full bg-[var(--surface-alt-bg,transparent)]"></div>
            <div class="flex flex-col gap-3 p-4">
              <div class="h-5 w-2/3 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
              <div class="h-4 w-1/2 rounded bg-[var(--surface-alt-bg,transparent)]"></div>
              <div class="h-11 w-full rounded bg-[var(--surface-alt-bg,transparent)]"></div>
            </div>
          </div>`)}
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="flex flex-col items-center gap-4 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-6 py-12 text-center">
        <svg class="h-20 w-20 text-[var(--status-success-text,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M8 12.5l2.5 2.5L16 9.5"></path>
        </svg>
        <p class="text-base text-[var(--text-default,currentColor)]">${this.msg['emptyText']}</p>
        <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" data-class="w-full" @action=${() => this.qryInicio()}>
          <Label>${this.msg['refresh']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div role="alert" aria-live="polite" class="flex flex-col gap-3 rounded-xl border border-[var(--status-error-text,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <p class="text-sm text-[var(--text-default,currentColor)]">${this.msg['errorText']}</p>
        ${this.qryInicioError?.message ? html`<p class="text-xs text-[var(--text-muted,currentColor)]">${this.qryInicioError.message}</p>` : nothing}
        <grouptriggeraction--ml-button-standard size="lg" data-variant="secondary" data-class="w-full" @action=${() => this.qryInicio()}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderBoard() {
    const items = this.despesasPendentes?.items ?? [];
    const hasMore = this.despesasPendentes?.hasMore ?? false;
    return html`
      <ul class="m-0 flex list-none flex-col gap-3 p-0">
        ${items.map((item) => this.renderCard(item))}
      </ul>
      ${hasMore ? html`
        <grouptriggeraction--ml-button-standard
          size="lg"
          data-variant="secondary"
          data-class="w-full"
          ?loading=${this.qryInicioStatus === 'loading'}
          @action=${() => this.qryInicio(undefined, true)}
        >
          <Label>${this.msg['loadMore']}</Label>
        </grouptriggeraction--ml-button-standard>` : nothing}
    `;
  }

  private renderBody() {
    if (this.pageStatus === 'loading' || (this.pageStatus === 'idle' && this.qryInicioStatus === 'loading')) {
      return this.renderSkeleton();
    }
    if (this.pageStatus === 'error') return this.renderError();
    if (this.pageStatus === 'empty') return this.renderEmpty();
    return html`
      ${this.qryInicioError ? this.renderError() : nothing}
      ${this.renderBoard()}
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const total = new Intl.NumberFormat(lang()).format(this.totalPendentes ?? 0);
    const isLoading = this.pageStatus === 'loading';
    return html`
      <main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
        <div class="mx-auto flex w-full max-w-[430px] flex-col gap-4">
          <h1 class="m-0 text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <section data-organism-id="caixaDespesasPendentes" class="flex flex-col gap-4">
            <div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4">
              <groupviewmetric--ml-metric-big-number ?loading=${isLoading}>
                <Label>${this.msg['metricLabel']}</Label>
                <Value>${total}</Value>
                <Helper>${this.msg['metricHelper']}</Helper>
              </groupviewmetric--ml-metric-big-number>
            </div>
            ${this.renderBody()}
          </section>
        </div>
      </main>
    `;
  }
}
