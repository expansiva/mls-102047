/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/mobile/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Despesas da equipe',
  pageSubtitle: 'O que espera a sua decisão',
  metricLabel: 'Aguardando decisão',
  metricHelper: 'despesas da equipe para analisar',
  listHeading: 'Fila de análise',
  listHint: 'Toque em uma despesa para analisar e decidir.',
  colColaborador: 'Colaborador',
  colValor: 'Valor',
  resubmitted: 'Reenvio',
  noName: 'Colaborador não identificado',
  listLoading: 'Carregando despesas…',
  emptyTitle: 'Nenhuma despesa aguardando você',
  emptyBody: 'Quando alguém da equipe enviar uma despesa, ela aparece aqui.',
  errorTitle: 'Não foi possível carregar as despesas',
  errorRetry: 'Tentar novamente',
  loadMore: 'Ver mais despesas',
  openAnalysis: 'Analisar despesa de'
};
/// **collab_i18n_end**

type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };

const lang = () => document.documentElement.lang || undefined;

function formatDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(lang(), { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

function formatMoney(value: string): string {
  const n = Number(value);
  if (value.trim() === '' || !Number.isFinite(n)) return value;
  return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'BRL' }).format(n);
}

function formatCount(n: number): string {
  return new Intl.NumberFormat(lang()).format(n);
}

@customElement('reembolso-despesas--web--mobile--page11--inicio-102047')
export class ReembolsoDespesasMobilePage11InicioPage extends ReembolsoDespesasInicioShared {
  private msg: PageMessageType = pageMessage_pt;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.qryInicioStatus === 'loading';
    return html`
      <main class="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-4 bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]">
        <header class="flex flex-col gap-0.5">
          <h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageSubtitle']}</p>
        </header>
        <section data-organism-id="caixaDespesasPendentes" class="flex flex-col gap-4">
          ${this.renderTotal(loading)}
          ${this.pageStatus === 'error' || this.qryInicioStatus === 'error' ? this.renderError() : this.renderList(loading)}
        </section>
      </main>
    `;
  }

  private renderTotal(loading: boolean) {
    return html`
      <div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
        <groupviewmetric--ml-metric-big-number .loading=${loading && !this.despesasPendentes}>
          <Label>${this.msg['metricLabel']}</Label>
          <Value>${formatCount(this.totalPendentes ?? 0)}</Value>
          <Helper>${this.msg['metricHelper']}</Helper>
        </groupviewmetric--ml-metric-big-number>
      </div>
    `;
  }

  private renderError() {
    return html`
      <div class="flex flex-col gap-3 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4" role="alert" aria-live="polite">
        <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['errorTitle']}</p>
        ${this.qryInicioError ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.qryInicioError.message}</p>` : nothing}
        <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full min-h-[44px]"
          .loading=${this.qryInicioStatus === 'loading'}
          @action=${() => this.qryInicio()}>
          <Label>${this.msg['errorRetry']}</Label>
        </grouptriggeraction--ml-button-standard>
      </div>
    `;
  }

  private renderList(loading: boolean) {
    const items = this.despesasPendentes?.items ?? [];
    const hasMore = this.despesasPendentes?.hasMore ?? false;
    const nextPage = (this.despesasPendentes?.page ?? 1) + 1;
    return html`
      <div class="flex flex-col gap-2" aria-live="polite">
        <div class="flex flex-col gap-0.5 px-1">
          <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['listHeading']}</h2>
          ${items.length ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['listHint']}</p>` : nothing}
        </div>
        <div class="overflow-hidden rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)]">
          <groupviewdata--ml-vertical-record-list
            .hoverable=${true}
            .loading=${loading && items.length === 0}
            @row-click=${(e: CustomEvent<{ index: number }>) => {
              const item = items[e.detail.index];
              if (item) this.abrirAnaliseDespesas(item.id);
            }}>
            <Columns>
              <Column field="colaborador" header=${this.msg['colColaborador']} />
              <Column field="valor" header=${this.msg['colValor']} align="right" width="120px" />
            </Columns>
            <Rows>
              ${items.map(item => {
                const name = item.colaborador?.details?.identification?.details?.identification?.name || this.msg['noName'];
                return html`
                  <Row>
                    <Cell>
                      <div class="flex min-h-[44px] flex-col justify-center gap-0.5" aria-label="${this.msg['openAnalysis']} ${name}">
                        <span class="font-medium text-[var(--text-strong,currentColor)]">${name}</span>
                        <span class="text-sm text-[var(--text-default,currentColor)]">${item.details.details.categoria}</span>
                        <span class="text-xs text-[var(--text-muted,currentColor)]">${formatDate(item.details.details.dataDespesa)}</span>
                      </div>
                    </Cell>
                    <Cell>
                      <div class="flex min-h-[44px] flex-col items-end justify-center gap-1">
                        <span class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatMoney(item.details.details.valor)}</span>
                        ${item.details.details.reenvioRealizado
                          ? html`<span class="rounded-full bg-[var(--status-warning-bg,transparent)] px-2 py-0.5 text-xs text-[var(--status-warning-text,currentColor)]">${this.msg['resubmitted']}</span>`
                          : nothing}
                      </div>
                    </Cell>
                  </Row>`;
              })}
            </Rows>
            <Loading>
              <div class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]">${this.msg['listLoading']}</div>
            </Loading>
            <Empty>
              <div class="flex flex-col gap-1 px-4 py-8 text-center">
                <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</p>
                <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyBody']}</p>
              </div>
            </Empty>
          </groupviewdata--ml-vertical-record-list>
        </div>
        ${hasMore
          ? html`
            <grouptriggeraction--ml-button-standard data-variant="secondary" size="lg" data-class="w-full min-h-[44px]"
              .loading=${loading}
              @action=${() => this.qryInicio(nextPage, true)}>
              <Label>${this.msg['loadMore']}</Label>
            </grouptriggeraction--ml-button-standard>`
          : nothing}
      </div>
    `;
  }
}
