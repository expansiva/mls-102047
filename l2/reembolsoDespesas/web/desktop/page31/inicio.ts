/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page31/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-card-grid.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Despesas aguardando sua decisão',
  pageSubtitle: 'Escolha uma despesa da equipe e siga direto para a análise.',
  metricLabel: 'Aguardando decisão',
  metricHelper: 'despesas da equipe esperando sua análise',
  analyzeAction: 'Analisar despesas',
  analyzeCard: 'Analisar e decidir',
  loadMore: 'Carregar mais despesas',
  reload: 'Atualizar lista',
  retry: 'Tentar novamente',
  loading: 'Carregando as despesas pendentes…',
  errorTitle: 'Não foi possível carregar as despesas pendentes.',
  emptyTitle: 'Nenhuma despesa da equipe aguarda sua decisão.',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando decisão',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  statusResubmitted: 'Reenviada após correção',
  registeredBy: 'Registrada por',
  expenseDate: 'Data da despesa',
  category: 'Categoria',
  value: 'Valor',
};
const pageMessage_en_us = {
  pageTitle: 'Expenses waiting for your decision',
  pageSubtitle: 'Pick a team expense and go straight to its review.',
  metricLabel: 'Awaiting decision',
  metricHelper: 'team expenses waiting for your review',
  analyzeAction: 'Review expenses',
  analyzeCard: 'Review and decide',
  loadMore: 'Load more expenses',
  reload: 'Refresh list',
  retry: 'Try again',
  loading: 'Loading pending expenses…',
  errorTitle: 'The pending expenses could not be loaded.',
  emptyTitle: 'No team expense is waiting for your decision.',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting decision',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  statusResubmitted: 'Resubmitted after correction',
  registeredBy: 'Registered by',
  expenseDate: 'Expense date',
  category: 'Category',
  value: 'Amount',
};
const pageMessage_es_es = {
  pageTitle: 'Gastos pendientes de tu decisión',
  pageSubtitle: 'Elige un gasto del equipo y ve directo a su análisis.',
  metricLabel: 'Pendientes de decisión',
  metricHelper: 'gastos del equipo esperando tu análisis',
  analyzeAction: 'Analizar gastos',
  analyzeCard: 'Analizar y decidir',
  loadMore: 'Cargar más gastos',
  reload: 'Actualizar lista',
  retry: 'Intentar de nuevo',
  loading: 'Cargando los gastos pendientes…',
  errorTitle: 'No se pudieron cargar los gastos pendientes.',
  emptyTitle: 'Ningún gasto del equipo espera tu decisión.',
  statusDraft: 'Borrador',
  statusAwaiting: 'Pendiente de decisión',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  statusResubmitted: 'Reenviado tras corrección',
  registeredBy: 'Registrado por',
  expenseDate: 'Fecha del gasto',
  category: 'Categoría',
  value: 'Importe',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

const lang = () => document.documentElement.lang || undefined;

function formatDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function formatMoney(value: string): string {
  const n = Number(value);
  if (value === '' || Number.isNaN(n)) return value;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function formatCount(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}

@customElement('reembolso-despesas--web--desktop--page31--inicio-102047')
export class ReembolsoDespesasDesktopPage31InicioPage extends ReembolsoDespesasInicioShared {
  private msg!: PageMessageType;

  private stripFor(row: DespesaPendente) {
    if (row.details.details.reenvioRealizado) {
      return { label: this.msg.statusResubmitted, cls: 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]' };
    }
    switch (row.status) {
      case 'draft':
        return { label: this.msg.statusDraft, cls: 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]' };
      case 'rejected':
        return { label: this.msg.statusRejected, cls: 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]' };
      case 'approved':
        return { label: this.msg.statusApproved, cls: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' };
      case 'paid':
        return { label: this.msg.statusPaid, cls: 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' };
      default:
        return { label: this.msg.statusAwaiting, cls: 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]' };
    }
  }

  private renderHeader(firstId: string | null) {
    return html`
      <header class="flex items-end justify-between gap-6 flex-wrap">
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageSubtitle}</p>
        </div>
        <div class="flex items-center gap-6">
          <groupviewmetric--ml-metric-big-number .loading=${this.qryInicioStatus === 'loading' && !this.despesasPendentes}>
            <Label>${this.msg.metricLabel}</Label>
            <Value>${formatCount(this.totalPendentes)}</Value>
            <Helper>${this.msg.metricHelper}</Helper>
          </groupviewmetric--ml-metric-big-number>
          <grouptriggeraction--ml-button-standard
            size="lg"
            ?disabled=${!firstId}
            @action=${() => this.abrirAnaliseDespesas(firstId)}
          >
            <Label>${this.msg.analyzeAction}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>
      </header>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="flex flex-col items-center justify-center gap-4 py-20 text-center rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
        <svg class="w-20 h-20 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
        <p class="text-lg text-[var(--text-default,currentColor)]">${this.msg.emptyTitle}</p>
        <grouptriggeraction--ml-button-standard data-variant="secondary" @action=${() => this.qryInicio()}>
          <Label>${this.msg.reload}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div role="alert" aria-live="polite" class="flex flex-col items-center gap-4 py-16 text-center rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]">
        <p class="text-base text-[var(--text-default,currentColor)]">${this.msg.errorTitle}</p>
        ${this.qryInicioError ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.qryInicioError.message}</p>` : nothing}
        <grouptriggeraction--ml-button-standard @action=${() => this.qryInicio()}>
          <Label>${this.msg.retry}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderCard(row: DespesaPendente) {
    const strip = this.stripFor(row);
    const d = row.details.details;
    const name = row.colaborador.details.identification.details.identification.name;
    return html`
      <Row>
        <Cell>
          <div class="w-full px-3 py-2 text-xs font-bold uppercase tracking-wide ${strip.cls}">${strip.label}</div>
        </Cell>
        <Cell>
          <div class="flex flex-col gap-0.5">
            <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.registeredBy}</span>
            <span class="text-base font-medium text-[var(--text-strong,currentColor)]">${name}</span>
          </div>
        </Cell>
        <Cell>
          <div class="flex flex-col gap-0.5">
            <span class="text-xs text-[var(--text-muted,currentColor)]">${this.msg.value}</span>
            <span class="text-3xl font-bold text-[var(--text-strong,currentColor)]">${formatMoney(d.valor)}</span>
          </div>
        </Cell>
        <Cell>
          <div class="flex items-center justify-between gap-3 text-sm text-[var(--text-default,currentColor)]">
            <span><span class="text-[var(--text-muted,currentColor)]">${this.msg.category}:</span> ${d.categoria}</span>
            <span><span class="text-[var(--text-muted,currentColor)]">${this.msg.expenseDate}:</span> ${formatDate(d.dataDespesa)}</span>
          </div>
        </Cell>
        <Cell>
          <span class="text-sm font-semibold text-[var(--link-text,currentColor)]">${this.msg.analyzeCard} →</span>
        </Cell>
      </Row>
    `;
  }

  private renderBoard(items: DespesaPendente[], loading: boolean, hasMore: boolean) {
    return html`
      <groupviewdata--ml-card-grid
        .hoverable=${true}
        .loading=${loading}
        @row-click=${(e: CustomEvent<{ index: number }>) => {
          const row = items[e.detail.index];
          if (row) this.abrirAnaliseDespesas(row.id);
        }}
      >
        <Columns>
          <Column field="status" header=${this.msg.statusAwaiting} />
          <Column field="colaborador" header=${this.msg.registeredBy} />
          <Column field="valor" header=${this.msg.value} />
          <Column field="detalhes" header=${this.msg.category} />
          <Column field="acao" header=${this.msg.analyzeCard} />
        </Columns>
        <Rows>
          ${items.map((row) => this.renderCard(row))}
        </Rows>
        <Loading>
          <div class="text-center py-12 text-[var(--text-muted,currentColor)]">${this.msg.loading}</div>
        </Loading>
      </groupviewdata--ml-card-grid>
      ${hasMore
        ? html`<div class="flex justify-center pt-2">
            <grouptriggeraction--ml-button-standard
              data-variant="secondary"
              ?loading=${this.qryInicioStatus === 'loading'}
              @action=${() => this.qryInicio(undefined, true)}
            >
              <Label>${this.msg.loadMore}</Label>
            </grouptriggeraction--ml-button-standard>
          </div>`
        : nothing}
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const items: DespesaPendente[] = this.despesasPendentes?.items ?? [];
    const hasMore = !!this.despesasPendentes?.hasMore;
    const firstId = items.length > 0 ? items[0].id : null;
    const status = this.pageStatus;

    let body;
    if (status === 'error') body = this.renderError();
    else if (status === 'empty') body = this.renderEmpty();
    else if (status === 'loading' || status === 'idle') body = this.renderBoard([], true, false);
    else body = this.renderBoard(items, false, hasMore);

    return html`
      <main class="min-h-screen p-8 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <div class="max-w-7xl mx-auto flex flex-col gap-6">
          <section data-organism-id="caixaDespesasPendentes" class="flex flex-col gap-6" aria-busy=${status === 'loading' ? 'true' : 'false'}>
            ${this.renderHeader(firstId)}
            ${body}
          </section>
        </div>
      </main>
    `;
  }
}
