/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteInicioShared } from '/_102047_/l2/comandaRestaurante/web/shared/inicio.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Visão geral',
  pageIntro: 'Acompanhe a operação e decida o próximo atendimento ou fechamento.',
  operationalSummary: 'Indicadores da operação',
  availableTables: 'Mesas disponíveis',
  availableTablesHelper: 'Prontas para receber uma comanda',
  openChecksValue: 'Valor em comandas abertas',
  openChecksHelper: 'Total dos atendimentos ainda em aberto',
  loadingSummary: 'Carregando os indicadores da operação…',
  noAttention: 'Nada precisa de atenção agora.',
  noSummary: 'Os indicadores da operação ainda não estão disponíveis.',
  summaryError: 'Não foi possível carregar os indicadores da operação.',
  tryAgain: 'Tentar novamente',
  summaryRegion: 'Resumo operacional'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

function formatInteger(value: number) {
  return new Intl.NumberFormat(document.documentElement.lang || undefined, {
    maximumFractionDigits: 0
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(document.documentElement.lang || undefined, {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

@customElement('comanda-restaurante--web--desktop--page11--inicio-102047')
export class ComandaRestauranteDesktopPage11InicioPage extends ComandaRestauranteInicioShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.pageStatus === 'loading' || this.carregarResumoOperacionalStatus === 'loading';
    const hasError = this.pageStatus === 'error' || this.carregarResumoOperacionalStatus === 'error';
    const summary = this.resumoOperacional;

    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] px-8 py-7 text-[var(--text-default,currentColor)]" aria-busy=${loading ? 'true' : 'false'}>
        <header class="mb-8 max-w-5xl">
          <h1 class="text-3xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
          <p class="mt-2 text-base text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p>
        </header>

        <section class="max-w-5xl" aria-labelledby="operational-summary-label" aria-live="polite">
          <p id="operational-summary-label" class="sr-only">${this.msg.summaryRegion}</p>
          ${loading ? html`
            <p class="mb-5 text-lg font-medium text-[var(--text-strong,currentColor)]">${this.msg.loadingSummary}</p>
          ` : hasError ? html`
            <div class="mb-5 flex items-center justify-between gap-6 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-5 py-4" role="alert">
              <p class="text-base text-[var(--text-default,currentColor)]">${this.msg.summaryError}</p>
              <button
                type="button"
                class="min-h-11 shrink-0 rounded-md bg-[var(--button-secondary-bg,transparent)] px-4 py-2 font-medium text-[var(--button-secondary-text,currentColor)] ring-[var(--focus-ring,currentColor)] focus-visible:outline-none focus-visible:ring-2"
                @click=${() => this.carregarResumoOperacional()}
              >${this.msg.tryAgain}</button>
            </div>
          ` : summary ? html`
            <p class="mb-5 text-lg font-medium text-[var(--text-strong,currentColor)]">${this.msg.noAttention}</p>
          ` : html`
            <p class="mb-5 text-lg font-medium text-[var(--text-strong,currentColor)]">${this.msg.noSummary}</p>
          `}

          <div class="flex max-w-3xl flex-wrap items-stretch gap-x-12 gap-y-6 border-t border-[var(--border-subtle,currentColor)] pt-6">
            <groupviewmetric--ml-metric-big-number data-class="min-w-[16rem] flex-1" .loading=${loading}>
              <Label data-class="text-[var(--text-muted,currentColor)]">${this.msg.availableTables}</Label>
              <Value>${summary ? formatInteger(summary.mesasDisponiveis) : ''}</Value>
              <Helper data-class="text-[var(--text-muted,currentColor)]">${this.msg.availableTablesHelper}</Helper>
            </groupviewmetric--ml-metric-big-number>
            <groupviewmetric--ml-metric-big-number data-class="min-w-[18rem] flex-1" .loading=${loading}>
              <Label data-class="text-[var(--text-muted,currentColor)]">${this.msg.openChecksValue}</Label>
              <Value>${summary ? formatCurrency(summary.valorComandasAbertas) : ''}</Value>
              <Helper data-class="text-[var(--text-muted,currentColor)]">${this.msg.openChecksHelper}</Helper>
            </groupviewmetric--ml-metric-big-number>
          </div>
        </section>
      </main>
    `;
  }
}
