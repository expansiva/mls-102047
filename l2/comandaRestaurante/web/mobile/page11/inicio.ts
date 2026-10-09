/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteInicioShared } from '/_102047_/l2/comandaRestaurante/web/shared/inicio.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start
const pageMessage_pt = {
  pageTitle: 'Visão geral',
  attentionLoading: 'Carregando a situação da operação…',
  attentionNone: 'Nada precisa de atenção agora',
  operationalStatus: 'Situação da operação',
  availableTables: 'Mesas disponíveis',
  openTabsValue: 'Valor das comandas em aberto',
  currentOverview: 'Consulta atual',
  loadingSummary: 'Carregando indicadores',
  emptySummary: 'Os indicadores operacionais ainda não estão disponíveis.',
  errorTitle: 'Não foi possível carregar os indicadores',
  errorDescription: 'Tente novamente para consultar a situação da operação.',
  retry: 'Tentar novamente',
  retrying: 'Tentando novamente…'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end

const formatInteger = (value: number) =>
  new Intl.NumberFormat(document.documentElement.lang || undefined, {
    maximumFractionDigits: 0
  }).format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(document.documentElement.lang || undefined, {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

@customElement('comanda-restaurante--web--mobile--page11--inicio-102047')
export class ComandaRestauranteMobilePage11InicioPage extends ComandaRestauranteInicioShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];

    const loading = this.pageStatus === 'loading' || this.carregarResumoOperacionalStatus === 'loading';
    const failed = this.pageStatus === 'error' || this.carregarResumoOperacionalStatus === 'error';
    const summary = this.resumoOperacional;

    return html`
      <main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-5 text-[var(--text-default,currentColor)]" aria-busy=${loading ? 'true' : 'false'}>
        <header class="mb-6">
          <h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
        </header>

        <section class="mb-7" aria-live="polite">
          ${failed ? html`
            <div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
              <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.errorTitle}</h2>
              <p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg.errorDescription}</p>
              <button
                type="button"
                class="mt-4 min-h-11 rounded-lg bg-[var(--button-secondary-bg,transparent)] px-4 py-2 text-sm font-semibold text-[var(--button-secondary-text,currentColor)] ring-1 ring-inset ring-[var(--button-secondary-border,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)] disabled:opacity-50"
                ?disabled=${loading}
                @click=${() => this.carregarResumoOperacional()}
              >${loading ? this.msg.retrying : this.msg.retry}</button>
            </div>
          ` : loading ? html`
            <p class="text-lg font-medium text-[var(--text-strong,currentColor)]">${this.msg.attentionLoading}</p>
          ` : summary ? html`
            <p class="text-lg font-medium text-[var(--text-strong,currentColor)]">${this.msg.attentionNone}</p>
          ` : html`
            <p class="text-base text-[var(--text-muted,currentColor)]">${this.msg.emptySummary}</p>
          `}
        </section>

        <section data-organism-id="resumoOperacional" aria-label=${this.msg.operationalStatus}>
          <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.operationalStatus}</h2>
          <div class="flex flex-col gap-3 rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-3 sm:flex-row">
            <groupviewmetric--ml-metric-big-number data-class="w-full" .loading=${loading}>
              <Label data-class="text-sm">${this.msg.availableTables}</Label>
              ${loading || !summary ? nothing : html`<Value>${formatInteger(summary.mesasDisponiveis)}</Value>`}
              <Helper>${this.msg.currentOverview}</Helper>
            </groupviewmetric--ml-metric-big-number>
            <groupviewmetric--ml-metric-big-number data-class="w-full" .loading=${loading}>
              <Label data-class="text-sm">${this.msg.openTabsValue}</Label>
              ${loading || !summary ? nothing : html`<Value>${formatCurrency(summary.valorComandasAbertas)}</Value>`}
              <Helper>${this.msg.currentOverview}</Helper>
            </groupviewmetric--ml-metric-big-number>
          </div>
        </section>
      </main>
    `;
  }
}
