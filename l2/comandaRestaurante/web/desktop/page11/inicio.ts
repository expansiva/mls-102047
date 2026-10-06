/// <mls fileReference="_102047_/l2/comandaRestaurante/web/desktop/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComandaRestauranteInicioShared } from '/_102047_/l2/comandaRestaurante/web/shared/inicio.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';

/// **collab_i18n_start**
const pageMessage_pt = {
  pageTitle: 'Visão geral',
  pageIntro: 'Acompanhe rapidamente a operação para orientar o atendimento e o fechamento.',
  metricsTitle: 'Indicadores da operação',
  availableTables: 'Mesas disponíveis',
  openChecksValue: 'Valor das comandas em aberto',
  loading: 'Carregando os indicadores da operação…',
  empty: 'Ainda não há indicadores operacionais para exibir.',
  errorTitle: 'Não foi possível carregar os indicadores',
  retry: 'Tentar novamente',
  currency: 'BRL'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages: Record<string, PageMessageType> = { pt: pageMessage_pt };
/// **collab_i18n_end**

@customElement('comanda-restaurante--web--desktop--page11--inicio-102047')
export class ComandaRestauranteDesktopPage11InicioPage extends ComandaRestauranteInicioShared {
  private msg!: PageMessageType;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loading = this.pageStatus === 'loading' || this.carregarResumoOperacionalStatus === 'loading';
    const hasError = this.pageStatus === 'error' || this.carregarResumoOperacionalStatus === 'error';
    const resumo = this.resumoOperacional;
    const locale = document.documentElement.lang || undefined;
    const currency = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.msg.currency
    });

    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] px-10 py-8 text-[var(--text-default,currentColor)]" aria-busy=${loading}>
        <div class="mx-auto max-w-5xl">
          <header class="mb-8">
            <h1 class="text-3xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
            <p class="mt-2 max-w-2xl text-base text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p>
          </header>

          <section data-organism-id="resumoOperacional" aria-labelledby="operational-metrics-title">
            <h2 id="operational-metrics-title" class="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted,currentColor)]">${this.msg.metricsTitle}</h2>
            ${hasError ? html`
              <div class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6" aria-live="polite">
                <p class="font-medium text-[var(--text-strong,currentColor)]">${this.msg.errorTitle}</p>
                <button
                  type="button"
                  class="mt-4 inline-flex min-h-11 items-center rounded-md bg-[var(--button-secondary-bg,transparent)] px-4 py-2 font-medium text-[var(--button-secondary-text,currentColor)] ring-[var(--focus-ring,currentColor)] focus-visible:outline-none focus-visible:ring-2"
                  @click=${() => this.carregarResumoOperacional()}
                >${this.msg.retry}</button>
              </div>
            ` : loading ? html`
              <div class="grid grid-cols-2 gap-5">
                ${this.metric(this.msg.availableTables, '', true)}
                ${this.metric(this.msg.openChecksValue, '', true)}
              </div>
            ` : resumo ? html`
              <div class="grid grid-cols-2 gap-5">
                ${this.metric(this.msg.availableTables, new Intl.NumberFormat(locale).format(resumo.mesasDisponiveis), false)}
                ${this.metric(this.msg.openChecksValue, currency.format(resumo.valorComandasAbertas), false)}
              </div>
            ` : html`
              <p class="rounded-lg border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] px-5 py-4 text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.empty}</p>
            `}
          </section>
        </div>
      </main>
    `;
  }

  private metric(label: string, value: string, loading: boolean) {
    return html`
      <groupviewmetric--ml-metric-card data-class="h-full" .loading=${loading}>
        <Label data-class="text-[var(--text-muted,currentColor)]">${label}</Label>
        <Value data-class="tabular-nums text-[var(--text-strong,currentColor)]">${value}</Value>
      </groupviewmetric--ml-metric-card>
    `;
  }
}
