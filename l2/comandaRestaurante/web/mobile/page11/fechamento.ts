/// <mls fileReference="_102047_/l2/comandaRestaurante/web/mobile/page11/fechamento.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupentermoney/ml-enter-money-br.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewdata/ml-vertical-record-list.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import { ComandaRestauranteFechamentoShared } from '/_102047_/l2/comandaRestaurante/web/shared/fechamento.js';
import type { ComandaAbertaResumo, ComandaParaFechamento, ErrorState, FecharComandaPagaDraft, ItemComandaParaFechamento } from '/_102047_/l2/comandaRestaurante/web/shared/fechamento.js';
/// **collab_i18n_start**
const pageMessage_pt = {
'scene.lista': 'Localizar comanda',
'scene.fechamento': 'Conferir e fechar',
'scene.back': 'Voltar para localizar',
'page.kicker': 'Fechamento de comanda',
'locate.searchLabel': 'Mesa',
'locate.searchPlaceholder': 'Digite o código da mesa',
'locate.numberLabel': 'Número da comanda',
'locate.numberPlaceholder': 'Escolha uma comanda',
'locate.numberItem': 'Comanda',
'locate.listLabel': 'Comandas abertas',
'locate.numberHeader': 'Número',
'locate.tableHeader': 'Mesa',
'locate.statusHeader': 'Situação',
'status.open': 'Em atendimento',
'locate.empty': 'Nenhuma comanda aberta encontrada.',
'locate.loading': 'Carregando comandas abertas…',
'locate.more': 'Carregar mais comandas',
'review.command': 'Comanda',
'review.items': 'Itens da comanda',
'review.itemHeader': 'Item',
'review.quantityHeader': 'Quantidade',
'review.unitHeader': 'Preço unitário',
'review.totalHeader': 'Valor total',
'review.subtotal': 'Subtotal dos itens',
'review.total': 'Total da comanda',
'review.loading': 'Carregando a comanda…',
'review.empty': 'Selecione uma comanda para conferir.',
'payment.title': 'Pagamento',
'payment.discount': 'Desconto',
'payment.discountPlaceholder': 'Opcional',
'payment.discountHelper': 'O desconto não pode exceder o subtotal.',
'payment.method': 'Forma de pagamento',
'payment.required': 'Escolha como a comanda foi paga.',
'payment.cash': 'Dinheiro',
'payment.debitCard': 'Cartão de débito',
'payment.creditCard': 'Cartão de crédito',
'payment.pix': 'Pix',
'close.action': 'Fechar comanda paga',
'close.successTitle': 'Comanda fechada',
'close.successMessage': 'Pagamento registrado e mesa liberada.',
'error.title': 'Não foi possível concluir',
'error.generic': 'Verifique os dados e tente novamente.',
'error.client': 'Confira os dados informados e tente novamente.'
};
type PageMessageType = typeof pageMessage_pt;
const pageMessages = { pt: pageMessage_pt };
/// **collab_i18n_end**
const money = (value: string, locale: string) => new Intl.NumberFormat(locale || 'pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
const numberValue = (value: string | null) => value === null || value.trim() === '' ? null : Number(value.replace(',', '.'));
const errorMessage = (error: ErrorState, msg: PageMessageType) => error ? (error.code.startsWith('client.') ? msg['error.client'] : msg['error.generic']) : '';
@customElement('comanda-restaurante--web--mobile--page11--fechamento-102047')
export class ComandaRestauranteMobilePage11FechamentoPage extends ComandaRestauranteFechamentoShared {
private msg!: PageMessageType;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages) as keyof typeof pageMessages];
return html`
<main class="min-h-screen bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)] px-4 py-4 pb-8">
<div class="mx-auto flex w-full max-w-[430px] flex-col gap-4">
<p class="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted,currentColor)]">${this.msg['page.kicker']}</p>
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'lista'} backLabel=${this.msg['scene.back']}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="lista" title=${this.msg['scene.lista']}>${this.renderSceneLista()}</Scene>
<Scene value="fechamento" title=${this.msg['scene.fechamento']} nav="back">${this.renderSceneFechamento()}</Scene>
</molecules--ml-scenary-102020>
</div>
</main>
`;
}
renderSceneLista() {
const rows = this.openComandas?.items ?? [];
const listError = errorMessage(this.buscarComandasAbertasError || this.carregarFechamentoError, this.msg);
return html`
<section class="flex flex-col gap-4" aria-label=${this.msg['scene.lista']}>
<div class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4 shadow-sm">
<div class="flex flex-col gap-3">
<groupsearchcontent--ml-search-bar
.value=${this.mesaCode}
name="mesaCode"
placeholder=${this.msg['locate.searchPlaceholder']}
.loading=${this.buscarComandasAbertasStatus === 'loading'}
@search=${(e: CustomEvent<{ query: string }>) => this.buscarComandasAbertas(null, e.detail.query || null)}
@clear=${() => this.buscarComandasAbertas(null, null)}>
<Label>${this.msg['locate.searchLabel']}</Label>
</groupsearchcontent--ml-search-bar>
<groupselectone--ml-select-one-autocomplete
.value=${this.number === null ? null : String(this.number)}
name="number"
placeholder=${this.msg['locate.numberPlaceholder']}
.loading=${this.buscarComandasAbertasStatus === 'loading'}
@change=${(e: CustomEvent<{ value: string | null }>) => this.buscarComandasAbertas(numberValue(e.detail.value), this.mesaCode)}>
<Label>${this.msg['locate.numberLabel']}</Label>
${rows.map((row: ComandaAbertaResumo) => html`<Item value=${String(row.number)}>${this.msg['locate.numberItem']} ${row.number}</Item>`)}
</groupselectone--ml-select-one-autocomplete>
</div>
</div>
${listError ? html`<groupnotifyuser--ml-notify-banner type="error" .visible=${true} .dismissible=${false}><Title>${this.msg['error.title']}</Title><Message>${listError}</Message></groupnotifyuser--ml-notify-banner>` : nothing}
<div data-organism-id="openComandaList" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
<groupviewdata--ml-vertical-record-list .selectable=${true} .loading=${this.carregarFechamentoStatus === 'loading' || this.buscarComandasAbertasStatus === 'loading'}
@row-click=${(e: CustomEvent<{ index: number }>) => { const row = rows[e.detail.index]; if (row) { this.selectComandaReview(row.id); this.setScenario('fechamento'); } }}>
<Columns><Column field="number" header=${this.msg['locate.numberHeader']} /><Column field="mesa" header=${this.msg['locate.tableHeader']} /><Column field="status" header=${this.msg['locate.statusHeader']} /></Columns>
<Rows>${rows.map((row: ComandaAbertaResumo) => html`<Row ?selected=${row.id === this.selectedComanda}><Cell>${row.number}</Cell><Cell>${row.mesa.code}</Cell><Cell>${this.msg['status.open']}</Cell></Row>`)}</Rows>
<Empty>${this.msg['locate.empty']}</Empty>
<Loading>${this.msg['locate.loading']}</Loading>
</groupviewdata--ml-vertical-record-list>
${this.carregarMaisComandasAbertasStatus === 'loading' ? nothing : html`<button type="button" class="mt-3 min-h-11 w-full rounded-xl border border-[var(--button-secondary-border,currentColor)] bg-[var(--button-secondary-bg,transparent)] px-4 py-2 text-sm font-semibold text-[var(--button-secondary-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.carregarMaisComandasAbertas()}>${this.msg['locate.more']}</button>`}
</div>
</section>
`;
}
renderSceneFechamento() {
const command = this.comanda;
const locale = document.documentElement.lang || 'pt-BR';
const closeError = errorMessage(this.fecharComandaPagaError || this.obterComandaParaFechamentoError, this.msg);
return html`
<section class="flex flex-col gap-4" aria-label=${this.msg['scene.fechamento']}>
${closeError ? html`<groupnotifyuser--ml-notify-banner type="error" .visible=${true} .dismissible=${false}><Title>${this.msg['error.title']}</Title><Message>${closeError}</Message></groupnotifyuser--ml-notify-banner>` : nothing}
<div data-organism-id="comandaReview" class="flex flex-col gap-4">
${command ? this.renderCommand(command, locale) : html`<div class="rounded-2xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-6 text-sm text-[var(--text-muted,currentColor)]">${this.obterComandaParaFechamentoStatus === 'loading' ? this.msg['review.loading'] : this.msg['review.empty']}</div>`}
</div>
${command ? html`
<div data-organism-id="paymentForm" class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
<h2 class="mb-3 text-base font-bold text-[var(--text-strong,currentColor)]">${this.msg['payment.title']}</h2>
<div class="flex flex-col gap-4">
<groupentermoney--ml-enter-money-br
.value=${numberValue(this.fecharComandaPagaDraft.details.discountAmount)} currency="BRL" locale=${locale} decimals="2" min="0"
placeholder=${this.msg['payment.discountPlaceholder']} name="discountAmount"
@change=${(e: CustomEvent<{ value: number | null }>) => this.setFecharComandaPaga({ ...this.fecharComandaPagaDraft, details: { ...this.fecharComandaPagaDraft.details, discountAmount: e.detail.value === null ? null : String(e.detail.value) } })}>
<Label>${this.msg['payment.discount']}</Label><Helper>${this.msg['payment.discountHelper']}</Helper>
</groupentermoney--ml-enter-money-br>
<groupselectone--ml-radio-group variant="radio" .value=${this.fecharComandaPagaDraft.details.paymentMethod} name="paymentMethod" required
@change=${(e: CustomEvent<{ value: string | null }>) => this.setFecharComandaPaga({ ...this.fecharComandaPagaDraft, details: { ...this.fecharComandaPagaDraft.details, paymentMethod: (e.detail.value as FecharComandaPagaDraft['details']['paymentMethod']) } })}>
<Label>${this.msg['payment.method']}</Label><Item value="cash">${this.msg['payment.cash']}</Item><Item value="debitCard">${this.msg['payment.debitCard']}</Item><Item value="creditCard">${this.msg['payment.creditCard']}</Item><Item value="pix">${this.msg['payment.pix']}</Item><Helper>${this.msg['payment.required']}</Helper>
</groupselectone--ml-radio-group>
</div>
</div>
<div data-organism-id="closeComandaActions" class="flex flex-col gap-3">
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" .loading=${this.fecharComandaPagaStatus === 'loading'} .disabled=${this.fecharComandaPagaStatus === 'loading' || !this.fecharComandaPagaDraft.details.paymentMethod} @action=${() => this.fecharComandaPaga()}>
<Label>${this.msg['close.action']}</Label>
</grouptriggeraction--ml-button-standard>
${this.fecharComandaPagaStatus === 'success' ? html`<groupnotifyuser--ml-notify-banner type="success" .visible=${true} .dismissible=${false}><Title>${this.msg['close.successTitle']}</Title><Message>${this.msg['close.successMessage']}</Message></groupnotifyuser--ml-notify-banner>` : nothing}
</div>
` : nothing}
</section>
`;
}
renderCommand(command: ComandaParaFechamento, locale: string) {
return html`
<div class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
<p class="mb-3 text-sm font-semibold text-[var(--text-muted,currentColor)]">${this.msg['review.command']} ${command.number}</p>
<groupviewmetric--ml-metric-big-number>
<Label>${this.msg['review.total']}</Label><Value>${money(command.details.totalComanda, locale)}</Value>
</groupviewmetric--ml-metric-big-number>
<dl class="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--border-subtle,currentColor)] pt-4 text-sm"><div><dt class="text-[var(--text-muted,currentColor)]">${this.msg['review.subtotal']}</dt><dd class="font-semibold">${money(command.details.subtotal, locale)}</dd></div><div><dt class="text-[var(--text-muted,currentColor)]">${this.msg['review.total']}</dt><dd class="font-semibold">${money(command.details.totalComanda, locale)}</dd></div></dl>
</div>
<div class="rounded-2xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
<h2 class="mb-2 px-1 text-base font-bold text-[var(--text-strong,currentColor)]">${this.msg['review.items']}</h2>
<groupviewtable--ml-responsive-table>
<TableCaption>${this.msg['review.items']}</TableCaption><TableHeader><TableRow><TableHead key="item">${this.msg['review.itemHeader']}</TableHead><TableHead key="quantity">${this.msg['review.quantityHeader']}</TableHead><TableHead key="unit">${this.msg['review.unitHeader']}</TableHead><TableHead key="total">${this.msg['review.totalHeader']}</TableHead></TableRow></TableHeader>
<TableBody>${command.items.filter((item: ItemComandaParaFechamento) => item.status === 'launched').map((item: ItemComandaParaFechamento) => html`<TableRow><TableCell>${item.itemCardapio.name}</TableCell><TableCell>${item.details.details.quantidade}</TableCell><TableCell>${money(item.details.details.precoUnitario, locale)}</TableCell><TableCell>${money(item.details.valorTotal, locale)}</TableCell></TableRow>`)}</TableBody>
<Empty>${this.msg['review.empty']}</Empty>
</groupviewtable--ml-responsive-table>
</div>
`;
}
}
