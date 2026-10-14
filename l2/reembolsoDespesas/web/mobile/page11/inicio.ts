/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start**
const pageMessage_pt_br = {
  pageTitle: 'Despesas da equipe',
  metricLabel: 'Aguardando sua decisão',
  listHeading: 'Despesas para analisar',
  colExpense: 'Despesa',
  colValue: 'Valor',
  resubmitted: 'Reenvio',
  loading: 'Carregando despesas…',
  emptyTitle: 'Nenhuma despesa aguardando você',
  emptyText: 'Quando alguém da equipe enviar uma despesa para aprovação, ela aparece aqui.',
  errorTitle: 'Não foi possível carregar as despesas',
  retry: 'Tentar novamente',
  loadMore: 'Carregar mais despesas',
  tapHint: 'Toque em uma despesa para analisar e decidir.',
};
const pageMessage_en_us = {
  pageTitle: 'Team expenses',
  metricLabel: 'Waiting for your decision',
  listHeading: 'Expenses to review',
  colExpense: 'Expense',
  colValue: 'Amount',
  resubmitted: 'Resubmitted',
  loading: 'Loading expenses…',
  emptyTitle: 'No expenses waiting for you',
  emptyText: 'When someone on your team submits an expense for approval, it shows up here.',
  errorTitle: 'Could not load the expenses',
  retry: 'Try again',
  loadMore: 'Load more expenses',
  tapHint: 'Tap an expense to review and decide.',
};
const pageMessage_es_es = {
  pageTitle: 'Gastos del equipo',
  metricLabel: 'Esperando su decisión',
  listHeading: 'Gastos por revisar',
  colExpense: 'Gasto',
  colValue: 'Importe',
  resubmitted: 'Reenvío',
  loading: 'Cargando gastos…',
  emptyTitle: 'Ningún gasto esperando por usted',
  emptyText: 'Cuando alguien del equipo envíe un gasto para aprobación, aparecerá aquí.',
  errorTitle: 'No se pudieron cargar los gastos',
  retry: 'Intentar de nuevo',
  loadMore: 'Cargar más gastos',
  tapHint: 'Toque un gasto para revisar y decidir.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
  'pt-br': pageMessage_pt_br,
  'en-us': pageMessage_en_us,
  'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**

function itemsOf(list: unknown): DespesaPendente[] {
  const items = (list as { items?: DespesaPendente[] } | null)?.items;
  return Array.isArray(items) ? items : [];
}

function hasMoreOf(list: unknown): boolean {
  return Boolean((list as { hasMore?: boolean } | null)?.hasMore);
}

function formatDate(value: string): string {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, { dateStyle: 'medium' }).format(d);
}

function formatCount(n: number): string {
  return new Intl.NumberFormat(document.documentElement.lang || undefined).format(n);
}

@customElement('reembolso-despesas--web--mobile--page11--inicio-102047')
export class ReembolsoDespesasMobilePage11InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt_br;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.pageStatus === 'loading' || this.qryInicioStatus === 'loading';
    return html`
      <main class="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-4 bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
        <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
        <section data-organism-id="caixaDespesasPendentes" class="flex flex-col gap-4">
          ${this.renderBody(loading)}
        </section>
      </main>
    `;
  }

  private renderBody(loading: boolean) {
    if (this.pageStatus === 'error' || (this.qryInicioStatus === 'error' && !loading)) {
      return this.renderError();
    }
    const items = itemsOf(this.despesasPendentes);
    return html`
      <div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <groupviewmetric--ml-metric-big-number .loading=${loading && items.length === 0}>
          <Label>${this.msg['metricLabel']}</Label>
          <Value>${formatCount(this.totalPendentes)}</Value>
        </groupviewmetric--ml-metric-big-number>
      </div>
      ${this.pageStatus === 'empty' && !loading ? this.renderEmpty() : this.renderList(items, loading)}
    `;
  }

  private renderList(items: DespesaPendente[], loading: boolean) {
    return html`
      <div class="flex flex-col gap-2">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['listHeading']}</h2>
        <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['tapHint']}</p>
        <div class="overflow-hidden rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)]" aria-live="polite">
          <groupviewdata--ml-vertical-record-list
            .loading=${loading && items.length === 0}
            .hoverable=${true}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const item = items[e.detail.index];
              if (item) this.abrirAnaliseDespesas(item.id);
            }}
          >
            <Columns>
              <Column field="expense" header=${this.msg['colExpense']} />
              <Column field="value" header=${this.msg['colValue']} align="right" width="112px" />
            </Columns>
            <Rows>
              ${items.map(
                (item) => html`
                  <Row>
                    <Cell>
                      <div class="flex min-h-[56px] flex-col justify-center gap-0.5 py-1">
                        <span class="break-words font-medium text-[var(--text-strong,currentColor)]">${item.colaborador.details.identification.details.identification.name}</span>
                        <span class="text-sm text-[var(--text-default,currentColor)]">${item.details.details.categoria}</span>
                        <span class="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted,currentColor)]">
                          ${formatDate(item.details.details.dataDespesa)}
                          ${item.details.details.reenvioRealizado
                            ? html`<span class="rounded-full bg-[var(--status-info-bg,transparent)] px-2 py-0.5 text-[var(--status-info-text,currentColor)]">${this.msg['resubmitted']}</span>`
                            : nothing}
                        </span>
                      </div>
                    </Cell>
                    <Cell>
                      <span class="block text-right font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${item.details.details.valor}</span>
                    </Cell>
                  </Row>
                `,
              )}
            </Rows>
            <Loading>
              <div class="py-8 text-center text-[var(--text-muted,currentColor)]">${this.msg['loading']}</div>
            </Loading>
          </groupviewdata--ml-vertical-record-list>
        </div>
        ${hasMoreOf(this.despesasPendentes)
          ? html`
              <grouptriggeraction--ml-button-standard
                data-variant="secondary"
                size="lg"
                data-class="w-full min-h-[44px]"
                .loading=${this.qryInicioStatus === 'loading'}
                @action=${() => this.qryInicio(undefined, true)}
              >
                <Label>${this.msg['loadMore']}</Label>
              </grouptriggeraction--ml-button-standard>
            `
          : nothing}
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-6 text-center">
        <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</h2>
        <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyText']}</p>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div class="flex flex-col gap-3 rounded-xl border border-[var(--status-error-text,currentColor)] bg-[var(--status-error-bg,transparent)] p-4" role="alert" aria-live="polite">
        <h2 class="text-base font-semibold text-[var(--status-error-text,currentColor)]">${this.msg['errorTitle']}</h2>
        ${this.qryInicioError ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.qryInicioError.message}</p>` : nothing}
        <grouptriggeraction--ml-button-standard
          data-variant="primary"
          size="lg"
          data-class="w-full min-h-[44px]"
          .loading=${this.qryInicioStatus === 'loading'}
          @action=${() => this.qryInicio()}
        >
          <Label>${this.msg['retry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }
}
