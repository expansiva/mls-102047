/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/desktop/page11/inicio.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ReembolsoDespesasInicioShared } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import type { DespesaPendente } from '/_102047_/l2/reembolsoDespesas/web/shared/inicio.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
pageTitle: 'Despesas aguardando sua decisão',
pageIntro: 'Veja o que a equipe enviou e escolha por onde começar a análise.',
metricLabel: 'Aguardando decisão',
metricHelper: 'despesas da equipe esperando sua análise',
listHeading: 'Despesas da equipe',
colColaborador: 'Colaborador',
colData: 'Data da despesa',
colCategoria: 'Categoria',
colValor: 'Valor',
colReenvio: 'Observação',
colAcao: 'Análise',
reenvio: 'Reenviada após correção',
analisar: 'Analisar despesa',
loadMore: 'Mostrar mais despesas',
emptyTitle: 'Nada esperando por você',
emptyText: 'Quando alguém da equipe enviar uma despesa para aprovação, ela aparece aqui.',
tableEmpty: 'Nenhuma despesa pendente.',
tableLoading: 'Carregando despesas…',
errorTitle: 'Não foi possível carregar as despesas',
errorFallback: 'Tente novamente em instantes.',
retry: 'Tentar novamente',
};
const pageMessage_en_us: typeof pageMessage_pt_br = {
pageTitle: 'Expenses waiting for your decision',
pageIntro: 'See what your team has sent and choose where to start the review.',
metricLabel: 'Awaiting decision',
metricHelper: 'team expenses waiting for your review',
listHeading: 'Team expenses',
colColaborador: 'Collaborator',
colData: 'Expense date',
colCategoria: 'Category',
colValor: 'Amount',
colReenvio: 'Note',
colAcao: 'Review',
reenvio: 'Resubmitted after correction',
analisar: 'Review expense',
loadMore: 'Show more expenses',
emptyTitle: 'Nothing is waiting for you',
emptyText: 'When someone on your team submits an expense for approval, it will show up here.',
tableEmpty: 'No pending expenses.',
tableLoading: 'Loading expenses…',
errorTitle: 'We could not load the expenses',
errorFallback: 'Please try again in a moment.',
retry: 'Try again',
};
const pageMessage_es_es: typeof pageMessage_pt_br = {
pageTitle: 'Gastos pendientes de tu decisión',
pageIntro: 'Mira lo que envió el equipo y elige por dónde empezar el análisis.',
metricLabel: 'Pendientes de decisión',
metricHelper: 'gastos del equipo esperando tu análisis',
listHeading: 'Gastos del equipo',
colColaborador: 'Colaborador',
colData: 'Fecha del gasto',
colCategoria: 'Categoría',
colValor: 'Importe',
colReenvio: 'Observación',
colAcao: 'Análisis',
reenvio: 'Reenviado tras corrección',
analisar: 'Analizar gasto',
loadMore: 'Mostrar más gastos',
emptyTitle: 'No hay nada esperándote',
emptyText: 'Cuando alguien del equipo envíe un gasto para aprobación, aparecerá aquí.',
tableEmpty: 'No hay gastos pendientes.',
tableLoading: 'Cargando gastos…',
errorTitle: 'No se pudieron cargar los gastos',
errorFallback: 'Inténtalo de nuevo en unos instantes.',
retry: 'Intentar de nuevo',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: Record<string, PageMessageType> = {
'pt-br': pageMessage_pt_br,
'en-us': pageMessage_en_us,
'es-es': pageMessage_es_es,
};
/// **collab_i18n_end**
function lang() {
return document.documentElement.lang || undefined;
}
function itemsOf(list: unknown): DespesaPendente[] {
if (Array.isArray(list)) return list as DespesaPendente[];
const items = (list as { items?: unknown } | null)?.items;
return Array.isArray(items) ? (items as DespesaPendente[]) : [];
}
function hasMoreOf(list: unknown): boolean {
return (list as { hasMore?: boolean } | null)?.hasMore === true;
}
function fmtDate(value: string): string {
if (!value) return '';
const d = new Date(value.length === 10 ? `${value}T00:00:00` : value);
return Number.isNaN(d.getTime()) ? value : new Intl.DateTimeFormat(lang()).format(d);
}
function fmtMoney(value: string): string {
const n = Number(value);
if (value === '' || Number.isNaN(n)) return value;
return new Intl.NumberFormat(lang(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}
function nameOf(d: DespesaPendente): string {
return d.colaborador?.details?.identification?.details?.identification?.name ?? '';
}
@customElement('reembolso-despesas--web--desktop--page11--inicio-102047')
export class ReembolsoDespesasDesktopPage11InicioPage extends ReembolsoDespesasInicioShared {
private msg: PageMessageType = pageMessage_pt_br;
private renderHeader() {
const loading = this.qryInicioStatus === 'loading' && this.despesasPendentes === null;
return html`
<header class="flex items-end justify-between gap-8">
<div class="max-w-xl">
<h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg['pageTitle']}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['pageIntro']}</p>
</div>
<div class="w-64 shrink-0">
<groupviewmetric--ml-metric-card .loading=${loading}>
<Label>${this.msg['metricLabel']}</Label>
<Value>${new Intl.NumberFormat(lang()).format(this.totalPendentes ?? 0)}</Value>
<Helper>${this.msg['metricHelper']}</Helper>
</groupviewmetric--ml-metric-card>
</div>
</header>
`;
}
private renderError() {
return html`
<div
role="alert"
aria-live="polite"
class="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--status-error-bg,transparent)] px-4 py-3 text-[var(--status-error-text,currentColor)]"
>
<div>
<p class="font-medium">${this.msg['errorTitle']}</p>
<p class="text-sm">${this.qryInicioError?.message || this.msg['errorFallback']}</p>
</div>
<grouptriggeraction--ml-button-standard
data-variant="secondary"
size="sm"
.loading=${this.qryInicioStatus === 'loading'}
@action=${() => this.qryInicio()}
>
<Label>${this.msg['retry']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
`;
}
private renderEmpty() {
return html`
<div
class="rounded-lg border border-dashed border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-6 py-16 text-center"
>
<p class="text-lg font-medium text-[var(--text-strong,currentColor)]">${this.msg['emptyTitle']}</p>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg['emptyText']}</p>
</div>
`;
}
private renderRow(d: DespesaPendente) {
return html`
<TableRow key=${d.id}>
<TableCell>
<span class="font-medium text-[var(--text-strong,currentColor)]">${nameOf(d)}</span>
</TableCell>
<TableCell>${fmtDate(d.details.details.dataDespesa)}</TableCell>
<TableCell>${d.details.details.categoria}</TableCell>
<TableCell>
<span class="font-semibold tabular-nums text-[var(--text-strong,currentColor)]">${fmtMoney(d.details.details.valor)}</span>
</TableCell>
<TableCell>
${d.details.details.reenvioRealizado
? html`<span
class="inline-block rounded-full bg-[var(--status-info-bg,transparent)] px-2.5 py-0.5 text-xs text-[var(--status-info-text,currentColor)]"
>${this.msg['reenvio']}</span
>`
: nothing}
</TableCell>
<TableCell>
<grouptriggeraction--ml-button-standard
data-variant="secondary"
size="sm"
@action=${() => this.abrirAnaliseDespesas(d.id)}
>
<Label>${this.msg['analisar']}</Label>
</grouptriggeraction--ml-button-standard>
</TableCell>
</TableRow>
`;
}
private renderTable() {
const items = itemsOf(this.despesasPendentes);
const loading = this.qryInicioStatus === 'loading' || this.pageStatus === 'loading';
return html`
<groupviewtable--ml-data-table .loading=${loading && items.length === 0}>
<TableHeader>
<TableRow>
<TableHead key="colaborador">${this.msg['colColaborador']}</TableHead>
<TableHead key="data">${this.msg['colData']}</TableHead>
<TableHead key="categoria">${this.msg['colCategoria']}</TableHead>
<TableHead key="valor">${this.msg['colValor']}</TableHead>
<TableHead key="reenvio">${this.msg['colReenvio']}</TableHead>
<TableHead key="acao">${this.msg['colAcao']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>${items.map((d) => this.renderRow(d))}</TableBody>
<Empty>${this.msg['tableEmpty']}</Empty>
<Loading>
<div class="py-10 text-center text-[var(--text-muted,currentColor)]">${this.msg['tableLoading']}</div>
</Loading>
</groupviewtable--ml-data-table>
${hasMoreOf(this.despesasPendentes)
? html`<div class="mt-4 flex justify-center">
<grouptriggeraction--ml-button-standard
data-variant="secondary"
.loading=${this.qryInicioStatus === 'loading'}
@action=${() => this.qryInicio(undefined, true)}
>
<Label>${this.msg['loadMore']}</Label>
</grouptriggeraction--ml-button-standard>
</div>`
: nothing}
`;
}
private renderInbox() {
const status = this.pageStatus;
return html`
<section data-organism-id="caixaDespesasPendentes" class="mt-8" aria-busy=${this.qryInicioStatus === 'loading' ? 'true' : 'false'}>
<h2 class="mb-3 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg['listHeading']}</h2>
${status === 'error' ? this.renderError() : status === 'empty' ? this.renderEmpty() : this.renderTable()}
</section>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] px-10 py-8 text-[var(--text-default,currentColor)]">
<div class="mx-auto max-w-6xl">${this.renderHeader()} ${this.renderInbox()}</div>
</main>
`;
}
}
