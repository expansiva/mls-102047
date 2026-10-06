/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import { ComandaRestauranteInicioShared } from '/_102047_/l2/comandaRestaurante/web/shared/inicio.js';
import type { ResumoOperacional } from '/_102047_/l2/comandaRestaurante/web/shared/inicio.js';
/// **collab_i18n_start**
const pageMessage_pt = {
'page.title': 'Visão geral',
'page.description': 'Acompanhe rapidamente a operação do restaurante.',
'organism.resumoOperacional': 'Resumo operacional',
'state.goodNews': 'Nada precisa de atenção agora.',
'state.loading': 'Carregando o resumo operacional…',
'state.empty': 'Ainda não há indicadores operacionais para exibir.',
'state.error': 'Não foi possível carregar o resumo operacional.',
'action.retry': 'Tentar novamente',
'metric.mesasDisponiveis.label': 'Mesas disponíveis',
'metric.mesasDisponiveis.helper': 'Para novos atendimentos',
'metric.valorComandasAbertas.label': 'Valor das comandas em aberto',
'metric.valorComandasAbertas.helper': 'Total em atendimento'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages = { pt: pageMessage_pt };
/// **collab_i18n_end**
const formatInteger = (value: number): string => new Intl.NumberFormat(
document.documentElement.lang || undefined,
{ maximumFractionDigits: 0 }
).format(value);
const formatCurrency = (value: number): string => new Intl.NumberFormat(
document.documentElement.lang || undefined,
{ style: 'currency', currency: 'BRL' }
).format(value);
const hasResumo = (resumo: ResumoOperacional | null): resumo is ResumoOperacional => resumo !== null;
@customElement('comanda-restaurante--web--mobile--page11--inicio-102047')
export class ComandaRestauranteMobilePage11InicioPage extends ComandaRestauranteInicioShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages) as keyof typeof pageMessages];
const resumo = this.resumoOperacional;
const loading = this.pageStatus === 'loading' || this.carregarResumoOperacionalStatus === 'loading';
const failed = this.pageStatus === 'error' || this.carregarResumoOperacionalStatus === 'error';
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] px-4 py-6 text-[var(--text-default,currentColor)]" aria-busy=${loading ? 'true' : 'false'}>
<header class="mx-auto w-full max-w-md">
<p class="text-sm font-medium text-[var(--text-muted,currentColor)]">${this.msg['page.description']}</p>
<h1 class="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg['page.title']}</h1>
</header>
<section class="mx-auto mt-8 w-full max-w-md" data-organism-id="resumoOperacional" aria-labelledby="resumo-operacional-title">
<h2 id="resumo-operacional-title" class="sr-only">${this.msg['organism.resumoOperacional']}</h2>
${loading ? html`
<p class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-4 text-base text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg['state.loading']}</p>
<div class="mt-6 grid grid-cols-1 gap-3" aria-hidden="true">
<groupviewmetric--ml-metric-big-number loading data-class="w-full"></groupviewmetric--ml-metric-big-number>
<groupviewmetric--ml-metric-big-number loading data-class="w-full"></groupviewmetric--ml-metric-big-number>
</div>
` : failed ? html`
<div class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-4" aria-live="polite">
<p class="text-base text-[var(--text-default,currentColor)]">${this.msg['state.error']}</p>
<button type="button" class="mt-4 min-h-11 rounded-lg bg-[var(--button-secondary-bg,transparent)] px-4 py-2 text-sm font-semibold text-[var(--button-secondary-text,currentColor)] ring-[var(--focus-ring,currentColor)] focus-visible:outline-none focus-visible:ring-2" @click=${() => this.carregarResumoOperacional()}>${this.msg['action.retry']}</button>
</div>
` : !hasResumo(resumo) ? html`
<p class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-4 text-base text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg['state.empty']}</p>
` : html`
<p class="text-lg font-medium text-[var(--text-strong,currentColor)]" aria-live="polite">${this.msg['state.goodNews']}</p>
<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
<groupviewmetric--ml-metric-big-number data-class="w-full rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-4">
<Label data-class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['metric.mesasDisponiveis.label']}</Label>
<Value data-class="mt-1 text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatInteger(resumo.mesasDisponiveis)}</Value>
<Helper data-class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${this.msg['metric.mesasDisponiveis.helper']}</Helper>
</groupviewmetric--ml-metric-big-number>
<groupviewmetric--ml-metric-big-number data-class="w-full rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] px-4 py-4">
<Label data-class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['metric.valorComandasAbertas.label']}</Label>
<Value data-class="mt-1 text-3xl font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${formatCurrency(resumo.valorComandasAbertas)}</Value>
<Helper data-class="mt-1 text-xs text-[var(--text-muted,currentColor)]">${this.msg['metric.valorComandasAbertas.helper']}</Helper>
</groupviewmetric--ml-metric-big-number>
</div>
`}
</section>
</main>
`;
}
}
