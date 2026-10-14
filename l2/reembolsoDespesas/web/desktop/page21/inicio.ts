/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page21/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Despesas aguardando sua decisão',
  pageSubtitle: 'Escolha uma despesa da equipe e siga direto para a análise.',
  metricLabel: 'Aguardando decisão',
  metricHelper: 'despesas da equipe esperando por você',
  metricIcon: '⏳',
  analyze: 'Analisar e decidir',
  loadMore: 'Carregar mais despesas',
  retry: 'Tentar novamente',
  refresh: 'Atualizar lista',
  loading: 'Carregando as despesas da equipe…',
  errorTitle: 'Não foi possível carregar as despesas',
  emptyText: 'Nenhuma despesa da equipe está esperando sua decisão.',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  registeredBy: 'Registrada por',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando aprovação',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  resubmitted: 'Reenvio após correção',
  unknown: '—',
};
const pageMessage_en_us = {
  pageTitle: 'Expenses waiting for your decision',
  pageSubtitle: 'Pick a team expense and go straight to its analysis.',
  metricLabel: 'Awaiting decision',
  metricHelper: 'team expenses waiting for you',
  metricIcon: '⏳',
  analyze: 'Review and decide',
  loadMore: 'Load more expenses',
  retry: 'Try again',
  refresh: 'Refresh list',
  loading: 'Loading team expenses…',
  errorTitle: 'The expenses could not be loaded',
  emptyText: 'No team expense is waiting for your decision.',
  expenseDate: 'Expense date',
  category: 'Category',
  registeredBy: 'Registered by',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting approval',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  resubmitted: 'Resubmitted after correction',
  unknown: '—',
};
const pageMessage_es_es = {
  pageTitle: 'Gastos esperando tu decisión',
  pageSubtitle: 'Elige un gasto del equipo y ve directo al análisis.',
  metricLabel: 'Pendientes de decisión',
  metricHelper: 'gastos del equipo esperándote',
  metricIcon: '⏳',
  analyze: 'Analizar y decidir',
  loadMore: 'Cargar más gastos',
  retry: 'Intentar de nuevo',
  refresh: 'Actualizar lista',
  loading: 'Cargando los gastos del equipo…',
  errorTitle: 'No se pudieron cargar los gastos',
  emptyText: 'Ningún gasto del equipo está esperando tu decisión.',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  registeredBy: 'Registrado por',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de aprobación',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  resubmitted: 'Reenvío tras corrección',
  unknown: '—',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

const STRIP_CLASS: Record<DespesaPendente['status'], string> = {
  draft: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]',
  awaitingApproval: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]',
  rejected: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]',
  approved: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]',
  paid: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]',
};

function itemsOf(page: unknown): DespesaPendente[] {
  if (Array.isArray(page)) return page as DespesaPendente[];
  if (page && typeof page === 'object') {
    const items = (page as { items?: unknown }).items;
    if (Array.isArray(items)) return items as DespesaPendente[];
  }
  return [];
}

function hasMoreOf(page: unknown): boolean {
  if (page && typeof page === 'object') {
    return (page as { hasMore?: unknown }).hasMore === true;
  }
  return false;
}

function formatDate(value: string | undefined): string {
  if (!value) return '';
  const lang = document.documentElement.lang || undefined;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const d = new Date(dateOnly ? `${value}T00:00:00` : value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(d);
}

@customElement('reembolso-despesas--web--desktop--page21--inicio-102047')
export class ReembolsoDespesasDesktopPage21InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusLabel(status: DespesaPendente['status']) {
    switch (status) {
      case 'draft': return this.msg['statusDraft'];
      case 'awaitingApproval': return this.msg['statusAwaiting'];
      case 'rejected': return this.msg['statusRejected'];
      case 'approved': return this.msg['statusApproved'];
      case 'paid': return this.msg['statusPaid'];
      default: return this.msg['unknown'];
    }
  }

  private renderCard(d: DespesaPendente) {
    const info = d.details.details;
    const name = d.colaborador?.details?.identification?.details?.identification?.name || this.msg['unknown'];
    return html`
      <article class="flex flex-col overflow-hidden rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] shadow-sm">
        <div class="w-full px-4 py-2 text-sm font-semibold ${STRIP_CLASS[d.status] ?? STRIP_CLASS.draft}">
          ${this.statusLabel(d.status)}${info.reenvioRealizado ? html` · ${this.msg['resubmitted']}` : nothing}
        </div>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div>
            <p class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['registeredBy']}</p>
            <p class="text-base font-medium text-[var(--text-strong,currentColor)]">${name}</p>
          </div>
          <p class="text-3xl font-bold tracking-tight text-[var(--text-strong,currentColor)]">${info.valor}</p>
          <dl class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['expenseDate']}</dt>
              <dd class="text-[var(--text-default,currentColor)]">${formatDate(info.dataDespesa)}</dd>
            </div>
            <div>
              <dt class="text-xs text-[var(--text-muted,currentColor)]">${this.msg['category']}</dt>
              <dd class="text-[var(--text-default,currentColor)]">${info.categoria}</dd>
            </div>
          </dl>
          <div class="mt-auto pt-2">
            <grouptriggeraction--ml-button-standard
              data-variant="primary"
              size="lg"
              data-class="w-full"
              @action=${() => this.abrirAnaliseDespesas(d.id)}>
              <Label>${this.msg['analyze']}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>
        </div>
      </article>
    `;
  }

  private renderSkeleton() {
    return html`
      <div class="grid grid-cols-2 gap-5 xl:grid-cols-3" aria-busy="true" aria-live="polite">
        <span class="sr-only">${this.msg['loading']}</span>
        ${[0, 1, 2].map(() => html`
          <div class="h-60 animate-pulse overflow-hidden rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)]">
            <div class="h-9 w-full bg-[var(--status-neutral-bg,transparent)]"></div>
          </div>`)}
      </div>
    `;
  }

  private renderError() {
    return html`
      <div class="flex flex-col items-start gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" role="alert" aria-live="polite">
        <p class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg['errorTitle']}</p>
        <p class="text-[var(--text-default,currentColor)]">${this.qryInicioError?.message ?? ''}</p>
        <grouptriggeraction--ml-button-standard data-variant="primary" size="md" @action=${() => this.qryInicio()}>
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="flex flex-col items-center gap-5 rounded-lg border border-dashed border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-6 py-20 text-center">
        <svg class="h-24 w-24 text-[var(--status-success-text,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12.5l3 3 5-6"></path>
        </svg>
        <p class="text-xl text-[var(--text-strong,currentColor)]">${this.msg['emptyText']}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="md" @action=${() => this.qryInicio()}>
          <Label>${this.msg['refresh']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderBoard() {
    const items = itemsOf(this.despesasPendentes);
    return html`
      <div class="grid grid-cols-2 gap-5 xl:grid-cols-3">
        ${items.map((d) => this.renderCard(d))}
      </div>
      ${hasMoreOf(this.despesasPendentes) ? html`
        <div class="mt-6 flex justify-center">
          <grouptriggeraction--ml-button-standard
            data-variant="secondary"
            size="md"
            ?loading=${this.qryInicioStatus === 'loading'}
            @action=${() => this.qryInicio(undefined, true)}>
            <Label>${this.msg['loadMore']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>` : nothing}
    `;
  }

  private renderBody() {
    switch (this.pageStatus) {
      case 'error': return this.renderError();
      case 'empty': return this.renderEmpty();
      case 'success': return this.renderBoard();
      default: return this.renderSkeleton();
    }
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.pageStatus === 'loading' || this.pageStatus === 'idle';
    const count = new Intl.NumberFormat(document.documentElement.lang || undefined).format(this.totalPendentes ?? 0);
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] p-8">
        <div class="mx-auto flex max-w-7xl flex-col gap-8">
          <header class="flex items-end justify-between gap-8">
            <div class="flex flex-col gap-2">
              <h1 class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
              <p class="text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
            </div>
            <div class="w-72 shrink-0">
              <groupviewmetric--ml-metric-card ?loading=${loading}>
                <Icon>${this.msg['metricIcon']}</Icon>
                <Label>${this.msg['metricLabel']}</Label>
                <Value>${count}</Value>
                <Helper>${this.msg['metricHelper']}</Helper>
              </groupviewmetric--ml-metric-card>
            </div>
          </header>
          <section data-organism-id="caixaDespesasPendentes" aria-busy=${loading ? 'true' : 'false'}>
            ${this.renderBody()}
          </section>
        </div>
      </main>
    `;
  }
}
