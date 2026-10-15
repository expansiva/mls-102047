/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page31/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-card-grid.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Pendências da equipe',
  metricLabel: 'Despesas aguardando sua decisão',
  metricHelper: 'Toque em uma despesa para analisar e decidir.',
  analyzeFirst: 'Analisar a primeira pendência',
  cardAction: 'Analisar e decidir',
  resubmitted: 'reenvio',
  statusDraft: 'Rascunho',
  statusAwaiting: 'Aguardando decisão',
  statusRejected: 'Rejeitada',
  statusApproved: 'Aprovada',
  statusPaid: 'Paga',
  loading: 'Carregando as despesas da equipe…',
  emptyText: 'Nenhuma despesa da equipe espera a sua decisão.',
  refresh: 'Atualizar',
  errorText: 'Não foi possível carregar as despesas da equipe.',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  unknownCollaborator: 'Colaborador',
};
const pageMessage_en_us = {
  pageTitle: 'Team pending items',
  metricLabel: 'Expenses awaiting your decision',
  metricHelper: 'Tap an expense to review and decide.',
  analyzeFirst: 'Review the first pending expense',
  cardAction: 'Review and decide',
  resubmitted: 'resubmitted',
  statusDraft: 'Draft',
  statusAwaiting: 'Awaiting decision',
  statusRejected: 'Rejected',
  statusApproved: 'Approved',
  statusPaid: 'Paid',
  loading: 'Loading team expenses…',
  emptyText: 'No team expense is waiting for your decision.',
  refresh: 'Refresh',
  errorText: 'We could not load the team expenses.',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  unknownCollaborator: 'Collaborator',
};
const pageMessage_es_es = {
  pageTitle: 'Pendientes del equipo',
  metricLabel: 'Gastos esperando tu decisión',
  metricHelper: 'Toca un gasto para analizar y decidir.',
  analyzeFirst: 'Analizar el primer pendiente',
  cardAction: 'Analizar y decidir',
  resubmitted: 'reenvío',
  statusDraft: 'Borrador',
  statusAwaiting: 'Esperando decisión',
  statusRejected: 'Rechazado',
  statusApproved: 'Aprobado',
  statusPaid: 'Pagado',
  loading: 'Cargando los gastos del equipo…',
  emptyText: 'Ningún gasto del equipo espera tu decisión.',
  refresh: 'Actualizar',
  errorText: 'No se pudieron cargar los gastos del equipo.',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  unknownCollaborator: 'Colaborador',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

type PendingList = { items?: DespesaPendente[]; hasMore?: boolean } | null;

function readList(value: unknown): PendingList {
  return (value as PendingList) ?? null;
}

function formatDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || '');
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value || '';
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium' }).format(d);
}

function formatMoney(value: string): string {
  const n = Number(value);
  if (value === '' || value == null || !Number.isFinite(n)) return value || '';
  return new Intl.NumberFormat(document.documentElement.lang || undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function stripClass(status: DespesaPendente['status']): string {
  switch (status) {
    case 'rejected':
      return 'bg-[var(--status-error-bg,transparent)] text-[var(--status-error-text,currentColor)]';
    case 'approved':
      return 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]';
    case 'paid':
      return 'bg-[var(--status-info-bg,transparent)] text-[var(--status-info-text,currentColor)]';
    case 'draft':
      return 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]';
    default:
      return 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]';
  }
}

@customElement('reembolso-despesas--web--mobile--page31--inicio-102047')
export class ReembolsoDespesasMobilePage31InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt_br;

  private statusText(status: DespesaPendente['status']) {
    switch (status) {
      case 'rejected': return this.msg['statusRejected'];
      case 'approved': return this.msg['statusApproved'];
      case 'paid': return this.msg['statusPaid'];
      case 'draft': return this.msg['statusDraft'];
      default: return this.msg['statusAwaiting'];
    }
  }

  private renderCards(items: DespesaPendente[]) {
    return html`
      <groupviewdata--ml-card-grid
        .hoverable=${true}
        @row-click=${(e: CustomEvent<{ index: number }>) => {
          const item = items[e.detail.index];
          if (item) this.abrirAnaliseDespesas(item.id);
        }}
      >
        <Columns>
          <Column field="status" header=${this.msg['statusAwaiting']} />
          <Column field="who" header=${this.msg['unknownCollaborator']} />
          <Column field="valor" header=${this.msg['metricLabel']} />
          <Column field="meta" header=${this.msg['pageTitle']} />
          <Column field="action" header=${this.msg['cardAction']} />
        </Columns>
        <Rows>
          ${items.map((item) => {
            const name = item.colaborador?.details?.identification?.details?.identification?.name || this.msg['unknownCollaborator'];
            const d = item.details.details;
            const strip = d.reenvioRealizado
              ? `${this.statusText(item.status)} · ${this.msg['resubmitted']}`
              : this.statusText(item.status);
            return html`
              <Row>
                <Cell>
                  <div class="w-full rounded-md px-3 py-2 text-sm font-semibold ${stripClass(item.status)}">${strip}</div>
                </Cell>
                <Cell>
                  <div class="text-base font-semibold text-[var(--text-strong,currentColor)] break-words">${name}</div>
                </Cell>
                <Cell>
                  <div class="text-3xl font-bold tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(d.valor)}</div>
                </Cell>
                <Cell>
                  <div class="text-sm text-[var(--text-muted,currentColor)]">${formatDate(d.dataDespesa)} · ${d.categoria}</div>
                </Cell>
                <Cell>
                  <div class="text-sm font-medium text-[var(--link-text,currentColor)]">${this.msg['cardAction']} →</div>
                </Cell>
              </Row>`;
          })}
        </Rows>
      </groupviewdata--ml-card-grid>`;
  }

  private renderBody(items: DespesaPendente[], hasMore: boolean) {
    if (this.pageStatus === 'error' || this.qryInicioStatus === 'error') {
      return html`
        <div class="rounded-lg p-4 flex flex-col gap-3 bg-[var(--surface-bg,transparent)] border border-[var(--border-default,currentColor)]" role="alert" aria-live="polite">
          <p class="text-[var(--text-default,currentColor)]">${this.qryInicioError?.message || this.msg['errorText']}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full" @action=${() => this.qryInicio()}>
            <Label>${this.msg['retry']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    if (this.pageStatus === 'loading' || this.qryInicioStatus === 'loading') {
      return html`
        <div class="flex flex-col gap-3" aria-busy="true" aria-live="polite">
          <span class="sr-only">${this.msg['loading']}</span>
          ${[0, 1, 2].map(() => html`<div class="h-36 rounded-lg animate-pulse bg-[var(--surface-alt-bg,transparent)]"></div>`)}
        </div>`;
    }
    if (this.pageStatus === 'empty' || items.length === 0) {
      return html`
        <div class="flex flex-col items-center text-center gap-4 py-12 px-4">
          <svg class="w-20 h-20 text-[var(--text-muted,currentColor)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M8 12.5l2.7 2.7L16 9.5"></path>
          </svg>
          <p class="text-lg text-[var(--text-default,currentColor)]">${this.msg['emptyText']}</p>
          <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" @action=${() => this.qryInicio()}>
            <Label>${this.msg['refresh']}</Label>
          </grouptriggeraction--ml-button-standard>
        </div>`;
    }
    return html`
      ${this.renderCards(items)}
      ${hasMore
        ? html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full min-h-[44px]" @action=${() => this.qryInicio(undefined, true)}>
            <Label>${this.msg['loadMore']}</Label>
          </grouptriggeraction--ml-button-standard>`
        : nothing}`;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const list = readList(this.despesasPendentes);
    const items = list?.items ?? [];
    const hasMore = !!list?.hasMore;
    const busy = this.pageStatus === 'loading' || this.qryInicioStatus === 'loading';
    const first = items[0];

    return html`
      <main class="min-h-screen w-full max-w-[430px] mx-auto px-4 py-5 flex flex-col gap-4 bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
        <h1 class="text-xl font-bold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
        <div data-organism-id="caixaDespesasPendentes" class="flex flex-col gap-4">
          <section class="rounded-lg p-4 flex flex-col gap-4 bg-[var(--surface-bg,transparent)] border border-[var(--border-default,currentColor)]">
            <groupviewmetric--ml-metric-big-number .loading=${busy}>
              <Label>${this.msg['metricLabel']}</Label>
              <Value>${this.totalPendentes}</Value>
              <Helper>${this.msg['metricHelper']}</Helper>
            </groupviewmetric--ml-metric-big-number>
            ${first
              ? html`<grouptriggeraction--ml-button-standard size="lg" data-variant="primary" data-class="w-full min-h-[48px]" @action=${() => this.abrirAnaliseDespesas(first.id)}>
                  <Label>${this.msg['analyzeFirst']}</Label>
                </grouptriggeraction--ml-button-standard>`
              : nothing}
          </section>
          ${this.renderBody(items, hasMore)}
        </div>
      </main>`;
  }
}
